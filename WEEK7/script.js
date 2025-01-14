// Cryptocurrency rates
const cryptoRates = {
    bitcoin: 90000,
    ethereum: 4800,
    litecoin: 250
};

// Handle buy/sell transactions
function handleTransaction(type) {
    const amount = document.getElementById('amount').value;
    const crypto = document.getElementById('crypto-select').value;
    const messageElement = document.getElementById('transaction-message');
    
    // Input validation
    if (amount <= 0) {
        messageElement.textContent = 'Voer een geldig bedrag in.';
        return;
    }

    // Calculate crypto amount
    const cryptoAmount = (amount / cryptoRates[crypto]).toFixed(8);
    
    // Display transaction message
    const message = `Je hebt €${amount}.00 in ${crypto.charAt(0).toUpperCase() + crypto.slice(1)} ${type === 'buy' ? 'geïnvesteerd' : 'verkocht'}.`;
    messageElement.textContent = message;
}

// Update rates display
function updateRates() {
    const rateElements = document.querySelectorAll('.rate-item span');
    let i = 0;
    for (const [crypto, rate] of Object.entries(cryptoRates)) {
        rateElements[i].textContent = `${crypto.charAt(0).toUpperCase() + crypto.slice(1)}: €0.00 (${rate} per eenheid)`;
        i++;
    }
}

// Initialize rates on page load
document.addEventListener('DOMContentLoaded', updateRates);