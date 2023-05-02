function refineSearch(){var e=location.href;e.includes("#")&&(e=e.substring(0,e.indexOf("#")));var t=updateQueryStringParameters(e,function(){var e={};jQuery("input:checkbox[id^='refine-search']:checked").each((function(t,a){var r=this.name,i=encodeURIComponent(this.value);r in e?e[r].push(i):e[r]=[i]})),jQuery("input:checkbox[id^='filter-searchspecialsonly']:checked").each((function(t,a){var r=this.name,i=encodeURIComponent(this.value);r in e?e[r].push(i):e[r]=[i]})),jQuery("input:text[class^=range]").each((function(t,a){var r=this.name,i=this.value.replace(/[^\w\s]|_/g,"").replace(/\s+/g," "),n=encodeURIComponent(i);n>""&&(e[r]=r in e?e[r]+"-"+n:n)}));var t=document.querySelector("input[id^='opensearch-']");t&&""!==t.value.trim()&&(e.q=t.value);var a=document.getElementById("zipCode"),r=document.getElementById("distance");if(r&&a&&""!==a.value){var i=r.value.trim();if(""===i)return alert("Please select a distance."),distanceElement.focus(),!1;var n=a.value.trim().split("-")[0];e.vehiclelocation=n+"-"+i}var o=document.getElementById("svSearch");if(o){var c=o.value.trim();if(c.length>0){if(!c.match(/^[0-9a-zA-Z\-]+$/))return alert("Please enter a valid VIN or Stock Number."),o.focus(),!1;e.sv=["~"+c]}}return e}(),removedFilters());location.href=t}function removeParameters(e,t){var a=t.split("?")[0],r=[],i=-1!==t.indexOf("?")?t.split("?")[1]:"";if(""!==i){r=i.split("&");for(var n=0;n<e.length;n++)for(var o=e[n],c=r.length-1;c>=0;c-=1)r[c].split("=")[0].toLowerCase()===o.toLowerCase()&&r.splice(c,1);a=a+"?"+r.join("&")}return a}"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),String.prototype.includes||(String.prototype.includes=function(){"use strict";return-1!==String.prototype.indexOf.apply(this,arguments)}),document.addEventListener("DOMContentLoaded",(function(e){const t=document.getElementById("toyotaDigitalGarageSettings"),a=JSON.parse(t.innerHTML);document.querySelectorAll("dg-shopping-cart").forEach((e=>{e.setAttribute("force-show",`${a?.digitalGarageDataHub?.forceTdgShoppingCart??!1}`)}))})),jQuery(document).ready((function(){jQuery("[data-toggle=offcanvas]").click((function(){jQuery(".row-offcanvas").toggleClass("active"),jQuery("#srpRefineSearch_Filters input:first").focus(),jQuery(".row-offcanvas").hasClass("active")&&jQuery(".contentWrapper .container").css("overflow-x","hidden")})),usingUwmTpi||jQuery('[id|="videoBtn"]').each((function(){var e=jQuery(this).attr("show");ActivateMagnific(jQuery(this),"video",e)})),jQuery("body").on("show.bs.modal",(function(e){var t=e.relatedTarget;t&&(jQuery("iframe#rebateIframe").removeAttr("src"),jQuery("iframe#rebateIframe").attr("src",t.getAttribute("data-iframe-src")))})),jQuery("body").on("hidden.bs.modal",".page-modal",(function(){jQuery(this).find("iframe").removeAttr("src"),jQuery(this).removeData("bs.modal")}));var e=document.querySelector(".btn-cta.stat-search-submit");e&&e.addEventListener("click",(function(){refineSearch()}));var t=document.getElementById("opensearch-submit");t&&t.addEventListener("click",(function(){refineSearch()}))}));var removedFilters=function(){var e={};return jQuery("input:checkbox[id^='filter']:not(:checked)").each((function(t,a){var r=this.name,i=encodeURIComponent(this.value);r in e?e[r].push(i):e[r]=[i]})),e};function updateQueryStringParameters(e,t,a){return"cpotier"in t&&(a.cpo=1),jQuery.each(a,(function(t,a){e=removeQueryStringParameter(e,t,a)})),e=removeQueryStringParameter(e,"q"),e=removeQueryStringParameter(e,"StockNum"),e=removeQueryStringParameter(e,"StockVin"),jQuery.each(t,(function(t,a){e=updateQueryStringParameter(e,t,a)})),e}function updateQueryStringParameter(e,t,a){var r=new RegExp("([?&])"+t+"=.*?(&|$)","i"),i=-1!==e.indexOf("?")?"&":"?";return e.match(r)?e.replace(r,"$1"+t+"="+a+"$2"):(e+i+t+"="+a).replace(/pt=\d+&?/i,"")}function removeQueryStringParameter(e,t,a){var r=new RegExp("([?&])"+t+"=.*?(&|$)","i"),i=e.match(r);if(i){var n=e.replace(r,"$2").replace(/pt=\d+&?/i,"");return n.replace("&",i[1])}return e}function toggleBooleanFilter(e){var t=e.getAttribute("for");if(e.checked)location.href=location.href.replace(/(pt=\d+&*)/,"").replace(/&$/,"")+(-1===location.href.indexOf("?")?"?"+t+"=1":"&"+t+"=1");else{var a=new RegExp("[&\\?]"+t+"=\\d","i");console.log("source:"+a.source),location.href=location.href.replace(a,"").replace(/(pt=\d+&*)/,"").replace(/&$/,"")}}function ActivateMagnific(e,t,a){window.magnificPopupLoaded?ActivateMagnificInner(e,t,a):document.addEventListener("MagnificPopupLoaded",(()=>{ActivateMagnificInner(e,t,a)}))}function ActivateMagnificInner(e,t,a){if(""!==a)switch(t){case"iframe":jQuery(e).magnificPopup({type:"iframe",midClick:!0,items:{src:a}});break;case"special":jQuery(e).magnificPopup({items:{type:"iframe",src:a},iframe:{markup:'<div class="mfp-iframe-scaler specialMagnific"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen>            </iframe></div>'},callbacks:{open:function(){ResetTracker(),trackerHook(specialLinkTrackerEvent,"click")}}});break;case"video":jQuery(e).magnificPopup({items:{type:"iframe",midClick:!0,src:a},iframe:{markup:'<div class="mfp-iframe-scaler vehicleVidMagnific"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen scrolling="no">            </iframe></div>'},mainClass:"vehicleVidMagnificContainer"})}}function srpResponsiveGallery(e,t){if(Galleria.loadTheme("//cdn.jsdelivr.net/galleria/1.3.3/themes/classic/galleria.classic.js"),"undefined"===jQuery)return!1;$=jQuery;var a=!1,r=new RegExp("galleria.classic.css");if([].slice.call(document.head.children).forEach((function(e){"LINK"==e.nodeName&&r.test(e.href)&&(a=!0)})),!a){var i=document.createElement("link");i.type="text/css",i.rel="stylesheet",i.href="https://cdn.jsdelivr.net/galleria/1.3.3/themes/classic/galleria.classic.css",document.head.appendChild(i)}var n="/api/InventoryWidget/Galleria/?vin="+e+"&dealerId="+t,o="#photoGalleria",c="#srpRow-"+e;$(o).parent().attr("id")!=c.split("#").pop()?($(o).collapse("show"),$(o).detach().appendTo(c),$.ajax({url:n,type:"GET",dataType:"json",contentType:"application/json; charset=utf-8",success:function(e){var t=JSON.parse(e);Galleria.run(o,{dataSource:t,transition:"slide",transitionSpeed:750,autoplay:2500,imageCrop:!0,maxScaleRatio:1,overlayBackground:"#39561D",height:500}),window.location.hash=c}})):$(o).collapse("toggle")}function openWindowSticker(e){screen_width=window.screen.availWidth,left_point=parseInt(screen_width/2)-500,brochureWindow=window.open(e,"","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=1,resizable=yes,copyhistory=yes,width=1050,height=1500"),brochureWindow.moveTo(left_point,0)}function openFordWindowSticker(e){var t=DealeronCookie.getItem("t3website")||"",a="";if(""!=t){var r=t.match(/<cookieguid>([^<]*)<\/cookieguid>/);if(r.length>1){var i=r[1];null!=i&&(a=i)}}openWindowSticker(""==a?e:e+"&cguid="+a)}jQuery(".modal-link").click((function(e){e.preventDefault(),jQuery("#rebateModal").on("show.bs.modal",(function(){jQuery("iframe#rebateIframe").removeAttr("src"),jQuery("iframe#rebateIframe").attr("src",e.currentTarget.href)})).modal()})),jQuery(".commentsExpand").click((function(e){jQuery(this).prev().toggleClass("vehicleCommentsCollapsed"),jQuery(this).find("i").hasClass("fa-plus")?jQuery(this).find("i").removeClass("fa-plus").addClass("fa-minus"):jQuery(this).find("i").removeClass("fa-minus").addClass("fa-plus")})),Galleria.ready((function(){this.addElement("exit").appendChild("container","exit"),this.$("exit").text("× ").click((function(e){$("#photoGalleria").collapse("toggle")})),$(".galleria-image-nav-right").addClass("stat-arrow-next"),$(".galleria-image-nav-right").attr("data-loc","carousel"),$(".galleria-image-nav-left").addClass("stat-arrow-prev"),$(".galleria-image-nav-left").attr("data-loc","carousel"),$(".galleria-info-link").addClass("stat-icon-link"),$(".galleria-info-link").attr("data-loc","carousel"),$(".galleria-exit").addClass("stat-button-close"),$(".galleria-exit").attr("data-loc","carousel"),this.bind("loadfinish",(function(e){$(".galleria-thumbnails .galleria-image").each((function(e){e++,$(this).find("img").addClass("stat-thumbnail"),$(this).find("img").attr("data-loc","carousel:thumb"+e)}))}))})),jQuery((function(e){e("div[rel]").each((function(){e(this).click((function(){openDetailsNew?window.open(jQuery(this).attr("rel")):location.href=jQuery(this).attr("rel")}))})),e("div ul[rel]").each((function(){e(this).click((function(){openDetailsNew?window.open(jQuery(this).attr("rel")):location.href=jQuery(this).attr("rel")}))})),e('span[data-toggle="popover"],a[data-toggle="popover"]').each((function(){var t=e(this).closest('[id^="srpRow"]').attr("id");if(window.matchMedia("(max-width: 767px)").matches)e(this).popover({html:!0,trigger:"click",animation:!1,container:"#"+t,placement:"bottom"});else{var a=this;e(this).popover({html:!0,trigger:"manual",animation:!1,container:"#"+t,placement:"auto left"}).on("mouseenter",(function(){e(a).popover("show"),e("#"+t+" .popover").on("mouseleave",(function(){e(a).popover("hide")}))})).on("mouseleave",(function(){setTimeout((function(){e(".popover:hover").length||e(a).popover("hide")}),5)}))}})),e("body").on("shown.bs.popover",(function(){e(".modal-link").click((function(t){t.preventDefault(),jQuery("#rebateModal").on("show.bs.modal",(function(){e("[aria-describedby]").popover("hide"),e("iframe#rebateIframe").removeAttr("src"),e("iframe#rebateIframe").attr("src",t.currentTarget.href)})).modal()}))}))})),jQuery("#closeSRP_refine").on("click touch",closeRefineSearch),jQuery(document).keyup((function(e){"Escape"===e.key&&closeRefineSearch()}));var firstFocusableElement=jQuery("#closeSRP_refine"),lastFocusableElement=jQuery("#btnFilter");function closeRefineSearch(){jQuery(".row-offcanvas-left").removeClass("active"),jQuery(".contentWrapper .container").css("overflow-x","visible"),jQuery("a[data-toggle='offcanvas']").focus()}function ResetTracker(){eventFired=0}lastFocusableElement.keydown((function(e){"Tab"!==e.key||e.shiftKey||(e.preventDefault(),firstFocusableElement.focus())})),firstFocusableElement.keydown((function(e){"Tab"===e.key&&e.shiftKey&&(e.preventDefault(),lastFocusableElement.focus())})),$('a[data-toggle="offcanvas"].stat-search-toggle').on("click",(function(){$("#srpRefineSearch_Filters input").attr("readonly","readonly"),setTimeout((function(){$("#srpRefineSearch_Filters input").removeAttr("readonly"),$("#srpRefineSearch_Filters input").blur()}),100)}));var specialOnlyCheckbox=document.getElementsByClassName("special-only")[0];function GetModalContent(e,t,a){var r=new XMLHttpRequest;r.onload=function(){r.readyState==XMLHttpRequest.DONE&&(200==r.status?a(e,r.responseText):console.error("Error: "+r.status+" for endpoint "+t))},r.ontimeout=function(){console.error("The request for "+t+" timed out.")},r.open("GET",t,!0),r.timeout=0,r.send()}function RenderModalContent(e,t){var a=JSON.parse(t);e.find(".modal-content").html(a)}specialOnlyCheckbox&&specialOnlyCheckbox.addEventListener("click",(function(e){var t=document.getElementById("filter-searchspecialsonly");t&&(t.checked=!t.checked)})),$("#commentsModal").on("show.bs.modal",(function(e){var t=`/api/vhcliaa/inventory/${window.DlronGlobal_DealerId}/vehicle-comments?vin=${e.relatedTarget.dataset.vin}`;GetModalContent($(this),t,RenderModalContent)})),$("#optionsModal").on("show.bs.modal",(function(e){var t=`/api/vhcliaa/inventory/${window.DlronGlobal_DealerId}/vehicle-options?vin=${e.relatedTarget.dataset.vin}`;GetModalContent($(this),t,RenderModalContent)}));