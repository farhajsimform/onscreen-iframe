var FlickFusionExecutor = function () {
    'use strict';
    var _mediaHostURL = '//media.flickfusion.net/',
        _verifyHostURL = '//verify.flickfusion.net/',
        _pageStatsServiceURL = "https://jobserver-dot-concatlogsbigquery.appspot.com/app/stats/?event_type=",
        _getRefDomain = window.location.hostname,
        _getRefURL = encodeURIComponent(window.location.href),
        _documentTitle = encodeURIComponent(document.title),
        _referredFrom = encodeURIComponent(document.referrer),
        _displayButtonThumb,
        _displayButtonDefault,
        _button_image_path,
        _profilesBag = {},
        _filterUnique = {},
        _buttonsCount = 0,
        _buttons_count = document.querySelectorAll('#ff_link').length,
        _domainName = window.location.hostname,
        _path = window.location.href,
        _custom_script_run,
        _allowDuplicates = false,
        _showSpanishBtn = false,
        notAllowInlineDuplicate = true,
        dataVDP = {},
        dataVLP = {},
        forceConfigRun = false,
        checkIsVLP,
        checkIsVDP,
        isSPA,
        checkFyuse = "0",
        checkCDK = "0",
        clientKey = "F721B30E-0E50-89B3-5D0B-26835D4D8AF8",
        checkDDC = '0',
        dom = 'www.coralspringsnissan.com',
        clientKeyForTest = clientKey,
        clientData,
        siteConfig = { VLP: {}, VDP: {}, EVC: {} },
        targetElementOnSRP,
        targetElementOnVDP,
        includeDDCAPIButtonsOnVDP = "<!--SHOW_API_BTN_VDP-->",
        includeDDCAPIButtonsOnVLP = "<!--SHOW_API_BTN_SRP-->",
        showDirectModal = "1",
        isDDCFallBackRolled,
        ignoreGlobleVTBtn,
        isVinHit = false,
        aspectRatio,
        extVlpIndicator,
        isStock = 0,
        nc_client="0",
        spanish_button_image_path,
        defaultSpanishButtonImages = {},
        isFullScreen =  false;

    // window.is360Video = "<!--IS_360_VIDEO-->";
    clientData = {"data":[{"client_fk":"F721B30E-0E50-89B3-5D0B-26835D4D8AF8","gaid":"UA-63200055-41","video_size":960,"live_video_only":0,"exclusive_btn":"https:\/\/gcbimages.storage.googleapis.com\/vidbtn\/UpdateddiscCoralsprings.jpg","client_360":"1","client_pano":0,"code_float_player":0,"vid_button":"https:\/\/gcbimages.storage.googleapis.com\/vidbtn\/UpdateddiscCoralsprings.jpg","enable_tracking":0,"vdp_btn_img":"\/\/gcbimages.storage.googleapis.com\/vidbtn\/ff_play.png","srp_btn_img":"\/\/gcbimages.storage.googleapis.com\/vidbtn\/ff_play.png","veh_test_img":"\/\/gcbimages.storage.googleapis.com\/vidbtn\/vehicle_test_video.png","af_img":"\/\/gcbimages.storage.googleapis.com\/vidbtn\/model_review_orange.png","veh_af":0,"img_360":"\/\/gcbimages.storage.googleapis.com\/vidbtn\/play_video_360.png","img_vdp_360":"\/\/gcbimages.storage.googleapis.com\/vidbtn\/play_video_360.png","img_srp_360":"\/\/gcbimages.storage.googleapis.com\/vidbtn\/play_video_360.png","img_vdp_360_only":"\/\/gcbimages.storage.googleapis.com\/vidbtn\/view_interative_360.png","img_srp_360_only":"\/\/gcbimages.storage.googleapis.com\/vidbtn\/view_interative_360.png","vid_call_img":"\/\/gcbimages.storage.googleapis.com\/vidbtn\/ff_video_call.png","thumb_paly_img":"\/\/gcbimages.storage.googleapis.com\/vidbtn\/ff_thumb_play_icon.png","full_scrn_img":"\/\/gcbimages.storage.googleapis.com\/vidbtn\/popup_full_screen_dark.png","live_vid_img":"\/\/gcbimages.storage.googleapis.com\/vidbtn\/livewalkaround.png","btn_text":"0","srp_btn_text_360_only":"Watch 360 Walkaround","srp_btn_fontsize_360_only":"16","srp_btn_bgcolor_360_only":"grey","srp_btn_textcolor_360_only":"white","srp_btn_text_vid_only":"Watch Video","srp_btn_fontsize_vid_only":"16","srp_btn_bgcolor_vid_only":"grey","srp_btn_textcolor_vid_only":"white","srp_btn_text_vid360":"Watch Video & 360 Walkaround","srp_btn_fontsize_vid360":"16","srp_btn_bgcolor_vid360":"grey","srp_btn_textcolor_vid360":"white","vdp_btn_text_360_only":"Watch 360 Walkaround","vdp_btn_fontsize_360_only":"16","vdp_btn_bgcolor_360_only":"grey","vdp_btn_textcolor_360_only":"white","vdp_btn_text_vid_only":"Watch Video","vdp_btn_fontsize_vid_only":"16","vdp_btn_bgcolor_vid_only":"grey","vdp_btn_textcolor_vid_only":"white","vdp_btn_text_vid360":"Watch Video & 360 Walkaround","vdp_btn_fontsize_vid360":"16","vdp_btn_bgcolor_vid360":"grey","vdp_btn_textcolor_vid360":"white","btn_text_VehFF":"0","srp_btn_img_VehFF":"https:\/\/media.flickfusion.net\/videos\/global\/images\/360_test_drive.png","vdp_btn_img_VehFF":"https:\/\/media.flickfusion.net\/videos\/global\/images\/360_test_drive.png","srp_btn_text_VehFF":"Watch Video","srp_btn_fontsize_VehFF":"16","srp_btn_bgcolor_VehFF":"grey","srp_btn_textcolor_VehFF":"white","vdp_btn_text_VehFF":"Watch Video","vdp_btn_fontsize_VehFF":"16","vdp_btn_bgcolor_VehFF":"grey","vdp_btn_textcolor_VehFF":"white","lp":0,"inline":0,"veh_test":0,"flow_found":0,"vid_call":0,"vid_call_html":"","related_videos":0,"auto_play":0,"img_slider":0,"skip_vid_tab":0,"enable_referer":"1","client_zip":"33071","spanish_btn_url":"","disp_spanish_btn":"0"}]}

    // json include
    siteConfig = {"VLP":{
   "VLPIndicator":"#content-main-inventory",
   "container":".sidebar-oncanvas .srpVehicle",
   "vin":"div[data-vin]",
   "vinBaseTarget":true,
   "vinAttribute":"data-vin",
   "buttonTarget":".vehiclePhoto",
   "mobileButtonTarget":".visible-xs .vehiclePhoto",
   "buttonParentStyle":"width:100%",
   "buttonStyle":"text-align:left;padding:10px;width:100%;",
   "buttonClass":"btn btn-alt2 btn-block btn-lg stat-button-link",
   "buttonPos":"bottom",
   "prependIconElement":"<i class='fa fa-undo'></i>",
   "vinBaseTargetIdentifierVT":true,
   "yearVinAttribute":"data-year",
   "makeVinAttribute":"data-make",
   "modelVinAttribute":"data-model",
   "trimTarget":"div[data-trim]",
   "trimVinAttribute":"data-trim",
   "allowDuplicates":true
},VDP: {
            "VDPIndicator": ".vdp",
            vin: "a[data-vin]",
            vinAttribute: "data-vin",
            "target": ".panel-heading.hidden-xs",
            "buttonPos": "bottom",
            "inlinePlayer": true,
            "loadDelay": 3500,
            "iframeWraperClass": ".slider-list",
            "iframeParentStyle": "position:relative;",
            "siteStyle": ".sts-spin{display:none !important;} .fFusion_inline_fullscreen_enable .vdp-sidebar-body{z-index:unset !important;} .fFusion_inline_fullscreen_enable .vdp-sidebar-body,.fFusion_inline_fullscreen_enable .desktop{z-index:unset !important;} .fFusion_inline_fullscreen_is_mobile .js-carousel__inner,.fFusion_inline_fullscreen_is_mobile .carousel__item--hero{transform:unset !important;} .fFusion_inline_fullscreen_is_mobile .sticky-is-enabled .navbar-header{background-color:unset !important;} .fFusion_inline_fullscreen_is_mobile .navbar{z-index:-1;} .fFusion_inline_fullscreen_enable .carousel__item.js-carousel__item[data-index='0']{transform:none !important;} .fFusion_inline_fullscreen_enable .js-carousel__inner{transform:none !important;} .fFusion_inline_fullscreen_enable .js-carousel__inner{transform:unset !important;} .fFusion_inline_fullscreen_enable .headerWrapper{z-index:unset !important;} .fFusion_inline_fullscreen_enable .vdp-body{z-index:unset !important;}",
            "removeExistingButtons": true,
            "mobileButtonTarget": "#vehicle-description",
            "mobileButtonPos":"top",
            "iframeWraperClass": "carousel__item js-carousel__item",
            "yearTarget": "#primaryButtonPageModalButton",
            "yearVinAttribute": "data-year",
            "makeTarget": "#primaryButtonPageModalButton",
            "makeVinAttribute": "data-make",
            "modelTarget": "#primaryButtonPageModalButton",
            "modelVinAttribute": "data-model",
            "trimTarget": "#primaryButtonPageModalButton",
            "trimVinAttribute": "data-trim",
            "bodyTypeTarget": "#primaryButtonPageModalButton",
            "bodyTypeVinAttribute": "data-bodystyle"
        }}

    //  js inlcude
    

    if (!siteConfig.VLP)
        siteConfig.VLP = {}

    if (!siteConfig.VDP)
        siteConfig.VDP = {}

    if(!Array.isArray(clientData))
        window['checkClientData'] = true;
    else if(!document.querySelector("#ff_link"))
        return;

    // check SPA and load script
    if (siteConfig.VLP.isSPA || siteConfig.VDP.isSPA) {
        loadFFScript('https://media.flickfusion.net/videos/global/prod/spa_script.js');
        return;
    }


    // include trackleads
    if (siteConfig.EVC && Object.keys(siteConfig.EVC).length) {
        var trackLeadData = siteConfig.EVC;
        for (var i = 0; i < clientData.data.length; i++) {
            if (clientData.data[i].client_fk === clientKey && clientData.data[i].gaid) {
                trackLeadData.gaid = clientData.data[i].gaid;
                break;
            }
        }

        window.ff_track_lead = trackLeadData;
        loadFFScript('//media.flickfusion.net/videos/global/prod/track_form.js');
    }

    if (clientData.data) {
        clientData.data.forEach(function (clientData) {
            _profilesBag[clientData.client_fk] = clientData;
        });
    }

    if (document.readyState !== "loading") {
        runScriptAfterPageLoad();
    } else {
        document.addEventListener("DOMContentLoaded", runScriptAfterPageLoad);
    }

    function runScriptAfterPageLoad() {

        if (checkCDK === '1')
            snippetsInsertedDynamically();

        /* Load Buttons when buttons are added from client side*/

        if (checkDDC === '1') {
            if (includeDDCAPIButtonsOnVDP == '1' && document.querySelector(siteConfig.VDP.VDPIndicator) && window.DDC) {
                siteConfig.VDP.allowDuplicates = true;
                runDDCFallBack();
            }
            else if (includeDDCAPIButtonsOnVLP == '1' && document.querySelector(siteConfig.VLP.VLPIndicator) && window.DDC) {
                siteConfig.VLP.allowDuplicates = true;
                runDDCFallBack();
            }
        }

        if (siteConfig.VLP && !Object.keys(siteConfig.VLP).length) {
            loadButtons();
            if (!(checkCDK === '1'))
                snippetsInsertedDynamically();
            if (!Object.keys(siteConfig.VDP).length)
                return;
        }

        if (document.querySelector('#ff_link')) {
            loadButtons();
            if (!forceConfigRun)
                return;
        }

        if (Array.isArray(clientData)) return;

        /*       clientData.data.forEach(function (clientData) {
              _profilesBag[clientData.client_fk] = clientData;
            }); */

        dataVLP = siteConfig.VLP;
        dataVDP = siteConfig.VDP;

        if (getStatusFromConfig(dataVLP, 'VLPIndicator')) {
            checkVLPAndProcess(dataVLP);
        }
        else if (getStatusFromConfig(siteConfig.VLP1, 'VLPIndicator')) {
            dataVLP = siteConfig.VLP1;
            checkVLPAndProcess(siteConfig.VLP1);
        }
        else if (getStatusFromConfig(dataVDP, 'VDPIndicator')) {
            checkVDPAndProcess(dataVDP);
        }
        else if (!window.isDetailsPage && dataVLP && dataVLP.VLPIndicator) {
            if (dataVLP.allowDuplicates) updateValueAllowDuplicate(dataVLP.allowDuplicates);

            // if (dataVLP.siteStyle) createStyleTagAndAppend(dataVLP.siteStyle);
            runDDCFallBack();
        }
        else if (window.isDetailsPage && dataVDP && dataVDP.VDPIndicator) {
            if (dataVDP.allowDuplicates) updateValueAllowDuplicate(dataVDP.allowDuplicates);

            // if (checkIsVDP && dataVDP.siteStyle) createStyleTagAndAppend(dataVDP.siteStyle);
            runDDCFallBack();
        }
    }

    function loadButtons() {

        var profielsArray = [];

        if (document.getElementById('ff_link')) {
            if (window.NodeList && !NodeList.prototype.forEach) {
                NodeList.prototype.forEach = Array.prototype.forEach;
            }

            var isProfilePrinted = !(JSON.stringify(clientData) === '[]');
            document.querySelectorAll('#ff_link').forEach(function (buttonData, index, array) {
                _buttonsCount++;
                if (profielsArray.indexOf(buttonData.getAttribute('ff_client')) === -1) profielsArray.push(buttonData.getAttribute('ff_client'));

                if(isProfilePrinted){
                    checkVehicleData(buttonData);
                }

                if (_buttonsCount === array.length && !isProfilePrinted) {
                    generateProfilesThenButtons(profielsArray);
                }
            });
        }
    };

    function generateProfilesThenButtons(profielsArray) {
        profielsArray.forEach(function (profileKey, index, profilesArray) {
            var verifyClientMultiProfile =
                _verifyHostURL +
                'ff_verify_client.php?client_id=' +
                profileKey +
                '&d=' +
                _domainName +
                '&p=' +
                encodeURIComponent(_path) +
                '&b=' +
                _buttons_count;

            fetchJsonp(verifyClientMultiProfile, {
                timeout: 25000,
                jsonpCallback: 'jsoncallback'
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (multiClientDetails) {
                    if (multiClientDetails.code === 200) {
                        multiClientDetails.client_data.data.forEach(function (clientData) {
                            _profilesBag[clientData.client_fk] = clientData;
                        });
                    }

                    if (index + 1 === profilesArray.length) {
                        document.querySelectorAll('#ff_link').forEach(function (buttonData, index, array) {
                            checkVehicleData(buttonData);
                        });
                    }
                })
                .catch(function (reason) {
                    console.log('parsing failed', reason);
                });
        });
    };

    function checkVLPAndProcess(dataVLP) {
        if (!dataVLP) return;

        if(dataVLP.stock)
            isStock = 1;

        checkIsVLP = true;
        updateValueAllowDuplicate(dataVLP.allowDuplicates);
        removeFFSnippetsAddedOnPage(dataVLP);
        generateSRPButtons();
    }

    function checkVDPAndProcess(dataVDP) {
        if (!dataVDP) return;

        if(dataVDP.stock)
            isStock = 1;

        checkIsVDP = true;
        updateValueAllowDuplicate(dataVDP.allowDuplicates);

        if (dataVDP.notAllowInlineDuplicate)
            notAllowInlineDuplicate = dataVDP.notAllowInlineDuplicate;

        if (dataVDP.removeExistinInlineIframe && document.querySelector('div[ff_inline]')) document.querySelector('div[ff_inline]').remove();
        if (dataVDP.removeExistingButtons && document.querySelector('#ff_link')) document.querySelector('#ff_link').remove();

        generateVDPButtons();
    }

    function generateSRPButtons() {

        if (checkDDC === '1') {
            var checkVinBlockVLP = document.querySelector(siteConfig.VLP.container) && document.querySelector(siteConfig.VLP.vin);
            if (!checkVinBlockVLP && window.DDC) {
                // if (dataVLP.siteStyle) createStyleTagAndAppend(dataVLP.siteStyle);
                runDDCFallBack();
                return;
            }
        }

        targetElementOnSRP = {
            buttonTarget: dataVLP.buttonTarget,

            list: function () {
                return filterDataValues(dataVLP.container.split(','), 'querySelectorAll');
            },

            ajaxButtonGroup: function () {
                if (!(dataVLP.dynamicAjaxGroupMobileButtons || dataVLP.dynamicAjaxGroupDesktopButtons)) return '';

                var classArray;
                if (checkIsMobile && dataVLP.dynamicAjaxGroupMobileButtons != undefined)
                    classArray = dataVLP.dynamicAjaxGroupMobileButtons.split(',');
                else classArray = dataVLP.dynamicAjaxGroupDesktopButtons.split(',');

                return filterDataValues(classArray, 'plain');
            },

            vin: function (buttonItem) {
                var vinIdentifiers = dataVLP.vin.split(',');
                for (var index = 0; index < vinIdentifiers.length; index++) {
                    if (buttonItem.querySelector(vinIdentifiers[index])) return vinIdentifiers[index];
                }
            },

            targetVinNumber: function (buttonItem) {

                try {
                    if (dataVLP.vinBaseRegex && dataVLP.baseVinAttribute && buttonItem.getAttribute(dataVLP.baseVinAttribute).match(dataVLP.vinBaseRegex))
                        return buttonItem.getAttribute(dataVLP.baseVinAttribute).match(dataVLP.vinBaseRegex)[0];

                    if (dataVLP.vinBaseTarget && dataVLP.vinBaseTargetIdentifier) return buttonItem.getAttribute(dataVLP.vinBaseTargetIdentifier);

                    if (dataVLP.vinBaseTarget) return buttonItem.getAttribute('data-vin');

                    if (this.vin(buttonItem)) {
                        if (!dataVLP.stock && dataVLP.vinFromChildHTMLElementPath && buttonItem.querySelector(this.vin(buttonItem)))
                            return buttonItem
                                .querySelector(this.vin(buttonItem))
                                .outerHTML.toString()
                                .match(/\w{17}/)[0]
                                .substring(0, 17);
                        else if (!dataVLP.stock && buttonItem.querySelector(this.vin(buttonItem)) && dataVLP.vinRegex && buttonItem.querySelector(this.vin(buttonItem)).outerHTML.toString().match(dataVLP.vinRegex))
                            return buttonItem.querySelector(this.vin(buttonItem)).outerHTML.toString().match(dataVLP.vinRegex)[1].substring(0, 17);
                        else if (buttonItem.querySelector(this.vin(buttonItem)) && dataVLP.vinRegex && buttonItem.querySelector(this.vin(buttonItem)).outerHTML.toString().match(dataVLP.vinRegex))
                            return buttonItem.querySelector(this.vin(buttonItem)).outerHTML.toString().match(dataVLP.vinRegex)[1];
                        else if (dataVLP.vinAttribute) {
                            return buttonItem.querySelector(this.vin(buttonItem))
                                ? buttonItem.querySelector(this.vin(buttonItem)).getAttribute(dataVLP.vinAttribute)
                                : '';
                        } else {
                            if (buttonItem.querySelector(this.vin(buttonItem))) return buttonItem.querySelector(this.vin(buttonItem)).innerText;
                        }
                    }
                    return '';
                }
                catch (e) {
                    console.warn('Error on fetching vin!');
                }
            },

            /* placeToInsertButton: function (buttonItem) {
                var buttonsList = [];
                if (dataVLP.buttonTarget) {
                    buttonsList.push(buttonItem.querySelector(dataVLP.buttonTarget));
                }
                if (dataVLP.mobileButtonTarget) {
                    buttonsList.push(buttonItem.querySelector(dataVLP.mobileButtonTarget));
                }
                return buttonsList;
            }, */

            placeToInsertButton: function (buttonItem) {
                var buttonsList = [];
                var buttonTargetList = dataVLP.buttonTarget.split(',');

                for (var index = 0; index < buttonTargetList.length; index++) {
                    if (buttonItem.querySelector(buttonTargetList[index])) {
                        buttonsList.push(buttonItem.querySelector(dataVLP.buttonTarget));
                    }
                }

                if (dataVLP.mobileButtonTarget) {
                    buttonsList.push(buttonItem.querySelector(dataVLP.mobileButtonTarget));
                }

                return buttonsList;
            },

            buttonPositionDirection: function () {
                return targetDeskOrMobile(dataVLP.mobileButtonPos, dataVLP.buttonPos);
            },

            vinRegex: dataVLP.vinRegex,
            vinAttribute: dataVLP.vinAttribute,
            mobileButtonTarget: dataVLP.mobileButtonTarget,
            mobileButtonText: dataVLP.mobileButtonText,
            mobileCanary: dataVLP.mobileCanary
        };

        if (window.isFlickScriptLoaded === undefined) {
            if (dataVLP.loadDelay) {
                setTimeout(function () {
                    generateButtonsOnSRP();
                }, dataVLP.loadDelay);
            } else generateButtonsOnSRP();

            runDynamicButtonsAdded();
        }
        window.isFlickScriptLoaded = true;
    }

    function generateVDPButtons() {

        if (checkDDC === '1') {
            var checkVinBlockVDP = document.querySelector(siteConfig.VDP.target) && document.querySelector(siteConfig.VDP.vin);
            if (!checkVinBlockVDP && window.DDC) {
                // if (checkIsVDP && dataVDP.siteStyle) createStyleTagAndAppend(dataVDP.siteStyle);
                runDDCFallBack();
                return;
            }
        }

        targetElementOnVDP = {
            // target: document.querySelector(dataVDP.target),
            target: function () {
                return filterDataValues(dataVDP.target.split(','), 'querySelectorAll');
            },

            vinIdentifier: dataVDP.vin,
            targetVinNumber: function () {

                try {
                    if (this.vinIdentifier) {
                        if (!dataVDP.stock && dataVDP.vinFromChildHTMLElementPath && document.querySelector(this.vinIdentifier) && dataVDP.vinBaseRegex && document.querySelector(this.vinIdentifier).outerHTML.toString().match(/\w{17}/))
                            return document
                                .querySelector(this.vinIdentifier)
                                .outerHTML.toString()
                                .match(/\w{17}/)[0]
                                .substring(0, 17);
                        else if (!dataVDP.stock && document.querySelector(this.vinIdentifier) && dataVDP.vinRegex && document.querySelector(this.vinIdentifier).outerHTML.toString().match(dataVDP.vinRegex)) {
                            return document.querySelector(this.vinIdentifier).outerHTML.toString().match(dataVDP.vinRegex)[1].substring(0, 17);
                        }
                        else if (document.querySelector(this.vinIdentifier) && dataVDP.vinRegex && document.querySelector(this.vinIdentifier).outerHTML.toString().match(dataVDP.vinRegex)) {
                            return document.querySelector(this.vinIdentifier).outerHTML.toString().match(dataVDP.vinRegex)[1];
                        }
                        else if (dataVDP.vinAttribute)
                            return document.querySelector(this.vinIdentifier)
                                ? document.querySelector(this.vinIdentifier).getAttribute(dataVDP.vinAttribute)
                                : '';
                        else {
                            if (document.querySelector(this.vinIdentifier)) return document.querySelector(this.vinIdentifier).innerText;
                        }
                    }
                    return '';
                }
                catch (e) {
                    console.warn('Error on fetching vin!');
                }
            },

            placeToInsertButton: function () {
                var buttonsList = [];

                /* if (dataVDP.target) {
                    buttonsList.push(document.querySelector(dataVDP.target));
                }
                if (dataVDP.mobileButtonTarget) {
                    buttonsList.push(document.querySelector(dataVDP.mobileButtonTarget));
                } */

                if (isMobile() && dataVDP.mobileButtonTarget) {
                    buttonsList.push(document.querySelector(dataVDP.mobileButtonTarget));
                }
                else if (dataVDP.target) {
                    buttonsList.push(document.querySelector(dataVDP.target));
                }

                return buttonsList;
            },

            buttonPositionDirection: function () {
                return targetDeskOrMobile(dataVDP.mobileButtonPos, dataVDP.buttonPos);
            },

            vin: function () {
                var vinIdentifiers = dataVDP.vin.split(',');
                for (var index = 0; index < vinIdentifiers.length; index++) {
                    if (document.querySelector(vinIdentifiers[index])) return vinIdentifiers[index];
                }
            },
            vinRegex: dataVDP.vinRegex,
            vinAttribute: dataVDP.vinAttribute
        };

        if (window.isFlickScriptLoaded === undefined) {
            if (dataVDP.loadDelay) {
                setTimeout(function () {
                    generateButtonsOnVDP();
                }, dataVDP.loadDelay);
            } else generateButtonsOnVDP();
        }
        window.isFlickScriptLoaded = true;
    }

    function getAttributeValue(buttonItem, type) {

        try {
            var targetsArray = {
                year: {
                    regex: 'yearRegEx',
                    vinAttribute: 'yearVinAttribute',
                    target: 'yearTarget'
                },
                make: {
                    regex: 'makeRegEx',
                    vinAttribute: 'makeVinAttribute',
                    target: 'makeTarget'
                },
                model: {
                    regex: 'modelRegEx',
                    vinAttribute: 'modelVinAttribute',
                    target: 'modelTarget'
                },
                trim: {
                    regex: 'trimRegEx',
                    vinAttribute: 'trimVinAttribute',
                    target: 'trimTarget'
                }
            };

            if (checkIsVLP && buttonItem) {

                if (dataVLP.vinBaseSelector) {
                    return buttonItem.getAttribute(dataVLP[targetsArray[type].target]).toString().match(dataVLP[targetsArray[type].regex])[1];
                }
                else if (dataVLP[targetsArray[type].regex]) {

                    return buttonItem.querySelector(dataVLP[targetsArray[type].target]).outerHTML.toString().match(dataVLP[targetsArray[type].regex])[1];
                }
                else if (dataVLP.vinBaseTargetIdentifierVT)
                    return buttonItem.getAttribute(dataVLP[targetsArray[type].vinAttribute]);

                else if (dataVLP.yearVinAttribute)
                    return buttonItem.querySelector(dataVLP[targetsArray[type].target]).getAttribute(dataVLP[targetsArray[type].vinAttribute]);

                else
                    return buttonItem.querySelector(dataVLP[targetsArray[type].target]).innerText;
            } else {
                if (dataVDP[targetsArray[type].regex])
                    return document.querySelector(dataVDP[targetsArray[type].target]).outerHTML.toString().match(dataVDP[targetsArray[type].regex])[1];

                else if (dataVDP.yearVinAttribute)
                    return document.querySelector(dataVDP[targetsArray[type].target]).getAttribute(dataVDP[targetsArray[type].vinAttribute]);

                else if (dataVDP.getDataFromDDCDataLayer) {
                    if (type === 'year')
                        type = 'modelYear';

                    return DDC.dataLayer.vehicles[0][type];
                }
                else
                    return document.querySelector(dataVDP[targetsArray[type].target]).innerText;
            }
        }
        catch (e) {
            console.warn('Error on fetching vehicle data!');
        }
    }

    // .remove() polyfill
    if (!Element.prototype.remove) {
        Element.prototype.remove = function remove() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

    function updateValueAllowDuplicate(value) {
        if (value) _allowDuplicates = true;
    }

    function filterDataValues(data, type) {
        for (var index = 0; index < data.length; index++) {
            if (document.querySelector(data[index]) && !isHidden(document.querySelector(data[index]))) {
                if (type == 'querySelectorAll') return document.querySelectorAll(data[index]);
                else if (type == 'plain') return data[index];
            }
        }
    }

    // VDP
    function generateButtonsOnVDP() {

        try {
            if (dataVDP.globalSiteStyle) createStyleTagAndAppend(dataVDP.globalSiteStyle);
            var vinNumber = targetElementOnVDP.targetVinNumber();
            vinNumber = vinNumber.trim();

            if (getParameterByName('ff_test_vin')) vinNumber = getParameterByName('ff_test_vin');
            insertButtonOnPostion(targetElementOnVDP.placeToInsertButton(), vinNumber, targetElementOnVDP.buttonPositionDirection());
        }
        catch (e) {
            console.warn('Error on fetching vehicle details!');
        }
    }


    function generateButtonsOnSRP() {

        if (dataVLP.globalSiteStyle) createStyleTagAndAppend(dataVLP.globalSiteStyle);

        try {
            if (!targetElementOnSRP.list())
                return;

            for (const buttonItem of targetElementOnSRP.list()) {
                var vinNumber = targetElementOnSRP.targetVinNumber(buttonItem);
                if(!vinNumber) continue;
                vinNumber = vinNumber.trim();

                if (getParameterByName('ff_test_vin')) vinNumber = getParameterByName('ff_test_vin');

                srpVerifyVinService(targetElementOnSRP.placeToInsertButton(buttonItem), vinNumber, targetElementOnSRP.buttonPositionDirection(), buttonItem);
            }

            /*targetElementOnSRP.list().forEach(function (buttonItem, index, array) {
                var vinNumber = targetElementOnSRP.targetVinNumber(buttonItem);
                vinNumber = vinNumber.trim();

                if (getParameterByName('ff_test_vin')) vinNumber = getParameterByName('ff_test_vin');

                srpVerifyVinService(targetElementOnSRP.placeToInsertButton(buttonItem), vinNumber, targetElementOnSRP.buttonPositionDirection(), buttonItem);
            });*/

        }
        catch (e) {
            console.warn('Error on buttons looping!');
        }
    }

    function srpVerifyVinService(insertButtonPosition, vinNumber, buttonPositionDirection, buttonItem) {
        if (!vinNumber) return;

        if (getParameterByName('ff_test_vin')) vinNumber = getParameterByName('ff_test_vin');

        insertButtonOnPostion(insertButtonPosition, vinNumber, buttonPositionDirection, buttonItem);
    }

    function runDynamicButtonsAdded() {
        var observer = new MutationObserver(function (mutations) {
            runButtonGenerate(mutations);
        });
        observer.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });

        function runButtonGenerate(data) {
            var target = dataVLP.buttonTarget,
                vehicleTest = null,
                buttonInsertArea;

            // for (var mutation of data) {
            for (var mutation = 0; mutation < data.length; mutation++) {

                // for (var node of mutation.addedNodes) {
                for (var node = 0; node < data[mutation].addedNodes.length; node++) {

                    if (!(data[mutation].addedNodes[node] instanceof HTMLElement)) continue;

                    if ((dataVLP.ajaxPageChange || dataVLP.ajaxPageChangeNotAllowDuplicates) && dataVDP.VDPAjaxPageChangeElement) {
                        if (data[mutation].addedNodes[node].matches(dataVDP.VDPAjaxPageChangeElement)) {
                            checkVDPAndProcess(dataVDP);
                            generateButtonsOnVDP();
                        }
                    }

                    if ((dataVDP.ajaxPageChange || dataVDP.ajaxPageChangeNotAllowDuplicates) && dataVLP.VLPAjaxPageChangeElement) {
                        if (data[mutation].addedNodes[node].matches(dataVLP.VLPAjaxPageChangeElement)) {
                            checkVLPAndProcess(dataVLP);
                            generateButtonsOnSRP();
                        }
                    }

                    // direct child
                    if (targetElementOnSRP.ajaxButtonGroup()) {
                        if (data[mutation].addedNodes[node].matches(targetElementOnSRP.ajaxButtonGroup())) {
                            buttonInsertArea = data[mutation].addedNodes[node].querySelector(target);
                            srpVerifyVinService(
                                [buttonInsertArea],
                                processVinNumber(data[mutation].addedNodes[node], target),
                                targetElementOnSRP.buttonPositionDirection(),
                                data[mutation].addedNodes[node]
                            );
                        }

                        // inside child list
                        // for (var elem of node.querySelectorAll(targetElementOnSRP.ajaxButtonGroup())) {
                        for (var elem = 0; elem < data[mutation].addedNodes[node].querySelectorAll(targetElementOnSRP.ajaxButtonGroup()).length; elem++) {
                            buttonInsertArea = data[mutation].addedNodes[node].querySelectorAll(targetElementOnSRP.ajaxButtonGroup())[elem].querySelector(target);
                            srpVerifyVinService(
                                [buttonInsertArea],
                                processVinNumber(data[mutation].addedNodes[node].querySelectorAll(targetElementOnSRP.ajaxButtonGroup())[elem], target),
                                targetElementOnSRP.buttonPositionDirection(),
                                data[mutation].addedNodes[node].querySelectorAll(targetElementOnSRP.ajaxButtonGroup())[elem]
                            );
                        }
                    }
                }
            }
        }
    }

    // buttons added on page, dynamically
    function snippetsInsertedDynamically() {

        var observer = new MutationObserver(function (mutations) {
            runButtonGenerate(mutations);
        });
        observer.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });


        function runButtonGenerate(data) {

            for (var mutation = 0; mutation < data.length; mutation++) {
                for (var node = 0; node < data[mutation].addedNodes.length; node++) {
                    if (!(data[mutation].addedNodes[node] instanceof HTMLElement)) continue;

                    // direct child
                    if (data[mutation].addedNodes[node].matches('#ff_link')) {
                        if (!isHidden(data[mutation].addedNodes[node]))
                            dynamicButtonsAdded(data[mutation].addedNodes[node]);
                    }

                    // inside child list
                    for (var elem = 0; elem < data[mutation].addedNodes[node].querySelectorAll('#ff_link').length; elem++) {
                        if (!isHidden(data[mutation].addedNodes[node].querySelectorAll('#ff_link')[elem]))
                            dynamicButtonsAdded(data[mutation].addedNodes[node].querySelectorAll('#ff_link')[elem]);
                    }
                }
            }
        }
    }


    var dynamicButtonsAdded = function (dynamicSnippet) {

        if(!dynamicSnippet.getAttribute('ff_client') && Number(nc_client)){
            dynamicSnippet.setAttribute('ff_client',clientKeyForTest);
        }

        if (_profilesBag[dynamicSnippet.getAttribute('ff_client')] === undefined) {
            var verifyClientMultiProfileDynamic = _verifyHostURL + 'ff_verify_client.php?client_id=' + dynamicSnippet.getAttribute('ff_client') + (checkCDK == "1" ? "&isCDK=1" : "");
            fetchJsonp(verifyClientMultiProfileDynamic, {
                timeout: 25000,
                jsonpCallback: 'jsoncallback'
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (multiClientDetails) {
                    if (multiClientDetails.code === 200) {
                        multiClientDetails.client_data.data.forEach(function (clientData, index, arrayData) {
                            _profilesBag[clientData.client_fk] = clientData;
                            if (index + 1 === arrayData.length) {
                                checkVehicleData(dynamicSnippet);
                            }
                        });
                    }
                })
                .catch(function (reason) {
                    console.log('parsing failed', reason);
                });
        } else {

            if (isSPA) {
                setTimeout(function () { checkVehicleData(dynamicSnippet); }, 1000)
            } else
                checkVehicleData(dynamicSnippet);
        }
    };


    function processVinNumber(item, finder) {
        if (item.querySelector(finder)) {
            return targetElementOnSRP.targetVinNumber(item);
        }
    }

    function insertButtonOnPostion(buttonAddAreaTarget, vinNumber, position, buttonItem) {
        return buttonAddAreaTarget.forEach(function (buttonAddArea) {

            if (!dataVLP.ajaxPageChange && buttonAddArea && buttonAddArea.parentNode.querySelector('#ff_link'))
                return;

            if (position == 'top') buttonAddArea.parentNode.insertBefore(flickFusionLink(vinNumber, buttonItem), buttonAddArea);
            else if (position == 'bottom') buttonAddArea.parentNode.insertBefore(flickFusionLink(vinNumber, buttonItem), buttonAddArea.nextSibling);
            else if (position == 'inside') buttonAddArea.appendChild(flickFusionLink(vinNumber, buttonItem));
            else buttonAddArea.parentNode.insertBefore(flickFusionLink(vinNumber, buttonItem), buttonAddArea.nextSibling);
        });
    }

    function flickFusionLink(vinNumber, buttonItem) {
        var createFlickLink = document.createElement('div');
        createFlickLink.id = 'ff_link';
        createFlickLink.setAttribute('ff_client', clientKey);
        createFlickLink.setAttribute('ff_vin', vinNumber);

        if (Number(clientData.data[0].veh_test) || Number(clientData.data[0].veh_af) || Number(clientData.data[0].flow_found)) {
            createFlickLink.setAttribute('ff_year', getAttributeValue(buttonItem, 'year'));
            createFlickLink.setAttribute('ff_make', getAttributeValue(buttonItem, 'make'));
            createFlickLink.setAttribute('ff_model', getAttributeValue(buttonItem, 'model'));
            if (dataVLP.VLPIndicator && document.querySelector(dataVLP.VLPIndicator) && dataVLP.trimTarget && (dataVLP.trimRegEx || dataVLP.trimVinAttribute)) {
                createFlickLink.setAttribute('ff_trim', getAttributeValue(buttonItem, 'trim'));
            }
            if (dataVDP.VDPIndicator && document.querySelector(dataVDP.VDPIndicator) && dataVDP.trimTarget && (dataVDP.trimRegEx || dataVDP.trimVinAttribute)) {
                createFlickLink.setAttribute('ff_trim', getAttributeValue(buttonItem, 'trim'));
            }
        }

        if (checkIsVDP && dataVDP && dataVDP.inlinePlayer) createFlickLink.setAttribute('ff_inline', 1);

        checkVehicleData(createFlickLink);
        return createFlickLink;
    }

    // Checking Vehicle data using vin
    function checkVehicleData(buttonData) {

        if(!buttonData.getAttribute('ff_client') && Number(nc_client))
            buttonData.setAttribute('ff_client',clientKeyForTest);

        if (_profilesBag[buttonData.getAttribute('ff_client')] &&
            Number(_profilesBag[buttonData.getAttribute('ff_client')].flow_found) &&
            !buttonData.getAttribute('ff_vin') && buttonData.getAttribute('ff_year')) {
            buttonData.setAttribute('ff_vin', buttonData.getAttribute('ff_year') + '_' + buttonData.getAttribute('ff_make') + '_' +
                buttonData.getAttribute('ff_model') + '_' + new Date().getMilliseconds());
        }

        var isDuplicateButton = _filterUnique[buttonData.getAttribute('ff_client') + '__' + buttonData.getAttribute('ff_vin')];

        if (checkCDK === '1' && buttonData.getAttribute('ff_inline') && notAllowInlineDuplicate) isDuplicateButton = false;

        if (!_allowDuplicates) {
            if (isDuplicateButton || buttonData.hasAttribute('verified')) {
                return false;
            }
        }

        buttonData.innerHTML = '';
        var ff_vin = buttonData.getAttribute('ff_vin') || '',
            ff_year = buttonData.getAttribute('ff_year') || '',
            ff_make = buttonData.getAttribute('ff_make') || '',
            ff_model = buttonData.getAttribute('ff_model') || '',
            ff_trim = buttonData.getAttribute('ff_trim') || '',
            ff_lp = buttonData.getAttribute('ff_lp') || '',
            ff_body_type = buttonData.getAttribute('ff_body_type') || '',
            clientKey = buttonData.getAttribute('ff_client') || '';
        // ff_vin = (!ff_vin && Number(_profilesBag[clientKey].flow_found)) ? ff_year +'_'+ ff_make +'_'+ ff_model : ff_vin;
        var ff_new_car = '&ff_year=' + ff_year + '&ff_make=' + ff_make + '&ff_model=' + ff_model + '&ff_trim=' + ff_trim + '&ff_body_type=' + ff_body_type + '&ff_lp=' + ff_lp;

        for (var key in _profilesBag) {
            if (_profilesBag.hasOwnProperty(key)) {
                if (_profilesBag[key].disp_spanish_btn === 1) {
                    _showSpanishBtn = true;
                    break;
                }
            }
        }

        if(getParameterByName('ff_test_client')){
            clientKey = getParameterByName('ff_test_client');
            ff_vin = getParameterByName('ff_test_vin');
        }

        var checkVIN =
            _verifyHostURL + 'ff_verify_vin.php?vin=' + ff_vin + '&client_id=' + clientKey + ff_new_car + (_showSpanishBtn ? '&ff_spanish=1' : '') + '&stk=' + isStock;

        var inputData, outputData;
        var startTime = Date.now();

        fetchJsonp(checkVIN, {
            timeout: 25000,
            jsonpCallback: 'jsoncallback'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (videoData) {

                // send vin response
                var responseTime = Date.now() - startTime;
                checkVIN = checkVIN.split(" ").join("").replace(/(\r\n|\n|\r)/gm, "");
                checkVIN = checkVIN.slice(checkVIN.indexOf("php?vin") + 1, checkVIN.length);
                checkVIN = checkVIN.replace(/\s/g, "");
                //inputData = JSON.parse('{"' + decodeURI(checkVIN).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
                outputData = videoData;

                var fullData = {
                    client_key: clientKey,
                    client_data: _profilesBag[videoData.data.client_fk],
                    // vin_input: inputData,
                    vin_output: outputData,
                    response_time: responseTime,
                    snippet_loaded: true,
                    is_vlp: checkIsVLP,
                    is_vdp: checkIsVDP,
                    site_info: {
                        url: window.location.hostname,
                        full_url: window.location.href,
                        referer: document.referrer,
                        insident_time: Date.now(),
                    }
                };

                postData(fullData, 'verify_vin').then((resp) => { });

                if (videoData.code === 200) {
                    if (checkFyuse == '1' && (!videoData.data.popup || (videoData.data.popup && !(videoData.data.popup.is360 == 1)))) {
                        return generateFyuseElements(buttonData, ff_vin);
                    }

                    if (!isVinHit) {
                        //loadFFScript('//media.flickfusion.net/videos/global/prod/script2.php');
                        loadFFScript('//storage.googleapis.com/gcbimages/s/popup.js', function () {
                            if (getParameterByName('autoplay') == 1 && showDirectModal == '1' && Number(_profilesBag[videoData.data.client_fk].flow_found)) {
                                setTimeout(function () {
                                    enableDirectModalShow(videoData.data);
                                }, 2000);
                            }
                        });
                    }

                    isVinHit = true;
                    return generateDisplayItems(videoData.data, buttonData, null);
                } else if (checkFyuse == '1') {
                    return generateFyuseElements(buttonData, ff_vin);
                }
                return false;
            })

            .catch(function (reason) {
                console.log('parsing failed', reason);
            });
        _filterUnique[buttonData.getAttribute('ff_client') + '__' + buttonData.getAttribute('ff_vin')] = true;
    }

    // Generate Fyuse elements on the page -- starts
    var generateFyuseElements = function (buttonData, fyuseVin) {
        var getFyuseIdService = 'https://media.flickfusion.net/360/hn_360_client.php?vin=' + fyuseVin;

        fetchJsonp(getFyuseIdService, {
            timeout: 25000,
            jsonpCallback: 'jsoncallback'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (fyuseData) {
                if (fyuseData.code === 200) {
                    var fyuseId = JSON.parse(fyuseData.fid)[0];
                    if (checkIsVDP && dataVDP.inlinePlayer) {
                        if (checkIsVDP && dataVDP.siteStyle) {
                            createStyleTagAndAppend(dataVDP.siteStyle);
                        }

                        loadFFScript('https://fyu.se/embed?v=3.0', function () {
                            {
                                var fyuseInlineWrapper = document.createElement('div');
                                fyuseInlineWrapper.className = 'fyu_container fyu_horizontal';
                                buttonData.appendChild(fyuseInlineWrapper);
                                FYU.add(fyuseId, fyuseInlineWrapper);

                                document.querySelector('#ff_link').addEventListener('mousedown, touchstart', function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                });
                            }
                        });
                        return;
                    }

                    var spinElement = document.createElement('div');
                    spinElement.id = 'spin';

                    _displayButtonDefault = generateButton(null, buttonData, null, getButtonImagePath, null, 'runFyusePlayer');

                    buttonData.appendChild(_displayButtonDefault);

                    // blank snip holder
                    insertBefore(spinElement, buttonData);
                    buttonData.addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        loadFyuse(fyuseId);
                    });
                }
            })
            .catch(function (reason) {
                console.log('parsing failed', reason);
            });
    };
    // Generate Fyuse elements on the page -- ends

    var isStyleAdded = false;
    var generateDisplayItems = function (videoData, buttonData) {

        var getProfileData = _profilesBag[videoData.client_fk];



        if (!getProfileData) getProfileData = _profilesBag[clientKey];

        if (getParameterByName('ff_test_client')) getProfileData = _profilesBag[clientKeyForTest];

        var isVDP = _buttons_count === 1 || checkIsVDP;

        /* if (isVDP && dataVDP.siteStyle) {
            createStyleTagAndAppend(dataVDP.siteStyle);
        } */

        if (isVDP) {
            if (isMobile() && dataVDP.isMobileSiteStyle) {
                createStyleTagAndAppend(dataVDP.isMobileSiteStyle);
            }

            else if (dataVDP.siteStyle && videoData.popup) {
                createStyleTagAndAppend(dataVDP.siteStyle);
            }
        }

        if (checkIsVLP && !isStyleAdded) {
            if (isMobile() && dataVLP.isMobileSiteStyle) {
                createStyleTagAndAppend(dataVLP.isMobileSiteStyle);
            }

            else if (dataVLP.siteStyle) {
                createStyleTagAndAppend(dataVLP.siteStyle);
            }
        }

        isStyleAdded = true;

        if (getProfileData.vid_call === 1) {
            if (isVDP) {
                var videoCallFromName = videoData.veh_year + ' ' + videoData.veh_make + ' ' + videoData.veh_model + ' ' + videoData.veh_trim;
                videoCallFromName = encodeURIComponent(videoCallFromName);

                if (getProfileData.vid_call_html) {
                    var createVideoWrapper = document.createElement('div');
                    createVideoWrapper.innerHTML = getProfileData.vid_call_html;
                    document.body.appendChild(createVideoWrapper);
                } else {
                    var cardTitle = 'Have Questions?' || 'Have Questions?';
                    var cardDesc =
                        'Video Chat With Us Now And Get Real Answers, No Sales Pitch. No Pressure' ||
                        'Video Chat With Us Now And Get Real Answers, No Sales Pitch. No Pressure';
                    loadFFScript(
                        'generate_video_call_card.js?externalCallEmbed=0&user_html_added=0&cardDesc=' +
                        cardDesc +
                        '&cardTitle=' +
                        cardTitle +
                        '&fromName=' +
                        videoCallFromName +
                        '&roof_key=' +
                        getProfileData.client_fk
                    );
                }
            }
        }

        var disableAutoPlay = buttonData.getAttribute('disable_auto_play') || '';
        var iframeElement,
            isLandingPage = Number(buttonData.getAttribute('ff_lp')) === 1 ? true : getProfileData.lp === 1 ? true : false,
            checkInline = buttonData.getAttribute('ff_inline') || 0;

        if (Number(checkInline) === 1 || (dataVDP && dataVDP.vehicleTestInline && document.querySelector(dataVDP.VDPIndicator))) {
            var sameExistingInlineButton = buttonData;

            if ((videoData.popup && videoData.popup.type === 2) || (videoData.nv && videoData.nv.type === 2))
                window.addEventListener('message', receiveMessage, false);

            var incomingURL = videoData.nv && dataVDP && dataVDP.vehicleTestInline ? videoData.nv.url : videoData.popup.url;

            var iframeURL = incomingURL + (Number(disableAutoPlay) === 1 ? '&disable_auto_play=1' : '') + '&referer=' + _getRefDomain + '&h_p=' + _getRefURL + '&h_p_r=' + _referredFrom + '&h_t=' + _documentTitle;

            addJsonLdToHead(videoData.jsonLD , checkIsVDP, dataVDP.isIndex)
            iframeElement = document.createElement('iframe');
            iframeElement.frameBorder = 0;
            iframeElement.scrolling = 'no';
            iframeElement.setAttribute('allowFullScreen', '');
            iframeElement.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
            iframeElement.src = iframeURL;
            // buttonData.appendChild(iframeElement);

            if (videoData.nv && dataVDP && dataVDP.changePostionAfter)
                document
                    .querySelector(dataVDP.changePostionAfter)
                    .parentNode.insertBefore(iframeElement, document.querySelector(dataVDP.changePostionAfter).nextSibling);
            else buttonData.appendChild(iframeElement);

            if (videoData.nv && dataVDP && dataVDP.vehicleTestInline) iframeElement.id = 'ff_link_iframe_vt';
            else iframeElement.id = 'ff_link_iframe';

            // iframeElement.style.cssText = 'width:1px; min-width:100%;';
            iframeElement.style.width = '1px'
            iframeElement.style.minWidth = '100%';

            // add inline fullscreen overlay
            var inlinePlayerOverlay = document.createElement('div');
            inlinePlayerOverlay.classList.add('flick_overlay_element');
            inlinePlayerOverlay.style.cssText = 'display:none;position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 100; width:100%; height:100%;background-color:rgb(0 0 0 / 66%);z-index:99999';
            buttonData.appendChild(inlinePlayerOverlay);

            let clearTimeInSec = 6;
            let sendEmbedType = setInterval(function () {
                sendEmbedTypeFun(iframeElement);
            }, 1000);

            setTimeout(() => {
                clearInterval(sendEmbedType);
                sendEmbedType = 0;
            }, clearTimeInSec * 1000);

            window.addEventListener('message', function (e) {

                try {
                    var data = JSON.parse(e.data);

                    if (data.action === 'FFusion_open_popup_inline') {
                        toggleFullScreenModeInline();
                    }
                    if (data.type === 'player_4_3') {
                        aspectRatio = 0.75;
                    }
                    if (data.action === 'FFusion_open_popup_inline') {
                        isFullScreen = !isFullScreen;
                        document.body.classList.toggle('fFusion_inline_fullscreen_enable');

                        if (isMobile())
                            document.body.classList.toggle('fFusion_inline_fullscreen_is_mobile');

                        toggleFullScreenModeInline();
                    }
                }
                catch (e) {
                    console.log(e);
                }
            })

            document.addEventListener('click', function (e) {
                if (document.body.classList.contains('fFusion_inline_fullscreen_enable') && document.querySelector('#ff_link iframe') != e.target) {

                    iframeElement.contentWindow.postMessage(JSON.stringify({ action: 'exitFullScreen'}), '*');
                    isFullScreen = !isFullScreen;
                    document.body.classList.toggle('fFusion_inline_fullscreen_enable');

                    if (isMobile())
                        document.body.classList.toggle('fFusion_inline_fullscreen_is_mobile');

                    toggleFullScreenModeInline();

                }
            })


            // fullscreen icon
            /* var create_full_screen_image = document.createElement('img');
            create_full_screen_image.style.cssText = 'position:absolute;right:5px;top:3px;margin-top:0;padding:7px 0;cursor:pointer;width: 25px;';
            buttonData.setAttribute('style', 'position:relative;');
            create_full_screen_image.src = getProfileData.full_scrn_img;
            create_full_screen_image.addEventListener('click', function () {
                openLargePopup(videoData.popup.type);
            });

            if (!(videoData.nv && dataVDP && dataVDP.vehicleTestInline)) buttonData.appendChild(create_full_screen_image);
           */
            if ((videoData.popup && videoData.popup.type === 0) || (videoData.nv && videoData.nv.type === 0 && dataVDP && dataVDP.vehicleTestInline)) {
                buttonData.style.cssText = 'position:relative; padding-bottom:60.2%; padding-top:25px; height:0;';
                iframeElement.style.cssText = 'position:absolute;top:0; left:0; width:100%; height:100%;';
            }

            // resize iframe on mobile

            if (dataVDP && dataVDP.iframeRegenerateOnResize) {
                window.addEventListener('resize', function () {
                    var postionTarget = document.querySelector(dataVDP.target);
                    if (window.innerWidth < 850) {
                        setTimeout(function () {
                            if (!postionTarget.querySelector('#ff_link')) {
                                document.querySelector(dataVDP.target).append(sameExistingInlineButton);
                            }
                        }, 1200);
                    } else {
                        setTimeout(function () {
                            if (!postionTarget.querySelector('#ff_link')) {
                                document.querySelector(dataVDP.target).append(sameExistingInlineButton);
                            }
                        }, 1200);
                    }
                });
            }

            // from siteConfig

            if (checkIsVDP && dataVDP.inlinePlayer) {
                var iframeWraperClass, iframeWraperStyle, iframeClass, iframeStyle, iframeParentStyle, iframeParentClass;

                iframeParentClass = targetDeskOrMobile(dataVDP.mobileIframeParentClass, dataVDP.iframeParentClass);
                iframeParentClass && (buttonData.className = iframeParentClass);

                iframeParentStyle = targetDeskOrMobile(dataVDP.mobileIframeParentStyle, dataVDP.iframeParentStyle);
                iframeParentStyle && (buttonData.style.cssText = iframeParentStyle);

                iframeWraperClass = targetDeskOrMobile(dataVDP.mobileIframeWraperClass, dataVDP.iframeWraperClass);

                iframeWraperClass && (iframeElement.closest(dataVDP.target).className = iframeWraperClass);

                iframeWraperStyle = targetDeskOrMobile(dataVDP.mobileIframeWraperStyle, dataVDP.iframeWraperStyle);
                iframeWraperStyle && (iframeElement.closest(dataVDP.target).style.cssText = iframeWraperStyle);

                iframeClass = targetDeskOrMobile(dataVDP.mobileIframeClass, dataVDP.iframeClass);
                iframeClass && (iframeElement.className = iframeClass);

                iframeStyle = targetDeskOrMobile(dataVDP.mobileIframeStyle, dataVDP.iframeStyle);
                iframeStyle && (iframeElement.style.cssText = 'width:1px; min-width:100%;' + iframeStyle);
            }



            return false;
        }

        function sendEmbedTypeFun(iframeElement) {
            orientationType();
            iframeElement.contentWindow.postMessage(JSON.stringify({ action: 'fFusion_from_inline_iframe', parentHeight: (window.innerHeight)}), '*');
        }

        // open fullscreen popup
        function openLargePopup(modalType) {
            new ConModal({
                width: 960,
                videoPage: modalType,
                modalTitle: 'Video',
                iframeUrl: videoData.popup.url + '&referer=' + _getRefDomain + '&h_p=' + _getRefURL + '&h_p_r=' + _referredFrom + '&h_t=' + _documentTitle
            });
            var ff_iframe = document.getElementById('ff_link_iframe');
            ff_iframe.src = ff_iframe.src + '&disable_auto_play=1';
        }

        if (_custom_script_run !== undefined) {
            if (_custom_script_run.add360SpinSingleTab) {
                _custom_script_run.runAddTab360Spin();
                return false;
            } else if (_custom_script_run.runSiteSpecifigScript) {
                _custom_script_run.script(videoData, buttonData, getProfileData, dataVLP, dataVDP, checkIsVDP, checkIsVLP);
                if (_custom_script_run.stopProcess) { return false; }
            }

            _button_image_path = _custom_script_run.buttonImage;
            _displayButtonThumb = generateButton(videoData, buttonData, _custom_script_run, getButtonImagePath, _button_image_path);
            if (_custom_script_run.appendElement) {
                if (_custom_script_run.replaceAsInlinePlayer) {
                    var makeInlinePlayer = buttonData.cloneNode(true);
                    makeInlinePlayer.setAttribute('ff_inline', 1);
                    _custom_script_run.appendElement(buttonData).innerHTML = makeInlinePlayer.outerHTML;
                }

                if (videoData.thumb && !_custom_script_run.replaceAsInlinePlayer)
                    _custom_script_run.appendElement(buttonData).appendChild(_displayButtonThumb);

                if (_custom_script_run.parentElementCSS)
                    _custom_script_run.appendElement(buttonData).style.cssText = _custom_script_run.parentElementCSS;

                if (_custom_script_run.targetElementSectionForCSS)
                    _custom_script_run.targetElementSectionForCSS(buttonData).style.cssText = _custom_script_run.targetElementSectionCSS;

                if (_custom_script_run.siteCustomCssInclude) {
                    var styleTag = document.createElement('style');
                    styleTag.innerText = _custom_script_run.siteCustomCssInclude;
                    document.head.appendChild(styleTag);
                }
            }
            //else {buttonData.appendChild(buttonData);}

            // thumb play button
            _displayButtonThumb.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                new ConModal({
                    width: videoData.nv ? (videoData.nv.button === 'AF' ? '90%' : 960) : 960,
                    videoPage: videoData.thumb.type,
                    modalTitle: 'Video',
                    iframeUrl: videoData.thumb.url + '&referer=' + _getRefDomain + '&h_p=' + _getRefURL + '&h_p_r=' + _referredFrom + '&h_t=' + _documentTitle
                });
            });
        }

        // show default button
        if (videoData.popup) {
            _displayButtonDefault = generateButton(videoData, buttonData, null, getButtonImagePath, null);
            if (
                (_custom_script_run !== undefined && _custom_script_run.showButton === false) ||
                (checkIsVLP && dataVLP.showButton === false) ||
                (checkIsVDP && dataVDP.showButton === false)
            )
                return false;
            else buttonData.appendChild(_displayButtonDefault);

            defaultSpanishButtonImages = {
                vid360: '//gcbimages.storage.googleapis.com/vidbtn/play_video_bt_spanish.png',
                vid: '//gcbimages.storage.googleapis.com/vidbtn/cc1_sp_grn.png',
                only360: '//gcbimages.storage.googleapis.com/vidbtn/espanol.png'
            };

            if (videoData.popup.spanish_client_fk) {
                var spanis_profile = _profilesBag[videoData.popup.spanish_client_fk];

                if (checkIsVLP || (!checkIsVDP && _buttons_count > 1)) {
                    if (videoData.popup) {
                        if (videoData.popup.model_type === 'vid360') {
                            var vid360Button = (spanis_profile != undefined && spanis_profile.img_srp_360)? spanis_profile.img_srp_360 : defaultSpanishButtonImages.vid360;
                            spanish_button_image_path = vid360Button;
                        }
                        if (videoData.popup.model_type === 'vid') {
                            var OnlyVid = (spanis_profile != undefined && spanis_profile.srp_btn_img) ?  spanis_profile.srp_btn_img : defaultSpanishButtonImages.vid;
                            spanish_button_image_path = OnlyVid;
                        }

                        if (Number(videoData.popup.model_type) === 360) {
                            var only360 = (spanis_profile != undefined && spanis_profile.img_srp_360_only)? spanis_profile.img_srp_360_only : defaultSpanishButtonImages.only360;
                            spanish_button_image_path = only360;
                        }
                    }
                }

                // VDP Image Buttos
                if (checkIsVDP || (!checkIsVLP && _buttons_count === 1)) {
                    if (videoData.popup) {
                        if (videoData.popup.model_type === 'vid360') {
                            var vid360ButtonVdp = (spanis_profile != undefined && spanis_profile.img_vdp_360) ? spanis_profile.img_vdp_360 : defaultSpanishButtonImages.vid360;
                            spanish_button_image_path = vid360ButtonVdp;
                        }
                        if (videoData.popup.model_type === 'vid') {
                            var OnlyVidVDP = (spanis_profile != undefined && spanis_profile.vdp_btn_img)? spanis_profile.vdp_btn_img : defaultSpanishButtonImages.vid;
                            spanish_button_image_path = OnlyVidVDP;
                        }
                        if (Number(videoData.popup.model_type) === 360) {
                            var only360VDP = (spanis_profile != undefined && spanis_profile.img_vdp_360_only)? spanis_profile.img_vdp_360_only : defaultSpanishButtonImages.only360;
                            spanish_button_image_path = only360VDP;
                        }
                    }
                }
            }

            if (videoData.popup.spanish_url) {
                var _display_spanish_btn = document.createElement('img');
                _display_spanish_btn.src = getProfileData.spanish_btn_url || spanish_button_image_path;
                _display_spanish_btn.style.cursor = 'pointer';
                var popupWidthSpanish = isLandingPage ? '90%' : 960;
                var iframeURLSpanish = videoData.popup.spanish_url;
                _display_spanish_btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    new ConModal({
                        width: popupWidthSpanish,
                        videoPage: videoData.popup.type,
                        modalTitle: 'Video',
                        iframeUrl: iframeURLSpanish + '&referer=' + _getRefDomain + (!isLandingPage ? '' : '&full_screen=1') + '&h_p=' + _getRefURL + '&h_p_r=' + _referredFrom + '&h_t=' + _documentTitle,
                        fullscreen: videoData.popup.tab === 1 && !isLandingPage ? true : false
                    });
                });
                buttonData.appendChild(_display_spanish_btn);
            }

            var iframeURL = videoData.popup.url;
            var popupWidth = isLandingPage ? '90%' : 960;
            _displayButtonDefault.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                new ConModal({
                    width: popupWidth,
                    videoPage:videoData.popup.type,
                    modalTitle: 'Video',
                    iframeUrl: iframeURL + '&referer=' + _getRefDomain + (!isLandingPage ? '' : '&full_screen=1') + '&h_p=' + _getRefURL + '&h_p_r=' + _referredFrom + '&h_t=' + _documentTitle,
                    fullscreen: videoData.popup.tab === 1 && !isLandingPage ? true : false
                });

            });
        }

        // show nv button
        if (videoData.nv) {
            if (Number(getProfileData.flow_found) == 1 && videoData.nv.type === 0 && !(dataVLP.ignoreFlowFound || dataVDP.ignoreFlowFound))
                return;
            var vh_af_queryString =
                '&vin=' +
                videoData.veh_vin +
                '&year=' +
                videoData.veh_year +
                '&make=' +
                encodeURIComponent(videoData.veh_make) +
                '&model=' +
                encodeURIComponent(videoData.veh_model) +
                '&trim=' +
                encodeURIComponent(videoData.veh_trim) +
                '&body_type=' +
                encodeURIComponent(videoData.veh_body);

            var _dislpay_nv_button_img = videoData.nv.button === 'VT' ? getProfileData.veh_test_img : getProfileData.af_img;

            if((_buttons_count === 1 || checkIsVDP) && getProfileData.vdp_btn_img_VehFF && ignoreGlobleVTBtn && !(document.querySelector(extVlpIndicator) || document.querySelector(dataVLP.VLPIndicator))){
                _dislpay_nv_button_img = getProfileData.vdp_btn_img_VehFF;
            }

            if(getProfileData.srp_btn_img_VehFF && ignoreGlobleVTBtn && (document.querySelector(extVlpIndicator) || document.querySelector(dataVLP.VLPIndicator))){
                _dislpay_nv_button_img = getProfileData.srp_btn_img_VehFF;
            }


            var nv_ff_button = generateButton(videoData, buttonData, _custom_script_run, getButtonImagePath, _dislpay_nv_button_img, null, true);

            nv_ff_button.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                new ConModal({
                    width: videoData.nv ? (videoData.nv.button === 'AF' ? '90%' : 960) : 960,
                    videoPage: videoData.nv.type,
                    modalTitle: 'Video',
                    iframeUrl: videoData.nv.url + vh_af_queryString + '&referer=' + _getRefDomain + '&h_p=' + _getRefURL + '&h_p_r=' + _referredFrom + '&h_t=' + _documentTitle
                });
            });

            buttonData.appendChild(nv_ff_button);
        }

        buttonData.setAttribute('verified', '');
    };

    window.addEventListener('orientationchange', function () {
        orientationType();
        if (isFullScreen) {
            setTimeout(function () {
                toggleFullScreenModeInline();
            }, 200);
        }
    });

    function orientationType() {
        if (document.querySelector('#ff_link_iframe'))
            sendOrientation('#ff_link_iframe')

        if (document.querySelector('#con-iframe'))
            sendOrientation('#con-iframe')
    }

    function toggleFullScreenModeInline() {

        if (!isMobile())
            return;
        var screenHeight,
            getWidth,
            aspectRatioVal;

        if(aspectRatio == 0.75){
            aspectRatioVal = 4/3;
        }else{
            aspectRatioVal = 16/9;
        }

        if (orientationType() === 'landscape') {
            screenHeight = window.innerHeight;
            getWidth = Math.round(window.innerHeight * aspectRatioVal);

            document.querySelector('#ff_link_iframe').style.cssText = 'width:1px; min-width:' + getWidth + 'px;' + 'height:' + screenHeight + 'px;';
        } else {
            document.querySelector('#ff_link_iframe').style.cssText = '';
        }

        if (!isFullScreen) {
            document.querySelector('#ff_link_iframe').style.width = '1px'
            document.querySelector('#ff_link_iframe').style.minWidth = '100%';
        }

    }

    function sendOrientation(id) {
        switch (window.orientation) {
            case -90: case 90:
                document.querySelector(id).contentWindow.postMessage(JSON.stringify({ action: 'fFusion_from_inline_orientation', value: 'landscape' }), '*');
                return 'landscape'
            default:
                document.querySelector(id).contentWindow.postMessage(JSON.stringify({ action: 'fFusion_from_inline_orientation', value: 'portrait' }), '*');
                return 'potrait'
        }
    }

    // Generate buttons on the page
    var generateButton = function (videoData, buttonData, options, getButtonImagePath, custom_button_image_path, isFyusePlayer, isVT) {
        var createButton = document.createElement('div'),
            currentProfile,
            additionalStylesFromSiteConfig = null;

        if (!isFyusePlayer) currentProfile = _profilesBag[videoData.client_fk];

        if (!currentProfile) currentProfile = _profilesBag[clientKey];

        // Generate profile sample buttons
        if (getParameterByName('ff_test_client')) currentProfile = _profilesBag[clientKeyForTest];

        if (checkIsVDP && dataVDP.fixedButtonText) currentProfile.btn_text = 1;

        if (videoData) addJsonLdToHead(videoData.jsonLD , checkIsVDP, dataVDP.isIndex)

        if ((Number(currentProfile.btn_text) == 1 && !isVT) || (isVT && (videoData.nv && Number(currentProfile.btn_text_VehFF) == 1))) {
            _buttonsCount++;
            if (_buttonsCount === 1) createStyleTagAndAppend('#ff_link a:hover{opacity:0.9}');

            if (dataVLP && checkIsVLP) {
                var additionalStylesFromSiteConfig = {
                    buttonClass: targetDeskOrMobile(dataVLP.mobileButtonClass, dataVLP.buttonClass),
                    buttonStyle: targetDeskOrMobile(dataVLP.mobileButtonStyle, dataVLP.buttonStyle),

                    buttonParentClass: targetDeskOrMobile(dataVLP.mobileButtonParentClass, dataVLP.buttonParentClass),
                    buttonParentStyle: targetDeskOrMobile(dataVLP.mobileButtonParentStyle, dataVLP.buttonParentStyle),

                    buttonWrapperClass: targetDeskOrMobile(dataVLP.mobileButtonWrapperClass, dataVLP.buttonWrapperClass),
                    buttonWrapperStyle: targetDeskOrMobile(dataVLP.mobileButtonWrapperStyle, dataVLP.buttonWrapperStyle)
                };
            }

            if (dataVDP && checkIsVDP && !dataVDP.inlinePlayer) {
                var additionalStylesFromSiteConfig = {
                    buttonClass: targetDeskOrMobile(dataVDP.mobileButtonClass, dataVDP.buttonClass),
                    buttonStyle: targetDeskOrMobile(dataVDP.mobileButtonStyle, dataVDP.buttonStyle),

                    buttonParentClass: targetDeskOrMobile(dataVDP.mobileButtonParentClass, dataVDP.buttonParentClass),
                    buttonParentStyle: targetDeskOrMobile(dataVDP.mobileButtonParentStyle, dataVDP.buttonParentStyle),

                    buttonWrapperClass: targetDeskOrMobile(dataVDP.mobileButtonWrapperClass, dataVDP.buttonWrapperClass),
                    buttonWrapperStyle: targetDeskOrMobile(dataVDP.mobileButtonWrapperStyle, dataVDP.buttonWrapperStyle)
                };
            }

            createButton = getDesignedButton(videoData, buttonData, additionalStylesFromSiteConfig, currentProfile, isFyusePlayer, isVT);
            if (isFyusePlayer) return createButton;
        } else {
            createButton = document.createElement('img');
            createButton.style.cursor = 'pointer';
            createButton.src = getButtonImagePath(videoData, buttonData, custom_button_image_path, currentProfile, isFyusePlayer);
        }

        if (videoData && videoData.popup && videoData.popup.alt) {
            createButton.setAttribute('alt', videoData.popup.alt);
            createButton.setAttribute('title', videoData.popup.alt);
        }

        if (options) {
            if (options.buttonText) {
                createButton = document.createElement('span');
                createButton.innerText = options.buttonText;
            }

            if (options.buttonCSS) {
                createButton.style.cssText = options.buttonCSS;
                createButton.style.cursor = 'pointer';
            }
        }

        // if (videoData && videoData.popup && videoData.popup.model_type == '') {
        //     createButton = document.createElement('div');
        // }

        if (checkIsVDP && Number(clientData.data[0].flow_found) && document.querySelector("#ff_link") && (window.getComputedStyle(document.querySelector("#ff_link")).getPropertyValue("display") != "none")) {
            var cssFFStyle = ".ff-vr-video-button{display:none;}";
            createStyleTagAndAppend(cssFFStyle);
        }

        return createButton;
    };

    // Text based buttons
    function getDesignedButton(videoData, buttonData, additionalStyle, currentProfile, isFyusePlayer, isVT) {
        _buttons_count = document.querySelectorAll('#ff_link').length;

        // SRP Text Buttons
        if (_buttons_count > 1 || checkIsVLP) {

            if (videoData.nv && isVT) {
                return createButtonWithCss(
                    currentProfile.srp_btn_text_VehFF,
                    currentProfile.srp_btn_fontsize_VehFF,
                    currentProfile.srp_btn_textcolor_VehFF,
                    currentProfile.srp_btn_bgcolor_VehFF,
                    additionalStyle,
                    buttonData
                );
            }

            else if (isFyusePlayer) {
                return createButtonWithCss(
                    currentProfile.srp_btn_text_360_only,
                    currentProfile.srp_btn_fontsize_360_only,
                    currentProfile.srp_btn_textcolor_360_only,
                    currentProfile.srp_btn_bgcolor_360_only,
                    additionalStyle,
                    buttonData,
                    isFyusePlayer
                );
            }

            else if (videoData.popup) {
                if (Number(videoData.popup.model_type) === 360) {
                    return createButtonWithCss(
                        currentProfile.srp_btn_text_360_only,
                        currentProfile.srp_btn_fontsize_360_only,
                        currentProfile.srp_btn_textcolor_360_only,
                        currentProfile.srp_btn_bgcolor_360_only,
                        additionalStyle,
                        buttonData
                    );
                }

                else if (videoData.popup.model_type === 'vid360') {
                    return createButtonWithCss(
                        currentProfile.srp_btn_text_vid360,
                        currentProfile.srp_btn_fontsize_vid360,
                        currentProfile.srp_btn_textcolor_vid360,
                        currentProfile.srp_btn_bgcolor_vid360,
                        additionalStyle,
                        buttonData
                    );
                }
                else if (videoData.popup.model_type === 'vid') {
                    return createButtonWithCss(
                        currentProfile.srp_btn_text_vid_only,
                        currentProfile.srp_btn_fontsize_vid_only,
                        currentProfile.srp_btn_textcolor_vid_only,
                        currentProfile.srp_btn_bgcolor_vid_only,
                        additionalStyle,
                        buttonData
                    );
                }
            }
        }

        // VDP Text Buttons
        if (_buttons_count === 1 || checkIsVDP) {

            if (videoData.nv && isVT) {
                return createButtonWithCss(
                    currentProfile.vdp_btn_text_VehFF,
                    currentProfile.vdp_btn_fontsize_VehFF,
                    currentProfile.vdp_btn_textcolor_VehFF,
                    currentProfile.vdp_btn_bgcolor_VehFF,
                    additionalStyle,
                    buttonData
                );
            }

            else if (isFyusePlayer) {
                return createButtonWithCss(
                    currentProfile.vdp_btn_text_360_only,
                    currentProfile.vdp_btn_fontsize_360_only,
                    currentProfile.vdp_btn_textcolor_360_only,
                    currentProfile.vdp_btn_bgcolor_360_only,
                    additionalStyle,
                    buttonData
                );
            }

            else if (videoData.popup) {
                if (videoData.popup.model_type === 'vid360') {
                    return createButtonWithCss(
                        currentProfile.vdp_btn_text_vid360,
                        currentProfile.vdp_btn_fontsize_vid360,
                        currentProfile.vdp_btn_textcolor_vid360,
                        currentProfile.vdp_btn_bgcolor_vid360,
                        additionalStyle,
                        buttonData
                    );
                }
                else if (videoData.popup.model_type === 'vid') {
                    return createButtonWithCss(
                        currentProfile.vdp_btn_text_vid_only,
                        currentProfile.vdp_btn_fontsize_vid_only,
                        currentProfile.vdp_btn_textcolor_vid_only,
                        currentProfile.vdp_btn_bgcolor_vid_only,
                        additionalStyle,
                        buttonData
                    );
                }

                else if (Number(videoData.popup.model_type) === 360) {
                    return createButtonWithCss(
                        currentProfile.vdp_btn_text_360_only,
                        currentProfile.vdp_btn_fontsize_360_only,
                        currentProfile.vdp_btn_textcolor_360_only,
                        currentProfile.vdp_btn_bgcolor_360_only,
                        additionalStyle,
                        buttonData
                    );
                }
            }
        }
    }

    // Image based buttons
    function createButtonWithCss(buttonText, fontSize, fontColor, backgroundColor, additionalStyle, buttonData) {
        var buttonDesign = document.createElement('a');
        var defaultStyles = 'display:inline-block !important; padding:5px; cursor:pointer;text-decoration:none;text-align:center;';
        buttonDesign.href = '#';
        buttonDesign.style.cssText = defaultStyles;

        if (additionalStyle) {
            if (additionalStyle.buttonStyle) {
                buttonDesign.style.cssText = defaultStyles + additionalStyle.buttonStyle;
            }

            if (additionalStyle.buttonClass) {
                var makeClassName = additionalStyle.buttonClass.split(' ').toString().replace(/\,/g, ' ');
                buttonDesign.className = makeClassName;
            }

            // parent target

            if (additionalStyle.buttonParentClass) {
                var parentClassName = additionalStyle.buttonParentClass.split(' ').toString().replace(/\,/g, ' ');
                buttonData.className = parentClassName;
            }

            if (additionalStyle.buttonParentStyle) {
                buttonData.style.cssText = additionalStyle.buttonParentStyle;
            }

            if (additionalStyle.buttonWrapperClass && buttonData.closest(dataVLP.container)) {
                var buttonWrapperClass = additionalStyle.buttonWrapperClass.split(' ').toString().replace(/\,/g, ' ');
                buttonData.closest(dataVLP.container).className = buttonWrapperClass;
            }

            if (additionalStyle.buttonWrapperStyle && buttonData.closest(dataVLP.container)) {
                buttonData.style.cssText = additionalStyle.buttonWrapperStyle;
                buttonData.closest(dataVLP.container).style.cssText = additionalStyle.buttonWrapperStyle;
            }
        }

        if (checkIsVDP && dataVDP.fixedButtonText) buttonText = dataVDP.fixedButtonText;

        buttonDesign.innerHTML = buttonText || 'Watch Vidoe';
        // buttonDesign.innerHTML = '<span>' + buttonText + '</span>' || '<span> Watch Video</span>';

        if (checkIsVLP && dataVLP.prependIconElement) {
            buttonDesign.innerHTML = dataVLP.prependIconElement + '<span> &nbsp;' + buttonText + '</span>';
        }

        if (checkIsVDP && dataVDP.prependIconElement) {
            buttonDesign.innerHTML = dataVDP.prependIconElement + '<span> &nbsp;' + buttonText + '</span>';
        }

        if ((checkIsVLP && dataVLP.disableDefaultButtonStyles) || (checkIsVDP && dataVDP.disableDefaultButtonStyles)) return buttonDesign;

        buttonDesign.style.fontSize = fontSize + 'px' || '16px';
        buttonDesign.style.color = fontColor || '#fff';

        buttonDesign.style.backgroundColor = backgroundColor;

        if (additionalStyle && additionalStyle.buttonStyle && additionalStyle.buttonStyle.indexOf('background-color') > -1)
            buttonDesign.style.backgroundColor = additionalStyle.buttonStyle.match(/background-color:\s*([^;}]*)/)[1];

        return buttonDesign;
    }

    // Generate Image path
    function getButtonImagePath(videoData, buttonData, custom_button_image_path, currentProfile, isFyusePlayer) {
        _buttons_count = document.querySelectorAll('#ff_link').length;

        _button_image_path = buttonData.getAttribute('ff_img') || currentProfile.vid_button;

        var defaultButtonImages = {
            vid360: 'https://media.flickfusion.net/videos/global/images/play_video_360.png',
            vid: 'https://media.flickfusion.net/videos/global/images/ff_play.png',
            only360: 'https://media.flickfusion.net/videos/global/images/360_spin.png'
        };

        if (checkCDK == '1') defaultButtonImages.vid = 'https://media.flickfusion.net/videos/global/images/video_btn_red.png';

        if (isFyusePlayer) {
            if (_buttons_count > 1 || checkIsVLP) {
                var only360 = currentProfile.img_srp_360_only == '' ? defaultButtonImages.only360 : currentProfile.img_srp_360_only;
                _button_image_path = buttonData.getAttribute('ff_img') || only360;
            }
            if (_buttons_count === 1 || checkIsVDP) {
                var only360VDP = currentProfile.img_vdp_360_only == '' ? defaultButtonImages.only360 : currentProfile.img_vdp_360_only;
                _button_image_path = only360VDP;
            }

            return _button_image_path;
        }

        if (custom_button_image_path) {
            return (_button_image_path = custom_button_image_path);
        }

        if (checkIsVLP || (!checkIsVDP && _buttons_count > 1)) {
            if (videoData.popup) {
                if (videoData.popup.model_type === 'vid360') {
                    var vid360Button = currentProfile.img_srp_360 == '' ? defaultButtonImages.vid360 : currentProfile.img_srp_360;
                    _button_image_path = buttonData.getAttribute('ff_img') || vid360Button;
                }
                if (videoData.popup.model_type === 'vid') {
                    var OnlyVid = currentProfile.srp_btn_img == '' ? defaultButtonImages.vid : currentProfile.srp_btn_img;
                    _button_image_path = buttonData.getAttribute('ff_img') || OnlyVid;
                }

                if (Number(videoData.popup.model_type) === 360) {
                    var only360 = currentProfile.img_srp_360_only == '' ? defaultButtonImages.only360 : currentProfile.img_srp_360_only;
                    _button_image_path = buttonData.getAttribute('ff_img') || only360;
                }
            }
        }

        // VDP Image Buttos
        if (checkIsVDP || (!checkIsVLP && _buttons_count === 1)) {
            if (videoData.popup) {
                if (videoData.popup.model_type === 'vid360') {
                    var vid360ButtonVdp = currentProfile.img_vdp_360 == '' ? defaultButtonImages.vid360 : currentProfile.img_vdp_360;
                    _button_image_path = buttonData.getAttribute('ff_img') || vid360ButtonVdp;
                }
                if (videoData.popup.model_type === 'vid') {
                    var OnlyVidVDP = currentProfile.vdp_btn_img == '' ? defaultButtonImages.vid : currentProfile.vdp_btn_img;
                    _button_image_path = buttonData.getAttribute('ff_img') || OnlyVidVDP;
                }
                if (Number(videoData.popup.model_type) === 360) {
                    var only360VDP = currentProfile.img_vdp_360_only == '' ? defaultButtonImages.only360 : currentProfile.img_vdp_360_only;
                    _button_image_path = buttonData.getAttribute('ff_img') || only360VDP;
                }
            }
        }

        if (currentProfile.exclusive_btn) {
            _button_image_path = currentProfile.exclusive_btn;
        }

        if ((checkIsVLP && dataVLP.thumnailPlayIcon) || (checkIsVDP && dataVDP.thumnailPlayIcon)) _button_image_path = currentProfile.thumb_paly_img;

        //if (checkIsVDP && checkCDK == '1' && videoData.popup && Number(videoData.popup.lv) === 1) _button_image_path = currentProfile.live_vid_img;

        if (_button_image_path != '') {
            if (!_button_image_path.match(/\.(jpg|jpeg|png|gif)$/)) {
                _button_image_path = currentProfile.vid_button;
                console.log('Not Image');
            }
        }

        return _button_image_path;
    }

    function isHidden(el) {
        if (el instanceof Element) {
            var style = window.getComputedStyle(el);
            if (style.display === 'none') return true;

            return el.offsetParent === null;
        }
        return false;
    }

    function isMobile() {
        if (
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)
        )
            return true;

        return false;
    }

    var checkIsMobile = isMobile();

    function targetDeskOrMobile(mobile, desktop) {
        return checkIsMobile ? mobile : desktop;
    }

    // Video JSON LD for seo meta -- ends

    var defaultOptions = {
        timeout: 25000,
        jsonpCallback: 'jsoncallback',
        jsonpCallbackFunction: null
    };

    function generateCallbackFunction() {
        return 'jsonp_' + new Date().getTime() + '_' + Math.ceil(Math.random() * 100000);
    }

    function clearFunction(functionName) {
        try {
            delete window[functionName];
        } catch (e) {
            window[functionName] = undefined;
        }
    }

    function removeScript(scriptId) {
        var script = document.getElementById(scriptId);
        if (script) {
            document.getElementsByTagName('head')[0].removeChild(script);
        }
    }

    function fetchJsonp(_url) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // to avoid param reassign
        var url = _url;

        var timeout = options.timeout || defaultOptions.timeout;
        var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

        var timeoutId = undefined;

        return new Promise(function (resolve, reject) {
            var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
            var scriptId = jsonpCallback + '_' + callbackFunction;

            window[callbackFunction] = function (response) {
                resolve({
                    ok: true,
                    // keep consistent with fetch API
                    json: function json() {
                        return Promise.resolve(response);
                    }
                });

                if (timeoutId) clearTimeout(timeoutId);

                removeScript(scriptId);

                clearFunction(callbackFunction);
            };

            // Check if the user set their own params, and if not add a ? to start a list of params
            url += url.indexOf('?') === -1 ? '?' : '&';

            var jsonpScript = document.createElement('script');
            jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
            if (options.charset) {
                jsonpScript.setAttribute('charset', options.charset);
            }
            jsonpScript.id = scriptId;
            document.getElementsByTagName('head')[0].appendChild(jsonpScript);

            timeoutId = setTimeout(function () {
                reject(new Error('JSONP request to ' + _url + ' timed out'));

                clearFunction(callbackFunction);
                removeScript(scriptId);
                window[callbackFunction] = function () {
                    clearFunction(callbackFunction);
                };
            }, timeout);

            // Caught if got 404/500
            jsonpScript.onerror = function () {
                reject(new Error('JSONP request to ' + _url + ' failed'));

                clearFunction(callbackFunction);
                removeScript(scriptId);
                if (timeoutId) clearTimeout(timeoutId);
            };
        });
    }

    // loadFFScript('https://storage.googleapis.com/gcbimages/s/popup.js', function () {});

    // window.onload = function () {

    //     var VLPIndicator = siteConfig.VLP ? siteConfig.VLP.VLPIndicator : null;
    //     var VDPIndicator = siteConfig.VDP ? siteConfig.VDP.VDPIndicator : null;

    //     if (!isVinHit) {
    //         var noVehicleData = {
    //             client_key: clientKey,
    //             snippetsAppend: false,
    //             isVLP: VLPIndicator ? document.querySelector(siteConfig.VLP.VLPIndicator) != null : false,
    //             isVDP: VDPIndicator ? document.querySelector(siteConfig.VDP.VDPIndicator) != null : false,
    //             site_info: {
    //                 url: window.location.hostname,
    //                 full_url: window.location.href,
    //                 referer: document.referrer,
    //                 insident_time: Date.now()
    //             }
    //         };
    //         postData(noVehicleData, 'verify_vin').then((resp) => { });
    //     }
    // }

    async function postData(payload, type) {
        return;//commented to stop posting to FF
        const result = await fetch(_pageStatsServiceURL + type, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        return result.json();
    }

    function enableDirectModalShow(videoData) {

        if (!(videoData.nv || videoData.popup))
            return;

        var popupURL = videoData.nv ? videoData.nv.url : videoData.popup.url;

        var playerObject,
            playerURL,
            validParams = ['enable_auto_play', 'auto_resize', 'disable_auto_play'];

        playerObject = generatePlayerURL(getParameterByName('content_type'));
        playerURL = playerObject.url + getParameterByName('ff_video_key');

        validParams.map(param => {
            if (getParameterByName(param))
                playerURL += '&' + param.toString() + '=' + getParameterByName(param)
        });

        new ConModal({
            width: playerObject.width,
            videoPage: playerObject.type,
            modalTitle: 'Video',
            iframeUrl: popupURL + '&referer=' + _getRefDomain + '&h_p=' + _getRefURL + '&h_p_r=' + _referredFrom + '&h_t=' + _documentTitle
        });

        function generatePlayerURL(type) {
            switch (type) {
                case 'tabbed':
                    return {
                        url: '//media.flickfusion.net/p/pt.php?video_fkey=',
                        type: 2,
                        width: 960
                    };
                    break;

                case 'lp':
                    return {
                        url: '//media.flickfusion.net/NLP/?video_fkey=',
                        type: 1,
                        width: '100%'
                    };
                    break;

                case 'video':
                    return {
                        url: '//media.flickfusion.net/p/v.php?auto_resize=1&video_fkey=',
                        type: 0,
                        width: '960'
                    };
                    break;

                default:
                    return {
                        url: '//media.flickfusion.net/p/v.php?auto_resize=1&video_fkey=',
                        type: 0,
                        width: '960'
                    };
                    break;
            }
        }
    }


    createStyleTagAndAppend('.fFusion_inline_fullscreen_enable .flick_overlay_element { display:block !important; }.fFusion_inline_fullscreen_enable { overflow: hidden;} #ff_link_iframe{ width: 1px; min-width: 100%; } .fFusion_inline_fullscreen_enable:not(.fFusion_inline_fullscreen_is_mobile):not(.ff_fullscreen_enabled) #ff_link[ff_inline="1"] iframe{ display: flex;z-index:9999999; align-items: center; justify-content: center; overflow: none; position: fixed !important; top: 50% !important; left: 50% !important; width: 100%; max-width: 960px; width: 100% !important; /*max-width: 50% !important;*/ min-width: unset !important; -moz-transform: translateX(-50%)  translateY(-50%); -webkit-transform: translateX(-50%) translateY(-50%); transform: translateX(-50%) translateY(-50%); } .fFusion_inline_fullscreen_is_mobile.fFusion_inline_fullscreen_is_mobile:not(.ff_fullscreen_enabled) #ff_link[ff_inline="1"] iframe{ position: fixed !important; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -50%); left: 50%; top: 50%; width: unset ; min-width: 100%; overflow: auto; z-index:999999 }');

    ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach(
        eventType => document.addEventListener(eventType, onFullscreenToggle, false)
    );

    function onFullscreenToggle() {
        document.body.classList.toggle('ff_fullscreen_enabled');

        if (document.body.classList.contains('fFusion_inline_fullscreen_enable') && document.body.classList.contains('fFusion_inline_fullscreen_is_mobile')) {
            if (orientationType() === 'landscape') {

                setTimeout(function () {
                    toggleFullScreenModeInline();
                }, 1200);
            }
        }
    }

    /* All Utility Methods used in the app */

    // remove all existing button elements
    function removeFFSnippetsAddedOnPage(dataVLP) {
        if (dataVLP.removeExistingButtons && document.querySelector('#ff_link')) {
            var existingFlickButton = document.querySelectorAll('#ff_link');
            for (var i = 0; i < existingFlickButton.length; i++) {
                existingFlickButton[i].remove();
            }
        }
    }

    function getStatusFromConfig(siteConfig, target) {
        if (siteConfig && siteConfig[target] && document.querySelector(siteConfig[target])) return true;
        return false;
    }
    // Generate and Add Json Ld to header
    function addJsonLdToHead(data, pageType, isIndex) {
        var uploadDate = data.uploadDate ? data.uploadDate : new Date().toISOString().split('T')[0];
        var jsonLdData = {
            '@context': 'https://schema.org/',
            '@type': 'VideoObject',
            name: data.name,
            description: data.description,
            duration: CalcJsonLdDuration(data.duration),
            contentUrl: (pageType && isIndex) ? data.contentUrl + ".mp4" : data.contentUrl,
            thumbnailUrl: data.thumbnailUrl,
            uploadDate: uploadDate
        };

        var head = document.getElementsByTagName('head')[0];
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.innerHTML = JSON.stringify(jsonLdData);
        head.appendChild(scriptTag);
    }

    function CalcJsonLdDuration(durationInSeconds) {
        durationInSeconds = Math.round(durationInSeconds / 60);
        var days = Math.floor(durationInSeconds / 1440);
        durationInSeconds = durationInSeconds - days * 1440;
        var hours = Math.floor(durationInSeconds / 60);
        durationInSeconds = durationInSeconds - hours * 60;

        var dur = 'PT';
        if (days > 0) {
            dur += days + 'D';
        }
        if (hours > 0) {
            dur += hours + 'H';
        }
        dur += durationInSeconds + 'M';

        return dur;
    }

    // Video JsonLd duration convertor ends.

    // Add height received from child iframe on inline embeds starts

    function receiveMessage(event) {
        if (event !== null && typeof event === 'object') {
            if (
                event.origin.indexOf('media.flickfusion.net') > -1 &&
                document.getElementById('ff_link_iframe')
            ) {

                let data = JSON.parse(event.data);

                if(document.body.classList.contains('fFusion_inline_fullscreen_enable') && !isMobile()){
                    // let data = JSON.parse(event.data);
                    var getWidth, aspectRatioVal = data.aspectRatio;
                    var aspectHeight = window.innerHeight ;

                    if (window.innerHeight > window.innerWidth) {
                        aspectHeight = window.innerWidth;
                    }

                    aspectHeight = aspectHeight - 30;
                    aspectHeight = aspectHeight - (aspectHeight * 4) / 100;
                    getWidth = Math.round(aspectHeight * aspectRatioVal);
                    if(getWidth < 1200)
                        document.querySelector('.fFusion_inline_fullscreen_enable #ff_link[ff_inline="1"] iframe').style.maxWidth = getWidth + 'px';
                }


                if(data.body_height)
                    document.getElementById('ff_link_iframe').style.height = data.body_height + 'px';


            }

            if (event.origin.indexOf('media.flickfusion.net') > -1 && JSON.parse(event.data).action == 'veh_test') {
                document.getElementById('ff_link_iframe_vt').style.height = JSON.parse(event.data).body_height_vt + 'px';
            }
        }
    }// Add height received from child iframe on inline embeds ends

    // Filter polyfill
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (func, thisArg) {
            'use strict';
            if (!((typeof func === 'Function' || typeof func === 'function') && this)) throw new TypeError();

            var len = this.length >>> 0,
                res = new Array(len), // preallocate array
                t = this,
                c = 0,
                i = -1;
            if (thisArg === undefined) {
                while (++i !== len) {
                    // checks to see if the key was set
                    if (i in this) {
                        if (func(t[i], i, t)) {
                            res[c++] = t[i];
                        }
                    }
                }
            } else {
                while (++i !== len) {
                    // checks to see if the key was set
                    if (i in this) {
                        if (func.call(thisArg, t[i], i, t)) {
                            res[c++] = t[i];
                        }
                    }
                }
            }

            res.length = c; // shrink down array to proper size
            return res;
        };
    }// Get Json data -- ends

    // Get Closest Element Polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            var el = this;

            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

    // Foreach polyfill
    if ('NodeList' in window && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function isElementHidden(el) {
        return el.offsetParent === null;
    }

    function insertBefore(newNode, referenceNode) {
        return referenceNode.parentNode.insertBefore(newNode, referenceNode);
    }

    function loadFyuse(fyuseId) {
        function loadFyuseAPI(callback) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://fyu.se/embed?v=3.0';
            script.onreadystatechange = callback;
            script.onload = callback;
            document.head.appendChild(script);
        }

        function loadFyuse() {
            function handler() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        var spin = FYU.add(fyuseId, 'spin', {
                            aspect: {
                                mode: 0
                            },
                            preload: 1,
                            nologo: 1,
                            logo: 0,
                            zoom: 1,
                            zoomBtns: 1,
                            thumb_index: 0,
                            fullscreen: 0,
                            nooverlay: 0,
                            inlineBtn: 1,
                            motion: 0
                        });
                        spin.tags();
                        spin.fullscreen();
                    }
                }
            }
            var xhr = new XMLHttpRequest(),
                method = 'GET',
                url = FYU.protocol + '//' + FYU.host + '/embed/' + fyuseId;
            xhr.onreadystatechange = handler;
            xhr.open(method, url, true);
            xhr.send();
        }
        if (typeof fyuseId !== 'undefined') {
            loadFyuseAPI(loadFyuse);
        }
    }

    function loadFFScript(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        var done = false;
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true;
                if (callback) callback();
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
            }
        };
        head.appendChild(script);
    }

    if (document.referrer) {
        _getRefDomain = document.referrer;
        _getRefDomain = _getRefDomain.match(/:\/\/(.[^/]+)/)[1];
        if (_getRefDomain == 'resources.flickfusion.net') _getRefDomain = '';
    }

    if (document.querySelector('.hproduct .media .video')) {
        var existingButtons = document.querySelectorAll('.hproduct .media .video');
        [].forEach.call(existingButtons, function (button) {
            button.style.display = 'none';
        });
    }

    function createStyleTagAndAppend(cssStyles) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var searchStrStyle = document.getElementsByTagName('head')[0].innerHTML;
        var style = document.createElement('style');
        style.innerText = cssStyles;
        if (searchStrStyle.search(cssStyles) == -1) {
            head.appendChild(style);
        }
    }

    (function (history) {
        var pushState = history.pushState;
        history.pushState = function (state) {
            if (typeof history.onpushstate == 'function') {
                history.onpushstate({
                    state: state
                });
            }
            _filterUnique = {};

            return pushState.apply(history, arguments);
        };
    })(window.history);

    window.addEventListener('popstate', function (e) {
        _filterUnique = {};
    });

    function runDDCFallBack() {
        if (isDDCFallBackRolled)
            return;

        try {
            var API = new window.DDC.API('flickfusion');
            var VDPButtonInsertPosition = 'vehicle-media';
            var SRPButtonInsertPosition = 'vehicle-media';

            API.subscribe('page-load-v1', function (ev) {

                var pageInfo = {
                    isDetailsPage: ev.payload.detailPage,
                    isMobileLayout: ev.payload.layoutType === 'mobile' ? true : false,
                    pageName: ev.payload.pageName,
                    themekit: ev.payload.design.themekit
                };

                processButtons(clientKey);

                function processButtons(client_key) {

                    var insertPosition = pageInfo.isDetailsPage ? VDPButtonInsertPosition : SRPButtonInsertPosition;
                    var vinNumber, year, make, model, trim, bodyStyle;

                    API.insert(insertPosition, function (ele, meta) {

                        var flickButton = document.createElement('div');
                        flickButton.id = 'ff_link';

                        vinNumber = meta.vin || '';
                        year = meta.year || '';
                        make = meta.make || '';
                        model = meta.model || '';
                        trim = meta.trim || '';
                        bodyStyle = meta.bodyStyle || '';

                        flickButton.setAttribute('ff_client', client_key);
                        flickButton.setAttribute('ff_vin', vinNumber);
                        flickButton.setAttribute('ff_year', year);
                        flickButton.setAttribute('ff_make', make);
                        flickButton.setAttribute('ff_model', model);
                        flickButton.setAttribute('ff_trim', trim);
                        flickButton.setAttribute('ff_body', bodyStyle);

                        // if (isVDP) flickButton.setAttribute('ff_inline', 1);
                        checkVehicleData(flickButton);
                        return API.append(ele, flickButton);
                    });
                }
            });
        }
        catch (e) { }
        isDDCFallBackRolled = true;
    }

};

if (window._flickFusionScritpLoaded_Tag === undefined) {
    if (!(typeof Promise !== 'undefined' && Promise.toString().indexOf('[native code]') !== -1)) {
        loadFFScript('//media.flickfusion.net/videos/global/es6-promise.polyfill.js', function () {
            FlickFusionExecutor();
        });
    } else {
        FlickFusionExecutor();
    }

    function createStyleTagAndAppend(cssStyles) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.innerText = cssStyles;
        head.appendChild(style);
    }

    function loadFFScript(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        var done = false;
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true;
                callback();
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
            }
        };
        head.appendChild(script);
    }

    if(window.checkClientData)
        window._flickFusionScritpLoaded_Tag = true;
}