// Request to server

function ajaxReq(requestObject, action) {
    let submitBtn = $('button[type="submit"]'),
        modalTxt = $('#modalTxt')[0],
        remember_me = $('#remember_me')[0],
        response;


    submitBtn.attr('disabled', 'disabled');
    modalPopup(modalTxt, 'Connecting to server, please wait a while');

    $.ajax({
        url: action,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestObject),
        error: function (xhr) {
            response = JSON.parse(xhr.responseText);
            if (xhr.status == 401) {
                modalPopup(modalTxt, 'Session time ended');
                setTimeout(logOut, 2000);
            }

            else if (xhr.status == 404 &&
                response.errorMessage == "User not found") {
                modalPopup(modalTxt, 'Authorization error: ' +
                    'wrong username or password');
            }

            else if (xhr.status == 500 &&
                response.errorMessage == "User already exist") {
                modalPopup(modalTxt, 'User already exist');
            }

            else if (xhr.status == 500) {
                modalPopup(modalTxt, 'Server error: ' + this.status);
            }
            submitBtn.removeAttr('disabled');
        },
        success: function (xhr) {
            response = xhr;

            if (!response.isLocked &&
                response.createdDate) {
                modalPopup(modalTxt, 'Registration successful');
                setTimeout(function () {
                    $('#servMsg').modal('hide');
                    $('#reg-modal').modal('hide');
                    $('#login-modal').modal('show');
                }, 2000);
            }

            else if (response.access_token) {
                if (remember_me.checked) {
                    localStorage.accessToken = response.access_token;
                }
                else {
                    sessionStorage.accessToken = response.access_token;
                }

                modalPopup(modalTxt, 'Authorization successful');

                setTimeout(redir, 2000, 'index.html');
            }
            submitBtn.removeAttr('disabled');
        }
    });
}

function modalPopup(modalTxt, modalMsg) {
    modalTxt.innerHTML = modalMsg;
    $('#servMsg').modal('show');
}

function redir(url) {
    window.location.href = url;
}

$('.logOut').on('click', e => logOut());

function logOut() {
    if (localStorage.accessToken) delete localStorage.accessToken;
    if (sessionStorage.accessToken) delete sessionStorage.accessToken;
    redir('index.html');
}


// Validate registration

$('#reg-form').on('submit', e => {
    e.preventDefault();
    let form = $('#reg-form')[0];
    if (regValidation()) {
        let requestObject = {
            login: form.username.value,
            email: form.email.value,
            password: form.pswd.value
        };
        ajaxReq(requestObject, form.action)
    }
});
$('#login-form').on('submit', e => {
    e.preventDefault();
    let form = $('#login-form')[0];
    if (loginValidation()) {
        let requestObject = {
            login: form.username.value,
            password: form.pswd.value
        };
        ajaxReq(requestObject, form.action);
    }
});
$('#reg-form input, #profile-form input').on('blur', e => {
    regValidation();
});
$('#login-form input').on('blur', e => {
    loginValidation();
});

function regValidation() {

    let validateUserame = function (username) {
        let x = /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[\s._-]?[a-zA-Z0-9]+$/;
        return x.test(username);
    };
    let validateFirstName = function (firstName) {
        let x = /(?=^.{2,20}$)^[A-Z]*[a-zA-Z0-9]*[\s-]?[A-Z][a-zA-Z0-9]+$/;
        return x.test(firstName);
    };
    let validateLastname = function (lastName) {
        let x = /(?=^.{2,20}$)^[A-Z]*[a-zA-Z0-9]*[\s-]?[A-Z][a-zA-Z0-9]+$/;
        return x.test(lastName);
    };
    let validateEmail = function (email) {
        let x = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
        return x.test(email);
    };
    let validateBday = function (bday) {
        let x = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
        return x.test(bday);
    };
    let validatePswd = function (pswd) {
        let x = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return x.test(pswd);
    };

    let result = true, errorMessage,
        username = $('#username')[0],
        firstName = $('#firstName')[0],
        lastName = $('#lastName')[0],
        email = $('#email')[0],
        bday = $('#bday')[0],
        pswd = $('#pswd')[0],
        repswd = $('#repswd')[0],
        terms = $('#terms')[0],

        error = $('#alertErr')[0],
        success = $('#alertSuc')[0];

    if (!validateUserame(username.value)) {
        errorMessage = username.parentNode;
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
        errorMessage = firstName.parentNode;
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
        errorMessage = lastName.parentNode;
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
        errorMessage = email.parentNode;
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
        errorMessage = bday.parentNode;
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
        errorMessage = pswd.parentNode;
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
        errorMessage = repswd.parentNode;
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
            errorMessage = repswd.parentNode;
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

// Login validation

function loginValidation() {

    let validateUserame = function (inputUsername) {
        let x = /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[\s._-]?[a-zA-Z0-9]+$/;
        return x.test(inputUsername);
    };
    let validatePswd = function (inputPassword) {
        let x = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return x.test(inputPassword);
    };

    let result = true, errorMessage,
        username = $('#inputUsername')[0],
        pswd = $('#inputPassword')[0];

    if (!validateUserame(username.value)) {
        errorMessage = username.parentNode;
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
        errorMessage = pswd.parentNode;
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
    return result;
}

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

$('.profileLink').on('click', function () {
    $.ajax({
        url: './templates/profile.html',
        type: 'GET',
        dataType: 'html',

        success: function (data) {
            history.pushState(data, "profile", "#profile");
            $('body').css("display", "none").fadeIn(500);
            $('app').html(data);
        },
    });
    $('html, body').animate({
        scrollTop: $("body").offset().top
    }, 100);
});
$(window).on("load", function(){
    history.pushState({url: 'index'}, "", "/");
});
$(window).on("popstate", function(){
    location.reload();
});