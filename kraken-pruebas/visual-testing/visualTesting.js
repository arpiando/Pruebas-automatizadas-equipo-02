const fs = require("fs");
const path = require("path");
const resemble = require("resemblejs");

const config = {
  url: "https://monitor177.github.io/color-palette/",
  browsers: ["chromium"],
  options: {
    output: {
      errorColor: {
        red: 255,
        green: 0,
        blue: 255
      },
      errorType: "movement",
      largeImageThreshold: 1200,
      useCrossOrigin: false,
      outputDiff: true
    },
    scaleToSameSize: true,
    ignore: "antialiasing"
  }
};

const datetime = new Date().toISOString().replace(/:/g, "-");
const resultInfo = {};

const resultsPath = `./results/${datetime}`;
if (!fs.existsSync(resultsPath)) {
  fs.mkdirSync(resultsPath, { recursive: true });
}

async function compareImages(beforeImage, afterImage, diffImage) {
  return new Promise((resolve) => {
    resemble(beforeImage)
      .compareTo(afterImage)
      .ignoreColors()
      .onComplete((data) => {
        fs.writeFileSync(diffImage, data.getBuffer());
        resultInfo[beforeImage] = {
          misMatchPercentage: data.misMatchPercentage,
          isSameDimensions: data.isSameDimensions
        };
        console.log(`Comparación completada: ${beforeImage} vs ${afterImage}: ${data.misMatchPercentage}% de diferencia`);
        resolve();
      });
  });
}


function browserReport(beforeImage, afterImage, diffImage, info) {
  const beforeFileName = path.basename(beforeImage);
  const afterFileName = path.basename(afterImage);
  return `
    <div class="image-comparison">
      <div class="btitle">
        <h2>Comparación: ${beforeFileName} vs ${afterFileName}</h2>
        <p>Resultado: ${JSON.stringify(info)}</p>
      </div>
      <div class="imgline">
        <div class="imgcontainer">
          <span class="imgname">Referencia (Before)</span>
          <img class="img2" src="../imagenes/before/${beforeFileName}" alt="Referencia">
        </div>
        <div class="imgcontainer">
          <span class="imgname">Prueba (After)</span>
          <img class="img2" src="../imagenes/after/${afterFileName}" alt="Prueba">
        </div>
      </div>
      <div class="imgline">
        <div class="imgcontainer">
          <span class="imgname">Diferencias</span>
          <img class="imgfull" src="./compare-${beforeFileName}" alt="Diferencias">
        </div>
      </div>
    </div>
  `;
}

function createReport(datetime, resultInfo) {
  return `
    <html>
      <head>
        <title>Reporte Visual Testing</title>
        <link href="index.css" rel="stylesheet" type="text/css">
      </head>
      <body>
        <h1>Reporte de Testing Visual</h1>
        <p>URL probada: <a href="${config.url}">${config.url}</a></p>
        <p>Fecha de ejecución: ${datetime}</p>
        <div id="visualizer">
          ${Object.keys(resultInfo).map((imagePath) => {
            const info = resultInfo[imagePath];
            const diffImage = path.join(resultsPath, `compare-${path.basename(imagePath)}`);
            return browserReport(imagePath, imagePath.replace('before', 'after'), diffImage, info);
          }).join("")}
        </div>
      </body>
    </html>
  `;
}

(async () => {
  console.log("Iniciando pruebas de comparación de imágenes...");

  const beforeFolder = path.join(__dirname, "..", "imagenes", "before");
  const afterFolder = path.join(__dirname,  "..", "imagenes", "after");

  console.log("Ruta para 'before':", beforeFolder);
console.log("Ruta para 'after':", afterFolder);

if (!fs.existsSync(beforeFolder) || !fs.existsSync(afterFolder)) {
  console.error("Las carpetas 'before' o 'after' no existen");
  return;
}
  
  // Verificar que ambas carpetas existan
  if (!fs.existsSync(beforeFolder) || !fs.existsSync(afterFolder)) {
    console.error("Las carpetas 'before' o 'after' no existen");
    return;
  }

  // Obtener todas las imágenes de las carpetas "before" y "after"
  const beforeImages = fs.readdirSync(beforeFolder).filter(file =>
    fs.statSync(path.join(beforeFolder, file)).isFile()
  );

  const afterImages = fs.readdirSync(afterFolder).filter(file =>
    fs.statSync(path.join(afterFolder, file)).isFile()
  );

  // Comparar las imágenes correspondientes en las carpetas "before" y "after"
  for (const beforeImage of beforeImages) {
    const beforeImagePath = path.join(beforeFolder, beforeImage);
    const afterImagePath = path.join(afterFolder, beforeImage.replace('before', 'after'));

    if (fs.existsSync(afterImagePath)) {
      const diffImagePath = path.join(resultsPath, `compare-${beforeImage}`);
      await compareImages(beforeImagePath, afterImagePath, diffImagePath);
    } else {
      console.log(`No se encontró imagen correspondiente en 'after' para ${beforeImage}`);
    }
  }

  // Crear y guardar el reporte
  const reportPath = path.join(resultsPath, "report.html");
  fs.writeFileSync(reportPath, createReport(datetime, resultInfo));
  fs.copyFileSync("./visual-testing/index.css", path.join(resultsPath, "index.css"));
  console.log(`Reporte generado: ${reportPath}`);
})();
