"use strict";dealeron.runtime.define(["system/text","system/logManager","system/linq"],function(m,t,y){var E=t.getLogger("Http Handler");function s(e,t,n){var s,r,o,u,a=this,i=null,c=null,f={},l=!1,p=!1,d=new XMLHttpRequest,T=null,t=t.split("?"),h=m.from(t[0],n);function g(){l=!0,E.info("Making {0} request to {1}",e,h);var t=h;null!==c&&(t+="?"+m.toQuery(c)),d.open(e,t),y.Enumerable.from(f).forEach(function(t){d.setRequestHeader(t.key,f.value)}),d.send(JSON.stringify(i)),d.onprogress=function(t){u&&u(t.loaded/t.total)},d.onreadystatechange=function(){if(d.readyState===(XMLHttpRequest.DONE||4)){p=!0;var t=d.getResponseHeader("Content-Type")||"";switch(T="application/json"===t.split(/;\s*/)[0].toLowerCase()?JSON.parse(d.responseText):d.responseText,d.status){case 200:case 201:case 202:case 203:case 204:case 205:case 206:E.info("Recieved response from {0} with status {1} {2}",h,d.status,d.statusText),"function"==typeof s&&s(T,d.status,d.statusText,d.getAllResponseHeaders());break;default:E.error("Recieved error code {0} {1} from {1}",d.status,d.statusText,h),"function"==typeof r&&r(T,d.status,d.statusText,d.getAllResponseHeaders())}"function"==typeof o&&o(T,d.status,d.statusText,d.getAllResponseHeaders())}}}1<t.length&&(c=m.fromQuery(t[1])),this.withHeader=function(t,e){return f[t]=e,a},this.query=function(t,e){for(var n in c=c||{},t)e&&null===t[n]||(c[n]=t[n]);return a},this.basicAuth=function(t,e){return f.Authorization="basic "+btoa(m.from("{0}:{1}",t,e)),a},this.auth=function(t,e){return f.Authorization=m.from("{0} {1}",t,e),a},this.send=function(t){return l||(t&&(i="object"==typeof t?(f["Content-Type"]="Application/JSON",JSON.stringify(t)):(f["Content-Type"]="Text/Plain",t.toString())),g()),a},this.progress=function(t){return p&&t(1),u=t,a},this.success=function(t){return l||g(),p?t(T,d.status,d.statusText,d.getAllResponseHeaders()):s=t,a},this.error=function(t){return l||g(),p?t(T,d.status,d.statusText,d.getAllResponseHeaders()):r=t,a},this.done=function(t){return l||g(),p?t(T,d.status,d.statusText,d.getAllResponseHeaders()):o=t,a}}var n={method:{GET:"GET",POST:"POST",PUT:"PUT",DELETE:"DELETE"},makeRequest:function(t,e,n){return new s(t,e,n)},get:function(t,e){return new s(n.method.GET,t,e)},put:function(t,e){return new s(n.method.PUT,t,e)},post:function(t,e){return new s(n.method.POST,t,e)},delete:function(t,e){return new s(n.method.DELETE,t,e)}};return n});