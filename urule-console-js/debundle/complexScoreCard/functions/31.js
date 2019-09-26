var func31 = function (t, e, n) {
    var r = n(1).Buffer;

    function i(t) {
        r.isBuffer(t) || (t = r.from(t));
        for (var e = t.length / 4 | 0, n = new Array(e), i = 0; i < e; i++) n[i] = t.readUInt32BE(4 * i);
        return n
    }

    function o(t) {
        for (; 0 < t.length; t++) t[0] = 0
    }

    function a(t, e, n, r, i) {
        for (var o, a, s, c, f = n[0], u = n[1], l = n[2], h = n[3], d = t[0] ^ e[0], p = t[1] ^ e[1], b = t[2] ^ e[2], g = t[3] ^ e[3], y = 4, m = 1; m < i; m++) o = f[d >>> 24] ^ u[p >>> 16 & 255] ^ l[b >>> 8 & 255] ^ h[255 & g] ^ e[y++], a = f[p >>> 24] ^ u[b >>> 16 & 255] ^ l[g >>> 8 & 255] ^ h[255 & d] ^ e[y++], s = f[b >>> 24] ^ u[g >>> 16 & 255] ^ l[d >>> 8 & 255] ^ h[255 & p] ^ e[y++], c = f[g >>> 24] ^ u[d >>> 16 & 255] ^ l[p >>> 8 & 255] ^ h[255 & b] ^ e[y++], d = o, p = a, b = s, g = c;
        return o = (r[d >>> 24] << 24 | r[p >>> 16 & 255] << 16 | r[b >>> 8 & 255] << 8 | r[255 & g]) ^ e[y++], a = (r[p >>> 24] << 24 | r[b >>> 16 & 255] << 16 | r[g >>> 8 & 255] << 8 | r[255 & d]) ^ e[y++], s = (r[b >>> 24] << 24 | r[g >>> 16 & 255] << 16 | r[d >>> 8 & 255] << 8 | r[255 & p]) ^ e[y++], c = (r[g >>> 24] << 24 | r[d >>> 16 & 255] << 16 | r[p >>> 8 & 255] << 8 | r[255 & b]) ^ e[y++], [o >>>= 0, a >>>= 0, s >>>= 0, c >>>= 0]
    }

    var s = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], c = function () {
        for (var t = new Array(256), e = 0; e < 256; e++) t[e] = e < 128 ? e << 1 : e << 1 ^ 283;
        for (var n = [], r = [], i = [[], [], [], []], o = [[], [], [], []], a = 0, s = 0, c = 0; c < 256; ++c) {
            var f = s ^ s << 1 ^ s << 2 ^ s << 3 ^ s << 4;
            f = f >>> 8 ^ 255 & f ^ 99, n[a] = f, r[f] = a;
            var u = t[a], l = t[u], h = t[l], d = 257 * t[f] ^ 16843008 * f;
            i[0][a] = d << 24 | d >>> 8, i[1][a] = d << 16 | d >>> 16, i[2][a] = d << 8 | d >>> 24, i[3][a] = d, d = 16843009 * h ^ 65537 * l ^ 257 * u ^ 16843008 * a, o[0][f] = d << 24 | d >>> 8, o[1][f] = d << 16 | d >>> 16, o[2][f] = d << 8 | d >>> 24, o[3][f] = d, 0 === a ? a = s = 1 : (a = u ^ t[t[t[h ^ u]]], s ^= t[t[s]])
        }
        return {SBOX: n, INV_SBOX: r, SUB_MIX: i, INV_SUB_MIX: o}
    }();

    function f(t) {
        this._key = i(t), this._reset()
    }

    f.blockSize = 16, f.keySize = 32, f.prototype.blockSize = f.blockSize, f.prototype.keySize = f.keySize, f.prototype._reset = function () {
        for (var t = this._key, e = t.length, n = e + 6, r = 4 * (n + 1), i = [], o = 0; o < e; o++) i[o] = t[o];
        for (o = e; o < r; o++) {
            var a = i[o - 1];
            o % e == 0 ? (a = a << 8 | a >>> 24, a = c.SBOX[a >>> 24] << 24 | c.SBOX[a >>> 16 & 255] << 16 | c.SBOX[a >>> 8 & 255] << 8 | c.SBOX[255 & a], a ^= s[o / e | 0] << 24) : e > 6 && o % e == 4 && (a = c.SBOX[a >>> 24] << 24 | c.SBOX[a >>> 16 & 255] << 16 | c.SBOX[a >>> 8 & 255] << 8 | c.SBOX[255 & a]), i[o] = i[o - e] ^ a
        }
        for (var f = [], u = 0; u < r; u++) {
            var l = r - u, h = i[l - (u % 4 ? 0 : 4)];
            f[u] = u < 4 || l <= 4 ? h : c.INV_SUB_MIX[0][c.SBOX[h >>> 24]] ^ c.INV_SUB_MIX[1][c.SBOX[h >>> 16 & 255]] ^ c.INV_SUB_MIX[2][c.SBOX[h >>> 8 & 255]] ^ c.INV_SUB_MIX[3][c.SBOX[255 & h]]
        }
        this._nRounds = n, this._keySchedule = i, this._invKeySchedule = f
    }, f.prototype.encryptBlockRaw = function (t) {
        return a(t = i(t), this._keySchedule, c.SUB_MIX, c.SBOX, this._nRounds)
    }, f.prototype.encryptBlock = function (t) {
        var e = this.encryptBlockRaw(t), n = r.allocUnsafe(16);
        return n.writeUInt32BE(e[0], 0), n.writeUInt32BE(e[1], 4), n.writeUInt32BE(e[2], 8), n.writeUInt32BE(e[3], 12), n
    }, f.prototype.decryptBlock = function (t) {
        var e = (t = i(t))[1];
        t[1] = t[3], t[3] = e;
        var n = a(t, this._invKeySchedule, c.INV_SUB_MIX, c.INV_SBOX, this._nRounds), o = r.allocUnsafe(16);
        return o.writeUInt32BE(n[0], 0), o.writeUInt32BE(n[3], 4), o.writeUInt32BE(n[2], 8), o.writeUInt32BE(n[1], 12), o
    }, f.prototype.scrub = function () {
        o(this._keySchedule), o(this._invKeySchedule), o(this._key)
    }, t.exports.AES = f
}