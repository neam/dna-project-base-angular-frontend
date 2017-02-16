'use strict';

function setDepth(obj, path, value, strict) {
    let tags = path.split("."), len = tags.length - 1;
    for (let i = 0; i < len; i++) {
        if (typeof obj[tags[i]] === 'undefined') {
            if (strict) {
                console.log('setDepth obj[tags[i]] undefined', obj, tags[i], i);
            } else {
                obj[tags[i]] = {};
            }
        }
        obj = obj[tags[i]];
    }
    obj[tags[len]] = value;
}

export default setDepth;
