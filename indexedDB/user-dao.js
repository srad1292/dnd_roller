
let UserDao = {
    createUser: function(user) {
        return new Promise((resolve, reject) => {
            LoggerService.log('log', 'UserDao::createUser -> Connecting to database...');
            ConnectionService.connectToDatabase().then((db) => {
                LoggerService.log('log', `UserDao::createUser -> Creating user: ${JSON.stringify(user)}`);
                let transaction = db
                    .transaction('user', "readwrite")
                    .objectStore('user');
                
                let addRequest = transaction.add(user);
                
                addRequest.onsuccess = (event) => {
                    LoggerService.log('log', `UserDao::createUser -> User created successfully`);
                    let response = {username: user.username};
                    try {
                        response.id = event.target.result;
                    } catch (error) {
                        LoggerService.log('log', `UserDao::createUser -> Error getting new user ID with: `);
                        LoggerService.log('error', error);    
                    }
                    db.close();
                    resolve(response);
                }
                
                addRequest.onerror = (error) => {
                    LoggerService.log('log', `UserDao::createUser -> User creation failed with: `);
                    LoggerService.log('error', error);
                    db.close();
                    reject(error);
                }

            })
            .catch((error) => {
                LoggerService.log('log', `UserDao::createUser -> Connecting to DB failed with: `);
                LoggerService.log('error', error);
                db.close();
                reject(error);
            });
        });
    }
};

