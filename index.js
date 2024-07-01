const express = require("express");
const app = express();
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();
app.use("/", (req, res) => {
    res.send("OK!!!!")
})

// Schedule the task to run every 13 minutes
const websiteUrls = ["https://watchout-backend-lrrm.onrender.com", "https://crone-setup.onrender.com"];

cron.schedule('*/12 * * * *', () => {
    websiteUrls.forEach((url) => {
        axios
            .get(url)
            .then((response) => {
                console.log(`Request sent to ${url}. Status: ${response.status} on ${new Date().toString()}`);
            })
            .catch((error) => {
                console.error(`Error sending request to ${url}: ${error.message}`);
            });
    });
});
app.listen(process.env.PORT || 8080, (err) => {
    if (!err) {
        console.log(`app was listening on port ${process.env.PORT}`)
    }
})
