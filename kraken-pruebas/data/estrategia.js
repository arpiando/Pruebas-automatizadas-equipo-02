const { faker } = require('@faker-js/faker');
const axios = require('axios');

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
  //Datos miembro incoherente apriori [6]//
  { ilogicName: 'hajshjashdjkashdjkafjhsjkfhjdskhfkjdjhsdkjfhjdskhfsjhfdjkshfjdfhjdshkjfhshdja', email: 'jshkjhsjdhsjkd',  password: 'kjgsjhdgshj'  },
  //Datos pagina incoherente apriori [7]//
  { titulo: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et', contenido:'otro contenido para la pagina' },
  // Datos para escenario 1 - Revertir post publicado a borrador [8]
  {titulo: faker.lorem.slug(), contenido: faker.lorem.paragraph()},
  // Datos para escenario 1 - Revertir post publicado a borrador [9]
  { name: 'Pepito Pérez', email: 'pepito@',  password: '1234luL' },
  // Datos para escenario 1 - Revertir post publicado a borrador [10]
  { name: '', email: 'pepito@yopmail.com',  password: '1234luL' },

];

const datosPseudo = [];


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
  { nombre: faker.lorem.words(), email: faker.lorem.words(), password: faker.lorem.words() },
  //Datos miembro incoherente apriori login [6]//
  { ilogicName: faker.lorem.paragraph(), email: faker.lorem.words(),  password: faker.lorem.words()  },
  //Datos pagina seudo page [7]//
  {titulo: faker.lorem.words(256), contenido: faker.lorem.paragraph()},
  // Datos para escenario 1 - Revertir post publicado a borrador [8]
  {titulo: faker.lorem.slug(), contenido: faker.lorem.paragraph()},
  // Datos para escenario 1 - Revertir post publicado a borrador [9]
  { name: faker.person.firstName(), email: faker.lorem.words(5),  password: '1234luL' },
  // Datos para escenario 1 - Revertir post publicado a borrador [10]
  { name: '', email: faker.internet.email(),  password: '1234luL' },
];

async function cargarDatosPseudo() {
  try {
    const response = await axios.get('https://my.api.mockaroo.com/pseudo.json?key=69e95960'); 
    const datosMockaroo = response.data;
    datosMockaroo.forEach((dato) => datosPseudo.push(dato));
    console.log('Datos cargados desde Mockaroo:', datosPseudo);
  } catch (error) {
    console.error('Error al cargar datos desde Mockaroo:', error.message);
  }
}

function obtenerDatos(estrategia) {
  if (estrategia === 'aprior') {
    return datosApriori;
  } else if (estrategia === 'pseudo') {
    return datosPseudo;
  } else if (estrategia === 'aleatorio') {
    return datosAleatorios;
  }
}

module.exports = { obtenerDatos, cargarDatosPseudo };
