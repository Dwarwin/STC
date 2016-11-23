// Avatar change

$(document).ready(function () {

    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.img-thumbnail').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function () {
        readURL(this);
    });

});

// Request to server

function ajaxReq(requestObject, action, modalTxt) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', action);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(requestObject));

    xhr.onerror = function () {
        modalPopup(modalTxt, 'Server connect error: ' + xhr.status);
    }

    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);

        if (this.status == 401) {
            modalPopup(modalTxt, 'Session time ended');
            setTimeout(logOut, 3000);
        }

        else if (this.status == 404 &&
            response.errorMessage == "User not found") {
            modalPopup(modalTxt, 'Authorization error: ' +
                'wrong username or password');
        }

        else if (this.status == 500 &&
            response.errorMessage == "User already exist") {
            modalPopup(modalTxt, 'User already exist');
        }

        else if (this.status == 500) {
            modalPopup(modalTxt, 'Server error: ' + this.status);
        }

        else if (this.status == 200 && !response.isLocked &&
            response.createdDate) {
            modalPopup(modalTxt, 'Registration successful');

            setTimeout(redir, 3000, 'index.html');
        }

        else if (this.status == 200 && response.access_token) {
            localStorage.acessToken = response.access_token;
            modalPopup(modalTxt, 'Authorization successful');

            setTimeout(redir, 3000, 'index.html');
        }
        ;
    }

}

function modalPopup(modalTxt, modalMsg) {
    modalTxt.innerHTML = modalMsg;
    $('#popup').modal('show');
}

function redir(url) {
    window.location.href = url;
}

function logOut() {
    if (localStorage.acessToken) delete localStorage.acessToken;
    redir('login.html');
}

// Validate registration / change profile

function regSubmit() {
// RegEX validation

    var validateUserame = function (username) {
        var x = /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[\s._-]?[a-zA-Z0-9]+$/;
        return x.test(username);
    }
    var validateFirstName = function (firstName) {
        var x = /(?=^.{2,20}$)^[A-Z]*[a-zA-Z0-9]*[\s-]?[A-Z][a-zA-Z0-9]+$/;
        return x.test(firstName);
    }
    var validateLastname = function (lastName) {
        var x = /(?=^.{2,20}$)^[A-Z]*[a-zA-Z0-9]*[\s-]?[A-Z][a-zA-Z0-9]+$/;
        return x.test(lastName);
    }
    var validateEmail = function (email) {
        var x = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
        return x.test(email);
    }
    var validateBday = function (bday) {
        var x = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
        return x.test(bday);
    }
    var validatePswd = function (pswd) {
        var x = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return x.test(pswd);
    }

    var regForm = document.getElementById('reg-form');
    var modalTxt = document.getElementById("modalTxt");

    var result = true;
    var username = document.getElementById('username');
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var email = document.getElementById('email');
    var sex = document.getElementsByName('sex');
    var bday = document.getElementById('bday');
    var pswd = document.getElementById('pswd');
    var repswd = document.getElementById('repswd');
    var terms = document.getElementById('terms');

    var error = document.getElementById('alertErr');
    var success = document.getElementById('alertSuc');

    if (!validateUserame(username.value)) {
        var errorMessage = username.parentNode;
        errorMessage.classList.remove('has-success');
        errorMessage.classList.add('has-error');
        $(username).tooltip({
            trigger: 'toggle',
            placement: 'top'
        }).tooltip('hide');
        result = false;
    } else {
        errorMessage = username.parentNode;
        errorMessage.classList.remove('has-error');
        errorMessage.classList.add('has-success');
        $(username).tooltip('destroy')
    }
    if (!validateFirstName(firstName.value)) {
        var errorMessage = firstName.parentNode;
        errorMessage.classList.remove('has-success');
        errorMessage.classList.add('has-error');
        $(firstName).tooltip({
            trigger: 'toggle',
            placement: 'top'
        }).tooltip('hide');
        result = false;
    } else {
        errorMessage = firstName.parentNode;
        errorMessage.classList.remove('has-error');
        errorMessage.classList.add('has-success');
        $(firstName).tooltip('destroy')
    }
    if (!validateLastname(lastName.value)) {
        var errorMessage = lastName.parentNode;
        errorMessage.classList.remove('has-success');
        errorMessage.classList.add('has-error');
        $(lastName).tooltip({
            trigger: 'toggle',
            placement: 'top'
        }).tooltip('hide');
        result = false;
    } else {
        errorMessage = lastName.parentNode;
        errorMessage.classList.remove('has-error');
        errorMessage.classList.add('has-success');
        $(lastName).tooltip('destroy')
    }
    if (!validateEmail(email.value)) {
        var errorMessage = email.parentNode;
        errorMessage.classList.remove('has-success');
        errorMessage.classList.add('has-error');
        $(email).tooltip({
            trigger: 'toggle',
            placement: 'top'
        }).tooltip('hide');
        result = false;
    } else {
        errorMessage = email.parentNode;
        errorMessage.classList.remove('has-error');
        errorMessage.classList.add('has-success');
        $(email).tooltip('destroy')
    }
    if (!validateBday(bday.value)) {
        var errorMessage = bday.parentNode;
        errorMessage.classList.remove('has-success');
        errorMessage.classList.add('has-error');
        $(bday).tooltip({
            trigger: 'toggle',
            placement: 'top'
        }).tooltip('hide');
        result = false;
    } else {
        errorMessage = bday.parentNode;
        errorMessage.classList.remove('has-error');
        errorMessage.classList.add('has-success');
        $(bday).tooltip('destroy')
    }
    if (!validatePswd(pswd.value)) {
        var errorMessage = pswd.parentNode;
        errorMessage.classList.remove('has-success');
        errorMessage.classList.add('has-error');
        $(pswd).tooltip({
            trigger: 'toggle',
            placement: 'top'
        }).tooltip('hide');
        result = false;
    } else {
        errorMessage = pswd.parentNode;
        errorMessage.classList.remove('has-error');
        errorMessage.classList.add('has-success');
        $(pswd).tooltip('destroy')
    }
    if (repswd.value != pswd.value || pswd.value == "") {
        var errorMessage = repswd.parentNode;
        errorMessage.classList.remove('has-success');
        errorMessage.classList.add('has-error');
        $(repswd).tooltip({
            trigger: 'toggle',
            placement: 'top'
        }).tooltip('hide');
        result = false;
    } else {
        errorMessage = repswd.parentNode;
        errorMessage.classList.remove('has-error');
        errorMessage.classList.add('has-success');
        $(repswd).tooltip('destroy')
    }
    if (success != null || error != null) {
        if (!result) {
            success.classList.add('hidden');
            error.classList.remove('hidden');
        }

        else {
            error.classList.add('hidden');
            success.classList.remove('hidden');
        }
    }
    if (terms != null) {
        if (!terms.checked) {
            var errorMessage = repswd.parentNode;
            errorMessage.classList.remove('has-success');
            errorMessage.classList.add('has-error');
            $(terms).tooltip({
                trigger: 'toggle',
                placement: 'top',
                title: "Accept terms and conditions"
            }).tooltip('show');
            result = false;
        } else {
            $(terms).tooltip('hide');
        }
    }
    if (result) {
        var requestObject = {
            login: username.value,
            email: email.value,
            password: pswd.value
        };
        ajaxReq(requestObject, regForm.action, modalTxt);

    }
    result = false;
    return result;
}

// Login validation

function logSubmit() {

    var logForm = document.getElementById('login-form');
    var modalTxt = document.getElementById("modalTxt");

    var validateUserame = function (inputUsername) {
        var x = /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[\s._-]?[a-zA-Z0-9]+$/;
        return x.test(inputUsername);
    }
    var validatePswd = function (inputPassword) {
        var x = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return x.test(inputPassword);
    }

    var result = true;
    var username = document.getElementById('inputUsername');
    var pswd = document.getElementById('inputPassword');

    if (!validateUserame(username.value)) {
        var errorMessage = username.parentNode;
        errorMessage.classList.remove('has-success');
        errorMessage.classList.add('has-error');
        $(username).tooltip({
            trigger: 'toggle',
            placement: 'top'
        }).tooltip('hide');
        result = false;
    } else {
        errorMessage = username.parentNode;
        errorMessage.classList.remove('has-error');
        errorMessage.classList.add('has-success');
        $(username).tooltip('destroy')
    }
    if (!validatePswd(pswd.value)) {
        var errorMessage = pswd.parentNode;
        errorMessage.classList.remove('has-success');
        errorMessage.classList.add('has-error');
        $(pswd).tooltip({
            trigger: 'toggle',
            placement: 'top'
        }).tooltip('hide');
        result = false;
    } else {
        errorMessage = pswd.parentNode;
        errorMessage.classList.remove('has-error');
        errorMessage.classList.add('has-success');
        $(pswd).tooltip('destroy')
    }
    if (result) {
        var requestObject = {
            login: username.value,
            password: pswd.value
        };
        ajaxReq(requestObject, logForm.action, modalTxt);

    }
    result = false;
    return result;
}

// Reset Button

$("button[type='reset']").on('click', function () {
    var error = document.getElementById('alertErr');
    var success = document.getElementById('alertSuc');
    var er = document.getElementsByClassName('has-error');
    var suc = document.getElementsByClassName('has-success');
    while (er.length > 0) {
        er[0].classList.remove('has-error');
    }
    while (suc.length > 0) {
        suc[0].classList.remove('has-success');
    }
    error.classList.add('hidden');
    success.classList.add('hidden');
});