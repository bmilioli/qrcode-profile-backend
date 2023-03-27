const QRCode = require("qrcode");
const fs = require("fs");

// Generate QRCode for user

const generateQRCode = async (name) => {
  return new Promise((resolve, reject) => {
    QRCode.toFile(
      `./src/data/qr-${name}.png`,
      "gooogle.com",
      {
        color: {
          dark: "#000", // Blue dots
          light: "#0000", // Transparent background
        },
      },
      function (err) {
        if (err) reject(err);
        console.log("QR code generated!");
        resolve();
      }
    );
  });
};

module.exports = { generateQRCode };
