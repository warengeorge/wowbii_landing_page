import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendEmailToVerifyAccount = async (user, resend = false) => {
  const token = await user.generateVerificationToken()
  try {
    const msg = {
      to: user.email,
      from: process.env.FROM_EMAIL,
      templateId: process.env.TEMPLATE_ID_VERIFY_ACCOUNT,
      dynamic_template_data: {
        first_name: user.username,
        otp_code: token.token,
      },
    }
    await sgMail.send(msg)
  } catch (err) {
    if (resend === true) {
      throw new Error('Email sending failed')
    } else {
      throw new Error('Successful, but failed to send email, please send email again')
    }
  }
}
