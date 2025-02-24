const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'prashantmn47@gmail.com',
        pass: 'dzpwlkpvcgxfdhpy'
    }
});

const contactForm = async (req, res) => {
    const { name, email, phone, description } = req.body;

    const mailOptions = {
        from: '"Qr code scanner" <prashantmn47@gmail.com>',
        to: 'prashantmn017@gmail.com',
        subject: `New Inquiry from ${name}`,
        html: `
     <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
      <h2 style="color: #4CAF50; text-align: center;">🌟 New Inquiry Details 🌟</h2>

      <div style="background-color: #fff; padding: 15px; border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <p><strong style="color: #333;">👤 Name:</strong> <span style="color: #555;">${name}</span></p>
        <p><strong style="color: #333;">📧 Email:</strong> <span style="color: #555;">${email}</span></p>
        <p><strong style="color: #333;">📞 Phone:</strong> <span style="color: #555;">${phone}</span></p>
        <p><strong style="color: #333;">📝 Description:</strong></p>
        <p style="background-color: #f0f8ff; padding: 10px; border-left: 4px solid #4CAF50; color: #444; border-radius: 4px;">
          ${description}
        </p>
      </div>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="text-align: center; color: #888;">📬 This email was sent from your website contact form.</p>
    </div>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error });
    }
}

module.exports = { contactForm }