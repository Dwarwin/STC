$(document).ready(function () {

// Avatar change

    let readURL = function (input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                $('.img-thumbnail').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function () {
        readURL(this);
    });
});

// Reset Button

$("button[type='reset']").on('click', function () {
    let error = document.getElementById('alertErr'),
        success = document.getElementById('alertSuc'),
        er = document.getElementsByClassName('has-error'),
        suc = document.getElementsByClassName('has-success');
    while (er.length > 0) {
        er[0].classList.remove('has-error');
    }
    while (suc.length > 0) {
        suc[0].classList.remove('has-success');
    }
    error.classList.add('hidden');
    success.classList.add('hidden');
});