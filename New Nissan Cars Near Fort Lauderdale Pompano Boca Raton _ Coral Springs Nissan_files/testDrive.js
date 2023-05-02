function setupDates() {
    var dateSelector = document.getElementById("selDate");
    var timeSelector = document.getElementById("selTime");
    DealerHoursUtility.getDateRange(numDays, page, dateSelector, timeSelector);
}

document.addEventListener("DOMContentLoaded", function () {
    var myFormSubmitOptions = {
        leadSource: vehicleType.toUpperCase() == 'USED' ? 300 : 155, /*DEV 20521: Create used test drive lead source for FordDirect program*/
        leadType: vehicleType.toUpperCase() == 'USED' ? 2 : 1,
        vehicleType: vehicleType || "new",
        additionalData: additionalInfo
    };

    DealeronLead.addSubmissionMethod('testdriveSubmit', myFormSubmitOptions);
    DealeronLead.initialize("#testdrive", 'testdriveSubmit');
    var firstNameField = document.getElementById("txtfirst_nameTestDrive");
    if (firstNameField) {
        firstNameField.addEventListener('change', DealeronLead.begin);
    }
    setupDates();

});

function additionalInfo(form) {
    var dateVal = form.selDate.value;
    var timeVal = form.selTime.value;

    var extra = 'Preferred Appointment Date/Time: ' + dateVal + ' ' + timeVal + ';';
    var optOut = form.DoNotSellPersonalInfo;
    if (optOut) {
        extra += ', Do Not Sell Personal Info: ' + optOut.checked;
    }

    var childDealerExists = document.querySelector("[name='ChildDealerId'");
    if (childDealerExists) {
        var dealerName = childDealerExists.options[childDealerExists.selectedIndex].text;
        var dealerId = childDealerExists.value;
        extra += ', ChildDealerName: ' + dealerName + ', ChildDealerId: ' + dealerId;
    }

    return {
        Comments: extra,
        ApptDateTime: dateVal + ' ' + timeVal
    }
}