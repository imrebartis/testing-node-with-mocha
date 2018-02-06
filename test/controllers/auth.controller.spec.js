var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinon = require('sinon');

chai.use(chaiAsPromised);
chai.should();

describe('AuthController', function() {

    beforeEach(function settingUpRoles() {
        console.log('running before each');
        // authController.setRoles(['user']);
    });

    // beforeEach('this func is erroring intentionally', function erroringFunction() {
    //     throw({error:'error'})
    // });

    describe('isAuthorized', function() {
        var user = {};
        beforeEach(function () {
             user = {
                roles: ['user'],
                isAuthorized: function (neededRole) {
                   return this.roles.indexOf(neededRole) >= 0;
                }
            }
            sinon.spy(user, 'isAuthorized'); // lets us watch a function with console.log
            authController.setUser(user);
        });
        it('Should return false if not authorized', function() {
            // authController.setRoles(['user']);
            // assert.equal(false, authController.isAuthorized('admin'));
            var isAuth = authController.isAuthorized('admin');
            // console.log(user.isAuthorized);
            user.isAuthorized.calledOnce.should.be.true;
            isAuth.should.be.false;
        })
        it('Should return true if authorized', function() {
            authController.setRoles(['user', 'admin']);
            var isAuth = authController.isAuthorized('admin');
            isAuth.should.be.true;
        })
        it('should not allow a get if not authorized');
        it('should allow get if authorized');
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

    describe('isAuthorizedPromise', function () {

        it('Should return false if not authorized', function () {
            return authController.isAuthorizedPromise('admin').should.eventually.be.false;

        })

    })

    describe.only('getIndex', function () {
        var user = {};
        beforeEach(function () {
             user = {
                roles: ['user'],
                isAuthorized: function (neededRole) {
                   return this.roles.indexOf(neededRole) >= 0;
                }
            }
        });
        it('should render index if authorized', function () {
            // the sinon.stub lets us have direct control over the func
            // e.g. we don't have to call out to the database,
            // or we could throw errors
            var isAuth = sinon.stub(user, 'isAuthorized').returns(true);
            var req = {user: user};
            var res= {
                // creating a fake function
                render: function(){}
            };

            var mock = sinon.mock(res);
            mock.expects('render').once().withExactArgs('index');

            authController.getIndex(req, res);
            isAuth.calledOnce.should.be.true;

            mock.verify();
        })
    })

});
