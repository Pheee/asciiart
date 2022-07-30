const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";

let asciiImage;
let asciiDivLight;
let asciiDivDark;
let asciiDivColorLight;
let asciiDivColorDark;

function loadFile(imgeName) {
  loadImage(
    imgeName,
    (newImage) => {
      asciiImage = newImage;
      asciiImage.resize(32, 32);
      drawAscii();
    },
    (e) => console.log(e)
  );
}
function setup() {
  createCanvas(256, 256);
  asciiDivLight = createDiv();
  asciiDivDark = createDiv();
  asciiDivColorLight = createDiv();
  asciiDivColorDark = createDiv();
}

function drawAscii() {
  background(0);
  image(asciiImage, 0, 0, width, height);
  asciiImage.loadPixels();

  asciiDivLight.html(getAsciiArt(true, false));
  asciiDivDark.html(getAsciiArt(false, false));
  asciiDivColorLight.html(getAsciiArt(true, true));
  asciiDivColorDark.html(getAsciiArt(false, true));
}

function getAsciiArt(reverseDensity, useColor) {
  let ascii = "";
  for (let j = 0; j < asciiImage.height; j++) {
    for (let i = 0; i < asciiImage.width; i++) {
      const pixelIndex = (i + j * asciiImage.width) * 4;
      const r = asciiImage.pixels[pixelIndex + 0];
      const g = asciiImage.pixels[pixelIndex + 1];
      const b = asciiImage.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length - 1;
      const charIndex = reverseDensity
        ? Math.floor(map(avg, 0, 255, len, 0))
        : Math.floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") ascii += "&nbsp;";
      else
        ascii += useColor
          ? '<span style="color: rgb(' +
            r +
            "," +
            g +
            "," +
            b +
            ')">' +
            c +
            "</span>"
          : c;
    }
    ascii += "<br>";
  }
  return ascii;
}
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const btnRead = document.getElementById("btn");
btnRead.addEventListener("click", async () => {
  const file = document.querySelector("#theFile").files[0];
  loadFile(await toBase64(file));
});
