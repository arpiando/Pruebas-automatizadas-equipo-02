# Pruebas-automatizadas-equipo-02

El nombre y correos uniandes de los estudiantes que participaron en la entrega.

- Omar Fernando Muñoz (of.munoz@uniandes.edu.co)
- Fabrizio Cucina (f.cucina@uniandes.edu.co)
- Andrés Romero (a.romerop2@uniandes.edu.co)
- Yuely Adriana Arce (y.arcea@uniandes.edu.co)

Debe tener corriendo Ghost en el puerto: localhost:2368

1. El paso a paso para la instalación y ejecución de las pruebas en Kraken -  SOLO EN SITEMA OPERATIVO **macOS**

Antes de comenzar, asegúrate de tener instalados los siguientes programas:
-node.js en versión 16 y 18
-Kraken: Instala Kraken globalmente usando el siguiente comando: npm install kraken-node -g
-Appium: Instala Appium globalmente con el siguiente comando: npm install -g appium

Pasos:
    abra una terminal
    instale los programas anteriores de manera global fuera de la carpeta del proyecto.


Ahora, pasos para correr pruebas:
    ejecute: nvm use v16
    clone el proyecto: git clone
    cd Pruebas-automatizadas-equipo-02
    cd kraken-pruebas
    npm install

ejecute las pruebas:
    Vaya al archivo .env y cambie sus credenciales del administrador de Ghost
    npx kraken-node run

Si desea correr pruebas y luego guardar imagenes para pruebas de regresión visual debe ejecutar:

    npm run test

luego cambiar versión de node a superior de 18.
    nvm use 18
    ejecute: node visual-testing/visualTesting.js


2. El paso a paso para la instalación y ejecución de las pruebas de regresión en Playwright con la herramienta Pixelmatch.

- Asegurarse de tener Node.js instalado en el sistema, ya que Playwright es una librería de JavaScript.
- Asegurarse de tener Pixelmatch instalado, puede verificar con el comando npm list pixelmatch
- Abrir el proyecto

Pruebas de regresión en la versión rc:

- Dirigirse a la carpeta **pruebas-playwright** en la terminal para ejecutar las pruebas en la versión rc (5.96.0)
- Instalar las dependencias con el comando npm install
- Abrir la carpeta pages
- Abrir el archivo login.ts y cambiar las credenciales en 

   private userEmail: string = 'correo@uniandes.edu.co';
   private password: string = 'contraseña';

- Guardar los cambios
- Ejecutar el comando npx playwright test --ui en la terminal (Asegurarse de estar en la carpeta pruebas-playwright al momento de ejecutar este comando)
- Dentro del directorio "test-results" se habrán generado varios archivos como resultado, que son imágenes de las capturas de pantalla y otras imágenes de comparación.
- Para generar el reporte HTML de cada prueba, por favor ejecute el comando node index.js, el reporte individual lo podrá conseguir en la misma carpeta de cada escenario individual.

Pruebas de regresión en la versión base:

- Dirigirse a la carpeta **pruebas-playwright-4.5** en la terminal para ejecutar las pruebas en la versión base (4.5.0)
- Abrir la carpeta pages
- Abrir el archivo login.ts y cambiar las credenciales en 

   private userEmail: string = 'correo@uniandes.edu.co';
   private password: string = 'contraseña';

- Guardar los cambios
- Ejecutar el comando npx playwright test --ui en la terminal (Asegurarse de estar en la carpeta pruebas-playwright-4.5 al momento de ejecutar este comando)
- Dentro del directorio "test-results" se habrán generado varios archivos como resultado, que son imágenes de las capturas de pantalla y otras imágenes de comparación.
- Para generar el reporte HTML de cada prueba, por favor ejecute el comando node index.js, el reporte individual lo podrá conseguir en la misma carpeta de cada escenario individual.
