angular.module('Gapminder').factory('menuFactory', function($location, $q, configManager) {
  return {
    type: {
      HOME: 'home',
      ROOT_PAGE: 'root_page'
    },
    trees: {
      home: null,
      root_page: null,
      current: null
    },
    currentType: null,
    currentParentId: null,

    /**
     * Returns the home tree data.
     * @returns {}
     */
    getHomeTreeData: function() {
      return configManager.get('homeTreeData');
    },

    /**
     * Returns the home menu items.
     * @returns {}
     */
    getHomeMenuItems: function() {
      var tree = this.getHomeTreeData();
      return angular.isDefined(tree.children) ? tree.children : null;
    },

    /**
     * Returns the current URL.
     * @returns {string}
     */
    getCurrentUrl: function() {
      return $location.$$path;
    },

    /**
     * Returns the current root page item.
     * @returns {Deferred.promise}
     */
    getCurrentRootPageItem: function() {
      var tree = this.trees.root_page,
          currentRoute = this.getCurrentUrl(),
          dfd = $q.defer();

      recursive(tree);

      function recursive(items) {
        angular.forEach(items, function(item) {
          if (item.url === currentRoute) {
            dfd.resolve(item);
          } else if (item && _.isArray(item.children)) {
            recursive(item.children);
          }
        });
      }

      return dfd.promise;
    },

    /**
     * Returns the children of the current root page item.
     * @returns {Deferred.promise}
     */
    getChildrenOfCurrentRootPageItem: function() {
      var dfd = $q.defer();

      this.getCurrentRootPageItem()
        .then(function(item) {
          if (angular.isDefined(item.children)) {
            dfd.resolve(item.children);
          } else {
            dfd.resolve(null);
          }
        });

      return dfd.promise;
    },

    /**
     * Returns the parent of the current root page item.
     * @returns {Deferred.promise}
     */
    getParentOfCurrentRootPageItem: function() {
      var self = this,
          dfd = $q.defer();

      self.getCurrentRootPageItem()
        .then(function(item) {
          self.getRootPageItemById(item.grandparentId)
            .then(function(grandparent) {
              dfd.resolve(grandparent);
            });
        });

      return dfd.promise;
    },

    /**
     * Fetches a root page item by ID.
     * @param {number} id
     * @returns {Deferred.promise}
     */
    getRootPageItemById: function(id) {
      var tree = this.trees.root_page,
          dfd = $q.defer();

      recursive(tree);

      function recursive(items) {
        angular.forEach(items, function(item) {
          if (item.id === id) {
            dfd.resolve(item);
          } else if (angular.isDefined(item.children)) {
            recursive(item.children);
          }
        });
      }

      return dfd.promise;
    },

    /**
     * Validates the type
     * @param type
     * @returns {boolean}
     */
    validateType: function(type) {
      return _.contains(this.type, type);
    },

    /**
     * Builds the home menu tree.
     * @param {string} type 'home' or 'root_page'
     * @param {} data
     */
    buildTree: function(type, data) {
      if (!this.validateType(type)) {
        throw new Error("Type must be 'home' or 'root_page'.");
      }

      var count = 1,
          tree = [],
          root = createRoot(data);

      angular.forEach(data.children, function(originalItem) {
        var item = createItem(originalItem);
        assignParentAttributes(root, item);
        root.children.push(item);
        recursive(item, originalItem);
      });

      // Add root to tree
      tree.push(root);

      // Add to this.trees
      this.trees[type] = tree;

      /**
       * Creates child items recursively.
       * @param {} item
       * @param {} originalItem
       * @private
       */
      function recursive(item, originalItem) {
        if (_.isArray(originalItem.children)) {
          item.children = [];

          angular.forEach(originalItem.children, function(originalChild) {
            var child = createItem(originalChild);
            assignParentAttributes(item, child);
            item.children.push(child);
            recursive(child, originalChild);
          });
        }
      }

      /**
       * Creates a new item.
       * @param originalItem
       * @returns {}
       * @private
       */
      function createItem(originalItem) {
        var item = angular.copy(originalItem);
        item.id = generateId();
        return item;
      }

      /**
       * Creates the tree root (root item).
       * @param {} data
       * @returns {}
       */
      function createRoot(data) {
        var root = {
          id: generateId(),
          menu_label: angular.isDefined(data.menu_label) ? data.menu_label : null,
          caption: angular.isDefined(data.caption) ? data.caption : null,
          node_id: angular.isDefined(data.node_id) ? data.node_id : null,
          url: angular.isDefined(data.url) ? data.url : null
        };

        if (_.isArray(data.children)) {
          root.children = [];
        }

        return root;
      }

      /**
       * Assigns a parent attributes to a child item.
       * @param {} parent parent item
       * @param {} child child item
       * @private
       */
      function assignParentAttributes(parent, child) {
        // Parent ID
        if (angular.isDefined(parent.id)) {
          child.parentId = angular.copy(parent.id);
        }

        // Grandparent ID
        if (angular.isDefined(parent.parentId)) {
          child.grandparentId = angular.copy(parent.parentId);
        }

        // Parent menu label
        if (angular.isDefined(parent.menu_label)) {
          child.parentMenuLabel = angular.copy(parent.menu_label);
        }

        // Grandparent menu label
        if (angular.isDefined(parent.parentMenuLabel)) {
          child.grandparentMenuLabel = angular.copy(parent.parentMenuLabel);
        }
      }

      /**
       * Generates a new ID.
       * @returns {number}
       * @private
       */
      function generateId() {
        return count++;
      }
    }
  };
});
