var VectorCanvas = function(l, t, e) {
    if (this.mode = window.SVGAngle ? "svg" : "vml", this.params = e, "svg" === this.mode) this.createSvgNode = function(l) {
        return document.createElementNS(this.svgns, l)
    };
    else {
        try {
            document.namespaces.rvml || document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), this.createVmlNode = function(l) {
                return document.createElement("<rvml:" + l + ' class="rvml">')
            }
        } catch (l) {
            this.createVmlNode = function(l) {
                return document.createElement("<" + l + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
        }
        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)")
    }
    "svg" === this.mode ? this.canvas = this.createSvgNode("svg") : (this.canvas = this.createVmlNode("group"), this.canvas.style.position = "absolute"), this.setSize(l, t)
};
VectorCanvas.prototype = {
    svgns: "http://www.w3.org/2000/svg",
    mode: "svg",
    width: 0,
    height: 0,
    canvas: null
};
var ColorScale = function(l, t, e, a) {
    l && this.setColors(l), t && this.setNormalizeFunction(t), e && this.setMin(e), e && this.setMax(a)
};
ColorScale.prototype = {
    colors: []
};
var JQVMap = function(l) {
    l = l || {};
    var t, e = this,
        a = JQVMap.maps[l.map];
    if (!a) throw new Error('Invalid "' + l.map + '" map parameter. Please make sure you have loaded this map file in your HTML.');
    for (var i in this.selectedRegions = [], this.multiSelectRegion = l.multiSelectRegion, this.container = l.container, this.defaultWidth = a.width, this.defaultHeight = a.height, this.color = l.color, this.selectedColor = l.selectedColor, this.hoverColor = l.hoverColor, this.hoverColors = l.hoverColors, this.hoverOpacity = l.hoverOpacity, this.setBackgroundColor(l.backgroundColor), this.width = l.container.width(), this.height = l.container.height(), this.resize(), jQuery(window).resize((function() {
            var a = l.container.width(),
                i = l.container.height();
            if (a && i) {
                e.width = a, e.height = i, e.resize(), e.canvas.setSize(e.width, e.height), e.applyTransform();
                var n = jQuery.Event("resize.jqvmap");
                jQuery(l.container).trigger(n, [a, i]), t && (jQuery(".jqvmap-pin").remove(), e.pinHandlers = !1, e.placePins(t.pins, t.mode))
            }
        })), this.canvas = new VectorCanvas(this.width, this.height, l), l.container.append(this.canvas.canvas), this.makeDraggable(), this.rootGroup = this.canvas.createGroup(!0), this.index = JQVMap.mapIndex, this.label = jQuery("<div/>").addClass("jqvmap-label").appendTo(jQuery("body")).hide(), l.enableZoom && (jQuery("<div/>").addClass("jqvmap-zoomin").text("+").appendTo(l.container), jQuery("<div/>").addClass("jqvmap-zoomout").html("&#x2212;").appendTo(l.container)), e.countries = [], a.paths) {
        var n = this.canvas.createPath({
            path: a.paths[i].path
        });
        n.setFill(this.color), n.id = e.getCountryId(i), e.countries[i] = n, "svg" === this.canvas.mode ? n.setAttribute("class", "jqvmap-region") : jQuery(n).addClass("jqvmap-region"), jQuery(this.rootGroup).append(n)
    }
    if (jQuery(l.container).delegate("svg" === this.canvas.mode ? "path" : "shape", "mouseover mouseout", (function(t) {
            var i = t.target,
                n = t.target.id.split("_").pop(),
                o = jQuery.Event("labelShow.jqvmap"),
                s = jQuery.Event("regionMouseOver.jqvmap");
            n = n.toLowerCase(), "mouseover" === t.type ? (jQuery(l.container).trigger(s, [n, a.paths[n].name]), s.isDefaultPrevented() || e.highlight(n, i), l.showTooltip && (e.label.text(a.paths[n].name), jQuery(l.container).trigger(o, [e.label, n]), o.isDefaultPrevented() || (e.label.show(), e.labelWidth = e.label.width(), e.labelHeight = e.label.height()))) : (e.unhighlight(n, i), e.label.hide(), jQuery(l.container).trigger("regionMouseOut.jqvmap", [n, a.paths[n].name]))
        })), jQuery(l.container).delegate("svg" === this.canvas.mode ? "path" : "shape", "click", (function(t) {
            var i = t.target,
                n = t.target.id.split("_").pop(),
                o = jQuery.Event("regionClick.jqvmap");
            if (n = n.toLowerCase(), jQuery(l.container).trigger(o, [n, a.paths[n].name]), !l.multiSelectRegion && !o.isDefaultPrevented())
                for (var s in a.paths) e.countries[s].currentFillColor = e.countries[s].getOriginalFill(), e.countries[s].setFill(e.countries[s].getOriginalFill());
            o.isDefaultPrevented() || (e.isSelected(n) ? e.deselect(n, i) : e.select(n, i))
        })), l.showTooltip && l.container.mousemove((function(l) {
            if (e.label.is(":visible")) {
                var t = l.pageX - 15 - e.labelWidth,
                    a = l.pageY - 15 - e.labelHeight;
                0 > t && (t = l.pageX + 15), 0 > a && (a = l.pageY + 15), e.label.css({
                    left: t,
                    top: a
                })
            }
        })), this.setColors(l.colors), this.canvas.canvas.appendChild(this.rootGroup), this.applyTransform(), this.colorScale = new ColorScale(l.scaleColors, l.normalizeFunction, l.valueMin, l.valueMax), l.values && (this.values = l.values, this.setValues(l.values)), l.selectedRegions)
        if (l.selectedRegions instanceof Array)
            for (var o in l.selectedRegions) this.select(l.selectedRegions[o].toLowerCase());
        else this.select(l.selectedRegions.toLowerCase());
    if (this.bindZoomButtons(), l.pins && (t = {
            pins: l.pins,
            mode: l.pinMode
        }, this.pinHandlers = !1, this.placePins(l.pins, l.pinMode)), l.showLabels) {
        this.pinHandlers = !1;
        var s = {};
        for (i in e.countries) "function" != typeof e.countries[i] && (l.pins && l.pins[i] || (s[i] = i.toUpperCase()));
        t = {
            pins: s,
            mode: "content"
        }, this.placePins(s, "content")
    }
    JQVMap.mapIndex++
};
JQVMap.prototype = {
        transX: 0,
        transY: 0,
        scale: 1,
        baseTransX: 0,
        baseTransY: 0,
        baseScale: 1,
        width: 0,
        height: 0,
        countries: {},
        countriesColors: {},
        countriesData: {},
        zoomStep: 1.4,
        zoomMaxStep: 4,
        zoomCurStep: 1
    }, JQVMap.xlink = "http://www.w3.org/1999/xlink", JQVMap.mapIndex = 1, JQVMap.maps = {},
    function() {
        var l = {
                colors: 1,
                values: 1,
                backgroundColor: 1,
                scaleColors: 1,
                normalizeFunction: 1,
                enableZoom: 1,
                showTooltip: 1,
                borderColor: 1,
                borderWidth: 1,
                borderOpacity: 1,
                selectedRegions: 1,
                multiSelectRegion: 1
            },
            t = {
                onLabelShow: "labelShow",
                onLoad: "load",
                onRegionOver: "regionMouseOver",
                onRegionOut: "regionMouseOut",
                onRegionClick: "regionClick",
                onRegionSelect: "regionSelect",
                onRegionDeselect: "regionDeselect",
                onResize: "resize"
            };
        jQuery.fn.vectorMap = function(e) {
            var a = {
                    map: "dz_fr",
                    backgroundColor: "#a5bfdd",
                    color: "#f4f3f0",
                    hoverColor: "#c9dfaf",
                    hoverColors: {},
                    selectedColor: "#c9dfaf",
                    scaleColors: ["#b6d6ff", "#005ace"],
                    normalizeFunction: "linear",
                    enableZoom: true,
                    showTooltip: true,
                    borderColor: "#818181",
                    borderWidth: 1,
                    borderOpacity: .25,
                    selectedRegions: null,
                    multiSelectRegion: !1
                },
                i = this.data("mapObject");
            if ("addMap" === e) JQVMap.maps[arguments[1]] = arguments[2];
            else {
                if ("set" !== e || !l[arguments[1]]) {
                    if ("string" == typeof e && "function" == typeof i[e]) return i[e].apply(i, Array.prototype.slice.call(arguments, 1));
                    for (var n in jQuery.extend(a, e), a.container = this, this.css({
                            position: "relative",
                            overflow: "hidden"
                        }), i = new JQVMap(a), this.data("mapObject", i), this.unbind(".jqvmap"), t) a[n] && this.bind(t[n] + ".jqvmap", a[n]);
                    var o = jQuery.Event("load.jqvmap");
                    return jQuery(a.container).trigger(o, i), i
                }
                i["set" + arguments[1].charAt(0).toUpperCase() + arguments[1].substr(1)].apply(i, Array.prototype.slice.call(arguments, 2))
            }
        }
    }(jQuery), ColorScale.arrayToRgb = function(l) {
        for (var t, e = "#", a = 0; a < l.length; a++) e += 1 === (t = l[a].toString(16)).length ? "0" + t : t;
        return e
    }, ColorScale.prototype.getColor = function(l) {
        "function" == typeof this.normalize && (l = this.normalize(l));
        for (var t, e = [], a = 0, i = 0; i < this.colors.length - 1; i++) t = this.vectorLength(this.vectorSubtract(this.colors[i + 1], this.colors[i])), e.push(t), a += t;
        var n, o = (this.maxValue - this.minValue) / a;
        for (i = 0; i < e.length; i++) e[i] *= o;
        for (i = 0, l -= this.minValue; l - e[i] >= 0;) l -= e[i], i++;
        for (n = i === this.colors.length - 1 ? this.vectorToNum(this.colors[i]).toString(16) : this.vectorToNum(this.vectorAdd(this.colors[i], this.vectorMult(this.vectorSubtract(this.colors[i + 1], this.colors[i]), l / e[i]))).toString(16); n.length < 6;) n = "0" + n;
        return "#" + n
    }, ColorScale.rgbToArray = function(l) {
        return l = l.substr(1), [parseInt(l.substr(0, 2), 16), parseInt(l.substr(2, 2), 16), parseInt(l.substr(4, 2), 16)]
    }, ColorScale.prototype.setColors = function(l) {
        for (var t = 0; t < l.length; t++) l[t] = ColorScale.rgbToArray(l[t]);
        this.colors = l
    }, ColorScale.prototype.setMax = function(l) {
        this.clearMaxValue = l, "function" == typeof this.normalize ? this.maxValue = this.normalize(l) : this.maxValue = l
    }, ColorScale.prototype.setMin = function(l) {
        this.clearMinValue = l, "function" == typeof this.normalize ? this.minValue = this.normalize(l) : this.minValue = l
    }, ColorScale.prototype.setNormalizeFunction = function(l) {
        "polynomial" === l ? this.normalize = function(l) {
            return Math.pow(l, .2)
        } : "linear" === l ? delete this.normalize : this.normalize = l, this.setMin(this.clearMinValue), this.setMax(this.clearMaxValue)
    }, ColorScale.prototype.vectorAdd = function(l, t) {
        for (var e = [], a = 0; a < l.length; a++) e[a] = l[a] + t[a];
        return e
    }, ColorScale.prototype.vectorLength = function(l) {
        for (var t = 0, e = 0; e < l.length; e++) t += l[e] * l[e];
        return Math.sqrt(t)
    }, ColorScale.prototype.vectorMult = function(l, t) {
        for (var e = [], a = 0; a < l.length; a++) e[a] = l[a] * t;
        return e
    }, ColorScale.prototype.vectorSubtract = function(l, t) {
        for (var e = [], a = 0; a < l.length; a++) e[a] = l[a] - t[a];
        return e
    }, ColorScale.prototype.vectorToNum = function(l) {
        for (var t = 0, e = 0; e < l.length; e++) t += Math.round(l[e]) * Math.pow(256, l.length - e - 1);
        return t
    }, JQVMap.prototype.applyTransform = function() {
        var l, t, e, a;
        this.defaultWidth * this.scale <= this.width ? (l = (this.width - this.defaultWidth * this.scale) / (2 * this.scale), e = (this.width - this.defaultWidth * this.scale) / (2 * this.scale)) : (l = 0, e = (this.width - this.defaultWidth * this.scale) / this.scale), this.defaultHeight * this.scale <= this.height ? (t = (this.height - this.defaultHeight * this.scale) / (2 * this.scale), a = (this.height - this.defaultHeight * this.scale) / (2 * this.scale)) : (t = 0, a = (this.height - this.defaultHeight * this.scale) / this.scale), this.transY > t ? this.transY = t : this.transY < a && (this.transY = a), this.transX > l ? this.transX = l : this.transX < e && (this.transX = e), this.canvas.applyTransformParams(this.scale, this.transX, this.transY)
    }, JQVMap.prototype.bindZoomButtons = function() {
        var l = this;
        this.container.find(".jqvmap-zoomin").click((function() {
            l.zoomIn()
        })), this.container.find(".jqvmap-zoomout").click((function() {
            l.zoomOut()
        }))
    }, JQVMap.prototype.deselect = function(l, t) {
        if (l = l.toLowerCase(), t = t || jQuery("#" + this.getCountryId(l))[0], this.isSelected(l)) this.selectedRegions.splice(this.selectIndex(l), 1), jQuery(this.container).trigger("regionDeselect.jqvmap", [l]), t.currentFillColor = t.getOriginalFill(), t.setFill(t.getOriginalFill());
        else
            for (var e in this.countries) this.selectedRegions.splice(this.selectedRegions.indexOf(e), 1), this.countries[e].currentFillColor = this.color, this.countries[e].setFill(this.color)
    }, JQVMap.prototype.getCountryId = function(l) {
        return "jqvmap" + this.index + "_" + l
    }, JQVMap.prototype.getPin = function(l) {
        return jQuery("#" + this.getPinId(l)).html()
    }, JQVMap.prototype.getPinId = function(l) {
        return this.getCountryId(l) + "_pin"
    }, JQVMap.prototype.getPins = function() {
        var l = this.container.find(".jqvmap-pin"),
            t = {};
        return jQuery.each(l, (function(l, e) {
            var a = (e = jQuery(e)).attr("for").toLowerCase(),
                i = e.html();
            t[a] = i
        })), JSON.stringify(t)
    }, JQVMap.prototype.highlight = function(l, t) {
        t = t || jQuery("#" + this.getCountryId(l))[0], this.hoverOpacity ? t.setOpacity(this.hoverOpacity) : this.hoverColors && l in this.hoverColors ? (t.currentFillColor = t.getFill() + "", t.setFill(this.hoverColors[l])) : this.hoverColor && (t.currentFillColor = t.getFill() + "", t.setFill(this.hoverColor))
    }, JQVMap.prototype.isSelected = function(l) {
        return this.selectIndex(l) >= 0
    }, JQVMap.prototype.makeDraggable = function() {
        var l, t, e, a, i, n, o, s, r, h = !1,
            L = this;
        L.isMoving = !1, L.isMovingTimeout = !1, this.container.mousemove((function(e) {
            return h && (L.transX -= (l - e.pageX) / L.scale, L.transY -= (t - e.pageY) / L.scale, L.applyTransform(), l = e.pageX, t = e.pageY, L.isMoving = !0, L.isMovingTimeout && clearTimeout(L.isMovingTimeout), L.container.trigger("drag")), !1
        })).mousedown((function(e) {
            return h = !0, l = e.pageX, t = e.pageY, !1
        })).mouseup((function() {
            return h = !1, clearTimeout(L.isMovingTimeout), L.isMovingTimeout = setTimeout((function() {
                L.isMoving = !1
            }), 100), !1
        })).mouseout((function() {
            return h && L.isMoving ? (clearTimeout(L.isMovingTimeout), L.isMovingTimeout = setTimeout((function() {
                h = !1, L.isMoving = !1
            }), 100), !1) : void 0
        })), jQuery(this.container).bind("touchmove", (function(l) {
            var t, h, p, c, u = l.originalEvent.touches;
            if (1 === u.length) {
                if (1 === e) {
                    if (s === u[0].pageX && r === u[0].pageY) return;
                    p = L.transX, c = L.transY, L.transX -= (s - u[0].pageX) / L.scale, L.transY -= (r - u[0].pageY) / L.scale, L.applyTransform(), (p !== L.transX || c !== L.transY) && l.preventDefault(), L.isMoving = !0, L.isMovingTimeout && clearTimeout(L.isMovingTimeout)
                }
                s = u[0].pageX, r = u[0].pageY
            } else 2 === u.length && (2 === e ? (h = Math.sqrt(Math.pow(u[0].pageX - u[1].pageX, 2) + Math.pow(u[0].pageY - u[1].pageY, 2)) / n, L.setScale(o * h, a, i), l.preventDefault()) : (t = jQuery(L.container).offset(), a = u[0].pageX > u[1].pageX ? u[1].pageX + (u[0].pageX - u[1].pageX) / 2 : u[0].pageX + (u[1].pageX - u[0].pageX) / 2, i = u[0].pageY > u[1].pageY ? u[1].pageY + (u[0].pageY - u[1].pageY) / 2 : u[0].pageY + (u[1].pageY - u[0].pageY) / 2, a -= t.left, i -= t.top, o = L.scale, n = Math.sqrt(Math.pow(u[0].pageX - u[1].pageX, 2) + Math.pow(u[0].pageY - u[1].pageY, 2))));
            e = u.length
        })), jQuery(this.container).bind("touchstart", (function() {
            e = 0
        })), jQuery(this.container).bind("touchend", (function() {
            e = 0
        }))
    }, JQVMap.prototype.placePins = function(l, t) {
        var e = this;
        if ((!t || "content" !== t && "id" !== t) && (t = "content"), "content" === t ? jQuery.each(l, (function(l, t) {
                if (0 !== jQuery("#" + e.getCountryId(l)).length) {
                    var a = e.getPinId(l),
                        i = jQuery("#" + a);
                    i.length > 0 && i.remove(), e.container.append('<div id="' + a + '" for="' + l + '" class="jqvmap-pin" style="position:absolute">' + t + "</div>")
                }
            })) : jQuery.each(l, (function(l, t) {
                if (0 !== jQuery("#" + e.getCountryId(l)).length) {
                    var a = e.getPinId(l),
                        i = jQuery("#" + a);
                    i.length > 0 && i.remove(), e.container.append('<div id="' + a + '" for="' + l + '" class="jqvmap-pin" style="position:absolute"></div>'), i.append(jQuery("#" + t))
                }
            })), this.positionPins(), !this.pinHandlers) {
            this.pinHandlers = !0;
            var a = function() {
                e.positionPins()
            };
            this.container.bind("zoomIn", a).bind("zoomOut", a).bind("drag", a)
        }
    }, JQVMap.prototype.positionPins = function() {
        var l = this,
            t = this.container.find(".jqvmap-pin");
        jQuery.each(t, (function(t, e) {
            e = jQuery(e);
            var a = l.getCountryId(e.attr("for").toLowerCase()),
                i = jQuery("#" + a),
                n = document.getElementById(a).getBBox(),
                o = i.position(),
                s = l.scale,
                r = o.left + n.width / 2 * s - e.width() / 2,
                h = o.top + n.height / 2 * s - e.height() / 2;
            e.css("left", r).css("top", h)
        }))
    }, JQVMap.prototype.removePin = function(l) {
        l = l.toLowerCase(), jQuery("#" + this.getPinId(l)).remove()
    }, JQVMap.prototype.removePins = function() {
        this.container.find(".jqvmap-pin").remove()
    }, JQVMap.prototype.reset = function() {
        for (var l in this.countries) this.countries[l].setFill(this.color);
        this.scale = this.baseScale, this.transX = this.baseTransX, this.transY = this.baseTransY, this.applyTransform()
    }, JQVMap.prototype.resize = function() {
        var l = this.baseScale;
        this.width / this.height > this.defaultWidth / this.defaultHeight ? (this.baseScale = this.height / this.defaultHeight, this.baseTransX = Math.abs(this.width - this.defaultWidth * this.baseScale) / (2 * this.baseScale)) : (this.baseScale = this.width / this.defaultWidth, this.baseTransY = Math.abs(this.height - this.defaultHeight * this.baseScale) / (2 * this.baseScale)), this.scale *= this.baseScale / l, this.transX *= this.baseScale / l, this.transY *= this.baseScale / l
    }, JQVMap.prototype.select = function(l, t) {
        l = l.toLowerCase(), t = t || jQuery("#" + this.getCountryId(l))[0], this.isSelected(l) || (this.multiSelectRegion ? this.selectedRegions.push(l) : this.selectedRegions = [l], jQuery(this.container).trigger("regionSelect.jqvmap", [l]), this.selectedColor && t && (t.currentFillColor = this.selectedColor, t.setFill(this.selectedColor)))
    }, JQVMap.prototype.selectIndex = function(l) {
        l = l.toLowerCase();
        for (var t = 0; t < this.selectedRegions.length; t++)
            if (l === this.selectedRegions[t]) return t;
        return -1
    }, JQVMap.prototype.setBackgroundColor = function(l) {
        this.container.css("background-color", l)
    }, JQVMap.prototype.setColors = function(l, t) {
        if ("string" == typeof l) this.countries[l].setFill(t), this.countries[l].setAttribute("original", t);
        else {
            var e = l;
            for (var a in e) this.countries[a] && (this.countries[a].setFill(e[a]), this.countries[a].setAttribute("original", e[a]))
        }
    }, JQVMap.prototype.setNormalizeFunction = function(l) {
        this.colorScale.setNormalizeFunction(l), this.values && this.setValues(this.values)
    }, JQVMap.prototype.setScale = function(l) {
        this.scale = l, this.applyTransform()
    }, JQVMap.prototype.setScaleColors = function(l) {
        this.colorScale.setColors(l), this.values && this.setValues(this.values)
    }, JQVMap.prototype.setValues = function(l) {
        var t, e = 0,
            a = Number.MAX_VALUE;
        for (var i in l) i = i.toLowerCase(), t = parseFloat(l[i]), isNaN(t) || (t > e && (e = l[i]), a > t && (a = t));
        a === e && e++, this.colorScale.setMin(a), this.colorScale.setMax(e);
        var n = {};
        for (i in l) i = i.toLowerCase(), t = parseFloat(l[i]), n[i] = isNaN(t) ? this.color : this.colorScale.getColor(t);
        this.setColors(n), this.values = l
    }, JQVMap.prototype.unhighlight = function(l, t) {
        l = l.toLowerCase(), (t = t || jQuery("#" + this.getCountryId(l))[0]).setOpacity(1), t.currentFillColor && t.setFill(t.currentFillColor)
    }, JQVMap.prototype.zoomIn = function() {
        var l = this,
            t = (jQuery("#zoom").innerHeight() - 12 - 30 - 6 - 7 - 6) / (this.zoomMaxStep - this.zoomCurStep);
        if (l.zoomCurStep < l.zoomMaxStep) {
            l.transX -= (l.width / l.scale - l.width / (l.scale * l.zoomStep)) / 2, l.transY -= (l.height / l.scale - l.height / (l.scale * l.zoomStep)) / 2, l.setScale(l.scale * l.zoomStep), l.zoomCurStep++;
            var e = jQuery("#zoomSlider");
            e.css("top", parseInt(e.css("top"), 10) - t), l.container.trigger("zoomIn")
        }
    }, JQVMap.prototype.zoomOut = function() {
        var l = this,
            t = (jQuery("#zoom").innerHeight() - 12 - 30 - 6 - 7 - 6) / (this.zoomMaxStep - this.zoomCurStep);
        if (l.zoomCurStep > 1) {
            l.transX += (l.width / (l.scale / l.zoomStep) - l.width / l.scale) / 2, l.transY += (l.height / (l.scale / l.zoomStep) - l.height / l.scale) / 2, l.setScale(l.scale / l.zoomStep), l.zoomCurStep--;
            var e = jQuery("#zoomSlider");
            e.css("top", parseInt(e.css("top"), 10) + t), l.container.trigger("zoomOut")
        }
    }, VectorCanvas.prototype.applyTransformParams = function(l, t, e) {
        "svg" === this.mode ? this.rootGroup.setAttribute("transform", "scale(" + l + ") translate(" + t + ", " + e + ")") : (this.rootGroup.coordorigin = this.width - t + "," + (this.height - e), this.rootGroup.coordsize = this.width / l + "," + this.height / l)
    }, VectorCanvas.prototype.createGroup = function(l) {
        var t;
        return "svg" === this.mode ? t = this.createSvgNode("g") : ((t = this.createVmlNode("group")).style.width = this.width + "px", t.style.height = this.height + "px", t.style.left = "0px", t.style.top = "0px", t.coordorigin = "0 0", t.coordsize = this.width + " " + this.height), l && (this.rootGroup = t), t
    }, VectorCanvas.prototype.createPath = function(l) {
        var t;
        if ("svg" === this.mode)(t = this.createSvgNode("path")).setAttribute("d", l.path), null !== this.params.borderColor && t.setAttribute("stroke", this.params.borderColor), this.params.borderWidth > 0 && (t.setAttribute("stroke-width", this.params.borderWidth), t.setAttribute("stroke-linecap", "round"), t.setAttribute("stroke-linejoin", "round")), this.params.borderOpacity > 0 && t.setAttribute("stroke-opacity", this.params.borderOpacity), t.setFill = function(l) {
            this.setAttribute("fill", l), null === this.getAttribute("original") && this.setAttribute("original", l)
        }, t.getFill = function() {
            return this.getAttribute("fill")
        }, t.getOriginalFill = function() {
            return this.getAttribute("original")
        }, t.setOpacity = function(l) {
            this.setAttribute("fill-opacity", l)
        };
        else {
            (t = this.createVmlNode("shape")).coordorigin = "0 0", t.coordsize = this.width + " " + this.height, t.style.width = this.width + "px", t.style.height = this.height + "px", t.fillcolor = JQVMap.defaultFillColor, t.stroked = !1, t.path = VectorCanvas.pathSvgToVml(l.path);
            var e = this.createVmlNode("skew");
            e.on = !0, e.matrix = "0.01,0,0,0.01,0,0", e.offset = "0,0", t.appendChild(e);
            var a = this.createVmlNode("fill");
            t.appendChild(a), t.setFill = function(l) {
                this.getElementsByTagName("fill")[0].color = l, null === this.getAttribute("original") && this.setAttribute("original", l)
            }, t.getFill = function() {
                return this.getElementsByTagName("fill")[0].color
            }, t.getOriginalFill = function() {
                return this.getAttribute("original")
            }, t.setOpacity = function(l) {
                this.getElementsByTagName("fill")[0].opacity = parseInt(100 * l, 10) + "%"
            }
        }
        return t
    }, VectorCanvas.prototype.pathSvgToVml = function(l) {
        var t, e, a = "",
            i = 0,
            n = 0;
        return l.replace(/([MmLlHhVvCcSs])((?:-?(?:\d+)?(?:\.\d+)?,?\s?)+)/g, (function(l, o, s) {
            (s = s.replace(/(\d)-/g, "$1,-").replace(/\s+/g, ",").split(","))[0] || s.shift();
            for (var r = 0, h = s.length; h > r; r++) s[r] = Math.round(100 * s[r]);
            switch (o) {
                case "m":
                    i += s[0], n += s[1], a = "t" + s.join(",");
                    break;
                case "M":
                    i = s[0], n = s[1], a = "m" + s.join(",");
                    break;
                case "l":
                    i += s[0], n += s[1], a = "r" + s.join(",");
                    break;
                case "L":
                    i = s[0], n = s[1], a = "l" + s.join(",");
                    break;
                case "h":
                    i += s[0], a = "r" + s[0] + ",0";
                    break;
                case "H":
                    i = s[0], a = "l" + i + "," + n;
                    break;
                case "v":
                    n += s[0], a = "r0," + s[0];
                    break;
                case "V":
                    n = s[0], a = "l" + i + "," + n;
                    break;
                case "c":
                    t = i + s[s.length - 4], e = n + s[s.length - 3], i += s[s.length - 2], n += s[s.length - 1], a = "v" + s.join(",");
                    break;
                case "C":
                    t = s[s.length - 4], e = s[s.length - 3], i = s[s.length - 2], n = s[s.length - 1], a = "c" + s.join(",");
                    break;
                case "s":
                    s.unshift(n - e), s.unshift(i - t), t = i + s[s.length - 4], e = n + s[s.length - 3], i += s[s.length - 2], n += s[s.length - 1], a = "v" + s.join(",");
                    break;
                case "S":
                    s.unshift(n + n - e), s.unshift(i + i - t), t = s[s.length - 4], e = s[s.length - 3], i = s[s.length - 2], n = s[s.length - 1], a = "c" + s.join(",")
            }
            return a
        })).replace(/z/g, "")
    }, VectorCanvas.prototype.setSize = function(l, t) {
        if ("svg" === this.mode) this.canvas.setAttribute("width", l), this.canvas.setAttribute("height", t);
        else if (this.canvas.style.width = l + "px", this.canvas.style.height = t + "px", this.canvas.coordsize = l + " " + t, this.canvas.coordorigin = "0 0", this.rootGroup) {
            for (var e = this.rootGroup.getElementsByTagName("shape"), a = 0, i = e.length; i > a; a++) e[a].coordsize = l + " " + t, e[a].style.width = l + "px", e[a].style.height = t + "px";
            this.rootGroup.coordsize = l + " " + t, this.rootGroup.style.width = l + "px", this.rootGroup.style.height = t + "px"
        }
        this.width = l, this.height = t
    }, jQuery.fn.vectorMap('addMap', 'dz_fr', {
        "width": 600,
        "height": 400,
        "paths": {
            "1": {
                "path": "M 268.306 457.87 c 0 0 2.249 -0.725 2.249 -0.725 c 0 0 -0.496 -2.893 -0.496 -2.893 c 0 0 -3.133 -7.454 -3.133 -7.454 c 0 0 -2.249 -3.262 -2.249 -3.262 c 0 0 0.031 -6.131 0.031 -6.131 c 0 0 -1.682 -5.848 -1.682 -5.848 c 0 0 -2.49 -5.061 -2.49 -5.061 c 0 0 -6.095 -6.187 -6.095 -6.187 c 0 0 -1.521 -7.254 -1.521 -7.254 c 0 0 -4.417 -0.47 -4.417 -0.47 c 0 0 -4.163 0.675 -4.163 0.675 c 0 0 0.63 -56.826 0.63 -56.826 c 0 0 -0.259 -38.388 -0.259 -38.388 c 0 0 -8.571 -12.135 -8.571 -12.135 c 0 0 -2.714 -6.038 -2.714 -6.038 c 0 0 7.482 -7.683 7.482 -7.683 c 0 0 1.19 -2.448 1.19 -2.448 c 0 0 2.635 -0.807 2.635 -0.807 c 0 0 0.883 0.813 0.883 0.813 c 0 0 1.749 -0.209 1.749 -0.209 c 0 0 0.138 0.823 0.138 0.823 c 0 0 2.35 -1.681 2.35 -1.681 c 0 0 0.465 -8.884 0.465 -8.884 c 0 0 2.565 -6.436 2.565 -6.436 c 0 0 -1.848 -2.78 -1.848 -2.78 c 0 0 -0.051 -6.214 -0.051 -6.214 c 0 0 1.856 -3.176 1.856 -3.176 c 0 0 0.81 -10.075 0.81 -10.075 c 0 0 3.164 -5.032 3.164 -5.032 c 0 0 1.104 -3.51 1.104 -3.51 c 0 0 0.784 -10.595 0.784 -10.595 c 0 0 1.118 -4.885 1.118 -4.885 c 0 0 -4.273 -23.743 -4.273 -23.743 c 0 0 2.643 -13.284 2.643 -13.284 c 0 0 0.684 -28.618 0.684 -28.618 c 0 0 -21.085 13.188 -21.085 13.188 c 0 0 -15.816 11.178 -15.816 11.178 c 0 0 -8.624 9.693 -8.624 9.693 c 0 0 -3.966 6.909 -3.966 6.909 c 0 0 -10.189 7.171 -10.189 7.171 c 0 0 -1.53 5.245 -1.53 5.245 c 0 0 1.021 6.805 1.021 6.805 c 0 0 -0.608 2.721 -0.608 2.721 c 0 0 -5.818 4.933 -5.818 4.933 c 0 0 -11.195 0.456 -11.195 0.456 c 0 0 -13.243 3.621 -13.243 3.621 c 0 0 -6.827 9.299 -6.827 9.299 c 0 0 -6.535 4.925 -6.535 4.925 c 0 0 -1.732 3.77 -1.732 3.77 c 0 0 -6.146 7.528 -6.146 7.528 c 0 0 -3.367 10.625 -3.367 10.625 c 0 0 1.165 1.254 1.165 1.254 c 0 0 -3.322 10.957 -3.322 10.957 c 0 0 -1.78 1.059 -1.78 1.059 c 0 0 -7.687 -0.561 -7.687 -0.561 c 0 0 -3.857 1.585 -3.857 1.585 c 0 0 -2.317 1.98 -2.317 1.98 c 0 0 -7.18 9.722 -7.18 9.722 c 0 0 -3.038 6.72 -3.038 6.72 c 0 0 -14.179 -0.237 -14.179 -0.237 c 0 0 -7.204 6.951 -7.204 6.951 c -0.001 0 -12.962 4.238 -12.962 4.238 c 0 0 37.868 29.441 37.868 29.441 c 0 0 91.412 67.584 91.412 67.584 c 0 0 0.398 1.977 0.398 1.977 c 0 0 27.738 18.602 27.738 18.602 c 0 0 0.568 2.959 0.568 2.959 c 0 0 -0.822 5.766 -0.822 5.766 c 0 0 0.463 1.174 0.463 1.174 c 0 0 3.119 -0.263 3.119 -0.263 c 0 0 1.575 2.019 1.575 2.019 c 0 0 6.354 2.238 6.354 2.238 c 0 0 0.896 4.331 0.896 4.331 c 0 0 3.206 2.918 3.206 2.918 c 0 0 1.768 -0.039 1.768 -0.039 c 0 0 0.994 1.532 0.994 1.532 c 0 0 1.018 -0.565 1.018 -0.565 c 0 0 1.242 0.478 1.242 0.478 c 0 0 0.795 -0.395 0.795 -0.395 c 0 0 1.279 1.151 1.279 1.151 c 0 0 1.88 -1.958 1.88 -1.958 c 0 0 1.563 0.354 1.563 0.354 c 0 0 2.465 2.305 2.465 2.305 c 0 0 1.674 3.077 1.674 3.077 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Adrar"
            },
            "2": {
                "path": "M 251.147 52.1578 c 0 0 0.255 -1.759 0.255 -1.759 c 0 0 -1.269 -0.908 -1.269 -0.908 c 0 0 -0.683 -1.607 -0.683 -1.607 c 0 0 0.258 -1.099 0.258 -1.099 c 0 0 -0.801 0.179 -0.801 0.179 c 0 0 -0.68 -0.703 -0.68 -0.703 c 0 0 -0.004 -1.019 -0.004 -1.019 c 0 0 1.33 -0.886 1.33 -0.886 c 0 0 -1.829 -0.536 -1.829 -0.536 c 0 0 1.196 -1.169 1.196 -1.169 c 0 0 -1.496 -1.623 -1.496 -1.623 c 0 0 0.13 -1.172 0.13 -1.172 c 0 0 2.229 -1.641 2.229 -1.641 c 0 0 1.099 -2.467 1.099 -2.467 c 0 0 -4.333 0.653 -4.333 0.653 c 0 0 -2.668 -0.688 -2.668 -0.688 c 0 0 -1.591 1.201 -1.591 1.201 c 0 0 -4.207 0.314 -4.207 0.314 c 0 0 -3.056 1.182 -3.056 1.182 c 0 0 -0.989 1.688 -0.989 1.688 c 0 0 -3.115 1.248 -3.115 1.248 c 0 0 -1 3.282 -1 3.282 c 0 0 2.055 0.32 2.055 0.32 c 0 0 2.173 -0.8 2.173 -0.8 c 0 0 0.468 1.895 0.468 1.895 c 0 0 0.537 0.021 0.537 0.021 c 0 0 -0.826 1.687 -0.826 1.687 c 0 0 0.509 -0.155 0.509 -0.155 c 0 0 0.519 1.997 0.519 1.997 c 0 0 1.774 -0.663 1.774 -0.663 c 0 0 -0.347 0.243 -0.347 0.243 c 0 0 0.593 0.041 0.593 0.041 c 0 0 0.541 1.18 0.541 1.18 c 0 0 1.563 0.984 1.563 0.984 c 0 0 2.838 -0.813 2.838 -0.813 c 0 0 2.173 3.286 2.173 3.286 c 0 0 0.06 -1.414 0.06 -1.414 c 0 0 0.518 -0.333 0.518 -0.333 c 0 0 -0.384 -0.349 -0.384 -0.349 c 0 0 2.264 -0.619 2.264 -0.619 c 0 0 0.035 -0.865 0.035 -0.865 c 0 0 1.22 -1.163 1.22 -1.163 c 0 0 1.035 1.876 1.035 1.876 c 0 0 1.906 1.174 1.906 1.174 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Chlef"
            },
            "3": {
                "path": "M 311.039 126.689 c 0 0 -3.193 -5.374 -3.193 -5.374 c 0 0 -4.008 -3.915 -4.008 -3.915 c 0 0 -1.49 -1.064 -1.49 -1.064 c 0 0 -8.125 -3.061 -8.125 -3.061 c 0 0 -1.408 -2.328 -1.408 -2.328 c 0 0 -3.983 -3.588 -3.983 -3.588 c 0 0 -5.242 -1.505 -5.242 -1.505 c 0 0 -1.604 -3.201 -1.604 -3.201 c 0 0 0.146 -1.212 0.146 -1.212 c 0 0 -2.38 -6.709 -2.38 -6.709 c 0 0 -1.252 0.433 -1.252 0.433 c 0 0 0.124 -0.432 0.124 -0.432 c 0 0 -1.456 -0.758 -1.456 -0.758 c 0 0 -2.267 2.288 -2.267 2.288 c 0 0 0.026 1.448 0.026 1.448 c 0 0 -0.695 -0.262 -0.695 -0.262 c 0 0 -2.258 1.064 -2.258 1.064 c 0 0 -1.209 -0.324 -1.209 -0.324 c 0 0 -3.377 -4.766 -3.377 -4.766 c 0 0 -0.441 0.087 -0.441 0.087 c 0 0 -1.244 -3.591 -1.244 -3.591 c 0 0 -0.566 -6.331 -0.566 -6.331 c 0 0 -3.015 0.373 -3.015 0.373 c 0 0 -0.437 1.043 -0.437 1.043 c 0 0 -1.978 0.888 -1.978 0.888 c 0 0 -2.349 2.563 -2.349 2.563 c 0 0 -4.876 1.753 -4.876 1.753 c 0 0 -1.839 2.088 -1.839 2.088 c 0 0 -0.366 2.438 -0.366 2.438 c 0 0 -1.644 0.977 -1.644 0.977 c 0 0 -0.273 -1.14 -0.273 -1.14 c 0 0 -3.773 2.229 -3.773 2.229 c 0 0 0.808 1.346 0.808 1.346 c 0 0 -2.194 1.46 -2.194 1.46 c 0 0 0.863 1.461 0.863 1.461 c 0 0 -0.165 0.989 -0.165 0.989 c 0 0 2.206 0.969 2.206 0.969 c 0 0 1.613 1.795 1.613 1.795 c 0 0 3.495 -0.817 3.495 -0.817 c 0 0 1.828 1.584 1.828 1.584 c 0 0 0.565 1.551 0.565 1.551 c 0 0 -0.247 2.655 -0.247 2.655 c 0 0 1.457 0.411 1.457 0.411 c 0 0 0.124 0.991 0.124 0.991 c 0 0 1.142 1.009 1.142 1.009 c 0 0 -0.82 1.435 -0.82 1.435 c 0 0 -0.285 2.856 -0.285 2.856 c 0 0 3.122 0.287 3.122 0.287 c 0 0 -0.206 1.673 -0.206 1.673 c 0 0 3.521 1.138 3.521 1.138 c 0 0 2.073 -0.452 2.073 -0.452 c 0 0 -0.203 3.901 -0.203 3.901 c 0 0 -3.998 0.134 -3.998 0.134 c 0 0 0.641 0.886 0.641 0.886 c 0 0 -0.146 1.528 -0.146 1.528 c 0 0 3.112 6.564 3.112 6.564 c 0 0 10.825 -0.946 10.825 -0.946 c 0 0 5.37 -1.604 5.37 -1.604 c 0 0 8.55 2.039 8.55 2.039 c 0 0 -0.331 -2.903 -0.331 -2.903 c 0 0 -3.66 -2.23 -3.66 -2.23 c 0 0 7.853 -0.362 7.853 -0.362 c 0 0 0.945 -0.734 0.945 -0.734 c 0 0 0.439 0.318 0.439 0.318 c 0 0 0.417 -0.754 0.417 -0.754 c 0 0 0.305 0.512 0.305 0.512 c 0 0 0.903 -0.387 0.903 -0.387 c 0 0 2.684 1.107 2.684 1.107 c 0 0 0.77 -0.422 0.77 -0.422 c 0 0 13.076 0.901 13.076 0.901 c 0 0 0 0 0 0",
                "name": "Laghouat"
            },
            "4": {
                "path": "M 377.235 49.5529 c 0 0 0.701 0.387 0.701 0.387 c 0 0 0.531 2.116 0.531 2.116 c 0 0 1.615 0.739 1.615 0.739 c 0 0 -0.772 0.688 -0.772 0.688 c 0 0 0.142 1.093 0.142 1.093 c 0 0 1.311 2.659 1.311 2.659 c 0 0 -4.046 1.621 -4.046 1.621 c 0 0 -1.879 2.798 -1.879 2.798 c 0 0 -0.624 0.112 -0.624 0.112 c 0 0 -0.659 -1.052 -0.659 -1.052 c 0 0 -0.692 -0.06 -0.692 -0.06 c 0 0 -0.333 -1.191 -0.333 -1.191 c 0 0 -0.393 -0.313 -0.393 -0.313 c 0 0 -0.6 0.601 -0.6 0.601 c 0 0 0.179 -0.579 0.179 -0.579 c 0 0 -1.313 -0.926 -1.313 -0.926 c 0 0 -0.409 1.399 -0.409 1.399 c 0 0 -1.049 0.308 -1.049 0.308 c 0 0 0.063 -2.163 0.063 -2.163 c 0 0 -1.771 -0.877 -1.771 -0.877 c 0 0 -0.118 0.548 -0.118 0.548 c 0 0 -1.816 -0.27 -1.816 -0.27 c 0 0 -0.957 2.009 -0.957 2.009 c 0 0 -1.647 -0.482 -1.647 -0.482 c 0 0 0.408 -1.016 0.408 -1.016 c 0 0 -0.614 -0.53 -0.614 -0.53 c 0 0 -4.031 0.608 -4.031 0.608 c 0 0 -0.774 -1.596 -0.774 -1.596 c 0 0 -2.106 -2.413 -2.106 -2.413 c 0 0 -1.569 -0.717 -1.569 -0.717 c 0 0 -2.67 1.215 -2.67 1.215 c 0 0 -0.353 -0.517 -0.353 -0.517 c 0 0 0.464 -0.385 0.464 -0.385 c 0 0 -0.535 -0.365 -0.535 -0.365 c 0 0 0.359 -0.917 0.359 -0.917 c 0 0 -2.605 -0.267 -2.605 -0.267 c 0 0 -0.109 -0.587 -0.109 -0.587 c 0 0 -1.551 1.313 -1.551 1.313 c 0 0 -2.433 -1.298 -2.433 -1.298 c 0 0 0.803 -2.113 0.803 -2.113 c 0 0 1.65 -0.227 1.65 -0.227 c 0 0 0.715 0.51 0.715 0.51 c 0 0 -0.213 -0.771 -0.213 -0.771 c 0 0 0.78 0.116 0.78 0.116 c 0 0 1.221 -1.532 1.221 -1.532 c 0 0 0.161 -2.791 0.161 -2.791 c 0 0 2.365 -0.863 2.365 -0.863 c 0 0 -0.381 0.438 -0.381 0.438 c 0 0 0.595 1.16 0.595 1.16 c 0 0 1.011 0.369 1.011 0.369 c 0 0 -0.465 -0.805 -0.465 -0.805 c 0 0 1.122 0.603 1.122 0.603 c 0 0 0.375 -1.067 0.375 -1.067 c 0 0 2.243 -0.16 2.243 -0.16 c 0 0 0.264 -1.443 0.264 -1.443 c 0 0 1.445 1.166 1.445 1.166 c 0 0 3.62 0.066 3.62 0.066 c 0 0 -0.201 1.256 -0.201 1.256 c 0 0 1.267 0.551 1.267 0.551 c 0 0 -0.196 0.957 -0.196 0.957 c 0 0 0.998 0.166 0.998 0.166 c 0 0 2.784 -1.372 2.784 -1.372 c 0 0 0.683 -1.773 0.683 -1.773 c 0 0 1.257 -0.076 1.257 -0.076 c 0 0 0.424 2.263 0.424 2.263 c 0 0 0.736 0.045 0.736 0.045 c 0 0 0.649 2.12 0.649 2.12 c 0 0 1.024 1.332 1.024 1.332 c 0 0 2.675 0.939 2.675 0.939 c 0 0 -0.031 1.478 -0.031 1.478 c 0 0 2.814 -0.213 2.814 -0.213 c 0 0 -0.354 -1.537 -0.354 -1.537 c 0 0 0.815 -0.485 0.815 -0.485 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Oum El-Bouaghi"
            },
            "5": {
                "path": "M 354.598 79.5648 c 0 0 -0.634 -2.146 -0.634 -2.146 c 0 0 0.812 -0.795 0.812 -0.795 c 0 0 -0.611 -0.482 -0.611 -0.482 c 0 0 0.499 -0.58 0.499 -0.58 c 0 0 -1.347 -2.257 -1.347 -2.257 c 0 0 -0.802 -0.146 -0.802 -0.146 c 0 0 0.401 -0.844 0.401 -0.844 c 0 0 -0.438 -1.353 -0.438 -1.353 c 0 0 1.308 -1.429 1.308 -1.429 c 0 0 -0.23 -2.636 -0.23 -2.636 c 0 0 1.644 -1.396 1.644 -1.396 c 0 0 -1.052 -0.219 -1.052 -0.219 c 0 0 0.178 -1.438 0.178 -1.438 c 0 0 -0.634 -1.333 -0.634 -1.333 c 0 0 1.491 -1.386 1.491 -1.386 c 0 0 2.418 -0.599 2.418 -0.599 c 0 0 0.612 -1.514 0.612 -1.514 c 0 0 -0.74 -1.491 -0.74 -1.491 c 0 0 0.214 -1.337 0.214 -1.337 c 0 0 -2.106 -2.414 -2.106 -2.414 c 0 0 -1.569 -0.716 -1.569 -0.716 c 0 0 -2.67 1.214 -2.67 1.214 c 0 0 -0.353 -0.518 -0.353 -0.518 c 0 0 0.464 -0.385 0.464 -0.385 c 0 0 -0.535 -0.365 -0.535 -0.365 c 0 0 0.36 -0.917 0.36 -0.917 c 0 0 -2.606 -0.267 -2.606 -0.267 c 0 0 -0.11 -0.587 -0.11 -0.587 c 0 0 -1.55 1.313 -1.55 1.313 c 0 0 -2.433 -1.298 -2.433 -1.298 c 0 0 -3.583 -0.418 -3.583 -0.418 c 0 0 -0.49 0.384 -0.49 0.384 c 0 0 -0.965 0.569 -0.965 0.569 c 0 0 0.445 1.163 0.445 1.163 c 0 0 -2.807 -2.418 -2.807 -2.418 c 0 0 -1.214 0.316 -1.214 0.316 c 0 0 -1.424 1.56 -1.424 1.56 c 0 0 0.121 0.773 0.121 0.773 c 0 0 1.212 0.402 1.212 0.402 c 0 0 -0.792 1.303 -0.792 1.303 c 0 0 -0.682 -0.238 -0.682 -0.238 c 0 0 -0.502 0.541 -0.502 0.541 c 0 0 -2.294 -0.948 -2.294 -0.948 c 0 0 -0.241 0.685 -0.241 0.685 c 0 0 -0.797 -0.078 -0.797 -0.078 c 0 0 -1.382 1.093 -1.382 1.093 c 0 0 0.234 1.001 0.234 1.001 c 0 0 -0.78 1.759 -0.78 1.759 c 0 0 -1.127 -0.332 -1.127 -0.332 c 0 0 -2.661 2.963 -2.661 2.963 c 0 0 -1.817 0.906 -1.817 0.906 c 0 0 -0.723 -1.068 -0.723 -1.068 c 0 0 -1.061 -0.012 -1.061 -0.012 c 0 0 -0.828 0.921 -0.828 0.921 c 0 0 -0.075 -0.786 -0.075 -0.786 c 0 0 -0.958 1.506 -0.958 1.506 c 0 0 -1.945 -1.698 -1.945 -1.698 c 0 0 0.822 4.4 0.822 4.4 c 0 0 -0.38 2.546 -0.38 2.546 c 0 0 -0.915 1.547 -0.915 1.547 c 0 0 -0.525 -0.186 -0.525 -0.186 c 0 0 -1.186 1.173 -1.186 1.173 c 0 0 0.194 0.605 0.194 0.605 c 0 0 2.929 0.061 2.929 0.061 c 0 0 2.126 1.396 2.126 1.396 c 0 0 0.583 -0.342 0.583 -0.342 c 0 0 2.02 0.968 2.02 0.968 c 0 0 0.73 1.103 0.73 1.103 c 0 0 1.017 -0.474 1.017 -0.474 c 0 0 1.503 0.709 1.503 0.709 c 0 0 0.559 -0.079 0.559 -0.079 c 0 0 0.341 -1.11 0.341 -1.11 c 0 0 3.911 -0.103 3.911 -0.103 c 0 0 1.787 -0.953 1.787 -0.953 c 0 0 0.162 -0.935 0.162 -0.935 c 0 0 -0.656 -0.975 -0.656 -0.975 c 0 0 -1.454 -0.28 -1.454 -0.28 c 0 0 -0.321 -0.952 -0.321 -0.952 c 0 0 2.216 0.152 2.216 0.152 c 0 0 3.561 -2.397 3.561 -2.397 c 0 0 2.817 1.882 2.817 1.882 c 0 0 1.857 -0.219 1.857 -0.219 c 0 0 -2.247 2.121 -2.247 2.121 c 0 0 0.993 1.373 0.993 1.373 c 0 0 -0.826 1.425 -0.826 1.425 c 0 0 0.764 -0.211 0.764 -0.211 c 0 0 0.976 1.769 0.976 1.769 c 0 0 2.263 -2.836 2.263 -2.836 c 0 0 1.025 0.388 1.025 0.388 c 0 0 -0.085 1.186 -0.085 1.186 c 0 0 2.13 0.699 2.13 0.699 c 0 0 0.685 -1.448 0.685 -1.448 c 0 0 2.061 -0.262 2.061 -0.262 c 0 0 1.65 -1.111 1.65 -1.111 c 0 0 1.29 1.626 1.29 1.626 c 0 0 -0.779 1.125 -0.779 1.125 c 0 0 0.506 0.944 0.506 0.944 c 0 0 -0.438 2.539 -0.438 2.539 c 0 0 2.456 1.971 2.456 1.971 c 0 0 1.033 -0.363 1.033 -0.363 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Batna"
            },
            "6": {
                "path": "M 314.203 38.1218 c 0 0 -0.336 1.124 -0.336 1.124 c 0 0 -2.016 0.919 -2.016 0.919 c 0 0 -0.034 2.49 -0.034 2.49 c 0 0 -4.18 1.099 -4.18 1.099 c 0 0 -0.776 -1.701 -0.776 -1.701 c 0 0 0.222 -0.601 0.222 -0.601 c 0 0 -0.75 -0.99 -0.75 -0.99 c 0 0 0.743 -0.487 0.743 -0.487 c 0 0 0.148 -1.306 0.148 -1.306 c 0 0 -0.678 -1.324 -0.678 -1.324 c 0 0 1.795 -0.83 1.795 -0.83 c 0 0 2.18 -2.443 2.18 -2.443 c 0 0 -0.406 -0.66 -0.406 -0.66 c 0 0 1.259 -1.582 1.259 -1.582 c 0 0 -1.778 -0.942 -1.778 -0.942 c 0 0 0.148 -0.646 0.148 -0.646 c 0 0 1.229 -0.36 1.229 -0.36 c 0 0 0.704 0.539 0.704 0.539 c 0 0 0.672 -0.653 0.672 -0.653 c 0 0 -0.069 -1.338 -0.069 -1.338 c 0 0 -1.397 -1.952 -1.397 -1.952 c 0 0 3.611 -0.405 3.611 -0.405 c 0 0 3.398 1.061 3.398 1.061 c 0 0 2.038 1.439 2.038 1.439 c 0 0 1.871 0.364 1.871 0.364 c 0 0 -0.442 1.715 -0.442 1.715 c 0 0 2.887 1.563 2.887 1.563 c 0 0 4.324 -0.311 4.324 -0.311 c 0 0 0.029 1.315 0.029 1.315 c 0 0 0.916 0.194 0.916 0.194 c 0 0 -0.184 1.479 -0.184 1.479 c 0 0 -2.389 1.071 -2.389 1.071 c 0 0 0.252 0.685 0.252 0.685 c 0 0 -1.314 1.474 -1.314 1.474 c 0 0 0.471 0.919 0.471 0.919 c 0 0 -0.748 0.375 -0.748 0.375 c 0 0 -1.656 0.241 -1.656 0.241 c 0 0 0.025 -0.935 0.025 -0.935 c 0 0 -0.569 0.197 -0.569 0.197 c 0 0 0.023 -2.689 0.023 -2.689 c 0 0 0.535 -0.694 0.535 -0.694 c 0 0 -2.159 -1.465 -2.159 -1.465 c 0 0 -0.039 0.448 -0.039 0.448 c 0 0 -0.928 -0.088 -0.928 -0.088 c 0 0 -0.447 1.378 -0.447 1.378 c 0 0 -3.62 -0.479 -3.62 -0.479 c 0 0 -0.048 1.35 -0.048 1.35 c 0 0 -2.517 1.442 -2.517 1.442 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Béjaïa"
            },
            "7": {
                "path": "M 354.598 79.5648 c 0 0 -1.037 0.363 -1.037 0.363 c 0 0 -2.456 -1.971 -2.456 -1.971 c 0 0 0.438 -2.539 0.438 -2.539 c 0 0 -0.506 -0.943 -0.506 -0.943 c 0 0 0.779 -1.125 0.779 -1.125 c 0 0 -1.289 -1.626 -1.289 -1.626 c 0 0 -1.651 1.111 -1.651 1.111 c 0 0 -2.061 0.261 -2.061 0.261 c 0 0 -0.685 1.448 -0.685 1.448 c 0 0 -2.13 -0.699 -2.13 -0.699 c 0 0 0.085 -1.186 0.085 -1.186 c 0 0 -1.025 -0.387 -1.025 -0.387 c 0 0 -2.263 2.835 -2.263 2.835 c 0 0 -0.975 -1.768 -0.975 -1.768 c 0 0 -0.765 0.21 -0.765 0.21 c 0 0 0.826 -1.425 0.826 -1.425 c 0 0 -0.993 -1.373 -0.993 -1.373 c 0 0 2.247 -2.121 2.247 -2.121 c 0 0 -1.857 0.22 -1.857 0.22 c 0 0 -2.817 -1.883 -2.817 -1.883 c 0 0 -3.56 2.397 -3.56 2.397 c 0 0 -2.217 -0.152 -2.217 -0.152 c 0 0 0.321 0.952 0.321 0.952 c 0 0 1.454 0.28 1.454 0.28 c 0 0 0.656 0.975 0.656 0.975 c 0 0 -0.162 0.935 -0.162 0.935 c 0 0 -1.787 0.954 -1.787 0.954 c 0 0 -3.911 0.102 -3.911 0.102 c 0 0 -0.341 1.11 -0.341 1.11 c 0 0 -0.558 0.08 -0.558 0.08 c 0 0 -1.503 -0.709 -1.503 -0.709 c 0 0 -1.018 0.473 -1.018 0.473 c 0 0 -0.729 -1.102 -0.729 -1.102 c 0 0 -2.02 -0.969 -2.02 -0.969 c 0 0 -0.584 0.343 -0.584 0.343 c 0 0 0.446 3.492 0.446 3.492 c 0 0 0.547 0.305 0.547 0.305 c 0 0 -0.537 0.065 -0.537 0.065 c 0 0 -0.684 1.586 -0.684 1.586 c 0 0 -5.437 1.63 -5.437 1.63 c 0 0 -0.941 1.502 -0.941 1.502 c 0 0 -1.002 0.173 -1.002 0.173 c 0 0 1.299 1.086 1.299 1.086 c 0 0 -1.021 0.547 -1.021 0.547 c 0 0 -0.658 -0.445 -0.658 -0.445 c 0 0 -1.831 1.14 -1.831 1.14 c 0 0 -4.807 0.046 -4.807 0.046 c 0 0 -0.876 1.823 -0.876 1.823 c 0 0 -2.192 1.835 -2.192 1.835 c 0 0 0.522 0.302 0.522 0.302 c 0 0 0.418 3.083 0.418 3.083 c 0 0 1.216 1.271 1.216 1.271 c 0 0 -0.307 0.725 -0.307 0.725 c 0 0 1.814 0.933 1.814 0.933 c 0 0 -0.773 1.006 -0.773 1.006 c 0 0 -1.99 0.525 -1.99 0.525 c 0 0 -0.442 0.687 -0.442 0.687 c 0 0 0.935 1.143 0.935 1.143 c 0 0 1.888 0.264 1.888 0.264 c 0 0 0.385 1.491 0.385 1.491 c 0 0 2.354 0.396 2.354 0.396 c 0 0 0.57 0.73 0.57 0.73 c 0 0 -1.197 -0.003 -1.197 -0.003 c 0 0 -1.375 1.475 -1.375 1.475 c 0 0 -1.342 0.124 -1.342 0.124 c 0 0 -0.397 0.525 -0.397 0.525 c 0 0 0.45 0.688 0.45 0.688 c 0 0 6.57 2.831 6.57 2.831 c 0 0 1.081 1.471 1.081 1.471 c 0 0 3.26 0.627 3.26 0.627 c 0 0 0.39 0.95 0.39 0.95 c 0 0 1.965 -0.327 1.965 -0.327 c 0 0 0.724 1.225 0.724 1.225 c 0 0 4.001 0.998 4.001 0.998 c 0 0 -0.522 0.879 -0.522 0.879 c 0 0 0.117 1.904 0.117 1.904 c 0 0 3.919 3.499 3.919 3.499 c 0 0 0.91 -1.858 0.91 -1.858 c 0 0 0.663 -1.724 0.663 -1.724 c 0 0 -0.688 -1.585 -0.688 -1.585 c 0 0 -0.35 -4.63 -0.35 -4.63 c 0 0 -1.083 -2.091 -1.083 -2.091 c 0 0 0.858 -4.001 0.858 -4.001 c 0 0 1.969 -4.693 1.969 -4.693 c 0 0 -3.667 -3.257 -3.667 -3.257 c 0 0 0.702 -1.852 0.702 -1.852 c 0 0 -1.199 -1.354 -1.199 -1.354 c 0 0 1.889 -1.327 1.889 -1.327 c 0 0 -0.72 -0.627 -0.72 -0.627 c 0 0 1.104 -0.631 1.104 -0.631 c 0 0 2.287 1.521 2.287 1.521 c 0 0 11.929 1.271 11.929 1.271 c 0 0 5.31 -1.304 5.31 -1.304 c 0 0 5.733 2.047 5.733 2.047 c 0 0 1.45 1.393 1.45 1.393 c 0 0 1.654 -0.581 1.654 -0.581 c 0 0 1.726 -2.196 1.726 -2.196 c 0 0 -0.517 -1.926 -0.517 -1.926 c 0 0 1.047 -2.039 1.047 -2.039 c 0 0 -0.163 -3.493 -0.163 -3.493 c 0 0 0.727 -2.389 0.727 -2.389 c 0 0 -0.822 0.197 -0.822 0.197 c 0 0 0.415 -0.997 0.415 -0.997 c 0 0 -1.047 -1.056 -1.047 -1.056 c 0 0 0.4 -0.473 0.4 -0.473 c 0 0 -1.139 0.062 -1.139 0.062 c 0 0 -0.737 1.719 -0.737 1.719 c 0 0 -1.087 0.596 -1.087 0.596 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Biskra"
            },
            "8": {
                "path": "M 189.561 141.431 c 0 0 0.163 2.393 0.163 2.393 c 0 0 1.428 0.123 1.428 0.123 c 0 0 -0.542 2.863 -0.542 2.863 c 0 0 1.384 0.042 1.384 0.042 c 0 0 0.298 1.563 0.298 1.563 c 0 0 5.834 -3.103 5.834 -3.103 c 0 0 6.79 1.902 6.79 1.902 c 0 0 1.803 -1.33 1.803 -1.33 c 0 0 2.417 0.518 2.417 0.518 c 0 0 1.629 -2.4 1.629 -2.4 c 0 0 -0.953 4.385 -0.953 4.385 c 0 0 -2.081 -0.471 -2.081 -0.471 c 0 0 -1.103 0.817 -1.103 0.817 c 0 0 -1.05 2.219 -1.05 2.219 c 0 0 -0.139 4.177 -0.139 4.177 c 0 0 0.68 2.281 0.68 2.281 c 0 0 -0.686 0.065 -0.686 0.065 c 0 0 0.179 0.967 0.179 0.967 c 0 0 -0.602 0.846 -0.602 0.846 c 0 0 0.955 1.182 0.955 1.182 c 0 0 -1.242 1.209 -1.242 1.209 c 0 0 1.247 2.015 1.247 2.015 c 0 0 -1.014 1.204 -1.014 1.204 c 0 0 0.036 1.863 0.036 1.863 c 0 0 0.853 1.823 0.853 1.823 c 0 0 2.917 2.352 2.917 2.352 c 0 0 -0.818 2.98 -0.818 2.98 c 0 0 14.029 11.903 14.029 11.903 c 0 0 -8.624 9.693 -8.624 9.693 c 0 0 -3.966 6.909 -3.966 6.909 c 0 0 -10.189 7.171 -10.189 7.171 c 0 0 -1.53 5.245 -1.53 5.245 c 0 0 1.021 6.804 1.021 6.804 c 0 0 -0.608 2.722 -0.608 2.722 c 0 0 -5.818 4.933 -5.818 4.933 c 0 0 -11.195 0.456 -11.195 0.456 c 0 0 -13.243 3.621 -13.243 3.621 c 0 0 -6.827 9.299 -6.827 9.299 c 0 0 -6.535 4.925 -6.535 4.925 c 0 0 -1.732 3.771 -1.732 3.771 c 0 0 -6.146 7.526 -6.146 7.526 c 0 0 -3.367 10.625 -3.367 10.625 c 0 0 1.165 1.256 1.165 1.256 c 0 0 -13.244 -1.684 -13.244 -1.684 c 0 0 -3.001 -2.418 -3.001 -2.418 c 0 0 -5.835 -7.1 -5.835 -7.1 c 0 0 -0.084 -7.644 -0.084 -7.644 c 0 0 -6.775 -12.676 -6.775 -12.676 c 0 0 -5.777 -21.184 -5.777 -21.184 c 0 0 -5.817 -3.173 -5.817 -3.173 c 0 0 -8.409 -0.352 -8.409 -0.352 c 0 0 -4.977 -4.181 -4.977 -4.181 c 0 0 4.214 -5.384 4.214 -5.384 c 0 0 0.024 -1.372 0.024 -1.372 c 0 0 1.014 -1.498 1.014 -1.498 c 0 0 8.097 -5.763 8.097 -5.763 c 0 0 7.482 -3.241 7.482 -3.241 c 0 0 6.645 -5.965 6.645 -5.965 c 0 0 3.927 -1.254 3.927 -1.254 c 0 0 6.729 -0.776 6.729 -0.776 c 0 0 4.574 -1.715 4.574 -1.715 c 0 0 0.583 -0.765 0.583 -0.765 c 0 0 -1.006 -1.718 -1.006 -1.718 c 0 0 0.712 -1.927 0.712 -1.927 c 0 0 0.439 0.271 0.439 0.271 c 0 0 1.753 -2.209 1.753 -2.209 c 0 0 0.06 -2.135 0.06 -2.135 c 0 0 -0.201 -0.656 -0.201 -0.656 c 0 0 -0.495 0.514 -0.495 0.514 c 0 0 -0.386 -0.407 -0.386 -0.407 c 0 0 -0.456 -1.584 -0.456 -1.584 c 0 0 -0.47 0.188 -0.47 0.188 c 0 0 0.021 -1.495 0.021 -1.495 c 0 0 -0.024 1.793 -0.024 1.793 c 0 0 -0.667 0.211 -0.667 0.211 c 0 0 0.487 0.234 0.487 0.234 c 0 0 -0.779 -0.15 -0.779 -0.15 c 0 0 0.248 -1.646 0.248 -1.646 c 0 0 -0.643 -0.663 -0.643 -0.663 c 0 0 -0.118 0.998 -0.118 0.998 c 0 0 -0.614 -0.265 -0.614 -0.265 c 0 0 0.041 0.743 0.041 0.743 c 0 0 -0.644 -0.249 -0.644 -0.249 c 0 0 -0.354 0.62 -0.354 0.62 c 0 0 0.437 -2.005 0.437 -2.005 c 0 0 -0.625 -1.467 -0.625 -1.467 c 0 0 0.73 -0.664 0.73 -0.664 c 0 0 -0.554 -0.775 -0.554 -0.775 c 0 0 0.872 -1.707 0.872 -1.707 c 0 0 0.565 0.509 0.565 0.509 c 0 0 1.714 -1.251 1.714 -1.251 c 0 0 -0.12 -6.14 -0.12 -6.14 c 0 0 18.347 -3.483 18.347 -3.483 c 0 0 -2.126 -6.029 -2.126 -6.029 c 0 0 0.609 -2.241 0.609 -2.241 c 0 0 6.877 0.41 6.877 0.41 c 0 0 3.008 -1.097 3.008 -1.097 c 0 0 4.058 -0.094 4.058 -0.094 c 0 0 2.286 0.737 2.286 0.737 c 0 0 3.44 -0.906 3.44 -0.906 c 0 0 9.396 2.568 9.396 2.568 c 0 0 7.359 0.568 7.359 0.568 c 0 0 1.897 -1.269 1.897 -1.269 c 0 0 -1.222 -1.218 -1.222 -1.218 c 0 0 -1.895 0.225 -1.895 0.225 c 0 0 1.267 -1.027 1.267 -1.027 c 0 0 -0.083 -3.115 -0.083 -3.115 c 0 0 1.147 -1.937 1.147 -1.937 c 0 0 1.524 -0.259 1.524 -0.259 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Béchar"
            },
            "9": {
                "path": "M 284.26 36.7689 c 0 0 0.247 -1.279 0.247 -1.279 c 0 0 -0.585 -0.271 -0.585 -0.271 c 0 0 0.385 -0.414 0.385 -0.414 c 0 0 -0.471 -0.855 -0.471 -0.855 c 0 0 0.536 -0.479 0.536 -0.479 c 0 0 -0.888 0.351 -0.888 0.351 c 0 0 -0.756 -1.312 -0.756 -1.312 c 0 0 -1.009 0.771 -1.009 0.771 c 0 0 -0.61 -0.303 -0.61 -0.303 c 0 0 -0.7 1.808 -0.7 1.808 c 0 0 -1.118 0.075 -1.118 0.075 c 0 0 0.107 -1.082 0.107 -1.082 c 0 0 -1.49 1.068 -1.49 1.068 c 0 0 -3.771 -1.583 -3.771 -1.583 c 0 0 0.339 1.023 0.339 1.023 c 0 0 -2.109 0.599 -2.109 0.599 c 0 0 -1.479 1.646 -1.479 1.646 c 0 0 -1.06 0.141 -1.06 0.141 c 0 0 0.442 0.803 0.442 0.803 c 0 0 -0.447 0.64 -0.447 0.64 c 0 0 -1.568 -0.302 -1.568 -0.302 c 0 0 -1.037 1.464 -1.037 1.464 c 0 0 2.993 2.104 2.993 2.104 c 0 0 1.509 -1.087 1.509 -1.087 c 0 0 2.894 0.205 2.894 0.205 c 0 0 1.567 -1.178 1.567 -1.178 c 0 0 0.671 1.507 0.671 1.507 c 0 0 1.48 0.008 1.48 0.008 c 0 0 0.866 -0.967 0.866 -0.967 c 0 0 -0.188 -1.356 -0.188 -1.356 c 0 0 0.474 0.955 0.474 0.955 c 0 0 0.732 -0.597 0.732 -0.597 c 0 0 0.693 0.698 0.693 0.698 c 0 0 1.156 -1.154 1.156 -1.154 c 0 0 0.085 -1.381 0.085 -1.381 c 0 0 1.631 0.27 1.631 0.27 c 0 0 0.479 -0.536 0.479 -0.536 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Blida"
            },
            "10": {
                "path": "M 300.562 48.4998 c 0 0 1.468 -1.134 1.468 -1.134 c 0 0 0.186 -2.385 0.186 -2.385 c 0 0 1.708 -0.861 1.708 -0.861 c 0 0 0.796 -1.241 0.796 -1.241 c 0 0 1.361 0.091 1.361 0.091 c 0 0 0.781 -0.917 0.781 -0.917 c 0 0 0.224 -0.601 0.224 -0.601 c 0 0 -0.75 -0.99 -0.75 -0.99 c 0 0 0.742 -0.488 0.742 -0.488 c 0 0 0.148 -1.305 0.148 -1.305 c 0 0 -0.679 -1.324 -0.679 -1.324 c 0 0 -2.513 0.268 -2.513 0.268 c 0 0 -0.274 -0.535 -0.274 -0.535 c 0 0 -1.008 0.543 -1.008 0.543 c 0 0 -5.654 0.163 -5.654 0.163 c 0 0 -1.333 -0.33 -1.333 -0.33 c 0 0 -0.937 -1.637 -0.937 -1.637 c 0 0 -0.781 0.04 -0.781 0.04 c 0 0 -0.892 -1.236 -0.892 -1.236 c 0 0 -4.715 -0.709 -4.715 -0.709 c 0 0 -0.479 0.983 -0.479 0.983 c 0 0 -1.366 0.715 -1.366 0.715 c 0 0 -2.088 -0.118 -2.088 -0.118 c 0 0 -0.247 1.278 -0.247 1.278 c 0 0 2.723 2.63 2.723 2.63 c 0 0 1.561 -1.479 1.561 -1.479 c 0 0 1.357 0.704 1.357 0.704 c 0 0 -0.438 0.687 -0.438 0.687 c 0 0 0.997 1.391 0.997 1.391 c 0 0 -1.07 0.599 -1.07 0.599 c 0 0 -0.442 1.267 -0.442 1.267 c 0 0 1.07 0.978 1.07 0.978 c 0 0 -0.182 0.811 -0.182 0.811 c 0 0 -1.427 0.413 -1.427 0.413 c 0 0 -0.228 0.854 -0.228 0.854 c 0 0 0.655 1.041 0.655 1.041 c 0 0 -0.407 0.485 -0.407 0.485 c 0 0 -0.899 0.935 -0.899 0.935 c 0 0 -1.014 -0.015 -1.014 -0.015 c 0 0 0.479 0.781 0.479 0.781 c 0 0 2.788 0.435 2.788 0.435 c 0 0 1.405 2.648 1.405 2.648 c 0 0 0.532 -0.81 0.532 -0.81 c 0 0 1.537 0.153 1.537 0.153 c 0 0 0.654 0.925 0.654 0.925 c 0 0 1.071 0.222 1.071 0.222 c 0 0 0.351 1.005 0.351 1.005 c 0 0 0.802 0.049 0.802 0.049 c 0 0 1.27 -1.216 1.27 -1.216 c 0 0 2.542 0.892 2.542 0.892 c 0 0 -0.443 -1.387 -0.443 -1.387 c 0 0 1.058 -3.268 1.058 -3.268 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Bouira"
            },
            "11": {
                "path": "M 340.615 208.544 c 0 0 -43.124 33.261 -43.124 33.261 c 0 0 0.146 -0.413 0.146 -0.413 c 0 0 -17.526 -14.179 -17.526 -14.179 c 0 0 -11.145 0.971 -11.145 0.971 c 0 0 -10.264 3.806 -10.264 3.806 c 0 0 -0.784 10.595 -0.784 10.595 c 0 0 -1.104 3.51 -1.104 3.51 c 0 0 -3.164 5.032 -3.164 5.032 c 0 0 -0.81 10.075 -0.81 10.075 c 0 0 -1.856 3.177 -1.856 3.177 c 0 0 0.051 6.213 0.051 6.213 c 0 0 1.848 2.781 1.848 2.781 c 0 0 -2.565 6.435 -2.565 6.435 c 0 0 -0.465 8.885 -0.465 8.885 c 0 0 -2.35 1.68 -2.35 1.68 c 0 0 -0.139 -0.823 -0.139 -0.823 c 0 0 -1.748 0.209 -1.748 0.209 c 0 0 -0.883 -0.813 -0.883 -0.813 c 0 0 -2.635 0.807 -2.635 0.807 c 0 0 -1.19 2.448 -1.19 2.448 c 0 0 -7.482 7.684 -7.482 7.684 c 0 0 2.714 6.037 2.714 6.037 c 0 0 8.571 12.137 8.571 12.137 c 0 0 0.259 38.387 0.259 38.387 c 0 0 -0.63 56.825 -0.63 56.825 c 0 0 4.163 -0.675 4.163 -0.675 c 0 0 4.417 0.47 4.417 0.47 c 0 0 1.521 7.254 1.521 7.254 c 0 0 6.095 6.187 6.095 6.187 c 0 0 2.49 5.061 2.49 5.061 c 0 0 1.682 5.848 1.682 5.848 c 0 0 -0.031 6.131 -0.031 6.131 c 0 0 2.249 3.263 2.249 3.263 c 0 0 3.133 7.454 3.133 7.454 c 0 0 0.496 2.892 0.496 2.892 c 0 0 -2.249 0.725 -2.249 0.725 c 0 0 1.485 0.058 1.485 0.058 c 0 0 2.693 1.431 2.693 1.431 c 0 0 3.086 -0.021 3.086 -0.021 c 0 0 6.312 1.33 6.312 1.33 c 0 0 6.54 3.166 6.54 3.166 c 0 0 -0.412 3.706 -0.412 3.706 c 0 0 0.537 0.907 0.537 0.907 c 0 0 -0.542 1.742 -0.542 1.742 c 0 0 0.979 1.557 0.979 1.557 c 0 0 -0.357 0.987 -0.357 0.987 c 0 0 0.917 2.147 0.917 2.147 c 0 0 -1.474 1.56 -1.474 1.56 c 0 0 -0.373 1.711 -0.373 1.711 c 0 0 -2.086 2.864 -2.086 2.864 c 0 0 0.506 1.159 0.506 1.159 c 0 0 5.114 3.9 5.114 3.9 c 0 0 60.512 -13.771 60.512 -13.771 c 0 0 38.057 -37.723 38.057 -37.723 c 0 0 64.331 -46.843 64.331 -46.843 c 0 0 -0.719 -20.563 -0.719 -20.563 c 0 0 -7.48 -4.23 -7.48 -4.23 c 0 0 -2.209 0.049 -2.209 0.049 c 0 0 -1.657 -1.011 -1.657 -1.011 c 0 0 -13.903 0.818 -13.903 0.818 c 0 0 -12.891 9.613 -12.891 9.613 c 0 0 -17.177 4.161 -17.177 4.161 c 0 0 -6.243 -4.392 -6.243 -4.392 c 0 0 1.974 -2.233 1.974 -2.233 c 0 0 -5.578 -12.361 -5.578 -12.361 c 0 0 -1.04 -10.938 -1.04 -10.938 c 0 0 0.237 -3.784 0.237 -3.784 c 0 0 -5.594 -8.032 -5.594 -8.032 c 0 0 -4.477 -0.141 -4.477 -0.141 c 0 0 -2.836 -2.179 -2.836 -2.179 c 0 0 -3.687 -6.237 -3.687 -6.237 c 0 0 -1.628 -4.169 -1.628 -4.169 c 0 0 -5.061 -6.142 -5.061 -6.142 c 0 0 -5.932 -16.141 -5.932 -16.141 c 0 0 -1.532 -1.132 -1.532 -1.132 c 0 0 -0.138 -1.005 -0.138 -1.005 c 0 0 -2.248 -0.6 -2.248 -0.6 c 0 0 -1.181 -1.556 -1.181 -1.556 c 0 0 1.06 -3.062 1.06 -3.062 c 0 0 2.819 -2.351 2.819 -2.351 c 0 0 -0.418 -1.914 -0.418 -1.914 c 0 0 -12.688 -11.21 -12.688 -11.21 c 0 0 -0.039 -8.717 -0.039 -8.717 c 0 0 -3.73 -17.581 -3.73 -17.581 c 0 0 1.772 -8.354 1.772 -8.354 c 0 0 -1.292 -33.81 -1.292 -33.81 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Tamanrasset"
            },
            "12": {
                "path": "M 377.235 49.5529 c 0 0 0.397 -1.363 0.397 -1.363 c 0 0 1.877 1.4 1.877 1.4 c 0 0 1.622 -0.03 1.622 -0.03 c 0 0 2.103 -2.353 2.103 -2.353 c 0 0 1.256 0.156 1.256 0.156 c 0 0 2.499 -1.112 2.499 -1.112 c 0 0 2.176 1.081 2.176 1.081 c 0 0 -0.663 1.284 -0.663 1.284 c 0 0 0.469 0.414 0.469 0.414 c 0 0 -0.029 4.161 -0.029 4.161 c 0 0 1.961 1.389 1.961 1.389 c 0 0 0.321 3.785 0.321 3.785 c 0 0 0.61 0.972 0.61 0.972 c 0 0 -1.389 1.917 -1.389 1.917 c 0 0 0.063 2.599 0.063 2.599 c 0 0 2.079 1.616 2.079 1.616 c 0 0 1.524 0.072 1.524 0.072 c 0 0 -2.348 3.782 -2.348 3.782 c 0 0 -0.661 3.932 -0.661 3.932 c 0 0 -1.401 0.803 -1.401 0.803 c 0 0 0.931 3.721 0.931 3.721 c 0 0 0.876 0.981 0.876 0.981 c 0 0 -1.63 1.313 -1.63 1.313 c 0 0 0.909 0.787 0.909 0.787 c 0 0 -1.388 1.372 -1.388 1.372 c 0 0 0.229 0.686 0.229 0.686 c 0 0 -1.096 0.116 -1.096 0.116 c 0 0 -1.104 1.673 -1.104 1.673 c 0 0 -5.352 2.981 -5.352 2.981 c 0 0 -0.735 4.246 -0.735 4.246 c 0 0 -8.26 -0.416 -8.26 -0.416 c 0 0 -4.263 -1.484 -4.263 -1.484 c 0 0 0.773 -5.083 0.773 -5.083 c 0 0 2.108 -3.938 2.108 -3.938 c 0 0 0.024 -1.697 0.024 -1.697 c 0 0 -0.637 -0.956 -0.637 -0.956 c 0 0 0.749 -2.004 0.749 -2.004 c 0 0 -0.869 -2.387 -0.869 -2.387 c 0 0 -1.271 -0.098 -1.271 -0.098 c 0 0 -0.661 0.97 -0.661 0.97 c 0 0 -0.441 1.352 -0.441 1.352 c 0 0 0.5 -0.146 0.5 -0.146 c 0 0 -0.088 1.582 -0.088 1.582 c 0 0 -0.908 -2.111 -0.908 -2.111 c 0 0 1.39 -3.602 1.39 -3.602 c 0 0 1.306 -0.817 1.306 -0.817 c 0 0 1.429 -2.436 1.429 -2.436 c 0 0 -1.051 -1.558 -1.051 -1.558 c 0 0 0.787 -1.188 0.787 -1.188 c 0 0 -0.763 -0.573 -0.763 -0.573 c 0 0 -0.117 -2.443 -0.117 -2.443 c 0 0 3.133 -1.132 3.133 -1.132 c 0 0 0.624 -0.112 0.624 -0.112 c 0 0 1.879 -2.798 1.879 -2.798 c 0 0 4.046 -1.621 4.046 -1.621 c 0 0 -1.311 -2.658 -1.311 -2.658 c 0 0 -0.142 -1.094 -0.142 -1.094 c 0 0 0.772 -0.688 0.772 -0.688 c 0 0 -1.615 -0.739 -1.615 -0.739 c 0 0 -0.531 -2.116 -0.531 -2.116 c 0 0 -0.698 -0.39 -0.698 -0.39 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Tébessa"
            },
            "13": {
                "path": "M 193.764 72.7758 c 0 0 -0.686 0.069 -0.686 0.069 c 0 0 -0.264 -0.909 -0.264 -0.909 c 0 0 -3.488 -1.748 -3.488 -1.748 c 0 0 -0.331 0.33 -0.331 0.33 c 0 0 -0.372 -0.771 -0.372 -0.771 c 0 0 -1.081 0.455 -1.081 0.455 c 0 0 -2.338 -0.793 -2.338 -0.793 c 0 0 -0.918 1.336 -0.918 1.336 c 0 0 -1.082 0.265 -1.082 0.265 c 0 0 -1.053 -0.668 -1.053 -0.668 c 0 0 0.202 -0.954 0.202 -0.954 c 0 0 -0.848 -0.622 -0.848 -0.622 c 0 0 -3.998 2.927 -3.998 2.927 c 0 0 -0.671 -0.354 -0.671 -0.354 c 0 0 -2.174 1.167 -2.174 1.167 c 0 0 -3.447 0.248 -3.447 0.248 c 0 0 -1.838 -0.844 -1.838 -0.844 c 0 0 -1.167 0.414 -1.167 0.414 c 0 0 -0.104 0.95 -0.104 0.95 c 0 0 2.603 2.448 2.603 2.448 c 0 0 1.057 0.802 1.057 0.802 c 0 0 1.388 -0.219 1.388 -0.219 c 0 0 0.027 1.49 0.027 1.49 c 0 0 1.617 0.96 1.617 0.96 c 0 0 0.088 0.883 0.088 0.883 c 0 0 3.129 1.718 3.129 1.718 c 0 0 -2.502 3.209 -2.502 3.209 c 0 0 0.771 0.313 0.771 0.313 c 0 0 1.368 2.382 1.368 2.382 c 0 0 1.285 0.582 1.285 0.582 c 0 0 -2.119 2.566 -2.119 2.566 c 0 0 1.582 2.156 1.582 2.156 c 0 0 -0.213 1.807 -0.213 1.807 c 0 0 1.198 3.756 1.198 3.756 c 0 0 3.61 -2.621 3.61 -2.621 c 0 0 4.992 0.022 4.992 0.022 c 0 0 1.227 -1.408 1.227 -1.408 c 0 0 1.529 -0.482 1.529 -0.482 c 0 0 6.093 -5.633 6.093 -5.633 c 0 0 -0.362 -0.793 -0.362 -0.793 c 0 0 -0.956 -0.198 -0.956 -0.198 c 0 0 1.609 -0.95 1.609 -0.95 c 0 0 1.285 -2.754 1.285 -2.754 c 0 0 -0.23 -0.686 -0.23 -0.686 c 0 0 0.496 0.037 0.496 0.037 c 0 0 -0.273 -1.005 -0.273 -1.005 c 0 0 -2.376 0.271 -2.376 0.271 c 0 0 0.434 -3.193 0.434 -3.193 c 0 0 -1.177 0.239 -1.177 0.239 c 0 0 0.804 -1.134 0.804 -1.134 c 0 0 -1.191 -0.046 -1.191 -0.046 c 0 0 -0.506 -1.828 -0.506 -1.828 c 0 0 1.313 -2.126 1.313 -2.126 c 0 0 -1.942 -1.063 -1.942 -1.063 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Tlemcen"
            },
            "14": {
                "path": "M 258.955 61.8178 c 0 0 -1.327 0.262 -1.327 0.262 c 0 0 0.221 1.396 0.221 1.396 c 0 0 6.776 4.105 6.776 4.105 c 0 0 1.052 1.839 1.052 1.839 c 0 0 2.688 -2.3 2.688 -2.3 c 0 0 1.052 0.797 1.052 0.797 c 0 0 0.327 1.125 0.327 1.125 c 0 0 1.748 0.418 1.748 0.418 c 0 0 -0.01 1.521 -0.01 1.521 c 0 0 -0.677 0.26 -0.677 0.26 c 0 0 -1.121 2.251 -1.121 2.251 c 0 0 1.432 1.277 1.432 1.277 c 0 0 -3.229 1.273 -3.229 1.273 c 0 0 -1.447 4.661 -1.447 4.661 c 0 0 -1.47 0.458 -1.47 0.458 c 0 0 0.167 2.428 0.167 2.428 c 0 0 -3.015 0.372 -3.015 0.372 c 0 0 -0.437 1.044 -0.437 1.044 c 0 0 -1.978 0.888 -1.978 0.888 c 0 0 -2.348 2.563 -2.348 2.563 c 0 0 -4.877 1.753 -4.877 1.753 c 0 0 -1.839 2.088 -1.839 2.088 c 0 0 -0.365 2.438 -0.365 2.438 c 0 0 -1.645 0.978 -1.645 0.978 c 0 0 -0.272 -1.14 -0.272 -1.14 c 0 0 -3.774 2.229 -3.774 2.229 c 0 0 0.808 1.346 0.808 1.346 c 0 0 -2.194 1.46 -2.194 1.46 c 0 0 -1.118 -1.577 -1.118 -1.577 c 0 0 -0.216 -1.843 -0.216 -1.843 c 0 0 -5.541 0.295 -5.541 0.295 c 0 0 0.672 -4.883 0.672 -4.883 c 0 0 -3.973 -0.827 -3.973 -0.827 c 0 0 1.657 -2.906 1.657 -2.906 c 0 0 -2.975 -1.225 -2.975 -1.225 c 0 0 -0.316 -0.531 -0.316 -0.531 c 0 0 0.755 -0.53 0.755 -0.53 c 0 0 -0.449 -1.181 -0.449 -1.181 c 0 0 -1.062 0.458 -1.062 0.458 c 0 0 -1.729 -3.065 -1.729 -3.065 c 0 0 0.385 -1.708 0.385 -1.708 c 0 0 -0.557 -0.922 -0.557 -0.922 c 0 0 3.161 -2.329 3.161 -2.329 c 0 0 -1.595 -2.433 -1.595 -2.433 c 0 0 -1.402 -0.632 -1.402 -0.632 c 0 0 -0.281 -0.991 -0.281 -0.991 c 0 0 -3.297 0.388 -3.297 0.388 c 0 0 1.071 -1.77 1.071 -1.77 c 0 0 1.552 -1.101 1.552 -1.101 c 0 0 -0.245 -0.949 -0.245 -0.949 c 0 0 1.176 -1.409 1.176 -1.409 c 0 0 1.083 -0.161 1.083 -0.161 c 0 0 1.521 0.789 1.521 0.789 c 0 0 1.112 -0.354 1.112 -0.354 c 0 0 0.873 -2.104 0.873 -2.104 c 0 0 0.688 -0.28 0.688 -0.28 c 0 0 -1.49 -1.555 -1.49 -1.555 c 0 0 0.9 -0.182 0.9 -0.182 c 0 0 1.728 -2.878 1.728 -2.878 c 0 0 1.215 -0.098 1.215 -0.098 c 0 0 0.112 -0.867 0.112 -0.867 c 0 0 0.812 0.11 0.812 0.11 c 0 0 0.164 -0.913 0.164 -0.913 c 0 0 2.058 0.206 2.058 0.206 c 0 0 0.567 -0.985 0.567 -0.985 c 0 0 1.449 -0.572 1.449 -0.572 c 0 0 1.345 1.67 1.345 1.67 c 0 0 0.589 -2.298 0.589 -2.298 c 0 0 1.271 0.93 1.271 0.93 c 0 0 0.538 -0.303 0.538 -0.303 c 0 0 1.353 0.765 1.353 0.765 c 0 0 0.063 1.414 0.063 1.414 c 0 0 1.952 -0.174 1.952 -0.174 c 0 0 1.046 1.72 1.046 1.72 c 0 0 0.813 0.153 0.813 0.153 c 0 0 0.172 -1.047 0.172 -1.047 c 0 0 0.958 0.973 0.958 0.973 c 0 0 3.798 -0.432 3.798 -0.432 c 0 0 2.435 -1.337 2.435 -1.337 c 0 0 -0.56 0.67 -0.56 0.67 c 0 0 1.55 0.067 1.55 0.067 c 0 0 -0.034 0.954 -0.034 0.954 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Tiaret"
            },
            "15": {
                "path": "M 310.88 26.4728 c 0 0 1.398 1.952 1.398 1.952 c 0 0 0.068 1.338 0.068 1.338 c 0 0 -0.67 0.654 -0.67 0.654 c 0 0 -0.705 -0.539 -0.705 -0.539 c 0 0 -1.229 0.36 -1.229 0.36 c 0 0 -0.147 0.646 -0.147 0.646 c 0 0 1.777 0.943 1.777 0.943 c 0 0 -1.26 1.581 -1.26 1.581 c 0 0 0.406 0.661 0.406 0.661 c 0 0 -2.179 2.442 -2.179 2.442 c 0 0 -1.795 0.831 -1.795 0.831 c 0 0 -2.514 0.268 -2.514 0.268 c 0 0 -0.273 -0.535 -0.273 -0.535 c 0 0 -1.01 0.543 -1.01 0.543 c 0 0 -5.653 0.163 -5.653 0.163 c 0 0 -1.334 -0.33 -1.334 -0.33 c 0 0 -0.935 -1.637 -0.935 -1.637 c 0 0 -0.782 0.04 -0.782 0.04 c 0 0 -0.892 -1.236 -0.892 -1.236 c 0 0 -0.219 -1.694 -0.219 -1.694 c 0 0 1.417 -0.319 1.417 -0.319 c 0 0 0.845 0.592 0.845 0.592 c 0 0 -0.163 -1.288 -0.163 -1.288 c 0 0 1.354 0.313 1.354 0.313 c 0 0 -0.771 -0.862 -0.771 -0.862 c 0 0 0.386 -1.441 0.386 -1.441 c 0 0 1.042 0.231 1.042 0.231 c 0 0 0.179 -0.604 0.179 -0.604 c 0 0 0.945 -0.077 0.945 -0.077 c 0 0 0.045 -0.779 0.045 -0.779 c 0 0 1.354 -1.163 1.354 -1.163 c 0 0 -0.135 -1.239 -0.135 -1.239 c 0 0 5.439 -0.32 5.439 -0.32 c 0 0 1.851 0.426 1.851 0.426 c 0 0 0.986 -0.547 0.986 -0.547 c 0 0 3.174 0.626 3.174 0.626 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Tizi-Ouzou"
            },
            "16": {
                "path": "M 285.549 29.5858 c 0 0 -0.27 0.609 -0.27 0.609 c 0 0 0.656 -0.216 0.656 -0.216 c 0 0 0.031 1.021 0.031 1.021 c 0 0 -2.278 0.745 -2.278 0.745 c 0 0 -0.66 -0.482 -0.66 -0.482 c 0 0 0.391 0.701 0.391 0.701 c 0 0 -0.688 0.546 -0.688 0.546 c 0 0 -1.01 0.771 -1.01 0.771 c 0 0 -0.609 -0.302 -0.609 -0.302 c 0 0 -0.701 1.807 -0.701 1.807 c 0 0 -1.117 0.075 -1.117 0.075 c 0 0 0.107 -1.082 0.107 -1.082 c 0 0 -1.49 1.068 -1.49 1.068 c 0 0 -3.771 -1.583 -3.771 -1.583 c 0 0 -0.135 -1.446 -0.135 -1.446 c 0 0 0.607 -1.614 0.607 -1.614 c 0 0 0.9 -0.174 0.9 -0.174 c 0 0 0.272 -0.944 0.272 -0.944 c 0 0 1.205 -0.234 1.205 -0.234 c 0 0 1.831 0.088 1.831 0.088 c 0 0 0.494 1.2 0.494 1.2 c 0 0 1.162 0.524 1.162 0.524 c 0 0 2.119 -0.622 2.119 -0.622 c 0 0 0.155 -1.295 0.155 -1.295 c 0 0 2.799 0.839 2.799 0.839 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Alger"
            },
            "17": {
                "path": "M 303.711 95.2648 c 0 0 -4.303 -3.584 -4.303 -3.584 c 0 0 0.313 -2.084 0.313 -2.084 c 0 0 -1.836 -1.982 -1.836 -1.982 c 0 0 0.299 -2.041 0.299 -2.041 c 0 0 -0.719 -4.249 -0.719 -4.249 c 0 0 -3.906 -0.974 -3.906 -0.974 c 0 0 -1.411 0.479 -1.411 0.479 c 0 0 -0.14 -1.652 -0.14 -1.652 c 0 0 -1.402 -0.321 -1.402 -0.321 c 0 0 0.209 -2.972 0.209 -2.972 c 0 0 -0.698 -0.953 -0.698 -0.953 c 0 0 0.551 -0.067 0.551 -0.067 c 0 0 0.504 -1.54 0.504 -1.54 c 0 0 -1.839 0.736 -1.839 0.736 c 0 0 -1.138 -3.13 -1.138 -3.13 c 0 0 4.281 -3.605 4.281 -3.605 c 0 0 -0.424 -1.941 -0.424 -1.941 c 0 0 0.865 -0.632 0.865 -0.632 c 0 0 0.075 -1.772 0.075 -1.772 c 0 0 -4.719 -3.806 -4.719 -3.806 c 0 0 -1.903 -1.954 -1.903 -1.954 c 0 0 -0.313 -1.257 -0.313 -1.257 c 0 0 -1.091 0.049 -1.091 0.049 c 0 0 -0.854 -1.716 -0.854 -1.716 c 0 0 -1.031 1.021 -1.031 1.021 c 0 0 0.104 1.206 0.104 1.206 c 0 0 -0.753 1.37 -0.753 1.37 c 0 0 -2.786 0.7 -2.786 0.7 c 0 0 -0.185 -2.199 -0.185 -2.199 c 0 0 -0.699 0.144 -0.699 0.144 c 0 0 -0.693 -2.337 -0.693 -2.337 c 0 0 -2.585 0.707 -2.585 0.707 c 0 0 0.677 5.005 0.677 5.005 c 0 0 -0.578 -0.259 -0.578 -0.259 c 0 0 -1.83 1.359 -1.83 1.359 c 0 0 -1.605 2.564 -1.605 2.564 c 0 0 -1.292 0.661 -1.292 0.661 c 0 0 -2.698 -1.908 -2.698 -1.908 c 0 0 -0.229 0.56 -0.229 0.56 c 0 0 -2.476 0.813 -2.476 0.813 c 0 0 -2.139 0.167 -2.139 0.167 c 0 0 -0.658 -2.362 -0.658 -2.362 c 0 0 -3.699 0.315 -3.699 0.315 c 0 0 -1.327 0.263 -1.327 0.263 c 0 0 0.221 1.396 0.221 1.396 c 0 0 6.777 4.106 6.777 4.106 c 0 0 1.051 1.838 1.051 1.838 c 0 0 2.688 -2.299 2.688 -2.299 c 0 0 1.052 0.796 1.052 0.796 c 0 0 0.327 1.125 0.327 1.125 c 0 0 1.748 0.418 1.748 0.418 c 0 0 -0.01 1.521 -0.01 1.521 c 0 0 -0.677 0.259 -0.677 0.259 c 0 0 -1.122 2.251 -1.122 2.251 c 0 0 1.432 1.277 1.432 1.277 c 0 0 -3.229 1.273 -3.229 1.273 c 0 0 -1.446 4.661 -1.446 4.661 c 0 0 -1.471 0.458 -1.471 0.458 c 0 0 0.169 2.428 0.169 2.428 c 0 0 0.566 6.331 0.566 6.331 c 0 0 1.244 3.59 1.244 3.59 c 0 0 0.441 -0.086 0.441 -0.086 c 0 0 3.376 4.766 3.376 4.766 c 0 0 1.209 0.325 1.209 0.325 c 0 0 2.258 -1.065 2.258 -1.065 c 0 0 0.695 0.262 0.695 0.262 c 0 0 -0.026 -1.447 -0.026 -1.447 c 0 0 2.266 -2.289 2.266 -2.289 c 0 0 1.456 0.758 1.456 0.758 c 0 0 -0.123 0.432 -0.123 0.432 c 0 0 1.253 -0.433 1.253 -0.433 c 0 0 2.38 6.709 2.38 6.709 c 0 0 -0.146 1.212 -0.146 1.212 c 0 0 1.604 3.201 1.604 3.201 c 0 0 5.243 1.505 5.243 1.505 c 0 0 3.983 3.588 3.983 3.588 c 0 0 1.407 2.328 1.407 2.328 c 0 0 8.125 3.061 8.125 3.061 c 0 0 1.49 1.064 1.49 1.064 c 0 0 4.01 3.915 4.01 3.915 c 0 0 3.191 5.374 3.191 5.374 c 0 0 11.872 3.224 11.872 3.224 c 0 0 -2.209 -11.442 -2.209 -11.442 c 0 0 2.42 -5.131 2.42 -5.131 c 0 0 -0.116 -1.902 -0.116 -1.902 c 0 0 0.521 -0.88 0.521 -0.88 c 0 0 -4 -0.997 -4 -0.997 c 0 0 -0.725 -1.226 -0.725 -1.226 c 0 0 -1.964 0.328 -1.964 0.328 c 0 0 -0.39 -0.95 -0.39 -0.95 c 0 0 -3.261 -0.627 -3.261 -0.627 c 0 0 -1.081 -1.472 -1.081 -1.472 c 0 0 -6.57 -2.83 -6.57 -2.83 c 0 0 -0.45 -0.689 -0.45 -0.689 c 0 0 0.395 -0.524 0.395 -0.524 c 0 0 1.344 -0.124 1.344 -0.124 c 0 0 1.375 -1.476 1.375 -1.476 c 0 0 1.195 0.003 1.195 0.003 c 0 0 -0.568 -0.73 -0.568 -0.73 c 0 0 -2.354 -0.395 -2.354 -0.395 c 0 0 -0.386 -1.492 -0.386 -1.492 c 0 0 -1.887 -0.264 -1.887 -0.264 c 0 0 -0.935 -1.142 -0.935 -1.142 c 0 0 0.443 -0.693 0.443 -0.693 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Djelfa"
            },
            "18": {
                "path": "M 335.112 34.2048 c 0 0 1.112 -0.339 1.112 -0.339 c 0 0 1.367 0.723 1.367 0.723 c 0 0 1.504 -0.446 1.504 -0.446 c 0 0 1.242 -1.671 1.242 -1.671 c 0 0 4.855 0.813 4.855 0.813 c 0 0 1.86 -1.232 1.86 -1.232 c 0 0 0.435 0.64 0.435 0.64 c 0 0 2.741 0.479 2.741 0.479 c 0 0 -0.254 -1.387 -0.254 -1.387 c 0 0 0.828 -0.194 0.828 -0.194 c 0 0 0.3 -0.784 0.3 -0.784 c 0 0 -2.966 -1.426 -2.966 -1.426 c 0 0 -0.699 -3.309 -0.699 -3.309 c 0 0 -1.636 -0.354 -1.636 -0.354 c 0 0 0.278 -1.183 0.278 -1.183 c 0 0 -0.458 -0.661 -0.458 -0.661 c 0 0 -5.771 2.994 -5.771 2.994 c 0 0 -3.482 0.854 -3.482 0.854 c 0 0 -0.857 -0.566 -0.857 -0.566 c 0 0 -1.676 0.329 -1.676 0.329 c 0 0 -2.381 1.442 -2.381 1.442 c 0 0 -1.033 2.037 -1.033 2.037 c 0 0 -1.852 0.936 -1.852 0.936 c 0 0 0.027 1.315 0.027 1.315 c 0 0 0.917 0.194 0.917 0.194 c 0 0 0.751 -0.023 0.751 -0.023 c 0 0 0.402 1.854 0.402 1.854 c 0 0 0.979 0.076 0.979 0.076 c 0 0 0.992 -0.957 0.992 -0.957 c 0 0 1.248 0.676 1.248 0.676 c 0 0 1.227 -0.83 1.227 -0.83 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Jijel"
            },
            "19": {
                "path": "M 335.112 34.2048 c 0 0 0.558 0.717 0.558 0.717 c 0 0 -0.125 2.048 -0.125 2.048 c 0 0 1.244 0.953 1.244 0.953 c 0 0 -0.114 1.348 -0.114 1.348 c 0 0 1.395 0.426 1.395 0.426 c 0 0 -0.097 1.172 -0.097 1.172 c 0 0 2.188 2.367 2.188 2.367 c 0 0 -0.978 0.521 -0.978 0.521 c 0 0 0.049 1.868 0.049 1.868 c 0 0 1.715 0.399 1.715 0.399 c 0 0 0.284 2.085 0.284 2.085 c 0 0 -0.688 0.604 -0.688 0.604 c 0 0 1.162 1.212 1.162 1.212 c 0 0 -1.2 1.294 -1.2 1.294 c 0 0 -0.965 0.569 -0.965 0.569 c 0 0 0.444 1.163 0.444 1.163 c 0 0 -2.806 -2.418 -2.806 -2.418 c 0 0 -1.214 0.316 -1.214 0.316 c 0 0 -1.424 1.56 -1.424 1.56 c 0 0 0.121 0.773 0.121 0.773 c 0 0 1.212 0.402 1.212 0.402 c 0 0 -0.792 1.303 -0.792 1.303 c 0 0 -0.682 -0.238 -0.682 -0.238 c 0 0 -0.502 0.541 -0.502 0.541 c 0 0 -2.294 -0.948 -2.294 -0.948 c 0 0 -0.241 0.685 -0.241 0.685 c 0 0 -0.797 -0.078 -0.797 -0.078 c 0 0 -1.382 1.093 -1.382 1.093 c 0 0 0.234 1.001 0.234 1.001 c 0 0 -0.78 1.759 -0.78 1.759 c 0 0 -1.127 -0.334 -1.127 -0.334 c 0 0 -3.493 -0.469 -3.493 -0.469 c 0 0 -0.547 -0.806 -0.547 -0.806 c 0 0 0.417 -0.537 0.417 -0.537 c 0 0 -0.486 -0.518 -0.486 -0.518 c 0 0 -1.107 0.239 -1.107 0.239 c 0 0 -1.474 -1.041 -1.474 -1.041 c 0 0 0.169 -0.628 0.169 -0.628 c 0 0 -0.018 -1.602 -0.018 -1.602 c 0 0 2.088 -0.288 2.088 -0.288 c 0 0 -0.484 -2.927 -0.484 -2.927 c 0 0 1.669 -2.858 1.669 -2.858 c 0 0 -0.97 -0.972 -0.97 -0.972 c 0 0 0.127 -2.078 0.127 -2.078 c 0 0 -0.963 -0.273 -0.963 -0.273 c 0 0 -1.48 -2.546 -1.48 -2.546 c 0 0 -1.203 -0.362 -1.203 -0.362 c 0 0 -0.961 0.653 -0.961 0.653 c 0 0 -2.854 0.298 -2.854 0.298 c 0 0 -0.779 -0.983 -0.779 -0.983 c 0 0 0.302 -1.874 0.302 -1.874 c 0 0 -1.26 -0.672 -1.26 -0.672 c 0 0 2.517 -1.449 2.517 -1.449 c 0 0 0.048 -1.349 0.048 -1.349 c 0 0 3.62 0.479 3.62 0.479 c 0 0 0.447 -1.378 0.447 -1.378 c 0 0 0.928 0.088 0.928 0.088 c 0 0 0.039 -0.447 0.039 -0.447 c 0 0 2.159 1.465 2.159 1.465 c 0 0 -0.535 0.692 -0.535 0.692 c 0 0 -0.024 2.691 -0.024 2.691 c 0 0 0.57 -0.199 0.57 -0.199 c 0 0 -0.025 0.937 -0.025 0.937 c 0 0 1.656 -0.241 1.656 -0.241 c 0 0 0.748 -0.375 0.748 -0.375 c 0 0 -0.471 -0.92 -0.471 -0.92 c 0 0 1.314 -1.474 1.314 -1.474 c 0 0 -0.252 -0.684 -0.252 -0.684 c 0 0 2.389 -1.072 2.389 -1.072 c 0 0 0.184 -1.478 0.184 -1.478 c 0 0 0.751 -0.023 0.751 -0.023 c 0 0 0.403 1.854 0.403 1.854 c 0 0 0.979 0.077 0.979 0.077 c 0 0 0.992 -0.958 0.992 -0.958 c 0 0 1.248 0.676 1.248 0.676 c 0 0 1.224 -0.831 1.224 -0.831 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Sétif"
            },
            "20": {
                "path": "M 233.026 90.7739 c 0 0 -2.853 -0.734 -2.853 -0.734 c 0 0 -4.583 3.134 -4.583 3.134 c 0 0 -1.732 -2.296 -1.732 -2.296 c 0 0 -2.898 2.009 -2.898 2.009 c 0 0 -2.172 -0.253 -2.172 -0.253 c 0 0 -2.096 -2.128 -2.096 -2.128 c 0 0 -2.331 -0.763 -2.331 -0.763 c 0 0 -1.5 -1.498 -1.5 -1.498 c 0 0 -2.199 1.248 -2.199 1.248 c 0 0 -0.138 -2.153 -0.138 -2.153 c 0 0 -0.979 -1.096 -0.979 -1.096 c 0 0 0.256 -1.511 0.256 -1.511 c 0 0 2.491 1.248 2.491 1.248 c 0 0 0.646 1.884 0.646 1.884 c 0 0 1.12 -1.667 1.12 -1.667 c 0 0 -1.379 -2.84 -1.379 -2.84 c 0 0 -2.113 -1.373 -2.113 -1.373 c 0 0 -0.294 -1.104 -0.294 -1.104 c 0 0 -1.77 -0.163 -1.77 -0.163 c 0 0 0.403 -1.189 0.403 -1.189 c 0 0 -1.328 -0.901 -1.328 -0.901 c 0 0 1.163 -0.801 1.163 -0.801 c 0 0 -0.396 -2.087 -0.396 -2.087 c 0 0 1.813 -0.197 1.813 -0.197 c 0 0 -0.485 -1.763 -0.485 -1.763 c 0 0 0.353 -0.945 0.353 -0.945 c 0 0 1.317 -0.403 1.317 -0.403 c 0 0 0.982 0.007 0.982 0.007 c 0 0 0.665 -1.239 0.665 -1.239 c 0 0 0.345 1.976 0.345 1.976 c 0 0 2.583 -0.188 2.583 -0.188 c 0 0 1.301 0.867 1.301 0.867 c 0 0 1.081 -0.098 1.081 -0.098 c 0 0 0.205 0.906 0.205 0.906 c 0 0 1.011 0.663 1.011 0.663 c 0 0 2.493 -1.648 2.493 -1.648 c 0 0 0.773 0.891 0.773 0.891 c 0 0 0.999 0.119 0.999 0.119 c 0 0 1.539 -1.518 1.539 -1.518 c 0 0 3.298 -0.388 3.298 -0.388 c 0 0 0.28 0.989 0.28 0.989 c 0 0 1.403 0.633 1.403 0.633 c 0 0 1.595 2.433 1.595 2.433 c 0 0 -3.162 2.329 -3.162 2.329 c 0 0 0.558 0.923 0.558 0.923 c 0 0 -0.385 1.708 -0.385 1.708 c 0 0 1.729 3.064 1.729 3.064 c 0 0 1.062 -0.458 1.062 -0.458 c 0 0 0.449 1.181 0.449 1.181 c 0 0 -0.755 0.531 -0.755 0.531 c 0 0 0.315 0.529 0.315 0.529 c 0 0 2.975 1.226 2.975 1.226 c 0 0 -1.655 2.904 -1.655 2.904 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Saida"
            },
            "21": {
                "path": "M 368.508 30.2198 c 0 0 -0.538 0.351 -0.538 0.351 c 0 0 -0.418 -0.446 -0.418 -0.446 c 0 0 -0.55 1.052 -0.55 1.052 c 0 0 -3.584 1.265 -3.584 1.265 c 0 0 -0.653 0.873 -0.653 0.873 c 0 0 0.42 1.242 0.42 1.242 c 0 0 -2.629 0.698 -2.629 0.698 c 0 0 -0.062 1.543 -0.062 1.543 c 0 0 -1.254 -0.13 -1.254 -0.13 c 0 0 -0.397 -0.7 -0.397 -0.7 c 0 0 -1.124 0.208 -1.124 0.208 c 0 0 0.207 -2.014 0.207 -2.014 c 0 0 0.97 -1.018 0.97 -1.018 c 0 0 -1.8 0.36 -1.8 0.36 c 0 0 -2.274 -0.424 -2.274 -0.424 c 0 0 -0.369 -1.324 -0.369 -1.324 c 0 0 -1.066 1.389 -1.066 1.389 c 0 0 -2.188 -0.147 -2.188 -0.147 c 0 0 -0.967 0.174 -0.967 0.174 c 0 0 -0.254 -1.387 -0.254 -1.387 c 0 0 0.828 -0.194 0.828 -0.194 c 0 0 0.3 -0.783 0.3 -0.783 c 0 0 -2.966 -1.427 -2.966 -1.427 c 0 0 -0.699 -3.309 -0.699 -3.309 c 0 0 -1.635 -0.354 -1.635 -0.354 c 0 0 0.277 -1.183 0.277 -1.183 c 0 0 -0.458 -0.661 -0.458 -0.661 c 0 0 -0.486 -1.046 -0.486 -1.046 c 0 0 0.477 -1.133 0.477 -1.133 c 0 0 1.46 -1.163 1.46 -1.163 c 0 0 2.801 -0.643 2.801 -0.643 c 0 0 1.617 0.827 1.617 0.827 c 0 0 0.77 2.041 0.77 2.041 c 0 0 2.885 0.665 2.885 0.665 c 0 0 0.642 -0.521 0.642 -0.521 c 0 0 0.391 0.479 0.391 0.479 c 0 0 1.646 -0.394 1.646 -0.394 c 0 0 0.779 1.6 0.779 1.6 c 0 0 1.483 0.237 1.483 0.237 c 0 0 2.637 -1.094 2.637 -1.094 c 0 0 1.659 0.04 1.659 0.04 c 0 0 2.043 -1.929 2.043 -1.929 c 0 0 -0.279 -1.044 -0.279 -1.044 c 0 0 -1.836 -1.298 -1.836 -1.298 c 0 0 2.469 0.061 2.469 0.061 c 0 0 0.865 0.703 0.865 0.703 c 0 0 -0.27 0.649 -0.27 0.649 c 0 0 0.934 1.558 0.934 1.558 c 0 0 -0.102 0.528 -0.102 0.528 c 0 0 -0.618 -0.109 -0.618 -0.109 c 0 0 1.345 1.255 1.345 1.255 c 0 0 0.646 3.424 0.646 3.424 c 0 0 -0.074 0.896 -0.074 0.896 c 0 0 -1.197 0.49 -1.197 0.49 c 0 0 0.196 1.267 0.196 1.267 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Skikda"
            },
            "22": {
                "path": "M 204.15 64.0609 c 0 0 -0.642 0.992 -0.642 0.992 c 0 0 0.241 0.965 0.241 0.965 c 0 0 -1.503 0.747 -1.503 0.747 c 0 0 -0.184 -0.672 -0.184 -0.672 c 0 0 -2.838 0.497 -2.838 0.497 c 0 0 -0.066 0.729 -0.066 0.729 c 0 0 -0.969 0.457 -0.969 0.457 c 0 0 -0.813 -0.548 -0.813 -0.548 c 0 0 -0.78 1.395 -0.78 1.395 c 0 0 -0.673 -0.18 -0.673 -0.18 c 0 0 0.286 1.945 0.286 1.945 c 0 0 -1.38 0.462 -1.38 0.462 c 0 0 -0.248 1.449 -0.248 1.449 c 0 0 -0.818 0.477 -0.818 0.477 c 0 0 1.942 1.063 1.942 1.063 c 0 0 -1.313 2.126 -1.313 2.126 c 0 0 0.506 1.828 0.506 1.828 c 0 0 1.191 0.045 1.191 0.045 c 0 0 -0.804 1.135 -0.804 1.135 c 0 0 1.177 -0.239 1.177 -0.239 c 0 0 -0.433 3.193 -0.433 3.193 c 0 0 2.376 -0.271 2.376 -0.271 c 0 0 0.272 1.004 0.272 1.004 c 0 0 -0.496 -0.036 -0.496 -0.036 c 0 0 0.23 0.687 0.23 0.687 c 0 0 -1.285 2.753 -1.285 2.753 c 0 0 -1.609 0.95 -1.609 0.95 c 0 0 0.956 0.198 0.956 0.198 c 0 0 0.362 0.793 0.362 0.793 c 0 0 -6.093 5.633 -6.093 5.633 c 0 0 1.08 1.632 1.08 1.632 c 0 0 2.133 -1.567 2.133 -1.567 c 0 0 0.589 1.018 0.589 1.018 c 0 0 0.342 -0.416 0.342 -0.416 c 0 0 2.966 0.896 2.966 0.896 c 0 0 4.055 -2.511 4.055 -2.511 c 0 0 1.843 1.041 1.843 1.041 c 0 0 3.133 9.769 3.133 9.769 c 0 0 0.314 -1.128 0.314 -1.128 c 0 0 0.854 0.04 0.854 0.04 c 0 0 2.091 -2.885 2.091 -2.885 c 0 0 1.632 -0.712 1.632 -0.712 c 0 0 1.374 0.198 1.374 0.198 c 0 0 1.501 -3.065 1.501 -3.065 c 0 0 0.941 -0.691 0.941 -0.691 c 0 0 -1.231 -5.509 -1.231 -5.509 c 0 0 -1.5 -1.498 -1.5 -1.498 c 0 0 -2.199 1.248 -2.199 1.248 c 0 0 -0.138 -2.153 -0.138 -2.153 c 0 0 -0.979 -1.096 -0.979 -1.096 c 0 0 0.256 -1.511 0.256 -1.511 c 0 0 2.491 1.248 2.491 1.248 c 0 0 0.646 1.884 0.646 1.884 c 0 0 1.12 -1.667 1.12 -1.667 c 0 0 -1.379 -2.84 -1.379 -2.84 c 0 0 -2.113 -1.373 -2.113 -1.373 c 0 0 -0.294 -1.104 -0.294 -1.104 c 0 0 -1.77 -0.163 -1.77 -0.163 c 0 0 0.403 -1.189 0.403 -1.189 c 0 0 -1.328 -0.901 -1.328 -0.901 c 0 0 1.163 -0.801 1.163 -0.801 c 0 0 -0.396 -2.087 -0.396 -2.087 c 0 0 1.813 -0.197 1.813 -0.197 c 0 0 -0.485 -1.763 -0.485 -1.763 c 0 0 0.353 -0.945 0.353 -0.945 c 0 0 1.317 -0.403 1.317 -0.403 c 0 0 -0.804 -2.202 -0.804 -2.202 c 0 0 0.376 -0.966 0.376 -0.966 c 0 0 1.477 -0.712 1.477 -0.712 c 0 0 -0.955 -0.354 -0.955 -0.354 c 0 0 -1.221 1.019 -1.221 1.019 c 0 0 -0.218 -0.549 -0.218 -0.549 c 0 0 1.312 -0.857 1.312 -0.857 c 0 0 0.38 -0.986 0.38 -0.986 c 0 0 -2.728 -0.854 -2.728 -0.854 c 0 0 -0.353 -0.632 -0.353 -0.632 c 0 0 -0.752 0.882 -0.752 0.882 c 0 0 -1.563 -0.12 -1.563 -0.12 c 0 0 0.231 -2.255 0.231 -2.255 c 0 0 -1.589 0.603 -1.589 0.603 c 0 0 -0.783 -0.393 -0.783 -0.393 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Sidi Bel Abbes"
            },
            "23": {
                "path": "M 375.158 30.0759 c 0 0 0.57 -1.447 0.57 -1.447 c 0 0 -0.427 -0.747 -0.427 -0.747 c 0 0 0.969 -1.14 0.969 -1.14 c 0 0 0.939 0.143 0.939 0.143 c 0 0 0.031 -1.328 0.031 -1.328 c 0 0 1.139 -0.009 1.139 -0.009 c 0 0 -0.366 -0.685 -0.366 -0.685 c 0 0 -1.192 -0.868 -1.192 -0.868 c 0 0 0.534 -2.257 0.534 -2.257 c 0 0 -1.771 0.605 -1.771 0.605 c 0 0 -1.04 -0.711 -1.04 -0.711 c 0 0 -0.714 0.503 -0.714 0.503 c 0 0 -2.358 -1.985 -2.358 -1.985 c 0 0 -2.144 0.188 -2.144 0.188 c 0 0 -0.479 -1.129 -0.479 -1.129 c 0 0 -2.073 0.349 -2.073 0.349 c 0 0 0.865 0.705 0.865 0.705 c 0 0 -0.27 0.648 -0.27 0.648 c 0 0 0.934 1.558 0.934 1.558 c 0 0 -0.102 0.529 -0.102 0.529 c 0 0 -0.618 -0.109 -0.618 -0.109 c 0 0 1.345 1.253 1.345 1.253 c 0 0 0.647 3.425 0.647 3.425 c 0 0 -0.075 0.896 -0.075 0.896 c 0 0 -1.196 0.49 -1.196 0.49 c 0 0 0.201 1.266 0.201 1.266 c 0 0 1.15 -0.122 1.15 -0.122 c 0 0 0.438 0.876 0.438 0.876 c 0 0 0.199 -0.74 0.199 -0.74 c 0 0 1.104 -0.509 1.104 -0.509 c 0 0 0.176 1.188 0.176 1.188 c 0 0 2.713 0.503 2.713 0.503 c 0 0 0.871 -1.339 0.871 -1.339 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Annaba"
            },
            "24": {
                "path": "M 375.158 30.0759 c 0 0 0.936 -0.309 0.936 -0.309 c 0 0 0.688 0.501 0.688 0.501 c 0 0 1.188 2.609 1.188 2.609 c 0 0 1.169 -0.383 1.169 -0.383 c 0 0 0.201 0.543 0.201 0.543 c 0 0 -0.047 -0.771 -0.047 -0.771 c 0 0 1.299 0.584 1.299 0.584 c 0 0 0.92 1.851 0.92 1.851 c 0 0 -1.832 1.544 -1.832 1.544 c 0 0 -1.021 -0.411 -1.021 -0.411 c 0 0 -0.195 1.316 -0.195 1.316 c 0 0 1.08 1.383 1.08 1.383 c 0 0 -0.374 0.437 -0.374 0.437 c 0 0 -2.218 0.173 -2.218 0.173 c 0 0 -2.16 2.08 -2.16 2.08 c 0 0 -1.194 -0.271 -1.194 -0.271 c 0 0 -2.52 0.934 -2.52 0.934 c 0 0 -2.854 -0.539 -2.854 -0.539 c 0 0 -0.494 1.348 -0.494 1.348 c 0 0 0.75 0.918 0.75 0.918 c 0 0 -1.257 0.076 -1.257 0.076 c 0 0 -0.683 1.774 -0.683 1.774 c 0 0 -2.784 1.371 -2.784 1.371 c 0 0 -0.998 -0.165 -0.998 -0.165 c 0 0 0.196 -0.958 0.196 -0.958 c 0 0 -1.267 -0.551 -1.267 -0.551 c 0 0 0.201 -1.256 0.201 -1.256 c 0 0 -0.077 -0.57 -0.077 -0.57 c 0 0 0.855 -0.474 0.855 -0.474 c 0 0 0.104 -1.688 0.104 -1.688 c 0 0 -0.561 -1.442 -0.561 -1.442 c 0 0 -1.225 -0.221 -1.225 -0.221 c 0 0 0.6 -0.717 0.6 -0.717 c 0 0 -1.052 -0.557 -1.052 -0.557 c 0 0 0.532 -0.551 0.532 -0.551 c 0 0 -0.572 -0.892 -0.572 -0.892 c 0 0 0.062 -1.543 0.062 -1.543 c 0 0 2.629 -0.698 2.629 -0.698 c 0 0 -0.42 -1.242 -0.42 -1.242 c 0 0 0.653 -0.873 0.653 -0.873 c 0 0 3.583 -1.265 3.583 -1.265 c 0 0 0.55 -1.052 0.55 -1.052 c 0 0 0.419 0.446 0.419 0.446 c 0 0 0.538 -0.351 0.538 -0.351 c 0 0 1.15 -0.122 1.15 -0.122 c 0 0 0.438 0.876 0.438 0.876 c 0 0 0.199 -0.741 0.199 -0.741 c 0 0 1.104 -0.509 1.104 -0.509 c 0 0 0.176 1.188 0.176 1.188 c 0 0 2.713 0.503 2.713 0.503 c 0 0 0.872 -1.333 0.872 -1.333 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Guelma"
            },
            "25": {
                "path": "M 361.888 43.9039 c 0 0 -0.077 -0.57 -0.077 -0.57 c 0 0 0.855 -0.474 0.855 -0.474 c 0 0 0.104 -1.688 0.104 -1.688 c 0 0 -0.561 -1.442 -0.561 -1.442 c 0 0 -1.224 -0.221 -1.224 -0.221 c 0 0 0.599 -0.717 0.599 -0.717 c 0 0 -1.052 -0.557 -1.052 -0.557 c 0 0 0.532 -0.551 0.532 -0.551 c 0 0 -0.572 -0.892 -0.572 -0.892 c 0 0 -1.253 -0.13 -1.253 -0.13 c 0 0 -0.398 -0.7 -0.398 -0.7 c 0 0 -1.124 0.208 -1.124 0.208 c 0 0 0.207 -2.014 0.207 -2.014 c 0 0 0.969 -1.018 0.969 -1.018 c 0 0 -1.799 0.36 -1.799 0.36 c 0 0 -2.274 -0.424 -2.274 -0.424 c 0 0 -0.368 -1.324 -0.368 -1.324 c 0 0 -1.067 1.389 -1.067 1.389 c 0 0 -2.188 -0.147 -2.188 -0.147 c 0 0 -0.02 1.6 -0.02 1.6 c 0 0 -3.298 0.766 -3.298 0.766 c 0 0 0.284 2.021 0.284 2.021 c 0 0 -0.922 1.877 -0.922 1.877 c 0 0 1.319 -0.403 1.319 -0.403 c 0 0 1.126 0.879 1.126 0.879 c 0 0 -0.265 1.487 -0.265 1.487 c 0 0 0.788 0.495 0.788 0.495 c 0 0 1.019 -0.295 1.019 -0.295 c 0 0 0.938 0.805 0.938 0.805 c 0 0 -0.108 1.354 -0.108 1.354 c 0 0 -0.381 0.438 -0.381 0.438 c 0 0 0.595 1.159 0.595 1.159 c 0 0 1.01 0.369 1.01 0.369 c 0 0 -0.464 -0.804 -0.464 -0.804 c 0 0 1.122 0.604 1.122 0.604 c 0 0 0.375 -1.069 0.375 -1.069 c 0 0 2.243 -0.159 2.243 -0.159 c 0 0 0.263 -1.444 0.263 -1.444 c 0 0 1.446 1.166 1.446 1.166 c 0 0 3.621 0.066 3.621 0.066 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Constantine"
            },
            "26": {
                "path": "M 291.189 51.9288 c 0 0 0.272 0.795 0.272 0.795 c 0 0 -1.143 0.688 -1.143 0.688 c 0 0 0.551 0.367 0.551 0.367 c 0 0 -2.021 0.685 -2.021 0.685 c 0 0 0.86 1.28 0.86 1.28 c 0 0 0.034 2.966 0.034 2.966 c 0 0 -2.708 -4.154 -2.708 -4.154 c 0 0 -0.896 0.141 -0.896 0.141 c 0 0 0.406 0.771 0.406 0.771 c 0 0 -0.488 0.495 -0.488 0.495 c 0 0 -1.09 0.049 -1.09 0.049 c 0 0 -0.854 -1.716 -0.854 -1.716 c 0 0 -1.031 1.021 -1.031 1.021 c 0 0 0.104 1.206 0.104 1.206 c 0 0 -0.753 1.37 -0.753 1.37 c 0 0 -2.786 0.7 -2.786 0.7 c 0 0 -0.185 -2.199 -0.185 -2.199 c 0 0 -0.699 0.144 -0.699 0.144 c 0 0 -0.693 -2.337 -0.693 -2.337 c 0 0 -2.585 0.707 -2.585 0.707 c 0 0 0.677 5.005 0.677 5.005 c 0 0 -0.578 -0.259 -0.578 -0.259 c 0 0 -1.83 1.359 -1.83 1.359 c 0 0 -1.605 2.564 -1.605 2.564 c 0 0 -1.292 0.661 -1.292 0.661 c 0 0 -2.698 -1.908 -2.698 -1.908 c 0 0 -0.229 0.56 -0.229 0.56 c 0 0 -2.476 0.813 -2.476 0.813 c 0 0 -2.139 0.167 -2.139 0.167 c 0 0 -0.658 -2.362 -0.658 -2.362 c 0 0 0.71 -1.968 0.71 -1.968 c 0 0 -2.811 -0.738 -2.811 -0.738 c 0 0 -0.347 -1.359 -0.347 -1.359 c 0 0 0.503 -0.62 0.503 -0.62 c 0 0 2.227 0.229 2.227 0.229 c 0 0 0.902 -3.906 0.902 -3.906 c 0 0 1.051 -1.104 1.051 -1.104 c 0 0 -0.339 -0.876 -0.339 -0.876 c 0 0 1.986 0.073 1.986 0.073 c 0 0 0.315 -2.775 0.315 -2.775 c 0 0 0.86 0.234 0.86 0.234 c 0 0 1.842 -1.11 1.842 -1.11 c 0 0 0.062 -1.843 0.062 -1.843 c 0 0 -1.344 -0.306 -1.344 -0.306 c 0 0 -0.085 -1.369 -0.085 -1.369 c 0 0 -0.709 -0.199 -0.709 -0.199 c 0 0 0.625 -1.909 0.625 -1.909 c 0 0 1.348 0.043 1.348 0.043 c 0 0 0.756 -0.614 0.756 -0.614 c 0 0 1.51 -1.087 1.51 -1.087 c 0 0 2.893 0.205 2.893 0.205 c 0 0 1.568 -1.178 1.568 -1.178 c 0 0 0.67 1.507 0.67 1.507 c 0 0 1.481 0.008 1.481 0.008 c 0 0 0.867 -0.967 0.867 -0.967 c 0 0 -0.189 -1.356 -0.189 -1.356 c 0 0 0.474 0.956 0.474 0.956 c 0 0 0.732 -0.598 0.732 -0.598 c 0 0 0.692 0.698 0.692 0.698 c 0 0 1.158 -1.154 1.158 -1.154 c 0 0 0.084 -1.381 0.084 -1.381 c 0 0 1.63 0.271 1.63 0.271 c 0 0 0.479 -0.537 0.479 -0.537 c 0 0 2.722 2.629 2.722 2.629 c 0 0 1.562 -1.479 1.562 -1.479 c 0 0 1.356 0.703 1.356 0.703 c 0 0 -0.439 0.687 -0.439 0.687 c 0 0 0.998 1.392 0.998 1.392 c 0 0 -1.071 0.599 -1.071 0.599 c 0 0 -0.441 1.267 -0.441 1.267 c 0 0 1.069 0.979 1.069 0.979 c 0 0 -0.181 0.809 -0.181 0.809 c 0 0 -1.426 0.414 -1.426 0.414 c 0 0 -0.229 0.854 -0.229 0.854 c 0 0 0.656 1.042 0.656 1.042 c 0 0 -0.409 0.485 -0.409 0.485 c 0 0 -0.898 0.936 -0.898 0.936 c 0 0 -1.014 -0.016 -1.014 -0.016 c 0 0 0.479 0.781 0.479 0.781 c 0 0 2.788 0.434 2.788 0.434 c 0 0 1.41 2.635 1.41 2.635 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Médéa"
            },
            "27": {
                "path": "M 212.85 55.2648 c 0 0 2.964 -1.85 2.964 -1.85 c 0 0 2.338 -4.67 2.338 -4.67 c 0 0 1.846 -1.942 1.846 -1.942 c 0 0 9.188 -5.395 9.188 -5.395 c 0 0 1.74 -0.06 1.74 -0.06 c 0 0 -1.001 3.283 -1.001 3.283 c 0 0 -1.979 2.472 -1.979 2.472 c 0 0 1.289 1.351 1.289 1.351 c 0 0 -0.634 0.698 -0.634 0.698 c 0 0 0.359 0.87 0.359 0.87 c 0 0 -2.126 0.093 -2.126 0.093 c 0 0 -0.555 0.604 -0.555 0.604 c 0 0 -1.226 -0.57 -1.226 -0.57 c 0 0 -0.846 1.017 -0.846 1.017 c 0 0 0.313 0.769 0.313 0.769 c 0 0 0.674 -0.036 0.674 -0.036 c 0 0 -0.59 0.992 -0.59 0.992 c 0 0 0.229 0.908 0.229 0.908 c 0 0 -1.332 1.438 -1.332 1.438 c 0 0 -0.877 -0.373 -0.877 -0.373 c 0 0 -0.867 0.539 -0.867 0.539 c 0 0 -1.744 2.073 -1.744 2.073 c 0 0 -0.903 -0.138 -0.903 -0.138 c 0 0 -0.604 0.964 -0.604 0.964 c 0 0 -0.03 -0.763 -0.03 -0.763 c 0 0 -1.07 0.18 -1.07 0.18 c 0 0 -1.028 -1.427 -1.028 -1.427 c 0 0 -2.252 0.6 -2.252 0.6 c 0 0 -1.276 -1.627 -1.276 -1.627 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Mostaganem"
            },
            "28": {
                "path": "M 320.989 54.6068 c 0 0 -0.17 0.627 -0.17 0.627 c 0 0 1.475 1.042 1.475 1.042 c 0 0 1.106 -0.24 1.106 -0.24 c 0 0 0.486 0.518 0.486 0.518 c 0 0 -0.417 0.537 -0.417 0.537 c 0 0 0.547 0.807 0.547 0.807 c 0 0 3.493 0.469 3.493 0.469 c 0 0 -2.661 2.962 -2.661 2.962 c 0 0 -1.817 0.906 -1.817 0.906 c 0 0 -0.722 -1.068 -0.722 -1.068 c 0 0 -1.062 -0.011 -1.062 -0.011 c 0 0 -0.828 0.921 -0.828 0.921 c 0 0 -0.074 -0.787 -0.074 -0.787 c 0 0 -0.96 1.506 -0.96 1.506 c 0 0 -1.945 -1.698 -1.945 -1.698 c 0 0 0.823 4.4 0.823 4.4 c 0 0 -0.379 2.546 -0.379 2.546 c 0 0 -0.916 1.548 -0.916 1.548 c 0 0 -0.524 -0.186 -0.524 -0.186 c 0 0 -1.187 1.172 -1.187 1.172 c 0 0 0.194 0.606 0.194 0.606 c 0 0 2.929 0.06 2.929 0.06 c 0 0 2.125 1.396 2.125 1.396 c 0 0 0.447 3.492 0.447 3.492 c 0 0 0.547 0.305 0.547 0.305 c 0 0 -0.538 0.065 -0.538 0.065 c 0 0 -0.683 1.586 -0.683 1.586 c 0 0 -5.438 1.63 -5.438 1.63 c 0 0 -0.942 1.502 -0.942 1.502 c 0 0 -1.001 0.173 -1.001 0.173 c 0 0 1.298 1.086 1.298 1.086 c 0 0 -1.021 0.547 -1.021 0.547 c 0 0 -0.657 -0.445 -0.657 -0.445 c 0 0 -1.832 1.14 -1.832 1.14 c 0 0 -4.806 0.046 -4.806 0.046 c 0 0 -0.876 1.823 -0.876 1.823 c 0 0 -2.191 1.835 -2.191 1.835 c 0 0 0.521 0.302 0.521 0.302 c 0 0 0.417 3.083 0.417 3.083 c 0 0 1.218 1.271 1.218 1.271 c 0 0 -0.307 0.725 -0.307 0.725 c 0 0 1.813 0.933 1.813 0.933 c 0 0 -0.773 1.007 -0.773 1.007 c 0 0 -1.99 0.525 -1.99 0.525 c 0 0 -4.303 -3.585 -4.303 -3.585 c 0 0 0.313 -2.084 0.313 -2.084 c 0 0 -1.836 -1.982 -1.836 -1.982 c 0 0 0.299 -2.042 0.299 -2.042 c 0 0 -0.719 -4.248 -0.719 -4.248 c 0 0 -3.906 -0.975 -3.906 -0.975 c 0 0 -1.411 0.479 -1.411 0.479 c 0 0 -0.14 -1.65 -0.14 -1.65 c 0 0 -1.402 -0.322 -1.402 -0.322 c 0 0 0.209 -2.972 0.209 -2.972 c 0 0 -0.698 -0.953 -0.698 -0.953 c 0 0 0.551 -0.068 0.551 -0.068 c 0 0 0.504 -1.539 0.504 -1.539 c 0 0 -1.839 0.736 -1.839 0.736 c 0 0 -1.138 -3.13 -1.138 -3.13 c 0 0 4.282 -3.606 4.282 -3.606 c 0 0 -0.425 -1.94 -0.425 -1.94 c 0 0 0.865 -0.633 0.865 -0.633 c 0 0 0.075 -1.772 0.075 -1.772 c 0 0 -4.719 -3.806 -4.719 -3.806 c 0 0 -1.903 -1.953 -1.903 -1.953 c 0 0 -0.313 -1.258 -0.313 -1.258 c 0 0 0.489 -0.494 0.489 -0.494 c 0 0 -0.405 -0.771 -0.405 -0.771 c 0 0 0.895 -0.14 0.895 -0.14 c 0 0 2.709 4.154 2.709 4.154 c 0 0 -0.037 -2.966 -0.037 -2.966 c 0 0 -0.859 -1.281 -0.859 -1.281 c 0 0 2.022 -0.685 2.022 -0.685 c 0 0 -0.551 -0.367 -0.551 -0.367 c 0 0 1.144 -0.686 1.144 -0.686 c 0 0 -0.274 -0.796 -0.274 -0.796 c 0 0 0.533 -0.809 0.533 -0.809 c 0 0 1.537 0.153 1.537 0.153 c 0 0 0.654 0.924 0.654 0.924 c 0 0 1.07 0.224 1.07 0.224 c 0 0 0.352 1.004 0.352 1.004 c 0 0 0.802 0.048 0.802 0.048 c 0 0 1.271 -1.214 1.271 -1.214 c 0 0 2.542 0.89 2.542 0.89 c 0 0 -0.444 -1.385 -0.444 -1.385 c 0 0 1.058 -3.265 1.058 -3.265 c 0 0 0.57 1.104 0.57 1.104 c 0 0 2.211 -0.769 2.211 -0.769 c 0 0 2.755 0.986 2.755 0.986 c 0 0 3.391 -1.461 3.391 -1.461 c 0 0 0.865 2.774 0.865 2.774 c 0 0 -1.615 0.625 -1.615 0.625 c 0 0 -0.69 2.095 -0.69 2.095 c 0 0 2.823 0.292 2.823 0.292 c 0 0 -0.36 -0.99 -0.36 -0.99 c 0 0 1.328 -0.64 1.328 -0.64 c 0 0 -0.386 1.092 -0.386 1.092 c 0 0 0.663 0.766 0.663 0.766 c 0 0 2.07 -1.562 2.07 -1.562 c 0 0 2.721 -0.533 2.721 -0.533 c 0 0 1.33 1.67 1.33 1.67 c 0 0 1.165 -0.05 1.165 -0.05 c 0 0 0.184 1.218 0.184 1.218 c 0 0 1.399 -0.516 1.399 -0.516 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "M'Sila"
            },
            "29": {
                "path": "M 220.012 57.4758 c 0 0 0.578 0.193 0.578 0.193 c 0 0 1.217 3.61 1.217 3.61 c 0 0 1.717 -0.492 1.717 -0.492 c 0 0 0.125 0.523 0.125 0.523 c 0 0 0.858 -0.611 0.858 -0.611 c 0 0 1.282 1.803 1.282 1.803 c 0 0 1.891 -0.041 1.891 -0.041 c 0 0 0.918 0.917 0.918 0.917 c 0 0 1.721 -0.085 1.721 -0.085 c 0 0 0.296 0.662 0.296 0.662 c 0 0 2.047 0.317 2.047 0.317 c 0 0 1.49 1.555 1.49 1.555 c 0 0 -0.688 0.28 -0.688 0.28 c 0 0 -0.874 2.105 -0.874 2.105 c 0 0 -1.111 0.353 -1.111 0.353 c 0 0 -1.521 -0.788 -1.521 -0.788 c 0 0 -1.084 0.159 -1.084 0.159 c 0 0 -1.175 1.41 -1.175 1.41 c 0 0 0.246 0.949 0.246 0.949 c 0 0 -1.553 1.1 -1.553 1.1 c 0 0 -1.071 1.771 -1.071 1.771 c 0 0 -1.54 1.518 -1.54 1.518 c 0 0 -0.999 -0.12 -0.999 -0.12 c 0 0 -0.773 -0.89 -0.773 -0.89 c 0 0 -2.493 1.648 -2.493 1.648 c 0 0 -1.011 -0.662 -1.011 -0.662 c 0 0 -0.205 -0.907 -0.205 -0.907 c 0 0 -1.081 0.098 -1.081 0.098 c 0 0 -1.301 -0.867 -1.301 -0.867 c 0 0 -2.583 0.188 -2.583 0.188 c 0 0 -0.345 -1.976 -0.345 -1.976 c 0 0 -0.665 1.238 -0.665 1.238 c 0 0 -0.982 -0.007 -0.982 -0.007 c 0 0 -0.804 -2.203 -0.804 -2.203 c 0 0 0.376 -0.965 0.376 -0.965 c 0 0 1.477 -0.712 1.477 -0.712 c 0 0 -0.955 -0.354 -0.955 -0.354 c 0 0 -1.222 1.019 -1.222 1.019 c 0 0 -0.217 -0.549 -0.217 -0.549 c 0 0 1.312 -0.856 1.312 -0.856 c 0 0 0.38 -0.987 0.38 -0.987 c 0 0 -2.728 -0.854 -2.728 -0.854 c 0 0 -0.352 -0.632 -0.352 -0.632 c 0 0 -0.753 0.882 -0.753 0.882 c 0 0 -1.563 -0.12 -1.563 -0.12 c 0 0 0.231 -2.254 0.231 -2.254 c 0 0 -1.59 0.602 -1.59 0.602 c 0 0 -0.786 -0.382 -0.786 -0.382 c 0 0 0.318 -0.749 0.318 -0.749 c 0 0 1.029 -0.085 1.029 -0.085 c 0 0 -0.37 -0.949 -0.37 -0.949 c 0 0 1.582 -0.382 1.582 -0.382 c 0 0 0.264 -1.739 0.264 -1.739 c 0 0 2.625 -2.104 2.625 -2.104 c 0 0 -0.667 -0.006 -0.667 -0.006 c 0 0 0.89 -1.532 0.89 -1.532 c 0 0 1.433 1.089 1.433 1.089 c 0 0 1.581 -2.289 1.581 -2.289 c 0 0 1.287 1.577 1.287 1.577 c 0 0 2.252 -0.6 2.252 -0.6 c 0 0 1.029 1.428 1.029 1.428 c 0 0 1.069 -0.181 1.069 -0.181 c 0 0 0.03 0.763 0.03 0.763 c 0 0 0.605 -0.963 0.605 -0.963 c 0 0 0.906 0.136 0.906 0.136 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Mascara"
            },
            "30": {
                "path": "M 327.951 114.981 c 0 0 -0.91 1.857 -0.91 1.857 c 0 0 -3.919 -3.5 -3.919 -3.5 c 0 0 -2.42 5.13 -2.42 5.13 c 0 0 2.209 11.443 2.209 11.443 c 0 0 -5.039 9.304 -5.039 9.304 c 0 0 -6.763 7.312 -6.763 7.312 c 0 0 -0.766 17.01 -0.766 17.01 c 0 0 -3.171 8.157 -3.171 8.157 c 0 0 -10.495 36.704 -10.495 36.704 c 0 0 -1.579 1.093 -1.579 1.093 c 0 0 -6.763 14.091 -6.763 14.091 c 0 0 -8.226 3.631 -8.226 3.631 c 0 0 17.526 14.179 17.526 14.179 c 0 0 -0.146 0.413 -0.146 0.413 c 0 0 43.124 -33.261 43.124 -33.261 c 0 0 15.876 -8.912 15.876 -8.912 c 0 0 2.795 0.889 2.795 0.889 c 0 0 63.493 -16.461 63.493 -16.461 c 0 0 -11.392 -38.443 -11.392 -38.443 c 0 0 -39.729 4.259 -39.729 4.259 c 0 0 -5.501 -6.366 -5.501 -6.366 c 0 0 -7.777 -11.58 -7.777 -11.58 c 0 0 -8.097 -22.969 -8.097 -22.969 c 0 0 -1.219 -7.663 -1.219 -7.663 c 0 0 -0.319 0.807 -0.319 0.807 c 0 0 -0.521 -1.04 -0.521 -1.04 c 0 0 -0.762 0.111 -0.762 0.111 c 0 0 -2.721 2.136 -2.721 2.136 c 0 0 -0.552 -1.05 -0.552 -1.05 c 0 0 -0.665 0.606 -0.665 0.606 c 0 0 -0.047 1.4 -0.047 1.4 c 0 0 1.138 2.602 1.138 2.602 c 0 0 0.039 2.557 0.039 2.557 c 0 0 -0.953 1.07 -0.953 1.07 c 0 0 1.171 1.467 1.171 1.467 c 0 0 0.374 2.7 0.374 2.7 c 0 0 -17.293 0.317 -17.293 0.317 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Ouargla"
            },
            "31": {
                "path": "M 204.15 64.0609 c 0 0 0.319 -0.749 0.319 -0.749 c 0 0 1.029 -0.085 1.029 -0.085 c 0 0 -0.37 -0.95 -0.37 -0.95 c 0 0 1.582 -0.381 1.582 -0.381 c 0 0 0.264 -1.74 0.264 -1.74 c 0 0 2.625 -2.104 2.625 -2.104 c 0 0 -0.667 -0.006 -0.667 -0.006 c 0 0 0.89 -1.532 0.89 -1.532 c 0 0 1.433 1.09 1.433 1.09 c 0 0 1.597 -2.34 1.597 -2.34 c 0 0 -3.432 -0.925 -3.432 -0.925 c 0 0 -0.636 -0.732 -0.636 -0.732 c 0 0 0.279 -0.764 0.279 -0.764 c 0 0 -0.896 -0.845 -0.896 -0.845 c 0 0 -0.981 0.025 -0.981 0.025 c 0 0 -0.675 0.67 -0.675 0.67 c 0 0 -1.5 0.109 -1.5 0.109 c 0 0 -0.331 2.201 -0.331 2.201 c 0 0 -2.492 1.917 -2.492 1.917 c 0 0 -1.325 0.012 -1.325 0.012 c 0 0 -0.406 -0.761 -0.406 -0.761 c 0 0 -2.549 -0.737 -2.549 -0.737 c 0 0 -0.751 1.339 -0.751 1.339 c 0 0 -0.854 0.255 -0.854 0.255 c 0 0 -0.794 -0.59 -0.794 -0.59 c 0 0 -2.608 2.264 -2.608 2.264 c 0 0 1.342 1.429 1.342 1.429 c 0 0 -0.223 0.719 -0.223 0.719 c 0 0 1.009 0.007 1.009 0.007 c 0 0 -0.384 1.019 -0.384 1.019 c 0 0 -0.893 0.252 -0.893 0.252 c 0 0 0.174 1.591 0.174 1.591 c 0 0 0.012 -0.62 0.012 -0.62 c 0 0 0.895 -0.047 0.895 -0.047 c 0 0 -0.201 -0.596 -0.201 -0.596 c 0 0 0.82 0.656 0.82 0.656 c 0 0 1.569 0.021 1.569 0.021 c 0 0 5.066 -1.624 5.066 -1.624 c 0 0 0.775 2.922 0.775 2.922 c 0 0 -0.772 0.564 -0.772 0.564 c 0 0 -0.026 1.101 -0.026 1.101 c 0 0 0.184 0.673 0.184 0.673 c 0 0 1.502 -0.747 1.502 -0.747 c 0 0 -0.24 -0.964 -0.24 -0.964 c 0 0 0.64 -0.997 0.64 -0.997 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Oran"
            },
            "32": {
                "path": "M 233.026 90.7739 c 0 0 -2.853 -0.734 -2.853 -0.734 c 0 0 -4.583 3.134 -4.583 3.134 c 0 0 -1.732 -2.296 -1.732 -2.296 c 0 0 -2.898 2.009 -2.898 2.009 c 0 0 -2.172 -0.253 -2.172 -0.253 c 0 0 -2.096 -2.128 -2.096 -2.128 c 0 0 -2.331 -0.763 -2.331 -0.763 c 0 0 1.232 5.509 1.232 5.509 c 0 0 -0.942 0.691 -0.942 0.691 c 0 0 -1.501 3.065 -1.501 3.065 c 0 0 0.176 2.472 0.176 2.472 c 0 0 1.795 -0.807 1.795 -0.807 c 0 0 1.055 0.748 1.055 0.748 c 0 0 -0.204 2.644 -0.204 2.644 c 0 0 0.751 0.279 0.751 0.279 c 0 0 0.729 1.792 0.729 1.792 c 0 0 0.76 0.113 0.76 0.113 c 0 0 -2.122 1.127 -2.122 1.127 c 0 0 0.828 2.979 0.828 2.979 c 0 0 -2.93 13.106 -2.93 13.106 c 0 0 0.842 2.448 0.842 2.448 c 0 0 -0.887 0.991 -0.887 0.991 c 0 0 0.673 0.434 0.673 0.434 c 0 0 -0.593 1.588 -0.593 1.588 c 0 0 -1.563 0.854 -1.563 0.854 c 0 0 -0.278 1.842 -0.278 1.842 c 0 0 0.827 0.472 0.827 0.472 c 0 0 -0.269 1.131 -0.269 1.131 c 0 0 0.979 1.097 0.979 1.097 c 0 0 -0.397 1.534 -0.397 1.534 c 0 0 0.431 2.391 0.431 2.391 c 0 0 -2.988 5.758 -2.988 5.758 c 0 0 -0.953 4.385 -0.953 4.385 c 0 0 -2.081 -0.471 -2.081 -0.471 c 0 0 -1.103 0.817 -1.103 0.817 c 0 0 -1.05 2.219 -1.05 2.219 c 0 0 -0.139 4.177 -0.139 4.177 c 0 0 0.68 2.281 0.68 2.281 c 0 0 -0.686 0.065 -0.686 0.065 c 0 0 0.179 0.967 0.179 0.967 c 0 0 -0.602 0.846 -0.602 0.846 c 0 0 0.955 1.181 0.955 1.181 c 0 0 -1.242 1.21 -1.242 1.21 c 0 0 1.247 2.015 1.247 2.015 c 0 0 -1.014 1.203 -1.014 1.203 c 0 0 0.036 1.864 0.036 1.864 c 0 0 0.852 1.823 0.852 1.823 c 0 0 2.918 2.352 2.918 2.352 c 0 0 -0.818 2.98 -0.818 2.98 c 0 0 14.029 11.903 14.029 11.903 c 0 0 15.816 -11.179 15.816 -11.179 c 0 0 21.085 -13.183 21.085 -13.183 c 0 0 4.648 -5.149 4.648 -5.149 c 0 0 -0.721 -8.611 -0.721 -8.611 c 0 0 2.573 -1.672 2.573 -1.672 c 0 0 -1.918 -7.688 -1.918 -7.688 c 0 0 -0.564 -6.182 -0.564 -6.182 c 0 0 -3.111 -6.564 -3.111 -6.564 c 0 0 0.146 -1.528 0.146 -1.528 c 0 0 -0.641 -0.886 -0.641 -0.886 c 0 0 3.997 -0.134 3.997 -0.134 c 0 0 0.203 -3.901 0.203 -3.901 c 0 0 -2.073 0.452 -2.073 0.452 c 0 0 -3.52 -1.138 -3.52 -1.138 c 0 0 0.205 -1.673 0.205 -1.673 c 0 0 -3.122 -0.287 -3.122 -0.287 c 0 0 0.285 -2.856 0.285 -2.856 c 0 0 0.82 -1.435 0.82 -1.435 c 0 0 -1.142 -1.009 -1.142 -1.009 c 0 0 -0.124 -0.991 -0.124 -0.991 c 0 0 -1.457 -0.411 -1.457 -0.411 c 0 0 0.247 -2.655 0.247 -2.655 c 0 0 -0.565 -1.551 -0.565 -1.551 c 0 0 -1.828 -1.584 -1.828 -1.584 c 0 0 -3.495 0.817 -3.495 0.817 c 0 0 -1.613 -1.795 -1.613 -1.795 c 0 0 -2.206 -0.969 -2.206 -0.969 c 0 0 0.165 -0.989 0.165 -0.989 c 0 0 -0.863 -1.461 -0.863 -1.461 c 0 0 -1.119 -1.576 -1.119 -1.576 c 0 0 -0.215 -1.844 -0.215 -1.844 c 0 0 -5.541 0.295 -5.541 0.295 c 0 0 0.672 -4.884 0.672 -4.884 c 0 0 -3.971 -0.823 -3.971 -0.823 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "El-Bayadh"
            },
            "33": {
                "path": "M 454.129 387.74 c 0 0 -0.719 -20.563 -0.719 -20.563 c 0 0 -7.48 -4.23 -7.48 -4.23 c 0 0 -2.209 0.049 -2.209 0.049 c 0 0 -1.657 -1.011 -1.657 -1.011 c 0 0 -13.903 0.818 -13.903 0.818 c 0 0 -12.891 9.613 -12.891 9.613 c 0 0 -17.177 4.161 -17.177 4.161 c 0 0 -6.243 -4.393 -6.243 -4.393 c 0 0 1.974 -2.232 1.974 -2.232 c 0 0 -5.578 -12.361 -5.578 -12.361 c 0 0 -1.04 -10.938 -1.04 -10.938 c 0 0 0.237 -3.784 0.237 -3.784 c 0 0 -5.594 -8.033 -5.594 -8.033 c 0 0 -4.477 -0.14 -4.477 -0.14 c 0 0 -2.836 -2.179 -2.836 -2.179 c 0 0 -3.687 -6.237 -3.687 -6.237 c 0 0 -1.628 -4.169 -1.628 -4.169 c 0 0 -5.061 -6.142 -5.061 -6.142 c 0 0 -5.932 -16.141 -5.932 -16.141 c 0 0 -1.532 -1.133 -1.532 -1.133 c 0 0 -0.138 -1.004 -0.138 -1.004 c 0 0 -2.248 -0.6 -2.248 -0.6 c 0 0 -1.181 -1.556 -1.181 -1.556 c 0 0 1.06 -3.063 1.06 -3.063 c 0 0 2.819 -2.35 2.819 -2.35 c 0 0 -0.418 -1.914 -0.418 -1.914 c 0 0 -12.688 -11.211 -12.688 -11.211 c 0 0 -0.038 -8.717 -0.038 -8.717 c 0 0 -3.731 -17.58 -3.731 -17.58 c 0 0 1.773 -8.354 1.773 -8.354 c 0 0 -1.295 -33.809 -1.295 -33.809 c 0 0 15.876 -8.912 15.876 -8.912 c 0 0 2.796 0.888 2.796 0.888 c 0 0 63.493 -16.461 63.493 -16.461 c 0 0 2.411 8.262 2.411 8.262 c 0 0 -3.099 1.292 -3.099 1.292 c 0 0 -0.465 1.084 -0.465 1.084 c 0 0 0.689 2.608 0.689 2.608 c 0 0 2.979 3.429 2.979 3.429 c 0 0 6.166 11.784 6.166 11.784 c 0 0 2.729 9.976 2.729 9.976 c 0 0 1.149 6.791 1.149 6.791 c 0 0 -0.747 12.151 -0.747 12.151 c 0 0 3.65 10.479 3.65 10.479 c 0 0 -0.548 4.821 -0.548 4.821 c 0 0 -1.157 2.46 -1.157 2.46 c 0 0 -1.083 0.37 -1.083 0.37 c 0 0 1.397 0.222 1.397 0.222 c 0 0 -0.245 1.499 -0.245 1.499 c 0 0 -1.049 1.133 -1.049 1.133 c 0 0 -0.483 2.826 -0.483 2.826 c 0 0 0.133 2.473 0.133 2.473 c 0 0 2.239 7.597 2.239 7.597 c 0 0 1.692 2.23 1.692 2.23 c 0 0 0.099 5.493 0.099 5.493 c 0 0 -0.928 3.311 -0.928 3.311 c 0 0 -7.815 3.964 -7.815 3.964 c 0 0 -1.079 3.438 -1.079 3.438 c 0 0 -1.214 1.554 -1.214 1.554 c 0 0 16.01 20.327 16.01 20.327 c 0 0 0.78 10.061 0.78 10.061 c 0 0 4.756 7.704 4.756 7.704 c 0 0 3.475 2.664 3.475 2.664 c 0 0 4.406 -0.238 4.406 -0.238 c 0 0 1.539 -1.13 1.539 -1.13 c 0 0 2.129 -0.146 2.129 -0.146 c 0 0 1.531 1.491 1.531 1.491 c 0 0 1.29 -1.619 1.29 -1.619 c 0 0 1.709 0.246 1.709 0.246 c 0 0 1.289 0.52 1.289 0.52 c 0 0 2.539 2.53 2.539 2.53 c 0 0 2.012 0.66 2.012 0.66 c 0 0 7.08 4.37 7.08 4.37 c 0 0 4.112 -1.98 4.112 -1.98 c 0 0 10.551 17.862 10.551 17.862 c 0 0 -39.276 29.119 -39.276 29.119 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Illizi"
            },
            "34": {
                "path": "M 320.989 54.6068 c 0 0 -0.019 -1.603 -0.019 -1.603 c 0 0 2.087 -0.288 2.087 -0.288 c 0 0 -0.482 -2.927 -0.482 -2.927 c 0 0 1.669 -2.858 1.669 -2.858 c 0 0 -0.971 -0.972 -0.971 -0.972 c 0 0 0.127 -2.078 0.127 -2.078 c 0 0 -0.963 -0.272 -0.963 -0.272 c 0 0 -1.479 -2.545 -1.479 -2.545 c 0 0 -1.203 -0.363 -1.203 -0.363 c 0 0 -0.962 0.653 -0.962 0.653 c 0 0 -2.853 0.298 -2.853 0.298 c 0 0 -0.779 -0.983 -0.779 -0.983 c 0 0 0.3 -1.875 0.3 -1.875 c 0 0 -1.258 -0.672 -1.258 -0.672 c 0 0 -0.336 1.124 -0.336 1.124 c 0 0 -2.018 0.919 -2.018 0.919 c 0 0 -0.034 2.49 -0.034 2.49 c 0 0 -4.18 1.099 -4.18 1.099 c 0 0 -0.774 -1.701 -0.774 -1.701 c 0 0 -0.783 0.919 -0.783 0.919 c 0 0 -1.362 -0.093 -1.362 -0.093 c 0 0 -0.794 1.241 -0.794 1.241 c 0 0 -1.708 0.861 -1.708 0.861 c 0 0 -0.186 2.385 -0.186 2.385 c 0 0 -1.469 1.134 -1.469 1.134 c 0 0 0.569 1.104 0.569 1.104 c 0 0 2.211 -0.77 2.211 -0.77 c 0 0 2.755 0.987 2.755 0.987 c 0 0 3.392 -1.461 3.392 -1.461 c 0 0 0.863 2.774 0.863 2.774 c 0 0 -1.616 0.625 -1.616 0.625 c 0 0 -0.689 2.095 -0.689 2.095 c 0 0 2.823 0.292 2.823 0.292 c 0 0 -0.36 -0.99 -0.36 -0.99 c 0 0 1.328 -0.64 1.328 -0.64 c 0 0 -0.387 1.092 -0.387 1.092 c 0 0 0.664 0.766 0.664 0.766 c 0 0 2.07 -1.562 2.07 -1.562 c 0 0 2.722 -0.532 2.722 -0.532 c 0 0 1.327 1.669 1.327 1.669 c 0 0 1.167 -0.05 1.167 -0.05 c 0 0 0.184 1.218 0.184 1.218 c 0 0 1.407 -0.51 1.407 -0.51 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Bord-Bou-Arréridj"
            },
            "35": {
                "path": "M 284.507 35.4899 c 0 0 2.089 0.118 2.089 0.118 c 0 0 1.365 -0.714 1.365 -0.714 c 0 0 0.479 -0.984 0.479 -0.984 c 0 0 4.716 0.709 4.716 0.709 c 0 0 -0.218 -1.694 -0.218 -1.694 c 0 0 1.416 -0.319 1.416 -0.319 c 0 0 0.847 0.593 0.847 0.593 c 0 0 -0.165 -1.289 -0.165 -1.289 c 0 0 1.354 0.313 1.354 0.313 c 0 0 -0.771 -0.862 -0.771 -0.862 c 0 0 0.386 -1.441 0.386 -1.441 c 0 0 1.042 0.231 1.042 0.231 c 0 0 0.18 -0.604 0.18 -0.604 c 0 0 0.944 -0.077 0.944 -0.077 c 0 0 0.045 -0.779 0.045 -0.779 c 0 0 1.354 -1.163 1.354 -1.163 c 0 0 -0.135 -1.239 -0.135 -1.239 c 0 0 -3.063 -0.523 -3.063 -0.523 c 0 0 -3.242 1.034 -3.242 1.034 c 0 0 -0.906 1.079 -0.906 1.079 c 0 0 -3.85 1.986 -3.85 1.986 c 0 0 -2.822 -0.274 -2.822 -0.274 c 0 0 -0.271 0.609 -0.271 0.609 c 0 0 0.658 -0.216 0.658 -0.216 c 0 0 0.03 1.021 0.03 1.021 c 0 0 -2.279 0.745 -2.279 0.745 c 0 0 -0.66 -0.482 -0.66 -0.482 c 0 0 0.392 0.701 0.392 0.701 c 0 0 -0.689 0.547 -0.689 0.547 c 0 0 0.756 1.311 0.756 1.311 c 0 0 0.888 -0.351 0.888 -0.351 c 0 0 -0.536 0.479 -0.536 0.479 c 0 0 0.471 0.856 0.471 0.856 c 0 0 -0.385 0.413 -0.385 0.413 c 0 0 0.58 0.266 0.58 0.266 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Boumerdès"
            },
            "36": {
                "path": "M 378.015 24.8629 c 0 0 0.366 0.686 0.366 0.686 c 0 0 -1.139 0.009 -1.139 0.009 c 0 0 -0.031 1.328 -0.031 1.328 c 0 0 -0.939 -0.144 -0.939 -0.144 c 0 0 -0.969 1.141 -0.969 1.141 c 0 0 0.427 0.747 0.427 0.747 c 0 0 -0.57 1.447 -0.57 1.447 c 0 0 0.937 -0.31 0.937 -0.31 c 0 0 0.687 0.501 0.687 0.501 c 0 0 1.188 2.609 1.188 2.609 c 0 0 1.168 -0.382 1.168 -0.382 c 0 0 0.201 0.542 0.201 0.542 c 0 0 -0.047 -0.771 -0.047 -0.771 c 0 0 1.299 0.586 1.299 0.586 c 0 0 0.92 1.85 0.92 1.85 c 0 0 1.383 -0.02 1.383 -0.02 c 0 0 0.272 1.761 0.272 1.761 c 0 0 0.823 -1.258 0.823 -1.258 c 0 0 1.821 -0.823 1.821 -0.823 c 0 0 -0.327 -0.753 -0.327 -0.753 c 0 0 0.471 -0.48 0.471 -0.48 c 0 0 2.326 -0.796 2.326 -0.796 c 0 0 2.308 -2.13 2.308 -2.13 c 0 0 0.916 -0.119 0.916 -0.119 c 0 0 0.696 -2.05 0.696 -2.05 c 0 0 -0.425 -1.147 -0.425 -1.147 c 0 0 -0.861 -0.401 -0.861 -0.401 c 0 0 2.97 -0.532 2.97 -0.532 c 0 0 1.982 -1.323 1.982 -1.323 c 0 0 0.178 -0.521 0.178 -0.521 c 0 0 -1.188 -0.337 -1.188 -0.337 c 0 0 0.199 -2.228 0.199 -2.228 c 0 0 -4.452 1.441 -4.452 1.441 c 0 0 -1.429 -0.654 -1.429 -0.654 c 0 0 -1.822 0.272 -1.822 0.272 c 0 0 -0.981 -0.861 -0.981 -0.861 c 0 0 -4.735 2.676 -4.735 2.676 c 0 0 -3.623 0.444 -3.623 0.444 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "El-Taref"
            },
            "37": {
                "path": "M 144.372 270.771 c 0 0 -13.244 -1.683 -13.244 -1.683 c 0 0 -3.001 -2.419 -3.001 -2.419 c 0 0 -5.835 -7.099 -5.835 -7.099 c 0 0 -0.084 -7.644 -0.084 -7.644 c 0 0 -6.775 -12.676 -6.775 -12.676 c 0 0 -5.777 -21.184 -5.777 -21.184 c 0 0 -5.817 -3.172 -5.817 -3.172 c 0 0 -8.409 -0.353 -8.409 -0.353 c 0 0 -4.977 -4.181 -4.977 -4.181 c 0 0 -1.59 2.116 -1.59 2.116 c 0 0 -2.652 -1.77 -2.652 -1.77 c 0 0 -1.38 0.46 -1.38 0.46 c 0 0 0.685 -1.695 0.685 -1.695 c 0 0 -1.662 -0.829 -1.662 -0.829 c 0 0 -5.937 0.964 -5.937 0.964 c 0 0 -2.253 -0.648 -2.253 -0.648 c 0 0 -5.062 0.498 -5.062 0.498 c 0 0 -1.257 -0.472 -1.257 -0.472 c 0 0 -1.854 1.008 -1.854 1.008 c 0 0 -3.731 -0.108 -3.731 -0.108 c 0 0 -1.934 1.228 -1.934 1.228 c 0 0 -8.19 -2.131 -8.19 -2.131 c 0 0 -5.64 3.248 -5.64 3.248 c 0 0 -4.957 -0.147 -4.957 -0.147 c 0 0 -1.001 1.766 -1.001 1.766 c 0 0 -3.104 0.861 -3.104 0.861 c 0 0 -4.236 3.001 -4.236 3.001 c 0 0 -5.013 2.403 -5.013 2.403 c 0 0 -6.767 5.049 -6.767 5.049 c 0 0 -4.839 1.729 -4.839 1.729 c 0 0 -3.193 35.971 -3.193 35.971 c 0 0 65.958 50.321 65.958 50.321 c 0 0 12.962 -4.238 12.962 -4.238 c -0.001 0 7.204 -6.951 7.204 -6.951 c 0 0 14.179 0.237 14.179 0.237 c 0 0 3.038 -6.721 3.038 -6.721 c 0 0 7.18 -9.721 7.18 -9.721 c 0 0 2.317 -1.98 2.317 -1.98 c 0 0 3.858 -1.585 3.858 -1.585 c 0 0 7.686 0.562 7.686 0.562 c 0 0 1.78 -1.06 1.78 -1.06 c 0 0 3.324 -10.955 3.324 -10.955 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Tindouf"
            },
            "38": {
                "path": "M 244.49 53.8549 c 0 0 0.771 0.672 0.771 0.672 c 0 0 -1.122 1.335 -1.122 1.335 c 0 0 -0.706 -0.143 -0.706 -0.143 c 0 0 -0.332 -0.894 -0.332 -0.894 c 0 0 -0.993 0.542 -0.993 0.542 c 0 0 0.206 1.651 0.206 1.651 c 0 0 -0.649 1.073 -0.649 1.073 c 0 0 1.344 1.67 1.344 1.67 c 0 0 0.59 -2.298 0.59 -2.298 c 0 0 1.271 0.932 1.271 0.932 c 0 0 0.538 -0.305 0.538 -0.305 c 0 0 1.353 0.765 1.353 0.765 c 0 0 0.062 1.415 0.062 1.415 c 0 0 1.953 -0.175 1.953 -0.175 c 0 0 1.045 1.72 1.045 1.72 c 0 0 0.813 0.154 0.813 0.154 c 0 0 0.172 -1.047 0.172 -1.047 c 0 0 0.958 0.974 0.958 0.974 c 0 0 3.797 -0.434 3.797 -0.434 c 0 0 2.436 -1.337 2.436 -1.337 c 0 0 -0.56 0.671 -0.56 0.671 c 0 0 1.55 0.067 1.55 0.067 c 0 0 -0.029 0.951 -0.029 0.951 c 0 0 3.701 -0.316 3.701 -0.316 c 0 0 0.708 -1.967 0.708 -1.967 c 0 0 -2.81 -0.739 -2.81 -0.739 c 0 0 -0.347 -1.359 -0.347 -1.359 c 0 0 0.504 -0.619 0.504 -0.619 c 0 0 2.226 0.229 2.226 0.229 c 0 0 0.901 -3.905 0.901 -3.905 c 0 0 -1.561 -0.133 -1.561 -0.133 c 0 0 -0.842 -1.107 -0.842 -1.107 c 0 0 -1.228 -0.057 -1.228 -0.057 c 0 0 -0.44 -0.937 -0.44 -0.937 c 0 0 -2.687 0.709 -2.687 0.709 c 0 0 0.006 -1.004 0.006 -1.004 c 0 0 -2.634 2.928 -2.634 2.928 c 0 0 -0.774 0.021 -0.774 0.021 c 0 0 -0.399 -1.149 -0.399 -1.149 c 0 0 -2.134 -0.251 -2.134 -0.251 c 0 0 -1.909 -1.17 -1.909 -1.17 c 0 0 -1.035 -1.876 -1.035 -1.876 c 0 0 -1.22 1.163 -1.22 1.163 c 0 0 -0.035 0.865 -0.035 0.865 c 0 0 -2.264 0.618 -2.264 0.618 c 0 0 0.384 0.35 0.384 0.35 c 0 0 -0.518 0.333 -0.518 0.333 c 0 0 -0.061 1.414 -0.061 1.414 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Tissemsilt"
            },
            "39": {
                "path": "M 381.341 91.9338 c 0 0 -8.26 -0.416 -8.26 -0.416 c 0 0 -4.264 -1.485 -4.264 -1.485 c 0 0 -4.422 0.397 -4.422 0.397 c 0 0 -0.09 4.578 -0.09 4.578 c 0 0 -1.543 -0.353 -1.543 -0.353 c 0 0 -5.193 -3.142 -5.193 -3.142 c 0 0 -0.05 -2.156 -0.05 -2.156 c 0 0 -1.726 2.196 -1.726 2.196 c 0 0 -1.654 0.581 -1.654 0.581 c 0 0 -1.451 -1.393 -1.451 -1.393 c 0 0 -5.732 -2.047 -5.732 -2.047 c 0 0 -5.311 1.305 -5.311 1.305 c 0 0 -11.927 -1.27 -11.927 -1.27 c 0 0 -2.287 -1.521 -2.287 -1.521 c 0 0 -1.104 0.629 -1.104 0.629 c 0 0 0.72 0.627 0.72 0.627 c 0 0 -1.889 1.328 -1.889 1.328 c 0 0 1.198 1.354 1.198 1.354 c 0 0 -0.702 1.853 -0.702 1.853 c 0 0 3.667 3.255 3.667 3.255 c 0 0 -1.968 4.695 -1.968 4.695 c 0 0 -0.858 4.001 -0.858 4.001 c 0 0 1.083 2.091 1.083 2.091 c 0 0 0.35 4.628 0.35 4.628 c 0 0 0.688 1.585 0.688 1.585 c 0 0 -0.662 1.726 -0.662 1.726 c 0 0 17.299 -0.319 17.299 -0.319 c 0 0 -0.374 -2.7 -0.374 -2.7 c 0 0 -1.172 -1.467 -1.172 -1.467 c 0 0 0.955 -1.07 0.955 -1.07 c 0 0 -0.04 -2.557 -0.04 -2.557 c 0 0 -1.138 -2.602 -1.138 -2.602 c 0 0 0.047 -1.4 0.047 -1.4 c 0 0 0.665 -0.606 0.665 -0.606 c 0 0 0.552 1.049 0.552 1.049 c 0 0 2.721 -2.135 2.721 -2.135 c 0 0 0.762 -0.112 0.762 -0.112 c 0 0 0.521 1.041 0.521 1.041 c 0 0 0.319 -0.807 0.319 -0.807 c 0 0 1.219 7.663 1.219 7.663 c 0 0 8.097 22.969 8.097 22.969 c 0 0 7.777 11.58 7.777 11.58 c 0 0 5.501 6.366 5.501 6.366 c 0 0 39.729 -4.259 39.729 -4.259 c 0 0 -15.994 -9.721 -15.994 -9.721 c 0 0 -1.19 -8.167 -1.19 -8.167 c 0 0 -4.769 -5.554 -4.769 -5.554 c 0 0 -0.044 -1.279 -0.044 -1.279 c 0 0 -4.671 -1.931 -4.671 -1.931 c 0 0 -1.588 -0.012 -1.588 -0.012 c 0 0 -1.992 -6.096 -1.992 -6.096 c 0 0 -3.565 -5.578 -3.565 -5.578 c 0 0 -0.276 -2.739 -0.276 -2.739 c 0 0 -1.411 -1.059 -1.411 -1.059 c 0 0 0.465 -1.005 0.465 -1.005 c 0 0 -0.633 -1.784 -0.633 -1.784 c 0 0 0.574 -2.841 0.574 -2.841 c 0 0 -0.731 -1.183 -0.731 -1.183 c 0 0 1.695 -1.198 1.695 -1.198 c 0 0 0.905 -2.192 0.905 -2.192 c 0 0 1.676 0.677 1.676 0.677 c 0 0 1.6 -1.261 1.6 -1.261 c 0 0 -0.104 -0.757 -0.104 -0.757 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "El Oued"
            },
            "40": {
                "path": "M 368.82 90.0319 c 0 0 0.773 -5.083 0.773 -5.083 c 0 0 2.108 -3.938 2.108 -3.938 c 0 0 0.024 -1.697 0.024 -1.697 c 0 0 -0.637 -0.956 -0.637 -0.956 c 0 0 0.749 -2.004 0.749 -2.004 c 0 0 -0.868 -2.387 -0.868 -2.387 c 0 0 -1.271 -0.098 -1.271 -0.098 c 0 0 -0.661 0.97 -0.661 0.97 c 0 0 -0.441 1.352 -0.441 1.352 c 0 0 0.5 -0.146 0.5 -0.146 c 0 0 -0.088 1.582 -0.088 1.582 c 0 0 -0.908 -2.111 -0.908 -2.111 c 0 0 1.39 -3.602 1.39 -3.602 c 0 0 1.306 -0.817 1.306 -0.817 c 0 0 1.429 -2.436 1.429 -2.436 c 0 0 -1.051 -1.557 -1.051 -1.557 c 0 0 0.787 -1.188 0.787 -1.188 c 0 0 -0.763 -0.573 -0.763 -0.573 c 0 0 -0.117 -2.443 -0.117 -2.443 c 0 0 3.133 -1.131 3.133 -1.131 c 0 0 -0.659 -1.052 -0.659 -1.052 c 0 0 -0.692 -0.061 -0.692 -0.061 c 0 0 -0.333 -1.191 -0.333 -1.191 c 0 0 -0.393 -0.313 -0.393 -0.313 c 0 0 -0.6 0.601 -0.6 0.601 c 0 0 0.179 -0.579 0.179 -0.579 c 0 0 -1.313 -0.926 -1.313 -0.926 c 0 0 -0.409 1.4 -0.409 1.4 c 0 0 -1.048 0.308 -1.048 0.308 c 0 0 0.063 -2.164 0.063 -2.164 c 0 0 -1.77 -0.877 -1.77 -0.877 c 0 0 -0.119 0.549 -0.119 0.549 c 0 0 -1.815 -0.27 -1.815 -0.27 c 0 0 -0.957 2.009 -0.957 2.009 c 0 0 -1.648 -0.483 -1.648 -0.483 c 0 0 0.408 -1.016 0.408 -1.016 c 0 0 -0.614 -0.53 -0.614 -0.53 c 0 0 -4.031 0.609 -4.031 0.609 c 0 0 -0.774 -1.595 -0.774 -1.595 c 0 0 -0.214 1.337 -0.214 1.337 c 0 0 0.74 1.491 0.74 1.491 c 0 0 -0.612 1.515 -0.612 1.515 c 0 0 -2.418 0.598 -2.418 0.598 c 0 0 -1.491 1.387 -1.491 1.387 c 0 0 0.634 1.334 0.634 1.334 c 0 0 -0.178 1.438 -0.178 1.438 c 0 0 1.052 0.219 1.052 0.219 c 0 0 -1.644 1.396 -1.644 1.396 c 0 0 0.23 2.636 0.23 2.636 c 0 0 -1.308 1.429 -1.308 1.429 c 0 0 0.438 1.353 0.438 1.353 c 0 0 -0.401 0.844 -0.401 0.844 c 0 0 0.802 0.146 0.802 0.146 c 0 0 1.347 2.256 1.347 2.256 c 0 0 -0.499 0.58 -0.499 0.58 c 0 0 0.611 0.482 0.611 0.482 c 0 0 -0.812 0.796 -0.812 0.796 c 0 0 0.634 2.146 0.634 2.146 c 0 0 1.087 -0.603 1.087 -0.603 c 0 0 0.737 -1.717 0.737 -1.717 c 0 0 1.138 -0.063 1.138 -0.063 c 0 0 -0.399 0.473 -0.399 0.473 c 0 0 1.047 1.056 1.047 1.056 c 0 0 -0.415 0.997 -0.415 0.997 c 0 0 0.821 -0.196 0.821 -0.196 c 0 0 -0.726 2.389 -0.726 2.389 c 0 0 0.163 3.493 0.163 3.493 c 0 0 -1.047 2.038 -1.047 2.038 c 0 0 0.517 1.927 0.517 1.927 c 0 0 0.05 2.157 0.05 2.157 c 0 0 5.193 3.14 5.193 3.14 c 0 0 1.543 0.354 1.543 0.354 c 0 0 0.09 -4.578 0.09 -4.578 c 0 0 4.421 -0.406 4.421 -0.406 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Khenchela"
            },
            "41": {
                "path": "M 389.163 47.3318 c 0 0 -2.177 -1.081 -2.177 -1.081 c 0 0 -2.499 1.112 -2.499 1.112 c 0 0 -1.255 -0.156 -1.255 -0.156 c 0 0 -2.103 2.353 -2.103 2.353 c 0 0 -1.622 0.03 -1.622 0.03 c 0 0 -1.877 -1.4 -1.877 -1.4 c 0 0 -0.397 1.363 -0.397 1.363 c 0 0 -0.817 0.485 -0.817 0.485 c 0 0 0.354 1.537 0.354 1.537 c 0 0 -2.814 0.214 -2.814 0.214 c 0 0 0.03 -1.478 0.03 -1.478 c 0 0 -2.674 -0.94 -2.674 -0.94 c 0 0 -1.024 -1.331 -1.024 -1.331 c 0 0 -0.649 -2.12 -0.649 -2.12 c 0 0 -0.736 -0.046 -0.736 -0.046 c 0 0 -0.424 -2.263 -0.424 -2.263 c 0 0 -0.75 -0.918 -0.75 -0.918 c 0 0 0.494 -1.348 0.494 -1.348 c 0 0 2.854 0.539 2.854 0.539 c 0 0 2.52 -0.934 2.52 -0.934 c 0 0 1.194 0.271 1.194 0.271 c 0 0 2.159 -2.081 2.159 -2.081 c 0 0 2.218 -0.172 2.218 -0.172 c 0 0 0.375 -0.438 0.375 -0.438 c 0 0 -1.08 -1.382 -1.08 -1.382 c 0 0 0.194 -1.316 0.194 -1.316 c 0 0 1.022 0.411 1.022 0.411 c 0 0 1.832 -1.544 1.832 -1.544 c 0 0 1.383 -0.021 1.383 -0.021 c 0 0 0.272 1.761 0.272 1.761 c 0 0 0.821 -1.258 0.821 -1.258 c 0 0 1.822 -0.823 1.822 -0.823 c 0 0 3.195 0.846 3.195 0.846 c 0 0 0.745 -0.53 0.745 -0.53 c 0 0 1.177 0.636 1.177 0.636 c 0 0 -0.594 1.719 -0.594 1.719 c 0 0 0.381 1.252 0.381 1.252 c 0 0 -1.052 1.066 -1.052 1.066 c 0 0 0.396 0.812 0.396 0.812 c 0 0 -0.868 1.572 -0.868 1.572 c 0 0 0.833 1.825 0.833 1.825 c 0 0 -0.868 1.552 -0.868 1.552 c 0 0 0.009 2.224 0.009 2.224 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Souk Ahras"
            },
            "42": {
                "path": "M 250.882 35.7498 c 0 0 -1.098 2.467 -1.098 2.467 c 0 0 1.42 2.608 1.42 2.608 c 0 0 1.47 -1.099 1.47 -1.099 c 0 0 0.288 -1.11 0.288 -1.11 c 0 0 3.892 0.806 3.892 0.806 c 0 0 2.96 -0.969 2.96 -0.969 c 0 0 2.729 0.814 2.729 0.814 c 0 0 4.677 0.011 4.677 0.011 c 0 0 1.037 -1.463 1.037 -1.463 c 0 0 1.568 0.302 1.568 0.302 c 0 0 0.447 -0.642 0.447 -0.642 c 0 0 -0.442 -0.802 -0.442 -0.802 c 0 0 1.06 -0.14 1.06 -0.14 c 0 0 1.479 -1.647 1.479 -1.647 c 0 0 2.109 -0.599 2.109 -0.599 c 0 0 -0.34 -1.022 -0.34 -1.022 c 0 0 -0.134 -1.446 -0.134 -1.446 c 0 0 -5.189 2.836 -5.189 2.836 c 0 0 -2.726 -0.038 -2.726 -0.038 c 0 0 -0.48 -1.023 -0.48 -1.023 c 0 0 -1.177 -0.279 -1.177 -0.279 c 0 0 -6.739 2.031 -6.739 2.031 c 0 0 -2.311 -0.272 -2.311 -0.272 c 0 0 -4.5 0.676 -4.5 0.676 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Tipaza"
            },
            "43": {
                "path": "M 344.575 51.2509 c 0 0 -3.583 -0.418 -3.583 -0.418 c 0 0 -0.49 0.384 -0.49 0.384 c 0 0 1.2 -1.293 1.2 -1.293 c 0 0 -1.162 -1.213 -1.162 -1.213 c 0 0 0.688 -0.604 0.688 -0.604 c 0 0 -0.284 -2.085 -0.284 -2.085 c 0 0 -1.715 -0.398 -1.715 -0.398 c 0 0 -0.049 -1.869 -0.049 -1.869 c 0 0 0.978 -0.521 0.978 -0.521 c 0 0 -2.188 -2.367 -2.188 -2.367 c 0 0 0.097 -1.172 0.097 -1.172 c 0 0 -1.395 -0.427 -1.395 -0.427 c 0 0 0.114 -1.347 0.114 -1.347 c 0 0 -1.244 -0.953 -1.244 -0.953 c 0 0 0.125 -2.048 0.125 -2.048 c 0 0 -0.558 -0.717 -0.558 -0.717 c 0 0 1.112 -0.339 1.112 -0.339 c 0 0 1.367 0.723 1.367 0.723 c 0 0 1.504 -0.447 1.504 -0.447 c 0 0 1.242 -1.67 1.242 -1.67 c 0 0 4.855 0.813 4.855 0.813 c 0 0 1.86 -1.232 1.86 -1.232 c 0 0 0.435 0.64 0.435 0.64 c 0 0 2.741 0.48 2.741 0.48 c 0 0 0.968 -0.175 0.968 -0.175 c 0 0 -0.021 1.6 -0.021 1.6 c 0 0 -3.296 0.765 -3.296 0.765 c 0 0 0.284 2.021 0.284 2.021 c 0 0 -0.921 1.877 -0.921 1.877 c 0 0 1.318 -0.403 1.318 -0.403 c 0 0 1.126 0.879 1.126 0.879 c 0 0 -0.265 1.486 -0.265 1.486 c 0 0 0.788 0.496 0.788 0.496 c 0 0 1.019 -0.295 1.019 -0.295 c 0 0 0.938 0.805 0.938 0.805 c 0 0 -0.108 1.354 -0.108 1.354 c 0 0 -2.365 0.863 -2.365 0.863 c 0 0 -0.161 2.791 -0.161 2.791 c 0 0 -1.221 1.531 -1.221 1.531 c 0 0 -0.78 -0.115 -0.78 -0.115 c 0 0 0.213 0.771 0.213 0.771 c 0 0 -0.716 -0.51 -0.716 -0.51 c 0 0 -1.649 0.227 -1.649 0.227 c 0 0 -0.801 2.112 -0.801 2.112 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Mila"
            },
            "44": {
                "path": "M 270.211 41.3839 c 0 0 -2.993 -2.104 -2.993 -2.104 c 0 0 -4.677 -0.01 -4.677 -0.01 c 0 0 -2.729 -0.815 -2.729 -0.815 c 0 0 -2.959 0.969 -2.959 0.969 c 0 0 -3.893 -0.807 -3.893 -0.807 c 0 0 -0.288 1.111 -0.288 1.111 c 0 0 -1.47 1.098 -1.47 1.098 c 0 0 -1.42 -2.607 -1.42 -2.607 c 0 0 -2.229 1.641 -2.229 1.641 c 0 0 -0.129 1.172 -0.129 1.172 c 0 0 1.495 1.622 1.495 1.622 c 0 0 -1.196 1.17 -1.196 1.17 c 0 0 1.829 0.536 1.829 0.536 c 0 0 -1.33 0.886 -1.33 0.886 c 0 0 0.004 1.019 0.004 1.019 c 0 0 0.681 0.703 0.681 0.703 c 0 0 0.8 -0.179 0.8 -0.179 c 0 0 -0.257 1.099 -0.257 1.099 c 0 0 0.683 1.606 0.683 1.606 c 0 0 1.268 0.909 1.268 0.909 c 0 0 -0.254 1.759 -0.254 1.759 c 0 0 2.133 0.25 2.133 0.25 c 0 0 0.4 1.149 0.4 1.149 c 0 0 0.774 -0.02 0.774 -0.02 c 0 0 2.635 -2.928 2.635 -2.928 c 0 0 -0.007 1.003 -0.007 1.003 c 0 0 2.686 -0.708 2.686 -0.708 c 0 0 0.44 0.937 0.44 0.937 c 0 0 1.229 0.056 1.229 0.056 c 0 0 0.841 1.108 0.841 1.108 c 0 0 1.563 0.131 1.563 0.131 c 0 0 1.051 -1.104 1.051 -1.104 c 0 0 -0.338 -0.876 -0.338 -0.876 c 0 0 1.985 0.074 1.985 0.074 c 0 0 0.315 -2.776 0.315 -2.776 c 0 0 0.861 0.234 0.861 0.234 c 0 0 1.841 -1.11 1.841 -1.11 c 0 0 0.063 -1.843 0.063 -1.843 c 0 0 -1.346 -0.305 -1.346 -0.305 c 0 0 -0.084 -1.369 -0.084 -1.369 c 0 0 -0.708 -0.199 -0.708 -0.199 c 0 0 0.625 -1.91 0.625 -1.91 c 0 0 1.347 0.043 1.347 0.043 c 0 0 0.758 -0.615 0.758 -0.615 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Aïn Defla"
            },
            "45": {
                "path": "M 190.745 93.6368 c 0 0 1.08 1.632 1.08 1.632 c 0 0 2.133 -1.567 2.133 -1.567 c 0 0 0.589 1.018 0.589 1.018 c 0 0 0.342 -0.416 0.342 -0.416 c 0 0 2.966 0.896 2.966 0.896 c 0 0 4.055 -2.511 4.055 -2.511 c 0 0 1.843 1.041 1.843 1.041 c 0 0 3.133 9.769 3.133 9.769 c 0 0 0.314 -1.128 0.314 -1.128 c 0 0 0.854 0.04 0.854 0.04 c 0 0 2.091 -2.885 2.091 -2.885 c 0 0 1.632 -0.712 1.632 -0.712 c 0 0 1.374 0.198 1.374 0.198 c 0 0 0.176 2.472 0.176 2.472 c 0 0 1.795 -0.807 1.795 -0.807 c 0 0 1.055 0.748 1.055 0.748 c 0 0 -0.204 2.644 -0.204 2.644 c 0 0 0.751 0.279 0.751 0.279 c 0 0 0.729 1.792 0.729 1.792 c 0 0 0.76 0.113 0.76 0.113 c 0 0 -2.123 1.127 -2.123 1.127 c 0 0 0.829 2.979 0.829 2.979 c 0 0 -2.931 13.106 -2.931 13.106 c 0 0 0.843 2.448 0.843 2.448 c 0 0 -0.887 0.991 -0.887 0.991 c 0 0 0.673 0.434 0.673 0.434 c 0 0 -0.593 1.588 -0.593 1.588 c 0 0 -1.563 0.854 -1.563 0.854 c 0 0 -0.278 1.842 -0.278 1.842 c 0 0 0.827 0.472 0.827 0.472 c 0 0 -0.27 1.131 -0.27 1.131 c 0 0 0.979 1.097 0.979 1.097 c 0 0 -0.398 1.535 -0.398 1.535 c 0 0 0.432 2.39 0.432 2.39 c 0 0 -2.988 5.758 -2.988 5.758 c 0 0 -1.629 2.4 -1.629 2.4 c 0 0 -2.417 -0.518 -2.417 -0.518 c 0 0 -1.803 1.33 -1.803 1.33 c 0 0 -6.79 -1.902 -6.79 -1.902 c 0 0 -5.834 3.103 -5.834 3.103 c 0 0 -0.298 -1.563 -0.298 -1.563 c 0 0 -1.384 -0.042 -1.384 -0.042 c 0 0 0.542 -2.863 0.542 -2.863 c 0 0 -1.428 -0.123 -1.428 -0.123 c 0 0 -0.163 -2.392 -0.163 -2.392 c 0 0 2.868 -2.595 2.868 -2.595 c 0 0 -5.768 -4.648 -5.768 -4.648 c 0 0 -2.38 -1.182 -2.38 -1.182 c 0 0 -3.35 -5.675 -3.35 -5.675 c 0 0 1.262 -0.418 1.262 -0.418 c 0 0 0.377 -2.404 0.377 -2.404 c 0 0 -2.205 -2.094 -2.205 -2.094 c 0 0 -1.938 -3.413 -1.938 -3.413 c 0 0 0.196 -2.568 0.196 -2.568 c 0 0 1.717 -3.813 1.717 -3.813 c 0 0 -0.095 -1.926 -0.095 -1.926 c 0 0 -1.187 -2.013 -1.187 -2.013 c 0 0 -1.795 -0.51 -1.795 -0.51 c 0 0 0.209 -0.893 0.209 -0.893 c 0 0 1.274 -0.928 1.274 -0.928 c 0 0 -0.546 -2.521 -0.546 -2.521 c 0 0 1.185 -5.71 1.185 -5.71 c 0 0 3.61 -2.62 3.61 -2.62 c 0 0 4.992 0.022 4.992 0.022 c 0 0 1.227 -1.408 1.227 -1.408 c 0 0 1.531 -0.481 1.531 -0.481 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Naâma"
            },
            "46": {
                "path": "M 193.764 72.7758 c 0 0 -0.686 0.069 -0.686 0.069 c 0 0 -0.264 -0.909 -0.264 -0.909 c 0 0 -3.488 -1.748 -3.488 -1.748 c 0 0 -0.331 0.33 -0.331 0.33 c 0 0 -0.372 -0.771 -0.372 -0.771 c 0 0 -1.081 0.455 -1.081 0.455 c 0 0 -2.338 -0.793 -2.338 -0.793 c 0 0 -0.918 1.336 -0.918 1.336 c 0 0 -1.082 0.265 -1.082 0.265 c 0 0 -1.053 -0.668 -1.053 -0.668 c 0 0 0.202 -0.954 0.202 -0.954 c 0 0 -0.848 -0.622 -0.848 -0.622 c 0 0 2.669 -1.768 2.669 -1.768 c 0 0 1.627 0.143 1.627 0.143 c 0 0 2.119 -1.243 2.119 -1.243 c 0 0 2.023 -5.607 2.023 -5.607 c 0 0 0.896 0.035 0.896 0.035 c 0 0 2.06 -1.622 2.06 -1.622 c 0 0 1.342 1.43 1.342 1.43 c 0 0 -0.223 0.718 -0.223 0.718 c 0 0 1.008 0.007 1.008 0.007 c 0 0 -0.383 1.02 -0.383 1.02 c 0 0 -0.893 0.251 -0.893 0.251 c 0 0 0.174 1.591 0.174 1.591 c 0 0 0.012 -0.62 0.012 -0.62 c 0 0 0.895 -0.046 0.895 -0.046 c 0 0 -0.201 -0.597 -0.201 -0.597 c 0 0 0.82 0.657 0.82 0.657 c 0 0 1.569 0.021 1.569 0.021 c 0 0 5.065 -1.624 5.065 -1.624 c 0 0 0.775 2.923 0.775 2.923 c 0 0 -0.771 0.563 -0.771 0.563 c 0 0 -0.027 1.102 -0.027 1.102 c 0 0 -2.838 0.497 -2.838 0.497 c 0 0 -0.066 0.729 -0.066 0.729 c 0 0 -0.97 0.456 -0.97 0.456 c 0 0 -0.813 -0.548 -0.813 -0.548 c 0 0 -0.781 1.395 -0.781 1.395 c 0 0 -0.672 -0.18 -0.672 -0.18 c 0 0 0.286 1.946 0.286 1.946 c 0 0 -1.38 0.461 -1.38 0.461 c 0 0 -0.248 1.451 -0.248 1.451 c 0 0 -0.815 0.469 -0.815 0.469 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Aïn Témouchent"
            },
            "47": {
                "path": "M 280.112 227.213 c 0 0 8.227 -3.631 8.227 -3.631 c 0 0 6.762 -14.091 6.762 -14.091 c 0 0 1.58 -1.093 1.58 -1.093 c 0 0 10.495 -36.704 10.495 -36.704 c 0 0 3.17 -8.157 3.17 -8.157 c 0 0 0.768 -17.01 0.768 -17.01 c 0 0 6.761 -7.312 6.761 -7.312 c 0 0 5.039 -9.304 5.039 -9.304 c 0 0 -11.871 -3.224 -11.871 -3.224 c 0 0 -13.08 -0.901 -13.08 -0.901 c 0 0 -0.77 0.422 -0.77 0.422 c 0 0 -2.684 -1.107 -2.684 -1.107 c 0 0 -0.903 0.387 -0.903 0.387 c 0 0 -0.305 -0.512 -0.305 -0.512 c 0 0 -0.417 0.754 -0.417 0.754 c 0 0 -0.439 -0.318 -0.439 -0.318 c 0 0 -0.945 0.734 -0.945 0.734 c 0 0 -7.853 0.362 -7.853 0.362 c 0 0 3.66 2.229 3.66 2.229 c 0 0 0.331 2.904 0.331 2.904 c 0 0 -8.55 -2.039 -8.55 -2.039 c 0 0 -5.37 1.604 -5.37 1.604 c 0 0 -10.825 0.946 -10.825 0.946 c 0 0 0.565 6.182 0.565 6.182 c 0 0 1.917 7.688 1.917 7.688 c 0 0 -2.573 1.672 -2.573 1.672 c 0 0 0.721 8.612 0.721 8.612 c 0 0 -4.648 5.148 -4.648 5.148 c 0 0 -0.682 28.618 -0.682 28.618 c 0 0 -2.644 13.284 -2.644 13.284 c 0 0 4.271 23.744 4.271 23.744 c 0 0 -1.117 4.883 -1.117 4.883 c 0 0 10.266 -3.805 10.266 -3.805 c 0 0 11.143 -0.965 11.143 -0.965 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Ghardaïa"
            },
            "48": {
                "path": "M 232.66 64.2719 c 0 0 -2.048 -0.317 -2.048 -0.317 c 0 0 -0.295 -0.662 -0.295 -0.662 c 0 0 -1.721 0.085 -1.721 0.085 c 0 0 -0.918 -0.917 -0.918 -0.917 c 0 0 -1.891 0.041 -1.891 0.041 c 0 0 -1.282 -1.803 -1.282 -1.803 c 0 0 -0.858 0.611 -0.858 0.611 c 0 0 -0.125 -0.523 -0.125 -0.523 c 0 0 -1.717 0.492 -1.717 0.492 c 0 0 -1.217 -3.61 -1.217 -3.61 c 0 0 -0.578 -0.193 -0.578 -0.193 c 0 0 1.744 -2.074 1.744 -2.074 c 0 0 0.867 -0.538 0.867 -0.538 c 0 0 0.877 0.373 0.877 0.373 c 0 0 1.332 -1.438 1.332 -1.438 c 0 0 -0.229 -0.909 -0.229 -0.909 c 0 0 0.59 -0.991 0.59 -0.991 c 0 0 -0.674 0.036 -0.674 0.036 c 0 0 -0.313 -0.769 -0.313 -0.769 c 0 0 0.846 -1.018 0.846 -1.018 c 0 0 1.226 0.572 1.226 0.572 c 0 0 0.555 -0.605 0.555 -0.605 c 0 0 2.126 -0.093 2.126 -0.093 c 0 0 -0.359 -0.87 -0.359 -0.87 c 0 0 0.634 -0.699 0.634 -0.699 c 0 0 -1.289 -1.35 -1.289 -1.35 c 0 0 1.979 -2.472 1.979 -2.472 c 0 0 2.056 0.32 2.056 0.32 c 0 0 2.173 -0.8 2.173 -0.8 c 0 0 0.468 1.894 0.468 1.894 c 0 0 0.536 0.021 0.536 0.021 c 0 0 -0.826 1.687 -0.826 1.687 c 0 0 0.509 -0.155 0.509 -0.155 c 0 0 0.519 1.997 0.519 1.997 c 0 0 1.775 -0.663 1.775 -0.663 c 0 0 -0.347 0.244 -0.347 0.244 c 0 0 0.593 0.041 0.593 0.041 c 0 0 0.541 1.179 0.541 1.179 c 0 0 1.563 0.984 1.563 0.984 c 0 0 2.838 -0.813 2.838 -0.813 c 0 0 2.173 3.286 2.173 3.286 c 0 0 0.771 0.672 0.771 0.672 c 0 0 -1.122 1.335 -1.122 1.335 c 0 0 -0.706 -0.142 -0.706 -0.142 c 0 0 -0.332 -0.895 -0.332 -0.895 c 0 0 -0.993 0.542 -0.993 0.542 c 0 0 0.206 1.651 0.206 1.651 c 0 0 -0.649 1.074 -0.649 1.074 c 0 0 -1.449 0.571 -1.449 0.571 c 0 0 -0.567 0.986 -0.567 0.986 c 0 0 -2.058 -0.207 -2.058 -0.207 c 0 0 -0.165 0.913 -0.165 0.913 c 0 0 -0.811 -0.11 -0.811 -0.11 c 0 0 -0.112 0.868 -0.112 0.868 c 0 0 -1.215 0.097 -1.215 0.097 c 0 0 -1.728 2.879 -1.728 2.879 c 0 0 -0.903 0.185 -0.903 0.185 c 0 0 0 0 0 0 c 0 0 0 0 0 0",
                "name": "Relizane"
            }
        },
        "height": 500,
        "width": 508
    });