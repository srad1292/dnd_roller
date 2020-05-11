let ConnectionService = {
    connectToDatabase: function() {
        return new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) {
                LoggerService.log('warn', 'This browser does not support IndexedDB')
                reject('IndexedDB Not Supported');
            }
            
            LoggerService.log('log', 'ConnectionService::connectToDatabase -> Connecting to database...');
            let dbConnection = indexedDB.open('dnd_roller', 1);
            
            dbConnection.onsuccess = (event) => {
                LoggerService.log('log', 'ConnectionService::connectToDatabase -> Connection successful');
                resolve(event.target.result);
            }

            dbConnection.onupgradeneeded = (event) => {
                let db = event.target.result;
                LoggerService.log('log', 'ConnectionService::connectToDatabase -> Need to upgrade database');
                let upgradeTransaction = event.target.transaction;

                upgradeTransaction.oncomplete = () => {
                    ConnectionService._createDatabase(db)
                    .then((createdDB) => {
                        LoggerService.log('log', 'ConnectionService::connectToDatabase -> Upgrade and connect successful');
                        resolve(createdDB);
                    })
                    .catch((error) => {
                        LoggerService.log('log', `ConnectionService::connectToDatabase -> Upgrade failed with: `);
                        LoggerService.log('error', error);
                        reject(error);
                    });    
                }
                
            }

            dbConnection.onerror = (error) => {
                LoggerService.log('log', `ConnectionService::connectToDatabase -> Connection failed with: `);
                LoggerService.log('error', error);
                reject(error);
            }        
        })
    },
    _createDatabase(database) {
        LoggerService.log('log', 'ConnectionService::_createDatabase -> Creating database...');
        return new Promise((resolve, reject) => {
            try {
                if (!database.objectStoreNames.contains('user')) {
                    let userObjectStore = database.createObjectStore('user', {keyPath: 'user', autoIncrement: true});
                    userObjectStore.createIndex('username', 'username', {unique: true});
                }
                resolve(database);
            } catch(error) {
                reject(error);
            }
        });
    }
};

