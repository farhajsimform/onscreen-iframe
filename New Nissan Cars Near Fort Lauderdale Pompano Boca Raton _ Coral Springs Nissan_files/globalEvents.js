var linkElements = document.getElementsByTagName('a');

for (var i = 0; i < linkElements.length; i++) {
    if (linkElements[i].classList.contains('callNowClass') || linkElements[i].classList.contains('callNowClass3') || linkElements[i].classList.contains('callNowClass3') ||
        linkElements[i].classList.contains('callNowClass4') || linkElements[i].classList.contains('callNowClass5') || linkElements[i].classList.contains('callNowClass6') ||
        linkElements[i].classList.contains('callNowClass7') || linkElements[i].classList.contains('callNowClass8')) {
        linkElements[i].addEventListener('click', function (el) {
            el = el.currentTarget;
            var eventObject = {
                'clickToCallDepartment': getClickToCallDepartment(el),
                'clickToCallPhone': getClickToCallPhone(el)
            };
            var dataObject = {
                'event': 'nissan-t3-tagging-TrackClickToCall',
                'nissan-t3-tagging': { eventObject }
            };
            window.dataLayer.push(dataObject);
            if (typeof _satellite !== 'undefined') _satellite.track('t3TrackClickToCall', eventObject);
        });
    } else if (linkElements[i].hasAttribute('data-slide')) {
        linkElements[i].addEventListener('click', function (el) {
            el = el.currentTarget;
            var eventObject = {
                'interactionLabel': el.getAttribute('data-slide') + " slide",
                'interactionValue': getCurrentElementCountPosition(el)
            };
            var dataObject = {
                'event': 'nissan-t3-tagging-TrackCarousel',
                'nissan-t3-tagging': { eventObject }
            };
            window.dataLayer.push(dataObject);
            if (typeof _satellite !== 'undefined') _satellite.track('t3TrackCarousel', eventObject)
        });
    } else if (linkElements[i].hasAttribute('data-toggle') && linkElements[i].getAttribute('data-toggle') == "collapse") {
        linkElements[i].addEventListener('click', function (el) {
            el = el.currentTarget;
            var label = getLinkText(el);
            var value = getAccordionValue(el);
            var eventObject = {
                'interactionLabel': label,
                'interactionValue': value
            };
            var dataObject = {
                'event': 'nissan-t3-tagging-TrackAccordion',
                'nissan-t3-tagging': { eventObject }
            };
            window.dataLayer.push(dataObject);
            if (typeof _satellite !== 'undefined') _satellite.track('t3TrackAccordion', eventObject);
        });
    } else if ((linkElements[i].href && !linkElements[i].href.includes("javascript:void") && (linkElements[i].dataset && linkElements[i].dataset.toggle != "modal"))
        || (linkElements[i].classList.contains('btn-cta') && linkElements[i].id != 'primaryButtonPageModalButton')) {
        linkElements[i].addEventListener('click', function (el) {
            el = el.currentTarget;
            var linkText = getLinkText(el);
            var eventObject = {
                'linkText': linkText,
                'linkUrl': el.href
            };
            var dataObject = {
                'event': 'nissan-t3-tagging-TrackLinkClick',
                'nissan-t3-tagging': { eventObject }
            };
            window.dataLayer.push(dataObject);
            if (typeof _satellite !== 'undefined') _satellite.track('t3TrackLinkClick', eventObject);
        });
    }
}

$(".modal").on('shown.bs.modal', function () {
    var eventObject = {
        'interactionLabel': 'quick view',
        'interactionValue': 'modal'
    };
    var dataObject = {
        'event': 'nissan-t3-tagging-TrackModalOpen',
        'nissan-t3-tagging': { eventObject }
    };
    window.dataLayer.push(dataObject);
    if (typeof _satellite !== 'undefined') _satellite.track('t3TrackModalOpen', eventObject);
});

var carouselArrows = document.getElementsByClassName("carousel__control");
for (var i = 0; i < carouselArrows.length; i++) {
    if (carouselArrows[i].classList.contains('carousel__control--next') || carouselArrows[i].classList.contains('carousel__control--prev')) {
        carouselArrows[i].addEventListener('click', function (el) {
            el = el.currentTarget;
            var direction = el.classList.contains('carousel__control--next') ? 'next' : 'prev'
            var eventObject = {
                'interactionLabel': direction + ' slide',
                'interactionValue': getCurrentElementCountPosition(el)
            };
            var dataObject = {
                'event': 'nissan-t3-tagging-TrackCarousel',
                'nissan-t3-tagging': { eventObject }
            };
            window.dataLayer.push(dataObject);
            if (typeof _satellite !== 'undefined') _satellite.track('t3TrackCarousel', eventObject);
        });
    }
}

var carouselIconGroups = document.getElementsByClassName("carousel-indicators");
for (var i = 0; i < carouselIconGroups.length; i++) {
    var carouselQuickIcons = carouselIconGroups[i].children;
    for (var j = 0; j < carouselQuickIcons.length; j++) {
        carouselQuickIcons[j].addEventListener('click', function (el) {
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
        });
    }
}

function getLinkText(el) {
    var parentText = "";
    var linkText = el.innerText;
    if (linkText !== "" && el.hasAttribute("role") && el.getAttribute("role") === 'menuitem') {
        var ancestor = el.parentElement.parentElement.parentElement;
        if (ancestor.localName === "li") {
            parentText = ancestor.innerText.split("\n")[0];
            linkText = parentText + "|" + linkText;
        }
    }
    if (el.children.length > 0 && el.children[0].localName == "img") {
        linkText = el.children[0].alt;
    }
    if (linkText === "" && el.pathname === "/") {
        linkText = el.children[0].localName === "img" ? "logo" : "home";
    }
    return linkText;
}

function getAccordionValue(el) {
    if (el.dataset.loc && el.dataset.loc.indexOf("available inventory:") > -1) {
        var gallery = document.getElementsByClassName("srpVehicleGallery");
        if (gallery.length > 0) {
            el = gallery[0];
            if (el.getAttribute('aria-expanded') === "true") {
                return "expand";
            }
            else {
                return "collapse";
            }
        }
    }

    if (!el.getAttribute('aria-expanded') || el.getAttribute('aria-expanded') === "false") {
        return "expand";
    }
    else {
        return "collapse";
    }
}

function getClickToCallDepartment(el) {
    var department = "";
    if (el.id == 'clickToCallHeaderEvent') {
        department = el.getElementsByTagName('font')[0].innerText;
    } else {
        department = el.parentElement.getElementsByTagName('strong')[0].innerText;
    }
    if (department) {
        department = department.toLowerCase().replace(/:$/g, '');
    }
    return department;
}

function getClickToCallPhone(el) {
    var phone = el.innerText;
    if (el.id == 'clickToCallHeaderEvent') {
        phone = el.getElementsByTagName('span')[0].innerText;
    }
    return phone;
}

function getCurrentElementCountPosition(el) {
    var currentElem = 0;
    var totalElem = 0;
    if (el.classList.contains('carousel__control')) {
        var carouselParent = el.parentElement.parentElement.getElementsByClassName('carousel__inner')[0];
        totalElem = carouselParent.childElementCount;
        var activeItem = carouselParent.getElementsByClassName('active')[0];
        if (activeItem) {
            var currentPosition = activeItem.getAttribute('data-index');
            currentElem = parseInt(currentPosition) + (el.classList.contains('carousel__control--next') ? 2 : 0);
        }
    } else if (el.hasAttribute('data-slide')) {
        var carouselParent = el.parentElement.getElementsByClassName("carousel-inner")[0];
        totalElem = carouselParent.childElementCount;
        for (var i = 0; i < totalElem; i++) {
            if (carouselParent.children[i].classList.contains('active')) {
                currentElem = el.getAttribute('data-slide') === 'next' ? i + 2 : i;
                if (currentElem === 0) {
                    currentElem = totalElem;
                } else if (currentElem > totalElem) {
                    currentElem = 1;
                }
                break;
            }
        }
    }
    return currentElem + "/" + totalElem;
}


// dropdowns
document.querySelectorAll('.stat-dropdown').forEach(function (element) {
    element.addEventListener('change', function (el) {
        var dropdownFilterObject = {
            'searchFilterLabel': el.target.dataset.loc,
            'searchFilterValue': el.target.options[el.target.selectedIndex].text
        }
        window.dataLayer.push({
            'event': 'nissan-t3-tagging-TrackDropDown',
            'nissan-t3-tagging': dropdownFilterObject
        });

        if (typeof _satellite !== 'undefined') _satellite.track("t3TrackDropDown", dropdownFilterObject);
    }, true);
})

//tabs
document.querySelectorAll('a[data-toggle="tab"]').forEach(function (element) {
    element.addEventListener('click', function (el) {

        //we handle vdp detail tabs elsewhere, don't double up
        if (el.target.classList.contains("vehicleDetailTabHeadings")) {
            return;
        }

        var interactionLabel = (el.target.dataset && el.target.dataset.loc) ? el.target.dataset.loc : "";

        var link = el.target.href;
        //special cases for tabs
        if (!interactionLabel) {
            if (link.indexOf('#h_search') > -1) {
                interactionLabel = 'search inventory';
            }
            if (link.indexOf('#dept_') > -1) {
                interactionLabel = 'department filter';
            }
        }

        var tabObject = {
            'interactionLabel': interactionLabel,
            'interactionValue': el.target.text
        }
        window.dataLayer.push(
            {
                'event': 'nissan-t3-tagging-TrackToggle',
                'nissan-t3-tagging': tabObject
            }
        );

        if (typeof _satellite !== 'undefined') _satellite.track("t3TrackToggle", tabObject);
    })
});

document.querySelectorAll('input[name="offerFilter"]').forEach(function (element) {
    element.parentElement.addEventListener('click', function (el) {
        var tabObject = {
            'interactionLabel': 'filter offers',
            'interactionValue': el.target.children[0].value
        }
        window.dataLayer.push(
            {
                'event': 'nissan-t3-tagging-TrackToggle',
                'nissan-t3-tagging': tabObject
            }
        );

        if (typeof _satellite !== 'undefined') _satellite.track("t3TrackToggle", tabObject);
    })
});
