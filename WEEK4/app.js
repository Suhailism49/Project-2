const form = document.getElementById('transfer-form');
const fromAccount = document.getElementById('from-account');
const amount = document.getElementById('amount');
const toAccount = document.getElementById('to-account');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Controleer of het saldo toereikend is
  if (getBalance(fromAccount.value) < parseFloat(amount.value)) {
    alert('Onvoldoende saldo op de gekozen rekening.');
    return;
  }

  // Voer de overschrijving uit
  transferFunds(fromAccount.value, toAccount.value, parseFloat(amount.value));

  // Geef visuele feedback
  showSuccessMessage();
});

function getBalance(account) {
  // Code om het saldo op te halen
  // Vervang dit met je eigen logica
  return account === 'checking' ? 1000 : 5000;
}

function transferFunds(from, to, amount) {
  // Code om daadwerkelijk geld over te schrijven
  // Vervang dit met je eigen logica
  console.log(`${amount} overgeschreven van ${from} naar ${to}`);
}

function showSuccessMessage() {
  const successMessage = document.createElement('div');
  successMessage.classList.add('success-message');
  successMessage.textContent = 'Overschrijving succesvol!';

  // Voeg een afbeelding toe
  const image = document.createElement('img');
  image.src = 'success.png';
  image.alt = 'Succesbericht';
  successMessage.appendChild(image);

  document.body.appendChild(successMessage);

  // Verwijder het bericht na 5 seconden
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
}