var func25 = function (t, e, n) {
    (function (t) {
        function n(t) {
            return Object.prototype.toString.call(t)
        }

        e.isArray = function (t) {
            return Array.isArray ? Array.isArray(t) : "[object Array]" === n(t)
        }, e.isBoolean = function (t) {
            return "boolean" == typeof t
        }, e.isNull = function (t) {
            return null === t
        }, e.isNullOrUndefined = function (t) {
            return null == t
        }, e.isNumber = function (t) {
            return "number" == typeof t
        }, e.isString = function (t) {
            return "string" == typeof t
        }, e.isSymbol = function (t) {
            return "symbol" == typeof t
        }, e.isUndefined = function (t) {
            return void 0 === t
        }, e.isRegExp = function (t) {
            return "[object RegExp]" === n(t)
        }, e.isObject = function (t) {
            return "object" == typeof t && null !== t
        }, e.isDate = function (t) {
            return "[object Date]" === n(t)
        }, e.isError = function (t) {
            return "[object Error]" === n(t) || t instanceof Error
        }, e.isFunction = function (t) {
            return "function" == typeof t
        }, e.isPrimitive = function (t) {
            return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t
        }, e.isBuffer = t.isBuffer
    }).call(this, n(2).Buffer)
}