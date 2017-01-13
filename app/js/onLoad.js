$(document).ready(function () {

//Preloader+

    let $preloader = $('#page-preloader'),
        $spinner = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');

// UserPanel for logged user

    let regBtn = document.getElementById('regBtn');
    let logBtn = document.getElementById('logBtn');
    let userPanel = document.getElementById('userPanel');
    if (regBtn != null && logBtn != null && userPanel != null) {
        if (localStorage.accessToken || sessionStorage.accessToken && regBtn != null && logBtn != null && userPanel != null) {
            regBtn.classList.add('hidden');
            logBtn.classList.add('hidden');
            userPanel.classList.remove('hidden');
        } else {
            regBtn.classList.remove('hidden');
            logBtn.classList.remove('hidden');
            userPanel.classList.add('hidden');
        }
    }

// Anchor to AboutUs

    $("#aboutUsLink").click(function () {
        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 500);
    });

});