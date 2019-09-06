'use strict';

const loopback = require('loopback');
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdirp = promisify(require('mkdirp'));
const app = loopback()
let vm = require('vm');

const DATASOURCE_NAME = 'prueba_crud';
// const dataSourceConfig = require('../../server/datasources.json');
const db = app.dataSource('prueba_crud', {
    "connector": "mysql",
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "prueba_crud"
})

discover().then(
  success => { console.log('********Se ejecutó muy bien el discover!*********'); process.exit();},
  error => { console.error('UNHANDLED ERROR:\n', error); process.exit(1) }
)

async function discover() {
  // It's important to pass the same "options" object to all calls
  // of dataSource.discoverSchemas(), it allows the method to cache
  // discovered related models
  const arrayTables = [
    {name:'categories', nameToNodeJs: 'categories' ,directory: 'categories', public: true},
    {name:'bills', nameToNodeJs: 'bills' ,directory: 'bills', public: true},
    {name:'bill_has_categories', nameToNodeJs: 'billHasCategories' ,directory: 'billHasCategories', public: true},
  ];

  // ********IMPORTANTE**********
  const withDirectorys = true; //  esto es para que le cree una carpeta a cada modelo con js y json
  const withJsFile = true; // poner esto false si ya hay codigo creado en el JS del modelo que se quiere actualizar
  //para que no se pierdan el código dentro del js
  // ********IMPORTANTE**********



  for (let index = 0; index < arrayTables.length; index++) {
    const table = arrayTables[index]; // la tabla con su información básica

    const options = {relations: true};
    // Discover models and relations
    const schema = await db.discoverSchemas(''+table.name, options); // trae el json para el modelo de la tabla
    var upperTableName = table.nameToNodeJs.charAt(0).toUpperCase() + table.nameToNodeJs.substr(1); // convierte la primera letra del nombre de la tabla en mayúscula
    upperTableName = upperTableName.replace("_",'');
    upperTableName = upperTableName.replace("_",'');
    
    if(withJsFile){
      console.log('Modelo json y js creado de > ',upperTableName);
    }else{
      console.log('Modelo en json creado de > ',upperTableName);
    }
    // Create model definition files
    if(withDirectorys){ // mas ordenado por carpetas
      await mkdirp('common/models/'+table.nameToNodeJs)
      await writeFile(
        'common/models/'+table.nameToNodeJs+'/'+table.nameToNodeJs+'.json',
        JSON.stringify(schema['prueba_crud.'+table.name], null, 2)
      )
      
      if(withJsFile){
        await writeFile(
          'common/models/'+table.nameToNodeJs+'/'+table.nameToNodeJs+'.js',
          JSON.stringify('use strict', null, 2)
        );
      }
    }else{ // todos los archivos pegados
      await mkdirp('common/models/')
      await writeFile(
        'common/models/'+table.nameToNodeJs+'.json',
        JSON.stringify(schema['prueba_crud.'+table.name], null, 2)
      )
      
      // converted = JSON.stringify(sandbox);
      if(withJsFile){
        await writeFile(
          'common/models/'+table.nameToNodeJs+'.js',
          JSON.stringify("/** Autor - Romario Estrada * Script de ejemplo: Para que funcione quitar comillas dobles**/'use strict';module.exports = function("+upperTableName+"){};", null, 2)
        );
      }
    }

    // aqui crea el json que hay que crear en el model
    // Expose models via REST API
    const configJson = await readFile('server/model-config.json', 'utf-8');
    const config = JSON.parse(configJson);

    config[''+upperTableName] = {dataSource: DATASOURCE_NAME, public: table.public};

    await writeFile(
      'server/model-config.json',
      JSON.stringify(config, null, 2)
    );
  }
}