angular.module('Gapminder').factory('EnvironmentConfig', [function() {
    return {
        homeTreeData: {
            "node_id": null,
            "menu_label": "Home",
            "caption": null,
            "url": null,
            "children": [
                {
                    "node_id": null,
                    "menu_label": "Health",
                    "caption": "About health.",
                    "url": null,
                    "children": [
                        {
                            "node_id": 3,
                            "menu_label": "Ebola",
                            "caption": "Most people need more money to lead a good life.",
                            "url": "/ebola"
                        }
                    ]
                },
                {
                    "node_id": null,
                    "menu_label": "Exercises",
                    "caption": null,
                    "url": null,
                    "children": [
                        {
                            "node_id": 4,
                            "menu_label": "Ebola Dashboard",
                            "caption": null,
                            "url": "/ebola/dashboard"
                        }
                    ]
                }
            ]
        }
    };
}]);
