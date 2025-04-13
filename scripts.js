// Базовый JavaScript для управления навигацией и других элементов

document.addEventListener('DOMContentLoaded', function() {
    // Пример: добавление активного класса к текущей ссылке навигации
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Загрузка хидера и футера
    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        });

    fetch('/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
});
