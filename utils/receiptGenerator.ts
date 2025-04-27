import { Transaction } from './mockData';

export function generateReceiptHTML(transaction: Transaction) {
  const date = new Date(transaction.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .receipt { max-width: 600px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #3498db; }
          .details { margin: 20px 0; }
          .row { display: flex; justify-content: space-between; margin: 10px 0; }
          .total { margin-top: 20px; border-top: 2px solid #eee; padding-top: 10px; }
          .footer { margin-top: 40px; text-align: center; color: #7f8c8d; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="logo">SmartBill</div>
            <h2>Toleg Bilgileri</h2>
          </div>
          
          <div class="details">
            <div class="row">
              <span>Transaction ID:</span>
              <span>${transaction.id}</span>
            </div>
            <div class="row">
              <span>Date:</span>
              <span>${date}</span>
            </div>
            <div class="row">
              <span>Payment Method:</span>
              <span>${transaction.paymentMethod}</span>
            </div>
            <div class="row">
              <span>Description:</span>
              <span>${transaction.description}</span>
            </div>
            
            <div class="row total">
              <span><strong>Jemi baha:</strong></span>
              <span><strong>$${transaction.amount.toFixed(2)}</strong></span>
            </div>
          </div>
          
          <div class="footer">
            <p>Sagbolun!</p>
            <p>Soraglarynyzy su adrese ugradyp bilersiniz support@utilitypay.com</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function downloadReceipt(transaction: Transaction) {
  const html = generateReceiptHTML(transaction);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `receipt-${transaction.id}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}