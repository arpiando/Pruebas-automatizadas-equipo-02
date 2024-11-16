const fs = require("fs");
const resemble = require("resemblejs");

const config = {
  url: "https://monitor177.github.io/color-palette/",
  browsers: ["chromium", "webkit", "firefox"],
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

// Asegúrate de que la carpeta de resultados exista
const resultsPath = `./results/${datetime}`;
if (!fs.existsSync(resultsPath)) {
  fs.mkdirSync(resultsPath, { recursive: true });
}

// Función para comparar imágenes
async function compareImages(browser) {
  const beforeImage = `./visual-testing/before-${browser}.png`;
  const afterImage = `./visual-testing/after-${browser}.png`;
  const diffImage = `./results/${datetime}/compare-${browser}.png`;

  if (!fs.existsSync(beforeImage) || !fs.existsSync(afterImage)) {
    console.error(`Error: No se encontraron imágenes para el navegador ${browser}`);
    return;
  }

  return new Promise((resolve) => {
    resemble(beforeImage)
      .compareTo(afterImage)
      .ignoreColors() // Ignorar colores en comparación
      .onComplete((data) => {
        fs.writeFileSync(diffImage, data.getBuffer()); // Guardar la imagen con las diferencias
        resultInfo[browser] = {
          misMatchPercentage: data.misMatchPercentage,
          isSameDimensions: data.isSameDimensions
        };
        console.log(`Comparación completada para ${browser}: ${data.misMatchPercentage}% de diferencia`);
        resolve();
      });
  });
}

// Función para generar el HTML del reporte
function browserReport(browser, info) {
  return `
    <div class="browser" id="test-${browser}">
      <div class="btitle">
        <h2>Navegador: ${browser}</h2>
        <p>Resultado: ${JSON.stringify(info)}</p>
      </div>
      <div class="imgline">
        <div class="imgcontainer">
          <span class="imgname">Referencia</span>
          <img class="img2" src="../visual-testing/before-${browser}.png" alt="Referencia">
        </div>
        <div class="imgcontainer">
          <span class="imgname">Prueba</span>
          <img class="img2" src="../visual-testing/after-${browser}.png" alt="Prueba">
        </div>
      </div>
      <div class="imgline">
        <div class="imgcontainer">
          <span class="imgname">Diferencias</span>
          <img class="imgfull" src="./compare-${browser}.png" alt="Diferencias">
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
          ${config.browsers.map((b) => browserReport(b, resultInfo[b])).join("")}
        </div>
      </body>
    </html>
  `;
}

// Función principal para ejecutar las comparaciones
(async () => {
  console.log("Iniciando pruebas de comparación de imágenes...");

  for (const browser of config.browsers) {
    await compareImages(browser);
  }

  // Generar el reporte HTML
  const reportPath = `${resultsPath}/report.html`;
  fs.writeFileSync(reportPath, createReport(datetime, resultInfo));
  fs.copyFileSync("./visual-testing/index.css", `${resultsPath}/index.css`);
  console.log(`Reporte generado: ${reportPath}`);
})();