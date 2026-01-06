# EmailJS Setup Instructions

The contact form is now integrated with EmailJS to send emails to **veerapoornabodha@gmail.com**.

## Setup Steps:

### 1. Create EmailJS Account

- Go to https://www.emailjs.com/
- Sign up for a free account (300 emails/month free)

### 2. Add Email Service

- Go to **Email Services** in dashboard
- Click **Add New Service**
- Choose **Gmail** (or your preferred provider)
- Connect your Gmail account: **veerapoornabodha@gmail.com**
- Copy the **Service ID**

### 3. Create Email Template

- Go to **Email Templates** in dashboard
- Click **Create New Template**
- Use this template content:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent via Poornabodha Technologies website contact form.
```

- Copy the **Template ID**

### 4. Get Public Key

- Go to **Account** → **General**
- Copy your **Public Key**

### 5. Update Contact.jsx

Open `src/pages/Contact/Contact.jsx` and replace these lines (around line 318-320):

```javascript
const serviceId = "YOUR_SERVICE_ID"; // Replace with your EmailJS service ID
const templateId = "YOUR_TEMPLATE_ID"; // Replace with your EmailJS template ID
const publicKey = "YOUR_PUBLIC_KEY"; // Replace with your EmailJS public key
```

With your actual values:

```javascript
const serviceId = "service_xxxxxxx"; // Your Service ID from step 2
const templateId = "template_xxxxxxx"; // Your Template ID from step 3
const publicKey = "xxxxxxxxxxxxxx"; // Your Public Key from step 4
```

### 6. Test the Form

- Fill out the contact form on your website
- Submit the form
- Check **veerapoornabodha@gmail.com** for the email

## Features Preserved:

✅ Advanced form validation (name, email, phone, subject, message)
✅ Email domain verification
✅ Auto-save to localStorage
✅ Character counting
✅ Visual feedback (checkmarks/crosses)
✅ Error handling
✅ Success/error messages

## Email Details:

- **Recipient:** veerapoornabodha@gmail.com
- **Sender:** User's email from form
- **Content:** All form fields (name, email, phone, subject, message)

## Free Tier Limits:

- 300 emails per month
- Upgrade to paid plan for more emails if needed
