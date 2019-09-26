var func37 = function (t, e, n) {
    var r = {ECB: n(148), CBC: n(147), CFB: n(146), CFB8: n(145), CFB1: n(144), OFB: n(143), CTR: n(68), GCM: n(68)},
        i = n(66);
    for (var o in i) i[o].module = r[i[o].mode];
    t.exports = i
}