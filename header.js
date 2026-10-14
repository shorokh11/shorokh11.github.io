// Шапка подгружается из header.html на каждой странице.
// Меню работает само по себе и не зависит от версии Bootstrap.
document.addEventListener("DOMContentLoaded", function () {
    fetch('header.html')
        .then(function (response) { return response.text(); })
        .then(function (data) {
            document.getElementById('header').innerHTML = data;
            markCurrentPage();
            initHeader();
        });
});

function markCurrentPage() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    var isProject = /^project/.test(page);
    document.querySelectorAll('.site-nav__link[href]').forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === page || (isProject && href === 'index.html')) {
            link.classList.add('is-current');
        }
    });
}

function initHeader() {
    var burger = document.getElementById('siteBurger');
    var nav = document.getElementById('siteNav');
    var contacts = document.querySelector('.nav-contacts');
    var contactsToggle = document.getElementById('navContactsToggle');
    if (!burger || !nav) return;

    function setMenu(open) {
        nav.classList.toggle('is-open', open);
        burger.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
        if (!open) setContacts(false);
    }

    function setContacts(open) {
        if (!contacts || !contactsToggle) return;
        contacts.classList.toggle('is-open', open);
        contactsToggle.setAttribute('aria-expanded', String(open));
    }

    burger.addEventListener('click', function () {
        setMenu(!nav.classList.contains('is-open'));
    });

    if (contactsToggle) {
        contactsToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            setContacts(!contacts.classList.contains('is-open'));
        });
    }

    // Клик мимо шапки закрывает меню и контакты
    document.addEventListener('click', function (e) {
        if (e.target.closest('.site-header')) return;
        setMenu(false);
        setContacts(false);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            setMenu(false);
            setContacts(false);
        }
    });

    // При переходе на десктопную ширину мобильное меню сбрасывается
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) setMenu(false);
    });

    var copyBtn = document.getElementById('navCopyPhoneBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var phone = copyBtn.getAttribute('data-phone') || '';
            copyText(phone).then(function () { flashCopiedTitle(copyBtn); });
        });
    }
}

function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.top = '-9999px';
        document.body.appendChild(ta);
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
    title.textContent = 'Скопировано';
    btn.classList.add('is-copied');
    setTimeout(function () {
        title.textContent = prev;
        btn.classList.remove('is-copied');
    }, 1800);
}
