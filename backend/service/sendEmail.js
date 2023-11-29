import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
export const sendEmail = async (user, resend = false) => {
  try {
    if (!user) {
      throw new Error('User not found')
    }
    const msg = {
      to: user.email,
      from: process.env.FROM_EMAIL,
      templateId: process.env.TEMPLATE_ID,
      dynamic_template_data: {
        first_name: user.username
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