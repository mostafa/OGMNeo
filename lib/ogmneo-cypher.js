'use strict';

const _ = require('lodash');
const OGMNeo = require('./ogmneo');

/**
    * @class OGMNeoCypher

 */
class OGMNeoCypher {
    
    /**
        * Execute an cypher statement.
        *
        * @static
        * @param {string} cypher - The cypher statement to be executed.
        * @param {bolean} [transactional=true] - Defines if the cypher should be executed in a transaction. 
        * @returns {Promise<object|Error>} Execute cypher query and return a result if successfully completes or an neo4j error.
    */
    static execute(cypher, transactional = true) {
        return new Promise((resolve, reject) => {
            if (!_.isString(cypher)) {
                reject(new Error('Cypher query must to be a string statement'));
            } else {
                if (transactional) {
                    let session = OGMNeo.session();
                    let readTxResultPromise = session.readTransaction(transaction => transaction.run(cypher));
                    readTxResultPromise.then((result) => {
                        session.close();
                        resolve(result);
                    }).catch( (error) => {
                        reject(error);
                    });
                } else {
                    let session = OGMNeo.session();
                    session.run(cypher).subscribe({
                        onNext: (results) => {
                            resolve(results);
                        },
                        onCompleted: () => {
                            session.close();
                        },
                        onError: (error) => {
                            reject(error);
                        }
                    });
                }
            }
        });
    }
}

module.exports = OGMNeoCypher;