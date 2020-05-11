let UserService = {
    createUser: function(user) {
        return UserDao.createUser(user);
        // return new Promise((resolve, reject) => {
        //     resolve('ok');
        // });
    }
}

