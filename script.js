// script.js - Полный файл с функцией фильтрации

// ========== ОСНОВНЫЕ ФУНКЦИИ ==========

// 1. Функция для фильтрации курсов
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            courseCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// 2. Функция для мобильного меню
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Анимация бургер-кнопки
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}


// 4. Функция для модальных окон
function initModals() {
    // Модальное окно для курсов
    const courseBtns = document.querySelectorAll('.course-btn');
    const courseModal = document.getElementById('courseModal');
    const modalClose = courseModal.querySelector('.modal-close');
    const modalBuyBtn = courseModal.querySelector('.modal-buy');
    
    // Модальное окно для лекций
    const lectureBtns = document.querySelectorAll('.lecture-btn');
    const lectureModal = document.getElementById('lectureModal');
    const lectureModalClose = lectureModal.querySelector('.modal-close');
    
    // Данные о курсах (можно вынести в отдельный объект или получать с сервера)
    const coursesData = {
        1: {
            title: 'Стекло и свет: язык витражей',
            lecturer: 'Таисия Воронова',
            format: '6 видео + 3D-тур',
            price: '4 500 ₽',
            description: 'Как читать витражи от Средневековья до наших дней. Техники, символы, история.'
        },
        2: {
            title: 'Квантовая физика для гуманитариев',
            lecturer: 'Марк Белов',
            format: '5 видео + конспекты',
            price: '3 900 ₽',
            description: 'Без формул и сложных вычислений. Принципы, которые меняют взгляд на реальность.'
        },
        3: {
            title: 'Утопия УНОВИСа: искусство для нового мира',
            lecturer: 'Серафима Виленская',
            format: '8 видео + галерея',
            price: '5 900 ₽',
            description: 'Почему самый радикальный художественный эксперимент длился так недолго. От Шагала до Малевича.'
        },
        4: {
            title: 'Геометрия живого: от раковины наутилуса до ДНК',
            lecturer: 'Всеволод Кашин',
            format: '7 видео + задачи',
            price: '4 500 ₽',
            description: 'Золотое сечение и фракталы в природе. Математика красоты вокруг нас.'
        },
        5: {
            title: 'Готические соборы: небеса на земле',
            lecturer: 'Таисия Воронова',
            format: '6 видео + 3D-тур',
            price: '4 800 ₽',
            description: 'Шартр, Кёльн, Париж. Как читать архитектуру как книгу.'
        },
        6: {
            title: 'От Малевича до Бэнкси: искусство XX-XXI веков',
            lecturer: 'Серафима Виленская',
            format: '8 видео + галерея',
            price: '5 900 ₽',
            description: 'Как понимать современное искусство и не чувствовать себя обманутым.'
        }
    };
    
    // Обработчики для кнопок курсов
    courseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course');
            const course = coursesData[courseId];
            
            if (course) {
                document.getElementById('modalTitle').textContent = course.title;
                document.getElementById('modalLecturer').textContent = course.lecturer;
                document.getElementById('modalFormat').textContent = course.format;
                document.getElementById('modalPrice').textContent = course.price;
                document.getElementById('modalDescription').textContent = course.description;
                
                courseModal.style.display = 'flex';
            }
        });
    });
    
    // Обработчики для кнопок лекций
    lectureBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lectureId = this.getAttribute('data-lecture');
            const lectureItem = this.closest('.lecture-item');
            const lectureName = lectureItem.querySelector('h3').textContent;
            const lectureLecturer = lectureItem.querySelector('.lecture-lecturer').textContent;
            const dateDay = lectureItem.querySelector('.date-day').textContent;
            const dateMonth = lectureItem.querySelector('.date-month').textContent;
            const lectureLocation = lectureItem.querySelector('.lecture-location').textContent;
            
            document.getElementById('lectureName').textContent = lectureName;
            document.getElementById('lectureLecturer').textContent = lectureLecturer;
            document.getElementById('lectureDateTime').textContent = `${dateDay} ${dateMonth}, 19:00`;
            document.getElementById('lecturePlace').textContent = lectureLocation.replace('📍', '').trim();
            
            lectureModal.style.display = 'flex';
        });
    });
    
    // Закрытие модальных окон
    function closeModal(modal) {
        modal.style.display = 'none';
    }
    
    modalClose.addEventListener('click', () => closeModal(courseModal));
    lectureModalClose.addEventListener('click', () => closeModal(lectureModal));
    
    // Закрытие при клике вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target === courseModal) {
            closeModal(courseModal);
        }
        if (e.target === lectureModal) {
            closeModal(lectureModal);
        }
    });
    
    // Обработка покупки курса
    modalBuyBtn.addEventListener('click', function() {
        const courseTitle = document.getElementById('modalTitle').textContent;
        alert(`Спасибо за интерес к курсу "${courseTitle}"! Мы свяжемся с вами для оформления покупки.`);
        closeModal(courseModal);
    });
    
    // Обработка формы записи на лекцию
    const lectureForm = document.getElementById('lectureForm');
    if (lectureForm) {
        lectureForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const lectureName = document.getElementById('lectureName').textContent;
            
            alert(`Спасибо, ${name}! Вы записаны на лекцию "${lectureName}". Подтверждение придет на email.`);
            closeModal(lectureModal);
            this.reset();
        });
    }
}

// 5. Функция для валидации формы контактов
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formGroups = this.querySelectorAll('.form-group');
            
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                const error = group.querySelector('.error-message');
                
                if (input.hasAttribute('required') && !input.value.trim()) {
                    error.textContent = input.getAttribute('data-error');
                    isValid = false;
                } else {
                    error.textContent = '';
                    
                    // Валидация email
                    if (input.type === 'email' && input.value.trim()) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value.trim())) {
                            error.textContent = 'Пожалуйста, введите корректный email';
                            isValid = false;
                        }
                    }
                }
            });
            
            if (isValid) {
                const name = document.getElementById('name').value;
                alert(`Спасибо, ${name}! Ваше сообщение отправлено. Мы ответим вам в течение 24 часов.`);
                contactForm.reset();
            }
        });
    }
}

// 6. Функция для плавной прокрутки
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ==========
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем все функции
    initializeFilters();
    initMobileMenu();
    initAudioPlayer();
    initModals();
    initContactForm();
    initSmoothScroll();
    
    // Добавляем класс активной ссылке при прокрутке
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Анимация при загрузке
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
// Обработка изменения размера окна
window.addEventListener('resize', function() {
    // Переинициализация при необходимости
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});
