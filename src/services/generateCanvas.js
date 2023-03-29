const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

//Generate canvas for user
const generateCanvas = async (name) => {
  const width = 735;
  const height = 1102;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  //Define the title
  const title = name;

  ctx.font = "bold 48px DejaVu Sans";
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";

  const logoWidth = 400;
  const logoHeight = 400;
  const logoX = (width - logoWidth) / 2;
  const logoY = (height - logoHeight) / 2 + 100;

  //Loadt the QRCode based on the user name
  fs.promises
    .access(`./src/data/qr-${name}.png`)
    .then(() => {
      loadImage(`./src/data/qr-${name}.png`).then((image) => {
        ctx.drawImage(image, logoX, logoY, logoWidth, logoHeight);
        const text = "Scan Me";
        ctx.font = "70px sans-serif";
        ctx.textAlign = "center";

        const textX = width / 2;
        const textY = logoY - 50;

        ctx.fillText(title, textX, logoY - 200);
        ctx.fillText(text, textX, textY);

        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync(`./src/data/canvas-${name}.png`, buffer);
      });
    })
    .catch((err) => console.log(`Error accessing QR code file: ${err}`));
};

module.exports = { generateCanvas };
