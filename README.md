# Pruebas-automatizadas-equipo-02

El nombre y correos uniandes de los estudiantes que participaron en la entrega.

- Omar Fernando Muñoz (of.munoz@uniandes.edu.co)
- Fabrizio Cucina (f.cucina@uniandes.edu.co)
- Andrés Romero (a.romerop2@uniandes.edu.co)
- Yuely Adriana Arce (y.arcea@uniandes.edu.co)

Debe tener corriendo Ghost en el puerto: localhost:2368

1.El paso a paso para la instalación y ejecución de las pruebas en Kraken.

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


2.El paso a paso para la instalación y ejecución de las pruebas en Playwright.
