// src/services/emailService.js
import axios from "axios";

// Utility: Format date
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Utility: Format time
const formatTime = (dateString) => {
  if (!dateString) return "-";
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(dateString).toLocaleTimeString(undefined, options);
};

// Utility: Get status display info
const getStatusInfo = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return { text: "Completed", color: "#10b981", bgColor: "#d1fae5" };
    case "pending":
      return { text: "Pending", color: "#f59e0b", bgColor: "#fef3c7" };
    case "failed":
      return { text: "Failed", color: "#ef4444", bgColor: "#fee2e2" };
    default:
      return { text: status || "Unknown", color: "#6b7280", bgColor: "#f3f4f6" };
  }
};

// Generate receipt HTML content
export const generateReceiptHTML = (payment) => {
  const statusInfo = getStatusInfo(payment.status);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Receipt - PG Management System</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #374151;
          background-color: #f9fafb;
          padding: 20px;
        }
        .receipt-container {
          max-width: 700px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
        }
        .receipt-header {
          background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
          color: white;
          padding: 30px;
          text-align: center;
          position: relative;
        }
        .receipt-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .receipt-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .receipt-subtitle {
          font-size: 16px;
          opacity: 0.9;
          margin-bottom: 15px;
        }
        .receipt-date {
          display: inline-block;
          background: rgba(255, 255, 255, 0.15);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
          margin-top: 10px;
        }
        .receipt-body {
          padding: 30px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 20px;
          border-bottom: 2px solid #f3f4f6;
          padding-bottom: 10px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }
        .info-label {
          font-size: 13px;
          color: #6b7280;
          font-weight: 500;
          margin-bottom: 5px;
          text-transform: uppercase;
        }
        .info-value {
          font-size: 16px;
          font-weight: 500;
          color: #1f2937;
        }
        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          background-color: ${statusInfo.bgColor};
          color: ${statusInfo.color};
        }
        .amount-section {
          background: #f9fafb;
          border-radius: 8px;
          padding: 20px;
          margin: 30px 0;
          text-align: center;
          border-left: 4px solid #4361ee;
        }
        .amount-value {
          font-size: 32px;
          font-weight: 700;
          color: #1f2937;
        }
        .receipt-footer {
          padding: 25px 30px;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="receipt-container">
        <!-- Header -->
        <div class="receipt-header">
          <div class="receipt-badge">Monthly Rent Receipt</div>
          <h1 class="receipt-title">Payment Confirmation</h1>
          <p class="receipt-subtitle">PG Management System</p>
          <div class="receipt-date">${formatDate(payment.paymentDate)} at ${formatTime(payment.paymentDate)}</div>
        </div>

        <!-- Body -->
        <div class="receipt-body">
          <h2 class="section-title">Payment Details</h2>
          <div class="info-grid">
            <div>
              <div class="info-label">Receipt ID</div>
              <div class="info-value">${payment.receiptId || payment._id}</div>
            </div>
            <div>
              <div class="info-label">Payment Method</div>
              <div class="info-value">${payment.paymentMethod || "-"}</div>
            </div>
            ${payment.transactionId ? `
              <div>
                <div class="info-label">Transaction ID</div>
                <div class="info-value">${payment.transactionId}</div>
              </div>` : ""}
            <div>
              <div class="info-label">Status</div>
              <div class="info-value"><span class="status-badge">${statusInfo.text}</span></div>
            </div>
          </div>

          <h2 class="section-title">Tenant Information</h2>
          <div class="info-grid">
            <div>
              <div class="info-label">Tenant Name</div>
              <div class="info-value">${payment.tenant?.name || "-"}</div>
            </div>
            <div>
              <div class="info-label">Room Number</div>
              <div class="info-value">Room ${payment.room?.roomNumber || "-"}</div>
            </div>
            <div>
              <div class="info-label">Payment For</div>
              <div class="info-value">${payment.paymentForMonth || "-"}</div>
            </div>
          </div>

          <!-- Amount -->
          <div class="amount-section">
            <div class="amount-value">₹${(payment.amount || 0).toLocaleString("en-IN")}</div>
          </div>
        </div>

        <!-- Footer -->
        <div class="receipt-footer">
          <p>Thank you for your payment. This transaction will appear on your statement as <strong>PG Management System</strong>.</p>
          <p>If you have any questions about this receipt, please contact us.</p>
          <div>PG Management System · support@pgmanagement.com · +91 98765 43210</div>
        </div>
         <div style="margin-top:25px; padding:15px; border:1px solid #e5e7eb; border-radius:6px; font-size:12px; color:#4b5563; background:#f9fafb;">
                  <strong style="display:block; margin-bottom:8px; color:#111827;">Rules & Regulations:</strong>
                  <ul style="margin:0; padding-left:18px;">
                    <li>Rent must be paid on or before the due date each month.</li>
                     <li><strong>Notice Period:</strong> Minimum 30 days prior notice is required before vacating the PG. Failing this, one month’s rent Amount should be paid.</li>
                    <li>Receipt is valid only if payment is successfully processed.</li>
                    <li>Maintain cleanliness and discipline within the premises.</li>
                    <li>Security deposit is refundable subject to PG rules.</li>
                  </ul>
                </div>
      </div>
    </body>
    </html>
  `;
};

// Send receipt email
export const sendReceiptEmail = async (payment) => {
  try {
    if (!payment?.tenant?.email) {
      throw new Error("Tenant email is missing.");
    }

    const response = await axios.post("/api/email/send-receipt", {
      to: payment.tenant.email,
      subject: `Payment Receipt - ${payment.paymentForMonth || ""} (${payment.receiptId || payment._id})`,
      html: generateReceiptHTML(payment),
    });

    return response.data;
  } catch (error) {
    console.error("Error sending receipt email:", error.message);
    throw error;
  }
};
