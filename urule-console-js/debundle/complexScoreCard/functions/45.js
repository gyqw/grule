var func45 = function (t, e, n) {
    "use strict";
    (function (e) {
        var r = n(0), i = n(176), o = new Array(16);

        function a() {
            i.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878
        }

        function s(t, e) {
            return t << e | t >>> 32 - e
        }

        function c(t, e, n, r, i, o, a) {
            return s(t + (e & n | ~e & r) + i + o | 0, a) + e | 0
        }

        function f(t, e, n, r, i, o, a) {
            return s(t + (e & r | n & ~r) + i + o | 0, a) + e | 0
        }

        function u(t, e, n, r, i, o, a) {
            return s(t + (e ^ n ^ r) + i + o | 0, a) + e | 0
        }

        function l(t, e, n, r, i, o, a) {
            return s(t + (n ^ (e | ~r)) + i + o | 0, a) + e | 0
        }

        r(a, i), a.prototype._update = function () {
            for (var t = o, e = 0; e < 16; ++e) t[e] = this._block.readInt32LE(4 * e);
            var n = this._a, r = this._b, i = this._c, a = this._d;
            r = l(r = l(r = l(r = l(r = u(r = u(r = u(r = u(r = f(r = f(r = f(r = f(r = c(r = c(r = c(r = c(r, i = c(i, a = c(a, n = c(n, r, i, a, t[0], 3614090360, 7), r, i, t[1], 3905402710, 12), n, r, t[2], 606105819, 17), a, n, t[3], 3250441966, 22), i = c(i, a = c(a, n = c(n, r, i, a, t[4], 4118548399, 7), r, i, t[5], 1200080426, 12), n, r, t[6], 2821735955, 17), a, n, t[7], 4249261313, 22), i = c(i, a = c(a, n = c(n, r, i, a, t[8], 1770035416, 7), r, i, t[9], 2336552879, 12), n, r, t[10], 4294925233, 17), a, n, t[11], 2304563134, 22), i = c(i, a = c(a, n = c(n, r, i, a, t[12], 1804603682, 7), r, i, t[13], 4254626195, 12), n, r, t[14], 2792965006, 17), a, n, t[15], 1236535329, 22), i = f(i, a = f(a, n = f(n, r, i, a, t[1], 4129170786, 5), r, i, t[6], 3225465664, 9), n, r, t[11], 643717713, 14), a, n, t[0], 3921069994, 20), i = f(i, a = f(a, n = f(n, r, i, a, t[5], 3593408605, 5), r, i, t[10], 38016083, 9), n, r, t[15], 3634488961, 14), a, n, t[4], 3889429448, 20), i = f(i, a = f(a, n = f(n, r, i, a, t[9], 568446438, 5), r, i, t[14], 3275163606, 9), n, r, t[3], 4107603335, 14), a, n, t[8], 1163531501, 20), i = f(i, a = f(a, n = f(n, r, i, a, t[13], 2850285829, 5), r, i, t[2], 4243563512, 9), n, r, t[7], 1735328473, 14), a, n, t[12], 2368359562, 20), i = u(i, a = u(a, n = u(n, r, i, a, t[5], 4294588738, 4), r, i, t[8], 2272392833, 11), n, r, t[11], 1839030562, 16), a, n, t[14], 4259657740, 23), i = u(i, a = u(a, n = u(n, r, i, a, t[1], 2763975236, 4), r, i, t[4], 1272893353, 11), n, r, t[7], 4139469664, 16), a, n, t[10], 3200236656, 23), i = u(i, a = u(a, n = u(n, r, i, a, t[13], 681279174, 4), r, i, t[0], 3936430074, 11), n, r, t[3], 3572445317, 16), a, n, t[6], 76029189, 23), i = u(i, a = u(a, n = u(n, r, i, a, t[9], 3654602809, 4), r, i, t[12], 3873151461, 11), n, r, t[15], 530742520, 16), a, n, t[2], 3299628645, 23), i = l(i, a = l(a, n = l(n, r, i, a, t[0], 4096336452, 6), r, i, t[7], 1126891415, 10), n, r, t[14], 2878612391, 15), a, n, t[5], 4237533241, 21), i = l(i, a = l(a, n = l(n, r, i, a, t[12], 1700485571, 6), r, i, t[3], 2399980690, 10), n, r, t[10], 4293915773, 15), a, n, t[1], 2240044497, 21), i = l(i, a = l(a, n = l(n, r, i, a, t[8], 1873313359, 6), r, i, t[15], 4264355552, 10), n, r, t[6], 2734768916, 15), a, n, t[13], 1309151649, 21), i = l(i, a = l(a, n = l(n, r, i, a, t[4], 4149444226, 6), r, i, t[11], 3174756917, 10), n, r, t[2], 718787259, 15), a, n, t[9], 3951481745, 21), this._a = this._a + n | 0, this._b = this._b + r | 0, this._c = this._c + i | 0, this._d = this._d + a | 0
        }, a.prototype._digest = function () {
            this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
            var t = new e(16);
            return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t.writeInt32LE(this._d, 12), t
        }, t.exports = a
    }).call(this, n(2).Buffer)
}