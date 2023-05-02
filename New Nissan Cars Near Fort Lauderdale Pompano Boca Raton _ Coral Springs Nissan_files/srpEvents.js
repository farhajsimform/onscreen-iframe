var nissanInventoryResultsEventTracker = (function () {

    function fireSingleFilterResultEvent(inventoryFilterObject) {
        var filterResultsObject = {
            'inventoryFilterLabel': inventoryFilterObject.Name,
            'inventoryFilterValue': inventoryFilterObject.Value
        };
        window.dataLayer.push({
            'event': 'nissan-t3-tagging-TrackInventoryResults',
            'nissan-t3-tagging': filterResultsObject
        });

        if (typeof _satellite !== 'undefined') _satellite.track("t3TrackInventoryResults", filterResultsObject);
    }

    function fireFilterKeyValuePairEvent(inventoryFiltersArray) {
        var filterObject = {};
        inventoryFiltersArray.forEach(function (item) {
            filterObject[item.Name.toLowerCase()] = item.Value.toLowerCase();
        });

        var filterResultsObject = {
            'inventoryFilterKvp': filterObject
        };
        window.dataLayer.push({
            'event': 'nissan-t3-tagging-TrackInventoryResultsKvp',
            'nissan-t3-tagging': filterResultsObject
        });

        if (typeof _satellite !== 'undefined') _satellite.track("t3TrackInventoryResultsKvp", filterResultsObject);
    }

    function initialize(initializationObject) {
        inventoryFilters = JSON.parse(initializationObject.inventoryFilterLabel);
        if (inventoryFilters.length === 1) {
            fireSingleFilterResultEvent(inventoryFilters[0]);
        }else if(inventoryFilters.length > 1) {
            fireFilterKeyValuePairEvent(inventoryFilters);
        }
    }

    return {
        initialize: initialize
    };
})()

var sortDropdown = document.getElementById('SortOrder');
if (sortDropdown) {
    sortDropdown.addEventListener('change', function (el) {
        var dropdownFilterObject = {
            'searchFilterLabel': 'inventory sort',
            'searchFilterValue': el.target.options[el.target.selectedIndex].text
        }
        window.dataLayer.push({
            'event': 'nissan-t3-tagging-TrackDropDown',
            'nissan-t3-tagging': dropdownFilterObject
        });

        if (typeof _satellite !== 'undefined') _satellite.track("t3TrackDropDown", dropdownFilterObject);
    }, true);
}
var vehicleCountDropdown = document.getElementById('numberOfVehicles');
if (vehicleCountDropdown) {
    vehicleCountDropdown.addEventListener('change', function (el) {
        var dropdownFilterObject = {
            'searchFilterLabel': 'inventory amount',
            'searchFilterValue': el.target.options[el.target.selectedIndex].text
        }
        window.dataLayer.push({
            'event': 'nissan-t3-tagging-TrackDropDown',
            'nissan-t3-tagging': dropdownFilterObject
        })

        if (typeof _satellite !== 'undefined') _satellite.track("t3TrackDropDown", dropdownFilterObject);
    }, true);
}

var imageSections = document.getElementsByClassName("vehicleImgLinks");
for (var i = 0; i < imageSections.length; i++) {
    var sneakPeak = imageSections[i].querySelector(".sneakPeek");
    if (sneakPeak) {
        sneakPeak.addEventListener('click', AddCarouselEventListeners);
    }
}

function AddCarouselEventListeners() {
    var carouselArrows = document.querySelectorAll(".galleria-image-nav-left, .galleria-image-nav-right");
    var carouselIconGroups = document.getElementsByClassName("galleria-thumbnails");

    if (carouselArrows.length !== 0) {
        for (var i = 0; i < carouselArrows.length; i++) {
            carouselArrows[i].removeEventListener('click', TrackCarouselArrows);
        }
        for (var i = 0; i < carouselIconGroups.length; i++) {
            var carouselQuickIcons = carouselIconGroups[i].children;
            for (var j = 0; j < carouselQuickIcons.length; j++) {
                carouselQuickIcons[j].removeEventListener('click', TrackCarouselThumbnails);
            }
        }
    }
    setTimeout(function () {
        var carouselArrows = document.querySelectorAll(".galleria-image-nav-left, .galleria-image-nav-right");
        var carouselIconGroups = document.getElementsByClassName("galleria-thumbnails");

        for (var i = 0; i < carouselArrows.length; i++) {
            carouselArrows[i].addEventListener('click', TrackCarouselArrows);
        }

        for (var i = 0; i < carouselIconGroups.length; i++) {
            var carouselQuickIcons = carouselIconGroups[i].children;
            for (var j = 0; j < carouselQuickIcons.length; j++) {
                carouselQuickIcons[j].addEventListener('click', TrackCarouselThumbnails);
            }
        }
    }, 1000);
}

function TrackCarouselArrows(el) {
    el = el.currentTarget;
    var direction = el.classList.contains('galleria-image-nav-right') ? 'next' : 'prev'
    var eventObject = {
        'interactionLabel': direction + ' slide',
        'interactionValue': getSneakPeekCurrentElementCountPosition(el)
    };
    var dataObject = {
        'event': 'nissan-t3-tagging-TrackCarousel',
        'nissan-t3-tagging': { eventObject }
    };
    window.dataLayer.push(dataObject);
    if (typeof _satellite !== 'undefined') _satellite.track('t3TrackCarousel', eventObject);
}

function TrackCarouselThumbnails(el) {
    el = el.currentTarget;
    var parent = el.parentElement;
    var position = Array.prototype.indexOf.call(parent.children, el) + 1;
    var totalElements = parent.childElementCount;
    var eventObject = {
        'interactionLabel': 'jump to slide ' + position,
        'interactionValue': position + '/' + totalElements
    };
    var dataObject = {
        'event': 'nissan-t3-tagging-TrackCarousel',
        'nissan-t3-tagging': { eventObject }
    };
    window.dataLayer.push(dataObject);
    if (typeof _satellite !== 'undefined') _satellite.track('t3TrackCarousel', eventObject);
}

function getSneakPeekCurrentElementCountPosition(el) {
    var currentElem = 0;
    var totalElem = 0;
    if (el.classList.contains('galleria-image-nav-left') || el.classList.contains('galleria-image-nav-right')) {
        var counter = el.parentElement.parentElement.getElementsByClassName("galleria-counter")[0];
        currentElem = parseInt(counter.getElementsByClassName("galleria-current")[0].textContent);
        currentElem += el.classList.contains('galleria-image-nav-right') ? 1 : -1;
        totalElem = counter.getElementsByClassName("galleria-total")[0].textContent;
        return currentElem + "/" + totalElem;
    }
    return "";
}

//personalize offer
document.querySelectorAll('personalized-offer').forEach(function (element) {
    element.addEventListener('click', function (el) {
        var eventObject = {
            'interactionLabel': 'personalized offer',
            'interactionValue': 'modal'
        };
        var dataObject = {
            'event': 'nissan-t3-tagging-TrackModalOpen',
            'nissan-t3-tagging': { eventObject }
        };
        window.dataLayer.push(dataObject);
        if (typeof _satellite !== 'undefined') _satellite.track('t3TrackModalOpen', eventObject);

        if (!nissanPersonalizeOfferEventAttached) {
            setTimeout(attachNissanPersonalizedOfferEvent, 1000);
        }
    }, true);
});

var nissanPersonalizeOfferEventAttached = false;
var attachNissanPersonalizedOfferEvent = function () {
    var personalizeOfferButton = document.getElementById('po-next-btn');
    if (personalizeOfferButton) {
        personalizeOfferButton.addEventListener('click', function (el) {
            var eventObject = {
                'formName': 'personalized offer',
                'formCategory': 'lead',
                'formType': 'personalized offer',
                'leadId': DealeronLead.token.value,
            };
            var dataObject = {
                'event': 'nissan-t3-tagging-TrackPersonalizedOfferFormSubmit',
                'nissan-t3-tagging': { eventObject }
            };
            window.dataLayer.push(dataObject);
            if (typeof _satellite !== 'undefined') _satellite.track('t3TrackPersonalizedOfferFormSubmit', eventObject);
        });
        nissanPersonalizeOfferEventAttached = true;
    }
}


//apex
var nissanApexClickEvent = function (el) {
    var eventObject = {
        'interactionLabel': 'personalize my payment',
        'interactionValue': 'modal'
    };
    var dataObject = {
        'event': 'nissan-t3-tagging-TrackModalOpen',
        'nissan-t3-tagging': { eventObject }
    };
    window.dataLayer.push(dataObject);
    if (typeof _satellite !== 'undefined') _satellite.track('t3TrackModalOpen', eventObject);
}

document.querySelectorAll('.Apex-srp-btn').forEach(function (element) {
    element.addEventListener('click', nissanApexClickEvent, true);
});

//wait for apex widget to load
document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "complete") {
        document.querySelectorAll('[id$="apexSrpPerMonthFinanceTabHeader"]').forEach(function (element) {
            element.addEventListener('click', nissanApexClickEvent, true);
        });
        document.querySelectorAll('[id$="apexSrpPerMonthLeaseTabHeader"]').forEach(function (element) {
            element.addEventListener('click', nissanApexClickEvent, true);
        });
    }
});