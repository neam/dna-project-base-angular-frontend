describe('NavigationService', function() {
    var $rootScope,
        $controller,
        $location,
        NavigationService;

    beforeEach(module('Gapminder'));

    beforeEach(inject(function(_$rootScope_, _$controller_, _$location_, _NavigationService_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $location = _$location_;
        NavigationService = _NavigationService_;
    }));

    afterEach(function() {
        resetLocation();
    });

    it('should return base route at www.gapminder.org', function() {
        setLocation('www.gapminder.org', '', '');
        expect(NavigationService.getBaseRoute()).toBe('/');
    });

    it('should return base route at www.gapminder.org/ebola', function() {
        setLocation('www.gapminder.org', '', '/ebola');
        expect(NavigationService.getBaseRoute()).toBe('/');
    });

    it('should return base route at www.gapminder.org/exercises/ejercicio-con-video', function() {
        setLocation('www.gapminder.org', '', '/exercises/ejercicio-con-video');
        expect(NavigationService.getBaseRoute()).toBe('/');
    });

    it('should return base route at www.gapminder.org/exercises/100', function() {
        setLocation('www.gapminder.org', '', '/exercises/100');
        expect(NavigationService.getBaseRoute()).toBe('/');
    });

    it('should return base route at www.gapminder.org/ebola/dashboard', function() {
        setLocation('www.gapminder.org', '', '/ebola/dashboard');
        expect(NavigationService.getBaseRoute()).toBe('/');
    });

    it('should return base route at static.gapminder.org/pages-desktop-stage-with-mock/#/ebola', function() {
        setLocation('static.gapminder.org', 'pages-desktop-stage-with-mock', '/ebola', true);
        expect(NavigationService.getBaseRoute()).toBe('/pages-desktop-stage-with-mock/');
    });

    it('should return base route at static.gapminder.org/pages-desktop-stage-with-mock/#/ebola/dashboard', function() {
        setLocation('static.gapminder.org', 'pages-desktop-stage-with-mock', '/ebola/dashboard', true);
        expect(NavigationService.getBaseRoute()).toBe('/pages-desktop-stage-with-mock/');
    });

    it('should return base route at static.gapminder.org/pages-desktop-stage-with-mock/#/exercises/ejercicio-con-video', function() {
        setLocation('static.gapminder.org', 'pages-desktop-stage-with-mock', '/exercises/ejercicio-con-video', true);
        expect(NavigationService.getBaseRoute()).toBe('/pages-desktop-stage-with-mock/');
    });

    it('should return base route at static.gapminder.org/pages-desktop-stage-with-mock/#/exercises/100', function() {
        setLocation('static.gapminder.org', 'pages-desktop-stage-with-mock', '/exercises/100', true);
        expect(NavigationService.getBaseRoute()).toBe('/pages-desktop-stage-with-mock/');
    });

    it('should identify http://www.gapminder.org/ebola as an absolute URL', function() {
        expect(NavigationService.isAbsoluteUrl('http://www.gapminder.org/ebola')).toBe(true);
    });

    it('should identify /ebola/dashboard as an absolute URL', function() {
        expect(NavigationService.isAbsoluteUrl('/ebola/dashboard')).toBe(false);
    });

    /**
     * Overrides $location.
     * @param {string} host
     * @param {string} subdir
     * @param {string} route
     * @param {boolean} [useHashbang] whether to include a hashbang (defaults to false).
     */
    function setLocation(host, subdir, route, useHashbang) {
        var useHashbang = angular.isDefined(useHashbang) ? useHashbang : false,
            subdir = subdir.length > 0 ? '/' + subdir : '',
            hashbang = useHashbang ? '/#' : '';

        $location.$$host = host;
        $location.$$path = route;
        $location.$$url = route;
        $location.$$absUrl = 'http://' + host + subdir + hashbang + route;
    }

    /**
     * Resets $location.
     */
    function resetLocation() {
        $location.$$host = 'server';
        $location.$$path = '';
        $location.$$url = '';
        $location.$$absUrl = 'http://server/';
    }
});
