// import {ValidateAll} from "validationService";

$("form").submit(function () {
    var formData = {};
    var inputs = $('#'+this.id+' '+'input');
    $.each(inputs, function (i, input) {
        formData[input.name] = input.value;
    });
    ValidateAll(formData);
});
