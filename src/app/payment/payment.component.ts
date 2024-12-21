import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AddressService } from '../services/address.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var Razorpay:any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartItems = [];
  savedAddresses: any[] = [];
  newAddress: any = {
    Street: '',
    Phone: '',
    City: '',
    State: '',
    Country: '',
    ZipCode: ''
  };
  selectedAddress: any = null;
  isNewAddress: boolean = false;

  constructor(
    private addressService: AddressService,
    public cartService: CartService,
    private toastr:ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch saved addresses when the component initializes
    this.addressService.getSavedAddresses().subscribe((addresses) => {
      this.savedAddresses = addresses;
    });

    // Get cart items
    this.cartItems = this.cartService.getCartItems();
  }

  

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.product.Price * item.quantity;
    }, 0);
  }

  // Methods to handle address selection and saving
  addNewAddress(): void {
    this.isNewAddress = true;
    this.selectedAddress = null;
  }

  selectAddress(address: any): void {
    this.selectedAddress = address;  // Set the selected address
    this.isNewAddress = false;  // Switch off the "new address" form if a saved address is selected
  }

  // Method to edit an existing address
  editAddress(address: any): void {
    this.isNewAddress = true; // Switch to new address form to allow editing
    this.newAddress = { ...address }; // Pre-fill the form with the existing address data
    this.selectedAddress = null; // Deselect the current selected address
  }

  // Method to save the new or edited address
  saveNewAddress(): void {
    if (this.newAddress.UserId) {
      // If there's a UserId, it means we're editing an existing address
      this.addressService.updateAddress(this.newAddress).subscribe(() => {
        // Update the savedAddresses list with the edited address
        const index = this.savedAddresses.findIndex(addr => addr.AddressId === this.newAddress.AddressId);
        if (index !== -1) {
          this.savedAddresses[index] = this.newAddress;
        }
        this.isNewAddress = false; // Close the address form
        this.selectedAddress = this.newAddress; // Set the edited address as selected
        this.resetNewAddressForm();
      });
    } else {
      // If no UserId, we are adding a new address
      this.addressService.addAddress(this.newAddress).subscribe(() => {
        this.savedAddresses.push(this.newAddress); // Add the new address to the list
        this.isNewAddress = false;
        this.selectedAddress = this.newAddress;
        this.resetNewAddressForm();
      });
    }
  }

  // Method to reset the new address form
  resetNewAddressForm(): void {
    this.newAddress = {
      Street: '',
      Phone: '',
      City: '',
      State: '',
      Country: '',
      ZipCode: ''
    };
  }

  // Method to delete an address
  deleteAddress(address: any): void {
    // First, check if the address being deleted is the selected address
    const isSelected = this.selectedAddress?.AddressId === address.AddressId;

    this.addressService.removeAddress(address.AddressId).subscribe(() => {
      // After deletion, filter out the deleted address from the savedAddresses list
      this.savedAddresses = this.savedAddresses.filter((addr) => addr.AddressId !== address.AddressId);

      // If the deleted address was selected, reset selectedAddress
      if (isSelected) {
        this.selectedAddress = null;
      }
    }, error => {
      alert('Error deleting address!');
    });
  }

  initiatePayment() {
    if (this.selectedAddress) {

    const options = {
      key: 'rzp_test_FrfS6LXffXwNSX', // Replace with your Razorpay Test Key
      amount: this.getCartTotal() * 100,  // Ensure this is in paise (₹500.00 becomes 50000 paise)
      currency: 'INR',
      name: 'Nature Hub',
      description: 'Test Transaction',
      handler: (response: any) => {
        console.log('Payment Success:', response);
        this.cartService.clearCart();

        // Navigate to the home or success page after clearing the cart
        this.router.navigate(['/']);
        
      },
      prefill: {
        name: 'Akhilesh Tripathi',
        email: 'akhilesh@hdfc.com',
        contact: '6387148460',
      },
      theme: {
        color: '#3399cc',
      },
    };
  
    const rzp = new Razorpay(options);
    rzp.open();
  }
  else {
    this.toastr.error('Please select or enter an address for shipping.');
  }
}
  // Proceed to payment method
  // proceedToPay(): void {
  //   if (this.selectedAddress) {
  //     console.log('Payment successful for shipping to:', this.selectedAddress);
  
  //     this.cartService.clearCart();
  
  //   } else {
  //     alert('Please select or enter an address for shipping.');
  //   }
  

  
  
}
