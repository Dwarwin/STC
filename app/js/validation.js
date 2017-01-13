// Request to server registration/login

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

// Validate registration/profile, login forms

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

$('#reg-form input').on('blur', e => {
    regValidation();
});
$('#login-form input').on('blur', e => {
    loginValidation();
});

function invalid (input) {
    let errorMessage = input.parentNode;
    errorMessage.classList.remove('has-success');
    errorMessage.classList.add('has-error');
    $(input).tooltip({
        trigger: 'toggle',
        placement: 'top'
    }).tooltip('hide');
}

function valid (input) {
    let errorMessage = input.parentNode;
    errorMessage.classList.remove('has-error');
    errorMessage.classList.add('has-success');
    $(input).tooltip('destroy')
}

function regValidation() {

    let validateUserame = function (username) {
        let x = /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[\s._-]?[a-zA-Z0-9]+$/;
        return x.test(username);
    },
        validateFirstName = function (firstName) {
        let x = /(?=^.{2,20}$)^[A-Z]*[a-zA-Z0-9]*[\s-]?[A-Z][a-zA-Z0-9]+$/;
        return x.test(firstName);
    },
        validateLastname = function (lastName) {
        let x = /(?=^.{2,20}$)^[A-Z]*[a-zA-Z0-9]*[\s-]?[A-Z][a-zA-Z0-9]+$/;
        return x.test(lastName);
    },
        validateEmail = function (email) {
        let x = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
        return x.test(email);
    },
        validateBday = function (bday) {
        let x = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
        return x.test(bday);
    },
        validatePswd = function (pswd) {
        let x = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return x.test(pswd);
    };

    let result = true,
        username = $('#username')[0],
        firstName = $('#firstName')[0],
        lastName = $('#lastName')[0],
        email = $('#email')[0],
        bday = $('#bday')[0],
        pswd = $('#pswd')[0],
        repswd = $('#repswd')[0],
        terms = $('#terms')[0];

    if (!validateUserame(username.value)) {
        invalid(username);
        result = false;
    } else {
        valid(username)
    }
    if (!validateFirstName(firstName.value)) {
        invalid(firstName);
        result = false;
    } else {
        valid(firstName)
    }
    if (!validateLastname(lastName.value)) {
        invalid(lastName);
        result = false;
    } else {
        valid(lastName)
    }
    if (!validateEmail(email.value)) {
        invalid(email);
        result = false;
    } else {
        valid(email)
    }
    if (!validateBday(bday.value)) {
        invalid(bday);
        result = false;
    } else {
        valid(bday)
    }
    if (!validatePswd(pswd.value)) {
        invalid(pswd);
        result = false;
    } else {
        valid(pswd)
    }
    if (repswd.value != pswd.value || pswd.value == "") {
        invalid(repswd);
        result = false;
    } else {
        valid(repswd)
    }
    if (terms != null) {
        if (!terms.checked) {
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

    let result = true,
        username = $('#inputUsername')[0],
        pswd = $('#inputPassword')[0];

    if (!validateUserame(username.value)) {
        invalid(username);
        result = false;
    } else {
        valid(username)
    }
    if (!validatePswd(pswd.value)) {
        invalid(pswd);
        result = false;
    } else {
        valid(pswd)
    }
    return result;
}

