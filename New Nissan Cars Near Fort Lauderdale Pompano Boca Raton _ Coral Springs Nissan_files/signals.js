var UUID = (function () {
    var self = {};
    var lut = [];
    for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + (i).toString(16)
    }
    self.generate = function () {
        var d0 = Math.random() * 0xffffffff | 0;
        var d1 = Math.random() * 0xffffffff | 0;
        var d2 = Math.random() * 0xffffffff | 0;
        var d3 = Math.random() * 0xffffffff | 0;
        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff]
    }
    return self
})();
(function () {
    var async = {};
    var root, previous_async;
    root = this;
    if (root != null) {
        previous_async = root.async
    }
    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments)
                }
                return fn.next()
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1) : null
            };
            return fn
        };
        return makeCallback(0)
    };
    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err)
                }
                async.until(test, iterator, callback)
            })
        } else {
            callback()
        }
    };
    root.async = async
}());
var networkStatus = {};
var gaUmtc = '';
var gaUmtz = '';
var keyvaluepairs = {};
var motofuzeCookieAlt = [];
var vendorConfigRetrieved = !1;
var cookieSynced = !1;
var vdpStockScriptString = "";
var vdpVinScriptString = "";
var vdpNewPatternString = "";
var vdpUsedPatternString = "";
var srpStockScriptString = "";
var srpVinScriptString = "";
var srpNewPatternString = "";
var srpUsedPatternString = "";
var srpVehicleContainer = "";
var MotoFuze = MotoFuze || {};
MotoFuze.Signals = (function () {
    var WebsiteId = null;
    var signalsDomain = 'aalnk.com';
    var getMotoFuzeCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        var cookieValue = "";
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) cookieValue = c.substring(name.length, c.length)
        }
        if (cookieValue.length === 0) {
            try {
                if (typeof motofuzeCookieAlt[cname] === "undefined") {
                    cookieValue = ""
                } else {
                    cookieValue = motofuzeCookieAlt[cname]
                }
            } catch (e) {
                cookieValue = ""
            }
        }
        return cookieValue
    }
    var setMotoFuzeCookie = function (cname, cvalue, exdays, domainval) {
        var d = new Date();
        d.setTime(d.getTime() + (1 * 1 * 1 * 60 * 1000));
        var expires = "Expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=" + domainval + '; Path=/; SameSite=None; Secure';
        motofuzeCookieAlt[cname] = cvalue;
        setTimeout(function () {
            sendSavedCookie()
        }, 0)
    }
    var deleteMotoFuzeCookie = function (cname, cvalue, domainval) {
        var d = new Date();
        d.setTime(0);
        var expires = "Expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=" + domainval + '; Path=/; SameSite=None; Secure';
        motofuzeCookieAlt[cname] = ""
    }
    var sendSavedCookie = function () {
        try {
            var sessionMagic = getSessionMagic(WebsiteId);
            var permyMagic = getPermyMagic();
            var mfUuid = getMotoFuzeCookie("mf_uuid");
            var gaUmtc = getMotoFuzeCookie('__utmc');
            var gaUmtz = getMotoFuzeCookie('__utmz');
            var url = ('https:' == document.location.protocol ? 'https://' : 'http://') + signalsDomain + '/HandleSignal.ashx?s_type=trackPageview&s_wsID=' + WebsiteId + '&s_pg=' + escape(document.location) + (mfUuid.length > 0 ? '&mf_uuid=' + mfUuid : '') + '&s_ref=' + escape(document.referrer) + '&s_pt=' + escape(document.title) + '&smc=' + sessionMagic + '&mmc=' + permyMagic + '&s_gaUmtc=' + escape(gaUmtc) + '&s_gaUmtz=' + escape(gaUmtz) + '&s_gUser=' + networkStatus.Google + '&s_gpUser=' + networkStatus.GooglePlus + '&s_tUser=' + networkStatus.Twitter + '&s_fUser=' + networkStatus.Facebook + '&cachebuster=' + Math.round(new Date().getTime() / 1000);
            var oImg = document.createElement("img");
            oImg.setAttribute('src', url);
            oImg.setAttribute('height', '1');
            oImg.setAttribute('width', '1');
            oImg.setAttribute('style', 'display:none');
            document.body.appendChild(oImg);
            var pfurl = getPfzUrlString(WebsiteId, permyMagic);
            if (pfurl != null && pfurl != '') {
                var oPfz = document.createElement("img");
                oPfz.setAttribute('src', pfurl);
                oPfz.setAttribute('height', '1');
                oPfz.setAttribute('width', '1');
                oPfz.setAttribute('style', 'display:none');
                document.body.appendChild(oPfz)
            }
            var mfsub = getMotoFuzeCookie("mfzsubparm");
            if (mfsub != null && mfsub != '') {
                var urlsub = 'https://' + signalsDomain + '/HandleSignal.ashx?s_type=submit&s_wsID=' + WebsiteId + '&s_pg=' + escape(document.location) + (mfUuid.length > 0 ? '&mf_uuid=' + mfUuid : '') + '&s_ref=' + escape(document.referrer) + '&s_pt=' + escape(document.title) + '&smc=' + sessionMagic + '&mmc=' + permyMagic + '&cachebuster=' + Math.round(new Date().getTime() / 1000);
                var fullsuburl = urlsub + "&sub=" + mfsub;
                var oImgSub = document.createElement("img");
                oImgSub.setAttribute('src', fullsuburl);
                oImgSub.setAttribute('height', '1');
                oImgSub.setAttribute('width', '1');
                oImgSub.setAttribute('style', 'display:none');
                document.body.appendChild(oImgSub);
                deleteMotoFuzeCookie("mfzsubparm", "", window.location.hostname)
            }
        } catch (e) { }
    }
    var trackPageview = function () {
        try {
            var sessionMagic = getSessionMagic(WebsiteId);
            var permyMagic = getPermyMagic();
            var mfUuid = getMotoFuzeCookie("mf_uuid");
            var vehicleInfo;
            var vehicleInfo = getVehicleInfo();
            var encodedVehicleData = '';
            if (vehicleInfo.length > 0) {
                var stockNumbers = '';
                var vinNumbers = '';
                for (var i = 0; i < vehicleInfo.length; i++) {
                    if (i % 2 == 0) {
                        stockNumbers = stockNumbers + vehicleInfo[i];
                        if (i < (vehicleInfo.length - 2)) {
                            stockNumbers = stockNumbers + '|'
                        }
                    } else {
                        vinNumbers = vinNumbers + vehicleInfo[i];
                        if (i < (vehicleInfo.length - 1)) {
                            vinNumbers = vinNumbers + '|'
                        }
                    }
                }
                var vehicleData = stockNumbers + ';' + vinNumbers;
                var ie_version = getInternetExplorerVersion();
                if (ie_version > 0 && ie_version < 9) {
                    encodedVehicleData = getEncodedMessage(vehicleData)
                } else {
                    encodedVehicleData = window.btoa(vehicleData)
                }
            }
            var gaUmtc = getMotoFuzeCookie('__utmc');
            var gaUmtz = getMotoFuzeCookie('__utmz');
            var url = ('https:' == document.location.protocol ? 'https://' : 'http://') + signalsDomain + '/HandleSignal.ashx?s_type=trackPageview&s_wsID=' + WebsiteId + (encodedVehicleData.length > 2 ? '&s_vehicleData=' + encodedVehicleData : '') + (mfUuid.length > 0 ? '&mf_uuid=' + mfUuid : '') + '&s_pg=' + escape(document.location) + '&s_ref=' + escape(document.referrer) + '&s_pt=' + escape(document.title) + '&smc=' + sessionMagic + '&mmc=' + permyMagic + '&s_gaUmtc=' + escape(gaUmtc) + '&s_gaUmtz=' + escape(gaUmtz) + '&s_gUser=' + networkStatus.Google + '&s_gpUser=' + networkStatus.GooglePlus + '&s_tUser=' + networkStatus.Twitter + '&s_fUser=' + networkStatus.Facebook + '&cachebuster=' + Math.round(new Date().getTime() / 1000);
            var oImg = document.createElement("img");
            oImg.setAttribute('src', url);
            oImg.setAttribute('height', '1');
            oImg.setAttribute('width', '1');
            oImg.setAttribute('style', 'display:none');
            document.body.appendChild(oImg);
            var pfurl = getPfzUrlString(WebsiteId, permyMagic);
            if (pfurl != null && pfurl != '') {
                var oPfz = document.createElement("img");
                oPfz.setAttribute('src', pfurl);
                oPfz.setAttribute('height', '1');
                oPfz.setAttribute('width', '1');
                oPfz.setAttribute('style', 'display:none');
                document.body.appendChild(oPfz)
            }
            var mfsub = getMotoFuzeCookie("mfzsubparm");
            if (mfsub != null && mfsub != '') {
                var urlsub = 'https://' + signalsDomain + '/HandleSignal.ashx?s_type=submit&s_wsID=' + WebsiteId + '&s_pg=' + escape(document.location) + (mfUuid.length > 0 ? '&mf_uuid=' + mfUuid : '') + '&s_ref=' + escape(document.referrer) + '&s_pt=' + escape(document.title) + '&smc=' + sessionMagic + '&mmc=' + permyMagic + '&cachebuster=' + Math.round(new Date().getTime() / 1000);
                var fullsuburl = urlsub + "&sub=" + mfsub;
                var oImgSub = document.createElement("img");
                oImgSub.setAttribute('src', fullsuburl);
                oImgSub.setAttribute('height', '1');
                oImgSub.setAttribute('width', '1');
                oImgSub.setAttribute('style', 'display:none');
                document.body.appendChild(oImgSub);
                setMotoFuzeCookie("mfzsubparm", "", 0, "")
            }
        } catch (e) { }
    }
    var trackEvent = function (category, action) {
        try {
            var sessionMagic = getSessionMagic(WebsiteId);
            var permyMagic = getPermyMagic();
            var mfUuid = getMotoFuzeCookie("mf_uuid");
            var url = ('https:' == document.location.protocol ? 'https://' : 'http://') + signalsDomain + '/HandleSignal.ashx?s_type=trackEvent&s_wsId=' + WebsiteId + '&s_category=' + category + (mfUuid.length > 0 ? '&mf_uuid=' + mfUuid : '') + '&s_action=' + action + '&smc=' + sessionMagic + '&mmc=' + permyMagic + '&cachebuster=' + Math.round(new Date().getTime() / 1000);
            var oImg = document.createElement("img");
            oImg.setAttribute('src', url);
            oImg.setAttribute('height', '1');
            oImg.setAttribute('width', '1');
            oImg.setAttribute('style', 'display:none');
            document.body.appendChild(oImg)
        } catch (e) { }
    }
    var getSessionMagic = function (websiteID) {
        var sSession;
        var sCookie;
        sCookie = document.cookie.toString();
        if (sCookie == null || sCookie == 'undefined' || sCookie.indexOf('smc') == -1) {
            var dt = new Date();
            sSession = websiteID + '.' + dt.getTime() + "." + parseInt(Math.random() * 5000);
            var the_cookie = "smc=" + sSession + "; Path=/; SameSite=None; Secure";
            document.cookie = the_cookie
        } else {
            var s = sCookie.indexOf("smc=") + 4;
            var e = sCookie.indexOf(";", s);
            if (e == -1) e = sCookie.length;
            sSession = sCookie.substring(s, e)
        }
        return sSession
    }
    var getPermyMagic = function () {
        var sSession;
        var sCookie;
        sCookie = document.cookie.toString();
        if (sCookie == null || sCookie == 'undefined' || sCookie.indexOf('mmc') == -1) {
            var dt = new Date();
            dt.setYear(dt.getFullYear() + 1);
            sPermy = UUID.generate();
            var the_cookie = "mmc=" + sPermy + "; Path=/; SameSite=None; Secure;Expires=" + dt.toUTCString();
            document.cookie = the_cookie
        } else {
            var dt = new Date();
            dt.setYear(dt.getFullYear() + 1);
            var s = sCookie.indexOf("mmc=") + 4;
            var e = sCookie.indexOf(";", s);
            if (e == -1) e = sCookie.length;
            sPermy = sCookie.substring(s, e);
            var the_cookie = "mmc=" + sPermy + "; Path=/; SameSite=None; Secure;Expires=" + dt.toUTCString();
            document.cookie = the_cookie
        }
        return sPermy
    }
    var getSrpVehicleInfo = function (collectionContainer) {
        var srpVehicleInfo = [];
        var containerOptions = collectionContainer.split('|')
        if (typeof containerOptions === 'undefined' || containerOptions.length === 0) {
            containerOptions = [collectionContainer]
        }
        var srpVehicles
        for (var i = 0; i < containerOptions.length; i++) {
            srpVehicles = document.getElementsByClassName(containerOptions[i]);
            if (typeof srpVehicles != 'undefined' && srpVehicles.length > 0) {
                break
            }
        }
        var vehicleCount = srpVehicles.length > 25 ? 25 : srpVehicles.length;
        if (srpVehicles != null && vehicleCount > 0) {
            for (var i = 0; i < vehicleCount; i++) {
                var stockNumber = "";
                var vinNumber = "";
                if (typeof getSrpStockNumber === 'function') {
                    stockNumber = getSrpStockNumber(srpVehicles[i])
                }
                if (typeof getSrpVinNumber === 'function') {
                    vinNumber = getSrpVinNumber(srpVehicles[i])
                }
                if (typeof stockNumber != 'undefined' && typeof vinNumber != 'undefined' && (stockNumber.length > 0 || vinNumber.length > 0)) {
                    srpVehicleInfo.push(stockNumber);
                    srpVehicleInfo.push(vinNumber)
                }
            }
        }
        return srpVehicleInfo
    }
    var getVehicleInfo = function () {
        var vehicleInfo = [];
        if (srpNewPatternString.length > 0 && srpUsedPatternString.length > 0 && srpVinScriptString.length > 0 && srpStockScriptString.length > 0 && srpVehicleContainer.length > 0) {
            var srpNewUrlRegEx = new RegExp(srpNewPatternString);
            var srpUsedUrlRegEx = new RegExp(srpUsedPatternString);
            if (srpNewUrlRegEx.test(window.location.href.toLowerCase()) == !0 || srpUsedUrlRegEx.test(window.location.href.toLowerCase()) == !0) {
                try {
                    var srpss = document.createElement('script');
                    srpss.type = 'text/javascript';
                    var srpscode = 'function getSrpStockNumber(collectionItem) {try{' + srpStockScriptString + ';}catch (Exception) {console.log(Exception); return ""}}';
                    try {
                        srpss.appendChild(document.createTextNode(srpscode));
                        document.body.appendChild(srpss)
                    } catch (e) {
                        srpss.text = srpscode;
                        document.body.appendChild(srpss)
                    }
                    var srpvs = document.createElement('script');
                    srpvs.type = 'text/javascript';
                    var srpvcode = 'function getSrpVinNumber(collectionItem) {try{' + srpVinScriptString + ';}catch (Exception) {console.log(Exception); return ""}}';
                    try {
                        srpvs.appendChild(document.createTextNode(srpvcode));
                        document.body.appendChild(srpvs)
                    } catch (e) {
                        srpvs.text = srpvcode;
                        document.body.appendChild(srpvs)
                    }
                    vehicleInfo = getSrpVehicleInfo(srpVehicleContainer)
                } catch (Exception) {
                    var message = Exception
                }
            }
        }
        if (vdpNewPatternString.length > 0 && vdpUsedPatternString.length > 0 && vdpVinScriptString.length > 0 && vdpStockScriptString.length > 0) {
            try {
                var newUrlRegEx = new RegExp(vdpNewPatternString);
                var usedUrlRegEx = new RegExp(vdpUsedPatternString);
                if (newUrlRegEx.test(window.location.href) == !0 || usedUrlRegEx.test(window.location.href) == !0) {
                    var vs = document.createElement('script');
                    vs.type = 'text/javascript';
                    var vincode = 'function getVdpVinNumber() {try{' + vdpVinScriptString + ';}catch (Exception) {console.log(Exception); return ""}}';
                    try {
                        vs.appendChild(document.createTextNode(vincode));
                        document.body.appendChild(vs)
                    } catch (e) {
                        vs.text = vincode;
                        document.body.appendChild(vs)
                    }
                    var vin = getVdpVinNumber().trim();
                    var ss = document.createElement('script');
                    ss.type = 'text/javascript';
                    var stockcode = 'function getVdpStockNumber() {try{' + vdpStockScriptString + ';}catch (Exception) {console.log(Exception); return ""}}';
                    try {
                        ss.appendChild(document.createTextNode(stockcode));
                        document.body.appendChild(ss)
                    } catch (e) {
                        ss.text = stockcode;
                        document.body.appendChild(ss)
                    }
                    var stock = getVdpStockNumber().trim();
                    vehicleInfo.push(stock);
                    vehicleInfo.push(vin)
                }
            } catch (Exception) {
                var message = Exception
            }
        }
        return vehicleInfo
    }
    var EventedArray = function (handler) {
        this.stack = [];
        this.mutationHandler = handler || function () { };
        this.setHandler = function (f) {
            this.mutationHandler = f
        };
        this.push = function (obj, index, array) {
            this.length = this.stack.push(obj);
            this.mutationHandler()
        };
        this.pop = function () {
            this.length = this.stack.length - 1;
            return this.stack.shift()
        };
        this.getStack = function () {
            return this.stack
        };
        this.length = this.stack.length
    }
    var handler = function () {
        if (_msq.length) {
            var command = _msq.pop();
            if (command instanceof Array) {
                switch (command[0]) {
                    case '_setWebsite':
                        WebsiteId = command[1];
                        syncCookie();
                        initVendorConfig();
                        break;
                    case '_trackPageview':
                        asyncTrackPageView();
                        break;
                    case '_trackEvent':
                        trackEvent(command[1], command[2]);
                        break;
                    default:
                        console.log('MotoFuze.Signals Error: Received invalid command of: ' + command[0])
                }
            } else {
                console.log('MotoFuze.Signals Error: Received invalid command format. Value: ' + command)
            }
        }
    };
    var asyncTrackPageView = function () {
        var checkCount = 0;
        async.until(function () {
            return (checkCount > 5) || initComplete()
        }, function (callback) {
            checkCount++;
            setTimeout(callback, 1000)
        }, function () {
            trackPageview()
        })
    }
    var vendorConfigCookiesExist = function () {
        var aass = window.atob(getMotoFuzeCookie('aass'));
        var aavs = window.atob(getMotoFuzeCookie('aavs'));
        var aavdpnew = getMotoFuzeCookie('aavdpnew');
        var aavdpused = getMotoFuzeCookie('aavdpused');
        var aasrpss = window.atob(getMotoFuzeCookie('aasrpss'));
        var aasrpvs = window.atob(getMotoFuzeCookie('aasrpvs'));
        var aasrpnew = getMotoFuzeCookie('aasrpnew');
        var aasrpused = getMotoFuzeCookie('aasrpused');
        var aasrpvc = getMotoFuzeCookie('aasrpvc');
        return (aass != null && aass.length > 0 && aavs != null && aavs.length > 0 && aavdpnew != null && aavdpnew.length > 0 && aavdpused != null && aavdpused.length > 0 && aasrpss != null && aasrpss.length > 0 && aasrpvs != null && aasrpvs.length > 0 && aasrpnew != null && aasrpnew.length > 0 && aasrpused != null && aasrpused.length > 0 && aasrpvc != null && aasrpvc.length > 0)
    }
    var initComplete = function () {
        return (vendorConfigRetrieved && cookieSynced)
    }
    var mobileChanged = function () {
        var mobileCookie = getMotoFuzeCookie("mfmobile");
        var isMobile = detectMobile();
        var d = new Date();
        d.setHours(d.getHours() + 1);
        var expires = "Expires=" + d.toUTCString();
        document.cookie = "mfmobile=" + isMobile + "; " + expires + "; Path=/; SameSite=None; Secure";
        if (typeof mobileCookie != 'undefined' && mobileCookie.length > 0) {
            if (!isMobile && mobileCookie === 'true') return !0;
            if (isMobile && mobileCookie === 'false') return !0
        }
        return !1
    }
    var syncCookie = function () {
        var mfUuid = getMotoFuzeCookie("mf_uuid");
        var url = ('https:' == document.location.protocol ? 'https://' : 'http://') + signalsDomain + '/SyncCookie.ashx?' + (mfUuid.length === 0 ? '' : 'mf_uuid=' + mfUuid + '&') + 'cachebuster=' + Math.round(new Date().getTime() / 1000);
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = url;
        document.body.appendChild(s)
    }
    var initVendorConfig = function () {
        if (!vendorConfigCookiesExist() || mobileChanged()) {
            var mfUuid = getMotoFuzeCookie("mf_uuid");
            var url = ('https:' == document.location.protocol ? 'https://' : 'http://') + signalsDomain + '/SignalConfig.ashx?s_wsID=' + WebsiteId + (mfUuid.length > 0 ? '&mf_uuid=' + mfUuid : '') + '&s_isMobile=' + detectMobile() + '&cachebuster=' + Math.round(new Date().getTime() / 1000);
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.src = url;
            document.body.appendChild(s)
        } else {
            vendorConfigRetrieved = !0;
            vdpStockScriptString = window.atob(getMotoFuzeCookie('aass'));
            vdpVinScriptString = window.atob(getMotoFuzeCookie('aavs'));
            vdpNewPatternString = getMotoFuzeCookie('aavdpnew');
            vdpUsedPatternString = getMotoFuzeCookie('aavdpused');
            srpStockScriptString = window.atob(getMotoFuzeCookie('aasrpss'));
            srpVinScriptString = window.atob(getMotoFuzeCookie('aasrpvs'));
            srpNewPatternString = getMotoFuzeCookie('aasrpnew');
            srpUsedPatternString = getMotoFuzeCookie('aasrpused');
            srpVehicleContainer = getMotoFuzeCookie('aasrpvc')
        }
    }
    var detectMobile = function () {
        if (/mobile/.test(window.location.href) == !0) return !0;
        var mobileMenuBars = document.getElementsByClassName("fa-bars");
        if (mobileMenuBars != null && mobileMenuBars.length > 0) return !0;
        var uagent = navigator.userAgent.toLowerCase();
        var mobileKeywords = ['iphone', 'ipod', 'ipad', 'windows phone', 'blackberry', 'android', 'kindle'];
        for (var i = 0; i < mobileKeywords.length; i++) {
            if (uagent.search(mobileKeywords[i]) > -1) {
                return !0
            }
        }
        return !1
    }
    var elementClick = function (clickTarget) {
        var emailExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var phoneExpression = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
        try {
            if (clickTarget == null || clickTarget == 'undefined') return;
            if (clickTarget.type == 'button') {
                var doc = clickTarget.ownerDocument;
                if (doc != null && doc.forms != null && doc.forms.length > 0) {
                    for (i = 0; i < doc.forms.length; i++) {
                        var form = doc.forms[i];
                        if (form != null && form.elements != null && form.elements.length > 0) {
                            for (j = 0; j < form.elements.length; j++) {
                                var ele = form.elements[j];
                                if (ele == null || ele == 'undefined') continue;
                                if (ele.type == 'text' || ele.type == 'hidden' || ele.type == 'email' || ele.type == 'tel') {
                                    if (ele.value != null && ele.value.length > 0 && (emailExpression.test(ele.value) == !0 || phoneExpression.test(ele.value) == !0)) {
                                        saveElements(form);
                                        return
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (e) { }
    }
    var saveElements = function (doc) {
        var savedcookie = !1;
        var emailExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var phoneExpression = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
        try {
            if (doc == null || doc == 'undefined') return;
            for (i = 0; i < doc.elements.length; i++) {
                var ele = doc.elements[i];
                if (ele == null || ele == 'undefined') return;
                var elementName = (ele.id.length < 1 ? ele.name : ele.id);
                if (ele.type == 'text' || ele.type == 'hidden' || ele.type == 'email' || ele.type == 'tel') {
                    if (ele.value != null && ele.value.length > 0 && (emailExpression.test(ele.value) == !0 || phoneExpression.test(ele.value) == !0)) {
                        setKeyPair(elementName, ele.value)
                    }
                }
            }
            if (keyvaluepairs != null && keyvaluepairs != undefined && Object.keys(keyvaluepairs).length > 0) {
                var mfzsubparm = "";
                for (var key in keyvaluepairs) {
                    if (keyvaluepairs[key] != '')
                        mfzsubparm = mfzsubparm + key + ':' + keyvaluepairs[key] + '|'
                }
                mfzsubparm = mfzsubparm + 'originalurl:' + document.location + '|';
                if (mfzsubparm != null && mfzsubparm.length > 0) {
                    var ie_version = getInternetExplorerVersion();
                    if (ie_version > 0 && ie_version < 9) {
                        var encodedscipt = getEncodedMessage(mfzsubparm);
                        setMotoFuzeCookie("mfzsubparm", encodedscipt, 7, window.location.hostname);
                        savedcookie = !0
                    } else {
                        setMotoFuzeCookie("mfzsubparm", window.btoa(mfzsubparm), 7, window.location.hostname);
                        savedcookie = !0
                    }
                }
            }
        } catch (e) {
            console.log('MotoFuze.Signals.SaveElements Error: ' + e)
        }
        return savedcookie
    }
    var getEncodedMessage = function (message) {
        var Base64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function (e) {
                var t = "";
                var n, r, i, s, o, u, a;
                var f = 0;
                e = Base64._utf8_encode(e);
                while (f < e.length) {
                    n = e.charCodeAt(f++);
                    r = e.charCodeAt(f++);
                    i = e.charCodeAt(f++);
                    s = n >> 2;
                    o = (n & 3) << 4 | r >> 4;
                    u = (r & 15) << 2 | i >> 6;
                    a = i & 63;
                    if (isNaN(r)) {
                        u = a = 64
                    } else if (isNaN(i)) {
                        a = 64
                    }
                    t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                }
                return t
            },
            decode: function (e) {
                var t = "";
                var n, r, i;
                var s, o, u, a;
                var f = 0;
                e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (f < e.length) {
                    s = this._keyStr.indexOf(e.charAt(f++));
                    o = this._keyStr.indexOf(e.charAt(f++));
                    u = this._keyStr.indexOf(e.charAt(f++));
                    a = this._keyStr.indexOf(e.charAt(f++));
                    n = s << 2 | o >> 4;
                    r = (o & 15) << 4 | u >> 2;
                    i = (u & 3) << 6 | a;
                    t = t + String.fromCharCode(n);
                    if (u != 64) {
                        t = t + String.fromCharCode(r)
                    }
                    if (a != 64) {
                        t = t + String.fromCharCode(i)
                    }
                }
                t = Base64._utf8_decode(t);
                return t
            },
            _utf8_encode: function (e) {
                e = e.replace(/\r\n/g, "\n");
                var t = "";
                for (var n = 0; n < e.length; n++) {
                    var r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r)
                    } else if (r > 127 && r < 2048) {
                        t += String.fromCharCode(r >> 6 | 192);
                        t += String.fromCharCode(r & 63 | 128)
                    } else {
                        t += String.fromCharCode(r >> 12 | 224);
                        t += String.fromCharCode(r >> 6 & 63 | 128);
                        t += String.fromCharCode(r & 63 | 128)
                    }
                }
                return t
            },
            _utf8_decode: function (e) {
                var t = "";
                var n = 0;
                var r = c1 = c2 = 0;
                while (n < e.length) {
                    r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r);
                        n++
                    } else if (r > 191 && r < 224) {
                        c2 = e.charCodeAt(n + 1);
                        t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                        n += 2
                    } else {
                        c2 = e.charCodeAt(n + 1);
                        c3 = e.charCodeAt(n + 2);
                        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                        n += 3
                    }
                }
                return t
            }
        }
        var string = message;
        var encodedString = Base64.encode(string);
        console.log(encodedString)
    }
    var setKeyPair = function (key, val) {
        if (key == null || key == 'undefined') return;
        if (val == null || val == 'undefined' || val == '') return;
        if (val.toLowerCase().indexOf('submit') >= 0) return;
        // replace all instances of colon with a hyphen
        key = key.replace(/:/gi, '-');
        keyvaluepairs[key] = val
    }
    var getInternetExplorerVersion = function () {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1)
        }
        return rv
    }
    var getPfzUrlString = function (webkey, fzsiguuid) {
        var mfUuid = getMotoFuzeCookie("mf_uuid");
        return ('http:' == document.location.protocol ? 'http://' : 'https://') + 'aalnk.com/pfzurl.ashx?webkey=' + webkey + '&id=' + fzsiguuid + (mfUuid.length > 0 ? '&mf_uuid=' + mfUuid : '') + '&rdts=' + Math.round(new Date().getTime() / 1000)
    }
    var getElementValue = function (element) {
        if (typeof element == 'undefined' || element == null) return "";
        var elementValue = "";
        try {
            elementValue = element.innerText;
            if (typeof elementValue == 'undefined' || elementValue.length === 0) {
                elementValue = element.textContent
            }
            if (typeof elementValue == 'undefined' || elementValue.length === 0) {
                elementValue = ""
            }
        } catch (e) {
            elementValue = ""
        }
        return elementValue
    }
    var getSubstring = function (fullString, startString, endString, garbageArray) {
        if (typeof fullString === 'undefined' || fullString.length === 0) {
            return ""
        }
        var startIndex = fullString.indexOf(startString);
        var newString = fullString.substring(startIndex)
        newString = newString.replace(startString, "");
        if (typeof garbageArray != 'undefined' && garbageArray.length > 0) {
            for (var i = 0; i < garbageArray.length; i++) {
                newString = newString.replace(garbageArray[i], "")
            }
        }
        newString = newString.trim();
        if (endString == "<newline>") {
            endString = "\n"
        }
        var endIndex = newString.indexOf(endString);
        var result = newString.substring(0, endIndex);
        result = result.replace("\r\n", "");
        result = result.replace("\r", "");
        result = result.replace("\n", "");
        result = result.replace(";", "");
        result = result.replace("'", "");
        result = result.trim();
        result = result.replace("'", "");
        return result
    }
    var findByAttributeValue = function (attribute, value, useContentValue) {
        var All = document.getElementsByTagName('*');
        for (var i = 0; i < All.length; i++) {
            if (All[i].getAttribute(attribute) == value) {
                var elementValue = "";
                try {
                    elementValue = All[i].innerText;
                    if (typeof elementValue == 'undefined' || elementValue.length === 0) {
                        elementValue = All[i].textContent
                    }
                    if (typeof elementValue == 'undefined' || elementValue.length === 0) {
                        elementValue = All[i].content
                    }
                    if (typeof elementValue == 'undefined' || elementValue.length === 0) {
                        elementValue = ""
                    }
                } catch (e) {
                    elementValue = ""
                }
                return elementValue
            }
        }
    }
    var findByElementAttributeValue = function (element, attribute, value) {
        var All = element.getElementsByTagName('*');
        for (var i = 0; i < All.length; i++) {
            if (All[i].getAttribute(attribute) == value) {
                var elementValue = "";
                try {
                    elementValue = All[i].innerText;
                    if (typeof elementValue == 'undefined' || elementValue.length === 0) {
                        elementValue = All[i].textContent
                    }
                    if (typeof elementValue == 'undefined' || elementValue.length === 0) {
                        elementValue = All[i].content
                    }
                    if (typeof elementValue == 'undefined' || elementValue.length === 0) {
                        elementValue = ""
                    }
                } catch (e) {
                    elementValue = ""
                }
                return elementValue
            }
        }
    }

    var init = function () {
        if (document.body === null || document.readyState != "complete") {
            setTimeout(function () {
                init()
            }, 1000);
            return
        }

        // remove any created listener
        window.removeEventListener("onload", MotoFuze.Signals.init, !1);

        window._msq = window._msq || [];
        var _msqsave = [];
        if (window._msq.length) {
            _msqsave = window._msq.slice()
        }
        else
        {
            _msqsave.push(
                ['_setWebsite', ''],
                ['_trackPageview']
            );
        }
        window._msq = new EventedArray(handler);
        var ie_version = getInternetExplorerVersion();
        if (ie_version > 0 && ie_version < 9) {
            for (var i = 0; i < _msqsave.length; i++) {
                window._msq.push(_msqsave[i])
            }
        } else {
            _msqsave.forEach(function (element, index, array) {
                window._msq.push(element)
            })
        }
        var x = document.forms;
        var i;
        var savedcookie = !1;
        for (i = 0; i < x.length; i++) {
            var form = document.forms[i];
            if (form.attachEvent) {
                form.attachEvent("onsubmit", function (e) {
                    savedCookie = saveElements(this)
                });
                form.attachEvent("onclick", function (e) {
                    savedCookie = saveElements(e.target)
                })
            } else if (form.addEventListener) {
                form.addEventListener("submit", function (e) {
                    savedCookie = savedcookie = saveElements(this)
                });
                form.addEventListener("click", function (e) {
                    savedCookie = elementClick(e.target)
                })
            }
        }
        try {
            document.onsubmit = function (e) {
                if (!savedcookie) {
                    saveElements(e.target)
                }
            }
            document.onclick = function (e) {
                if (!savedcookie) {
                    elementClick(e.target)
                }
            }
        } catch (Exception) { }
    }
    return {
        init: init,
        getMotoFuzeCookie: getMotoFuzeCookie,
        getElementValue: getElementValue,
        getSubstring: getSubstring,
        findByAttributeValue: findByAttributeValue,
        findByElementAttributeValue: findByElementAttributeValue
    }
})();

function addMotoFuzeLoadEvent(func) {
    if (document.readyState === "complete") {
        func()
    } else {
        window.addEventListener("onload", func(), !1)
    }
}
addMotoFuzeLoadEvent(MotoFuze.Signals.init)