// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mailjet = require('node-mailjet').apiConnect("cfa4bc12ae7a39407480a5913fc9c243", "32d2626215e201d153e69f16aa71e3fb");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to send an email
app.post('/send-email', (req, res) => {
    const { email, firstName, userId } = req.body;

    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "crispermdluli@gmail.com", // Replace with your Mailjet verified email
                        Name: "School Admin",
                    },
                    To: [
                        {
                            Email: email,
                            Name: firstName,
                        },
                    ],
                    Subject: "Acceptance Notification",
                    TextPart: `Hello ${firstName},\n\nCongratulations! You have been approved for registration with User ID: ${userId}.\n\nBest regards,\nYour School Admin`,
                },
            ],
        });

    request
        .then((result) => {
            console.log("Email sent successfully:", result.body);
            res.status(200).send({ success: true, message: "Email sent successfully." });
        })
        .catch((err) => {
            console.error("Error sending email:", err);
            res.status(500).send({ success: false, message: "Email not sent." });
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

