describe('tokenInterceptor', function() {
    var $httpBackend,
        $http,
        $httpProvider,
        tokenInterceptor,
        api,
        UserService;

    beforeEach(module('Gapminder', function(_$httpProvider_) {
        $httpProvider = _$httpProvider_;
    }));

    beforeEach(inject(function(_$httpBackend_, _$http_, _tokenInterceptor_, _api_, _UserService_) {
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        tokenInterceptor = _tokenInterceptor_;
        api = _api_;
        UserService = _UserService_;

        UserService.logout();
    }));

    it('should register the token interceptor', function() {
        expect($httpProvider.interceptors).toContain('tokenInterceptor');
    });

    it('should set authorization header in request', function() {
        var authToken = '2345dfdd29222dd9';
        UserService.saveAuthToken(authToken);
        var config = tokenInterceptor.request({headers: {}});
        expect(config.headers['Authorization']).toBe('Bearer ' + authToken);
    });

    it('should not set authorization header in request', function() {
        var config = tokenInterceptor.request({headers: {}});
        expect(config.headers['Authorization']).toBeUndefined();
    });

    it('should request new auth token on 401 and when refresh token exists', function() {
        var url = '/some-url-that-requires-authentication';
        UserService.saveRefreshToken('cba321');
        spyOn(UserService, 'refreshAuthToken').and.callThrough();
        $http.get(url);
        $httpBackend.when('GET', url).respond(401);
        $httpBackend.expect('POST', api.getApiUrl('/user/login')).respond(200, {
            access_token: 'foo',
            refresh_token: 'bar'
        });
        $httpBackend.expect('GET', api.getApiUrl('/user/info')).respond(200);
        $httpBackend.flush();
        expect(UserService.refreshAuthToken).toHaveBeenCalled();
    });

    it('should not request new auth token on 401 when refresh token does not exist', function() {
        var url = '/some-url-that-requires-authentication';
        spyOn(UserService, 'refreshAuthToken');
        $http.get(url);
        $httpBackend.when('GET', url).respond(401);
        $httpBackend.flush();
        expect(UserService.refreshAuthToken).not.toHaveBeenCalled();
    });
});
