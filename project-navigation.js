document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигации между проектами
    const navLinks = document.querySelectorAll('.project-navigation a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Сохраняем ссылку для перехода
            const href = this.getAttribute('href');
            
            // Плавная анимация перед переходом
            e.preventDefault();
            
            // Анимация исчезновения текущей страницы
            document.body.style.opacity = 0;
            document.body.style.transition = 'opacity 0.3s ease';
            
            // Переход на новую страницу после анимации
            setTimeout(function() {
                window.location.href = href;
            }, 300);
        });
    });
    
    // Анимация появления страницы при загрузке
    document.body.style.opacity = 0;
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = 1;
    }, 100);
    
    // Автоматическая прокрутка карусели
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        // Инициализация карусели с автоматической прокруткой
        $(carousel).carousel({
            interval: 5000, // Интервал прокрутки в миллисекундах
            pause: 'hover' // Пауза при наведении
        });
    });
    
    // Добавление индикаторов для карусели, если их нет
    carousels.forEach(carousel => {
        if (!carousel.querySelector('.carousel-indicators')) {
            const items = carousel.querySelectorAll('.carousel-item');
            if (items.length > 1) {
                const indicators = document.createElement('ol');
                indicators.className = 'carousel-indicators';
                
                items.forEach((item, index) => {
                    const indicator = document.createElement('li');
                    indicator.setAttribute('data-target', '#' + carousel.id);
                    indicator.setAttribute('data-slide-to', index);
                    if (index === 0) {
                        indicator.className = 'active';
                    }
                    indicators.appendChild(indicator);
                });
                
                carousel.insertBefore(indicators, carousel.firstChild);
            }
        }
    });
});
