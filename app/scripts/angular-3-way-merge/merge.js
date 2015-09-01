/**
 * Angular-packaging of https://www.npmjs.com/package/3-way-merge
 *
 * 3-way merging of JavaScript objects
 * Takes 3 versions of the same object -- where version 2 and 3 are both
 * derived from version 1 -- and generates a 4th version, effectively
 * merging version 2 and 3 together. When a conflict is detected
 * (changes made in both version 2 and 3) changes from version 3 are used.
 *
 */
angular.module('3-way-merge', []).factory('merge', function () {

    var module = {};

    /*
     Function for 3-way merge

     @param {Object} o (original)
     @param {Object} a (current)
     @param {Object} b (new)
     @return {Object} Merged result
     */

    (function () {
        var merge,
            indexOf = [].indexOf || function (item) {
                    for (var i = 0, l = this.length; i < l; i++) {
                        if (i in this && this[i] === item) return i;
                    }
                    return -1;
                };

        merge = function (o, a, b) {
            var isArray, k, ov, ref, ref1, ref2, result;
            if (typeof o !== 'object') {
                throw new Error('Merge original document must be an object!');
            }
            if (typeof a !== 'object') {
                throw new Error('Merge current document must be an object!');
            }
            if (typeof b !== 'object') {
                throw new Error('Merge new document must be an object!');
            }
            isArray = Array.isArray(b);
            result = isArray ? [] : {};
            if (isArray) {
                if (!Array.isArray(a)) {
                    a = [];
                }
                if (!Array.isArray(o)) {
                    o = [];
                }
                for (k in a) {
                    if (!((ref = a[k], indexOf.call(b, ref) < 0) && (ref1 = a[k], indexOf.call(o, ref1) >= 0))) {
                        result.push(a[k]);
                    }
                }
                for (k in b) {
                    if (!k in a) {
                        result.push(b[k]);
                    } else if (typeof a[k] === 'object' && typeof b[k] === 'object') {
                        ov = k in o && typeof o[k] === 'object' ? o[k] : {};
                        result[k] = merge(ov, a[k], b[k]);
                    } else if (ref2 = b[k], indexOf.call(a, ref2) < 0) {
                        result.push(b[k]);
                    }
                }
            } else {
                if (Array.isArray(a)) {
                    a = {};
                }
                for (k in b) {
                    result[k] = b[k];
                }
                for (k in a) {
                    if (!k in result) {
                        result[k] = a[k];
                    } else if (a[k] !== result[k]) {
                        if (typeof a[k] === 'object' && typeof (b != null ? b[k] : void 0) === 'object') {
                            ov = (o != null) && k in o && typeof o[k] === 'object' ? o[k] : {};
                            result[k] = merge(ov, a[k], b[k]);
                        } else if ((b != null ? b[k] : void 0) === (o != null ? o[k] : void 0)) {
                            result[k] = a[k];
                        }
                    }
                }
            }
            return result;
        };

        module.exports = merge;

    }).call(this);

    return module.exports;

});