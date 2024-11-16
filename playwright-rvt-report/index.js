import fs from "fs";
import path from "path";

const url = "https://ghost.com";

function browser(b, folderPath) {
  return `<div class="browser" id="test0">
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="${folderPath}/before-${b}-5.96.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="${folderPath}/before-${b}-4.50.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="${folderPath}/diff-before-${b}.png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`;
}

function createReport(browsers, url, allReports) {
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
                ${allReports.join("")}
            </div>
        </body>
    </html>`;
}

const browsers = ["chromium"];
const mainFolder = "./combined-results";
const allReports = [];

fs.readdir(mainFolder, { withFileTypes: true }, (err, files) => {
  if (err) {
    return console.error(`Error reading the folder:`, err);
  }

  files
    .filter((file) => file.isDirectory())
    .forEach((folder) => {
      const folderPath = path.join(mainFolder, folder.name);
      const folderReport = browser(browsers[0], folderPath); // Assuming one browser for simplicity
      allReports.push(folderReport);

      // Create separate report for each folder
      fs.writeFileSync(
        `${folderPath}/report.html`,
        createReport(browsers, url, [folderReport])
      );
      fs.copyFileSync("./index.css", `${folderPath}/index.css`);

      console.log(`Separate report generated for ${folder.name}`);
    });

  // Create combined report after all folders are processed
  const combinedReportContent = createReport(browsers, url, allReports);
  fs.writeFileSync(
    `${mainFolder}/../combined-report.html`,
    combinedReportContent
  );
  fs.copyFileSync("./index.css", `${mainFolder}/../index.css`);

  console.log(
    `Combined report generated at: ${mainFolder}/../combined-report.html`
  );
});
