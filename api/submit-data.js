// Importing necessary modules
const fetch = require('node-fetch');

// Serverless function to handle form data and return a thank-you page
module.exports = async (req, res) => {
    // Check that the request is a POST request
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    // Extract form data from the request body
    const formData = req.body;

    // Send data to Zapier's webhook
    try {
        await fetch('https://hooks.zapier.com/hooks/catch/your_webhook_url/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
    } catch (error) {
        console.error('Error sending data to Zapier:', error);
    }

    // Return the custom thank-you page HTML
    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <html>
            <head>
                <style>
                    .wrapper { text-align: center; margin-top: 50px; }
                    .col-1 img { width: 150px; }
                    .col-2 h1, .col-2 p { font-family: Arial, sans-serif; color: #333; }
                    .thankyou-main-text { font-size: 2em; }
                </style>
            </head>
            <body>
                <div class="wrapper" contenteditable="false">
                    <div class="col-1" contenteditable="false">
                        <img class="tyBgImage" src="https://cdn.jotfor.ms/img/Thankyou-iconV2.png?v=0.1" alt="thank you icon" />
                    </div>
                    <div class="col-2" contenteditable="true">
                        <div class="thankyou-wrapper">
                            <h1 class="thankyou-main-text ty-text">תודה!</h1>
                            <p class="thankyou-sub-text ty-text">ההזמנה נשלחה למשרד.</p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    `);
};
