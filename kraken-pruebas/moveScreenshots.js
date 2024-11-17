const fs = require("fs");
const path = require("path");

function moveScreenshots(reportFolder) {
  const executionDirs = fs.readdirSync(reportFolder).filter(dir =>
    fs.statSync(path.join(reportFolder, dir)).isDirectory()
  );

  const imagesPath = path.join(reportFolder, "../imagenes");

  if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath);
    console.log(`Carpeta 'imagenes' creada en ${imagesPath}`);
  }

  const beforeFolder = path.join(imagesPath, "before");
  const afterFolder = path.join(imagesPath, "after");

  if (!fs.existsSync(beforeFolder)) {
    fs.mkdirSync(beforeFolder);
    console.log(`Carpeta 'before' creada en ${beforeFolder}`);
  }

  if (!fs.existsSync(afterFolder)) {
    fs.mkdirSync(afterFolder);
    console.log(`Carpeta 'after' creada en ${afterFolder}`);
  }

  executionDirs.forEach(executionDir => {
    const executionPath = path.join(reportFolder, executionDir);

    // Buscar una carpeta que contenga la palabra 'screenshots'
    const screenshotDirs = fs.readdirSync(executionPath).filter(dir =>
      fs.statSync(path.join(executionPath, dir)).isDirectory() && dir.includes('screenshots')
    );

    screenshotDirs.forEach(screenshotsDir => {
      const screenshotsPath = path.join(executionPath, screenshotsDir);
      if (fs.existsSync(screenshotsPath)) {
        const images = fs.readdirSync(screenshotsPath).filter(file =>
          fs.statSync(path.join(screenshotsPath, file)).isFile()
        );

        images.forEach(image => {
          const source = path.join(screenshotsPath, image);

          // El nombre de la imagen no cambia, solo se mueve
          const destination = path.join(beforeFolder, image);

          fs.renameSync(source, destination);
          console.log(`Movida: ${source} -> ${destination}`);
        });
      }
    });
  });

  executionDirs.forEach(executionDir => {
    const executionPath = path.join(reportFolder, executionDir);

    // Buscar una carpeta que contenga la palabra 'screenshots'
    const screenshotDirs = fs.readdirSync(executionPath).filter(dir =>
      fs.statSync(path.join(executionPath, dir)).isDirectory() && dir.includes('screenshots')
    );

    screenshotDirs.forEach(screenshotsDir => {
      const screenshotsPath = path.join(executionPath, screenshotsDir);
      if (fs.existsSync(screenshotsPath)) {
        const images = fs.readdirSync(screenshotsPath).filter(file =>
          fs.statSync(path.join(screenshotsPath, file)).isFile()
        );

        images.forEach(image => {
          const source = path.join(screenshotsPath, image);

          // El nombre de la imagen no cambia, solo se mueve
          const destination = path.join(afterFolder, image);

          fs.renameSync(source, destination);
          console.log(`Movida: ${source} -> ${destination}`);
        });
      }
    });
  });
}

const reportsFolder = path.join(__dirname, "reports");
moveScreenshots(reportsFolder);
