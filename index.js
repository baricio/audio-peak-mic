const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const public_path = `${__dirname}/public`

app.use('/assets', express.static(path.join(public_path, 'assets')))

// Serve the index.html on GET /
app.get('/', (req, res) => {
    res.sendFile(path.join(public_path, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});