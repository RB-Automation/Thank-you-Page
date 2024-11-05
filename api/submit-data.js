const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Check if the request method is POST
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    // Get data from the request body
    const data = req.body;

    // const isEdit = req.headers.referer && req.headers.referer.includes('edit');
    const isEdit = req.headers.referer;
    console.log(isEdit);

    try {
        // Send data to Zapier webhook
        const zapierResponse = await fetch('https://hooks.zapier.com/hooks/catch/19199524/218u67i/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        // Check if the Zapier response was successful
        if (zapierResponse.ok) {
            // Redirect to the thank-you page on success
            res.writeHead(302, { Location: 'https://thank-you-page-lac.vercel.app/public/thank_you_page.html' });
            res.end();
        } else {
            // If Zapier response was an error, redirect to a error page
            res.writeHead(302, { Location: 'https://thank-you-page-lac.vercel.app/public/error.html' });
            res.end();
        }
    } catch (error) {
        console.error('Error sending data to Zapier:', error);
        // Redirect to error page if there’s an error with the request
        res.writeHead(302, { Location: 'https://thank-you-page-lac.vercel.app/public/error.html' });
        res.end();
    }
};
