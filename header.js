document.addEventListener("DOMContentLoaded", function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            initBurgerToggle();
        });
});

// Раскрытие бургер-меню (независимо от Bootstrap JS)
function initBurgerToggle() {
    var toggler = document.querySelector('.navbar-toggler');
    var nav = document.getElementById('navbarNav');
    if (!toggler || !nav) return;

    toggler.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('navbar-collapse-open');
        toggler.setAttribute('aria-expanded', String(isOpen));
        nav.classList.toggle('show', isOpen);
    });

    // Закрытие при переходе по ссылке внутри меню (для мобильных)
    nav.addEventListener('click', function (e) {
        var link = e.target.closest('.nav-link[href]');
        if (link && nav.classList.contains('navbar-collapse-open')) {
            nav.classList.remove('navbar-collapse-open', 'show');
            toggler.setAttribute('aria-expanded', 'false');
        }
    });
}

// Раскрытие панели «Контакты» внутри бургер-меню
document.addEventListener('click', function (e) {
    var toggle = e.target.closest('#navContactsToggle');
    if (toggle) {
        var nav = toggle.closest('.nav-contacts');
        if (!nav) return;
        var isOpen = nav.classList.contains('is-open');
        nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(!isOpen));
    }
});

// Копирование номера из бургер-меню
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.top = '-9999px';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
            document.execCommand('copy');
            resolve();
        } catch (err) {
            reject(err);
        }
        document.body.removeChild(ta);
    });
}

function flashCopiedTitle(btn) {
    var title = btn.querySelector('.nav-contacts__title');
    if (!title) return;
    var prev = title.textContent;
    title.textContent = 'Скопировано!';
    title.style.color = '#2aabee';
    setTimeout(function () {
        title.textContent = prev;
        title.style.color = '';
    }, 1800);
}

document.addEventListener('click', function (e) {
    var btn = e.target.closest('#navCopyPhoneBtn');
    if (!btn) return;
    e.preventDefault();
    var phone = btn.getAttribute('data-phone') || '';
    copyToClipboard(phone).then(function () {
        flashCopiedTitle(btn);
    });
});
