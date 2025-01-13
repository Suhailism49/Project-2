document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let availableBalance = 760.00;
    let currentPrice = 120.00;
    let ownedUnits = 2;
    let investedAmount = 240.00;

    // Get DOM elements
    const amountInput = document.getElementById('amount');
    const buyButton = document.getElementById('buyButton');
    const sellButton = document.getElementById('sellButton');
    const balanceDisplay = document.getElementById('availableBalance');
    const currentUnitsDisplay = document.getElementById('currentUnits');
    const investmentInfo = document.getElementById('investmentInfo');

    // Update displays
    function updateDisplays() {
        balanceDisplay.textContent = `€${availableBalance.toFixed(2)}`;
        currentUnitsDisplay.textContent = ownedUnits;
        investmentInfo.textContent = `Je hebt €${investedAmount.toFixed(2)} geïnvesteerd in TechCorp.`;
    }

    // Buy functionality
    buyButton.addEventListener('click', function() {
        const amount = parseFloat(amountInput.value);
        const units = Math.floor(amount / currentPrice);
        const totalCost = units * currentPrice;

        if (amount <= 0) {
            alert('Voer een geldig bedrag in.');
            return;
        }

        if (totalCost > availableBalance) {
            alert('Onvoldoende saldo beschikbaar.');
            return;
        }

        availableBalance -= totalCost;
        ownedUnits += units;
        investedAmount += totalCost;
        updateDisplays();
    });

    // Sell functionality
    sellButton.addEventListener('click', function() {
        const amount = parseFloat(amountInput.value);
        const units = Math.floor(amount / currentPrice);

        if (amount <= 0) {
            alert('Voer een geldig bedrag in.');
            return;
        }

        if (units > ownedUnits) {
            alert('Je hebt niet genoeg eenheden om te verkopen.');
            return;
        }

        const totalReturn = units * currentPrice;
        availableBalance += totalReturn;
        ownedUnits -= units;
        investedAmount -= totalReturn;
        updateDisplays();
    });
});