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

    1. ejecute las pruebas:
        Vaya al archivo .env y cambie sus credenciales del administrador de Ghost
        npx kraken-node run

    2. Si desea correr pruebas con distintas base de datos:

        base apriori: npm run test:aprior
        base pseudo aleatorio: npm run test:pseudo
        base aleatoria: npm run test:aleatorio


    3. Si desea correr pruebas y luego guardar imagenes para pruebas de regresión visual debe ejecutar:

        npm run test

        luego cambiar versión de node a superior de 18.
            nvm use 18
            ejecute: node visual-testing/visualTesting.js


2. El paso a paso para la instalación y ejecución de las pruebas en Playwright.

- Asegurarse de tener Node.js instalado en el sistema, ya que Playwright es una librería de JavaScript.
- Abrir el proyecto
- Dirigirse a la carpeta pruebas-playwright en la terminal
- Instalar las dependencias con el comando npm install
- Abrir la carpeta pages
- Abrir el archivo login.ts y cambiar las credenciales en 

   private userEmail: string = 'correo@uniandes.edu.co';
   private password: string = 'contraseña';

- Guardar los cambios
- Ejecutar el comando npx playwright test --ui en la terminal (Asegurarse de estar en la carpeta pruebas-playwright al momento de ejecutar este comando)
- Dar click en el botón play de cada prueba para ejecutarlas individualmente (NO CORRERLAS TODAS A LA VEZ, POR FAVOR)

3. Ejecución de Monkey:
- cd monkeyGhost
- npm i
- npm run monkey

4. Ejecución de Ripper:
- cd ripperGhost
- npm i
- node index.js


