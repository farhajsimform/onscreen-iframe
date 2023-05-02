(function(){
	if(window.EDM && window.EDM.edwpSync){return;}
	window.EDM = window.EDM || {}; window.EDM.edwpSync = window.EDM.edwpSync || {isLoaded: true};
	function getEDMCookie(key) { if (!key) { return null; } return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\=\s*([^;]*).*$)|^.*$"), "$1")) || null; }
	if(getEDMCookie('_edwpv')){document.cookie = "_edwpv=" + getEDMCookie('_edwpv') + " ; path=/; domain=www.coralspringsnissan.com; expires=Thu, 28-Apr-2033 10:36:09 GMT; SameSite=Lax; ";} else {document.cookie = "_edwpv=c84dd259-dfac-4af4-9dd1-756cd39e4c8c; path=/; domain=www.coralspringsnissan.com; expires=Thu, 28-Apr-2033 10:36:09 GMT; SameSite=Lax; ";}
	if(getEDMCookie('_edwps')){document.cookie = "_edwps=" + getEDMCookie('_edwps') + " ; path=/; domain=www.coralspringsnissan.com; expires=Mon, 01-May-2023 11:06:09 GMT; SameSite=Lax; ";} else {document.cookie = "_edwps=798084484162420999; path=/; domain=www.coralspringsnissan.com; expires=Mon, 01-May-2023 11:06:09 GMT; SameSite=Lax; ";}
	window.EDM.edwpSync.isSynced = true;
})();
