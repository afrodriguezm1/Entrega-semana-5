const compareImages = require("resemblejs/compareImages");
import * as fs from "fs";

const options = {
  output: {
    errorColor: {
      red: 255,
      green: 0,
      blue: 255,
    },
    errorType: "movement",
    largeImageThreshold: 1200,
    useCrossOrigin: false,
    outputDiff: true,
  },
  scaleToSameSize: true,
  ignore: "antialiasing",
};

let datetimeUno;
let datetimeDos;
async function generateReport() {
  const numberTest = 7;
  for (let i = 0; i < numberTest; i++) {
    const data = await compareImages(
      fs.readFileSync(`./screenshots/${datetimeUno}/feature${i}/s1/1.png`),
      fs.readFileSync(`./screenshots/${datetimeDos}/feature${i}/s1/1.png`),
      options
    );
    fs.writeFileSync(
      `./results/${datetimeUno}-${datetimeDos}/compare-${i}.png`,
      data.getBuffer()
    );
  }
  fs.writeFileSync(
    `./results/${datetimeUno}-${datetimeDos}/report.html`,
    createHtmlReport(numberTest)
  );
  fs.copyFileSync(
    "./index.css",
    `./results/${datetimeUno}-${datetimeDos}/index.css`
  );
}

function createHtmlReport(numberTest) {
  let images = [];
  for (let i = 0; i < numberTest; i++) {
    images.push(`
        <div class="imgline">
        <div class="imgcontainer">
          <span class="imgname">Diff feature ${i}</span>
          <img class="imgfull" src="./compare-${b}.png" id="diffImage" label="Diff">
        </div>
      </div>
        `);
  }

  return images.join("");
}
