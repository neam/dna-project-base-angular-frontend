describe('utils', function() {
    var Utils;

    beforeEach(module('Gapminder'));

    beforeEach(inject(function(_Utils_) {
        Utils = _Utils_;
    }));

    it('should strip a leading slash', function() {
        var str = '/path/with/leading/slash';
        str = Utils.stripLeadingSlash(str);
        expect(str).toBe('path/with/leading/slash');
    });

    it('should strip a trailing slash', function() {
        var str = '/path/with/trailing/slash/';
        str = Utils.stripTrailingSlash(str);
        expect(str).toBe('/path/with/trailing/slash');
    });

    it('should ensure a leading slash', function() {
        var str = 'path/without/leading/slash/';
        str = Utils.ensureLeadingSlash(str);
        expect(str).toBe('/path/without/leading/slash/');
    });

    it('should ensure a trailing slash', function() {
        var str = '/path/without/trailing/slash';
        str = Utils.ensureTrailingSlash(str);
        expect(str).toBe('/path/without/trailing/slash/');
    });
});
