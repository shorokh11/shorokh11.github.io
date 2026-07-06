document.addEventListener("DOMContentLoaded", function() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});

// Копирование номера телефона в буфер обмена
var copyTooltipTimer = null;

function showCopyTooltip() {
    var tooltip = document.getElementById('copy-phone-tooltip');
    if (!tooltip) return;
    tooltip.classList.add('is-show');
    if (copyTooltipTimer) {
        clearTimeout(copyTooltipTimer);
    }
    copyTooltipTimer = setTimeout(function () {
        tooltip.classList.remove('is-show');
    }, 2500);
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }
    // Фолбэк для старых браузеров / не-HTTPS
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

document.addEventListener('click', function (e) {
    var btn = e.target.closest('#copy-phone-btn');
    if (!btn) return;
    e.preventDefault();
    var phone = btn.getAttribute('data-phone') || '';
    copyToClipboard(phone).then(showCopyTooltip, function () {
        // Даже при ошибке показываем подсказку — номер видно, можно скопировать вручную
        showCopyTooltip();
    });
});
