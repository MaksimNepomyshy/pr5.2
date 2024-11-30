const loginButton = document.querySelector('.button-login');
const authModal = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginInput = document.getElementById('login');
const loginError = document.getElementById('loginError');
const userName = document.querySelector('.user-name');
const buttonAuth = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const loginForm = document.getElementById('logInForm');
const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('passwordError');
let authModalIsOpen = false;


function showAuthModal() {
    authModal.style.display = 'block';
    authModalIsOpen = true;
    document.body.style.overflow = 'hidden'; // Приховуємо прокрутку
}


function closeAuthModal() {
    authModal.style.display = 'none';
    loginInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
    loginError.style.display = 'none';
    passwordError.style.display = 'none';
    loginInput.value = '';
    passwordInput.value = '';
    authModalIsOpen = false;
    document.body.style.overflow = ''; // Повертаємо прокрутку
}


function authorize(login) {
    closeAuthModal();
    localStorage.setItem('userName', login);
    userName.textContent = login;
    userName.style.display = 'inline';
    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'inline';
}

function logout() {
    localStorage.removeItem('userName');
    userName.textContent = '';
    userName.style.display = 'none';
    buttonAuth.style.display = 'inline';
    buttonOut.style.display = 'none';
}


function checkAuth() {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
        authorize(storedUserName);
    }
}


loginButton.addEventListener('click', (event) => {
    event.preventDefault();

    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();

    if (!login) {
        loginInput.style.borderColor = 'red';
        loginError.style.display = 'block';
    }

    if (!password) {
        passwordInput.style.borderColor = 'red';
        passwordError.style.display = 'block';
    }

    if (!login || !password) {
        return;
    }

    authorize(login);
});

buttonAuth.addEventListener('click', showAuthModal);
buttonOut.addEventListener('click', logout);
closeAuth.addEventListener('click', closeAuthModal);

// Обробник кліків на window для закриття модального вікна
window.addEventListener('click', (event) => {
    if (authModalIsOpen && event.target === authModal) {
        closeAuthModal();
    }
});


document.addEventListener('DOMContentLoaded', checkAuth);