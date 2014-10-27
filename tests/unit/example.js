describe('login', function() {
    var $rootScope,
        $controller,
        $httpBackend,
        $scope,
        $q,
        ConfigService,
        UserService,
        NavigationService,
        HomeCtrl;

    beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_, _$q_, _ConfigService_, _UserService_, _NavigationService_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        ConfigService = _ConfigService_;
        NavigationService = _NavigationService_;
        UserService = _UserService_;
    }));

    beforeEach(function() {
        $scope = $rootScope.$new();

        HomeCtrl = $controller('HomeCtrl', {
            $scope: $scope
        });
    });

    it('should return true', function() {
        expect('foo').toBe('foo');
    });
});
