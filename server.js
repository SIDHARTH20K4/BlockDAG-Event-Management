// server.js
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data"); // ← this was missing!

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

app.post("/upload-to-ipfs", upload.single("file"), async (req, res) => {
  const file = req.file;

  try {
    const data = new FormData();
    data.append("file", fs.createReadStream(file.path));

    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      maxBodyLength: "Infinity",
      headers: {
        ...data.getHeaders(), // ← THIS is correct
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
      },
    });

    fs.unlinkSync(file.path);
    res.json({ ipfsHash: response.data.IpfsHash });
  } catch (err) {
  console.error("Upload error:");
  if (err.response) {
    console.error("Status:", err.response.status);
    console.error("Headers:", err.response.headers);
    console.error("Data:", err.response.data);
  } else if (err.request) {
    console.error("No response received:", err.request);
  } else {
    console.error("Error:", err.message);
  }

  res.status(500).json({
    error: "Failed to upload to IPFS",
    details: err.response?.data || err.message,
  });
}

});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
