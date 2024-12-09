// Rekening klasse om rekening objecten te beheren
class Rekening {
    constructor(naam, type, saldo = 0) {
        this.id = Date.now().toString(); // Uniek ID genereren
        this.naam = naam;
        this.type = type;
        this.saldo = saldo;
        this.valuta = '€';
    }
}

// Hoofd dashboard klasse
class BankDashboard {
    constructor() {
        // Initialiseer belangrijke DOM elementen
        this.rekeningenContainer = document.getElementById('rekeningen-container');
        this.nieuweRekeningBtn = document.getElementById('nieuwe-rekening-btn');
        this.modalOverlay = document.getElementById('modal-overlay');
        this.rekeningForm = document.getElementById('nieuwe-rekening-form');
        this.rekeningNaamInput = document.getElementById('rekening-naam');
        this.rekeningTypeSelect = document.getElementById('rekening-type');

        // Initiële rekeningen
        this.rekeningen = [
            new Rekening('Betaalrekening', 'Betaalrekening', 2750.45),
            new Rekening('Spaarrekening', 'Spaarrekening', 15500.00),
            new Rekening('Creditcard', 'Creditcard', -750.25)
        ];

        // Bind event listeners
        this.initialiseerEventListeners();

        // Eerste render van rekeningen
        this.renderRekeningen();
    }

    initialiseerEventListeners() {
        // Open nieuwe rekening modal
        this.nieuweRekeningBtn.addEventListener('click', () => {
            this.modalOverlay.classList.remove('hidden');
        });

        // Sluiten van modal
        document.getElementById('modal-annuleren').addEventListener('click', () => {
            this.modalOverlay.classList.add('hidden');
        });

        // Form submission voor nieuwe rekening
        this.rekeningForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.voegRekeningToe();
        });
    }

    // Methode om rekening toe te voegen
    voegRekeningToe() {
        const naam = this.rekeningNaamInput.value.trim();
        const type = this.rekeningTypeSelect.value;

        if (naam === '') {
            alert('Vul een rekeningnaam in');
            return;
        }

        const nieuweRekening = new Rekening(naam, type);
        this.rekeningen.push(nieuweRekening);

        // Verberg modal
        this.modalOverlay.classList.add('hidden');

        // Reset form
        this.rekeningNaamInput.value = '';
        this.rekeningTypeSelect.value = 'Betaalrekening';

        // Render opnieuw
        this.renderRekeningen();
    }

    // Methode om rekeningen te renderen
    renderRekeningen() {
        // Clear huidige container
        this.rekeningenContainer.innerHTML = '';

        // Render elke rekening
        this.rekeningen.forEach(rekening => {
            const rekeningElement = this.maakRekeningElement(rekening);
            this.rekeningenContainer.appendChild(rekeningElement);
        });

        // Voeg 'nieuwe rekening' kaart toe
        this.rekeningenContainer.appendChild(this.maakNieuweRekeningKaart());
    }

    // Hulpmethode om rekening-element te maken
    maakRekeningElement(rekening) {
        const div = document.createElement('div');
        div.className = 'bg-white rounded-lg shadow-md p-5 transition hover:shadow-lg';

        // Bepaal kleur en pictogram op basis van rekeningtype
        const { pictogram, kleur } = this.getRekeningStijl(rekening.type);

        div.innerHTML = `
            <div class="flex items-center mb-3">
                <span class="mr-3 text-2xl">${pictogram}</span>
                <h2 class="text-lg font-semibold">${rekening.naam}</h2>
            </div>
            <div class="text-right">
                <p class="text-2xl font-bold ${rekening.saldo >= 0 ? 'text-green-600' : 'text-red-600'}">
                    ${rekening.valuta} ${Math.abs(rekening.saldo).toFixed(2)}
                </p>
                <p class="text-sm text-gray-500">${rekening.type}</p>
            </div>
        `;

        return div;
    }

    // Hulpmethode om 'nieuwe rekening' kaart te maken
    maakNieuweRekeningKaart() {
        const div = document.createElement('div');
        div.className = 'bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-5 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition';
        div.id = 'nieuwe-rekening-btn';
        div.innerHTML = `
            <div class="text-center">
                <span class="text-4xl mb-2 block">➕</span>
                <p class="text-blue-600 font-semibold">Nieuwe Rekening</p>
            </div>
        `;

        div.addEventListener('click', () => {
            document.getElementById('modal-overlay').classList.remove('hidden');
        });

        return div;
    }

    // Hulpmethode om rekening stijl te bepalen
    getRekeningStijl(type) {
        switch(type) {
            case 'Betaalrekening': 
                return { pictogram: '💳', kleur: 'text-blue-600' };
            case 'Spaarrekening': 
                return { pictogram: '💰', kleur: 'text-green-600' };
            case 'Creditcard': 
                return { pictogram: '💵', kleur: 'text-red-600' };
            default:
                return { pictogram: '💼', kleur: 'text-gray-600' };
        }
    }
}

// Initialiseer dashboard wanneer DOM geladen is
document.addEventListener('DOMContentLoaded', () => {
    new BankDashboard();
});