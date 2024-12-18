console.log('Esperando a que se instalen las dependencias...');

setTimeout(() => {
  console.log('Dependencias instaladas. Ejecutando script postinstall.');

  const fs = require('fs');
  const path = require('path');

  const filePath = path.join(__dirname, 'node_modules', 'kraken-node', 'lib', 'utils', 'FileHelper.js');

  try {
    if (fs.existsSync(filePath)) {
      console.log(`Reemplazando el archivo: ${filePath}`);

      const fileContent = `
      "use strict";
      var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
      }) : (function(o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
      }));
      var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
          Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
          o["default"] = v;
      });
      var __importStar = (this && this.__importStar) || function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
      };
      var __importDefault = (this && this.__importDefault) || function (mod) {
          return (mod && mod.__esModule) ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FileHelper = void 0;
      var fs_1 = __importDefault(require("fs"));
      var fs_extra_1 = __importDefault(require("fs-extra"));
      var glob_1 = __importDefault(require("glob"));
      var path_1 = __importDefault(require("path"));
      var Constants = __importStar(require("../utils/Constants"));
      const fs = require('fs');
      var FileHelper = /** @class */ (function () {
          function FileHelper() {
          }
          FileHelper.instance = function () {
              if (!FileHelper.singletonInstance) {
                  FileHelper.singletonInstance = new FileHelper();
              }
              return FileHelper.singletonInstance;
          };
          FileHelper.prototype.pathExists = function (path) {
              return fs_1.default.existsSync(path);
          };
          FileHelper.prototype.deleteFilesWithGlobPattern = function (globPattern) {
              var _this = this;
              glob_1.default(globPattern, {}, function (err, files) {
                  if (err) {
                      throw err;
                  }
                  files.forEach(function (filePath) {
                      _this.deleteFileInPath(filePath);
                  });
              });
          };
          FileHelper.prototype.deleteFileInPath = function (path) {
              fs_1.default.unlinkSync(path);
          };
          FileHelper.prototype.deleteFileInPathIfExists = function (path) {
              if (this.pathExists(path)) {
                  this.deleteFileInPath(path);
              }
          };
          FileHelper.prototype.filesInPath = function (path) {
              return fs_1.default.readdirSync(path);
          };
          FileHelper.prototype.featureFilesInPath = function (path) {
              var filesInFeaturePath = this.filesInPath(path);
              return filesInFeaturePath.filter(function (fileName) {
                  return fileName.match(/\.feature$/);
              });
          };
          FileHelper.prototype.copyFolderToPath = function (folderPath, destinationPath) {
              this.createFolderIfDoesNotExist(destinationPath);
              fs_extra_1.default.copy(folderPath, destinationPath, function (err) {
                  if (err) {
                      throw err;
                  }
              });
          };
          FileHelper.prototype.createFolderIfDoesNotExist = function (path) {
              // Verificar si la carpeta 'assets' ya existe
              if (!fs.existsSync(path)) {
                  fs.mkdirSync(path, { recursive: true });
              }
          
              // Evitar crear 'js' si el último directorio en 'path' parece ser un ID numérico
              const isIdDirectory = /\\/\\d+$/.test(path); // Verifica si termina en un número (posible ID)
              if (!isIdDirectory) {
                  const jsFolderPath = \`\${path}/js\`; // Ruta de la subcarpeta 'js' dentro de 'assets'
                  if (!fs.existsSync(jsFolderPath)) {
                      fs.mkdirSync(jsFolderPath);
                      console.log(\`Subcarpeta 'js' creada en: \${jsFolderPath}\`);
                  } else {
                      console.log(\`La subcarpeta 'js' ya existe en: \${jsFolderPath}\`);
                  }
              }
          };
          
          FileHelper.prototype.createFileIfDoesNotExist = function (path) {
              if (!fs_1.default.existsSync(path)) {
                  fs_1.default.openSync(path, 'w');
              }
          };
          FileHelper.prototype.contentOfFile = function (path) {
              var contents = fs_1.default.readFileSync(path, 'utf8');
              return contents;
          };
          FileHelper.prototype.appendTextToFile = function (text, path) {
              fs_1.default.appendFileSync(path, text + "\\n");
          };
          FileHelper.prototype.writeTextToFile = function (text, path) {
              fs_1.default.writeFileSync(path, text + "\\n");
          };
          FileHelper.prototype.isValidApk = function (apkPath) {
              return apkPath.slice(apkPath.length - 4) === '.apk';
          };
          FileHelper.prototype.pathToAbsolutePath = function (filePath) {
              return path_1.default.resolve(filePath);
          };
          FileHelper.prototype.createKrakenSupportFileIfDoesNotExist = function (path) {
              this.createFolderIfDoesNotExist(Constants.KRAKEN_DIRECTORY);
              this.createFileIfDoesNotExist(path);
          };
          return FileHelper;
      }());
      exports.FileHelper = FileHelper;
      //# sourceMappingURL=FileHelper.js.map
            `;
      
      fs.writeFileSync(filePath, fileContent);
      console.log('Archivo reemplazado exitosamente');
    } else {
      console.log(`El archivo no existe en la ruta: ${filePath}`);
    }
  } catch (error) {
    console.error('Error al reemplazar el archivo:', error);
  }
}, 5000);

