document.addEventListener('DOMContentLoaded', function() {
    // Получаем элемент, в который будем вставлять карусель
    const carouselContainer = document.getElementById('project-carousel');
    
    if (!carouselContainer) return;
    
    // Получаем текущий путь страницы
    const currentPath = window.location.pathname;
    const currentProject = currentPath.split('/').pop();
    
    // Данные о проектах
    const projects = [
        {
            id: 'project13.html',
            title: 'Айдентика фестиваля фридайвинга',
            image: 'images/into30 portfolio/Artboard 1 copy 2hg.png'
        },
        {
            id: 'project14.html',
            title: 'Фирменный стиль «Системный подход»',
            image: 'images/Syspod portfolio/Frame 1.png'
        },
        {
            id: 'project1.html',
            title: 'Лого «ЭшДеш»',
            image: '/images/dash_portfolio/1_Artboard 1 copy 30.png'
        },
         {
            id: 'project7.html',
            title: 'Заметки радиозонда',
            image: 'images/book_radiozond/book_5.png'
        },
        {
            id: 'project8.html',
            title: 'Буклет TwinCoffee',
            image: 'images/twin coffee/twin coffee olozka.png'
        },
         {
            id: 'project2.html',
            title: 'FREEкалендарь 2025',
            image: '/images/free_calendar_portfolio/1_Artboard 1 copy 32.png'
        },
        {
            id: 'project11.html',
            title: 'SHOR шрифт',
            image: 'images/SHORfont/Shor font-01.png'
        },
        {
            id: 'project9.html',
            title: 'Упковка кассеты «КИНО»',
            image: 'images/kino kaseta/shor kino kaseta-01.png'
        },
        {
            id: 'project10.html',
            title: '150-летие Академии им. А.Л.Штиглица',
            image: '/images/150 akademia/150 akad-01.png'
        },
        {
            id: 'project4.html',
            title: 'Упаковка Алтайской продукции',
            image: '/images/altai_molochka_portfolio/Artboard 1 copy 33.png'
        },
        {
            id: 'project5.html',
            title: 'Бумага для упаковки',
            image: '/images/obertka_portfolio/1_Artboard 1 copy 35.png'
        },
        {
            id: 'project6.html',
            title: 'Цифры на 5',
            image: '/images/zifri_na_5_portfolio/1_Artboard 1 copy 34.png'
        },
         {
            id: 'project12.html',
            title: '80-я годовщина Ленинградской школы реставрации',
            image: 'images/infogr Vaganova/infogr vaganova-06.png'
        },
    ];
    
    // Фильтруем проекты, исключая текущий
    const otherProjects = projects.filter(project => project.id !== currentProject);
    
    // Создаем HTML для карусели
    let carouselHTML = `
    <h4 class="mb-4">Другие проекты</h4>
    <div id="projectsCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
    `;
    
    // Добавляем слайды
    otherProjects.forEach((project, index) => {
        const isActive = index === 0 ? 'active' : '';
        carouselHTML += `
        <div class="carousel-item ${isActive}">
            <div class="row">
        `;
        
        // Определяем, сколько проектов показывать в одном слайде (3 на десктопе, меньше на мобильных)
        const projectsPerSlide = 2;
        const sliceEnd = index + projectsPerSlide < otherProjects.length ? index + projectsPerSlide : otherProjects.length;
        
        for (let i = index; i < sliceEnd; i++) {
            if (otherProjects[i]) {
                carouselHTML += `
                <div class="col-md-6 col-sm-6 mb-3 px-0">
                    <a href="${otherProjects[i].id}" class="text-decoration-none">
                        <div class="project-card">
                            <img src="${otherProjects[i].image}" alt="${otherProjects[i].title}" class="img-fluid-carousel">
                            <h5 class="project-title">${otherProjects[i].title}</h5>
                        </div>
                    </a>
                </div>
                `;
            }
        }
        
        carouselHTML += `
            </div>
        </div>
        `;
        
        // Увеличиваем индекс, чтобы следующий слайд начинался с нового набора проектов
        index += projectsPerSlide - 1;
    });
    
    // Добавляем элементы управления каруселью
    carouselHTML += `
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#projectsCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Предыдущий</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#projectsCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Следующий</span>
        </button>
    </div>
    `;
    
    // Вставляем карусель в контейнер
    carouselContainer.innerHTML = carouselHTML;
});
