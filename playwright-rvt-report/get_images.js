import fs from "fs";
import path from "path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const versions = [
  { name: "../playwright-pruebas", version: "5.96" },
  { name: "../playwright-pruebas-4.5", version: "4.50" },
];
const targetFolder = "./combined-results";

// Ensure target directory exists
if (!fs.existsSync(targetFolder)) {
  fs.mkdirSync(targetFolder);
}

function copyAndCompareImages(srcFolder, dstFolder, version) {
  fs.readdir(srcFolder, { withFileTypes: true }, (err, files) => {
    if (err) {
      return console.error(`Error reading folder: ${srcFolder}`, err);
    }

    files
      .filter((file) => file.isDirectory())
      .forEach((folder) => {
        const srcFolderPath = path.join(srcFolder, folder.name);
        const dstFolderPath = path.join(dstFolder, folder.name);

        // Create destination subfolder if it doesn't exist
        if (!fs.existsSync(dstFolderPath)) {
          fs.mkdirSync(dstFolderPath);
        }

        const images = fs
          .readdirSync(srcFolderPath)
          .filter((image) => image.startsWith("before"));
        images.forEach((image) => {
          const srcImagePath = path.join(srcFolderPath, image);
          const dstImagePath = path.join(
            dstFolderPath,
            `${image}-${version}.png`
          );

          // Copy before image to the destination folder with version appended
          fs.copyFileSync(srcImagePath, dstImagePath);
          console.log(
            `Copied ${image} from ${srcFolderPath} to ${dstImagePath}`
          );

          // After copying, compare images if both versions exist
          const otherVersion = versions.find((v) => v.version !== version);
          const otherImagePath = path.join(
            dstFolderPath,
            `${image}-${otherVersion.version}.png`
          );

          if (fs.existsSync(otherImagePath)) {
            try {
              const img1 = PNG.sync.read(fs.readFileSync(dstImagePath));
              const img2 = PNG.sync.read(fs.readFileSync(otherImagePath));

              const { width, height } = img1;
              const diff = new PNG({ width, height });

              pixelmatch(img1.data, img2.data, diff.data, width, height, {
                threshold: 0.1,
                includeAA: true,
                alpha: 0.1,
                aaColor: [255, 0, 0],
                diffColor: [255, 0, 255],
              });

              const diffImagePath = path.join(
                dstFolderPath,
                `diff-${image}.png`
              );
              fs.writeFileSync(diffImagePath, PNG.sync.write(diff));
              console.log(`Diff image created at ${diffImagePath}`);
            } catch (error) {
              console.error(`Error comparing images: ${error.message}`);
            }
          }
        });
      });
  });
}

// Copy and compare images from both source folders to the target folder
versions.forEach((folder) => {
  const srcFolderPath = path.join(folder.name, "test-results");
  copyAndCompareImages(srcFolderPath, targetFolder, folder.version);
});
