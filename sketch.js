const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";

let asciiImage;
let asciiImageGenerated;

function loadFile(imgeName, color, forward, size, blacklevel) {
  loadImage(
    imgeName,
    (newImage) => {
      asciiImage = newImage;
      asciiImage.resize(32, 32);
      drawAscii(color, forward, size, blacklevel);
    },
    (e) => console.log(e)
  );
}
function setup() {
  let canvas = createCanvas(128, 128);

  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent("sketch-holder");
}

function drawAscii(color, forward, size, blacklevel) {
  asciiImageGenerated = createGraphics(128, 128);
  asciiImage.loadPixels();

  drawAsciiArt(asciiImageGenerated, forward, color, blacklevel);
  image(asciiImageGenerated, 0, 0);

  document.querySelector("#htmlcode").innerHTML = getAsciiArt(
    forward,
    color,
    blacklevel
  );
}

function drawAsciiArt(graphics, forwardDensity, useColor, blacklevel) {
  graphics.background(0);
  let useDensity = blacklevel > 0 ? density + " ".repeat(blacklevel) : density;
  let w = graphics.width / asciiImage.width;
  let h = graphics.height / asciiImage.height;
  for (let j = 0; j < asciiImage.height; j++) {
    for (let i = 0; i < asciiImage.width; i++) {
      const pixelIndex = (i + j * asciiImage.width) * 4;
      const r = asciiImage.pixels[pixelIndex + 0];
      const g = asciiImage.pixels[pixelIndex + 1];
      const b = asciiImage.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = useDensity.length - 1;
      const charIndex = forwardDensity
        ? Math.floor(map(avg, 0, 255, 0, len))
        : Math.floor(map(avg, 0, 255, len, 0));
      const c = useDensity.charAt(charIndex);
      useColor ? graphics.fill(r, g, b) : graphics.fill(avg);
      // graphics.textSize(16);
      graphics.textAlign(CENTER, CENTER);
      graphics.text(c, i * w + w * 0.5, j * h + h * 0.5);
    }
  }
}

function getAsciiArt(forwardDensity, useColor, blacklevel) {
  let ascii = "";
  let useDensity = blacklevel > 0 ? density + " ".repeat(blacklevel) : density;
  for (let j = 0; j < asciiImage.height; j++) {
    for (let i = 0; i < asciiImage.width; i++) {
      const pixelIndex = (i + j * asciiImage.width) * 4;
      const r = asciiImage.pixels[pixelIndex + 0];
      const g = asciiImage.pixels[pixelIndex + 1];
      const b = asciiImage.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = useDensity.length - 1;
      const charIndex = forwardDensity
        ? Math.floor(map(avg, 0, 255, 0, len))
        : Math.floor(map(avg, 0, 255, len, 0));
      const c = useDensity.charAt(charIndex);
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
    ascii += "<br>\n";
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
  const color = document.querySelector("#color");
  const forward = document.querySelector("#forward");
  const size = document.querySelector("#size");
  const blacklevel = document.querySelector("#blacklevel");
  loadFile(
    await toBase64(file),
    color.checked,
    forward.checked,
    size.value,
    blacklevel.valueAsNumber
  );
});
