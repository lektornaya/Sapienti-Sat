document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Тень при скролле
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
// Фильтрация курсов
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Показываем/скрываем карточки в зависимости от фильтра
            courseCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Мобильное меню
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Закрытие мобильного меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
});
    
    // Модальное окно для курсов
    const courseButtons = document.querySelectorAll('.course-btn');
    const courseModal = document.getElementById('courseModal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modalTitle');
    const modalLecturer = document.getElementById('modalLecturer');
    const modalFormat = document.getElementById('modalFormat');
    const modalPrice = document.getElementById('modalPrice');
    const modalDescription = document.getElementById('modalDescription');
    
    const coursesData = {
        1: {
            title: "Стекло и свет: магия средневековых витражей",
            lecturer: "Анна Смирнова",
            format: "6 видеоуроков + PDF-конспект + подборка материалов",
            price: "4 900 ₽",
            description: "Погрузитесь в мир средневековых витражей и узнайте, как цветные окна соборов стали \"библией для неграмотных\". Вы научитесь читать символику витражей Шартра, Кёльна и Парижа, поймете технологии создания и символику цветов."
        },
        2: {
            title: "Кот Шрёдингера для чайников с кофе",
            lecturer: "Дмитрий Волков",
            format: "5 видеоуроков + PDF-конспект + список литературы",
            price: "3 900 ₽",
            description: "Квантовая физика кажется сложной только на первый взгляд. В этом курсе мы разберем основные концепции без сложных формул, через метафоры и аналогии. Вы поймете, что такое суперпозиция, квантовая запутанность и почему кот Шрёдингера одновременно и жив, и мертв."
        },
        3: {
            title: "Утопия УНОВИСа: искусство для нового мира",
            lecturer: "Мария Ковалева",
            format: "8 видеоуроков + виртуальная галерея + глоссарий",
            price: "5 900 ₽",
            description: "Курс посвящен самому радикальному художественному эксперименту XX века. Вы узнаете, как Витебск на 3 года стал столицей мирового авангарда, почему УНОВИС просуществовал так недолго, и как идеи Малевича, Лисицкого и Поповой изменили искусство."
        },
        4: {
            title: "Геометрия живого: от раковины наутилуса до ДНК",
            lecturer: "Иван Петров",
            format: "7 видеоуроков + набор задач для размышления",
            price: "4 500 ₽",
            description: "Математика — это язык природы. В этом курсе мы исследуем математические закономерности в живых организмах: золотое сечение в раковинах, фракталы в деревьях, симметрию в кристаллах и спирали в ДНК. Вы начнете видеть математическую гармонию вокруг себя."
        },
        5: {
            title: "Шартр, Кёльн, Париж: витражи как голос соборов",
            lecturer: "Анна Смирнова",
            format: "5 видеоуроков + интерактивные карты + глоссарий",
            price: "4 700 ₽",
            description: "Виртуальное путешествие по великим готическим соборам Европы. Вы узнаете, как архитектура света создавала особую атмосферу, какие истории рассказывают витражи и как \"читать\" архитектурные символы."
        },
        6: {
            title: "От Малевича до Бэнкси: искусство XX-XXI веков",
            lecturer: "Мария Ковалева",
            format: "8 видеоуроков + виртуальная галерея + список для чтения",
            price: "5 900 ₽",
            description: "Как понимать современное искусство и не чувствовать себя обманутым. От русского авангарда через поп-арт и концептуализм к стрит-арту и digital-искусству. Вы получите инструменты для анализа и начнете видеть смысл там, где раньше видели только эпатаж."
        }
    };
    
    // Открытие модального окна с информацией о курсе
    courseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const courseId = button.getAttribute('data-course');
            const course = coursesData[courseId];
            
            if (course) {
                modalTitle.textContent = course.title;
                modalLecturer.textContent = course.lecturer;
                modalFormat.textContent = course.format;
                modalPrice.textContent = course.price;
                modalDescription.textContent = course.description;
                
                courseModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Закрытие модального окна
    modalClose.addEventListener('click', () => {
        courseModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', (e) => {
        if (e.target === courseModal) {
            courseModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Кнопка "Купить курс" в модальном окне
    const modalBuyButton = document.querySelector('.modal-buy');
    if (modalBuyButton) {
        modalBuyButton.addEventListener('click', () => {
            alert('Спасибо за интерес к курсу! В ближайшее время с вами свяжется наш менеджер для оформления заказа.');
            courseModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Аудиоплеер для подкастов
    const playButtons = document.querySelectorAll('.play-btn');
    const audioPlayer = document.getElementById('audioPlayer');
    const mainAudio = document.getElementById('mainAudio');
    const currentTrack = document.getElementById('currentTrack');
    const nowPlayingTitle = document.getElementById('nowPlayingTitle');
    
    const podcasts = {
        'podcast1.mp3': 'Зачем взрослым учиться?',
        'podcast2.mp3': 'Соборы как космос',
        'podcast3.mp3': 'Квантовая поэзия',
        'podcast4.mp3': 'Черный квадрат и белые пятна'
    };
    
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const audioFile = button.getAttribute('data-audio');
            const podcastTitle = button.closest('.podcast-item').querySelector('h3').textContent;
            
            mainAudio.src = `audio/${audioFile}`;
            currentTrack.textContent = podcastTitle;
            audioPlayer.style.display = 'block';
            
            // Воспроизведение
            mainAudio.play();
            
            // Прокрутка к плееру
            audioPlayer.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Модальное окно для записи на лекции
    const lectureButtons = document.querySelectorAll('.lecture-btn');
    const lectureModal = document.getElementById('lectureModal');
    const lectureClose = lectureModal.querySelector('.modal-close');
    const lectureModalTitle = document.getElementById('lectureModalTitle');
    const lectureName = document.getElementById('lectureName');
    const lectureLecturer = document.getElementById('lectureLecturer');
    const lectureDateTime = document.getElementById('lectureDateTime');
    const lecturePlace = document.getElementById('lecturePlace');
    const lectureForm = document.getElementById('lectureForm');
    
    const lecturesData = {
        1: {
            name: "Искусство смотреть архитектуру",
            lecturer: "Мария Ковалева",
            datetime: "25 ноября, 19:00",
            place: "Конференц-зал 'Набережная'"
        },
        2: {
            name: "Загадки квантового мира",
            lecturer: "Дмитрий Волков",
            datetime: "2 декабря, 18:30",
            place: "Лофт 'Книги и кофе'"
        },
        3: {
            name: "Почему мы до сих пор читаем Достоевского?",
            lecturer: "Анна Смирнова",
            datetime: "10 декабря, 19:00",
            place: "Библиотека 'Литературная'"
        }
    };
    
    lectureButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lectureId = button.getAttribute('data-lecture');
            const lecture = lecturesData[lectureId];
            
            if (lecture) {
                lectureName.textContent = lecture.name;
                lectureLecturer.textContent = lecture.lecturer;
                lectureDateTime.textContent = lecture.datetime;
                lecturePlace.textContent = lecture.place;
                
                lectureModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Закрытие модального окна лекций
    lectureClose.addEventListener('click', () => {
        lectureModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Закрытие при клике вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target === lectureModal) {
            lectureModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Отправка формы записи на лекцию
    lectureForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Простая валидация
        const inputs = lectureForm.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e53e3e';
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (isValid) {
            // Здесь должна быть отправка на сервер
            alert('Спасибо за запись! Мы отправили вам подтверждение на email.');
            lectureForm.reset();
            lectureModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            alert('Пожалуйста, заполните обязательные поля');
        }
    });
    
    // Валидация формы обратной связи
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Функция валидации email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Обработка отправки формы
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Валидация имени
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Пожалуйста, введите ваше имя';
            nameInput.style.borderColor = '#e53e3e';
            isValid = false;
        } else {
            nameError.textContent = '';
            nameInput.style.borderColor = '#ddd';
        }
        
        // Валидация email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Пожалуйста, введите ваш email';
            emailInput.style.borderColor = '#e53e3e';
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = 'Пожалуйста, введите корректный email';
            emailInput.style.borderColor = '#e53e3e';
            isValid = false;
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = '#ddd';
        }
        
        // Валидация сообщения
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Пожалуйста, введите ваше сообщение';
            messageInput.style.borderColor = '#e53e3e';
            isValid = false;
        } else {
            messageError.textContent = '';
            messageInput.style.borderColor = '#ddd';
        }
        
        // Если форма валидна, отправляем (симуляция)
        if (isValid) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            // Симуляция отправки
            setTimeout(() => {
                alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1000);
        }
    });
});
