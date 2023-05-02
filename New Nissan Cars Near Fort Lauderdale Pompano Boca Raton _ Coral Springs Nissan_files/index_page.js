/**
 * Redirector
 * Created by Ambrose on 5/9/17.
 * redirect to index_page_standard.js || ivana_index.js
 */
var script   = document.createElement("script");
var scriptSrc = 'https://sdk.sister.tv/integrations/index_page_standard.js';

//new player for earthmotorcars & round rock dealerships
if(	window.location.hostname.indexOf('earthmotorcars') !== -1

	|| window.location.hostname.indexOf('cabledahmerkia') !== -1
	|| window.location.hostname.indexOf('cabledahmerind') !== -1
	|| window.location.hostname.indexOf('rossdowning.com') !== -1
	|| window.location.hostname.indexOf('thekeyonline') !== -1
	){
    scriptSrc = 'https://sdk.sister.tv/integrations/ivana_index.js'; // testing iVana
}

if (document.getElementById('sistertech')){
	if (document.getElementById('sistertech').getAttribute("data-integration") === ""){
		var loc = window.location.hostname;
		//loc = loc.split('www.')[1].split('.com')[0];
		loc = loc.split('.')[1];
		if (window.location.hostname.split('.')[2] !== 'com'){
			loc = loc + '-'+window.location.hostname.split('.')[2];
		}

		document.getElementById('sistertech').setAttribute("data-integration",loc);
	}
}

script.src = scriptSrc;    // use this for linked script
document.head.appendChild(script);