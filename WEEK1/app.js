// Vooraf ingestelde gebruikers
const users = [
    { username: 'admin', password: 'admin123', name: 'Systeembeheerder' },
    { username: 'john', password: 'doe123', name: 'John Doe' },
    { username: 'jane', password: 'smith456', name: 'Jane Smith' }
];

function validateLogin() {
    // Referenties naar DOM-elementen ophalen
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');
    const loginForm = document.getElementById('loginForm');
    const dashboardSection = document.getElementById('dashboardSection');
    const userNameDisplay = document.getElementById('userNameDisplay');

    // Reset foutmelding
    errorMessage.textContent = '';

    // Zoek gebruiker in de vooraf ingestelde gebruikerslijst
    const user = users.find(u => 
        u.username === usernameInput.value && 
        u.password === passwordInput.value
    );

    if (user) {
        // Succesvol ingelogd
        loginForm.style.display = 'none';
        dashboardSection.style.display = 'block';
        userNameDisplay.textContent = user.name;
    } else {
        // Ongeldige inloggegevens
        errorMessage.textContent = 'Ongeldige gebruikersnaam of wachtwoord';
    }
}

function logout() {
    // Referenties naar DOM-elementen ophalen
    const loginForm = document.getElementById('loginForm');
    const dashboardSection = document.getElementById('dashboardSection');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Reset formulier
    usernameInput.value = '';
    passwordInput.value = '';

    // Toon login, verberg dashboard
    dashboardSection.style.display = 'none';
    loginForm.style.display = 'block';
}