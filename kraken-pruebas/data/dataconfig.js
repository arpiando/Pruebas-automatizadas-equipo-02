const { faker } = require('@faker-js/faker');

const datosApriori = [
  { nombre: 'Juan Pérez', email: 'juan@example.com' },
];

const datosPseudo = [
  { nombre: faker.person.firstName(), email: faker.internet.email() },
];

const datosAleatorios = [
  { nombre: 'XzQ%R9', email: 'invalid-email' },
  { nombre: '!@#$%', email: 'random@domain.com' }
];

function obtenerDatos(estrategia) {
  if (estrategia === 'aprior') {
    return datosApriori;
  } else if (estrategia === 'pseudo') {
    return datosPseudo;
  } else if (estrategia === 'aleatorio') {
    return datosAleatorios;
  }
}

module.exports = obtenerDatos;
