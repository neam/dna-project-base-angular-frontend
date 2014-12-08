describe('WildcardPageService', function() {
    var WildcardPageService;

    beforeEach(module('Gapminder'));

    beforeEach(inject(function(_WildcardPageService_) {
        WildcardPageService = _WildcardPageService_;
    }));

    it('should return a page API URL with a URL-encoded route (one level)', function() {
        expect(WildcardPageService.getPageApiUrl('/ebola')).toBe('http://localhost:1338/api/item/%2Febola');
    });

    it('should return a page API URL with a URL-encoded route (two levels)', function() {
        expect(WildcardPageService.getPageApiUrl('/ebola/dashboard')).toBe('http://localhost:1338/api/item/%2Febola%2Fdashboard');
    });

    it('should return a page API URL with a node ID (type number)', function() {
        expect(WildcardPageService.getPageApiUrl(100)).toBe('http://localhost:1338/api/item/100');
    });

    it('should return a page API URL with a node ID (type string)', function() {
        expect(WildcardPageService.getPageApiUrl('100')).toBe('http://localhost:1338/api/item/100');
    });
});
