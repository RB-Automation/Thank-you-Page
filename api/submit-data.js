module.exports = async (req, res) => {
    // Check if the request method is POST
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    // Get data from the request body
    const data = req.body;

    // Log the received data to the console (for testing purposes)
    console.log('Received data:', data);

    // Respond with a success message
    res.status(200).json({ message: 'Data received successfully', receivedData: data });
};
