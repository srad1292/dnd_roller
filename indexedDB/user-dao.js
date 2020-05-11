
let UserDao = {
    createUser: function(user) {
        return new Promise((resolve, reject) => {
            LoggerService.log('log', 'UserDao::createUser -> Connecting to database...');
            ConnectionService.connectToDatabase.then((db) => {
                LoggerService.log('log', `UserDao::createUser -> Creating user: ${JSON.stringify(user)}`);
                let transaction = db
                    .transaction('user', "readwrite")
                    .objectStore('user');
                
                transaction.add(user);

                LoggerService.log('log', `UserDao::createUser -> User created successfully`);
                resolve('User created successfully!');
                
                transaction.onerror = (error) => {
                    LoggerService.log('log', `UserDao::createUser -> User creation failed: ${JSON.stringify(error)}`);
                    reject(error);
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
};

