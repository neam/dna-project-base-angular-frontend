'use strict';

/* Filters */

angular.module('angular-frontend-filters', [])

    .filter('capitalize', function () {
        return function (input, scope) {
            if (input != null)
                input = input.toLowerCase();
            return input.substring(0, 1).toUpperCase() + input.substring(1);
        }
    })

    /**
     * Filesize Filter
     * @Param length, default is 0
     * @return string
     */
    .filter('filesize', function () {
        return function (size) {
            if (isNaN(size))
                size = 0;

            if (size < 1024)
                return size + ' Bytes';

            size /= 1024;

            if (size < 1024)
                return size.toFixed(2) + ' Kb';

            size /= 1024;

            if (size < 1024)
                return size.toFixed(2) + ' Mb';

            size /= 1024;

            if (size < 1024)
                return size.toFixed(2) + ' Gb';

            size /= 1024;

            return size.toFixed(2) + ' Tb';
        };
    });

;
