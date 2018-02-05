var assert = require('assert');
var authController = require('../../controllers/auth.controller');



describe('AuthController', function() {

    describe('isAuthorized', function() {

        it('Should return false if not authorized', function() {
            assert.equal(false, authController.isAuthorized(['user'],'admin'));
        })
        it('Should return true if authorized', function() {
            assert.equal(true, authController.isAuthorized(['user', 'admin'], 'admin'));
        })
    })

    describe('isAuthorizedAsync', function() {

        it('Should return false if not authorized', function(done) {
            // this.timeout will make the test pass
            // even tho the default timeout (2000ms) is exceeded
            this.timeout(2500);    
            authController.isAuthorizedAsync(['user'], 'admin',
                 function(isAuth){
                    assert.equal(false, isAuth);
                    done();
                });
        })
    })

});
