const express = require('express');
const moment = require('moment');
const fs = require('fs');

// Create a new Express app
const app = express();

// Port to listen on
const PORT = 5500;

// Serve static files (e.g., your landing page)
app.use(express.static('./'));

// Create a route to handle the tracking of link clicks
app.get('/track', (req, res) => {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  const ip = req.ip;
  const userAgent = req.headers['user-agent'];
  const language = req.headers['accept-language'];
  const referrer = req.headers['referer']; // Track where the click came from, if available

  // Log the timestamp and IP to a file (click_log.txt)
  const logEntry = `Timestamp: ${timestamp}, IP: ${ip}, User Agent: ${userAgent}, Language: ${language}, Referrer: ${referrer}\n`;
  fs.appendFileSync('click_log.txt', logEntry);

  console.log(`Link clicked at ${timestamp} from IP: ${ip}`);

  // Redirect to the target URL (your landing page or any URL)
  res.redirect('./phished.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
