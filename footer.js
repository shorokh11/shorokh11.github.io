document.addEventListener("DOMContentLoaded", function() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});

// Переключение выпадающего меню контактов по клику
document.addEventListener('click', function (e) {
    var dropdown = e.target.closest('.contact-dropdown');
    if (!dropdown) {
        // клик вне меню — закрыть все
        document.querySelectorAll('.contact-dropdown.is-open')
            .forEach(function (d) { d.classList.remove('is-open'); });
        return;
    }
    var toggle = e.target.closest('.contact-dropdown__toggle');
    if (toggle) {
        e.preventDefault();
        var isOpen = dropdown.classList.contains('is-open');
        document.querySelectorAll('.contact-dropdown.is-open')
            .forEach(function (d) { d.classList.remove('is-open'); });
        if (!isOpen) {
            dropdown.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
        } else {
            toggle.setAttribute('aria-expanded', 'false');
        }
    } else if (e.target.closest('.contact-dropdown__link')) {
        // клик по пункту меню — закрыть меню
        dropdown.classList.remove('is-open');
        var t = dropdown.querySelector('.contact-dropdown__toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
    }
});

// Закрытие меню клавишей Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.contact-dropdown.is-open')
            .forEach(function (d) {
                d.classList.remove('is-open');
                var t = d.querySelector('.contact-dropdown__toggle');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
    }
});
