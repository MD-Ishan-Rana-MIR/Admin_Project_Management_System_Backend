// utils/inviteEmailTemplate.ts
export const inviteEmailTemplate = (
  inviteLink: string,
  role: string
) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        background-color: #f4f6f8;
        font-family: Arial, sans-serif;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      }
      .header {
        background: #2563eb;
        color: #fff;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 30px;
        color: #333;
        line-height: 1.6;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 24px;
        background: #2563eb;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      .footer {
        background: #f4f6f8;
        text-align: center;
        font-size: 12px;
        color: #777;
        padding: 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>You’re Invited 🎉</h2>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>
          You have been invited to join our platform as a 
          <strong>${role}</strong>.
        </p>
        <p>
          Click the button below to accept the invitation and complete your registration.
        </p>

        <a href="${inviteLink}" class="btn">Accept Invitation</a>

        <p style="margin-top: 20px;">
          This invitation link will expire in <strong>24 hours</strong>.
        </p>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} Spark Tech Agency
      </div>
    </div>
  </body>
  </html>
  `;
};
