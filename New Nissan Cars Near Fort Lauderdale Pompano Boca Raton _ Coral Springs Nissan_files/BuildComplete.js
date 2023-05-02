window.onload = function () {
  saveDealerBuildStatus();
};

function getAccountIdFromQueryParams() {
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src.toLowerCase().indexOf("/buildcomplete.js") > -1) {
      var queryParamsArray = scripts[i].src.split("?").pop().split("&");
      for (var j = 0; j < queryParamsArray.length; j++) {
        if (queryParamsArray[j].toLowerCase().indexOf("aid") > -1) {
          return queryParamsArray[j].split("aId=")[1];
        }
      }
    }
  }
  return '';
}

function getDomainUrl() {
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src.toLowerCase().indexOf("/buildcomplete.js") > -1) {
      var urlParts = scripts[i].src.toLowerCase().split("scripts");
      return urlParts[0];
    }
  }
  return '';
}
function saveDealerBuildStatus() {
  let domainUrl = getDomainUrl();
  var jsStatus = {
    EncryptedAccountId: getAccountIdFromQueryParams(),
    StatusId: 2,
    LastChecked: new Date()
  };
  AjaxRequest({
    method: 'POST',
    url: domainUrl + 'service/status/dealer-build',
    async: true,
    data: jsStatus,
    header: [
      { "content-type": "application/json; charset=UTF-8" }
    ]
  });
}

function AjaxRequest(options) {
  var xhttp = new XMLHttpRequest();
  xhttp.open(options.method, options.url, options.async);
  options.header.forEach(function (header) {
    var keys = Object.keys(header);
    xhttp.setRequestHeader(keys[0], header[keys[0]]);
  });
  if (options.data)
    xhttp.send(JSON.stringify(options.data));
  else xhttp.send();
}



