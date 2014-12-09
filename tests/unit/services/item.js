describe('ItemService', function() {
    var ItemService;

    beforeEach(module('Gapminder'));

    beforeEach(inject(function(_ItemService_) {
        ItemService = _ItemService_;
    }));

    it('should return a page API URL with a URL-encoded route (one level)', function() {
        expect(ItemService.getPageApiUrl('/ebola')).toBe('http://localhost:1338/api/item/%2Febola');
    });

    it('should return a page API URL with a URL-encoded route (two levels)', function() {
        expect(ItemService.getPageApiUrl('/ebola/dashboard')).toBe('http://localhost:1338/api/item/%2Febola%2Fdashboard');
    });

    it('should return a page API URL with a node ID (type number)', function() {
        expect(ItemService.getPageApiUrl(100)).toBe('http://localhost:1338/api/item/100');
    });

    it('should return a page API URL with a node ID (type string)', function() {
        expect(ItemService.getPageApiUrl('100')).toBe('http://localhost:1338/api/item/100');
    });
});
