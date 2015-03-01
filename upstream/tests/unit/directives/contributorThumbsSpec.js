describe('contributorThumbs', function() {
  var $rootScope,
      $controller,
      $scope,
      $compile,
      itemWithValidContributors = {
        "contributors": [
          {
            "user_id": "2",
            "username": "olarosling",
            "thumbnail_url": "http://placehold.it/200x200",
            "contributions": null
          }
        ]
      },
    itemWithInvalidContributors = {
      "contributors": [
        {
          "user_id": "2",
          "username": "olarosling",
          "thumbnail_url": null,
          "contributions": null
        }
      ]
    };

  beforeEach(module('Gapminder'));
  beforeEach(module('templates/directives/contributor-thumbs.html'));

  beforeEach(inject(function(_$rootScope_, _$controller_, _$compile_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $compile = _$compile_;
  }));

  beforeEach(function() {
    $scope = $rootScope.$new();
  });

  it('should not render valid contributors', function() {
    $scope.item = itemWithValidContributors;
    var element = $compile('<contributor-thumbs contributors="item.contributors"></contributor-thumbs>')($scope);
    element.scope().$apply();
    expect(element.find('a').length > 0).toBeTruthy();
  });

  it('should not render invalid contributors', function() {
    $scope.item = itemWithInvalidContributors;
    var element = $compile('<contributor-thumbs contributors="item.contributors"></contributor-thumbs>')($scope);
    element.scope().$apply();
    expect(element.find('a').length).toBe(0);
  });

  it('should render container when valid contributors exist', function() {
    $scope.item = itemWithValidContributors;
    var element = $compile('<contributor-thumbs contributors="item.contributors"></contributor-thumbs>')($scope);
    element.scope().$apply();
    expect(element.find('.contributors').hasClass('ng-hide')).toBeFalsy();
    expect(element.isolateScope().shouldRenderContainer).toBeTruthy();
  });

  it('should hide container when no valid contributors exist', function() {
    $scope.item = itemWithInvalidContributors;
    var element = $compile('<contributor-thumbs contributors="item.contributors"></contributor-thumbs>')($scope);
    element.scope().$apply();
    expect(element.find('.contributors').hasClass('ng-hide')).toBeTruthy();
    expect(element.isolateScope().shouldRenderContainer).toBe(undefined);
  });

  it('should render link to contributor profile', function() {
    $scope.item = itemWithValidContributors;
    var element = $compile('<contributor-thumbs contributors="item.contributors"></contributor-thumbs>')($scope);
    element.scope().$apply();
    expect(element.find('a').attr('href')).toBe('http://www.gapminder.org/profiles/2');
  });
});
