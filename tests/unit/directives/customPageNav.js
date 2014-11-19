describe('customPageNav', function() {
    var $rootScope,
        $controller,
        $compile,
        $scope,
        item = {
            "node_id": 1024,
            "heading": "Ebola",
            "subheading": "This is the ebola page.",
            "about": "<h2>Overview</h2>This is an <em>example item</em>.\n<h2>Sidenotes</h2><ul><li>Foo</li><li>Bar</li></ul>",
            "item_type": "page",
            "id": 1,
            "permalink": "ebola",
            "composition_type": "exercise",
            "page_hierarchy": {
                "siblings": null,
                "children": [
                    {
                        "node_id": 31,
                        "menu_label": "Dashboard",
                        "caption": "This is the dashboard.",
                        "url": "/ebola/dashboard"
                    },
                    {
                        "node_id": 32,
                        "menu_label": "Hans's Videos",
                        "caption": "Here are some videos by Hans. ",
                        "url": "/ebola/hans-videos"
                    },
                    {
                        "node_id": 33,
                        "menu_label": "Data",
                        "caption": "Here is some data. ",
                        "url": "/ebola/data"
                    },
                    {
                        "node_id": 34,
                        "menu_label": "About",
                        "caption": "This is the about page.",
                        "url": "/ebola/about"
                    }
                ],
                "parent_path": [
                    {
                        "node_id": 100,
                        "menu_label": "Parent",
                        "caption": "This is the parent page.",
                        "url": "/parent"
                    }
                ]
            },
            "composition": {
                "data": []
            },
            "contributors": null,
            "related": null
        };

    beforeEach(module('Gapminder'));
    beforeEach(module('templates/directives/custom-page-nav.html'));

    beforeEach(inject(function(_$rootScope_, _$controller_, _$compile_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $compile = _$compile_;
    }));

    beforeEach(function() {
        $scope = $rootScope.$new();
        $scope.item = item;
    });

    it('should check if page has a parent', function() {
        var element = $compile('<custom-page-nav item="item"></custom-page-nav>')($scope);
        element.scope().$apply();
        expect(element.isolateScope().hasParent()).toBe(true);
    });

    it('should check if page has a sibling', function() {
        var element = $compile('<custom-page-nav item="item"></custom-page-nav>')($scope);
        element.scope().$apply();
        expect(element.isolateScope().hasSibling()).toBe(false);
    });

    it('should check if page has a child', function() {
        var element = $compile('<custom-page-nav item="item"></custom-page-nav>')($scope);
        element.scope().$apply();
        expect(element.isolateScope().hasChild()).toBe(true);
    });

    it('should get all parents', function() {
        var element = $compile('<custom-page-nav item="item"></custom-page-nav>')($scope);
        element.scope().$apply();
        expect(element.isolateScope().getParents().length).toBe(1);
    });

    it('should get all siblings', function() {
        $scope.item.page_hierarchy.siblings = [
            {
                "node_id": 200,
                "menu_label": "Sibling",
                "caption": "This is a sibling. ",
                "url": "/sibling"
            }
        ];

        var element = $compile('<custom-page-nav item="item"></custom-page-nav>')($scope);
        element.scope().$apply();
        expect(element.isolateScope().getSiblings().length).toBe(1);
    });

    it('should get all children', function() {
        var element = $compile('<custom-page-nav item="item"></custom-page-nav>')($scope);
        element.scope().$apply();
        expect(element.isolateScope().getChildren().length).toBe(4);
    });
});
