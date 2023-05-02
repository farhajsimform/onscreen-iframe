//Returns the query parameter value
function getQVar(variable, query) {
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable)
			return pair[1];
	}
	return "";
}
//Generate unique uid
function genuid() {
	var hash = '';
	var i, j, char1;
   // if (infoStr.length == 0){
	    for (j = 0; j < 32; j++) {
			if (j == 8 || j == 12 || j == 16 || j == 20)
				hash = hash + '-';
			i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
			hash = hash + i;
		}
   /* }else{//use browser info to generate an id
   //Seeing same Id being created for iPad, iPhone as most of these have same config
	    for (i = 0, l = infoStr.length; i < l; i++) {
	        char1  = infoStr.charCodeAt(i);
	        hash  = ((hash<<5)-hash)+char1;
	        hash |= 0; // Convert to 32bit integer
	    }
	    var domHash = '';
	    var doma = getwdom();
	    for (i = 0, l = doma.length; i < l; i++) {
	        char1  = doma.charCodeAt(i);
	        domHash  = ((domHash<<5)-domHash)+char1;
	        domHash |= 0; 
	    }
	    hash = domHash + '.' + hash + '.' + new Date().getTimezoneOffset();
    }*/
    return hash;
}
//create/update the searchforce tracking cookie
function jsetck(jData) {
	var expiryDate = getCkExpDays(jcexpire);
	var domain = getwdom();
	//save browser cookie
	document.cookie = jckName + "=" + escape(jData) + ((expiryDate) ? ";expires=" + expiryDate.toGMTString() : "") + ";path=/"
	 + ((domain) ? ";domain=" + domain : "");
}
//get the content of searchforce tracking cookie
function jgetck(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf(prefix);
	if (begin == -1)
		return null;
	
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
		end = dc.length;
	
	return unescape(dc.substring(begin + prefix.length, end));
}
//get expiry date for tracking cookie
function getCkExpDays(days) {
	if (days == null || days == "null" || days == "")
		days = "30";
	if (days == "0" || days == 0)
		return null;
	var d = new Date();
	d.setDate(d.getDate() + parseInt(days));
	return d;
}
//get website domain
function getwdom() {
	var hostname = window.location.hostname;
	var tmpArray = hostname.split(".");
	var domain = "";
	if (tmpArray[tmpArray.length - 1].length == 2 && (tmpArray[tmpArray.length - 2].length == 2 || tmpArray[tmpArray.length - 2].length == 3)) {
		domain = "." + tmpArray[tmpArray.length - 3] + "." + tmpArray[tmpArray.length - 2] + "." + tmpArray[tmpArray.length - 1];
	} else {
		domain = "." + tmpArray[tmpArray.length - 2] + "." + tmpArray[tmpArray.length - 1];
	}
	return domain;
}

function useCustomParams() {
	jCustParam = true;
}
function trackSEO(publisherName) {
	if (publisherName != null && publisherName != undefined)
		jSEOName = publisherName;
	jtrkOrg = true;
}
function trackDirectTraffic(campName) {
	if (campName != null && campName != undefined)
		jDirCampName = campName;
	jtrkDir = true;
}
//Record javascript conversion event
function recordJSConversion(ctype, cval, coid, cvar1, cvar2, cvar3) {
	var jprotocol = "http";
	if (window.location.protocol == "https:") {
		jprotocol = "https";
	}

	var trackUrl = jprotocol + track_URL;
	var jData = "" + jgetck(jckName);
	var juAgent = navigator.userAgent;
	if (jData && jData != null && jData != "null" && jData.length > 0) {
		jData = jData.replace("je=", "_dummy=");
	}
	if(jData != null && jData != "null")
		trackUrl = trackUrl + jData;
	
	if (!ctype)
		ctype = window.jcn.event;
	if (!cval)
		cval = window.jcn.revenue;
	if (!coid)
		coid = window.jcn.orderid;
	if (!cvar1)
		cvar1 = window.jcn.var1;
	if (!cvar2)
		cvar2 = window.jcn.var2;
	if (!cvar3)
		cvar3 = window.jcn.var3;
	
	var jru1;
	if(window.jcn.conversionPage)
		jru1 = window.jcn.conversionPage;
	
	trackUrl = trackUrl + "&joid=" + coid + "&jcv=" + cval + "&je=" + ctype + "&uag=" + juAgent;
	if (cvar1)
		trackUrl = trackUrl + "&jvar1=" + escape(cvar1);
	if (cvar2)
		trackUrl = trackUrl + "&jvar2=" + escape(cvar2);
	if (cvar3)
		trackUrl = trackUrl + "&jvar3=" + escape(cvar3);
	
	var convImg = new Image();
	convImg.src = trackUrl + "&jru=" + jru1 + jinfo;
	convImg.onload = function () {
		jVoid();
	};
}
function jVoid() {
	return;
}
var jLandEvtRec = false;
//record the landing event
function recJSLand() {
	var acctId,
	adOutletName,
	trackerType,
	mediaType,
	cName;
	var cName = '',
	adgName = '',
	kwName = '',
	matchType = '',
	adName = '';
	var isSEO = false;
	
	if (jurlStr.indexOf("jkId=") < 0 && jurlStr.indexOf("jtid=") < 0 && jurlStr.indexOf("jsid=") < 0) {
		trackerType = 1; //JS tracking mech
		acctId = jAccountId;
		if (jCustParam == true && jurlStr != undefined && jurlStr != null && jurlStr != "") {
			adOutletName = window.jPub == null || window.jPub == 'undefined' ? getQVar(jsrcp, jurlStr) : window.jPub;
			cName = window.jCampaign == null || window.jCampaign == 'undefined' ? getQVar(jcmp, jurlStr) : window.jCampaign;
			mediaType = getQVar(jmdp, jurlStr);
			adgName = window.jAdGroup == null || window.jAdGroup == 'undefined' ? getQVar(jagp, jurlStr) : window.jAdGroup;
			kwName = window.jkwd == null || window.jkwd == 'undefined' ? getQVar(jkp, jurlStr) : window.jkwd;
			matchType = getQVar(jmtp, jurlStr);
			adName = getQVar(jadp, jurlStr);
		} else if (jtrkOrg == true) {
			var wdom = getwdom().substr(1);
			var wref = document.referrer;
			if (wref != 'undefined' && wref != null && wref.length > 0) {
				var refDomain = wref;
				if (refDomain.indexOf('?') > 0)
					refDomain = wref.substr(0, refDomain.indexOf('?'));
				if (refDomain.indexOf(wdom) < 0) { //compare if from same domain
					mediaType = "seo";
					cName = "SEO Campaign"; //required
					adOutletName = jSEOName;
					isSEO = true;
				}
			} else if (jtrkDir == true && (wref == null || wref.length == 0 || wref == window.location)) {
				var jCookie = "" + jgetck(jckName);
				if (jCookie == null || jCookie == "null" || jCookie == '' || jCookie == undefined) { //record only direct
					mediaType = "direct";
					cName = jDirCampName;
					adOutletName = jSEOName;
					isSEO = true;
				}
			}
		}
		
		jurlStr = "jt=" + trackerType + "&jaid=" + acctId + "&jm=" + mediaType + "&jsrc=" + adOutletName + "&jcp=" + cName
			 + "&jag=" + adgName + "&jk=" + kwName + "&jmt=" + matchType + "&jcr=" + adName + "&isseo=" + isSEO;
	}
	if (jurlStr.indexOf("jsid=") != -1 || jurlStr.indexOf("jtid=") != -1 || jurlStr.indexOf("jkId=") != -1 || (acctId != null && acctId != undefined && adOutletName != undefined && adOutletName != '')) {
		sfcData = jurlStr;
		jexecLngCode = true;

		var jru = escape(document.referrer);
		var jlp = escape(window.location); //landing page URL
		
		if (sfcData.indexOf("jtest=") != -1)
			jru = escape(window.location);
		
		//if conversation id exists, then this might be from different domain,
		//just create cookie and skip landing event
		if (jurlStr.indexOf("jcid=") != -1) {
			jsetck(jurlStr);
			return;
		}
		var jConversationID = "";
		var isNewVisit = 0;
		
		var jCookieData = "" + jgetck(jckName);
		if (jCookieData && (jCookieData != null) && (jCookieData != "null") && (jCookieData.length > 0))
			jConversationID = getQVar("jcid", jCookieData);
		
		if (jConversationID == "" || jConversationID == "null" || jConversationID == null) {
			jConversationID = genuid();
			isNewVisit = 1;
		}
		
		var jData = sfcData + "&jcid=" + jConversationID;
		jsetck(jData);
		
		var jprotocol = "http";
		if (window.location.protocol == "https:") {
			jprotocol = "https";
		}
			
		var trackUrl = jprotocol + track_URL + "je=landing&" + jData + "&jru=" + jru + "&jlp=" + jlp + "&jnv=" + isNewVisit
						+ jinfo;
		
		var convImg = new Image();
		convImg.src = trackUrl;
		convImg.onload = function () {
			jVoid();
		};
		jLandEvtRec = true;
	}
}
//record the information abt the page. This should be invoked after recJsLand() so that cookies are created
function recPgView(){
	var ck = "" + jgetck(jckName);
	if (ck == null || ck == "null" || ck.length == 0)
		return;//track page views only from cookied users

	//session id
	var sessCk = "" + jgetck("sf_sess");
	var expire = new Date();
	expire.setMinutes(expire.getMinutes() + 30);
		
	if (sessCk == null || sessCk == "null" || sessCk.length == 0 || jLandEvtRec == true){
		sessCk = genuid() + "." + expire.getMonth() + expire.getDate() 
						+ expire.getFullYear()+expire.getHours() + expire.getMinutes();
	}
	//set session cookie
	document.cookie = "sf_sess=" + sessCk + ((expire) ? ";expires=" + expire.toGMTString() : "")
						 + ";path=/";
	
	var prevPg = escape(document.referrer);
	var jlp = escape(window.location);
	var jprotocol = "http";
	if (window.location.protocol == "https:") 
		jprotocol = "https";
	
	var juAgent = navigator.userAgent;

	var pgUrl = jprotocol + pageAction_URL + "je=jSiteAnalytics" + "&jru=" + jlp + "&jpg=" + prevPg
		 + "&uag=" + juAgent + jinfo + "&" + ck + "&jil=" + jLandEvtRec + "&jsess=" + sessCk;
	var pgImg = new Image();
	pgImg.src = pgUrl;
	pgImg.onload = function () {
		jVoid();
	};
}
//get additional information about users browser and screen
function getExInfo(){
	try{
		var jsc = window.screen.width + "x" + window.screen.height + "x" + window.screen.colorDepth;
		var PL = [];
		var np = navigator.plugins;
		if (np && np.length > 0) {
			for (var t = 0; t < np.length; t++) {
				var N = np[t];
				if (N) {
					var x = N.filename.replace(/\.(plugin|dll)$/i, "");
					var dB = N.description;
					var B = N.name;
					var dA = (dB.match(/\d/g) || []).join("");
					var D = (B.match(/\d/g) || []).join("");
					var Q = (dA.length > D.length ? dA : D);
					PL.push(x + "," + Q)
				}
			}
		} else{
			var progid = ["ShockwaveFlash.ShockwaveFlash", "AcroPDF.PDF", "AgControl.AgControl", "wmplayer.ocx", "QuickTime.QuickTime"];
			for (p = 0;	p < progid.length; p++) {
				try {
					var axo = new ActiveXObject(progid[p]);
					if (axo){
						var dB = '';
						try{
							dB = axo.GetVariable('$version');
						}catch(e) {
							try {
								dB = axo.GetVersions();
							} catch (e) {}
						}
						var dA = dB  ? (dB.match(/\d/g) || []).join("") : "";
						PL.push(progid[p] + "," + dA);
					}
				} catch (e) {}
			}
		}
		var ckDays = jcexpire;
		var jplu = PL.join(";");
		var jl = navigator.language ? navigator.language : "";
		infoStr = jsc + escape(jplu).replace(/\+/g,"%2B") + jl + navigator.userAgent;
		jinfo = "&ssc=" + jsc + "&splu=" + escape(jplu).replace(/\+/g,"%2B") + "&slg=" + jl + "&sce=" + navigator.cookieEnabled
		+ "&scd=" + ckDays;
	}catch(err){
		infoStr = jinfo = "";
	}
}
var track_URL = "://pat-svtrack.searchforce.net/SFConversionTracking/img.jpg?";
var pageAction_URL = "://pat-svtrack.searchforce.net/SFConversionTracking/pa.jpg?";

var jckName = "sf_conv_info";
var jCustParam = false;
var jtrkOrg = false;
var jtrkDir = false;
var jSEOName = 'SEO';
var jDirCampName = 'Direct Traffic';

var sfcData, jurlStr, jcexpire, jAccountId;
var jsrcp, jcmp, jagp, jkp, jadp, jmtp, jmdp;
var jinfo, infoStr;

(function() {
	getExInfo();
	jLandEvtRec = false;
	//check if there is landing code on the page
	if(window.jed != undefined && window.jed.event === 'landing'){
		//if page is only to track direct traffic, jstaticurl can be set with query string like
		//jstaticurl = "jsrc=Email&jch=Email&jcamp=BSM+Email+Campaign&jadgrp=tv+adgroup";
	    if(window.jstaticurl != undefined)
	      	jurlStr = window.jstaticurl;
	    else{
			jurlStr = "" + window.location.hash + window.location.search;
			jurlStr = jurlStr.substring(jurlStr.indexOf('?') + 1);
		}
		jAccountId = window.jed.accountid;
   		jcexpire = window.jed.cookieexpire;
   		if(window.jed.trackseo != undefined && window.jed.trackseo == true)
   			trackSEO(window.jed.seopublisher);
   		if(window.jed.trackdirect != undefined && window.jed.trackdirect == true)
   			trackDirectTraffic(window.jed.directcampaign);
   		if(window.jed.customparams != undefined && window.jed.customparams == true){
   			useCustomParams();
   			jsrcp = window.jed.sourceParam;
   			jcmp = window.jed.campaignParam;
   			jagp = window.jed.adgroupParam;
   			jkp = window.jed.keywordParam;
   			jadp = window.jed.creativeParam;
   			jmtp = window.jed.matchTypeParam;
   			jmdp = window.jed.mediumParam;
   		}
   	
   		if((jurlStr && jurlStr != null && jurlStr != "null" && jurlStr.length > 0) || jtrkOrg == true || jtrkDir == true){
   			recJSLand();
	   	}
	}
	//if conv code is on the page and it is not to track link.For link the recordJSConv function is called explicitly 
	if(window.jcn != undefined && (window.jcn.tracklink == undefined || window.jcn.tracklink == false)){
		recordJSConversion();
	}
	if(window.jed!= undefined && window.jed.trackSite != undefined && window.jed.trackSite == true)
  		recPgView();
	
})();