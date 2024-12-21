import { Component } from '@angular/core';

@Component({
  selector: 'app-cancellation',
  standalone: false,
  
  templateUrl: './cancellation.component.html',
  styleUrl: './cancellation.component.css'
})
export class CancellationComponent {

  policyTitle = 'Cancellation and Refund Policy';
  introText =
    'Welcome to Nature Hub! We value your satisfaction and strive to provide the best service possible. Please read our cancellation and refund policy carefully.';

  cancellationPolicyTitle = 'Cancellation Policy';
  cancellationPolicyText =
    'We offer refunds for products that are damaged or defective upon arrival. To request a refund, please contact our customer service team within 7 days of receiving your order. Include your order number and a photo of the damaged or defective product.';

  nonRefundableItemsTitle = 'Non-Refundable Items';
  nonRefundableItemsText =
    'Certain items are non-refundable, including gift cards, downloadable software products, and some health and personal care items.';

  processingRefundsTitle = 'Processing Refunds';
  processingRefundsText =
    'Once your return is received and inspected, we will send you an email to notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within a certain amount of days.';

  contactUsTitle = 'Contact Us';
  contactUsText =
    'If you have any questions about our cancellation and refund policy, please contact us at';
  contactEmail = 'support@naturehub.com';
}

