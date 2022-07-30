const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";

let asciiImage;
let asciiDivLight;
let asciiDivDark;
let asciiDivColorLight;
let asciiDivColorDark;
function preload() {
  asciiImage = loadImage("./temp.png");
}
function setup() {
  createCanvas(256, 256);
  asciiImage.resize(32, 32);
  asciiDivLight = createDiv();
  asciiDivDark = createDiv();
  asciiDivColorLight = createDiv();
  asciiDivColorDark = createDiv();
  drawAscii();
}

function drawAscii() {
  background(0);
  image(asciiImage, 0, 0, width, height);
  asciiImage.loadPixels();
  let ascii = "";
  for (let j = 0; j < asciiImage.height; j++) {
    for (let i = 0; i < asciiImage.width; i++) {
      const pixelIndex = (i + j * asciiImage.width) * 4;
      const r = asciiImage.pixels[pixelIndex + 0];
      const g = asciiImage.pixels[pixelIndex + 1];
      const b = asciiImage.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length - 1;
      const charIndex = Math.floor(map(avg, 0, 255, len, 0));
      const c = density.charAt(charIndex);
      if (c == " ") ascii += "&nbsp;";
      else ascii += c;
    }
    ascii += "<br>";
  }
  asciiDivLight.html(ascii);
  ascii = "";
  for (let j = 0; j < asciiImage.height; j++) {
    for (let i = 0; i < asciiImage.width; i++) {
      const pixelIndex = (i + j * asciiImage.width) * 4;
      const r = asciiImage.pixels[pixelIndex + 0];
      const g = asciiImage.pixels[pixelIndex + 1];
      const b = asciiImage.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length - 1;
      const charIndex = Math.floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") ascii += "&nbsp;";
      else ascii += c;
    }
    ascii += "<br>";
  }
  asciiDivDark.html(ascii);
  ascii = "";
  for (let j = 0; j < asciiImage.height; j++) {
    for (let i = 0; i < asciiImage.width; i++) {
      const pixelIndex = (i + j * asciiImage.width) * 4;
      const r = asciiImage.pixels[pixelIndex + 0];
      const g = asciiImage.pixels[pixelIndex + 1];
      const b = asciiImage.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length - 1;
      const charIndex = Math.floor(map(avg, 0, 255, len, 0));
      const c = density.charAt(charIndex);
      if (c == " ") ascii += "&nbsp;";
      else
        ascii +=
          '<span style="color: rgb(' +
          r +
          "," +
          g +
          "," +
          b +
          ')">' +
          c +
          "</span>";
    }
    ascii += "<br>";
  }
  asciiDivColorLight.html(ascii);

  ascii = "";
  for (let j = 0; j < asciiImage.height; j++) {
    for (let i = 0; i < asciiImage.width; i++) {
      const pixelIndex = (i + j * asciiImage.width) * 4;
      const r = asciiImage.pixels[pixelIndex + 0];
      const g = asciiImage.pixels[pixelIndex + 1];
      const b = asciiImage.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length - 1;
      const charIndex = Math.floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") ascii += "&nbsp;";
      else
        ascii +=
          '<span style="color: rgb(' +
          r +
          "," +
          g +
          "," +
          b +
          ')">' +
          c +
          "</span>";
    }
    ascii += "<br>";
  }
  asciiDivColorDark.html(ascii);
}
