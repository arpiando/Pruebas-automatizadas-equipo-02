const fs = require('fs');
const path = require('path');

const beforeFolder = path.join(__dirname, 'imagenes', 'before');
const afterFolder = path.join(__dirname, 'imagenes', 'after');

// Función para renombrar las imágenes en la carpeta
function renameImagesInFolder(folderPath, suffix) {
  if (!fs.existsSync(folderPath)) {
    console.error(`La carpeta ${folderPath} no existe.`);
    return;
  }

  const images = fs.readdirSync(folderPath).filter(file => fs.statSync(path.join(folderPath, file)).isFile());

  images.forEach((image) => {
    const oldImagePath = path.join(folderPath, image);
    const newImageName = image.replace('.png', `${suffix}.png`); // Agregar el sufijo a las imágenes
    const newImagePath = path.join(folderPath, newImageName);

    // Renombrar la imagen
    fs.renameSync(oldImagePath, newImagePath);
    console.log(`Renombrado: ${oldImagePath} -> ${newImagePath}`);
  });
}

// Renombrar imágenes en la carpeta 'before' agregando el sufijo '-after'
renameImagesInFolder(afterFolder, '-before');

// Renombrar imágenes en la carpeta 'after' agregando el sufijo '-before'
renameImagesInFolder(beforeFolder, '-after');
