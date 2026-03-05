const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve images from Loluou_Img directory
app.use('/Loluou_Img', express.static(path.join(__dirname, 'Loluou_Img')));

// API: list all images
app.get('/api/images', (req, res) => {
  const imgDir = path.join(__dirname, 'Loluou_Img');
  try {
    const files = fs.readdirSync(imgDir).filter(f =>
      /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(f)
    );
    res.json(files);
  } catch (e) {
    res.json([]);
  }
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Quiz Français running on port ${PORT}`);
});
