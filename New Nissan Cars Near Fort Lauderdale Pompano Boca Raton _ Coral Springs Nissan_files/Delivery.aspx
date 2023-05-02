// (C) 2023 Urban Science Applications, Inc. All Rights Reserved.
var createSafeSameSiteCookie = function (cookieName, cookieValue, expires, path = undefined, domain = undefined) {

    if (path === undefined) {
        path = 'path=/';
    }

    if (domain === undefined) {
        domain = "";
    }

    var userAgent = navigator.userAgent;
    var cookie = cookieName + '=' + cookieValue + ';' + expires + ';' + path + ";" + domain + ';Secure';

    cookie = cookie.replace(/;;/g, ";");

    if (userAgent.indexOf('CPU iPhone OS 12') !== -1 || userAgent.indexOf('iPad; CPU OS 12') !== -1) {
        return cookie;
    }

    // macOS 10.14 Mojave browsers don't support SameSite=None.
    if (userAgent.indexOf('Macintosh; Intel Mac OS X 10_14') !== -1 && userAgent.indexOf('Version/') && userAgent.indexOf('Safari') !== -1) {
        return cookie;
    }

    // Old versions of Chrome don't support SameSite=None.
    if (userAgent.indexOf('Chrome/5') !== -1 || userAgent.indexOf('Chrome/6') !== -1) {
        return cookie;
    }

    return cookie + ';SameSite=None';
};

var createSafeSameSiteJSONCookie = function (cookieName, cookieValue, expires, path = undefined) {

    if (path === undefined) {
        path = 'path=/';
    }

    var userAgent = navigator.userAgent;
    var cookie = cookieName + '=' + JSON.stringify(cookieValue) + ';' + expires + ';' + path + ';Secure';

    cookie = cookie.replace(/;;/g, ";");

    if (userAgent.indexOf('CPU iPhone OS 12') !== -1 || userAgent.indexOf('iPad; CPU OS 12') !== -1) {
        return cookie;
    }

    // macOS 10.14 Mojave browsers don't support SameSite=None.
    if (userAgent.indexOf('Macintosh; Intel Mac OS X 10_14') !== -1 && userAgent.indexOf('Version/') && userAgent.indexOf('Safari') !== -1) {
        return cookie;
    }

    // Old versions of Chrome don't support SameSite=None.
    if (userAgent.indexOf('Chrome/5') !== -1 || userAgent.indexOf('Chrome/6') !== -1) {
        return cookie;
    }

    return cookie + ';SameSite=None';
};

//Click thru if 3rd party cookies blocked
setTimeout(function () {
    var script2 = document.getElementById("HL_ScriptCall2");
    if (script2 != null) {
        return;
    }

    try {
        if (hl_placementId != undefined) {
            return;
        }
    } catch{
        //Overlay hasn't loaded so check if clickthru.
    }

    var query = window.location.search;
    var params = new URLSearchParams(query);
    var newQuery = "";
    var foundCT = false;
    for (var key of params.keys()) {
        if (key.startsWith("ah-")) {
            var cookieName = key.replace("ah-", "");
            newQuery += "&" + cookieName + "=" + params.get(key);
            if (cookieName.startsWith("RC:")) {
                foundCT = true;
            }
        }
    }

    if (!foundCT) {
        return;
    }

    var script1 = document.getElementById("HL_ScriptCall");

    script2 = document.createElement("script");
    script2.src = script1.src + newQuery;
    script2.type = 'text/javascript';
    script2.id = "HL_ScriptCall2";
    document.getElementsByTagName('head')[0].appendChild(script2);
}, 500);


//SPA Parameter Change
var AHSPAUtility = {

    baseAHUrl: "https://www.incentivesnetwork.net/Delivery/ClientPaths/%22nissan/Delivery.aspx?SiteID=2361"&ProviderID=DealerOn",

    getParams: function(search = null) {
        var newParams = [];
        var query = search == null ? window.location.search : search;
        var params = new URLSearchParams(query);
        for (var key of params.keys()) {
            newParams.push({ key: key, value: params.get(key) });
        }
        return newParams;
    },
    removeElemsByIds: function(ids) {
        ids.forEach(function (id) {
            var elem = document.getElementById(id);
            if (elem) {
                elem.parentNode.removeChild(elem);
            }
        });
    },
    routeChange: function (pgID) {
        var newUrl = this.baseAHUrl + "&pgID=" + pgID;
        var newParams = this.getParams();
        newParams.forEach(function (p) {
            newUrl += "&" + p.key + "=" + p.value;
        });

        this.loadOverlay(newUrl);
    },
    routeChangeWithParams: function (pgID, make = null, model = null, year = null, trim = null, additionalParams = null) {
        var newUrl = this.baseAHUrl + "&pgID=" + pgID;
        if (make) newUrl += "&make=" + make;
        if (model) newUrl += "&model=" + model;
        if (year) newUrl += "&year=" + year;
        if (trim) newUrl += "&trim=" + trim;
        if (additionalParams != null) {
            additionalParams.forEach(function (p) {
                newUrl += "&" + p.key + "=" + p.value;
            });
        }

        this.loadOverlay(newUrl);
    },
    loadOverlay: function (newUrl) {
        this.removeElemsByIds(["HL_ScriptCall", "hlFrame", "hlReOpen", "hlContainer", "hlBlackTrans"]);

        var scripts = document.getElementsByTagName("script");
        for (script of scripts) {
            if (script.src.toLowerCase().indexOf("delivery/delivery.aspx") != -1 ||
                (script.src.toLowerCase().indexOf("delivery/clientpaths") != -1 &&
                    script.src.toLowerCase().indexOf("lat=") != -1 &&
                    script.src.toLowerCase().indexOf("long=") != -1)) {
                script.parentNode.removeChild(script);
            }
        }

        var styles = document.getElementsByTagName("link");
        for (style of styles) {
            if (style.rel.toLowerCase().indexOf("delivery/Shared/styles") != -1) {
                style.parentNode.removeChild(style);
            }
        }

        var hl_script = document.createElement("script");
        hl_script.src = newUrl + "&spaLoaded=1";
        hl_script.type = 'text/javascript';
        hl_script.id = "HL_ScriptCall";
        document.getElementsByTagName('head')[0].appendChild(hl_script);
    }
};


