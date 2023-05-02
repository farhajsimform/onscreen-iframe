var single_url =
    "https://idostream.com/member/production/single/LESA_Video.php";

single_url = "https://player.lesautomotive.com/?mode=srp&ref=" + encodeURIComponent(btoa(window.location.href));
var single_url_feature = "https://player.lesautomotive.com/feature?mode=srp&ref=" + encodeURIComponent(btoa(window.location.href)) + "&dealer=" + encodeURIComponent(btoa(window.location.origin));
var feature_link = "https://player.lesautomotive.com/check-features/";
feature_link = "https://player.lesautomotive.com/check-features-new?dealer=" + encodeURIComponent(btoa(window.location.origin));

var feature_all_link =
    "//www.idostream.com/member/video_fetch_opt_all_feature.php";

var clientId = '';

function WriteScript(scriptUrl) {

    var oHead = document.getElementsByTagName('HEAD').item(0);

    var oScript = document.createElement("script");

    oScript.type = "text/javascript";

    oScript.src = scriptUrl;

    oHead.appendChild(oScript);
}

function openvideo(link, hei, wid) {

    console.log('opening new popup');
    console.log('send client id:', clientId);
    var data = clientId;

    childWindow = window.open(link, 'lesavideo', 'fullscreen=no,resizeable=yes,scrollbars=no,status=no,toolbar=no,height=' + hei + ',width=' + wid + '');

    return void(0);
}

function cstmGetElementsByClassName(class_name) {

    var docList = this.all || this.getElementsByTagName('*');

    var matchArray = new Array();

    /*Create a regular expression object for class*/

    var re1 = new RegExp("(?:^|\\s)" + class_name + "(?:\\s|$)");

    for (var i = 0; i < docList.length; i++) {

        if (re1.test(docList[i].className)) {
            matchArray[matchArray.length] = docList[i];
        }
    }
    return matchArray;
} //eof cstmGetElementsByClassName

function LoadCSSStyles() {

    $_LESA("<link/>", {

        rel: "stylesheet",

        type: "text/css",

        href: "//idostream.com//member/shadowbox/shadowbox.css"

    }).appendTo("head");
}

function loadFeatureVideos(vins_arr, vins_full_motion) {
    let difference = vins_arr.filter(x => !vins_full_motion.includes(x));
    let d_name = btoa(window.location.origin);
    let url = feature_all_link + "?vin=" + difference.join("-") +
        "&dealer=" + d_name +
        "&jsoncallback=?";

    jQuery_1_4_2.getJSON(url, function (result) {
        if (result === null || result.length === null) {
            var result_length = 0;
        } else {
            var result_length = result.length;
        }

        if (result_length > 0) {

            if (
                jQuery_1_4_2.parseJSON(result[0]).fancybox_enable.toLowerCase() ===
                "y"
            ) {
                AddFancyBox();
            } else {
                AddShadowBox();
            }
            var google_analytics_id = jQuery_1_4_2.parseJSON(result[0]).google_analytics_id;
            //<!-- Google Analytics -->

            (function (i, s, o, g, r, a, m) {
                i["GoogleAnalyticsObject"] = r;
                (i[r] =
                    i[r] ||
                    function () {
                        (i[r].q = i[r].q || []).push(arguments);
                    }),
                (i[r].l = 1 * new Date());
                (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m);
            })(
                window,
                document,
                "script",
                "//www.google-analytics.com/analytics.js",
                "ga"
            );

            ga("create", google_analytics_id, "auto"); // Replace with your property ID.
            ga("require", "linker");

            ga(function (tracker) {
                // Gets the client ID of the default tracker.
                clientId = tracker.get("clientId");
                console.log("showing LESA tracking id");
                console.log(clientId);
            });
        }

        for (var i = 0; i < result_length; i++) {
            var data = jQuery_1_4_2.parseJSON(result[i]);

            if (data.has_feature_video) {
                if (data.show_form === "Y" || window.mobilecheck()) {
                    let d_name = btoa(window.location.origin);
                    var url2 =
                        single_url_feature +
                        "&id=" +
                        data.dealer_id +
                        "&dealer=" + d_name +
                        "&vin=" +
                        data.vin + "&show_playlist=1" + "&ClientID=" +
                        clientId;
                } else {
                    var url2 = single_url_feature + "&posting_id=" + data.posting_id + "&show_playlist=1" + "&ClientID=" +
                        clientId;
                }
                var sSelector = '[les_vin="' + data.vin.toUpperCase() + '"]';
                var video_div = jQuery_1_4_2(sSelector);
                if (video_div.length === 0) {
                    sSelector = '[data-les_vin="' + data.vin.toUpperCase() + '"]';
                    video_div = jQuery_1_4_2(sSelector);
                }

                let imageUrl = data.button_feature_srp ? data.button_feature_srp : "//www.idostream.com/images/FEATURE-VIDEOS-SRP-2.png";

                video_div.html(
                    "<img alt='full motion video'  src='" +
                    imageUrl +
                    "' class='img-responsive' border='0' />"
                );

                video_div.attr("data-url", url2);
                video_div.attr("data-feature_video_product", true);
                video_div.attr("data-p_id", data.posting_id);

                let autoplay = typeof data.autoplay !== 'undefined' ? data.autoplay : false;
                video_div.attr("data-autoplay", autoplay);

                video_div.attr("data-exp_type", data.exp_type);
                video_div.attr("data-show_form", data.show_form);
                video_div.attr("data-fancybox_enable", data.fancybox_enable);
                video_div.attr("data-vin", data.vin);
                video_div.attr("data-width", data.width);
                video_div.attr("data-height", data.height);
                video_div.css("cursor", "pointer");


                let reps = '.hit-link';
                //                    let new_block = video_div.parent().parent().parent().parent().find(reps).first();
                let new_block = video_div.parent().parent().find(reps).first();
                if (
                    window.location.href.indexOf("https://www.patrickhyundai.com/") === 0
                ) {
                    reps = '.stock-row';
                    new_block = video_div.parent().parent().find(reps).first();
                }
                // let new_block = video_div.parent().parent().find(reps).first();
                if (!window.mobilecheck() && new_block.length > 0) {
                    video_div.css('padding-bottom', '10px');
                    video_div.css('padding-top', '10px');
                    new_block.after(video_div);
                    if (jQuery_1_4_2('.les_video[data-vin="' + data.vin.toUpperCase() + '"]').length > 1) {
                        jQuery_1_4_2('.les_video[data-vin="' + data.vin.toUpperCase() + '"]').not(':first').remove();
                    }
                }

                let new_block_2 = video_div.parent();
                if (new_block_2.is('ul,.ddc-integrations-badgeprice,.ddc-integrations-mediatop,.fullmotion-badgeprice-container')) {
                    new_block_2.css('width', '100%');
                    if (
                        window.location.href.indexOf("https://www.landroverofnaperville.com/") === 0
                    ) {
                        new_block_2.css('padding-left', '0px');
                        new_block_2.css('padding-right', '4px');
                    } else {
                        new_block_2.css('padding-left', '4px');
                    }
                }

                    let new_block_6 = video_div.parent().parent().find('.msrppanel-label');
                    if (new_block_6.length == 1 && window.location.href.indexOf("https://www.princetonhonda.com/") === 0) {
                        new_block_6.prepend(video_div);
                        if (jQuery_1_4_2('.les_video[les_vin="' + data.vin.toUpperCase() + '"]').length > 1) {
                            jQuery_1_4_2('.les_video[les_vin="' + data.vin.toUpperCase() + '"]').not(':first').remove();
                        }
                    }

                if (
                    window.location.href.indexOf("http://www.toyotamarin.com") === 0
                ) {
                    video_div.find("img").removeAttr("class");

                    video_div.find("img").addClass("btn-overlay");
                }

                if (
                    window.location.href.indexOf("https://wesselhonda.com") === 0
                ) {

                    video_div.find("img").css("width", "100%");
                }

                if (
                    window.location.href.indexOf(
                        "https://www.larryhmillertoyota.com"
                    ) === 0
                ) {
                    if ($_LESA(window).width() <= 736)
                        video_div.css(
                            "cssText",
                            "margin-top: 0 !important; cursor:pointer;"
                        );
                }
                if (
                    window.location.href.indexOf(
                        "https://www.larrymillervolkswagen.com"
                    ) === 0
                ) {
                    if ($_LESA(window).width() <= 736)
                        video_div.css(
                            "cssText",
                            "margin-top: 0 !important; cursor:pointer;"
                        );
                }
                if (
                    jQuery_1_4_2(".credit").length > 0 &&
                    jQuery_1_4_2(".credit").first().text().trim() ===
                    "Website by Dealer.com" &&
                    false
                ) {
                    video_div.find("img").removeAttr("class");
                    video_div.find("img").addClass("btn-overlay");
                }
            }

        }
    });
}


function LoadExtCSSStyles(url) {
    jQuery_1_4_2("<link/>", {

        rel: "stylesheet",

        type: "text/css",

        href: url

    }).appendTo("head");

}

function LoadJavaScript() {

    if (window.location.href.indexOf("https://imagineautos.com/") === 0) {
        let img =
            "https://www.idostream.com/member/shadowbox/play-button-smal.png";
    }

    if (jQuery === null || typeof jQuery === "undefined")
        return int_les_vid();

    var divID = 'les_video';

    LoadCSSStyles();

    document.getElementsByClass = cstmGetElementsByClassName;
    var les_video_div = document.getElementsByClass('les_video');
    var les_vin = new Array();
    var jQuery_1_4_2 = jQuery_LESA;
    window.jQuery_1_4_2 = jQuery_1_4_2;

    for (var i = 0; i < les_video_div.length; i++) {

        les_vin[i] = les_video_div[i].getAttribute('les_vin');

        if (les_vin[i] === null || typeof les_vin[i] === 'undefined' || les_vin[i] === undefined)
            les_vin[i] = les_video_div[i].getAttribute('data-les_vin');
    }

    var vins = '';

    var dealers = '';

    for (var i = 0; i < les_vin.length; i++) {

        if (les_vin[i] === null)
            les_vin[i] = "";

        if (les_vin[i].length === 0) {

            if (jQuery_1_4_2.isFunction(window.getCobaltVin)) {
                les_vin[i] = getCobaltVin();
            } else if (jQuery_1_4_2.isFunction(window.getVin)) {
                les_vin[i] = getVin();
            }
        }
        vins += les_vin[i] + '-';
    }

    var bigArrs = les_vin;

    var d2Arrays = [];

    var iIndex = 0;

    while (bigArrs.length > 150) {
        d2Arrays[iIndex] = bigArrs.splice(0, 150);
        iIndex++;
    }

    d2Arrays.push(bigArrs);

    dealers = dealers.substring(0, dealers.length - 1);

    var div = document.createElement("div");

    jQuery_1_4_2(div).attr('id', 'test-div');

    jQuery_1_4_2(div).css('display', 'none');

    jQuery_1_4_2(div).html(vins);

    jQuery_1_4_2('body').append(div);

    var url = "//www.idostream.com/member/video_fetch_opt_all.php?vin=" + vins + "&";

    url += "jsoncallback=?";

 jQuery_1_4_2('.les_video').each(function (index, video_div) {
                    let new_block = jQuery_1_4_2(this).parent().parent().parent().parent().find('.vehicleImgLinks');
                    if (!window.mobilecheck() && new_block.length > 0 && window.location.href.indexOf("https://www.drivedanaford.com/") !== 0) {
                        new_block = new_block.parent();
let cp = jQuery_1_4_2(this).clone();
new_block.prepend(cp);
                    }

        new_block = jQuery_1_4_2(this).parent().parent().parent().parent().find("#carnow-convertnow-Mobile");
        if (window.mobilecheck() && new_block.length > 0 && window.location.href.indexOf("https://www.drivedanaford.com/") !== 0) {
            let cp = jQuery_1_4_2(this).clone();
            new_block.prepend(cp.css('width','100%'));
        }

});

    let prev = '';
    jQuery_1_4_2('.les_video').each(function (index, video_div) {
        if (prev == video_div.getAttribute('les_vin')) {
            console.log(11);
let ex = window.location.href.indexOf("https://www.billjacksonford.com/") === 0 ? true : false;
if(!ex) {
            jQuery_1_4_2(this).remove();
}
        }
        prev = video_div.getAttribute('les_vin');
    });


    for (i = 0; i < d2Arrays.length; i++) {

        var vins = '';

        var vins_arr = [];
        var vins_full_motion = [];

         if (d2Arrays[i] === undefined || d2Arrays[i] === '') continue;

        for (j = 0; j < d2Arrays[i].length; j++) {

            if (d2Arrays[i][j] === '') {
                continue;
            }

            vins += d2Arrays[i][j] + '-';
            vins_arr.push(d2Arrays[i][j]);
        }

        vins = vins.substring(0, vins.length - 1);

        var url = "//www.idostream.com/member/video_fetch_opt_all.php?vin=" + vins + "&";

        url += "jsoncallback=?";

        jQuery_1_4_2.getJSON(url, function (result) {

            if (result === null || result.length === null) {
                var result_length = 0;
            } else {
                var result_length = result.length;

            }

            if (!window._revs || typeof window._revs === 'undefined')
                window._revs = [];

            if (result_length > 0) {

                var revs_graph_id = jQuery_1_4_2.parseJSON(result[0]).revs_graph_id;

                if (revs_graph_id !== '') {
                    var newRev = {
                        id: jQuery_1_4_2.parseJSON(result[0]).revs_graph_id,

                        referrer: window.location.href,

                        attributes: null
                    };
                    _revs.push(newRev);
                }

                if (jQuery_1_4_2.parseJSON(result[0]).fancybox_enable.toLowerCase() === 'y') {
                    AddFancyBox();
                } else {
                    AddShadowBox();
                }

                //<!-- Google Analytics -->
                var google_analytics_id = jQuery_1_4_2.parseJSON(result[0]).google_analytics_id;

                (function (i, s, o, g, r, a, m) {
                    i["GoogleAnalyticsObject"] = r;
                    (i[r] =
                        i[r] ||
                        function () {
                            (i[r].q = i[r].q || []).push(arguments);
                        }),
                    (i[r].l = 1 * new Date());
                    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
                    a.async = 1;
                    a.src = g;
                    m.parentNode.insertBefore(a, m);
                })(
                    window,
                    document,
                    "script",
                    "//www.google-analytics.com/analytics.js",
                    "ga"
                );

                ga("create", google_analytics_id, "auto"); // Replace with your property ID.
                ga("require", "linker");

                ga(function (tracker) {
                    // Gets the client ID of the default tracker.
                    clientId = tracker.get("clientId");
                    console.log("showing LESA tracking id");
                    console.log(clientId);
                });
            }


            for (var i = 0; i < result_length; i++) {
                var data = jQuery_1_4_2.parseJSON(result[i]);

                var revs_graph_id = data.revs_graph_id;

                var vehicle_condition = data.vehicle_condition;

                var google_analytics_id = data.google_analytics_id;

                if (data.video_link || (typeof data.has_youtube != "undefined" && data.has_youtube)) {

                    if (data.video_link) {
                        vins_full_motion.push(data.vin);
                    }

                    if (data.exp_type === "popup") {

                        if (data.show_form === "Y") {

                            var url2 = single_url + "&id=" + data.dealer_id + "&sn=" + data.stock_num + "&vin=" + data.vin + "&dn=" + data.dealer_name + "&y=" + data.year + "&mk=" + data.make + "&mo=" + encodeURIComponent(data.model) + "&w=" + data.width + "&h=" + data.height + "&str=" + data.stretching + "&play=" + data.autoplay + "&fv=" + data.video_link + "&ClientID=" + clientId + "";

                        } else {

                            var url2 = single_url + "&posting_id=" + data.posting_id + "&ClientID=" + clientId + "";

                        }
                    } else {
                        if (data.show_form === "Y") {

                            var url2 = single_url + "&id=" + data.dealer_id + "&sn=" + data.stock_num + "&vin=" + data.vin + "&dn=" + data.dealer_name + "&y=" + data.year + "&mk=" + data.make + "&mo=" + encodeURIComponent(data.model) + "&w=" + data.width + "&h=" + data.height + "&str=" + data.stretching + "&play=" + data.autoplay + "&fv=" + data.video_link + "&ClientID=" + clientId + "";

                            if (data.asp_popup.toLowerCase() === 'y') {
                                url2 = '//video.lesautomotive.com/VideoPopup.aspx?id=' + data.dealer_id + "&sn=" + data.stock_num + "&vin=" + data.vin + "&dn=" + data.dealer_name + "&y=" + data.year + "&mk=" + data.make + "&mo=" + encodeURIComponent(data.model) + "&w=" + data.width + "&h=" + data.height + "&str=" + data.stretching + "&play=" + data.autoplay + "&fv=" + data.video_link + "&ClientID=" + clientId + "";

                            }

                        } else {

                            var url2 = single_url + "&posting_id=" + data.posting_id + "&ClientID=" + clientId + "";
                            if (data.asp_popup.toLowerCase() === 'y') {
                                url2 = '//video.lesautomotive.com/VideoPopup.aspx?id=' + data.dealer_id + "&sn=" + data.stock_num + "&dn=" + data.dealer_name + "&y=" + data.year + "&mk=" + data.make + "&mo=" + encodeURIComponent(data.model) + "&w=" + data.width + "&h=" + data.height + "&str=" + data.stretching + "&play=" + data.autoplay + "&fv=" + data.video_link + "&bgcolor=" + data.asp_popup_color + "&ClientID=" + clientId + "";
                            }

                        }

                    }

                    var imageUrl = "//www.idostream.com/liveeventstream/images/orange_button.jpg";

                    if (data.button_img_small && data.button_img_small.trim() !== '') {
                        imageUrl = data.button_img_small;
                    }

                    if (window.location.href.indexOf('https://') > 0) {
                        imageUrl = imageUrl.replace('http://', 'https://');
                    }

                    baseheight = 150;

                    // show mp4 if this is mobile

                    if (window.mobilecheck()) {

                    }
                    dataheight = data.height;

                    height = baseheight + parseInt(dataheight);

                    if (jQuery_1_4_2('.les_btn_img').length > 0) {
                        imageUrl = jQuery_1_4_2('.les_btn_img').val();
                    }

                    var sSelector = '[les_vin="' + data.vin.toUpperCase() + '"]';

                    var video_div = jQuery_1_4_2(sSelector);

                    if (video_div.length === 0) {
                        sSelector = '[data-les_vin="' + data.vin.toUpperCase() + '"]';

                        video_div = jQuery_1_4_2(sSelector);

                    }
                    if (window.location.href.indexOf('http://www.toyotamarin.com') === 0) {
                        var widthSite = $_LESA(window).width();
                        if (widthSite > 312 && widthSite <= 414) {
                            video_div.css('margin-left', '-126%');
                        } else if (widthSite > 414 && widthSite < 667) {
                            video_div.css('margin-left', '-22%');
                        } else if (widthSite >= 667 && widthSite < 768) {
                            video_div.css('margin-left', '-21%');
                        } else {
                            video_div.css('margin-left', '-100%');
                        }
                        video_div.css('width', '100%');

                        video_div.css('position', 'absolute');

                        video_div.css('top', '0%');

                        imageUrl = 'https://www.idostream.com/member/shadowbox/play-button-smal.png';

                        video_div.addClass('les_video_overlay');

                    }

                    if (jQuery_1_4_2('.credit').length > 0 && jQuery_1_4_2('.credit').first().text().trim() === 'Website by Dealer.com' && false)

                    {
                        video_div.css('width', '100%');

                        video_div.css('position', 'absolute');

                        video_div.css('top', 'auto');

                        imageUrl = 'https://www.idostream.com/member/shadowbox/play-button-smal.png';

                        video_div.addClass('les_video_overlay');

                    }

                    let custom_style = "";
                    if (window.mobilecheck() && [
                            "https://www.classictexoma.com",
                            "https://www.classichondatexoma.com",
                            "https://www.classicnissantexoma.com",
                            "https://www.classictoyotatexoma.com",
                            "https://www.classiccadillacdenison.com",
                            "https://www.classicchevroletdenison.com"
                        ].includes(window.location.origin)) {
                        custom_style = 'style="width:100%"';
                    }

                    if (typeof data.button != "undefined" && data.button != '') {
                        video_div.html(data.button);
                    } else {
                        video_div.html("<img src='" + imageUrl + "'  alt='full motion video'   class='img-responsive' border='0' " + custom_style + "  />");
                    }
                    video_div.attr("src", imageUrl);

                    video_div.attr('data-url', url2);

                    video_div.attr("data-feature_video_product", data.feature_video_product);

                    video_div.attr("data-p_id", data.posting_id);

                    video_div.attr('data-exp_type', data.exp_type);

                    video_div.attr('data-show_form', data.show_form);

                    video_div.attr('data-asp_popup', data.asp_popup);

                    video_div.attr('data-fancybox_enable', data.fancybox_enable);

                    video_div.attr('data-vehicle_condition', vehicle_condition);

                    video_div.attr('data-year', data.year);

                    video_div.attr('data-make', data.make);

                    video_div.attr('data-model', data.model);

                    video_div.attr('data-vin', data.vin);

                    video_div.attr('data-width', data.width);

                    video_div.attr('data-height', data.height);

                    video_div.attr('revs_graph_id', revs_graph_id);

                    video_div.css('cursor', 'pointer');

                    if (data.button_img_class_name && data.button_img_class_name.trim() !== '') {

                        video_div.addClass(data.button_img_class_name);

                    }

                    if (window.location.href.indexOf('http://www.toyotamarin.com') === 0) {

                        video_div.find('img').removeAttr('class');

                        video_div.find('img').addClass('btn-overlay');

                    }
/*
                    let new_block = video_div.parent().parent().parent().parent().find('.vehicleImgLinks');
                    if (!window.mobilecheck() && new_block.length > 0 && window.location.href.indexOf("https://www.drivedanaford.com/") !== 0) {
                        new_block = new_block.parent();
                        video_div.detach().prependTo(new_block);
                        if (new_block.find('.les_video').length > 1) {
                            new_block.find('.les_video').first().remove();
                        }
                    }
*/
                    new_block = video_div.parent().parent().parent().find('.btn.btn-alt3.btn-block.btn-xs.visible-xs.uDisplayVideoBottomIcon');
                    var new_block2 = video_div.parent().parent().parent().find('pricing-stack').first();
                    if (window.location.href.indexOf("https://www.billjacksonford.com/") !== 0 && window.mobilecheck() && new_block.length > 0) {
                        new_block.after(video_div);
                        new_block.remove();
                        if (jQuery_1_4_2('.les_video[data-vin="' + data.vin.toUpperCase() + '"]').length > 1) {
                            jQuery_1_4_2('.les_video[data-vin="' + data.vin.toUpperCase() + '"]').not(':first').remove();
                        }
                    } else if ( window.location.href.indexOf("https://www.billjacksonford.com/") !== 0 && window.mobilecheck() && new_block2.length > 0) {
//                        new_block2.after(video_div);
                        //new_block2.remove();
//                        if (jQuery_1_4_2('.les_video[data-vin="' + data.vin.toUpperCase() + '"]').length > 1) {
//                            jQuery_1_4_2('.les_video[data-vin="' + data.vin.toUpperCase() + '"]').not(':first').remove();
//                        }
                    }

                    if (typeof data.has_youtube != "undefined" && data.has_youtube) {
                        if (jQuery_1_4_2('.les_video_recon[data-vin="' + data.vin.toUpperCase() + '"]').length == 0) {
                            let recon_div = reconDiv(data, imageUrl, url2);
                            video_div.after(recon_div);
                        }
                        if (jQuery_1_4_2('.les_video_recon[data-vin="' + data.vin.toUpperCase() + '"]').length > 1) {
                            jQuery_1_4_2('.les_video_recon[data-vin="' + data.vin.toUpperCase() + '"]').not(':first').remove();
                        }
                    }

                    if (window.location.href.indexOf('https://www.larryhmillertoyota.com') === 0) {
                        if ($_LESA(window).width() <= 736)
                            video_div.css('cssText', 'margin-top: 0 !important; cursor:pointer;');
                    }
                    if (window.location.href.indexOf('https://www.larrymillervolkswagen.com') === 0) {
                        if ($_LESA(window).width() <= 736)
                            video_div.css('cssText', 'margin-top: 0 !important; cursor:pointer;');
                    }
                    if (jQuery_1_4_2('.credit').length > 0 && jQuery_1_4_2('.credit').first().text().trim() === 'Website by Dealer.com' && false)

                    {

                        video_div.find('img').removeAttr('class');

                        video_div.find('img').addClass('btn-overlay');

                    }

                }

            }

            loadFeatureVideos(vins_arr, vins_full_motion);
            
            // load extra script for dealer

            overlay_dealers();
        });

    }


jQuery_1_4_2('.les_video').each(function (index, video_div) {
    if (window.location.href.indexOf("https://www.billmacdonaldford.net/") === 0 || window.location.href.indexOf("https://www.machaikford.com/") === 0) {
        let new_block = jQuery_1_4_2(this).parent().parent().parent().parent().parent().find('.vehicle-card__overview');
        if (new_block.length > 0) {
            jQuery_1_4_2(this).css('display', 'flex').css('justify-content','center');
            let cp = jQuery_1_4_2(this).clone();
            //cp.find('img').css("width","100%");
            new_block.prepend(cp);
            jQuery_1_4_2(this).remove();
        }
    }
});

    jQuery_1_4_2('.les_video').unbind('click');

    jQuery_1_4_2('.les_video').click(function () {

        var url2 = jQuery_1_4_2(this).attr('data-url');

        var feature_video_product = jQuery_1_4_2(this).attr("data-feature_video_product");
        var p_id = jQuery_1_4_2(this).attr("data-p_id");

        var exp_type = jQuery_1_4_2(this).attr('data-exp_type');

        var show_form = jQuery_1_4_2(this).attr('data-show_form');

        var asp_popup = jQuery_1_4_2(this).attr('data-asp_popup');

        var fancybox_enable = jQuery_1_4_2(this).attr('data-fancybox_enable');

        var vehicle_condition = jQuery_1_4_2(this).attr('data-vehicle_condition');

        var year = jQuery_1_4_2(this).attr('data-year');

        var make = jQuery_1_4_2(this).attr('data-make');

        var model = jQuery_1_4_2(this).attr('data-model');

        var vin = jQuery_1_4_2(this).attr('data-vin');

        var width = jQuery_1_4_2(this).attr('data-width');

        var height = jQuery_1_4_2(this).attr('data-height');

        var revs_graph_id = jQuery_1_4_2(this).attr('revs_graph_id');

        var newRev = {

            id: revs_graph_id,

            attributes: {

                type: vehicle_condition,

                year: year,

                make: make,

                model: model,

                vin: vin

            }

        };

        if (show_form == "Y") {
            var player_height = 520;
            var player_width = 1244;

        } else {
            var player_height = parseInt(height);
            var player_width = parseInt(width);
        }



        if (window.mobilecheck()) {
            openvideo(url2, player_height, player_width)
            return;
        }

        if (feature_video_product && !window.isIpad()) {
            jQuery_1_4_2.getJSON(feature_link + "&vin=" + vin, function (sc) {
                if (sc.success) {
                    if (show_form == "Y") {
                        player_height = 620;
                        player_width = 1244;
                    } else {
                        player_height = parseInt(height);
                        player_width = parseInt(width) + 150;
                    }
                    url2 = url2 + "&show_playlist=1";
                }

                showBox(fancybox_enable, url2, player_width, player_height);

            });
        } else {
            showBox(fancybox_enable, url2, player_width, player_height);
        }

        // if (fancybox_enable.toLowerCase() == 'y') {
        //     if (show_form === "Y") {
        //         player_width = 1244;
        //         player_height = 520;
        //     }
        //     jQuery_1_4_2.fancybox.open({
        //         href: url2,
        //         padding: 0,
        //         src: url2,
        //         type: 'iframe',
        //         height: player_height,
        //         width: player_width,
        //         fitToView: false,
        //         autoSize: false,
        //         iframe: {
        //             preload: false
        //         }
        //     });
        // } else {

        //     Shadowbox.init({
        //         skipSetup: true,
        //         onFinish: function () {
        //             jQuery('#sb-player').attr('allow', 'autoplay');
        //             jQuery('#sb-player').attr('scrolling', 'no');
        //             jQuery('#sb-player').attr('src', url2);
        //         }
        //     });

        //     if (jQuery_1_4_2('#sb-container').is(":visible"))
        //         return;
        //     if (show_form === "Y") {
        //         player_width = 1244;
        //         player_height = 520;
        //     }
        //     Shadowbox.open({
        //         content: url2,
        //         player: 'iframe',
        //         title: "Vehicle Video",
        //         height: player_height,
        //         width: player_width
        //     });
        // }

    });

    jQuery_1_4_2('.les_video_recon').unbind('click');

    jQuery_1_4_2(document).on("click", ".les_video_recon", function () {
        var url2 = jQuery_1_4_2(this).attr('data-url');
        var exp_type = jQuery_1_4_2(this).attr('data-exp_type');
        var show_form = jQuery_1_4_2(this).attr('data-show_form');
        var asp_popup = jQuery_1_4_2(this).attr('data-asp_popup');
        var fancybox_enable = jQuery_1_4_2(this).attr('data-fancybox_enable');
        var year = jQuery_1_4_2(this).attr('data-year');
        var make = jQuery_1_4_2(this).attr('data-make');
        var model = jQuery_1_4_2(this).attr('data-model');
        var vin = jQuery_1_4_2(this).attr('data-vin');
        var width = jQuery_1_4_2(this).attr('data-width');
        var height = jQuery_1_4_2(this).attr('data-height');
        if (exp_type == "popup") {
            if (show_form == "Y") {
                var player_height = 520;
                var player_width = 1244;
            } else {
                var player_height = parseInt(height);
                var player_width = width;
            }
        } else {
            if (show_form == "Y") {
                var player_height = 520;
                var player_width = 1244;
            } else {
                var player_height = parseInt(height); /* + 180; */
                var player_width = width;
            }

            if (asp_popup.toLowerCase() == 'y') {
                player_height = parseInt(height) + 180;
            }
        }

        if (window.mobilecheck()) {
            openvideo(url2, player_height, width)
            return;
        }

        if (fancybox_enable.toLowerCase() == 'y') {
            if (show_form === "Y") {
                player_width = 1244;
                player_height = 520;
            }
            jQuery_1_4_2.fancybox.open({
                href: url2,
                padding: 0,
                src: url2,
                type: 'iframe',
                height: player_height,
                width: player_width,
                fitToView: false,
                autoSize: false,
                iframe: {
                    preload: false
                }
            });
        } else {
            //loadScript("//www.idostream.com/shadowbox/shadowbox.js", function () {
            Shadowbox.init({
                // let's skip the automatic setup because we don't have any
                // properly configured link elements on the page
                skipSetup: true,
                onFinish: function () {
                    jQuery('#sb-player').attr('allow', 'autoplay');
                    jQuery('#sb-player').attr('scrolling', 'no');
                    jQuery('#sb-player').attr('src', url2);
                }
            });
            if (jQuery_1_4_2('#sb-container').is(":visible"))
                return;
            if (show_form === "Y") {
                player_width = 1244;
                player_height = 520;
            }
            Shadowbox.open({
                content: url2,
                player: 'iframe',
                title: "Vehicle Video",
                height: player_height,
                width: player_width
            });
            //});
        }

    });

}

function showBox(fancybox_enable, url2, player_width, player_height) {


    if (fancybox_enable.toLowerCase() == "y") {

        let params = {
            href: url2,
            padding: 0,
            src: url2,
            type: "iframe",
            height: player_height,
            width: player_width,
            fitToView: false,
            autoSize: false,
            iframe: {
                preload: false,
            },
        };

        if (window.mobilecheck()) {
            params = {
                href: url2,
                padding: 0,
                src: url2,
                type: "iframe",
                fitToView: true,
                autoSize: true,
                iframe: {
                    preload: false,
                },
            };
        }

        jQuery_1_4_2.fancybox.open(params);
    } else {


        if (window.orientation !== 0) {
            jQuery_LESA("#sb-player").attr('scrolling', 'yes');
        }

        window.addEventListener("orientationchange", function () {
            setTimeout(function () {
                let player_height = jQuery_1_4_2(window.top).height() - 55; // window.screen.height - 90;
                let player_width = jQuery_1_4_2(window.top).width() - 80;
                if (window.orientation === 0) {
                    let left = (jQuery_1_4_2(window.top).width() - (jQuery_1_4_2(window.top).width() - 80)) / 2;
                    let top = 0;
                    jQuery_LESA("#sb-wrapper").css("width", player_width + "px");
                    jQuery_LESA("#sb-wrapper").css("left", left);
                    jQuery_LESA("#sb-wrapper").css("top", top);
                    jQuery_LESA("#sb-player").attr('scrolling', 'no');
                    jQuery_LESA("#sb-wrapper-inner").css('height', player_height + "px");
                } else {
                    let player_width = jQuery_1_4_2(window.top).width() - 200;
                    let player_height = jQuery_1_4_2(window.top).height() - 55;
                    let left = (jQuery_1_4_2(window.top).width() - (jQuery_1_4_2(window.top).width() - 200)) / 2;
                    let top = 0;
                    jQuery_LESA("#sb-wrapper").css("width", player_width + "px");
                    jQuery_LESA("#sb-wrapper").css("left", left);
                    jQuery_LESA("#sb-wrapper").css("top", top);
                    jQuery_LESA("#sb-player").attr('scrolling', 'yes');
                    jQuery_LESA("#sb-wrapper-inner").css('height', player_height + "px");
                }
            }, 500);
        }, false);


        Shadowbox.init({
            skipSetup: true,
            onFinish: function () {
                jQuery_LESA("#sb-player").attr("allow", "autoplay");
                jQuery_LESA("#sb-player").attr("scrolling", "no");
                jQuery_LESA("#sb-player").attr("src", url2);
            },
        });
        if (jQuery_1_4_2("#sb-container").is(":visible")) return;
        console.log("lesa click 2", url2);
        Shadowbox.open({
            content: url2,
            player: "iframe",
            title: "Vehicle Video",
            height: player_height,
            width: player_width,
        });
    }
}

function loadScriptN(scriptUrl, callback, data) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);

    return new Promise((res, rej) => {
        script.onload = function () {
            res();
        }
        script.onerror = function () {
            rej();
        }
    });
}

function loadScript(url, callback, data) {

    var head = document.getElementsByTagName("head")[0];

    var script = document.createElement("script");

    script.type = "text/javascript";

    script.src = url;

    var done = false;

    script.onload = script.onreadystatechange = function () {

        if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {

            done = true;

            if (data != undefined) {

                try {
                    callback(data);
                } catch (e) {}

            } else {

                try {

                    callback();

                } catch (e) {}

            }

            script.onload = script.onreadystatechange = null;

            head.removeChild(script);
        }
    };

    head.appendChild(script);

}

var les_revs = [];

function int_les_vid() {

    loadScript('//idostream.com/member/scripts/jquery-1.9.1.js', function () {
loadScriptN("https://www.idostream.com/member/lesa_realoffer.js", function () {});
        // load extra script for dealer

        var url = '//www.idostream.com/member/dealer_script/overlay_dealers.js';

        loadScript(url, function () {});

        // Events for dynamic loading websites
        LoadJavaScript();
        jQuery(document).on('infiniteScrollFinished', function ($) {
            LoadJavaScript();
        });
        //PLY 2019-10-20 added additional functions by third party sites.
        jQuery(document).on('ws-search-results', function ($) {
            LoadJavaScript();
        });
        jQuery(document).on('inventoryAjaxCompleteEvent', function ($) {
            LoadJavaScript();
        });
        jQuery(document).on('SF:BuildVehicle', function ($) {
            LoadJavaScript();
        });
        jQuery(document).on('srp_vehicles_loaded', function (e) {
            LoadJavaScript();
        }); // Jazel 10/18/19

    });

    loadScript("https://revs.foxdealer.com/p/revs.js", function () {});

}

int_les_vid();

window.mobilecheck = function () {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        return true;

    }

    return false;
}

window.isIpad = function () {

    if (/iPad/i.test(navigator.userAgent)) {
        return true;

    }
    return false;
}


function AddFancyBox() {
    var url = "//idostream.com/member/scripts/fancybox-2.1.7/source/jquery.fancybox.css?v=2";
    LoadExtCSSStyles(url);

    url = "//idostream.com/member/scripts/fancybox-2.1.7/source/jquery.fancybox.js?v=2";
    loadScript(url);

}

function AddShadowBox() {
    url = "//www.idostream.com/shadowbox/shadowbox.js";
    loadScript(url);
}

function reconDiv(data, imageUrl, url2) {
    imageUrl = 'https://www.idostream.com/liveeventstream/images/reconvideo.jpg';
    let video_div_recon = jQuery_1_4_2('<div/>');
    video_div_recon.addClass('les_video_recon');
    if (typeof data.button_recon != "undefined" && data.button_recon != '') {
        video_div_recon.html(data.button_recon);
    } else {
        video_div_recon.html("<img src='" + imageUrl + "'  alt='full motion video'  class='img-responsive' border='0' />");
    }
    video_div_recon.attr("src", imageUrl);
    video_div_recon.attr('data-url', url2 + '&recon=1');
    video_div_recon.attr('data-exp_type', data.exp_type);
    video_div_recon.attr('data-show_form', data.show_form);
    video_div_recon.attr('data-asp_popup', data.asp_popup);
    video_div_recon.attr('data-fancybox_enable', data.fancybox_enable);
    video_div_recon.attr('data-year', data.year);
    video_div_recon.attr('data-make', data.make);
    video_div_recon.attr('data-model', data.model);
    video_div_recon.attr('data-vin', data.vin);
    video_div_recon.attr('data-width', data.width);
    video_div_recon.attr('data-height', data.height);
    video_div_recon.css('cursor', 'pointer');
    video_div_recon.css('margin-top', '5px');
    return video_div_recon;
}
