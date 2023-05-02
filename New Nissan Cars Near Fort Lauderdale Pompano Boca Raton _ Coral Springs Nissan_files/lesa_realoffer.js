//let providerID = document.querySelector("meta[name='providerID']");
var config_url = "//player.lesautomotive.com/ro-settings?ref=" + btoa(window.location.origin);

//setTimeout(() => {
loadDDC();
//},15000);
function loadDDC() {
    if (document.querySelector("meta[name='providerID']") == null ||
        document.querySelector("meta[name='providerID']").getAttribute("content") != "DDC") {
        console.log('NOT DDC PROVIDER');

        fetch(config_url)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    let txt = "<img alt='full motion video'  src='" +
                        data.button_srp +
                        "' class='img-responsive' border='0' />";

                    jQuery_1_4_2('.les_video').each(function (index, item) {
                        let vin = item.getAttribute("les_vin");
                        if (
                            vin === null ||
                            typeof vin === "undefined" ||
                            vin === undefined
                        )
                            vin = les_video_div[i].getAttribute("data-les_vin");
                        if (vin) {
                            let url2 = data.url + "&vin=" + vin + "&ref=" + btoa(window.location.href);
                            let ddiv = jQuery_1_4_2("<div class='lesa_realoffer margin-top-1x' data-url='" +
                                url2 +
                                "' data-vin='" + vin + "' data-dealer='" + data.dealer + "'>" + txt + "</div>", {});
                            jQuery_1_4_2('.les_video').eq(index).after(ddiv);
                        }

                    });

                    jQuery_1_4_2('#les_video').each(function (index, item) {
                        let vin = item.getAttribute("les_vin");
                        if (
                            vin === null ||
                            typeof vin === "undefined" ||
                            vin === undefined
                        )
                            vin = les_video_div[i].getAttribute("data-les_vin");
                        if (vin) {
                            let url2 = data.url + "&vin=" + vin + "&ref=" + btoa(window.location.href);
                            let ddiv = jQuery_1_4_2("<div class='lesa_realoffer margin-top-1x' data-url='" +
                                url2 +
                                "' data-vin='" + vin + "' data-dealer='" + data.dealer + "'>" + txt + "</div>", {});
                            jQuery_1_4_2('#les_video').eq(index).after(ddiv);
                        }

                    });

                    jQuery_1_4_2(".lesa_realoffer").unbind("click");
                    jQuery_1_4_2(".lesa_realoffer").click(function () {
                        var url = jQuery_1_4_2(this).attr("data-url");
                        var dealer = jQuery_1_4_2(this).attr("data-dealer");
                        var vin = jQuery_1_4_2(this).attr("data-vin");
                        window.open(url, '_blank').focus();
                        let stat_url = "https://realoffer.lesautomotive.com/stat?" +
                            "dealer=" + dealer +
                            "&value=" + vin +
                            "&type=dealer_website_cta"
                        fetch(stat_url)
                            .then(response => response.json())
                            .then(data => console.log(data));
                    });
                    fixView();
                }
            })

        return;
    }
    console.log('DDC PROVIDER');

    (function (WIAPI) {
        var API = new WIAPI("lesa");
        API.subscribe("vehicle-data-updated-v1", function (ev) {
            API.utils.getAttributeForVehicles("vin").then(function (vins) {
                fetch(config_url)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            let txt = "<img alt='full motion video'  src='" +
                                data.button_srp +
                                "' class='img-responsive' border='0' />";
                            API.insertOnce("vehicle-media", function (elem, meta) {
                                let url2 = data.url + "&vin=" + meta.vin + "&ref=" + btoa(window.location.href);
                                var button = API.create("button", {
                                    text: txt,
                                    classes: "lesa_realoffer", //dialog
                                    style: "margin-top: 10px; padding: 0px; border: 0;",
                                    attributes: {
                                        "data-url": url2,
                                        "data-vin": meta.vin,
                                        "data-dealer": data.dealer
                                    },
                                });
                                API.append(elem, button);
                                jQuery_1_4_2(".lesa_realoffer").unbind("click");
                                jQuery_1_4_2(".lesa_realoffer").click(function () {
                                    var url = jQuery_1_4_2(this).attr("data-url");
                                    var dealer = jQuery_1_4_2(this).attr("data-dealer");
                                    var vin = jQuery_1_4_2(this).attr("data-vin");
                                    window.open(url, '_blank').focus();
                                    let stat_url = "https://realoffer.lesautomotive.com/stat?" +
                                        "dealer=" + dealer +
                                        "&value=" + vin +
                                        "&type=dealer_website_cta"
                                    fetch(stat_url)
                                        .then(response => response.json())
                                        .then(data => console.log(data));
                                });
                                fixView();
                            });
                        }
                    })
            });
        });
    })(window.DDC.API);

}

function fixView() {
    if(window.location.href.indexOf("https://www.stoneskia.net/auto/") === 0) {
        jQuery_1_4_2(".lesa_realoffer").find('img').css('min-width', '200px').css('margin-left','30px');
        jQuery_1_4_2(".lesa_realoffer").parent().css('display', 'flex').css('flex-direction','row')
    }
}
