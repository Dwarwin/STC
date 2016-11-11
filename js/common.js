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

function onFormSubmit() {

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
    return result;
}