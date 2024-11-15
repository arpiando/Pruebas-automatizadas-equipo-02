import fs from "fs";
import path from "path";

const url = "https://ghost.com";

function browser(b, folderPath) {
  return `<div class="browser" id="test0">
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="playwright-pruebas/test-results/${folderPath}/before-${b}.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="playwright-pruebas/test-results/${folderPath}/after-${b}.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="playwright-pruebas/test-results/${folderPath}/compare-${b}.png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`;
}

function createReport(browsers, url, folderPath) {
  return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${url}"> ${url}</a>
            </h1>
            
            <div id="visualizer">
                ${browsers.map((b) => browser(b, folderPath)).join("")}
            </div>
        </body>
    </html>`;
}

const browsers = ["chromium"];
const mainFolder = "./test-results";

fs.readdir(mainFolder, { withFileTypes: true }, (err, files) => {
  if (err) {
    return console.error("Error reading the main folder:", err);
  }

  files
    .filter((file) => file.isDirectory())
    .forEach((folder) => {
      const folderPath = path.join(mainFolder, folder.name);

      fs.writeFileSync(
        `${folderPath}/report.html`,
        createReport(browsers, url, folder.name)
      );

      fs.copyFileSync("./index.css", `${folderPath}/index.css`);

      console.log(`Report generated for folder: ${folder.name}`);
    });
});
