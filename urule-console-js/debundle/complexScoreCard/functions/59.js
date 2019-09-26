var func59 = function (t, e, n) {
    "use strict";
    var r = n(9).rotr32;

    function i(t, e, n) {
        return t & e ^ ~t & n
    }

    function o(t, e, n) {
        return t & e ^ t & n ^ e & n
    }

    function a(t, e, n) {
        return t ^ e ^ n
    }

    e.ft_1 = function (t, e, n, r) {
        return 0 === t ? i(e, n, r) : 1 === t || 3 === t ? a(e, n, r) : 2 === t ? o(e, n, r) : void 0
    }, e.ch32 = i, e.maj32 = o, e.p32 = a, e.s0_256 = function (t) {
        return r(t, 2) ^ r(t, 13) ^ r(t, 22)
    }, e.s1_256 = function (t) {
        return r(t, 6) ^ r(t, 11) ^ r(t, 25)
    }, e.g0_256 = function (t) {
        return r(t, 7) ^ r(t, 18) ^ t >>> 3
    }, e.g1_256 = function (t) {
        return r(t, 17) ^ r(t, 19) ^ t >>> 10
    }
}