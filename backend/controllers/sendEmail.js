import User from '../models/user.js'
import { sendEmail } from '../service/sendEmail.js'

export const Register = async (req, res) => {
  try {
    const { name, email } = req.body
    if (!name || !email) {
      throw new Error('Please provide name and email')
    }
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'Email already exists' })
    }
    const newUser = new User({ name, email })
    await User.save(newUser)
    const mail = await sendEmail(newUser, req, res)
    res.status(200).json({ 
      success: true,
      message: 'Email sent successfully',
      mail
    })
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message
    })
  }
}
