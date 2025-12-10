// Мобильное меню
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Фильтрация курсов
const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        courseCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
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

// Данные курсов (в реальном проекте можно получать с сервера)
const coursesData = {
    1: {
        title: "Флоренция: как один город изменил мир",
        lecturer: "Анна Смирнова",
        format: "6 видеоуроков + PDF-конспект + подборка материалов",
        price: "4 900 ₽",
        description: "Погрузитесь в эпоху Возрождения через призму одного города. Вы узнаете, как Флоренция стала культурным центром Европы, познакомитесь с творчеством Леонардо да Винчи, Микеланджело и Боттичелли, и поймете, как идеи Ренессанса изменили западную цивилизацию. Курс включает эксклюзивные материалы из архивов итальянских музеев."
    },
    2: {
        title: "Кот Шрёдингера для чайников с кофе",
        lecturer: "Дмитрий Волков",
        format: "5 видеоуроков + PDF-конспект + список литературы",
        price: "3 900 ₽",
        description: "Квантовая физика кажется сложной только на первый взгляд. В этом курсе мы разберем основные концепции без сложных формул, через метафоры и аналогии. Вы поймете, что такое суперпозиция, квантовая запутанность и почему кот Шрёдингера одновременно и жив, и мертв. Никаких предварительных знаний не требуется."
    },
    3: {
        title: "От Малевича до Бэнкси: искусство XX-XXI веков",
        lecturer: "Мария Ковалева",
        format: "8 видеоуроков + виртуальная галерея + глоссарий",
        price: "5 900 ₽",
        description: "Курс для тех, кто хочет разбираться в современном искусстве и понимать, что хотел сказать художник. Мы пройдем путь от русского авангарда через поп-арт и концептуализм к стрит-арту и digital-искусству. Вы научитесь 'читать' произведения и понимать их контекст, а также получите инструменты для самостоятельного анализа."
    },
    4: {
        title: "Математика прекрасна: симметрия, числа, гармония",
        lecturer: "Иван Петров",
        format: "7 видеоуроков + набор задач для размышления",
        price: "4 500 ₽",
        description: "Математика — это не только цифры и формулы, но и язык, описывающий красоту мира. В этом курсе мы исследуем математические закономерности в архитектуре, музыке, живописи и природе. Вы узнаете о золотом сечении, числах Фибоначчи, фракталах и симметрии, и начнете видеть математическую гармонию в окружающем мире."
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
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку
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

// Валидация формы
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
        nameInput.style.borderColor = '#e2e8f0';
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
        emailInput.style.borderColor = '#e2e8f0';
    }
    
    // Валидация сообщения
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Пожалуйста, введите ваше сообщение';
        messageInput.style.borderColor = '#e53e3e';
        isValid = false;
    } else {
        messageError.textContent = '';
        messageInput.style.borderColor = '#e2e8f0';
    }
    
    // Если форма валидна, отправляем (здесь можно добавить AJAX-запрос)
    if (isValid) {
        // В реальном проекте здесь был бы fetch или XMLHttpRequest
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        contactForm.reset();
    }
});

// Кнопки "Записаться" на лекции
const lectureButtons = document.querySelectorAll('.lecture-btn');
lectureButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Запись на лекцию временно недоступна. Пожалуйста, свяжитесь с нами через форму обратной связи или в Telegram.');
    });
});

// Кнопка "Купить курс" в модальном окне
const modalBuyButton = document.querySelector('.modal-buy');
if (modalBuyButton) {
    modalBuyButton.addEventListener('click', () => {
        alert('Покупка курса временно недоступна. Пожалуйста, свяжитесь с нами через форму обратной связи или в Telegram.');
        courseModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Изменение стиля шапки при прокрутке
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});
