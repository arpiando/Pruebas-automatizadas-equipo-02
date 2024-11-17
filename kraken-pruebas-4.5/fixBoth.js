console.log('Esperando a que se instalen las dependencias...');

setTimeout(() => {
  console.log('Dependencias instaladas. Ejecutando script postinstall para both.js.');

  const fs = require('fs');
  const path = require('path');

  const filePath = path.join(__dirname, 'node_modules', 'kraken-node', 'lib', 'steps', 'both.js');

  try {
    if (fs.existsSync(filePath)) {
      console.log(`Reemplazando el archivo: ${filePath}`);

      const fileContent = `
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_1 = require("@cucumber/cucumber");
var KrakenFaker_1 = require("../utils/KrakenFaker");
var PropertyManager_1 = require("../utils/PropertyManager");
const fs = require('fs');
const path = require('path');
cucumber_1.defineParameterType({
    regexp: /"([^"]*)"/,
    transformer: function (string) {
        var finalString = string;
        if (PropertyManager_1.PropertyManager.stringIsAProperty(string)) {
            finalString = finalString.replace('<', '').replace('>', '');
            finalString = PropertyManager_1.PropertyManager.instance().getProperty(finalString);
        }
        else if (KrakenFaker_1.KrakenFaker.stringIsAFakerReuse(string)) {
            finalString = KrakenFaker_1.KrakenFaker.instance().reuseValueForKey(finalString);
        }
        else if (KrakenFaker_1.KrakenFaker.stringIsAFaker(string)) {
            finalString = KrakenFaker_1.KrakenFaker.instance().generateValueForKey(finalString);
        }
        return finalString;
    },
    name: "kraken-string",
    useForSnippets: false
});
cucumber_1.When('I wait', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 5000); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
cucumber_1.When('I wait for {int} seconds', function (seconds) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1000 * seconds); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
cucumber_1.When('I send a signal to user {int} containing {kraken-string}', function (userId, signal) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.driver.writeSignal(userId, signal)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
cucumber_1.When('I wait for a signal containing {kraken-string}', function (signal) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.driver.readSignal(signal)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
cucumber_1.When('I wait for a signal containing {kraken-string} for {int} seconds', function (signal, seconds) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.driver.readSignal(signal, 1000 * seconds)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
cucumber_1.AfterStep(function (world) {
    return __awaiter(this, void 0, void 0, function () {
        var screenshot, screenshotsFolder, folderPath, screenshotPath, images, nextImageNumber;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log('Esta es la ruta que sale en el screenshot: ' + this.testScenarioId);

                    // Define the base folder for the test scenario
                    folderPath = path.join("./reports", this.testScenarioId);

                    // Buscar carpetas que contienen la palabra "screenshots"
                    screenshotsFolder = fs.readdirSync(folderPath).find(function (folder) {
                        return folder.includes("screenshots");  // Filtra las carpetas que contienen "screenshots"
                    });

                    if (!screenshotsFolder) {
                        console.log("No se encontró una carpeta con 'screenshots'. Creando una nueva...");
                        screenshotsFolder = "screenshots" + Math.round(+new Date() / 1000); // Si no se encuentra, crea una carpeta con un nombre único
                        fs.mkdirSync(path.join(folderPath, screenshotsFolder));  // Crea la carpeta si no existe
                    }

                    // Obtener todas las imágenes dentro de la carpeta "screenshots"
                    images = fs.readdirSync(path.join(folderPath, screenshotsFolder)).filter(function (file) {
                        return fs.statSync(path.join(folderPath, screenshotsFolder, file)).isFile();
                    });

                    // El siguiente número para la captura de pantalla será el número de imágenes + 1
                    nextImageNumber = images.length + 1;

                    // Ruta completa para guardar la captura de pantalla
                    const screenshotPath = path.join(folderPath, screenshotsFolder, \`escenario\${screenshotsFolder.replace('screenshots', '')}-\${nextImageNumber}.png\`);
                    console.log('Ruta generada para guardar la captura: ', screenshotPath);

                    // Guardar la captura de pantalla
                    return [4 /*yield*/, this.driver.saveScreenshot(screenshotPath)];
                case 1:
                    screenshot = _a.sent();
                    console.log('Captura de pantalla guardada');
                    return [2 /*return*/];
            }
        });
    });
});

//# sourceMappingURL=both.js.map
      `;

      // Reemplazar el archivo
      fs.writeFileSync(filePath, fileContent);
      console.log('Archivo reemplazado exitosamente');
    } else {
      console.log(`El archivo no existe en la ruta: ${filePath}`);
    }
  } catch (error) {
    console.error('Error al reemplazar el archivo:', error);
  }
}, 5000);
