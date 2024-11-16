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

    executionDirs.forEach(executionDir => {
      const executionPath = path.join(reportFolder, executionDir);
      const screenshotsPath = path.join(executionPath, "screenshots");

      if (fs.existsSync(screenshotsPath)) {
        const images = fs.readdirSync(screenshotsPath).filter(file =>
          fs.statSync(path.join(screenshotsPath, file)).isFile()
        );

        images.forEach((image, index) => {
          const source = path.join(screenshotsPath, image);
          const newImageName = `before_${Date.now()}_${index}.png`;
          const destination = path.join(beforeFolder, newImageName);

          fs.renameSync(source, destination);
          console.log(`Movida: ${source} -> ${destination}`);
        });
      }
    });
  } else {
    if (!fs.existsSync(afterFolder)) {
      fs.mkdirSync(afterFolder);
      console.log(`Carpeta 'after' creada en ${afterFolder}`);
    }

    executionDirs.forEach(executionDir => {
      const executionPath = path.join(reportFolder, executionDir);
      const screenshotsPath = path.join(executionPath, "screenshots");

      if (fs.existsSync(screenshotsPath)) {
        const images = fs.readdirSync(screenshotsPath).filter(file =>
          fs.statSync(path.join(screenshotsPath, file)).isFile()
        );

        images.forEach((image, index) => {
          const source = path.join(screenshotsPath, image);
          const newImageName = `after_${Date.now()}_${index}.png`;
          const destination = path.join(afterFolder, newImageName);

          fs.renameSync(source, destination);
          console.log(`Movida: ${source} -> ${destination}`);
        });
      }
    });
  }
}

const reportsFolder = path.join(__dirname, "reports");
moveScreenshots(reportsFolder);




