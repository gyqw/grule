var func108 = function (t, e, n) {
    var r = n(21), i = n(0);

    function o(t, e) {
        this.name = t, this.body = e, this.decoders = {}, this.encoders = {}
    }

    e.define = function (t, e) {
        return new o(t, e)
    }, o.prototype._createNamed = function (t) {
        var e;
        try {
            e = n(107).runInThisContext("(function " + this.name + "(entity) {\n  this._initNamed(entity);\n})")
        } catch (t) {
            e = function (t) {
                this._initNamed(t)
            }
        }
        return i(e, t), e.prototype._initNamed = function (e) {
            t.call(this, e)
        }, new e(this)
    }, o.prototype._getDecoder = function (t) {
        return t = t || "der", this.decoders.hasOwnProperty(t) || (this.decoders[t] = this._createNamed(r.decoders[t])), this.decoders[t]
    }, o.prototype.decode = function (t, e, n) {
        return this._getDecoder(e).decode(t, n)
    }, o.prototype._getEncoder = function (t) {
        return t = t || "der", this.encoders.hasOwnProperty(t) || (this.encoders[t] = this._createNamed(r.encoders[t])), this.encoders[t]
    }, o.prototype.encode = function (t, e, n) {
        return this._getEncoder(e).encode(t, n)
    }
}