let helper = require('./../helper/helper');
const mocha = require('mocha');
const { calculateCharge } = require('./../helper/helper');
const assert = require('chai').assert;



describe("Test for calculateCharge", ()=>{
    it("For 2 hours it should return 10", ()=>{
        assert.equal(10, calculateCharge(2));
    });
    it("For 9 hours it should return 80", ()=>{
        assert.equal(80, calculateCharge(9));
    });
    it("For 3 hours it should not return 30", ()=>{
        assert.notEqual(30, calculateCharge(3));
    });
});


