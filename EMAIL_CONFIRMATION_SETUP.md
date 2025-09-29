# Email Confirmation Setup

This guide explains how to configure email confirmation functionality for Campus Bridge LMS.

## How It Works

After a user successfully logs in, an email confirmation is automatically sent to their registered email address. This helps users know that their login was successful and provides an additional security measure.

## Configuration

1. **Environment Variables**: The email configuration is stored in the `.env` file in the root directory.

2. **Required Settings**:
   - `EMAIL_SERVICE`: The email service provider (default: gmail)
   - `EMAIL_USER`: Your email address
   - `EMAIL_PASS`: Your email password or app password
   - `EMAIL_FROM`: The email address that will appear as the sender

## Gmail Configuration

For Gmail users, you need to generate an App Password:

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Factor Authentication if not already enabled
4. Generate an App Password:
   - Go to "App passwords"
   - Select "Mail" and your device
   - Copy the generated password
5. Use this App Password in the `EMAIL_PASS` field

## Testing Email Functionality

To test the email confirmation:

1. Start the server: `npm start`
2. Navigate to the login page
3. Log in with valid credentials
4. Check the user's email inbox for a confirmation message

## Customization

You can customize the email template by modifying the `sendEmailConfirmation` function in `server.js`. The current template includes:
- User's name
- Login timestamp
- Security warning for unauthorized access

## Troubleshooting

If emails are not being sent:
1. Check that all environment variables are correctly set
2. Verify that your email credentials are correct
3. Ensure that your email provider allows SMTP access
4. Check the server console for error messages

## Security Notes

- Never commit your `.env` file to version control
- Use App Passwords instead of your regular email password
- Regularly rotate your App Passwords for security