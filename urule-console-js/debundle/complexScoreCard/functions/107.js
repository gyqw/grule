var func107 = function (module, exports, __webpack_require__) {
    var indexOf = __webpack_require__(106), Object_keys = function (t) {
            if (Object.keys) return Object.keys(t);
            var e = [];
            for (var n in t) e.push(n);
            return e
        }, forEach = function (t, e) {
            if (t.forEach) return t.forEach(e);
            for (var n = 0; n < t.length; n++) e(t[n], n, t)
        }, defineProp = function () {
            try {
                return Object.defineProperty({}, "_", {}), function (t, e, n) {
                    Object.defineProperty(t, e, {writable: !0, enumerable: !1, configurable: !0, value: n})
                }
            } catch (t) {
                return function (t, e, n) {
                    t[e] = n
                }
            }
        }(),
        globals = ["Array", "Boolean", "Date", "Error", "EvalError", "Function", "Infinity", "JSON", "Math", "NaN", "Number", "Object", "RangeError", "ReferenceError", "RegExp", "String", "SyntaxError", "TypeError", "URIError", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "undefined", "unescape"];

    function Context() {
    }

    Context.prototype = {};
    var Script = exports.Script = function (t) {
        if (!(this instanceof Script)) return new Script(t);
        this.code = t
    };
    Script.prototype.runInContext = function (t) {
        if (!(t instanceof Context)) throw new TypeError("needs a 'context' argument.");
        var e = document.createElement("iframe");
        e.style || (e.style = {}), e.style.display = "none", document.body.appendChild(e);
        var n = e.contentWindow, r = n.eval, i = n.execScript;
        !r && i && (i.call(n, "null"), r = n.eval), forEach(Object_keys(t), function (e) {
            n[e] = t[e]
        }), forEach(globals, function (e) {
            t[e] && (n[e] = t[e])
        });
        var o = Object_keys(n), a = r.call(n, this.code);
        return forEach(Object_keys(n), function (e) {
            (e in t || -1 === indexOf(o, e)) && (t[e] = n[e])
        }), forEach(globals, function (e) {
            e in t || defineProp(t, e, n[e])
        }), document.body.removeChild(e), a
    }, Script.prototype.runInThisContext = function () {
        return eval(this.code)
    }, Script.prototype.runInNewContext = function (t) {
        var e = Script.createContext(t), n = this.runInContext(e);
        return forEach(Object_keys(e), function (n) {
            t[n] = e[n]
        }), n
    }, forEach(Object_keys(Script.prototype), function (t) {
        exports[t] = Script[t] = function (e) {
            var n = Script(e);
            return n[t].apply(n, [].slice.call(arguments, 1))
        }
    }), exports.createScript = function (t) {
        return exports.Script(t)
    }, exports.createContext = Script.createContext = function (t) {
        var e = new Context;
        return "object" == typeof t && forEach(Object_keys(t), function (n) {
            e[n] = t[n]
        }), e
    }
}