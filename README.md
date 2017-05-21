# ORMNeo

Abstract some trivial operations on neo4j driver for nodejs and make the use simpler. That's why we created ORMNeo.

## Instalation
```sh
 npm install ormneo
```
## Usage 

### Connecting to neo4j database

```js
const ormneo = require('ormneo');
ormneo.Connection.connect('neo4j', 'databasepass', 'localhost');

```
   ORMNeo connects using the neo4j bolt protocol.

### Create node example

```js
  const ORMNeoNode = require('ormneo').ORMNeoNode;
  
  ORMNeoNode.create({ name: 'name', tes: 3 }, 'test').then((node) => {
       //Created returned object => {id: 1, name: 'name', tes: 3}
  }).catch((error) => {
       //Handle error
  });
```

### Find Nodes 
  ```js
    const ormneo = require('ormneo');
    const ORMNeoNode = ormneo.ORMNeoNode;
    const ORMNeoQuery = ormneo.ORMNeoQuery;
    const ORMNeoWhere = ormneo.ORMNeoWhere;
    
    let where = new ORMNeoWhere('tes', {$eq: 3});
    let query = ORMNeoQuery.query('test', where);
    
    ORMNeoNode.execute(query).then((nodes) => {
        //Found nodes.
    }).catch((error) => {
        //Handle error.
    });
  ```
### Create relations
```js
  const ORMNeoRelation = require('ormneo').ORMNeoRelation;
  ORMNeoRelation.relate(node1.id, 'relatedto', node2.id, {property: 'a'}).then((rels) => {
        // Created relation node {id: 2, type: 'relatedto', property: 'a'}
  }).catch((error) => {
        //Handle error
  });
```

## Find Relations 

```js
  conts ormneo = require('ormneo');
  const ORMNeoRelation = ormneo.ORMNeoRelation;
  const ORMNeoWhere = ormneo.ORMNeoWhere;

  ORMNeoRelation.find(node1.id, node2.id, 'relatedto', new ORMNeoWhere('property', {$eq: 'c'})).then((nodes) => {
        //Found relation nodes.
  }).catch((error) => {
        //Handle error.
  });
```

## Executing Cypher
You can executing cypher using the direct [Neo4j Driver](https://github.com/neo4j/neo4j-javascript-driver) session object. Or you can use ORMNeoCypher.

```js
  const ormneo = require('ormneo');
  const ORMNeoCypher = ormneo.ORMNeoCypher;

  ORMNeoCypher.execute(cypher).then((result) => {
     console.log(result);
  }).catch((error) => {
     reject(error);
  });
``` 
## Creating and droping indexes
You can create and drop indexes in properties.

```js
  const ormneo = require('ormneo');
  const ORMNeoIndex = ormneo.ORMNeoIndex;
  //Creating
  ORMNeoIndex.create('label', ['property']).then((result) => {
     //Handle creation
  });
  //Droping
  ORMNeoIndex.drop('label', ['property']).then((result) => {
     //Handle drop
  });
``` 

## Documentation

  See the full **API** documentation at [docs](docs). All docs was generated by [JSDoc](https://github.com/jsdoc3/jsdoc).

## Tests

  Most of this library functions are covered by unit tests. With 89% of coverage.
  See the code coverage on [codecov.io](https://codecov.io/gh/LucianoPAlmeida/ORMNeo).

## Licence

ORMNeo is released under the [MIT License](https://opensource.org/licenses/MIT).
