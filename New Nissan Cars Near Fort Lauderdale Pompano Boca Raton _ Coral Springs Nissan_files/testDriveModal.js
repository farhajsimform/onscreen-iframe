"use strict";
var TestDriveModal = (function () {
    function TestDriveModal() {
        this.addVehicleProperties();
    }
    TestDriveModal.prototype.addVehicleProperties = function () {
        $('#testDriveModal').on('shown.bs.modal', function (event) {
            var element = event.relatedTarget;
            var modal = $(this);
            if (element.dataset.make) {
                modal.find("[name='VehicleMake']").val(element.dataset.make);
            }
            if (element.dataset.model) {
                modal.find("[name='VehicleModel']").val(element.dataset.model);
            }
            if (element.dataset.year) {
                modal.find("[name='VehicleYear']").val(element.dataset.year);
            }
            if (element.dataset.vin) {
                modal.find("[name='Vin']").val(element.dataset.vin);
            }
            if (element.dataset.stocknumber) {
                modal.find("[name='StockNumber']").val(element.dataset.stocknumber);
            }
            if (element.dataset.stock) {
                modal.find("[name='StockNumber']").val(element.dataset.stock);
            }
            if (element.dataset.photo) {
                modal.find('[inventory-info="modelphoto"]').attr("src", element.dataset.photo);
            }
            if (this.querySelector('input[name="ctaName"]')) {
                this.querySelector('input[name="ctaName"]').value = element.innerText;
            }
        });
    };
    return TestDriveModal;
}());
DoUtility.SelfInstantiateOnLoad(TestDriveModal);
