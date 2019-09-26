var func98 = function (t, e, n) {
    "use strict";
    var r = n(21), i = r.define("Time", function () {
        this.choice({utcTime: this.utctime(), generalTime: this.gentime()})
    }), o = r.define("AttributeTypeValue", function () {
        this.seq().obj(this.key("type").objid(), this.key("value").any())
    }), a = r.define("AlgorithmIdentifier", function () {
        this.seq().obj(this.key("algorithm").objid(), this.key("parameters").optional())
    }), s = r.define("SubjectPublicKeyInfo", function () {
        this.seq().obj(this.key("algorithm").use(a), this.key("subjectPublicKey").bitstr())
    }), c = r.define("RelativeDistinguishedName", function () {
        this.setof(o)
    }), f = r.define("RDNSequence", function () {
        this.seqof(c)
    }), u = r.define("Name", function () {
        this.choice({rdnSequence: this.use(f)})
    }), l = r.define("Validity", function () {
        this.seq().obj(this.key("notBefore").use(i), this.key("notAfter").use(i))
    }), h = r.define("Extension", function () {
        this.seq().obj(this.key("extnID").objid(), this.key("critical").bool().def(!1), this.key("extnValue").octstr())
    }), d = r.define("TBSCertificate", function () {
        this.seq().obj(this.key("version").explicit(0).int(), this.key("serialNumber").int(), this.key("signature").use(a), this.key("issuer").use(u), this.key("validity").use(l), this.key("subject").use(u), this.key("subjectPublicKeyInfo").use(s), this.key("issuerUniqueID").implicit(1).bitstr().optional(), this.key("subjectUniqueID").implicit(2).bitstr().optional(), this.key("extensions").explicit(3).seqof(h).optional())
    }), p = r.define("X509Certificate", function () {
        this.seq().obj(this.key("tbsCertificate").use(d), this.key("signatureAlgorithm").use(a), this.key("signatureValue").bitstr())
    });
    t.exports = p
}