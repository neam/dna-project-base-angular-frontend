angular.module('Gapminder').factory('MainConfig', [function() {
  return {
    authClientId: 'TestClient',
    homeTreeData: {
      "node_id": null,
      "menu_label": "Home",
      "caption": null,
      "url": null,
      "children": [
        {
          "node_id": null,
          "menu_label": "Facts",
          "caption": null,
          "url": null,
          "children": [
            {
              "node_id": null,
              "menu_label": "Gapminder World",
              "caption": null,
              "url": "http://www.gapminder.org/world"
            },
            {
              "node_id": null,
              "menu_label": "Answers",
              "caption": null,
              "url": "http://www.gapminder.org/1308"
            },
            {
              "node_id": null,
              "menu_label": "Ignorance Project",
              "caption": null,
              "url": "http://www.gapminder.org/ignorance"
            },
            {
              "node_id": null,
              "menu_label": "Data",
              "caption": null,
              "url": "http://www.gapminder.org/data"
            }
          ]
        },
        {
          "node_id": null,
          "menu_label": "Teach",
          "caption": null,
          "url": null,
          "children": [
            {
              "node_id": null,
              "menu_label": "For Teachers",
              "caption": null,
              "url": "http://www.gapminder.org/for-teachers"
            },
            {
              "node_id": null,
              "menu_label": "Slideshows",
              "caption": null,
              "url": "http://www.gapminder.org/presentations"
            },
            {
              "node_id": null,
              "menu_label": "Workshops",
              "caption": null,
              "url": "http://www.gapminder.org/workshops"
            },
            {
              "node_id": null,
              "menu_label": "Test Questions",
              "caption": null,
              "url": "http://www.gapminder.org/test-questions"
            }
          ]
        },
        {
          "node_id": null,
          "menu_label": "About",
          "caption": null,
          "url": null,
          "children": [
            {
              "node_id": null,
              "menu_label": "Our Organization",
              "caption": null,
              "url": "http://www.gapminder.org/about-gapminder"
            },
            {
              "node_id": null,
              "menu_label": "Blog",
              "caption": null,
              "url": "http://www.gapminder.org/news"
            },
            {
              "node_id": null,
              "menu_label": "FAQ",
              "caption": null,
              "url": "http://www.gapminder.org/faq_frequently_asked_questions"
            }
          ]
        }
      ]
    }
  };
}]);
