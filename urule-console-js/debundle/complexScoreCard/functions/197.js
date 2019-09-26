var func197 = function (t, e, n) {
    var r;
    r = function () {
        return function (t) {
            function e(r) {
                if (n[r]) return n[r].exports;
                var i = n[r] = {exports: {}, id: r, loaded: !1};
                return t[r].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
            }

            var n = {};
            return e.m = t, e.c = n, e.p = "", e(0)
        }([function (t, e, n) {
            var r, i;
            r = [n(1), n(3), n(4)], void 0 === (i = function (t) {
                return t
            }.apply(e, r)) || (t.exports = i)
        }, function (t, e, n) {
            var r, i;
            r = [n(2)], void 0 === (i = function (t) {
                function e(n) {
                    if (e.is(n, "function")) return y ? n() : t.on("raphael.DOMload", n);
                    if (e.is(n, z)) return e._engine.create[B](e, n.splice(0, 3 + e.is(n[0], Y))).add(n);
                    var r = Array.prototype.slice.call(arguments, 0);
                    if (e.is(r[r.length - 1], "function")) {
                        var i = r.pop();
                        return y ? i.call(e._engine.create[B](e, r)) : t.on("raphael.DOMload", function () {
                            i.call(e._engine.create[B](e, r))
                        })
                    }
                    return e._engine.create[B](e, arguments)
                }

                function n(t) {
                    if ("function" == typeof t || Object(t) !== t) return t;
                    var e = new t.constructor;
                    for (var r in t) t[_](r) && (e[r] = n(t[r]));
                    return e
                }

                function r(t, e, n) {
                    return function r() {
                        var i = Array.prototype.slice.call(arguments, 0), o = i.join("␀"), a = r.cache = r.cache || {},
                            s = r.count = r.count || [];
                        return a[_](o) ? (function (t, e) {
                            for (var n = 0, r = t.length; n < r; n++) if (t[n] === e) return t.push(t.splice(n, 1)[0])
                        }(s, o), n ? n(a[o]) : a[o]) : (s.length >= 1e3 && delete a[s.shift()], s.push(o), a[o] = t[B](e, i), n ? n(a[o]) : a[o])
                    }
                }

                function i() {
                    return this.hex
                }

                function o(t, e) {
                    for (var n = [], r = 0, i = t.length; i - 2 * !e > r; r += 2) {
                        var o = [{x: +t[r - 2], y: +t[r - 1]}, {x: +t[r], y: +t[r + 1]}, {
                            x: +t[r + 2],
                            y: +t[r + 3]
                        }, {x: +t[r + 4], y: +t[r + 5]}];
                        e ? r ? i - 4 == r ? o[3] = {x: +t[0], y: +t[1]} : i - 2 == r && (o[2] = {
                            x: +t[0],
                            y: +t[1]
                        }, o[3] = {x: +t[2], y: +t[3]}) : o[0] = {
                            x: +t[i - 2],
                            y: +t[i - 1]
                        } : i - 4 == r ? o[3] = o[2] : r || (o[0] = {
                            x: +t[r],
                            y: +t[r + 1]
                        }), n.push(["C", (-o[0].x + 6 * o[1].x + o[2].x) / 6, (-o[0].y + 6 * o[1].y + o[2].y) / 6, (o[1].x + 6 * o[2].x - o[3].x) / 6, (o[1].y + 6 * o[2].y - o[3].y) / 6, o[2].x, o[2].y])
                    }
                    return n
                }

                function a(t, e, n, r, i) {
                    return t * (t * (-3 * e + 9 * n - 9 * r + 3 * i) + 6 * e - 12 * n + 6 * r) - 3 * e + 3 * n
                }

                function s(t, e, n, r, i, o, s, c, f) {
                    null == f && (f = 1);
                    for (var u = (f = f > 1 ? 1 : f < 0 ? 0 : f) / 2, l = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], h = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], d = 0, p = 0; p < 12; p++) {
                        var b = u * l[p] + u, g = a(b, t, n, i, s), y = a(b, e, r, o, c), m = g * g + y * y;
                        d += h[p] * N.sqrt(m)
                    }
                    return u * d
                }

                function c(t, e, n, r, i, o, a, s) {
                    if (!(j(t, n) < L(i, a) || L(t, n) > j(i, a) || j(e, r) < L(o, s) || L(e, r) > j(o, s))) {
                        var c = (t - n) * (o - s) - (e - r) * (i - a);
                        if (c) {
                            var f = ((t * r - e * n) * (i - a) - (t - n) * (i * s - o * a)) / c,
                                u = ((t * r - e * n) * (o - s) - (e - r) * (i * s - o * a)) / c, l = +f.toFixed(2),
                                h = +u.toFixed(2);
                            if (!(l < +L(t, n).toFixed(2) || l > +j(t, n).toFixed(2) || l < +L(i, a).toFixed(2) || l > +j(i, a).toFixed(2) || h < +L(e, r).toFixed(2) || h > +j(e, r).toFixed(2) || h < +L(o, s).toFixed(2) || h > +j(o, s).toFixed(2))) return {
                                x: f,
                                y: u
                            }
                        }
                    }
                }

                function f(t, n, r) {
                    var i = e.bezierBBox(t), o = e.bezierBBox(n);
                    if (!e.isBBoxIntersect(i, o)) return r ? 0 : [];
                    for (var a = s.apply(0, t), f = s.apply(0, n), u = j(~~(a / 5), 1), l = j(~~(f / 5), 1), h = [], d = [], p = {}, b = r ? 0 : [], g = 0; g < u + 1; g++) {
                        var y = e.findDotsAtSegment.apply(e, t.concat(g / u));
                        h.push({x: y.x, y: y.y, t: g / u})
                    }
                    for (g = 0; g < l + 1; g++) y = e.findDotsAtSegment.apply(e, n.concat(g / l)), d.push({
                        x: y.x,
                        y: y.y,
                        t: g / l
                    });
                    for (g = 0; g < u; g++) for (var m = 0; m < l; m++) {
                        var v = h[g], A = h[g + 1], w = d[m], _ = d[m + 1], E = Q(A.x - v.x) < .001 ? "y" : "x",
                            x = Q(_.x - w.x) < .001 ? "y" : "x", C = c(v.x, v.y, A.x, A.y, w.x, w.y, _.x, _.y);
                        if (C) {
                            if (p[C.x.toFixed(4)] == C.y.toFixed(4)) continue;
                            p[C.x.toFixed(4)] = C.y.toFixed(4);
                            var B = v.t + Q((C[E] - v[E]) / (A[E] - v[E])) * (A.t - v.t),
                                S = w.t + Q((C[x] - w[x]) / (_[x] - w[x])) * (_.t - w.t);
                            B >= 0 && B <= 1.001 && S >= 0 && S <= 1.001 && (r ? b++ : b.push({
                                x: C.x,
                                y: C.y,
                                t1: L(B, 1),
                                t2: L(S, 1)
                            }))
                        }
                    }
                    return b
                }

                function u(t, n, r) {
                    t = e._path2curve(t), n = e._path2curve(n);
                    for (var i, o, a, s, c, u, l, h, d, p, b = r ? 0 : [], g = 0, y = t.length; g < y; g++) {
                        var m = t[g];
                        if ("M" == m[0]) i = c = m[1], o = u = m[2]; else {
                            "C" == m[0] ? (i = (d = [i, o].concat(m.slice(1)))[6], o = d[7]) : (d = [i, o, i, o, c, u, c, u], i = c, o = u);
                            for (var v = 0, A = n.length; v < A; v++) {
                                var w = n[v];
                                if ("M" == w[0]) a = l = w[1], s = h = w[2]; else {
                                    "C" == w[0] ? (a = (p = [a, s].concat(w.slice(1)))[6], s = p[7]) : (p = [a, s, a, s, l, h, l, h], a = l, s = h);
                                    var _ = f(d, p, r);
                                    if (r) b += _; else {
                                        for (var E = 0, x = _.length; E < x; E++) _[E].segment1 = g, _[E].segment2 = v, _[E].bez1 = d, _[E].bez2 = p;
                                        b = b.concat(_)
                                    }
                                }
                            }
                        }
                    }
                    return b
                }

                function l(t, e, n, r, i, o) {
                    null != t ? (this.a = +t, this.b = +e, this.c = +n, this.d = +r, this.e = +i, this.f = +o) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)
                }

                function h() {
                    return this.x + M + this.y + M + this.width + " × " + this.height
                }

                function d(t, e, n, r, i, o) {
                    function a(t) {
                        return ((f * t + c) * t + s) * t
                    }

                    var s = 3 * e, c = 3 * (r - e) - s, f = 1 - s - c, u = 3 * n, l = 3 * (i - n) - u, h = 1 - u - l;
                    return function (t, e) {
                        var n = function (t, e) {
                            var n, r, i, o, u, l;
                            for (i = t, l = 0; l < 8; l++) {
                                if (o = a(i) - t, Q(o) < e) return i;
                                if (Q(u = (3 * f * i + 2 * c) * i + s) < 1e-6) break;
                                i -= o / u
                            }
                            if (r = 1, (i = t) < (n = 0)) return n;
                            if (i > r) return r;
                            for (; n < r;) {
                                if (o = a(i), Q(o - t) < e) return i;
                                t > o ? n = i : r = i, i = (r - n) / 2 + n
                            }
                            return i
                        }(t, 1 / (200 * o));
                        return ((h * n + l) * n + u) * n
                    }(t)
                }

                function p(t, e) {
                    var n = [], r = {};
                    if (this.ms = e, this.times = 1, t) {
                        for (var i in t) t[_](i) && (r[W(i)] = t[i], n.push(W(i)));
                        n.sort(ct)
                    }
                    this.anim = r, this.top = n[n.length - 1], this.percents = n
                }

                function b(n, r, i, o, a, s) {
                    i = W(i);
                    var c, f, u, h, p, b, g = n.ms, y = {}, m = {}, A = {};
                    if (o) for (E = 0, x = ne.length; E < x; E++) {
                        var w = ne[E];
                        if (w.el.id == r.id && w.anim == n) {
                            w.percent != i ? (ne.splice(E, 1), u = 1) : f = w, r.attr(w.totalOrigin);
                            break
                        }
                    } else o = +m;
                    for (var E = 0, x = n.percents.length; E < x; E++) {
                        if (n.percents[E] == i || n.percents[E] > o * n.top) {
                            i = n.percents[E], p = n.percents[E - 1] || 0, g = g / n.top * (i - p), h = n.percents[E + 1], c = n.anim[i];
                            break
                        }
                        o && r.attr(n.anim[n.percents[E]])
                    }
                    if (c) {
                        if (f) f.initstatus = o, f.start = new Date - f.ms * o; else {
                            for (var C in c) if (c[_](C) && (tt[_](C) || r.paper.customAttributes[_](C))) switch (y[C] = r.attr(C), null == y[C] && (y[C] = Z[C]), m[C] = c[C], tt[C]) {
                                case Y:
                                    A[C] = (m[C] - y[C]) / g;
                                    break;
                                case"colour":
                                    y[C] = e.getRGB(y[C]);
                                    var B = e.getRGB(m[C]);
                                    A[C] = {r: (B.r - y[C].r) / g, g: (B.g - y[C].g) / g, b: (B.b - y[C].b) / g};
                                    break;
                                case"path":
                                    var k = Rt(y[C], m[C]), I = k[1];
                                    for (y[C] = k[0], A[C] = [], E = 0, x = y[C].length; E < x; E++) {
                                        A[C][E] = [0];
                                        for (var M = 1, D = y[C][E].length; M < D; M++) A[C][E][M] = (I[E][M] - y[C][E][M]) / g
                                    }
                                    break;
                                case"transform":
                                    var O = r._, P = jt(O[C], m[C]);
                                    if (P) for (y[C] = P.from, m[C] = P.to, A[C] = [], A[C].real = !0, E = 0, x = y[C].length; E < x; E++) for (A[C][E] = [y[C][E][0]], M = 1, D = y[C][E].length; M < D; M++) A[C][E][M] = (m[C][E][M] - y[C][E][M]) / g; else {
                                        var N = r.matrix || new l, j = {
                                            _: {transform: O.transform}, getBBox: function () {
                                                return r.getBBox(1)
                                            }
                                        };
                                        y[C] = [N.a, N.b, N.c, N.d, N.e, N.f], Pt(j, m[C]), m[C] = j._.transform, A[C] = [(j.matrix.a - N.a) / g, (j.matrix.b - N.b) / g, (j.matrix.c - N.c) / g, (j.matrix.d - N.d) / g, (j.matrix.e - N.e) / g, (j.matrix.f - N.f) / g]
                                    }
                                    break;
                                case"csv":
                                    var L = T(c[C])[R](v), Q = T(y[C])[R](v);
                                    if ("clip-rect" == C) for (y[C] = Q, A[C] = [], E = Q.length; E--;) A[C][E] = (L[E] - y[C][E]) / g;
                                    m[C] = L;
                                    break;
                                default:
                                    for (L = [][S](c[C]), Q = [][S](y[C]), A[C] = [], E = r.paper.customAttributes[C].length; E--;) A[C][E] = ((L[E] || 0) - (Q[E] || 0)) / g
                            }
                            var U = c.easing, F = e.easing_formulas[U];
                            if (!F) if ((F = T(U).match(J)) && 5 == F.length) {
                                var H = F;
                                F = function (t) {
                                    return d(t, +H[1], +H[2], +H[3], +H[4], g)
                                }
                            } else F = ft;
                            if (w = {
                                anim: n,
                                percent: i,
                                timestamp: b = c.start || n.start || +new Date,
                                start: b + (n.del || 0),
                                status: 0,
                                initstatus: o || 0,
                                stop: !1,
                                ms: g,
                                easing: F,
                                from: y,
                                diff: A,
                                to: m,
                                el: r,
                                callback: c.callback,
                                prev: p,
                                next: h,
                                repeat: s || n.times,
                                origin: r.attr(),
                                totalOrigin: a
                            }, ne.push(w), o && !f && !u && (w.stop = !0, w.start = new Date - g * o, 1 == ne.length)) return ie();
                            u && (w.start = new Date - w.ms * o), 1 == ne.length && re(ie)
                        }
                        t("raphael.anim.start." + r.id, r, n)
                    }
                }

                function g(t) {
                    for (var e = 0; e < ne.length; e++) ne[e].el.paper == t && ne.splice(e--, 1)
                }

                e.version = "2.2.0", e.eve = t;
                var y, m, v = /[, ]+/, A = {circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1},
                    w = /\{(\d+)\}/g, _ = "hasOwnProperty", E = {doc: document, win: window},
                    x = {was: Object.prototype[_].call(E.win, "Raphael"), is: E.win.Raphael}, C = function () {
                        this.ca = this.customAttributes = {}
                    }, B = "apply", S = "concat",
                    k = "ontouchstart" in E.win || E.win.DocumentTouch && E.doc instanceof DocumentTouch, I = "",
                    M = " ", T = String, R = "split",
                    D = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[R](M),
                    O = {mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend"},
                    P = T.prototype.toLowerCase, N = Math, j = N.max, L = N.min, Q = N.abs, U = N.pow, F = N.PI,
                    Y = "number", H = "string", z = "array", V = Object.prototype.toString,
                    $ = (e._ISURL = /^url\(['"]?(.+?)['"]?\)$/i, /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),
                    G = {NaN: 1, Infinity: 1, "-Infinity": 1},
                    J = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, q = N.round, W = parseFloat,
                    X = parseInt, K = T.prototype.toUpperCase, Z = e._availableAttrs = {
                        "arrow-end": "none",
                        "arrow-start": "none",
                        blur: 0,
                        "clip-rect": "0 0 1e9 1e9",
                        cursor: "default",
                        cx: 0,
                        cy: 0,
                        fill: "#fff",
                        "fill-opacity": 1,
                        font: '10px "Arial"',
                        "font-family": '"Arial"',
                        "font-size": "10",
                        "font-style": "normal",
                        "font-weight": 400,
                        gradient: 0,
                        height: 0,
                        href: "http://raphaeljs.com/",
                        "letter-spacing": 0,
                        opacity: 1,
                        path: "M0,0",
                        r: 0,
                        rx: 0,
                        ry: 0,
                        src: "",
                        stroke: "#000",
                        "stroke-dasharray": "",
                        "stroke-linecap": "butt",
                        "stroke-linejoin": "butt",
                        "stroke-miterlimit": 0,
                        "stroke-opacity": 1,
                        "stroke-width": 1,
                        target: "_blank",
                        "text-anchor": "middle",
                        title: "Raphael",
                        transform: "",
                        width: 0,
                        x: 0,
                        y: 0,
                        class: ""
                    }, tt = e._availableAnimAttrs = {
                        blur: Y,
                        "clip-rect": "csv",
                        cx: Y,
                        cy: Y,
                        fill: "colour",
                        "fill-opacity": Y,
                        "font-size": Y,
                        height: Y,
                        opacity: Y,
                        path: "path",
                        r: Y,
                        rx: Y,
                        ry: Y,
                        stroke: "colour",
                        "stroke-opacity": Y,
                        "stroke-width": Y,
                        transform: "transform",
                        width: Y,
                        x: Y,
                        y: Y
                    },
                    et = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
                    nt = {hs: 1, rg: 1}, rt = /,?([achlmqrstvxz]),?/gi,
                    it = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
                    ot = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
                    at = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
                    st = (e._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, {}),
                    ct = function (t, e) {
                        return W(t) - W(e)
                    }, ft = function (t) {
                        return t
                    }, ut = e._rectPath = function (t, e, n, r, i) {
                        return i ? [["M", t + i, e], ["l", n - 2 * i, 0], ["a", i, i, 0, 0, 1, i, i], ["l", 0, r - 2 * i], ["a", i, i, 0, 0, 1, -i, i], ["l", 2 * i - n, 0], ["a", i, i, 0, 0, 1, -i, -i], ["l", 0, 2 * i - r], ["a", i, i, 0, 0, 1, i, -i], ["z"]] : [["M", t, e], ["l", n, 0], ["l", 0, r], ["l", -n, 0], ["z"]]
                    }, lt = function (t, e, n, r) {
                        return null == r && (r = n), [["M", t, e], ["m", 0, -r], ["a", n, r, 0, 1, 1, 0, 2 * r], ["a", n, r, 0, 1, 1, 0, -2 * r], ["z"]]
                    }, ht = e._getPath = {
                        path: function (t) {
                            return t.attr("path")
                        }, circle: function (t) {
                            var e = t.attrs;
                            return lt(e.cx, e.cy, e.r)
                        }, ellipse: function (t) {
                            var e = t.attrs;
                            return lt(e.cx, e.cy, e.rx, e.ry)
                        }, rect: function (t) {
                            var e = t.attrs;
                            return ut(e.x, e.y, e.width, e.height, e.r)
                        }, image: function (t) {
                            var e = t.attrs;
                            return ut(e.x, e.y, e.width, e.height)
                        }, text: function (t) {
                            var e = t._getBBox();
                            return ut(e.x, e.y, e.width, e.height)
                        }, set: function (t) {
                            var e = t._getBBox();
                            return ut(e.x, e.y, e.width, e.height)
                        }
                    }, dt = e.mapPath = function (t, e) {
                        if (!e) return t;
                        var n, r, i, o, a, s, c;
                        for (i = 0, a = (t = Rt(t)).length; i < a; i++) for (o = 1, s = (c = t[i]).length; o < s; o += 2) n = e.x(c[o], c[o + 1]), r = e.y(c[o], c[o + 1]), c[o] = n, c[o + 1] = r;
                        return t
                    };
                if (e._g = E, e.type = E.win.SVGAngle || E.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == e.type) {
                    var pt, bt = E.doc.createElement("div");
                    if (bt.innerHTML = '<v:shape adj="1"/>', (pt = bt.firstChild).style.behavior = "url(#default#VML)", !pt || "object" != typeof pt.adj) return e.type = I;
                    bt = null
                }
                e.svg = !(e.vml = "VML" == e.type), e._Paper = C, e.fn = m = C.prototype = e.prototype, e._id = 0, e.is = function (t, e) {
                    return "finite" == (e = P.call(e)) ? !G[_](+t) : "array" == e ? t instanceof Array : "null" == e && null === t || e == typeof t && null !== t || "object" == e && t === Object(t) || "array" == e && Array.isArray && Array.isArray(t) || V.call(t).slice(8, -1).toLowerCase() == e
                }, e.angle = function (t, n, r, i, o, a) {
                    if (null == o) {
                        var s = t - r, c = n - i;
                        return s || c ? (180 + 180 * N.atan2(-c, -s) / F + 360) % 360 : 0
                    }
                    return e.angle(t, n, o, a) - e.angle(r, i, o, a)
                }, e.rad = function (t) {
                    return t % 360 * F / 180
                }, e.deg = function (t) {
                    return Math.round(180 * t / F % 360 * 1e3) / 1e3
                }, e.snapTo = function (t, n, r) {
                    if (r = e.is(r, "finite") ? r : 10, e.is(t, z)) {
                        for (var i = t.length; i--;) if (Q(t[i] - n) <= r) return t[i]
                    } else {
                        var o = n % (t = +t);
                        if (o < r) return n - o;
                        if (o > t - r) return n - o + t
                    }
                    return n
                }, e.createUUID = function (t, e) {
                    return function () {
                        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t, e).toUpperCase()
                    }
                }(/[xy]/g, function (t) {
                    var e = 16 * N.random() | 0;
                    return ("x" == t ? e : 3 & e | 8).toString(16)
                }), e.setWindow = function (n) {
                    t("raphael.setWindow", e, E.win, n), E.win = n, E.doc = E.win.document, e._engine.initWin && e._engine.initWin(E.win)
                };
                var gt = function (t) {
                    if (e.vml) {
                        var n, i = /^\s+|\s+$/g;
                        try {
                            var o = new ActiveXObject("htmlfile");
                            o.write("<body>"), o.close(), n = o.body
                        } catch (t) {
                            n = createPopup().document.body
                        }
                        var a = n.createTextRange();
                        gt = r(function (t) {
                            try {
                                n.style.color = T(t).replace(i, I);
                                var e = a.queryCommandValue("ForeColor");
                                return "#" + ("000000" + (e = (255 & e) << 16 | 65280 & e | (16711680 & e) >>> 16).toString(16)).slice(-6)
                            } catch (t) {
                                return "none"
                            }
                        })
                    } else {
                        var s = E.doc.createElement("i");
                        s.title = "Raphaël Colour Picker", s.style.display = "none", E.doc.body.appendChild(s), gt = r(function (t) {
                            return s.style.color = t, E.doc.defaultView.getComputedStyle(s, I).getPropertyValue("color")
                        })
                    }
                    return gt(t)
                }, yt = function () {
                    return "hsb(" + [this.h, this.s, this.b] + ")"
                }, mt = function () {
                    return "hsl(" + [this.h, this.s, this.l] + ")"
                }, vt = function () {
                    return this.hex
                }, At = function (t, n, r) {
                    if (null == n && e.is(t, "object") && "r" in t && "g" in t && "b" in t && (r = t.b, n = t.g, t = t.r), null == n && e.is(t, H)) {
                        var i = e.getRGB(t);
                        t = i.r, n = i.g, r = i.b
                    }
                    return (t > 1 || n > 1 || r > 1) && (t /= 255, n /= 255, r /= 255), [t, n, r]
                }, wt = function (t, n, r, i) {
                    var o = {r: t *= 255, g: n *= 255, b: r *= 255, hex: e.rgb(t, n, r), toString: vt};
                    return e.is(i, "finite") && (o.opacity = i), o
                };
                e.color = function (t) {
                    var n;
                    return e.is(t, "object") && "h" in t && "s" in t && "b" in t ? (n = e.hsb2rgb(t), t.r = n.r, t.g = n.g, t.b = n.b, t.hex = n.hex) : e.is(t, "object") && "h" in t && "s" in t && "l" in t ? (n = e.hsl2rgb(t), t.r = n.r, t.g = n.g, t.b = n.b, t.hex = n.hex) : (e.is(t, "string") && (t = e.getRGB(t)), e.is(t, "object") && "r" in t && "g" in t && "b" in t ? (n = e.rgb2hsl(t), t.h = n.h, t.s = n.s, t.l = n.l, n = e.rgb2hsb(t), t.v = n.b) : (t = {hex: "none"}).r = t.g = t.b = t.h = t.s = t.v = t.l = -1), t.toString = vt, t
                }, e.hsb2rgb = function (t, e, n, r) {
                    var i, o, a, s, c;
                    return this.is(t, "object") && "h" in t && "s" in t && "b" in t && (n = t.b, e = t.s, r = t.o, t = t.h), s = (c = n * e) * (1 - Q((t = (t *= 360) % 360 / 60) % 2 - 1)), i = o = a = n - c, wt(i += [c, s, 0, 0, s, c][t = ~~t], o += [s, c, c, s, 0, 0][t], a += [0, 0, s, c, c, s][t], r)
                }, e.hsl2rgb = function (t, e, n, r) {
                    var i, o, a, s, c;
                    return this.is(t, "object") && "h" in t && "s" in t && "l" in t && (n = t.l, e = t.s, t = t.h), (t > 1 || e > 1 || n > 1) && (t /= 360, e /= 100, n /= 100), t = (t *= 360) % 360 / 60, s = (c = 2 * e * (n < .5 ? n : 1 - n)) * (1 - Q(t % 2 - 1)), i = o = a = n - c / 2, wt(i += [c, s, 0, 0, s, c][t = ~~t], o += [s, c, c, s, 0, 0][t], a += [0, 0, s, c, c, s][t], r)
                }, e.rgb2hsb = function (t, e, n) {
                    var r, i;
                    return t = (n = At(t, e, n))[0], e = n[1], n = n[2], {
                        h: ((0 == (i = (r = j(t, e, n)) - L(t, e, n)) ? null : r == t ? (e - n) / i : r == e ? (n - t) / i + 2 : (t - e) / i + 4) + 360) % 6 * 60 / 360,
                        s: 0 == i ? 0 : i / r,
                        b: r,
                        toString: yt
                    }
                }, e.rgb2hsl = function (t, e, n) {
                    var r, i, o, a;
                    return t = (n = At(t, e, n))[0], e = n[1], n = n[2], r = ((i = j(t, e, n)) + (o = L(t, e, n))) / 2, {
                        h: ((0 == (a = i - o) ? null : i == t ? (e - n) / a : i == e ? (n - t) / a + 2 : (t - e) / a + 4) + 360) % 6 * 60 / 360,
                        s: 0 == a ? 0 : r < .5 ? a / (2 * r) : a / (2 - 2 * r),
                        l: r,
                        toString: mt
                    }
                }, e._path2string = function () {
                    return this.join(",").replace(rt, "$1")
                }, e._preload = function (t, e) {
                    var n = E.doc.createElement("img");
                    n.style.cssText = "position:absolute;left:-9999em;top:-9999em", n.onload = function () {
                        e.call(this), this.onload = null, E.doc.body.removeChild(this)
                    }, n.onerror = function () {
                        E.doc.body.removeChild(this)
                    }, E.doc.body.appendChild(n), n.src = t
                }, e.getRGB = r(function (t) {
                    if (!t || (t = T(t)).indexOf("-") + 1) return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        error: 1,
                        toString: i
                    };
                    if ("none" == t) return {r: -1, g: -1, b: -1, hex: "none", toString: i};
                    !nt[_](t.toLowerCase().substring(0, 2)) && "#" != t.charAt() && (t = gt(t));
                    var n, r, o, a, s, c, f = t.match($);
                    return f ? (f[2] && (o = X(f[2].substring(5), 16), r = X(f[2].substring(3, 5), 16), n = X(f[2].substring(1, 3), 16)), f[3] && (o = X((s = f[3].charAt(3)) + s, 16), r = X((s = f[3].charAt(2)) + s, 16), n = X((s = f[3].charAt(1)) + s, 16)), f[4] && (c = f[4][R](et), n = W(c[0]), "%" == c[0].slice(-1) && (n *= 2.55), r = W(c[1]), "%" == c[1].slice(-1) && (r *= 2.55), o = W(c[2]), "%" == c[2].slice(-1) && (o *= 2.55), "rgba" == f[1].toLowerCase().slice(0, 4) && (a = W(c[3])), c[3] && "%" == c[3].slice(-1) && (a /= 100)), f[5] ? (c = f[5][R](et), n = W(c[0]), "%" == c[0].slice(-1) && (n *= 2.55), r = W(c[1]), "%" == c[1].slice(-1) && (r *= 2.55), o = W(c[2]), "%" == c[2].slice(-1) && (o *= 2.55), ("deg" == c[0].slice(-3) || "°" == c[0].slice(-1)) && (n /= 360), "hsba" == f[1].toLowerCase().slice(0, 4) && (a = W(c[3])), c[3] && "%" == c[3].slice(-1) && (a /= 100), e.hsb2rgb(n, r, o, a)) : f[6] ? (c = f[6][R](et), n = W(c[0]), "%" == c[0].slice(-1) && (n *= 2.55), r = W(c[1]), "%" == c[1].slice(-1) && (r *= 2.55), o = W(c[2]), "%" == c[2].slice(-1) && (o *= 2.55), ("deg" == c[0].slice(-3) || "°" == c[0].slice(-1)) && (n /= 360), "hsla" == f[1].toLowerCase().slice(0, 4) && (a = W(c[3])), c[3] && "%" == c[3].slice(-1) && (a /= 100), e.hsl2rgb(n, r, o, a)) : ((f = {
                        r: n,
                        g: r,
                        b: o,
                        toString: i
                    }).hex = "#" + (16777216 | o | r << 8 | n << 16).toString(16).slice(1), e.is(a, "finite") && (f.opacity = a), f)) : {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        error: 1,
                        toString: i
                    }
                }, e), e.hsb = r(function (t, n, r) {
                    return e.hsb2rgb(t, n, r).hex
                }), e.hsl = r(function (t, n, r) {
                    return e.hsl2rgb(t, n, r).hex
                }), e.rgb = r(function (t, e, n) {
                    function r(t) {
                        return t + .5 | 0
                    }

                    return "#" + (16777216 | r(n) | r(e) << 8 | r(t) << 16).toString(16).slice(1)
                }), e.getColor = function (t) {
                    var e = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: t || .75},
                        n = this.hsb2rgb(e.h, e.s, e.b);
                    return e.h += .075, e.h > 1 && (e.h = 0, e.s -= .2, e.s <= 0 && (this.getColor.start = {
                        h: 0,
                        s: 1,
                        b: e.b
                    })), n.hex
                }, e.getColor.reset = function () {
                    delete this.start
                }, e.parsePathString = function (t) {
                    if (!t) return null;
                    var n = _t(t);
                    if (n.arr) return xt(n.arr);
                    var r = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0}, i = [];
                    return e.is(t, z) && e.is(t[0], z) && (i = xt(t)), i.length || T(t).replace(it, function (t, e, n) {
                        var o = [], a = e.toLowerCase();
                        if (n.replace(at, function (t, e) {
                            e && o.push(+e)
                        }), "m" == a && o.length > 2 && (i.push([e][S](o.splice(0, 2))), a = "l", e = "m" == e ? "l" : "L"), "r" == a) i.push([e][S](o)); else for (; o.length >= r[a] && (i.push([e][S](o.splice(0, r[a]))), r[a]);) ;
                    }), i.toString = e._path2string, n.arr = xt(i), i
                }, e.parseTransformString = r(function (t) {
                    if (!t) return null;
                    var n = [];
                    return e.is(t, z) && e.is(t[0], z) && (n = xt(t)), n.length || T(t).replace(ot, function (t, e, r) {
                        var i = [];
                        P.call(e), r.replace(at, function (t, e) {
                            e && i.push(+e)
                        }), n.push([e][S](i))
                    }), n.toString = e._path2string, n
                });
                var _t = function (t) {
                    var e = _t.ps = _t.ps || {};
                    return e[t] ? e[t].sleep = 100 : e[t] = {sleep: 100}, setTimeout(function () {
                        for (var n in e) e[_](n) && n != t && (e[n].sleep--, !e[n].sleep && delete e[n])
                    }), e[t]
                };
                e.findDotsAtSegment = function (t, e, n, r, i, o, a, s, c) {
                    var f = 1 - c, u = U(f, 3), l = U(f, 2), h = c * c, d = h * c,
                        p = u * t + 3 * l * c * n + 3 * f * c * c * i + d * a,
                        b = u * e + 3 * l * c * r + 3 * f * c * c * o + d * s,
                        g = t + 2 * c * (n - t) + h * (i - 2 * n + t), y = e + 2 * c * (r - e) + h * (o - 2 * r + e),
                        m = n + 2 * c * (i - n) + h * (a - 2 * i + n), v = r + 2 * c * (o - r) + h * (s - 2 * o + r),
                        A = f * t + c * n, w = f * e + c * r, _ = f * i + c * a, E = f * o + c * s,
                        x = 90 - 180 * N.atan2(g - m, y - v) / F;
                    return (g > m || y < v) && (x += 180), {
                        x: p,
                        y: b,
                        m: {x: g, y: y},
                        n: {x: m, y: v},
                        start: {x: A, y: w},
                        end: {x: _, y: E},
                        alpha: x
                    }
                }, e.bezierBBox = function (t, n, r, i, o, a, s, c) {
                    e.is(t, "array") || (t = [t, n, r, i, o, a, s, c]);
                    var f = Tt.apply(null, t);
                    return {
                        x: f.min.x,
                        y: f.min.y,
                        x2: f.max.x,
                        y2: f.max.y,
                        width: f.max.x - f.min.x,
                        height: f.max.y - f.min.y
                    }
                }, e.isPointInsideBBox = function (t, e, n) {
                    return e >= t.x && e <= t.x2 && n >= t.y && n <= t.y2
                }, e.isBBoxIntersect = function (t, n) {
                    var r = e.isPointInsideBBox;
                    return r(n, t.x, t.y) || r(n, t.x2, t.y) || r(n, t.x, t.y2) || r(n, t.x2, t.y2) || r(t, n.x, n.y) || r(t, n.x2, n.y) || r(t, n.x, n.y2) || r(t, n.x2, n.y2) || (t.x < n.x2 && t.x > n.x || n.x < t.x2 && n.x > t.x) && (t.y < n.y2 && t.y > n.y || n.y < t.y2 && n.y > t.y)
                }, e.pathIntersection = function (t, e) {
                    return u(t, e)
                }, e.pathIntersectionNumber = function (t, e) {
                    return u(t, e, 1)
                }, e.isPointInsidePath = function (t, n, r) {
                    var i = e.pathBBox(t);
                    return e.isPointInsideBBox(i, n, r) && u(t, [["M", n, r], ["H", i.x2 + 10]], 1) % 2 == 1
                }, e._removedFactory = function (e) {
                    return function () {
                        t("raphael.log", null, "Raphaël: you are calling to method “" + e + "” of removed object", e)
                    }
                };
                var Et = e.pathBBox = function (t) {
                    var e = _t(t);
                    if (e.bbox) return n(e.bbox);
                    if (!t) return {x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0};
                    for (var r, i = 0, o = 0, a = [], s = [], c = 0, f = (t = Rt(t)).length; c < f; c++) if ("M" == (r = t[c])[0]) i = r[1], o = r[2], a.push(i), s.push(o); else {
                        var u = Tt(i, o, r[1], r[2], r[3], r[4], r[5], r[6]);
                        a = a[S](u.min.x, u.max.x), s = s[S](u.min.y, u.max.y), i = r[5], o = r[6]
                    }
                    var l = L[B](0, a), h = L[B](0, s), d = j[B](0, a), p = j[B](0, s), b = d - l, g = p - h,
                        y = {x: l, y: h, x2: d, y2: p, width: b, height: g, cx: l + b / 2, cy: h + g / 2};
                    return e.bbox = n(y), y
                }, xt = function (t) {
                    var r = n(t);
                    return r.toString = e._path2string, r
                }, Ct = e._pathToRelative = function (t) {
                    var n = _t(t);
                    if (n.rel) return xt(n.rel);
                    e.is(t, z) && e.is(t && t[0], z) || (t = e.parsePathString(t));
                    var r = [], i = 0, o = 0, a = 0, s = 0, c = 0;
                    "M" == t[0][0] && (a = i = t[0][1], s = o = t[0][2], c++, r.push(["M", i, o]));
                    for (var f = c, u = t.length; f < u; f++) {
                        var l = r[f] = [], h = t[f];
                        if (h[0] != P.call(h[0])) switch (l[0] = P.call(h[0]), l[0]) {
                            case"a":
                                l[1] = h[1], l[2] = h[2], l[3] = h[3], l[4] = h[4], l[5] = h[5], l[6] = +(h[6] - i).toFixed(3), l[7] = +(h[7] - o).toFixed(3);
                                break;
                            case"v":
                                l[1] = +(h[1] - o).toFixed(3);
                                break;
                            case"m":
                                a = h[1], s = h[2];
                            default:
                                for (var d = 1, p = h.length; d < p; d++) l[d] = +(h[d] - (d % 2 ? i : o)).toFixed(3)
                        } else {
                            l = r[f] = [], "m" == h[0] && (a = h[1] + i, s = h[2] + o);
                            for (var b = 0, g = h.length; b < g; b++) r[f][b] = h[b]
                        }
                        var y = r[f].length;
                        switch (r[f][0]) {
                            case"z":
                                i = a, o = s;
                                break;
                            case"h":
                                i += +r[f][y - 1];
                                break;
                            case"v":
                                o += +r[f][y - 1];
                                break;
                            default:
                                i += +r[f][y - 2], o += +r[f][y - 1]
                        }
                    }
                    return r.toString = e._path2string, n.rel = xt(r), r
                }, Bt = e._pathToAbsolute = function (t) {
                    var n = _t(t);
                    if (n.abs) return xt(n.abs);
                    if (e.is(t, z) && e.is(t && t[0], z) || (t = e.parsePathString(t)), !t || !t.length) return [["M", 0, 0]];
                    var r = [], i = 0, a = 0, s = 0, c = 0, f = 0;
                    "M" == t[0][0] && (s = i = +t[0][1], c = a = +t[0][2], f++, r[0] = ["M", i, a]);
                    for (var u, l, h = 3 == t.length && "M" == t[0][0] && "R" == t[1][0].toUpperCase() && "Z" == t[2][0].toUpperCase(), d = f, p = t.length; d < p; d++) {
                        if (r.push(u = []), (l = t[d])[0] != K.call(l[0])) switch (u[0] = K.call(l[0]), u[0]) {
                            case"A":
                                u[1] = l[1], u[2] = l[2], u[3] = l[3], u[4] = l[4], u[5] = l[5], u[6] = +(l[6] + i), u[7] = +(l[7] + a);
                                break;
                            case"V":
                                u[1] = +l[1] + a;
                                break;
                            case"H":
                                u[1] = +l[1] + i;
                                break;
                            case"R":
                                for (var b = [i, a][S](l.slice(1)), g = 2, y = b.length; g < y; g++) b[g] = +b[g] + i, b[++g] = +b[g] + a;
                                r.pop(), r = r[S](o(b, h));
                                break;
                            case"M":
                                s = +l[1] + i, c = +l[2] + a;
                            default:
                                for (g = 1, y = l.length; g < y; g++) u[g] = +l[g] + (g % 2 ? i : a)
                        } else if ("R" == l[0]) b = [i, a][S](l.slice(1)), r.pop(), r = r[S](o(b, h)), u = ["R"][S](l.slice(-2)); else for (var m = 0, v = l.length; m < v; m++) u[m] = l[m];
                        switch (u[0]) {
                            case"Z":
                                i = s, a = c;
                                break;
                            case"H":
                                i = u[1];
                                break;
                            case"V":
                                a = u[1];
                                break;
                            case"M":
                                s = u[u.length - 2], c = u[u.length - 1];
                            default:
                                i = u[u.length - 2], a = u[u.length - 1]
                        }
                    }
                    return r.toString = e._path2string, n.abs = xt(r), r
                }, St = function (t, e, n, r) {
                    return [t, e, n, r, n, r]
                }, kt = function (t, e, n, r, i, o) {
                    var a = 1 / 3, s = 2 / 3;
                    return [a * t + s * n, a * e + s * r, a * i + s * n, a * o + s * r, i, o]
                }, It = function (t, e, n, i, o, a, s, c, f, u) {
                    var l, h = 120 * F / 180, d = F / 180 * (+o || 0), p = [], b = r(function (t, e, n) {
                        return {x: t * N.cos(n) - e * N.sin(n), y: t * N.sin(n) + e * N.cos(n)}
                    });
                    if (u) x = u[0], C = u[1], _ = u[2], E = u[3]; else {
                        t = (l = b(t, e, -d)).x, e = l.y, c = (l = b(c, f, -d)).x, f = l.y, N.cos(F / 180 * o), N.sin(F / 180 * o);
                        var g = (t - c) / 2, y = (e - f) / 2, m = g * g / (n * n) + y * y / (i * i);
                        m > 1 && (n *= m = N.sqrt(m), i *= m);
                        var v = n * n, A = i * i,
                            w = (a == s ? -1 : 1) * N.sqrt(Q((v * A - v * y * y - A * g * g) / (v * y * y + A * g * g))),
                            _ = w * n * y / i + (t + c) / 2, E = w * -i * g / n + (e + f) / 2,
                            x = N.asin(((e - E) / i).toFixed(9)), C = N.asin(((f - E) / i).toFixed(9));
                        x = t < _ ? F - x : x, C = c < _ ? F - C : C, x < 0 && (x = 2 * F + x), C < 0 && (C = 2 * F + C), s && x > C && (x -= 2 * F), !s && C > x && (C -= 2 * F)
                    }
                    var B = C - x;
                    if (Q(B) > h) {
                        var k = C, I = c, M = f;
                        C = x + h * (s && C > x ? 1 : -1), c = _ + n * N.cos(C), f = E + i * N.sin(C), p = It(c, f, n, i, o, 0, s, I, M, [C, k, _, E])
                    }
                    B = C - x;
                    var T = N.cos(x), D = N.sin(x), O = N.cos(C), P = N.sin(C), j = N.tan(B / 4), L = 4 / 3 * n * j,
                        U = 4 / 3 * i * j, Y = [t, e], H = [t + L * D, e - U * T], z = [c + L * P, f - U * O],
                        V = [c, f];
                    if (H[0] = 2 * Y[0] - H[0], H[1] = 2 * Y[1] - H[1], u) return [H, z, V][S](p);
                    for (var $ = [], G = 0, J = (p = [H, z, V][S](p).join()[R](",")).length; G < J; G++) $[G] = G % 2 ? b(p[G - 1], p[G], d).y : b(p[G], p[G + 1], d).x;
                    return $
                }, Mt = function (t, e, n, r, i, o, a, s, c) {
                    var f = 1 - c;
                    return {
                        x: U(f, 3) * t + 3 * U(f, 2) * c * n + 3 * f * c * c * i + U(c, 3) * a,
                        y: U(f, 3) * e + 3 * U(f, 2) * c * r + 3 * f * c * c * o + U(c, 3) * s
                    }
                }, Tt = r(function (t, e, n, r, i, o, a, s) {
                    var c, f = i - 2 * n + t - (a - 2 * i + n), u = 2 * (n - t) - 2 * (i - n), l = t - n,
                        h = (-u + N.sqrt(u * u - 4 * f * l)) / 2 / f, d = (-u - N.sqrt(u * u - 4 * f * l)) / 2 / f,
                        p = [e, s], b = [t, a];
                    return Q(h) > "1e12" && (h = .5), Q(d) > "1e12" && (d = .5), h > 0 && h < 1 && (c = Mt(t, e, n, r, i, o, a, s, h), b.push(c.x), p.push(c.y)), d > 0 && d < 1 && (c = Mt(t, e, n, r, i, o, a, s, d), b.push(c.x), p.push(c.y)), f = o - 2 * r + e - (s - 2 * o + r), l = e - r, h = (-(u = 2 * (r - e) - 2 * (o - r)) + N.sqrt(u * u - 4 * f * l)) / 2 / f, d = (-u - N.sqrt(u * u - 4 * f * l)) / 2 / f, Q(h) > "1e12" && (h = .5), Q(d) > "1e12" && (d = .5), h > 0 && h < 1 && (c = Mt(t, e, n, r, i, o, a, s, h), b.push(c.x), p.push(c.y)), d > 0 && d < 1 && (c = Mt(t, e, n, r, i, o, a, s, d), b.push(c.x), p.push(c.y)), {
                        min: {
                            x: L[B](0, b),
                            y: L[B](0, p)
                        }, max: {x: j[B](0, b), y: j[B](0, p)}
                    }
                }), Rt = e._path2curve = r(function (t, e) {
                    var n = !e && _t(t);
                    if (!e && n.curve) return xt(n.curve);
                    for (var r = Bt(t), i = e && Bt(e), o = {
                        x: 0,
                        y: 0,
                        bx: 0,
                        by: 0,
                        X: 0,
                        Y: 0,
                        qx: null,
                        qy: null
                    }, a = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, s = function (t, e, n) {
                        var r, i;
                        if (!t) return ["C", e.x, e.y, e.x, e.y, e.x, e.y];
                        switch (!(t[0] in {T: 1, Q: 1}) && (e.qx = e.qy = null), t[0]) {
                            case"M":
                                e.X = t[1], e.Y = t[2];
                                break;
                            case"A":
                                t = ["C"][S](It[B](0, [e.x, e.y][S](t.slice(1))));
                                break;
                            case"S":
                                "C" == n || "S" == n ? (r = 2 * e.x - e.bx, i = 2 * e.y - e.by) : (r = e.x, i = e.y), t = ["C", r, i][S](t.slice(1));
                                break;
                            case"T":
                                "Q" == n || "T" == n ? (e.qx = 2 * e.x - e.qx, e.qy = 2 * e.y - e.qy) : (e.qx = e.x, e.qy = e.y), t = ["C"][S](kt(e.x, e.y, e.qx, e.qy, t[1], t[2]));
                                break;
                            case"Q":
                                e.qx = t[1], e.qy = t[2], t = ["C"][S](kt(e.x, e.y, t[1], t[2], t[3], t[4]));
                                break;
                            case"L":
                                t = ["C"][S](St(e.x, e.y, t[1], t[2]));
                                break;
                            case"H":
                                t = ["C"][S](St(e.x, e.y, t[1], e.y));
                                break;
                            case"V":
                                t = ["C"][S](St(e.x, e.y, e.x, t[1]));
                                break;
                            case"Z":
                                t = ["C"][S](St(e.x, e.y, e.X, e.Y))
                        }
                        return t
                    }, c = function (t, e) {
                        if (t[e].length > 7) {
                            t[e].shift();
                            for (var n = t[e]; n.length;) u[e] = "A", i && (l[e] = "A"), t.splice(e++, 0, ["C"][S](n.splice(0, 6)));
                            t.splice(e, 1), b = j(r.length, i && i.length || 0)
                        }
                    }, f = function (t, e, n, o, a) {
                        t && e && "M" == t[a][0] && "M" != e[a][0] && (e.splice(a, 0, ["M", o.x, o.y]), n.bx = 0, n.by = 0, n.x = t[a][1], n.y = t[a][2], b = j(r.length, i && i.length || 0))
                    }, u = [], l = [], h = "", d = "", p = 0, b = j(r.length, i && i.length || 0); p < b; p++) {
                        r[p] && (h = r[p][0]), "C" != h && (u[p] = h, p && (d = u[p - 1])), r[p] = s(r[p], o, d), "A" != u[p] && "C" == h && (u[p] = "C"), c(r, p), i && (i[p] && (h = i[p][0]), "C" != h && (l[p] = h, p && (d = l[p - 1])), i[p] = s(i[p], a, d), "A" != l[p] && "C" == h && (l[p] = "C"), c(i, p)), f(r, i, o, a, p), f(i, r, a, o, p);
                        var g = r[p], y = i && i[p], m = g.length, v = i && y.length;
                        o.x = g[m - 2], o.y = g[m - 1], o.bx = W(g[m - 4]) || o.x, o.by = W(g[m - 3]) || o.y, a.bx = i && (W(y[v - 4]) || a.x), a.by = i && (W(y[v - 3]) || a.y), a.x = i && y[v - 2], a.y = i && y[v - 1]
                    }
                    return i || (n.curve = xt(r)), i ? [r, i] : r
                }, null, xt), Dt = (e._parseDots = r(function (t) {
                    for (var n = [], r = 0, i = t.length; r < i; r++) {
                        var o = {}, a = t[r].match(/^([^:]*):?([\d\.]*)/);
                        if (o.color = e.getRGB(a[1]), o.color.error) return null;
                        o.opacity = o.color.opacity, o.color = o.color.hex, a[2] && (o.offset = a[2] + "%"), n.push(o)
                    }
                    for (r = 1, i = n.length - 1; r < i; r++) if (!n[r].offset) {
                        for (var s = W(n[r - 1].offset || 0), c = 0, f = r + 1; f < i; f++) if (n[f].offset) {
                            c = n[f].offset;
                            break
                        }
                        c || (c = 100, f = i);
                        for (var u = ((c = W(c)) - s) / (f - r + 1); r < f; r++) s += u, n[r].offset = s + "%"
                    }
                    return n
                }), e._tear = function (t, e) {
                    t == e.top && (e.top = t.prev), t == e.bottom && (e.bottom = t.next), t.next && (t.next.prev = t.prev), t.prev && (t.prev.next = t.next)
                }), Ot = (e._tofront = function (t, e) {
                    e.top !== t && (Dt(t, e), t.next = null, t.prev = e.top, e.top.next = t, e.top = t)
                }, e._toback = function (t, e) {
                    e.bottom !== t && (Dt(t, e), t.next = e.bottom, t.prev = null, e.bottom.prev = t, e.bottom = t)
                }, e._insertafter = function (t, e, n) {
                    Dt(t, n), e == n.top && (n.top = t), e.next && (e.next.prev = t), t.next = e.next, t.prev = e, e.next = t
                }, e._insertbefore = function (t, e, n) {
                    Dt(t, n), e == n.bottom && (n.bottom = t), e.prev && (e.prev.next = t), t.prev = e.prev, e.prev = t, t.next = e
                }, e.toMatrix = function (t, e) {
                    var n = Et(t), r = {
                        _: {transform: I}, getBBox: function () {
                            return n
                        }
                    };
                    return Pt(r, e), r.matrix
                }), Pt = (e.transformPath = function (t, e) {
                    return dt(t, Ot(t, e))
                }, e._extractTransform = function (t, n) {
                    if (null == n) return t._.transform;
                    n = T(n).replace(/\.{3}|\u2026/g, t._.transform || I);
                    var r, i, o = e.parseTransformString(n), a = 0, s = 1, c = 1, f = t._, u = new l;
                    if (f.transform = o || [], o) for (var h = 0, d = o.length; h < d; h++) {
                        var p, b, g, y, m, v = o[h], A = v.length, w = T(v[0]).toLowerCase(), _ = v[0] != w,
                            E = _ ? u.invert() : 0;
                        "t" == w && 3 == A ? _ ? (p = E.x(0, 0), b = E.y(0, 0), g = E.x(v[1], v[2]), y = E.y(v[1], v[2]), u.translate(g - p, y - b)) : u.translate(v[1], v[2]) : "r" == w ? 2 == A ? (m = m || t.getBBox(1), u.rotate(v[1], m.x + m.width / 2, m.y + m.height / 2), a += v[1]) : 4 == A && (_ ? (g = E.x(v[2], v[3]), y = E.y(v[2], v[3]), u.rotate(v[1], g, y)) : u.rotate(v[1], v[2], v[3]), a += v[1]) : "s" == w ? 2 == A || 3 == A ? (m = m || t.getBBox(1), u.scale(v[1], v[A - 1], m.x + m.width / 2, m.y + m.height / 2), s *= v[1], c *= v[A - 1]) : 5 == A && (_ ? (g = E.x(v[3], v[4]), y = E.y(v[3], v[4]), u.scale(v[1], v[2], g, y)) : u.scale(v[1], v[2], v[3], v[4]), s *= v[1], c *= v[2]) : "m" == w && 7 == A && u.add(v[1], v[2], v[3], v[4], v[5], v[6]), f.dirtyT = 1, t.matrix = u
                    }
                    t.matrix = u, f.sx = s, f.sy = c, f.deg = a, f.dx = r = u.e, f.dy = i = u.f, 1 == s && 1 == c && !a && f.bbox ? (f.bbox.x += +r, f.bbox.y += +i) : f.dirtyT = 1
                }), Nt = function (t) {
                    var e = t[0];
                    switch (e.toLowerCase()) {
                        case"t":
                            return [e, 0, 0];
                        case"m":
                            return [e, 1, 0, 0, 1, 0, 0];
                        case"r":
                            return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0];
                        case"s":
                            return 5 == t.length ? [e, 1, 1, t[3], t[4]] : 3 == t.length ? [e, 1, 1] : [e, 1]
                    }
                }, jt = e._equaliseTransform = function (t, n) {
                    n = T(n).replace(/\.{3}|\u2026/g, t), t = e.parseTransformString(t) || [], n = e.parseTransformString(n) || [];
                    for (var r, i, o, a, s = j(t.length, n.length), c = [], f = [], u = 0; u < s; u++) {
                        if (o = t[u] || Nt(n[u]), a = n[u] || Nt(o), o[0] != a[0] || "r" == o[0].toLowerCase() && (o[2] != a[2] || o[3] != a[3]) || "s" == o[0].toLowerCase() && (o[3] != a[3] || o[4] != a[4])) return;
                        for (c[u] = [], f[u] = [], r = 0, i = j(o.length, a.length); r < i; r++) r in o && (c[u][r] = o[r]), r in a && (f[u][r] = a[r])
                    }
                    return {from: c, to: f}
                };
                e._getContainer = function (t, n, r, i) {
                    var o;
                    if (null != (o = null != i || e.is(t, "object") ? t : E.doc.getElementById(t))) return o.tagName ? null == n ? {
                        container: o,
                        width: o.style.pixelWidth || o.offsetWidth,
                        height: o.style.pixelHeight || o.offsetHeight
                    } : {container: o, width: n, height: r} : {container: 1, x: t, y: n, width: r, height: i}
                }, e.pathToRelative = Ct, e._engine = {}, e.path2curve = Rt, e.matrix = function (t, e, n, r, i, o) {
                    return new l(t, e, n, r, i, o)
                }, function (t) {
                    function n(t) {
                        return t[0] * t[0] + t[1] * t[1]
                    }

                    function r(t) {
                        var e = N.sqrt(n(t));
                        t[0] && (t[0] /= e), t[1] && (t[1] /= e)
                    }

                    t.add = function (t, e, n, r, i, o) {
                        var a, s, c, f, u = [[], [], []],
                            h = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
                            d = [[t, n, i], [e, r, o], [0, 0, 1]];
                        for (t && t instanceof l && (d = [[t.a, t.c, t.e], [t.b, t.d, t.f], [0, 0, 1]]), a = 0; a < 3; a++) for (s = 0; s < 3; s++) {
                            for (f = 0, c = 0; c < 3; c++) f += h[a][c] * d[c][s];
                            u[a][s] = f
                        }
                        this.a = u[0][0], this.b = u[1][0], this.c = u[0][1], this.d = u[1][1], this.e = u[0][2], this.f = u[1][2]
                    }, t.invert = function () {
                        var t = this, e = t.a * t.d - t.b * t.c;
                        return new l(t.d / e, -t.b / e, -t.c / e, t.a / e, (t.c * t.f - t.d * t.e) / e, (t.b * t.e - t.a * t.f) / e)
                    }, t.clone = function () {
                        return new l(this.a, this.b, this.c, this.d, this.e, this.f)
                    }, t.translate = function (t, e) {
                        this.add(1, 0, 0, 1, t, e)
                    }, t.scale = function (t, e, n, r) {
                        null == e && (e = t), (n || r) && this.add(1, 0, 0, 1, n, r), this.add(t, 0, 0, e, 0, 0), (n || r) && this.add(1, 0, 0, 1, -n, -r)
                    }, t.rotate = function (t, n, r) {
                        t = e.rad(t), n = n || 0, r = r || 0;
                        var i = +N.cos(t).toFixed(9), o = +N.sin(t).toFixed(9);
                        this.add(i, o, -o, i, n, r), this.add(1, 0, 0, 1, -n, -r)
                    }, t.x = function (t, e) {
                        return t * this.a + e * this.c + this.e
                    }, t.y = function (t, e) {
                        return t * this.b + e * this.d + this.f
                    }, t.get = function (t) {
                        return +this[T.fromCharCode(97 + t)].toFixed(4)
                    }, t.toString = function () {
                        return e.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
                    }, t.toFilter = function () {
                        return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
                    }, t.offset = function () {
                        return [this.e.toFixed(4), this.f.toFixed(4)]
                    }, t.split = function () {
                        var t = {};
                        t.dx = this.e, t.dy = this.f;
                        var i = [[this.a, this.c], [this.b, this.d]];
                        t.scalex = N.sqrt(n(i[0])), r(i[0]), t.shear = i[0][0] * i[1][0] + i[0][1] * i[1][1], i[1] = [i[1][0] - i[0][0] * t.shear, i[1][1] - i[0][1] * t.shear], t.scaley = N.sqrt(n(i[1])), r(i[1]), t.shear /= t.scaley;
                        var o = -i[0][1], a = i[1][1];
                        return a < 0 ? (t.rotate = e.deg(N.acos(a)), o < 0 && (t.rotate = 360 - t.rotate)) : t.rotate = e.deg(N.asin(o)), t.isSimple = !(+t.shear.toFixed(9) || t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate), t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate, t.noRotation = !+t.shear.toFixed(9) && !t.rotate, t
                    }, t.toTransformString = function (t) {
                        var e = t || this[R]();
                        return e.isSimple ? (e.scalex = +e.scalex.toFixed(4), e.scaley = +e.scaley.toFixed(4), e.rotate = +e.rotate.toFixed(4), (e.dx || e.dy ? "t" + [e.dx, e.dy] : I) + (1 != e.scalex || 1 != e.scaley ? "s" + [e.scalex, e.scaley, 0, 0] : I) + (e.rotate ? "r" + [e.rotate, 0, 0] : I)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
                    }
                }(l.prototype);
                for (var Lt = function () {
                    this.returnValue = !1
                }, Qt = function () {
                    return this.originalEvent.preventDefault()
                }, Ut = function () {
                    this.cancelBubble = !0
                }, Ft = function () {
                    return this.originalEvent.stopPropagation()
                }, Yt = function (t) {
                    var e = E.doc.documentElement.scrollTop || E.doc.body.scrollTop,
                        n = E.doc.documentElement.scrollLeft || E.doc.body.scrollLeft;
                    return {x: t.clientX + n, y: t.clientY + e}
                }, Ht = E.doc.addEventListener ? function (t, e, n, r) {
                    var i = function (t) {
                        var e = Yt(t);
                        return n.call(r, t, e.x, e.y)
                    };
                    if (t.addEventListener(e, i, !1), k && O[e]) {
                        var o = function (e) {
                            for (var i = Yt(e), o = e, a = 0, s = e.targetTouches && e.targetTouches.length; a < s; a++) if (e.targetTouches[a].target == t) {
                                (e = e.targetTouches[a]).originalEvent = o, e.preventDefault = Qt, e.stopPropagation = Ft;
                                break
                            }
                            return n.call(r, e, i.x, i.y)
                        };
                        t.addEventListener(O[e], o, !1)
                    }
                    return function () {
                        return t.removeEventListener(e, i, !1), k && O[e] && t.removeEventListener(O[e], o, !1), !0
                    }
                } : E.doc.attachEvent ? function (t, e, n, r) {
                    var i = function (t) {
                        t = t || E.win.event;
                        var e = E.doc.documentElement.scrollTop || E.doc.body.scrollTop,
                            i = E.doc.documentElement.scrollLeft || E.doc.body.scrollLeft, o = t.clientX + i,
                            a = t.clientY + e;
                        return t.preventDefault = t.preventDefault || Lt, t.stopPropagation = t.stopPropagation || Ut, n.call(r, t, o, a)
                    };
                    return t.attachEvent("on" + e, i), function () {
                        return t.detachEvent("on" + e, i), !0
                    }
                } : void 0, zt = [], Vt = function (e) {
                    for (var n, r = e.clientX, i = e.clientY, o = E.doc.documentElement.scrollTop || E.doc.body.scrollTop, a = E.doc.documentElement.scrollLeft || E.doc.body.scrollLeft, s = zt.length; s--;) {
                        if (n = zt[s], k && e.touches) {
                            for (var c, f = e.touches.length; f--;) if ((c = e.touches[f]).identifier == n.el._drag.id) {
                                r = c.clientX, i = c.clientY, (e.originalEvent ? e.originalEvent : e).preventDefault();
                                break
                            }
                        } else e.preventDefault();
                        var u, l = n.el.node, h = l.nextSibling, d = l.parentNode, p = l.style.display;
                        E.win.opera && d.removeChild(l), l.style.display = "none", u = n.el.paper.getElementByPoint(r, i), l.style.display = p, E.win.opera && (h ? d.insertBefore(l, h) : d.appendChild(l)), u && t("raphael.drag.over." + n.el.id, n.el, u), r += a, i += o, t("raphael.drag.move." + n.el.id, n.move_scope || n.el, r - n.el._drag.x, i - n.el._drag.y, r, i, e)
                    }
                }, $t = function (n) {
                    e.unmousemove(Vt).unmouseup($t);
                    for (var r, i = zt.length; i--;) (r = zt[i]).el._drag = {}, t("raphael.drag.end." + r.el.id, r.end_scope || r.start_scope || r.move_scope || r.el, n);
                    zt = []
                }, Gt = e.el = {}, Jt = D.length; Jt--;) !function (t) {
                    e[t] = Gt[t] = function (n, r) {
                        return e.is(n, "function") && (this.events = this.events || [], this.events.push({
                            name: t,
                            f: n,
                            unbind: Ht(this.shape || this.node || E.doc, t, n, r || this)
                        })), this
                    }, e["un" + t] = Gt["un" + t] = function (n) {
                        for (var r = this.events || [], i = r.length; i--;) r[i].name != t || !e.is(n, "undefined") && r[i].f != n || (r[i].unbind(), r.splice(i, 1), !r.length && delete this.events);
                        return this
                    }
                }(D[Jt]);
                Gt.data = function (n, r) {
                    var i = st[this.id] = st[this.id] || {};
                    if (0 == arguments.length) return i;
                    if (1 == arguments.length) {
                        if (e.is(n, "object")) {
                            for (var o in n) n[_](o) && this.data(o, n[o]);
                            return this
                        }
                        return t("raphael.data.get." + this.id, this, i[n], n), i[n]
                    }
                    return i[n] = r, t("raphael.data.set." + this.id, this, r, n), this
                }, Gt.removeData = function (t) {
                    return null == t ? st[this.id] = {} : st[this.id] && delete st[this.id][t], this
                }, Gt.getData = function () {
                    return n(st[this.id] || {})
                }, Gt.hover = function (t, e, n, r) {
                    return this.mouseover(t, n).mouseout(e, r || n)
                }, Gt.unhover = function (t, e) {
                    return this.unmouseover(t).unmouseout(e)
                };
                var qt = [];
                Gt.drag = function (n, r, i, o, a, s) {
                    function c(c) {
                        (c.originalEvent || c).preventDefault();
                        var f = c.clientX, u = c.clientY, l = E.doc.documentElement.scrollTop || E.doc.body.scrollTop,
                            h = E.doc.documentElement.scrollLeft || E.doc.body.scrollLeft;
                        if (this._drag.id = c.identifier, k && c.touches) for (var d, p = c.touches.length; p--;) if (d = c.touches[p], this._drag.id = d.identifier, d.identifier == this._drag.id) {
                            f = d.clientX, u = d.clientY;
                            break
                        }
                        this._drag.x = f + h, this._drag.y = u + l, !zt.length && e.mousemove(Vt).mouseup($t), zt.push({
                            el: this,
                            move_scope: o,
                            start_scope: a,
                            end_scope: s
                        }), r && t.on("raphael.drag.start." + this.id, r), n && t.on("raphael.drag.move." + this.id, n), i && t.on("raphael.drag.end." + this.id, i), t("raphael.drag.start." + this.id, a || o || this, c.clientX + h, c.clientY + l, c)
                    }

                    return this._drag = {}, qt.push({el: this, start: c}), this.mousedown(c), this
                }, Gt.onDragOver = function (e) {
                    e ? t.on("raphael.drag.over." + this.id, e) : t.unbind("raphael.drag.over." + this.id)
                }, Gt.undrag = function () {
                    for (var n = qt.length; n--;) qt[n].el == this && (this.unmousedown(qt[n].start), qt.splice(n, 1), t.unbind("raphael.drag.*." + this.id));
                    !qt.length && e.unmousemove(Vt).unmouseup($t), zt = []
                }, m.circle = function (t, n, r) {
                    var i = e._engine.circle(this, t || 0, n || 0, r || 0);
                    return this.__set__ && this.__set__.push(i), i
                }, m.rect = function (t, n, r, i, o) {
                    var a = e._engine.rect(this, t || 0, n || 0, r || 0, i || 0, o || 0);
                    return this.__set__ && this.__set__.push(a), a
                }, m.ellipse = function (t, n, r, i) {
                    var o = e._engine.ellipse(this, t || 0, n || 0, r || 0, i || 0);
                    return this.__set__ && this.__set__.push(o), o
                }, m.path = function (t) {
                    t && !e.is(t, H) && !e.is(t[0], z) && (t += I);
                    var n = e._engine.path(e.format[B](e, arguments), this);
                    return this.__set__ && this.__set__.push(n), n
                }, m.image = function (t, n, r, i, o) {
                    var a = e._engine.image(this, t || "about:blank", n || 0, r || 0, i || 0, o || 0);
                    return this.__set__ && this.__set__.push(a), a
                }, m.text = function (t, n, r) {
                    var i = e._engine.text(this, t || 0, n || 0, T(r));
                    return this.__set__ && this.__set__.push(i), i
                }, m.set = function (t) {
                    !e.is(t, "array") && (t = Array.prototype.splice.call(arguments, 0, arguments.length));
                    var n = new ae(t);
                    return this.__set__ && this.__set__.push(n), n.paper = this, n.type = "set", n
                }, m.setStart = function (t) {
                    this.__set__ = t || this.set()
                }, m.setFinish = function (t) {
                    var e = this.__set__;
                    return delete this.__set__, e
                }, m.getSize = function () {
                    var t = this.canvas.parentNode;
                    return {width: t.offsetWidth, height: t.offsetHeight}
                }, m.setSize = function (t, n) {
                    return e._engine.setSize.call(this, t, n)
                }, m.setViewBox = function (t, n, r, i, o) {
                    return e._engine.setViewBox.call(this, t, n, r, i, o)
                }, m.top = m.bottom = null, m.raphael = e, m.getElementByPoint = function (t, e) {
                    var n = this, r = n.canvas, i = E.doc.elementFromPoint(t, e);
                    if (E.win.opera && "svg" == i.tagName) {
                        var o = function (t) {
                            var e = t.getBoundingClientRect(), n = t.ownerDocument, r = n.body, i = n.documentElement,
                                o = i.clientTop || r.clientTop || 0, a = i.clientLeft || r.clientLeft || 0;
                            return {
                                y: e.top + (E.win.pageYOffset || i.scrollTop || r.scrollTop) - o,
                                x: e.left + (E.win.pageXOffset || i.scrollLeft || r.scrollLeft) - a
                            }
                        }(r), a = r.createSVGRect();
                        a.x = t - o.x, a.y = e - o.y, a.width = a.height = 1;
                        var s = r.getIntersectionList(a, null);
                        s.length && (i = s[s.length - 1])
                    }
                    if (!i) return null;
                    for (; i.parentNode && i != r.parentNode && !i.raphael;) i = i.parentNode;
                    return i == n.canvas.parentNode && (i = r), i && i.raphael ? n.getById(i.raphaelid) : null
                }, m.getElementsByBBox = function (t) {
                    var n = this.set();
                    return this.forEach(function (r) {
                        e.isBBoxIntersect(r.getBBox(), t) && n.push(r)
                    }), n
                }, m.getById = function (t) {
                    for (var e = this.bottom; e;) {
                        if (e.id == t) return e;
                        e = e.next
                    }
                    return null
                }, m.forEach = function (t, e) {
                    for (var n = this.bottom; n;) {
                        if (!1 === t.call(e, n)) return this;
                        n = n.next
                    }
                    return this
                }, m.getElementsByPoint = function (t, e) {
                    var n = this.set();
                    return this.forEach(function (r) {
                        r.isPointInside(t, e) && n.push(r)
                    }), n
                }, Gt.isPointInside = function (t, n) {
                    var r = this.realPath = ht[this.type](this);
                    return this.attr("transform") && this.attr("transform").length && (r = e.transformPath(r, this.attr("transform"))), e.isPointInsidePath(r, t, n)
                }, Gt.getBBox = function (t) {
                    if (this.removed) return {};
                    var e = this._;
                    return t ? (!e.dirty && e.bboxwt || (this.realPath = ht[this.type](this), e.bboxwt = Et(this.realPath), e.bboxwt.toString = h, e.dirty = 0), e.bboxwt) : ((e.dirty || e.dirtyT || !e.bbox) && (!e.dirty && this.realPath || (e.bboxwt = 0, this.realPath = ht[this.type](this)), e.bbox = Et(dt(this.realPath, this.matrix)), e.bbox.toString = h, e.dirty = e.dirtyT = 0), e.bbox)
                }, Gt.clone = function () {
                    if (this.removed) return null;
                    var t = this.paper[this.type]().attr(this.attr());
                    return this.__set__ && this.__set__.push(t), t
                }, Gt.glow = function (t) {
                    if ("text" == this.type) return null;
                    var e = {
                        width: ((t = t || {}).width || 10) + (+this.attr("stroke-width") || 1),
                        fill: t.fill || !1,
                        opacity: null == t.opacity ? .5 : t.opacity,
                        offsetx: t.offsetx || 0,
                        offsety: t.offsety || 0,
                        color: t.color || "#000"
                    }, n = e.width / 2, r = this.paper, i = r.set(), o = this.realPath || ht[this.type](this);
                    o = this.matrix ? dt(o, this.matrix) : o;
                    for (var a = 1; a < n + 1; a++) i.push(r.path(o).attr({
                        stroke: e.color,
                        fill: e.fill ? e.color : "none",
                        "stroke-linejoin": "round",
                        "stroke-linecap": "round",
                        "stroke-width": +(e.width / n * a).toFixed(3),
                        opacity: +(e.opacity / n).toFixed(3)
                    }));
                    return i.insertBefore(this).translate(e.offsetx, e.offsety)
                };
                var Wt = function (t, n, r, i, o, a, c, f, u) {
                    return null == u ? s(t, n, r, i, o, a, c, f) : e.findDotsAtSegment(t, n, r, i, o, a, c, f, function (t, e, n, r, i, o, a, c, f) {
                        if (!(f < 0 || s(t, e, n, r, i, o, a, c) < f)) {
                            var u, l = .5, h = 1 - l;
                            for (u = s(t, e, n, r, i, o, a, c, h); Q(u - f) > .01;) l /= 2, u = s(t, e, n, r, i, o, a, c, h += (u < f ? 1 : -1) * l);
                            return h
                        }
                    }(t, n, r, i, o, a, c, f, u))
                }, Xt = function (t, n) {
                    return function (r, i, o) {
                        for (var a, s, c, f, u, l = "", h = {}, d = 0, p = 0, b = (r = Rt(r)).length; p < b; p++) {
                            if ("M" == (c = r[p])[0]) a = +c[1], s = +c[2]; else {
                                if (d + (f = Wt(a, s, c[1], c[2], c[3], c[4], c[5], c[6])) > i) {
                                    if (n && !h.start) {
                                        if (l += ["C" + (u = Wt(a, s, c[1], c[2], c[3], c[4], c[5], c[6], i - d)).start.x, u.start.y, u.m.x, u.m.y, u.x, u.y], o) return l;
                                        h.start = l, l = ["M" + u.x, u.y + "C" + u.n.x, u.n.y, u.end.x, u.end.y, c[5], c[6]].join(), d += f, a = +c[5], s = +c[6];
                                        continue
                                    }
                                    if (!t && !n) return {
                                        x: (u = Wt(a, s, c[1], c[2], c[3], c[4], c[5], c[6], i - d)).x,
                                        y: u.y,
                                        alpha: u.alpha
                                    }
                                }
                                d += f, a = +c[5], s = +c[6]
                            }
                            l += c.shift() + c
                        }
                        return h.end = l, (u = t ? d : n ? h : e.findDotsAtSegment(a, s, c[0], c[1], c[2], c[3], c[4], c[5], 1)).alpha && (u = {
                            x: u.x,
                            y: u.y,
                            alpha: u.alpha
                        }), u
                    }
                }, Kt = Xt(1), Zt = Xt(), te = Xt(0, 1);
                e.getTotalLength = Kt, e.getPointAtLength = Zt, e.getSubpath = function (t, e, n) {
                    if (this.getTotalLength(t) - n < 1e-6) return te(t, e).end;
                    var r = te(t, n, 1);
                    return e ? te(r, e).end : r
                }, Gt.getTotalLength = function () {
                    var t = this.getPath();
                    if (t) return this.node.getTotalLength ? this.node.getTotalLength() : Kt(t)
                }, Gt.getPointAtLength = function (t) {
                    var e = this.getPath();
                    if (e) return Zt(e, t)
                }, Gt.getPath = function () {
                    var t, n = e._getPath[this.type];
                    if ("text" != this.type && "set" != this.type) return n && (t = n(this)), t
                }, Gt.getSubpath = function (t, n) {
                    var r = this.getPath();
                    if (r) return e.getSubpath(r, t, n)
                };
                var ee = e.easing_formulas = {
                    linear: function (t) {
                        return t
                    }, "<": function (t) {
                        return U(t, 1.7)
                    }, ">": function (t) {
                        return U(t, .48)
                    }, "<>": function (t) {
                        var e = .48 - t / 1.04, n = N.sqrt(.1734 + e * e), r = n - e, i = -n - e,
                            o = U(Q(r), 1 / 3) * (r < 0 ? -1 : 1) + U(Q(i), 1 / 3) * (i < 0 ? -1 : 1) + .5;
                        return 3 * (1 - o) * o * o + o * o * o
                    }, backIn: function (t) {
                        var e = 1.70158;
                        return t * t * ((e + 1) * t - e)
                    }, backOut: function (t) {
                        var e = 1.70158;
                        return (t -= 1) * t * ((e + 1) * t + e) + 1
                    }, elastic: function (t) {
                        return t == !!t ? t : U(2, -10 * t) * N.sin(2 * F * (t - .075) / .3) + 1
                    }, bounce: function (t) {
                        var e = 7.5625, n = 2.75;
                        return t < 1 / n ? e * t * t : t < 2 / n ? e * (t -= 1.5 / n) * t + .75 : t < 2.5 / n ? e * (t -= 2.25 / n) * t + .9375 : e * (t -= 2.625 / n) * t + .984375
                    }
                };
                ee.easeIn = ee["ease-in"] = ee["<"], ee.easeOut = ee["ease-out"] = ee[">"], ee.easeInOut = ee["ease-in-out"] = ee["<>"], ee["back-in"] = ee.backIn, ee["back-out"] = ee.backOut;
                var ne = [],
                    re = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
                        setTimeout(t, 16)
                    }, ie = function () {
                        for (var n = +new Date, r = 0; r < ne.length; r++) {
                            var i = ne[r];
                            if (!i.el.removed && !i.paused) {
                                var o, a, s = n - i.start, c = i.ms, f = i.easing, u = i.from, l = i.diff, h = i.to,
                                    d = (i.t, i.el), p = {}, g = {};
                                if (i.initstatus ? (s = (i.initstatus * i.anim.top - i.prev) / (i.percent - i.prev) * c, i.status = i.initstatus, delete i.initstatus, i.stop && ne.splice(r--, 1)) : i.status = (i.prev + (i.percent - i.prev) * (s / c)) / i.anim.top, !(s < 0)) if (s < c) {
                                    var y = f(s / c);
                                    for (var m in u) if (u[_](m)) {
                                        switch (tt[m]) {
                                            case Y:
                                                o = +u[m] + y * c * l[m];
                                                break;
                                            case"colour":
                                                o = "rgb(" + [oe(q(u[m].r + y * c * l[m].r)), oe(q(u[m].g + y * c * l[m].g)), oe(q(u[m].b + y * c * l[m].b))].join(",") + ")";
                                                break;
                                            case"path":
                                                o = [];
                                                for (var v = 0, A = u[m].length; v < A; v++) {
                                                    o[v] = [u[m][v][0]];
                                                    for (var w = 1, E = u[m][v].length; w < E; w++) o[v][w] = +u[m][v][w] + y * c * l[m][v][w];
                                                    o[v] = o[v].join(M)
                                                }
                                                o = o.join(M);
                                                break;
                                            case"transform":
                                                if (l[m].real) for (o = [], v = 0, A = u[m].length; v < A; v++) for (o[v] = [u[m][v][0]], w = 1, E = u[m][v].length; w < E; w++) o[v][w] = u[m][v][w] + y * c * l[m][v][w]; else {
                                                    var x = function (t) {
                                                        return +u[m][t] + y * c * l[m][t]
                                                    };
                                                    o = [["m", x(0), x(1), x(2), x(3), x(4), x(5)]]
                                                }
                                                break;
                                            case"csv":
                                                if ("clip-rect" == m) for (o = [], v = 4; v--;) o[v] = +u[m][v] + y * c * l[m][v];
                                                break;
                                            default:
                                                var C = [][S](u[m]);
                                                for (o = [], v = d.paper.customAttributes[m].length; v--;) o[v] = +C[v] + y * c * l[m][v]
                                        }
                                        p[m] = o
                                    }
                                    d.attr(p), function (e, n, r) {
                                        setTimeout(function () {
                                            t("raphael.anim.frame." + e, n, r)
                                        })
                                    }(d.id, d, i.anim)
                                } else {
                                    if (function (n, r, i) {
                                        setTimeout(function () {
                                            t("raphael.anim.frame." + r.id, r, i), t("raphael.anim.finish." + r.id, r, i), e.is(n, "function") && n.call(r)
                                        })
                                    }(i.callback, d, i.anim), d.attr(h), ne.splice(r--, 1), i.repeat > 1 && !i.next) {
                                        for (a in h) h[_](a) && (g[a] = i.totalOrigin[a]);
                                        i.el.attr(g), b(i.anim, i.el, i.anim.percents[0], null, i.totalOrigin, i.repeat - 1)
                                    }
                                    i.next && !i.stop && b(i.anim, i.el, i.next, null, i.totalOrigin, i.repeat)
                                }
                            }
                        }
                        ne.length && re(ie)
                    }, oe = function (t) {
                        return t > 255 ? 255 : t < 0 ? 0 : t
                    };
                Gt.animateWith = function (t, n, r, i, o, a) {
                    var s = this;
                    if (s.removed) return a && a.call(s), s;
                    var c = r instanceof p ? r : e.animation(r, i, o, a);
                    b(c, s, c.percents[0], null, s.attr());
                    for (var f = 0, u = ne.length; f < u; f++) if (ne[f].anim == n && ne[f].el == t) {
                        ne[u - 1].start = ne[f].start;
                        break
                    }
                    return s
                }, Gt.onAnimation = function (e) {
                    return e ? t.on("raphael.anim.frame." + this.id, e) : t.unbind("raphael.anim.frame." + this.id), this
                }, p.prototype.delay = function (t) {
                    var e = new p(this.anim, this.ms);
                    return e.times = this.times, e.del = +t || 0, e
                }, p.prototype.repeat = function (t) {
                    var e = new p(this.anim, this.ms);
                    return e.del = this.del, e.times = N.floor(j(t, 0)) || 1, e
                }, e.animation = function (t, n, r, i) {
                    if (t instanceof p) return t;
                    !e.is(r, "function") && r || (i = i || r || null, r = null), t = Object(t), n = +n || 0;
                    var o, a, s = {};
                    for (a in t) t[_](a) && W(a) != a && W(a) + "%" != a && (o = !0, s[a] = t[a]);
                    if (o) return r && (s.easing = r), i && (s.callback = i), new p({100: s}, n);
                    if (i) {
                        var c = 0;
                        for (var f in t) {
                            var u = X(f);
                            t[_](f) && u > c && (c = u)
                        }
                        !t[c += "%"].callback && (t[c].callback = i)
                    }
                    return new p(t, n)
                }, Gt.animate = function (t, n, r, i) {
                    var o = this;
                    if (o.removed) return i && i.call(o), o;
                    var a = t instanceof p ? t : e.animation(t, n, r, i);
                    return b(a, o, a.percents[0], null, o.attr()), o
                }, Gt.setTime = function (t, e) {
                    return t && null != e && this.status(t, L(e, t.ms) / t.ms), this
                }, Gt.status = function (t, e) {
                    var n, r, i = [], o = 0;
                    if (null != e) return b(t, this, -1, L(e, 1)), this;
                    for (n = ne.length; o < n; o++) if ((r = ne[o]).el.id == this.id && (!t || r.anim == t)) {
                        if (t) return r.status;
                        i.push({anim: r.anim, status: r.status})
                    }
                    return t ? 0 : i
                }, Gt.pause = function (e) {
                    for (var n = 0; n < ne.length; n++) ne[n].el.id != this.id || e && ne[n].anim != e || !1 !== t("raphael.anim.pause." + this.id, this, ne[n].anim) && (ne[n].paused = !0);
                    return this
                }, Gt.resume = function (e) {
                    for (var n = 0; n < ne.length; n++) if (ne[n].el.id == this.id && (!e || ne[n].anim == e)) {
                        var r = ne[n];
                        !1 !== t("raphael.anim.resume." + this.id, this, r.anim) && (delete r.paused, this.status(r.anim, r.status))
                    }
                    return this
                }, Gt.stop = function (e) {
                    for (var n = 0; n < ne.length; n++) ne[n].el.id != this.id || e && ne[n].anim != e || !1 !== t("raphael.anim.stop." + this.id, this, ne[n].anim) && ne.splice(n--, 1);
                    return this
                }, t.on("raphael.remove", g), t.on("raphael.clear", g), Gt.toString = function () {
                    return "Raphaël’s object"
                };
                var ae = function (t) {
                    if (this.items = [], this.length = 0, this.type = "set", t) for (var e = 0, n = t.length; e < n; e++) !t[e] || t[e].constructor != Gt.constructor && t[e].constructor != ae || (this[this.items.length] = this.items[this.items.length] = t[e], this.length++)
                }, se = ae.prototype;
                for (var ce in se.push = function () {
                    for (var t, e, n = 0, r = arguments.length; n < r; n++) !(t = arguments[n]) || t.constructor != Gt.constructor && t.constructor != ae || (this[e = this.items.length] = this.items[e] = t, this.length++);
                    return this
                }, se.pop = function () {
                    return this.length && delete this[this.length--], this.items.pop()
                }, se.forEach = function (t, e) {
                    for (var n = 0, r = this.items.length; n < r; n++) if (!1 === t.call(e, this.items[n], n)) return this;
                    return this
                }, Gt) Gt[_](ce) && (se[ce] = function (t) {
                    return function () {
                        var e = arguments;
                        return this.forEach(function (n) {
                            n[t][B](n, e)
                        })
                    }
                }(ce));
                return se.attr = function (t, n) {
                    if (t && e.is(t, z) && e.is(t[0], "object")) for (var r = 0, i = t.length; r < i; r++) this.items[r].attr(t[r]); else for (var o = 0, a = this.items.length; o < a; o++) this.items[o].attr(t, n);
                    return this
                }, se.clear = function () {
                    for (; this.length;) this.pop()
                }, se.splice = function (t, e, n) {
                    t = t < 0 ? j(this.length + t, 0) : t, e = j(0, L(this.length - t, e));
                    var r, i = [], o = [], a = [];
                    for (r = 2; r < arguments.length; r++) a.push(arguments[r]);
                    for (r = 0; r < e; r++) o.push(this[t + r]);
                    for (; r < this.length - t; r++) i.push(this[t + r]);
                    var s = a.length;
                    for (r = 0; r < s + i.length; r++) this.items[t + r] = this[t + r] = r < s ? a[r] : i[r - s];
                    for (r = this.items.length = this.length -= e - s; this[r];) delete this[r++];
                    return new ae(o)
                }, se.exclude = function (t) {
                    for (var e = 0, n = this.length; e < n; e++) if (this[e] == t) return this.splice(e, 1), !0
                }, se.animate = function (t, n, r, i) {
                    (e.is(r, "function") || !r) && (i = r || null);
                    var o, a, s = this.items.length, c = s, f = this;
                    if (!s) return this;
                    i && (a = function () {
                        !--s && i.call(f)
                    }), r = e.is(r, H) ? r : a;
                    var u = e.animation(t, n, r, a);
                    for (o = this.items[--c].animate(u); c--;) this.items[c] && !this.items[c].removed && this.items[c].animateWith(o, u, u), this.items[c] && !this.items[c].removed || s--;
                    return this
                }, se.insertAfter = function (t) {
                    for (var e = this.items.length; e--;) this.items[e].insertAfter(t);
                    return this
                }, se.getBBox = function () {
                    for (var t = [], e = [], n = [], r = [], i = this.items.length; i--;) if (!this.items[i].removed) {
                        var o = this.items[i].getBBox();
                        t.push(o.x), e.push(o.y), n.push(o.x + o.width), r.push(o.y + o.height)
                    }
                    return {
                        x: t = L[B](0, t),
                        y: e = L[B](0, e),
                        x2: n = j[B](0, n),
                        y2: r = j[B](0, r),
                        width: n - t,
                        height: r - e
                    }
                }, se.clone = function (t) {
                    t = this.paper.set();
                    for (var e = 0, n = this.items.length; e < n; e++) t.push(this.items[e].clone());
                    return t
                }, se.toString = function () {
                    return "Raphaël‘s set"
                }, se.glow = function (t) {
                    var e = this.paper.set();
                    return this.forEach(function (n, r) {
                        var i = n.glow(t);
                        null != i && i.forEach(function (t, n) {
                            e.push(t)
                        })
                    }), e
                }, se.isPointInside = function (t, e) {
                    var n = !1;
                    return this.forEach(function (r) {
                        if (r.isPointInside(t, e)) return n = !0, !1
                    }), n
                }, e.registerFont = function (t) {
                    if (!t.face) return t;
                    this.fonts = this.fonts || {};
                    var e = {w: t.w, face: {}, glyphs: {}}, n = t.face["font-family"];
                    for (var r in t.face) t.face[_](r) && (e.face[r] = t.face[r]);
                    if (this.fonts[n] ? this.fonts[n].push(e) : this.fonts[n] = [e], !t.svg) for (var i in e.face["units-per-em"] = X(t.face["units-per-em"], 10), t.glyphs) if (t.glyphs[_](i)) {
                        var o = t.glyphs[i];
                        if (e.glyphs[i] = {
                            w: o.w, k: {}, d: o.d && "M" + o.d.replace(/[mlcxtrv]/g, function (t) {
                                return {l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[t] || "M"
                            }) + "z"
                        }, o.k) for (var a in o.k) o[_](a) && (e.glyphs[i].k[a] = o.k[a])
                    }
                    return t
                }, m.getFont = function (t, n, r, i) {
                    if (i = i || "normal", r = r || "normal", n = +n || {
                        normal: 400,
                        bold: 700,
                        lighter: 300,
                        bolder: 800
                    }[n] || 400, e.fonts) {
                        var o, a = e.fonts[t];
                        if (!a) {
                            var s = new RegExp("(^|\\s)" + t.replace(/[^\w\d\s+!~.:_-]/g, I) + "(\\s|$)", "i");
                            for (var c in e.fonts) if (e.fonts[_](c) && s.test(c)) {
                                a = e.fonts[c];
                                break
                            }
                        }
                        if (a) for (var f = 0, u = a.length; f < u && ((o = a[f]).face["font-weight"] != n || o.face["font-style"] != r && o.face["font-style"] || o.face["font-stretch"] != i); f++) ;
                        return o
                    }
                }, m.print = function (t, n, r, i, o, a, s, c) {
                    a = a || "middle", s = j(L(s || 0, 1), -1), c = j(L(c || 1, 3), 1);
                    var f, u = T(r)[R](I), l = 0, h = 0, d = I;
                    if (e.is(i, "string") && (i = this.getFont(i)), i) {
                        f = (o || 16) / i.face["units-per-em"];
                        for (var p = i.face.bbox[R](v), b = +p[0], g = p[3] - p[1], y = 0, m = +p[1] + ("baseline" == a ? g + +i.face.descent : g / 2), A = 0, w = u.length; A < w; A++) {
                            if ("\n" == u[A]) l = 0, E = 0, h = 0, y += g * c; else {
                                var _ = h && i.glyphs[u[A - 1]] || {}, E = i.glyphs[u[A]];
                                l += h ? (_.w || i.w) + (_.k && _.k[u[A]] || 0) + i.w * s : 0, h = 1
                            }
                            E && E.d && (d += e.transformPath(E.d, ["t", l * f, y * f, "s", f, f, b, m, "t", (t - b) / f, (n - m) / f]))
                        }
                    }
                    return this.path(d).attr({fill: "#000", stroke: "none"})
                }, m.add = function (t) {
                    if (e.is(t, "array")) for (var n, r = this.set(), i = 0, o = t.length; i < o; i++) n = t[i] || {}, A[_](n.type) && r.push(this[n.type]().attr(n));
                    return r
                }, e.format = function (t, n) {
                    var r = e.is(n, z) ? [0][S](n) : arguments;
                    return t && e.is(t, H) && r.length - 1 && (t = t.replace(w, function (t, e) {
                        return null == r[++e] ? I : r[e]
                    })), t || I
                }, e.fullfill = function () {
                    var t = /\{([^\}]+)\}/g, e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                        n = function (t, n, r) {
                            var i = r;
                            return n.replace(e, function (t, e, n, r, o) {
                                e = e || r, i && (e in i && (i = i[e]), "function" == typeof i && o && (i = i()))
                            }), i = (null == i || i == r ? t : i) + ""
                        };
                    return function (e, r) {
                        return String(e).replace(t, function (t, e) {
                            return n(t, e, r)
                        })
                    }
                }(), e.ninja = function () {
                    if (x.was) E.win.Raphael = x.is; else {
                        window.Raphael = void 0;
                        try {
                            delete window.Raphael
                        } catch (t) {
                        }
                    }
                    return e
                }, e.st = se, t.on("raphael.DOMload", function () {
                    y = !0
                }), function (t, n, r) {
                    null == t.readyState && t.addEventListener && (t.addEventListener(n, r = function () {
                        t.removeEventListener(n, r, !1), t.readyState = "complete"
                    }, !1), t.readyState = "loading"), function n() {
                        /in/.test(t.readyState) ? setTimeout(n, 9) : e.eve("raphael.DOMload")
                    }()
                }(document, "DOMContentLoaded"), e
            }.apply(e, r)) || (t.exports = i)
        }, function (t, e, n) {
            var r, i, o, a, s, c, f, u, l, h, d, p, b, g;
            a = "0.5.0", s = "hasOwnProperty", c = /[\.\/]/, f = /\s*,\s*/, u = function (t, e) {
                return t - e
            }, l = {n: {}}, h = function () {
                for (var t = 0, e = this.length; t < e; t++) if (void 0 !== this[t]) return this[t]
            }, d = function () {
                for (var t = this.length; --t;) if (void 0 !== this[t]) return this[t]
            }, p = Object.prototype.toString, b = String, g = Array.isArray || function (t) {
                return t instanceof Array || "[object Array]" == p.call(t)
            }, eve = function (t, e) {
                var n, r = o, a = Array.prototype.slice.call(arguments, 2), s = eve.listeners(t), c = 0, f = [], l = {},
                    p = [], b = i;
                p.firstDefined = h, p.lastDefined = d, i = t, o = 0;
                for (var g = 0, y = s.length; g < y; g++) "zIndex" in s[g] && (f.push(s[g].zIndex), s[g].zIndex < 0 && (l[s[g].zIndex] = s[g]));
                for (f.sort(u); f[c] < 0;) if (n = l[f[c++]], p.push(n.apply(e, a)), o) return o = r, p;
                for (g = 0; g < y; g++) if ("zIndex" in (n = s[g])) if (n.zIndex == f[c]) {
                    if (p.push(n.apply(e, a)), o) break;
                    do {
                        if ((n = l[f[++c]]) && p.push(n.apply(e, a)), o) break
                    } while (n)
                } else l[n.zIndex] = n; else if (p.push(n.apply(e, a)), o) break;
                return o = r, i = b, p
            }, eve._events = l, eve.listeners = function (t) {
                var e, n, r, i, o, a, s, f, u = g(t) ? t : t.split(c), h = l, d = [h], p = [];
                for (i = 0, o = u.length; i < o; i++) {
                    for (f = [], a = 0, s = d.length; a < s; a++) for (n = [(h = d[a].n)[u[i]], h["*"]], r = 2; r--;) (e = n[r]) && (f.push(e), p = p.concat(e.f || []));
                    d = f
                }
                return p
            }, eve.separator = function (t) {
                t ? (t = "[" + (t = b(t).replace(/(?=[\.\^\]\[\-])/g, "\\")) + "]", c = new RegExp(t)) : c = /[\.\/]/
            }, eve.on = function (t, e) {
                if ("function" != typeof e) return function () {
                };
                for (var n = g(t) ? g(t[0]) ? t : [t] : b(t).split(f), r = 0, i = n.length; r < i; r++) !function (t) {
                    for (var n, r = g(t) ? t : b(t).split(c), i = l, o = 0, a = r.length; o < a; o++) i = (i = i.n).hasOwnProperty(r[o]) && i[r[o]] || (i[r[o]] = {n: {}});
                    for (i.f = i.f || [], o = 0, a = i.f.length; o < a; o++) if (i.f[o] == e) {
                        n = !0;
                        break
                    }
                    !n && i.f.push(e)
                }(n[r]);
                return function (t) {
                    +t == +t && (e.zIndex = +t)
                }
            }, eve.f = function (t) {
                var e = [].slice.call(arguments, 1);
                return function () {
                    eve.apply(null, [t, null].concat(e).concat([].slice.call(arguments, 0)))
                }
            }, eve.stop = function () {
                o = 1
            }, eve.nt = function (t) {
                var e = g(i) ? i.join(".") : i;
                return t ? new RegExp("(?:\\.|\\/|^)" + t + "(?:\\.|\\/|$)").test(e) : e
            }, eve.nts = function () {
                return g(i) ? i : i.split(c)
            }, eve.off = eve.unbind = function (t, e) {
                if (t) {
                    var n = g(t) ? g(t[0]) ? t : [t] : b(t).split(f);
                    if (n.length > 1) for (var r = 0, i = n.length; r < i; r++) eve.off(n[r], e); else {
                        n = g(t) ? t : b(t).split(c);
                        var o, a, u, h, d, p = [l];
                        for (r = 0, i = n.length; r < i; r++) for (h = 0; h < p.length; h += u.length - 2) {
                            if (u = [h, 1], o = p[h].n, "*" != n[r]) o[n[r]] && u.push(o[n[r]]); else for (a in o) o[s](a) && u.push(o[a]);
                            p.splice.apply(p, u)
                        }
                        for (r = 0, i = p.length; r < i; r++) for (o = p[r]; o.n;) {
                            if (e) {
                                if (o.f) {
                                    for (h = 0, d = o.f.length; h < d; h++) if (o.f[h] == e) {
                                        o.f.splice(h, 1);
                                        break
                                    }
                                    !o.f.length && delete o.f
                                }
                                for (a in o.n) if (o.n[s](a) && o.n[a].f) {
                                    var y = o.n[a].f;
                                    for (h = 0, d = y.length; h < d; h++) if (y[h] == e) {
                                        y.splice(h, 1);
                                        break
                                    }
                                    !y.length && delete o.n[a].f
                                }
                            } else for (a in delete o.f, o.n) o.n[s](a) && o.n[a].f && delete o.n[a].f;
                            o = o.n
                        }
                    }
                } else eve._events = l = {n: {}}
            }, eve.once = function (t, e) {
                var n = function () {
                    return eve.off(t, n), e.apply(this, arguments)
                };
                return eve.on(t, n)
            }, eve.version = a, eve.toString = function () {
                return "You are running Eve " + a
            }, void 0 !== t && t.exports ? t.exports = eve : void 0 === (r = function () {
                return eve
            }.apply(e, [])) || (t.exports = r)
        }, function (t, e, n) {
            var r, i;
            r = [n(1)], void 0 === (i = function (t) {
                if (!t || t.svg) {
                    var e = "hasOwnProperty", n = String, r = parseFloat, i = parseInt, o = Math, a = o.max, s = o.abs,
                        c = o.pow, f = /[, ]+/, u = t.eve, l = "", h = " ", d = "http://www.w3.org/1999/xlink", p = {
                            block: "M5,0 0,2.5 5,5z",
                            classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                            diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                            open: "M6,1 1,3.5 6,6",
                            oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
                        }, b = {};
                    t.toString = function () {
                        return "Your browser supports SVG.\nYou are running Raphaël " + this.version
                    };
                    var g = function (r, i) {
                        if (i) for (var o in "string" == typeof r && (r = g(r)), i) i[e](o) && ("xlink:" == o.substring(0, 6) ? r.setAttributeNS(d, o.substring(6), n(i[o])) : r.setAttribute(o, n(i[o]))); else (r = t._g.doc.createElementNS("http://www.w3.org/2000/svg", r)).style && (r.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                        return r
                    }, y = function (e, i) {
                        var f = "linear", u = e.id + i, h = .5, d = .5, p = e.node, b = e.paper, y = p.style,
                            v = t._g.doc.getElementById(u);
                        if (!v) {
                            if (i = (i = n(i).replace(t._radial_gradient, function (t, e, n) {
                                if (f = "radial", e && n) {
                                    h = r(e);
                                    var i = 2 * ((d = r(n)) > .5) - 1;
                                    c(h - .5, 2) + c(d - .5, 2) > .25 && (d = o.sqrt(.25 - c(h - .5, 2)) * i + .5) && .5 != d && (d = d.toFixed(5) - 1e-5 * i)
                                }
                                return l
                            })).split(/\s*\-\s*/), "linear" == f) {
                                var A = i.shift();
                                if (A = -r(A), isNaN(A)) return null;
                                var w = [0, 0, o.cos(t.rad(A)), o.sin(t.rad(A))], _ = 1 / (a(s(w[2]), s(w[3])) || 1);
                                w[2] *= _, w[3] *= _, w[2] < 0 && (w[0] = -w[2], w[2] = 0), w[3] < 0 && (w[1] = -w[3], w[3] = 0)
                            }
                            var E = t._parseDots(i);
                            if (!E) return null;
                            if (u = u.replace(/[\(\)\s,\xb0#]/g, "_"), e.gradient && u != e.gradient.id && (b.defs.removeChild(e.gradient), delete e.gradient), !e.gradient) {
                                v = g(f + "Gradient", {id: u}), e.gradient = v, g(v, "radial" == f ? {
                                    fx: h,
                                    fy: d
                                } : {
                                    x1: w[0],
                                    y1: w[1],
                                    x2: w[2],
                                    y2: w[3],
                                    gradientTransform: e.matrix.invert()
                                }), b.defs.appendChild(v);
                                for (var x = 0, C = E.length; x < C; x++) v.appendChild(g("stop", {
                                    offset: E[x].offset ? E[x].offset : x ? "100%" : "0%",
                                    "stop-color": E[x].color || "#fff",
                                    "stop-opacity": isFinite(E[x].opacity) ? E[x].opacity : 1
                                }))
                            }
                        }
                        return g(p, {
                            fill: m(u),
                            opacity: 1,
                            "fill-opacity": 1
                        }), y.fill = l, y.opacity = 1, y.fillOpacity = 1, 1
                    }, m = function (t) {
                        if (function () {
                            var t = document.documentMode;
                            return t && (9 === t || 10 === t)
                        }()) return "url('#" + t + "')";
                        var e = document.location;
                        return "url('" + e.protocol + "//" + e.host + e.pathname + e.search + "#" + t + "')"
                    }, v = function (t) {
                        var e = t.getBBox(1);
                        g(t.pattern, {patternTransform: t.matrix.invert() + " translate(" + e.x + "," + e.y + ")"})
                    }, A = function (r, i, o) {
                        if ("path" == r.type) {
                            for (var a, s, c, f, u, h = n(i).toLowerCase().split("-"), d = r.paper, y = o ? "end" : "start", m = r.node, v = r.attrs, A = v["stroke-width"], w = h.length, _ = "classic", E = 3, x = 3, C = 5; w--;) switch (h[w]) {
                                case"block":
                                case"classic":
                                case"oval":
                                case"diamond":
                                case"open":
                                case"none":
                                    _ = h[w];
                                    break;
                                case"wide":
                                    x = 5;
                                    break;
                                case"narrow":
                                    x = 2;
                                    break;
                                case"long":
                                    E = 5;
                                    break;
                                case"short":
                                    E = 2
                            }
                            if ("open" == _ ? (E += 2, x += 2, C += 2, c = 1, f = o ? 4 : 1, u = {
                                fill: "none",
                                stroke: v.stroke
                            }) : (f = c = E / 2, u = {
                                fill: v.stroke,
                                stroke: "none"
                            }), r._.arrows ? o ? (r._.arrows.endPath && b[r._.arrows.endPath]--, r._.arrows.endMarker && b[r._.arrows.endMarker]--) : (r._.arrows.startPath && b[r._.arrows.startPath]--, r._.arrows.startMarker && b[r._.arrows.startMarker]--) : r._.arrows = {}, "none" != _) {
                                var B = "raphael-marker-" + _, S = "raphael-marker-" + y + _ + E + x + "-obj" + r.id;
                                t._g.doc.getElementById(B) ? b[B]++ : (d.defs.appendChild(g(g("path"), {
                                    "stroke-linecap": "round",
                                    d: p[_],
                                    id: B
                                })), b[B] = 1);
                                var k, I = t._g.doc.getElementById(S);
                                I ? (b[S]++, k = I.getElementsByTagName("use")[0]) : (I = g(g("marker"), {
                                    id: S,
                                    markerHeight: x,
                                    markerWidth: E,
                                    orient: "auto",
                                    refX: f,
                                    refY: x / 2
                                }), k = g(g("use"), {
                                    "xlink:href": "#" + B,
                                    transform: (o ? "rotate(180 " + E / 2 + " " + x / 2 + ") " : l) + "scale(" + E / C + "," + x / C + ")",
                                    "stroke-width": (1 / ((E / C + x / C) / 2)).toFixed(4)
                                }), I.appendChild(k), d.defs.appendChild(I), b[S] = 1), g(k, u);
                                var M = c * ("diamond" != _ && "oval" != _);
                                o ? (a = r._.arrows.startdx * A || 0, s = t.getTotalLength(v.path) - M * A) : (a = M * A, s = t.getTotalLength(v.path) - (r._.arrows.enddx * A || 0)), (u = {})["marker-" + y] = "url(#" + S + ")", (s || a) && (u.d = t.getSubpath(v.path, a, s)), g(m, u), r._.arrows[y + "Path"] = B, r._.arrows[y + "Marker"] = S, r._.arrows[y + "dx"] = M, r._.arrows[y + "Type"] = _, r._.arrows[y + "String"] = i
                            } else o ? (a = r._.arrows.startdx * A || 0, s = t.getTotalLength(v.path) - a) : (a = 0, s = t.getTotalLength(v.path) - (r._.arrows.enddx * A || 0)), r._.arrows[y + "Path"] && g(m, {d: t.getSubpath(v.path, a, s)}), delete r._.arrows[y + "Path"], delete r._.arrows[y + "Marker"], delete r._.arrows[y + "dx"], delete r._.arrows[y + "Type"], delete r._.arrows[y + "String"];
                            for (u in b) if (b[e](u) && !b[u]) {
                                var T = t._g.doc.getElementById(u);
                                T && T.parentNode.removeChild(T)
                            }
                        }
                    }, w = {
                        "-": [3, 1],
                        ".": [1, 1],
                        "-.": [3, 1, 1, 1],
                        "-..": [3, 1, 1, 1, 1, 1],
                        ". ": [1, 3],
                        "- ": [4, 3],
                        "--": [8, 3],
                        "- .": [4, 3, 1, 3],
                        "--.": [8, 3, 1, 3],
                        "--..": [8, 3, 1, 3, 1, 3]
                    }, _ = function (t, e, r) {
                        if (e = w[n(e).toLowerCase()]) {
                            for (var i = t.attrs["stroke-width"] || "1", o = {
                                round: i,
                                square: i,
                                butt: 0
                            }[t.attrs["stroke-linecap"] || r["stroke-linecap"]] || 0, a = [], s = e.length; s--;) a[s] = e[s] * i + (s % 2 ? 1 : -1) * o;
                            g(t.node, {"stroke-dasharray": a.join(",")})
                        } else g(t.node, {"stroke-dasharray": "none"})
                    }, E = function (r, o) {
                        var c = r.node, u = r.attrs, h = c.style.visibility;
                        for (var p in c.style.visibility = "hidden", o) if (o[e](p)) {
                            if (!t._availableAttrs[e](p)) continue;
                            var b = o[p];
                            switch (u[p] = b, p) {
                                case"blur":
                                    r.blur(b);
                                    break;
                                case"title":
                                    var m = c.getElementsByTagName("title");
                                    if (m.length && (m = m[0])) m.firstChild.nodeValue = b; else {
                                        m = g("title");
                                        var w = t._g.doc.createTextNode(b);
                                        m.appendChild(w), c.appendChild(m)
                                    }
                                    break;
                                case"href":
                                case"target":
                                    var E = c.parentNode;
                                    if ("a" != E.tagName.toLowerCase()) {
                                        var C = g("a");
                                        E.insertBefore(C, c), C.appendChild(c), E = C
                                    }
                                    "target" == p ? E.setAttributeNS(d, "show", "blank" == b ? "new" : b) : E.setAttributeNS(d, p, b);
                                    break;
                                case"cursor":
                                    c.style.cursor = b;
                                    break;
                                case"transform":
                                    r.transform(b);
                                    break;
                                case"arrow-start":
                                    A(r, b);
                                    break;
                                case"arrow-end":
                                    A(r, b, 1);
                                    break;
                                case"clip-rect":
                                    var B = n(b).split(f);
                                    if (4 == B.length) {
                                        r.clip && r.clip.parentNode.parentNode.removeChild(r.clip.parentNode);
                                        var S = g("clipPath"), k = g("rect");
                                        S.id = t.createUUID(), g(k, {
                                            x: B[0],
                                            y: B[1],
                                            width: B[2],
                                            height: B[3]
                                        }), S.appendChild(k), r.paper.defs.appendChild(S), g(c, {"clip-path": "url(#" + S.id + ")"}), r.clip = k
                                    }
                                    if (!b) {
                                        var I = c.getAttribute("clip-path");
                                        if (I) {
                                            var M = t._g.doc.getElementById(I.replace(/(^url\(#|\)$)/g, l));
                                            M && M.parentNode.removeChild(M), g(c, {"clip-path": l}), delete r.clip
                                        }
                                    }
                                    break;
                                case"path":
                                    "path" == r.type && (g(c, {d: b ? u.path = t._pathToAbsolute(b) : "M0,0"}), r._.dirty = 1, r._.arrows && ("startString" in r._.arrows && A(r, r._.arrows.startString), "endString" in r._.arrows && A(r, r._.arrows.endString, 1)));
                                    break;
                                case"width":
                                    if (c.setAttribute(p, b), r._.dirty = 1, !u.fx) break;
                                    p = "x", b = u.x;
                                case"x":
                                    u.fx && (b = -u.x - (u.width || 0));
                                case"rx":
                                    if ("rx" == p && "rect" == r.type) break;
                                case"cx":
                                    c.setAttribute(p, b), r.pattern && v(r), r._.dirty = 1;
                                    break;
                                case"height":
                                    if (c.setAttribute(p, b), r._.dirty = 1, !u.fy) break;
                                    p = "y", b = u.y;
                                case"y":
                                    u.fy && (b = -u.y - (u.height || 0));
                                case"ry":
                                    if ("ry" == p && "rect" == r.type) break;
                                case"cy":
                                    c.setAttribute(p, b), r.pattern && v(r), r._.dirty = 1;
                                    break;
                                case"r":
                                    "rect" == r.type ? g(c, {rx: b, ry: b}) : c.setAttribute(p, b), r._.dirty = 1;
                                    break;
                                case"src":
                                    "image" == r.type && c.setAttributeNS(d, "href", b);
                                    break;
                                case"stroke-width":
                                    1 == r._.sx && 1 == r._.sy || (b /= a(s(r._.sx), s(r._.sy)) || 1), c.setAttribute(p, b), u["stroke-dasharray"] && _(r, u["stroke-dasharray"], o), r._.arrows && ("startString" in r._.arrows && A(r, r._.arrows.startString), "endString" in r._.arrows && A(r, r._.arrows.endString, 1));
                                    break;
                                case"stroke-dasharray":
                                    _(r, b, o);
                                    break;
                                case"fill":
                                    var T = n(b).match(t._ISURL);
                                    if (T) {
                                        S = g("pattern");
                                        var R = g("image");
                                        S.id = t.createUUID(), g(S, {
                                            x: 0,
                                            y: 0,
                                            patternUnits: "userSpaceOnUse",
                                            height: 1,
                                            width: 1
                                        }), g(R, {x: 0, y: 0, "xlink:href": T[1]}), S.appendChild(R), function (e) {
                                            t._preload(T[1], function () {
                                                var t = this.offsetWidth, n = this.offsetHeight;
                                                g(e, {width: t, height: n}), g(R, {width: t, height: n})
                                            })
                                        }(S), r.paper.defs.appendChild(S), g(c, {fill: "url(#" + S.id + ")"}), r.pattern = S, r.pattern && v(r);
                                        break
                                    }
                                    var D = t.getRGB(b);
                                    if (D.error) {
                                        if (("circle" == r.type || "ellipse" == r.type || "r" != n(b).charAt()) && y(r, b)) {
                                            if ("opacity" in u || "fill-opacity" in u) {
                                                var O = t._g.doc.getElementById(c.getAttribute("fill").replace(/^url\(#|\)$/g, l));
                                                if (O) {
                                                    var P = O.getElementsByTagName("stop");
                                                    g(P[P.length - 1], {"stop-opacity": ("opacity" in u ? u.opacity : 1) * ("fill-opacity" in u ? u["fill-opacity"] : 1)})
                                                }
                                            }
                                            u.gradient = b, u.fill = "none";
                                            break
                                        }
                                    } else delete o.gradient, delete u.gradient, !t.is(u.opacity, "undefined") && t.is(o.opacity, "undefined") && g(c, {opacity: u.opacity}), !t.is(u["fill-opacity"], "undefined") && t.is(o["fill-opacity"], "undefined") && g(c, {"fill-opacity": u["fill-opacity"]});
                                    D[e]("opacity") && g(c, {"fill-opacity": D.opacity > 1 ? D.opacity / 100 : D.opacity});
                                case"stroke":
                                    D = t.getRGB(b), c.setAttribute(p, D.hex), "stroke" == p && D[e]("opacity") && g(c, {"stroke-opacity": D.opacity > 1 ? D.opacity / 100 : D.opacity}), "stroke" == p && r._.arrows && ("startString" in r._.arrows && A(r, r._.arrows.startString), "endString" in r._.arrows && A(r, r._.arrows.endString, 1));
                                    break;
                                case"gradient":
                                    ("circle" == r.type || "ellipse" == r.type || "r" != n(b).charAt()) && y(r, b);
                                    break;
                                case"opacity":
                                    u.gradient && !u[e]("stroke-opacity") && g(c, {"stroke-opacity": b > 1 ? b / 100 : b});
                                case"fill-opacity":
                                    if (u.gradient) {
                                        (O = t._g.doc.getElementById(c.getAttribute("fill").replace(/^url\(#|\)$/g, l))) && (P = O.getElementsByTagName("stop"), g(P[P.length - 1], {"stop-opacity": b}));
                                        break
                                    }
                                default:
                                    "font-size" == p && (b = i(b, 10) + "px");
                                    var N = p.replace(/(\-.)/g, function (t) {
                                        return t.substring(1).toUpperCase()
                                    });
                                    c.style[N] = b, r._.dirty = 1, c.setAttribute(p, b)
                            }
                        }
                        x(r, o), c.style.visibility = h
                    }, x = function (r, o) {
                        if ("text" == r.type && (o[e]("text") || o[e]("font") || o[e]("font-size") || o[e]("x") || o[e]("y"))) {
                            var a = r.attrs, s = r.node,
                                c = s.firstChild ? i(t._g.doc.defaultView.getComputedStyle(s.firstChild, l).getPropertyValue("font-size"), 10) : 10;
                            if (o[e]("text")) {
                                for (a.text = o.text; s.firstChild;) s.removeChild(s.firstChild);
                                for (var f, u = n(o.text).split("\n"), h = [], d = 0, p = u.length; d < p; d++) f = g("tspan"), d && g(f, {
                                    dy: 1.2 * c,
                                    x: a.x
                                }), f.appendChild(t._g.doc.createTextNode(u[d])), s.appendChild(f), h[d] = f
                            } else for (d = 0, p = (h = s.getElementsByTagName("tspan")).length; d < p; d++) d ? g(h[d], {
                                dy: 1.2 * c,
                                x: a.x
                            }) : g(h[0], {dy: 0});
                            g(s, {x: a.x, y: a.y}), r._.dirty = 1;
                            var b = r._getBBox(), y = a.y - (b.y + b.height / 2);
                            y && t.is(y, "finite") && g(h[0], {dy: y})
                        }
                    }, C = function (t) {
                        return t.parentNode && "a" === t.parentNode.tagName.toLowerCase() ? t.parentNode : t
                    }, B = function (e, n) {
                        this[0] = this.node = e, e.raphael = !0, this.id = ("0000" + (Math.random() * Math.pow(36, 5) << 0).toString(36)).slice(-5), e.raphaelid = this.id, this.matrix = t.matrix(), this.realPath = null, this.paper = n, this.attrs = this.attrs || {}, this._ = {
                            transform: [],
                            sx: 1,
                            sy: 1,
                            deg: 0,
                            dx: 0,
                            dy: 0,
                            dirty: 1
                        }, !n.bottom && (n.bottom = this), this.prev = n.top, n.top && (n.top.next = this), n.top = this, this.next = null
                    }, S = t.el;
                    B.prototype = S, S.constructor = B, t._engine.path = function (t, e) {
                        var n = g("path");
                        e.canvas && e.canvas.appendChild(n);
                        var r = new B(n, e);
                        return r.type = "path", E(r, {fill: "none", stroke: "#000", path: t}), r
                    }, S.rotate = function (t, e, i) {
                        if (this.removed) return this;
                        if ((t = n(t).split(f)).length - 1 && (e = r(t[1]), i = r(t[2])), t = r(t[0]), null == i && (e = i), null == e || null == i) {
                            var o = this.getBBox(1);
                            e = o.x + o.width / 2, i = o.y + o.height / 2
                        }
                        return this.transform(this._.transform.concat([["r", t, e, i]])), this
                    }, S.scale = function (t, e, i, o) {
                        if (this.removed) return this;
                        if ((t = n(t).split(f)).length - 1 && (e = r(t[1]), i = r(t[2]), o = r(t[3])), t = r(t[0]), null == e && (e = t), null == o && (i = o), null == i || null == o) var a = this.getBBox(1);
                        return i = null == i ? a.x + a.width / 2 : i, o = null == o ? a.y + a.height / 2 : o, this.transform(this._.transform.concat([["s", t, e, i, o]])), this
                    }, S.translate = function (t, e) {
                        return this.removed ? this : ((t = n(t).split(f)).length - 1 && (e = r(t[1])), t = r(t[0]) || 0, e = +e || 0, this.transform(this._.transform.concat([["t", t, e]])), this)
                    }, S.transform = function (n) {
                        var r = this._;
                        if (null == n) return r.transform;
                        if (t._extractTransform(this, n), this.clip && g(this.clip, {transform: this.matrix.invert()}), this.pattern && v(this), this.node && g(this.node, {transform: this.matrix}), 1 != r.sx || 1 != r.sy) {
                            var i = this.attrs[e]("stroke-width") ? this.attrs["stroke-width"] : 1;
                            this.attr({"stroke-width": i})
                        }
                        return this
                    }, S.hide = function () {
                        return this.removed || (this.node.style.display = "none"), this
                    }, S.show = function () {
                        return this.removed || (this.node.style.display = ""), this
                    }, S.remove = function () {
                        var e = C(this.node);
                        if (!this.removed && e.parentNode) {
                            var n = this.paper;
                            for (var r in n.__set__ && n.__set__.exclude(this), u.unbind("raphael.*.*." + this.id), this.gradient && n.defs.removeChild(this.gradient), t._tear(this, n), e.parentNode.removeChild(e), this.removeData(), this) this[r] = "function" == typeof this[r] ? t._removedFactory(r) : null;
                            this.removed = !0
                        }
                    }, S._getBBox = function () {
                        if ("none" == this.node.style.display) {
                            this.show();
                            var t = !0
                        }
                        var e, n = !1;
                        this.paper.canvas.parentElement ? e = this.paper.canvas.parentElement.style : this.paper.canvas.parentNode && (e = this.paper.canvas.parentNode.style), e && "none" == e.display && (n = !0, e.display = "");
                        var r = {};
                        try {
                            r = this.node.getBBox()
                        } catch (t) {
                            r = {
                                x: this.node.clientLeft,
                                y: this.node.clientTop,
                                width: this.node.clientWidth,
                                height: this.node.clientHeight
                            }
                        } finally {
                            r = r || {}, n && (e.display = "none")
                        }
                        return t && this.hide(), r
                    }, S.attr = function (n, r) {
                        if (this.removed) return this;
                        if (null == n) {
                            var i = {};
                            for (var o in this.attrs) this.attrs[e](o) && (i[o] = this.attrs[o]);
                            return i.gradient && "none" == i.fill && (i.fill = i.gradient) && delete i.gradient, i.transform = this._.transform, i
                        }
                        if (null == r && t.is(n, "string")) {
                            if ("fill" == n && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                            if ("transform" == n) return this._.transform;
                            for (var a = n.split(f), s = {}, c = 0, l = a.length; c < l; c++) (n = a[c]) in this.attrs ? s[n] = this.attrs[n] : t.is(this.paper.customAttributes[n], "function") ? s[n] = this.paper.customAttributes[n].def : s[n] = t._availableAttrs[n];
                            return l - 1 ? s : s[a[0]]
                        }
                        if (null == r && t.is(n, "array")) {
                            for (s = {}, c = 0, l = n.length; c < l; c++) s[n[c]] = this.attr(n[c]);
                            return s
                        }
                        if (null != r) {
                            var h = {};
                            h[n] = r
                        } else null != n && t.is(n, "object") && (h = n);
                        for (var d in h) u("raphael.attr." + d + "." + this.id, this, h[d]);
                        for (d in this.paper.customAttributes) if (this.paper.customAttributes[e](d) && h[e](d) && t.is(this.paper.customAttributes[d], "function")) {
                            var p = this.paper.customAttributes[d].apply(this, [].concat(h[d]));
                            for (var b in this.attrs[d] = h[d], p) p[e](b) && (h[b] = p[b])
                        }
                        return E(this, h), this
                    }, S.toFront = function () {
                        if (this.removed) return this;
                        var e = C(this.node);
                        e.parentNode.appendChild(e);
                        var n = this.paper;
                        return n.top != this && t._tofront(this, n), this
                    }, S.toBack = function () {
                        if (this.removed) return this;
                        var e = C(this.node), n = e.parentNode;
                        return n.insertBefore(e, n.firstChild), t._toback(this, this.paper), this.paper, this
                    }, S.insertAfter = function (e) {
                        if (this.removed || !e) return this;
                        var n = C(this.node), r = C(e.node || e[e.length - 1].node);
                        return r.nextSibling ? r.parentNode.insertBefore(n, r.nextSibling) : r.parentNode.appendChild(n), t._insertafter(this, e, this.paper), this
                    }, S.insertBefore = function (e) {
                        if (this.removed || !e) return this;
                        var n = C(this.node), r = C(e.node || e[0].node);
                        return r.parentNode.insertBefore(n, r), t._insertbefore(this, e, this.paper), this
                    }, S.blur = function (e) {
                        var n = this;
                        if (0 != +e) {
                            var r = g("filter"), i = g("feGaussianBlur");
                            n.attrs.blur = e, r.id = t.createUUID(), g(i, {stdDeviation: +e || 1.5}), r.appendChild(i), n.paper.defs.appendChild(r), n._blur = r, g(n.node, {filter: "url(#" + r.id + ")"})
                        } else n._blur && (n._blur.parentNode.removeChild(n._blur), delete n._blur, delete n.attrs.blur), n.node.removeAttribute("filter");
                        return n
                    }, t._engine.circle = function (t, e, n, r) {
                        var i = g("circle");
                        t.canvas && t.canvas.appendChild(i);
                        var o = new B(i, t);
                        return o.attrs = {
                            cx: e,
                            cy: n,
                            r: r,
                            fill: "none",
                            stroke: "#000"
                        }, o.type = "circle", g(i, o.attrs), o
                    }, t._engine.rect = function (t, e, n, r, i, o) {
                        var a = g("rect");
                        t.canvas && t.canvas.appendChild(a);
                        var s = new B(a, t);
                        return s.attrs = {
                            x: e,
                            y: n,
                            width: r,
                            height: i,
                            rx: o || 0,
                            ry: o || 0,
                            fill: "none",
                            stroke: "#000"
                        }, s.type = "rect", g(a, s.attrs), s
                    }, t._engine.ellipse = function (t, e, n, r, i) {
                        var o = g("ellipse");
                        t.canvas && t.canvas.appendChild(o);
                        var a = new B(o, t);
                        return a.attrs = {
                            cx: e,
                            cy: n,
                            rx: r,
                            ry: i,
                            fill: "none",
                            stroke: "#000"
                        }, a.type = "ellipse", g(o, a.attrs), a
                    }, t._engine.image = function (t, e, n, r, i, o) {
                        var a = g("image");
                        g(a, {
                            x: n,
                            y: r,
                            width: i,
                            height: o,
                            preserveAspectRatio: "none"
                        }), a.setAttributeNS(d, "href", e), t.canvas && t.canvas.appendChild(a);
                        var s = new B(a, t);
                        return s.attrs = {x: n, y: r, width: i, height: o, src: e}, s.type = "image", s
                    }, t._engine.text = function (e, n, r, i) {
                        var o = g("text");
                        e.canvas && e.canvas.appendChild(o);
                        var a = new B(o, e);
                        return a.attrs = {
                            x: n,
                            y: r,
                            "text-anchor": "middle",
                            text: i,
                            "font-family": t._availableAttrs["font-family"],
                            "font-size": t._availableAttrs["font-size"],
                            stroke: "none",
                            fill: "#000"
                        }, a.type = "text", E(a, a.attrs), a
                    }, t._engine.setSize = function (t, e) {
                        return this.width = t || this.width, this.height = e || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this
                    }, t._engine.create = function () {
                        var e = t._getContainer.apply(0, arguments), n = e && e.container, r = e.x, i = e.y,
                            o = e.width, a = e.height;
                        if (!n) throw new Error("SVG container not found.");
                        var s, c = g("svg"), f = "overflow:hidden;";
                        return r = r || 0, i = i || 0, o = o || 512, g(c, {
                            height: a = a || 342,
                            version: 1.1,
                            width: o,
                            xmlns: "http://www.w3.org/2000/svg",
                            "xmlns:xlink": "http://www.w3.org/1999/xlink"
                        }), 1 == n ? (c.style.cssText = f + "position:absolute;left:" + r + "px;top:" + i + "px", t._g.doc.body.appendChild(c), s = 1) : (c.style.cssText = f + "position:relative", n.firstChild ? n.insertBefore(c, n.firstChild) : n.appendChild(c)), (n = new t._Paper).width = o, n.height = a, n.canvas = c, n.clear(), n._left = n._top = 0, s && (n.renderfix = function () {
                        }), n.renderfix(), n
                    }, t._engine.setViewBox = function (t, e, n, r, i) {
                        u("raphael.setViewBox", this, this._viewBox, [t, e, n, r, i]);
                        var o, s, c = this.getSize(), f = a(n / c.width, r / c.height), l = this.top,
                            d = i ? "xMidYMid meet" : "xMinYMin";
                        for (null == t ? (this._vbSize && (f = 1), delete this._vbSize, o = "0 0 " + this.width + h + this.height) : (this._vbSize = f, o = t + h + e + h + n + h + r), g(this.canvas, {
                            viewBox: o,
                            preserveAspectRatio: d
                        }); f && l;) s = "stroke-width" in l.attrs ? l.attrs["stroke-width"] : 1, l.attr({"stroke-width": s}), l._.dirty = 1, l._.dirtyT = 1, l = l.prev;
                        return this._viewBox = [t, e, n, r, !!i], this
                    }, t.prototype.renderfix = function () {
                        var t, e = this.canvas, n = e.style;
                        try {
                            t = e.getScreenCTM() || e.createSVGMatrix()
                        } catch (n) {
                            t = e.createSVGMatrix()
                        }
                        var r = -t.e % 1, i = -t.f % 1;
                        (r || i) && (r && (this._left = (this._left + r) % 1, n.left = this._left + "px"), i && (this._top = (this._top + i) % 1, n.top = this._top + "px"))
                    }, t.prototype.clear = function () {
                        t.eve("raphael.clear", this);
                        for (var e = this.canvas; e.firstChild;) e.removeChild(e.firstChild);
                        this.bottom = this.top = null, (this.desc = g("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël " + t.version)), e.appendChild(this.desc), e.appendChild(this.defs = g("defs"))
                    }, t.prototype.remove = function () {
                        for (var e in u("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this) this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null
                    };
                    var k = t.st;
                    for (var I in S) S[e](I) && !k[e](I) && (k[I] = function (t) {
                        return function () {
                            var e = arguments;
                            return this.forEach(function (n) {
                                n[t].apply(n, e)
                            })
                        }
                    }(I))
                }
            }.apply(e, r)) || (t.exports = i)
        }, function (t, e, n) {
            var r, i;
            r = [n(1)], void 0 === (i = function (t) {
                if (!t || t.vml) {
                    var e = "hasOwnProperty", n = String, r = parseFloat, i = Math, o = i.round, a = i.max, s = i.min,
                        c = i.abs, f = "fill", u = /[, ]+/, l = t.eve, h = " ", d = "",
                        p = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"},
                        b = /([clmz]),?([^clmz]*)/gi, g = / progid:\S+Blur\([^\)]+\)/g, y = /-?[^,\s-]+/g,
                        m = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)", v = 21600,
                        A = {path: 1, rect: 1, image: 1}, w = {circle: 1, ellipse: 1}, _ = function (e) {
                            var r = /[ahqstv]/gi, i = t._pathToAbsolute;
                            if (n(e).match(r) && (i = t._path2curve), r = /[clmz]/g, i == t._pathToAbsolute && !n(e).match(r)) {
                                var a = n(e).replace(b, function (t, e, n) {
                                    var r = [], i = "m" == e.toLowerCase(), a = p[e];
                                    return n.replace(y, function (t) {
                                        i && 2 == r.length && (a += r + p["m" == e ? "l" : "L"], r = []), r.push(o(t * v))
                                    }), a + r
                                });
                                return a
                            }
                            var s, c, f = i(e);
                            a = [];
                            for (var u = 0, l = f.length; u < l; u++) {
                                s = f[u], "z" == (c = f[u][0].toLowerCase()) && (c = "x");
                                for (var g = 1, m = s.length; g < m; g++) c += o(s[g] * v) + (g != m - 1 ? "," : d);
                                a.push(c)
                            }
                            return a.join(h)
                        }, E = function (e, n, r) {
                            var i = t.matrix();
                            return i.rotate(-e, .5, .5), {dx: i.x(n, r), dy: i.y(n, r)}
                        }, x = function (t, e, n, r, i, o) {
                            var a = t._, s = t.matrix, u = a.fillpos, l = t.node, d = l.style, p = 1, b = "", g = v / e,
                                y = v / n;
                            if (d.visibility = "hidden", e && n) {
                                if (l.coordsize = c(g) + h + c(y), d.rotation = o * (e * n < 0 ? -1 : 1), o) {
                                    var m = E(o, r, i);
                                    r = m.dx, i = m.dy
                                }
                                if (e < 0 && (b += "x"), n < 0 && (b += " y") && (p = -1), d.flip = b, l.coordorigin = r * -g + h + i * -y, u || a.fillsize) {
                                    var A = l.getElementsByTagName(f);
                                    A = A && A[0], l.removeChild(A), u && (m = E(o, s.x(u[0], u[1]), s.y(u[0], u[1])), A.position = m.dx * p + h + m.dy * p), a.fillsize && (A.size = a.fillsize[0] * c(e) + h + a.fillsize[1] * c(n)), l.appendChild(A)
                                }
                                d.visibility = "visible"
                            }
                        };
                    t.toString = function () {
                        return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
                    };
                    var C, B = function (t, e, r) {
                        for (var i = n(e).toLowerCase().split("-"), o = r ? "end" : "start", a = i.length, s = "classic", c = "medium", f = "medium"; a--;) switch (i[a]) {
                            case"block":
                            case"classic":
                            case"oval":
                            case"diamond":
                            case"open":
                            case"none":
                                s = i[a];
                                break;
                            case"wide":
                            case"narrow":
                                f = i[a];
                                break;
                            case"long":
                            case"short":
                                c = i[a]
                        }
                        var u = t.node.getElementsByTagName("stroke")[0];
                        u[o + "arrow"] = s, u[o + "arrowlength"] = c, u[o + "arrowwidth"] = f
                    }, S = function (i, c) {
                        i.attrs = i.attrs || {};
                        var l = i.node, p = i.attrs, b = l.style,
                            g = A[i.type] && (c.x != p.x || c.y != p.y || c.width != p.width || c.height != p.height || c.cx != p.cx || c.cy != p.cy || c.rx != p.rx || c.ry != p.ry || c.r != p.r),
                            y = w[i.type] && (p.cx != c.cx || p.cy != c.cy || p.r != c.r || p.rx != c.rx || p.ry != c.ry),
                            m = i;
                        for (var E in c) c[e](E) && (p[E] = c[E]);
                        if (g && (p.path = t._getPath[i.type](i), i._.dirty = 1), c.href && (l.href = c.href), c.title && (l.title = c.title), c.target && (l.target = c.target), c.cursor && (b.cursor = c.cursor), "blur" in c && i.blur(c.blur), (c.path && "path" == i.type || g) && (l.path = _(~n(p.path).toLowerCase().indexOf("r") ? t._pathToAbsolute(p.path) : p.path), i._.dirty = 1, "image" == i.type && (i._.fillpos = [p.x, p.y], i._.fillsize = [p.width, p.height], x(i, 1, 1, 0, 0, 0))), "transform" in c && i.transform(c.transform), y) {
                            var S = +p.cx, I = +p.cy, M = +p.rx || +p.r || 0, T = +p.ry || +p.r || 0;
                            l.path = t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", o((S - M) * v), o((I - T) * v), o((S + M) * v), o((I + T) * v), o(S * v)), i._.dirty = 1
                        }
                        if ("clip-rect" in c) {
                            var R = n(c["clip-rect"]).split(u);
                            if (4 == R.length) {
                                R[2] = +R[2] + +R[0], R[3] = +R[3] + +R[1];
                                var D = l.clipRect || t._g.doc.createElement("div"), O = D.style;
                                O.clip = t.format("rect({1}px {2}px {3}px {0}px)", R), l.clipRect || (O.position = "absolute", O.top = 0, O.left = 0, O.width = i.paper.width + "px", O.height = i.paper.height + "px", l.parentNode.insertBefore(D, l), D.appendChild(l), l.clipRect = D)
                            }
                            c["clip-rect"] || l.clipRect && (l.clipRect.style.clip = "auto")
                        }
                        if (i.textpath) {
                            var P = i.textpath.style;
                            c.font && (P.font = c.font), c["font-family"] && (P.fontFamily = '"' + c["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, d) + '"'), c["font-size"] && (P.fontSize = c["font-size"]), c["font-weight"] && (P.fontWeight = c["font-weight"]), c["font-style"] && (P.fontStyle = c["font-style"])
                        }
                        if ("arrow-start" in c && B(m, c["arrow-start"]), "arrow-end" in c && B(m, c["arrow-end"], 1), null != c.opacity || null != c.fill || null != c.src || null != c.stroke || null != c["stroke-width"] || null != c["stroke-opacity"] || null != c["fill-opacity"] || null != c["stroke-dasharray"] || null != c["stroke-miterlimit"] || null != c["stroke-linejoin"] || null != c["stroke-linecap"]) {
                            var N = l.getElementsByTagName(f);
                            if (!(N = N && N[0]) && (N = C(f)), "image" == i.type && c.src && (N.src = c.src), c.fill && (N.on = !0), null != N.on && "none" != c.fill && null !== c.fill || (N.on = !1), N.on && c.fill) {
                                var j = n(c.fill).match(t._ISURL);
                                if (j) {
                                    N.parentNode == l && l.removeChild(N), N.rotate = !0, N.src = j[1], N.type = "tile";
                                    var L = i.getBBox(1);
                                    N.position = L.x + h + L.y, i._.fillpos = [L.x, L.y], t._preload(j[1], function () {
                                        i._.fillsize = [this.offsetWidth, this.offsetHeight]
                                    })
                                } else N.color = t.getRGB(c.fill).hex, N.src = d, N.type = "solid", t.getRGB(c.fill).error && (m.type in {
                                    circle: 1,
                                    ellipse: 1
                                } || "r" != n(c.fill).charAt()) && k(m, c.fill, N) && (p.fill = "none", p.gradient = c.fill, N.rotate = !1)
                            }
                            if ("fill-opacity" in c || "opacity" in c) {
                                var Q = ((+p["fill-opacity"] + 1 || 2) - 1) * ((+p.opacity + 1 || 2) - 1) * ((+t.getRGB(c.fill).o + 1 || 2) - 1);
                                Q = s(a(Q, 0), 1), N.opacity = Q, N.src && (N.color = "none")
                            }
                            l.appendChild(N);
                            var U = l.getElementsByTagName("stroke") && l.getElementsByTagName("stroke")[0], F = !1;
                            !U && (F = U = C("stroke")), (c.stroke && "none" != c.stroke || c["stroke-width"] || null != c["stroke-opacity"] || c["stroke-dasharray"] || c["stroke-miterlimit"] || c["stroke-linejoin"] || c["stroke-linecap"]) && (U.on = !0), ("none" == c.stroke || null === c.stroke || null == U.on || 0 == c.stroke || 0 == c["stroke-width"]) && (U.on = !1);
                            var Y = t.getRGB(c.stroke);
                            U.on && c.stroke && (U.color = Y.hex), Q = ((+p["stroke-opacity"] + 1 || 2) - 1) * ((+p.opacity + 1 || 2) - 1) * ((+Y.o + 1 || 2) - 1);
                            var H = .75 * (r(c["stroke-width"]) || 1);
                            if (Q = s(a(Q, 0), 1), null == c["stroke-width"] && (H = p["stroke-width"]), c["stroke-width"] && (U.weight = H), H && H < 1 && (Q *= H) && (U.weight = 1), U.opacity = Q, c["stroke-linejoin"] && (U.joinstyle = c["stroke-linejoin"] || "miter"), U.miterlimit = c["stroke-miterlimit"] || 8, c["stroke-linecap"] && (U.endcap = "butt" == c["stroke-linecap"] ? "flat" : "square" == c["stroke-linecap"] ? "square" : "round"), "stroke-dasharray" in c) {
                                var z = {
                                    "-": "shortdash",
                                    ".": "shortdot",
                                    "-.": "shortdashdot",
                                    "-..": "shortdashdotdot",
                                    ". ": "dot",
                                    "- ": "dash",
                                    "--": "longdash",
                                    "- .": "dashdot",
                                    "--.": "longdashdot",
                                    "--..": "longdashdotdot"
                                };
                                U.dashstyle = z[e](c["stroke-dasharray"]) ? z[c["stroke-dasharray"]] : d
                            }
                            F && l.appendChild(U)
                        }
                        if ("text" == m.type) {
                            m.paper.canvas.style.display = d;
                            var V = m.paper.span, $ = p.font && p.font.match(/\d+(?:\.\d*)?(?=px)/);
                            b = V.style, p.font && (b.font = p.font), p["font-family"] && (b.fontFamily = p["font-family"]), p["font-weight"] && (b.fontWeight = p["font-weight"]), p["font-style"] && (b.fontStyle = p["font-style"]), $ = r(p["font-size"] || $ && $[0]) || 10, b.fontSize = 100 * $ + "px", m.textpath.string && (V.innerHTML = n(m.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                            var G = V.getBoundingClientRect();
                            m.W = p.w = (G.right - G.left) / 100, m.H = p.h = (G.bottom - G.top) / 100, m.X = p.x, m.Y = p.y + m.H / 2, ("x" in c || "y" in c) && (m.path.v = t.format("m{0},{1}l{2},{1}", o(p.x * v), o(p.y * v), o(p.x * v) + 1));
                            for (var J = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], q = 0, W = J.length; q < W; q++) if (J[q] in c) {
                                m._.dirty = 1;
                                break
                            }
                            switch (p["text-anchor"]) {
                                case"start":
                                    m.textpath.style["v-text-align"] = "left", m.bbx = m.W / 2;
                                    break;
                                case"end":
                                    m.textpath.style["v-text-align"] = "right", m.bbx = -m.W / 2;
                                    break;
                                default:
                                    m.textpath.style["v-text-align"] = "center", m.bbx = 0
                            }
                            m.textpath.style["v-text-kern"] = !0
                        }
                    }, k = function (e, o, a) {
                        e.attrs = e.attrs || {}, e.attrs;
                        var s = Math.pow, c = "linear", f = ".5 .5";
                        if (e.attrs.gradient = o, o = (o = n(o).replace(t._radial_gradient, function (t, e, n) {
                            return c = "radial", e && n && (e = r(e), n = r(n), s(e - .5, 2) + s(n - .5, 2) > .25 && (n = i.sqrt(.25 - s(e - .5, 2)) * (2 * (n > .5) - 1) + .5), f = e + h + n), d
                        })).split(/\s*\-\s*/), "linear" == c) {
                            var u = o.shift();
                            if (u = -r(u), isNaN(u)) return null
                        }
                        var l = t._parseDots(o);
                        if (!l) return null;
                        if (e = e.shape || e.node, l.length) {
                            e.removeChild(a), a.on = !0, a.method = "none", a.color = l[0].color, a.color2 = l[l.length - 1].color;
                            for (var p = [], b = 0, g = l.length; b < g; b++) l[b].offset && p.push(l[b].offset + h + l[b].color);
                            a.colors = p.length ? p.join() : "0% " + a.color, "radial" == c ? (a.type = "gradientTitle", a.focus = "100%", a.focussize = "0 0", a.focusposition = f, a.angle = 0) : (a.type = "gradient", a.angle = (270 - u) % 360), e.appendChild(a)
                        }
                        return 1
                    }, I = function (e, n) {
                        this[0] = this.node = e, e.raphael = !0, this.id = t._oid++, e.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = n, this.matrix = t.matrix(), this._ = {
                            transform: [],
                            sx: 1,
                            sy: 1,
                            dx: 0,
                            dy: 0,
                            deg: 0,
                            dirty: 1,
                            dirtyT: 1
                        }, !n.bottom && (n.bottom = this), this.prev = n.top, n.top && (n.top.next = this), n.top = this, this.next = null
                    }, M = t.el;
                    I.prototype = M, M.constructor = I, M.transform = function (e) {
                        if (null == e) return this._.transform;
                        var r, i = this.paper._viewBoxShift,
                            o = i ? "s" + [i.scale, i.scale] + "-1-1t" + [i.dx, i.dy] : d;
                        i && (r = e = n(e).replace(/\.{3}|\u2026/g, this._.transform || d)), t._extractTransform(this, o + e);
                        var a, s = this.matrix.clone(), c = this.skew, f = this.node,
                            u = ~n(this.attrs.fill).indexOf("-"), l = !n(this.attrs.fill).indexOf("url(");
                        if (s.translate(1, 1), l || u || "image" == this.type) if (c.matrix = "1 0 0 1", c.offset = "0 0", a = s.split(), u && a.noRotation || !a.isSimple) {
                            f.style.filter = s.toFilter();
                            var p = this.getBBox(), b = this.getBBox(1), g = p.x - b.x, y = p.y - b.y;
                            f.coordorigin = g * -v + h + y * -v, x(this, 1, 1, g, y, 0)
                        } else f.style.filter = d, x(this, a.scalex, a.scaley, a.dx, a.dy, a.rotate); else f.style.filter = d, c.matrix = n(s), c.offset = s.offset();
                        return null !== r && (this._.transform = r, t._extractTransform(this, r)), this
                    }, M.rotate = function (t, e, i) {
                        if (this.removed) return this;
                        if (null != t) {
                            if ((t = n(t).split(u)).length - 1 && (e = r(t[1]), i = r(t[2])), t = r(t[0]), null == i && (e = i), null == e || null == i) {
                                var o = this.getBBox(1);
                                e = o.x + o.width / 2, i = o.y + o.height / 2
                            }
                            return this._.dirtyT = 1, this.transform(this._.transform.concat([["r", t, e, i]])), this
                        }
                    }, M.translate = function (t, e) {
                        return this.removed ? this : ((t = n(t).split(u)).length - 1 && (e = r(t[1])), t = r(t[0]) || 0, e = +e || 0, this._.bbox && (this._.bbox.x += t, this._.bbox.y += e), this.transform(this._.transform.concat([["t", t, e]])), this)
                    }, M.scale = function (t, e, i, o) {
                        if (this.removed) return this;
                        if ((t = n(t).split(u)).length - 1 && (e = r(t[1]), i = r(t[2]), o = r(t[3]), isNaN(i) && (i = null), isNaN(o) && (o = null)), t = r(t[0]), null == e && (e = t), null == o && (i = o), null == i || null == o) var a = this.getBBox(1);
                        return i = null == i ? a.x + a.width / 2 : i, o = null == o ? a.y + a.height / 2 : o, this.transform(this._.transform.concat([["s", t, e, i, o]])), this._.dirtyT = 1, this
                    }, M.hide = function () {
                        return !this.removed && (this.node.style.display = "none"), this
                    }, M.show = function () {
                        return !this.removed && (this.node.style.display = d), this
                    }, M.auxGetBBox = t.el.getBBox, M.getBBox = function () {
                        var t = this.auxGetBBox();
                        if (this.paper && this.paper._viewBoxShift) {
                            var e = {}, n = 1 / this.paper._viewBoxShift.scale;
                            return e.x = t.x - this.paper._viewBoxShift.dx, e.x *= n, e.y = t.y - this.paper._viewBoxShift.dy, e.y *= n, e.width = t.width * n, e.height = t.height * n, e.x2 = e.x + e.width, e.y2 = e.y + e.height, e
                        }
                        return t
                    }, M._getBBox = function () {
                        return this.removed ? {} : {
                            x: this.X + (this.bbx || 0) - this.W / 2,
                            y: this.Y - this.H,
                            width: this.W,
                            height: this.H
                        }
                    }, M.remove = function () {
                        if (!this.removed && this.node.parentNode) {
                            for (var e in this.paper.__set__ && this.paper.__set__.exclude(this), t.eve.unbind("raphael.*.*." + this.id), t._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape), this) this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;
                            this.removed = !0
                        }
                    }, M.attr = function (n, r) {
                        if (this.removed) return this;
                        if (null == n) {
                            var i = {};
                            for (var o in this.attrs) this.attrs[e](o) && (i[o] = this.attrs[o]);
                            return i.gradient && "none" == i.fill && (i.fill = i.gradient) && delete i.gradient, i.transform = this._.transform, i
                        }
                        if (null == r && t.is(n, "string")) {
                            if (n == f && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                            for (var a = n.split(u), s = {}, c = 0, h = a.length; c < h; c++) (n = a[c]) in this.attrs ? s[n] = this.attrs[n] : t.is(this.paper.customAttributes[n], "function") ? s[n] = this.paper.customAttributes[n].def : s[n] = t._availableAttrs[n];
                            return h - 1 ? s : s[a[0]]
                        }
                        if (this.attrs && null == r && t.is(n, "array")) {
                            for (s = {}, c = 0, h = n.length; c < h; c++) s[n[c]] = this.attr(n[c]);
                            return s
                        }
                        var d;
                        for (var p in null != r && ((d = {})[n] = r), null == r && t.is(n, "object") && (d = n), d) l("raphael.attr." + p + "." + this.id, this, d[p]);
                        if (d) {
                            for (p in this.paper.customAttributes) if (this.paper.customAttributes[e](p) && d[e](p) && t.is(this.paper.customAttributes[p], "function")) {
                                var b = this.paper.customAttributes[p].apply(this, [].concat(d[p]));
                                for (var g in this.attrs[p] = d[p], b) b[e](g) && (d[g] = b[g])
                            }
                            d.text && "text" == this.type && (this.textpath.string = d.text), S(this, d)
                        }
                        return this
                    }, M.toFront = function () {
                        return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && t._tofront(this, this.paper), this
                    }, M.toBack = function () {
                        return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), t._toback(this, this.paper)), this)
                    }, M.insertAfter = function (e) {
                        return this.removed ? this : (e.constructor == t.st.constructor && (e = e[e.length - 1]), e.node.nextSibling ? e.node.parentNode.insertBefore(this.node, e.node.nextSibling) : e.node.parentNode.appendChild(this.node), t._insertafter(this, e, this.paper), this)
                    }, M.insertBefore = function (e) {
                        return this.removed ? this : (e.constructor == t.st.constructor && (e = e[0]), e.node.parentNode.insertBefore(this.node, e.node), t._insertbefore(this, e, this.paper), this)
                    }, M.blur = function (e) {
                        var n = this.node.runtimeStyle, r = n.filter;
                        return r = r.replace(g, d), 0 != +e ? (this.attrs.blur = e, n.filter = r + h + " progid:DXImageTransform.Microsoft.Blur(pixelradius=" + (+e || 1.5) + ")", n.margin = t.format("-{0}px 0 0 -{0}px", o(+e || 1.5))) : (n.filter = r, n.margin = 0, delete this.attrs.blur), this
                    }, t._engine.path = function (t, e) {
                        var n = C("shape");
                        n.style.cssText = m, n.coordsize = v + h + v, n.coordorigin = e.coordorigin;
                        var r = new I(n, e), i = {fill: "none", stroke: "#000"};
                        t && (i.path = t), r.type = "path", r.path = [], r.Path = d, S(r, i), e.canvas && e.canvas.appendChild(n);
                        var o = C("skew");
                        return o.on = !0, n.appendChild(o), r.skew = o, r.transform(d), r
                    }, t._engine.rect = function (e, n, r, i, o, a) {
                        var s = t._rectPath(n, r, i, o, a), c = e.path(s), f = c.attrs;
                        return c.X = f.x = n, c.Y = f.y = r, c.W = f.width = i, c.H = f.height = o, f.r = a, f.path = s, c.type = "rect", c
                    }, t._engine.ellipse = function (t, e, n, r, i) {
                        var o = t.path();
                        return o.attrs, o.X = e - r, o.Y = n - i, o.W = 2 * r, o.H = 2 * i, o.type = "ellipse", S(o, {
                            cx: e,
                            cy: n,
                            rx: r,
                            ry: i
                        }), o
                    }, t._engine.circle = function (t, e, n, r) {
                        var i = t.path();
                        return i.attrs, i.X = e - r, i.Y = n - r, i.W = i.H = 2 * r, i.type = "circle", S(i, {
                            cx: e,
                            cy: n,
                            r: r
                        }), i
                    }, t._engine.image = function (e, n, r, i, o, a) {
                        var s = t._rectPath(r, i, o, a), c = e.path(s).attr({stroke: "none"}), u = c.attrs, l = c.node,
                            h = l.getElementsByTagName(f)[0];
                        return u.src = n, c.X = u.x = r, c.Y = u.y = i, c.W = u.width = o, c.H = u.height = a, u.path = s, c.type = "image", h.parentNode == l && l.removeChild(h), h.rotate = !0, h.src = n, h.type = "tile", c._.fillpos = [r, i], c._.fillsize = [o, a], l.appendChild(h), x(c, 1, 1, 0, 0, 0), c
                    }, t._engine.text = function (e, r, i, a) {
                        var s = C("shape"), c = C("path"), f = C("textpath");
                        r = r || 0, i = i || 0, a = a || "", c.v = t.format("m{0},{1}l{2},{1}", o(r * v), o(i * v), o(r * v) + 1), c.textpathok = !0, f.string = n(a), f.on = !0, s.style.cssText = m, s.coordsize = v + h + v, s.coordorigin = "0 0";
                        var u = new I(s, e), l = {fill: "#000", stroke: "none", font: t._availableAttrs.font, text: a};
                        u.shape = s, u.path = c, u.textpath = f, u.type = "text", u.attrs.text = n(a), u.attrs.x = r, u.attrs.y = i, u.attrs.w = 1, u.attrs.h = 1, S(u, l), s.appendChild(f), s.appendChild(c), e.canvas.appendChild(s);
                        var p = C("skew");
                        return p.on = !0, s.appendChild(p), u.skew = p, u.transform(d), u
                    }, t._engine.setSize = function (e, n) {
                        var r = this.canvas.style;
                        return this.width = e, this.height = n, e == +e && (e += "px"), n == +n && (n += "px"), r.width = e, r.height = n, r.clip = "rect(0 " + e + " " + n + " 0)", this._viewBox && t._engine.setViewBox.apply(this, this._viewBox), this
                    }, t._engine.setViewBox = function (e, n, r, i, o) {
                        t.eve("raphael.setViewBox", this, this._viewBox, [e, n, r, i, o]);
                        var a, s, c = this.getSize(), f = c.width, u = c.height;
                        return o && (s = f / r, r * (a = u / i) < f && (e -= (f - r * a) / 2 / a), i * s < u && (n -= (u - i * s) / 2 / s)), this._viewBox = [e, n, r, i, !!o], this._viewBoxShift = {
                            dx: -e,
                            dy: -n,
                            scale: c
                        }, this.forEach(function (t) {
                            t.transform("...")
                        }), this
                    }, t._engine.initWin = function (t) {
                        var e = t.document;
                        e.styleSheets.length < 31 ? e.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)") : e.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");
                        try {
                            !e.namespaces.rvml && e.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), C = function (t) {
                                return e.createElement("<rvml:" + t + ' class="rvml">')
                            }
                        } catch (t) {
                            C = function (t) {
                                return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                            }
                        }
                    }, t._engine.initWin(t._g.win), t._engine.create = function () {
                        var e = t._getContainer.apply(0, arguments), n = e.container, r = e.height, i = e.width,
                            o = e.x, a = e.y;
                        if (!n) throw new Error("VML container not found.");
                        var s = new t._Paper, c = s.canvas = t._g.doc.createElement("div"), f = c.style;
                        return o = o || 0, a = a || 0, i = i || 512, r = r || 342, s.width = i, s.height = r, i == +i && (i += "px"), r == +r && (r += "px"), s.coordsize = 216e5 + h + 216e5, s.coordorigin = "0 0", s.span = t._g.doc.createElement("span"), s.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", c.appendChild(s.span), f.cssText = t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", i, r), 1 == n ? (t._g.doc.body.appendChild(c), f.left = o + "px", f.top = a + "px", f.position = "absolute") : n.firstChild ? n.insertBefore(c, n.firstChild) : n.appendChild(c), s.renderfix = function () {
                        }, s
                    }, t.prototype.clear = function () {
                        t.eve("raphael.clear", this), this.canvas.innerHTML = d, this.span = t._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null
                    }, t.prototype.remove = function () {
                        for (var e in t.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas), this) this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;
                        return !0
                    };
                    var T = t.st;
                    for (var R in M) M[e](R) && !T[e](R) && (T[R] = function (t) {
                        return function () {
                            var e = arguments;
                            return this.forEach(function (n) {
                                n[t].apply(n, e)
                            })
                        }
                    }(R))
                }
            }.apply(e, r)) || (t.exports = i)
        }])
    }, t.exports = r()
}