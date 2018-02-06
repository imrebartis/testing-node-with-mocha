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

    describe.only('isAuthorized', function() {
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
        it.only('Should return false if not authorized', function() {
            // authController.setRoles(['user']);
            // assert.equal(false, authController.isAuthorized('admin'));
            var isAuth = authController.isAuthorized('admin');
            console.log(user.isAuthorized);
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

    describe('getIndex', function () {
        // var user = {};
        // beforeEach(function () {
        //      user = {
        //         roles: ['user'],
        //         isAuthorized: function (neededRole) {
        //            return this.roles.indexOf(neededRole) >= 0;
        //         }
        //     }
        // });
        it('should render index', function () {
            var req = {};
            var res= {
                // creating a fake function
                render: sinon.spy()
            };

            authController.getIndex(req, res);
            res.render.calledOnce.should.be.true;
            res.render.firstCall.args[0].should.equal('index')
        })
    })

});
