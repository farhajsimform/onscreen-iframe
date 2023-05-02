(function(window, document, undefined) {

    var CloudEngageHead = window.CloudEngageHead = function() {

        return {
            'getBaseUrl': function() {
                return window.location.href;
            },
            'getReplacementTextByHash': function() {
                return '';
            },
            'getVersion': function() {
                return (window.CloudEngageHeadInstallVersion || 'pre-2.0');
            }
        };
    }();
})(window, document);
