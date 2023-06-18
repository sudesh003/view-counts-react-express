const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(cors({
    origin: '*'
}));

let cnt = 0;

// Read the count from the file on server start
fs.readFile('count.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading count:', err);
    } else {
        cnt = parseInt(data) || 0; // Parse the count from file, defaulting to 0 if NaN
    }
});

function incrementCount() {
    cnt = cnt + 1; // Increment cnt by 1
    // Save the count to the file
    fs.writeFile('count.txt', cnt.toString(), 'utf8', (err) => {
        if (err) {
            console.error('Error saving count:', err);
        }
    });
    return cnt;
}

app.get('/api/viewCount', (req, res) => {
    const count = incrementCount();
    res.json({ count });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
