const { faker } = require('@faker-js/faker');

const datosApriori = [
  //Datos login apriori login [0]//
  { nombre: 'Juan Pérez', email: 'juan@example.com',  password: '1234luL'  },
  //Datos login apriori member inicial [1]//
  { name: 'Juan Pérez', email: 'juan@example.com',  password: '1234luL' },
  //Datos login apriori member edicion [2]//
  { name: 'Pepito Pérez', email: 'pepito@example.com',  password: '1234luL' },
  //Datos pagina nueva apriori page [3]//
  {titulo: 'Primer titulo', contenido:'Este es el contenido del primer titulo'},
  //Datos pagina edicion apriori page [4]//
  {titulo: 'otro titulo', contenido:'otro contenido para la pagina'},
  //Datos login incoherente apriori login [5]//
  { nombre: 'Juan Pérez', email: 'jshkjhsjdhsjkd',  password: 'kjgsjhdgshj'  },

];

const datosPseudo = [

];

const datosAleatorios = [
  //Datos login apriori login [0]//
  { nombre: faker.person.firstName(), email: faker.internet.email(), password: faker.internet.password() },
  //Datos login seudo member inicial [1]//
  { name: faker.person.firstName(), email: faker.internet.email(),  password: faker.internet.password() },
  //Datos login seudo member edicion [2]//
  { name: faker.person.firstName(), email: faker.internet.email(),  password: faker.internet.password() },
  //Datos pagina seudo page [3]//
  {titulo: faker.lorem.slug(), contenido: faker.lorem.paragraph()},
  //Datos pagina edicion apriori page [4]//
  {titulo: faker.lorem.slug(), contenido: faker.lorem.paragraph()},
   //Datos login incoherente apriori login [5]//
   { nombre: faker.lorem.words(), email: faker.lorem.words(), password: faker.lorem.words() }
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
