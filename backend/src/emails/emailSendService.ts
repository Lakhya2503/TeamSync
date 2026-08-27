

export const emailTemplate = (
  code?: string,
  validityMinutes?: number,
  title?: string,
  description?: string,
  ctaText?: string,
  ctaUrl?: string
) => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TEAMSYNC — Secure Code</title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      background: #f4f7fb;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .card {
      max-width: 560px;
      width: 100%;
      background: #ffffff;
      border-radius: 40px;
      padding: 48px 40px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
      text-align: center;
      transition: all 0.2s ease;
    }

    .logo {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: contain;
      background: #f0f4ff;
      padding: 8px;
      margin-bottom: 16px;
    }

    .app-name {
      font-size: 22px;
      font-weight: 600;
      color: #0b1a2e;
      letter-spacing: -0.3px;
      margin-bottom: 8px;
    }

    .badge {
      display: inline-block;
      background: #eef2ff;
      color: #1e3a8a;
      font-size: 12px;
      font-weight: 500;
      padding: 4px 14px;
      border-radius: 100px;
      margin-bottom: 24px;
    }

    .title {
      font-size: 26px;
      font-weight: 700;
      color: #0b1a2e;
      margin-bottom: 12px;
      letter-spacing: -0.4px;
    }

    .description {
      color: #4b5563;
      font-size: 15px;
      line-height: 1.7;
      max-width: 420px;
      margin: 0 auto 8px;
    }

    .code-box {
      margin: 32px auto 28px;
      padding: 16px 24px;
      background: #f8fafc;
      border-radius: 20px;
      border: 1px solid #e9edf4;
      display: inline-block;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
    }

    .code {
      font-size: 36px;
      font-weight: 700;
      letter-spacing: 10px;
      color: #0b1a2e;
      font-family: 'SF Mono', 'Fira Code', monospace;
    }

    .validity {
      font-size: 13px;
      color: #6b7280;
      background: #f3f4f6;
      padding: 6px 16px;
      border-radius: 100px;
      display: inline-block;
      margin-bottom: 28px;
    }

    .divider {
      height: 1px;
      background: #eef2f6;
      margin: 24px 0;
    }

    .note {
      color: #6b7280;
      font-size: 13px;
      line-height: 1.6;
      max-width: 400px;
      margin: 0 auto;
    }

    .cta-button {
      display: inline-block;
      margin-top: 24px;
      padding: 12px 32px;
      background: #0b1a2e;
      color: #ffffff;
      font-weight: 600;
      font-size: 15px;
      border-radius: 60px;
      text-decoration: none;
      transition: background 0.2s ease;
    }

    .cta-button:hover {
      background: #1e2f44;
    }

    .footer-note {
      margin-top: 28px;
      font-size: 12px;
      color: #9ca3af;
      letter-spacing: 0.2px;
    }

    @media (max-width: 480px) {
      .card {
        padding: 32px 20px;
      }
      .code {
        font-size: 28px;
        letter-spacing: 6px;
      }
      .title {
        font-size: 22px;
      }
    }
  </style>
</head>

<body>

  <div class="card">

    <!-- Logo + App Name -->
    <img src="https://res.cloudinary.com/qnf2f4fq/image/upload/v1787834151/logo_vsxqcr.png" class="logo" alt="TEAMSYNC" />
    <div class="app-name">TEAMSYNC</div>

    <!-- Dynamic Title & Description -->
    <h1 class="title">${title || "SUBJECT"}</h1>
    <p class="description">
      ${description || "Use the code below to complete your action."}
    </p>

    <!-- Code Display -->
    <div class="code-box">
      <span class="code">${code}</span>
    </div>

    <!-- Validity -->
    <div class="validity">⏱ Valid for ${validityMinutes} minutes</div>

    <!-- Optional CTA Button -->
    ${
      ctaText && ctaUrl
        ? `
      <a href="${ctaUrl}" class="cta-button">${ctaText}</a>
    `
        : ""
    }

    <div class="divider"></div>

    <!-- Helpful Note -->
    <p class="note">
      ${ctaText ? `If the button doesn't work, copy and paste the code manually.` : `This code is for your exclusive use. Do not share it.`}
      <br />
      If you didn't request this, you can safely ignore this email.
    </p>

    <p class="footer-note">
      TEAMSYNC · Secure & Trusted
    </p>

  </div>

</body>
</html>
`;
