/*
Delete the following after repo split:
numDays, timeType, page, getDateRange, dateChange
*/
/*
field decleration
Year: selYear
Make: selMake
Model: selModel
Trim: selTrim
Date: selDate
Time: selTime

predefined var:
vehicleType
vehicleYear
vehicleMake
vehicleModel
numDays

pages:
EAS

*/
var updating = false;
var timeType;
var isVirtual = false;
function getDealerYear() {

	if (updating) return;
	var reqUrl = "/api/vehicle/";

	if (isVirtual)
		reqUrl += "years-virtual?select=1";
	else {
		if (vehicleType.toUpperCase() == 'USED')
			reqUrl += "years?type=u&select=1";
		else
			reqUrl += "years?type=n&select=1";
	}
	updating = true;
	$.ajax({
		url: reqUrl,
		dataType: 'json',
		success: function (data) {
			fillSelect(data, 'selYear');
			updating = false;
			if ($('#selYear option').length > 0) {
				if (typeof (vehicleYear) !== 'undefined' && vehicleYear != '') {
					$("#selYear option[value='" + vehicleYear + "']").prop('selected', true);
					yearChange();
				}
				else {
					if ($('#selYear option').length == 2) {
						$('#selYear option:eq(1)').prop('selected', true);
						yearChange();
					}
					if (preSelectYear) {
						$('#selYear option:eq(1)').prop('selected', true);
						yearChange();
					}
				}
			}
		}
	});
}

function yearChange(event) {
	//if (updating) return;
	$('#selMake option:eq(0)').prop('selected', true);
	$('#selMake').prop('disabled', true);
	$('#selModel option:eq(0)').prop('selected', true);
	$('#selModel').prop('disabled', true);
	if ($('#selYear').val() == '') return;

	var reqUrl = "/api/vehicle/";
	if (vehicleType.toUpperCase() == 'USED')
		reqUrl += "used-makes";
	else
		reqUrl += "new-makes";
	reqUrl += "?year=" + $('#selYear').val() + "&select=1";
	updating = true;
	$.ajax({
		url: reqUrl,
		dataType: 'json',
		success: function (data) {
			fillSelect(data, 'selMake');
			updating = false;
			if ($('#selMake option').length > 0) {
				if (typeof (vehicleMake) !== 'undefined' && vehicleMake != '') {
					$("#selMake option[value='" + vehicleMake + "']").prop('selected', true);
					makeChange();
				}
				else {
					if (preSelectMake) {
						$('#selMake option:eq(1)').prop('selected', true);
						makeChange();
					}
					if ($('#selMake option').length == 2) {
						$('#selMake option:eq(1)').prop('selected', true);
						makeChange();
					}
				}
				$('#selMake').prop('disabled', false);
			}
		}
	});
}

function getVehicleMakes() {
	$('#selMake option:eq(0)').prop('selected', true);
	$('#selMake').prop('disabled', true);
	$('#selModel option:eq(0)').prop('selected', true);
	$('#selModel').prop('disabled', true);

	var reqUrl = "/api/vehicle/";
	if (vehicleType.toUpperCase() == 'USED')
		reqUrl += "used-makes";
	else
		reqUrl += "new-makes";

	reqUrl += "?year=" + $('#selYear').val() + "&select=1";

	updating = true;
	$.ajax({
		url: reqUrl,
		dataType: 'json',
		success: function (data) {
			fillSelect(data, 'selMake');
			updating = false;
			if ($('#selMake option').length > 0) {
				$('#selMake').prop('disabled', false);
			}
		}
	});
}

function makeChange() {
	if (updating) return;
	$('#selModel option:eq(0)').prop('selected', true);
	$('#selModel').prop('disabled', true);
	if ($('#selMake').val() == '') return;

	var reqUrl = "/api/vehicle/";
	if (isVirtual)
		reqUrl += "new-virtual-models";
	else {
		if (vehicleType.toUpperCase() == 'USED')
			reqUrl += "used-models";
		else
			reqUrl += "new-models";
	}
	reqUrl += "?year=" + $('#selYear').val() + "&make=" + $('#selMake').val() + "&select=1";
	updating = true;
	$.ajax({
		url: reqUrl,
		dataType: 'json',
		success: function (data) {
			fillSelect(data, 'selModel');
			updating = false;
			if (parseInt($('#selModel option').length) > 0) {
				if (typeof (vehicleModel) !== 'undefined' && vehicleModel != '')
					$("#selModel option[value='" + vehicleModel + "']").prop('selected', true);
				if ($('#selModel option').length == 2)
					$("#selModel option[value='" + vehicleModel + "']").prop('selected', true);

				$('#selModel').prop('disabled', false);
			}
		}
	});
}
function modelPhotoChange() {
	//The content of this method was removed because this method does not appear to be called from anywhere (7/11/2022).
}

function getDateRange() {
	var reqUrl = "/api/dealership/dates?num=" + numDays + "&page=" + page;
	updating = true;
	$.ajax({
		url: reqUrl,
		dataType: 'json',
		success: function (data) {
			fillSelect(data, 'selDate');
			if ($('#selDate option').length > 0) {
				$('#selDate option:eq(1)').prop('selected', true);
				dateChange();
			}
		}
	});
}
function dateChange() {
	if ($('#selDate').val() == '') {
		$('#selTime option:eq(0)').prop('selected', true);
		$('#selTime').prop('disabled', true);
		return;
	}

	var reqUrl = "/api/dealership/times?type=" + timeType + "&date=" + $('#selDate').val();
	if (typeof appointmentIntervalMinutes !== 'undefined' && appointmentIntervalMinutes) {
		reqUrl += "&interval=" + appointmentIntervalMinutes;
	}
	$('#selTime option:eq(0)').prop('selected', true);
	$('#selTime').prop('disabled', true);

	$.ajax({
		url: reqUrl,
		dataType: 'json',
		success: function (data) {
			fillSelect(data, 'selTime');
			$('#selTime').prop('disabled', false);
		}
	});
}

//________________________ REF DATA _____________________________

function getRefYear() {
	var reqUrl = "/api/vehicle/years-ref?";
	if (vehicleMake == 'Lamborghini') reqUrl += "make=Lamborghini";

	updating = true;
	$.ajax({
		url: reqUrl,
		dataType: 'json',
		success: function (data) {
			fillSelect(data, 'selYear');
			updating = false;
			if ($('#selYear option').length > 0) {
				if (typeof (vehicleYear) !== 'undefined' && vehicleYear != '') {
					$("#selYear option[value='" + vehicleYear + "']").prop('selected', true);
					refYearChange();
				}
				else {
					if ($('#selYear option').length == 2) {
						$('#selYear option:eq(1)').prop('selected', true);
						refYearChange();
					}
					if (preSelectYear) {
						$('#selYear option:eq(1)').prop('selected', true);
						refYearChange();
					}
				}
			}
		}
	});
}

function refYearChange() {
	if (updating) return;

	$('#selMake option:eq(0)').prop('selected', true);
	$('#selMake').prop('disabled', true);
	$('#selModel option:eq(0)').prop('selected', true);
	$('#selModel').prop('disabled', true);
	if ($('#selTrim').length > 0) {
		$('#selTrim option:eq(0)').prop('selected', true);
		$('#selTrim').prop('disabled', true);
	}
	if ($('#selYear').val() == '') return;

	var reqUrl = "/api/vehicle/";
	if (vehicleMake == 'Lamborghini')
		reqUrl += "new-makes";
	else
		reqUrl += "ref-makes";
	reqUrl += "?year=" + $('#selYear').val() + "&select=1";

	updating = true;
	$.ajax({
		url: reqUrl,
		dataType: 'json',
		success: function (data) {
			fillSelect(data, 'selMake');
			updating = false;
			if ($('#selMake').length > 0) {
				if (vehicleMake != '') {
					$("#selMake option[value='" + vehicleMake + "']").prop('selected', true);
					refMakeChange();
				}
				else {
					if (preSelectMake) {
						$('#selMake option:eq(1)').prop('selected', true);
					} else {
						$('#selMake option:eq(0)').prop('selected', true);
					}
				}
				$('#selMake').prop('disabled', false);
			}
		}
	});
}


function getRefMake() {
	//if (updating) return;

	$('#selMake option:eq(0)').prop('selected', true);
	$('#selMake').prop('disabled', true);
	$('#selModel option:eq(0)').prop('selected', true);
	$('#selModel').prop('disabled', true);
	if ($('#selTrim').length > 0) {
		$('#selTrim option:eq(0)').prop('selected', true);
		$('#selTrim').prop('disabled', true);
	}


	var reqUrl = "/api/vehicle/";
	if (vehicleMake == 'Lamborghini')
		reqUrl += "new-makes";
	else
		reqUrl += "ref-makes";
	reqUrl += "?year=" + $('#selYear').val() + "&select=1";

	updating = true;
	$.ajax({
		url: reqUrl,
		dataType: 'json',
		success: function (data) {
			fillSelect(data, 'selMake');
			updating = false;
			// var tmpNum=$('#selMake').length
			// if (tmpNum > 0) {
			$('#selMake').prop('disabled', false);
			// }
		}
	});

	if ($('#selBodyStyle').length > 0)
		getRefBodyStyle();
}

function refMakeChange() {
	if (updating) return;
	$('#selModel option:eq(0)').prop('selected', true);
	$('#selModel').prop('disabled', true);
	if ($('#selTrim').length > 0) {
		$('#selTrim option:eq(0)').prop('selected', true);
		$('#selTrim').prop('disabled', true);
	}
	if ($('#selMake').val() == '') return;

	var reqUrl = "/api/vehicle/ref-models";
	reqUrl += "?year=" + $('#selYear').val() + "&make=" + $('#selMake').val() + "&select=1";

	updating = true;
	$.ajax({
		url: reqUrl,
		dataType: 'json',
		success: function (data) {
			fillSelect(data, 'selModel');
			updating = false;
			if ($('#selModel option').length > 0) {
				if (vehicleModel != '')
					$("#selModel option[value='" + vehicleModel + "']").prop('selected', true);
				else {
					if (preSelectModel) {
						$('#selModel option:eq(1)').prop('selected', true);
						if ($('#selTrim').length > 0) refModelChange();
					}
				}
				$('#selModel').prop('disabled', false);
			}
		}
	});
}

function refModelChange() {
	if (updating) return;
	$('#selTrim option:eq(0)').prop('selected', true);
	$('#selTrim').prop('disabled', true);
	if ($('#selModel').val() == '') return;

	var reqUrl = "/api/vehicle/ref-trims?to=1";
	reqUrl += "&year=" + $('#selYear').val() + "&make=" + $('#selMake').val() + "&model=" + $('#selModel').val();
	$.ajax({
		url: reqUrl,
		dataType: 'json',
		success: function (data) {
			fillSelect(data, 'selTrim');
			updating = false;
			$('#selTrim').prop('disabled', false);
		}
	});
}

function getRefBodyStyle() {
	// if (updating) return; 
	$('#selBodyStyle option:eq(0)').prop('selected', true);
	$('#selBodyStyle').prop('disabled', true);

	var reqUrl = "/api/vehicle/ref-bodystyles?select=1";
	if ($('#selMake').val() != '' && $('#selMake').val() != null)
		reqUrl += "&make=" + $('#selMake').val();
	if ($('#selModel').val() != '' && $('#selModel').val() != null)
		reqUrl += "&model=" + $('#selModel').val();

	$.ajax({
		url: reqUrl,
		dataType: 'json',
		success: function (data) {
			fillSelect(data, 'selBodyStyle');
			updating = false;
			$('#selBodyStyle').prop('disabled', false);
		}
	});
}


//_______________________________________________________________

function fillSelect(namevalue, controlId) {
	if (oSelect = document.getElementById(controlId)) {
		var content = '';
		for (var i = oSelect.length - 1; i >= 0; i--) {
			oSelect.options[i] = null;
		}
		for (var i = 0; i < namevalue.length; i++) {
			if (namevalue[i].value == undefined) {
				oSelect.options[oSelect.length] = new Option(namevalue[i].name);
				content += namevalue[i].name + self.delimiter + namevalue[i].name + self.delimiter;
			}
			else {
				opt = new Option(namevalue[i].name, namevalue[i].value);
				oSelect.options[oSelect.length] = opt;
				content += namevalue[i].name + self.delimiter + namevalue[i].value + self.delimiter;
			}
		}
		if (content.substr(content.length - 1, 1) == self.delimiter) {
			content = content.substr(0, content.length - 1);
		}
		if (oHidden = document.getElementById(self.hiddenId)) {
			oHidden.value = content;
		}
		if (oSelect.selectedIndex > -1) {
			if (oSelect.fireEvent) {
				oSelect.fireEvent('onchange');
			}
			else if (oSelect.dispatchEvent) {
				var oEvent = document.createEvent('HTMLEvents');
				oEvent.initEvent('change', true, true);
				oSelect.dispatchEvent(oEvent);
			}
		}
	}
}