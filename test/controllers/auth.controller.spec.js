var assert = require('assert');
var authController = require('../../controllers/auth.controller');

describe('AuthController', function() {

    describe('isAuthorized', function() {

        it('Should return false if not authorized', function() {
            authController.setRoles(['user']);
            assert.equal(false, authController.isAuthorized('admin'));
        })
        it('Should return true if authorized', function() {
            authController.setRoles(['user', 'admin']);
            assert.equal(true, authController.isAuthorized('admin'));
        })
    })

    describe('isAuthorizedAsync', function() {

        it('Should return false if not authorized', function(done) { 
            authController.setRoles(['user']);  
            authController.isAuthorizedAsync('admin',
                 function(isAuth){
                    assert.equal(false, isAuth);
                    done();
                });
        })
    })

});
