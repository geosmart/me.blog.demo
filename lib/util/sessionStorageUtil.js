//sessionStorage
var storage = function () {
    var cacheObj = window.sessionStorage || {
        getItem: function (key) {
            return this[key];
        },
        setItem: function (key, value) {
            this[key] = value;
        }
    };

    return {
        get: function (key) {
            return this.isFresh(key);
        }, 
        set: function (key, value, minutes) {
            var expDate = new Date();
            expDate.setMinutes(expDate.getMinutes() + (minutes || 0));

            try {
                cacheObj.setItem(key, JSON.stringify({
                    value: value,
                    expires: expDate.getTime()
                }));
            }
            catch (e) { }
        },
        isFresh: function (key) {
            // 返回值或者返回false
            var item;
            try {
                item = JSON.parse(cacheObj.getItem(key));
            }
            catch (e) { }
            if (!item) return false;
            var expireDate = item.expires;
            var nowDate = new Date().getTime();
            // 日期算法
            return nowDate > expireDate ? false : item.value;
        }
    }
}