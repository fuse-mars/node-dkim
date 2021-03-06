var assert = require( 'assert' )
var crypto = require( 'crypto' )
var DKIM = require( '..' )

describe( 'DKIM', function() {

  describe( '.processBody()', function() {

    context( '"simple" method', function() {

      it( 'normalizes empty body', function() {

        var body = new Buffer( '', 'ascii' )
        var result = DKIM.processBody( body, 'simple' )
        var hash = crypto.createHash( 'sha256' )
          .update( result )
          .digest( 'base64' )

        assert.deepEqual( result, '\r\n' )
        assert.equal( hash, 'frcCV1k9oG9oKj3dpUqdJg1PxRT2RSN/XKdLCPjaYaY=' )

      })

      it( 'normalizes RFC 6376 Example 2', function() {

        var body = new Buffer( ' C \r\nD \t E\r\n\r\n\r\n', 'ascii' )
        var result = DKIM.processBody( body, 'simple' )

        assert.equal( result, ' C \r\nD \t E\r\n' )

      })

    })

    context( '"relaxed" method', function() {

      it( 'normalizes empty body', function() {

        var body = new Buffer( '', 'ascii' )
        var result = DKIM.processBody( body, 'relaxed' )
        var hash = crypto.createHash( 'sha256' )
          .update( result )
          .digest( 'base64' )

        assert.deepEqual( result, '' )
        assert.equal( hash, '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' )

      })

      it( 'normalizes RFC 6376 Example 1', function() {

        var body = new Buffer( ' C \r\nD \t E\r\n\r\n\r\n', 'ascii' )
        var result = DKIM.processBody( body, 'relaxed' )

        assert.equal( result, ' C\r\nD E\r\n' )

      })

    })

  })

})
