const fs = require("fs");
const path = require("path");
const resemble = require("resemblejs");

const config = {
  url: "http://localhost:2368/ghost",
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

// Generar timestamp para los resultados
const datetime = new Date().toISOString().replace(/:/g, "-");
const resultInfo = {};

// Crear directorio para los resultados
const resultsPath = `./results/${datetime}`;
if (!fs.existsSync(resultsPath)) {
  fs.mkdirSync(resultsPath, { recursive: true });
}

// Función para comparar imágenes y generar archivo de diferencias
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
        console.log(
          `Comparación completada: ${beforeImage} vs ${afterImage}: ${data.misMatchPercentage}% de diferencia`
        );
        resolve();
      });
  });
}

// Crear el reporte HTML para visualizar las comparaciones
function browserReport(beforeImage, afterImage, diffImage, info) {
  const beforeFileName = path.basename(beforeImage);
  const afterFileName = path.basename(afterImage);
  const diffFileName = path.basename(diffImage);

  return `
    <div class="image-comparison">
      <div class="btitle">
        <h2>Comparación: ${afterFileName} vs ${beforeFileName}</h2>
        <p>Resultado: ${JSON.stringify(info)}</p>
      </div>
      <div class="imgline">
        <div class="imgcontainer">
          <span class="imgname">Prueba (Before)</span>
          <img class="img2" src="${afterFileName}" alt="Prueba">
        </div>
        <div class="imgcontainer">
          <span class="imgname">Referencia (After)</span>
          <img class="img2" src="${beforeFileName}" alt="Referencia">
        </div>
      </div>
      <div class="imgline">
        <div class="imgcontainer">
          <span class="imgname">Diferencias</span>
          <img class="imgfull" src="${diffFileName}" alt="Diferencias">
        </div>
      </div>
    </div>
  `;
}

// Crear estructura del reporte general
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
          ${Object.entries(resultInfo).map(([beforeImagePath, info]) => {
            const beforeFileName = path.basename(beforeImagePath);
            const afterFileName = beforeFileName.replace("before", "after");
            const diffFileName = `compare-${beforeFileName}`;
            return browserReport(
              path.join(resultsPath, beforeFileName),
              path.join(resultsPath, afterFileName),
              path.join(resultsPath, diffFileName),
              info
            );
          }).join("")}
        </div>
      </body>
    </html>
  `;
}

// Ejecución principal
(async () => {
  console.log("Iniciando pruebas de comparación de imágenes...");

  const beforeFolder = path.join(__dirname, "..", "imagenes", "before");
  const afterFolder = path.join(__dirname, "..", "imagenes", "after");

  if (!fs.existsSync(beforeFolder) || !fs.existsSync(afterFolder)) {
    console.error("Las carpetas 'before' o 'after' no existen");
    return;
  }

  const beforeImages = fs
    .readdirSync(beforeFolder)
    .filter((file) => fs.statSync(path.join(beforeFolder, file)).isFile());

  for (const beforeImage of beforeImages) {
    const beforeImagePath = path.join(beforeFolder, beforeImage);
    const afterImagePath = path.join(
      afterFolder,
      beforeImage.replace("before", "after")
    );

    if (fs.existsSync(afterImagePath)) {
      const diffImagePath = path.join(resultsPath, `compare-${beforeImage}`);
      await compareImages(beforeImagePath, afterImagePath, diffImagePath);

      // Copiar imágenes al directorio de resultados
      fs.copyFileSync(beforeImagePath, path.join(resultsPath, beforeImage));
      fs.copyFileSync(afterImagePath, path.join(resultsPath, beforeImage.replace("before", "after")));
    } else {
      console.log(`No se encontró imagen correspondiente en 'after' para ${beforeImage}`);
    }
  }

  // Crear y guardar el reporte
  const reportPath = path.join(resultsPath, "report.html");
  fs.writeFileSync(reportPath, createReport(datetime, resultInfo));

  // Copiar archivo CSS al directorio de resultados
  fs.copyFileSync("./visual-testing/index.css", path.join(resultsPath, "index.css"));

  console.log(`Reporte generado: ${reportPath}`);
})();

