# Pruebas-automatizadas-equipo-02

El nombre y correos uniandes de los estudiantes que participaron en la entrega.

- Omar Fernando Muñoz (of.munoz@uniandes.edu.co)
- Fabrizio Cucina (f.cucina@uniandes.edu.co)
- Andrés Romero (a.romerop2@uniandes.edu.co)
- Yuely Adriana Arce (y.arcea@uniandes.edu.co)

Debe tener corriendo Ghost en el puerto: localhost:2368

1.El paso a paso para la instalación y ejecución de las pruebas en Kraken -  SOLO EN SITEMA OPERATIVO **macOS**

Antes de comenzar, asegúrate de tener instalados los siguientes programas:
-node.js
-Kraken: Instala Kraken globalmente usando el siguiente comando: npm install kraken-node -g
-Appium: Instala Appium globalmente con el siguiente comando: npm install -g appium

Pasos:
    abra una terminal
    instale los programas anteriores de manera global fuera de la carpeta del proyecto.

Ahora, pasos para correr pruebas:
    clone el proyecto: git clone
    cd Pruebas-automatizadas-equipo-02
    cd kraken-pruebas
    npm install

ejecute las pruebas:
    Vaya al archivo .env y cambie sus credenciales del administrador de Ghost
    npx kraken-node run


2.El paso a paso para la instalación y ejecución de las pruebas en Playwright.

Antes de comenzar, asegúrate de tener instalados los siguientes programas:
-node.js

Pasos:
    clone el proyecto: git clone
    cd Pruebas-automatizadas-equipo-02
    cd playwright-pruebas
    npm install

ejecute las pruebas:
    Vaya al archivo login.ts en: pages/login.ts y cambie en las lineas 12 y 13 sus credenciales del administrador de Ghost. En las lienas:

        private userEmail: string = 'f.cucina@uniandes.edu.co';
        private password: string = 'panama2024';

    ejecute: npx playwright test



