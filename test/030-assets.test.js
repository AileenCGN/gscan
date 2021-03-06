/*globals describe, it */
var should = require('should'),
    utils = require('./utils'),
    thisCheck = require('../lib/checks/030-assets');

describe('Assets', function () {
    it('should show an error for missing asset helper when an asset is detected (theme example e)', function (done) {
        utils.testCheck(thisCheck, 'example-e').then(function (output) {
            output.should.be.a.ValidThemeObject();

            output.results.pass.should.be.an.Array().which.is.empty();

            output.results.fail.should.be.an.Object().with.keys('GS030-ASSET-REQ');
            output.results.fail['GS030-ASSET-REQ'].should.be.a.ValidFailObject();
            output.results.fail['GS030-ASSET-REQ'].failures.should.be.an.Array().with.lengthOf(1);
            output.results.fail['GS030-ASSET-REQ'].failures[0].should.have.keys('ref');
            output.results.fail['GS030-ASSET-REQ'].failures[0].ref.should.eql('/assets/css/style.css');

            done();
        }).catch(done);
    });

    it('should pass when asset helper is present (theme example f)', function (done) {
        utils.testCheck(thisCheck, 'example-f').then(function (output) {
            output.should.be.a.ValidThemeObject();

            output.results.fail.should.be.an.Object().which.is.empty();

            output.results.pass.should.be.an.Array().with.lengthOf(1);
            output.results.pass.should.containEql('GS030-ASSET-REQ');

            done();
        }).catch(done);
    });
});
