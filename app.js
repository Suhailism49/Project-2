// Constanten voor applicatie configuratie
const CONFIG = {
    DEFAULT_SECTION: 'home',
    SECTIONS: ['home', 'rekeningen', 'overschrijvingen'],
    STORAGE_KEY: 'bankingAppState'
};

// State management
class AppState {
    constructor() {
        this.currentSection = CONFIG.DEFAULT_SECTION;
        this.userPreferences = this.loadUserPreferences();
    }

    // Laad gebruikersvoorkeuren uit localStorage
    loadUserPreferences() {
        const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }

    // Sla gebruikersvoorkeuren op in localStorage
    saveUserPreferences() {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.userPreferences));
    }

    // Update huidige sectie
    setCurrentSection(sectionId) {
        if (CONFIG.SECTIONS.includes(sectionId)) {
            this.currentSection = sectionId;
            this.userPreferences.lastSection = sectionId;
            this.saveUserPreferences();
        }
    }
}

// UI Controller
class UIController {
    constructor(appState) {
        this.appState = appState;
        this.initializeEventListeners();
    }

    // Initialiseer event listeners
    initializeEventListeners() {
        // Navigatie menu clicks
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('href').substring(1);
                this.showSection(sectionId);
            });
        });

        // Voeg hier meer event listeners toe voor toekomstige functionaliteit
    }

    // Toon geselecteerde sectie
    showSection(sectionId) {
        // Update state
        this.appState.setCurrentSection(sectionId);

        // Update UI
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.updateActiveNavigation(sectionId);
        }
    }

    // Update actieve navigatie status
    updateActiveNavigation(sectionId) {
        document.querySelectorAll('.nav-list a').forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Toon laad indicator
    showLoader() {
        // Implementeer een laad indicator voor toekomstige asynchrone operaties
        console.log('Loading...');
    }

    // Verberg laad indicator
    hideLoader() {
        console.log('Loading complete');
    }

    // Toon foutmelding
    showError(message) {
        console.error('Error:', message);
        // Implementeer gebruikersvriendelijke foutmeldingen
    }
}

// Rekeningen Controller
class RekeningenController {
    constructor() {
        // Voorbeelddata voor rekeningen
        this.rekeningen = [];
    }

    // Laad rekeningen data
    loadRekeningen() {
        // Hier komt de logica voor het laden van rekeningen
        // Dit zal in de toekomst een API call worden
        this.rekeningen = [
            { id: 1, type: 'Betaalrekening', saldo: 1000.00 },
            { id: 2, type: 'Spaarrekening', saldo: 5000.00 }
        ];
    }

    // Haal rekening saldo op
    getSaldo(rekeningId) {
        const rekening = this.rekeningen.find(r => r.id === rekeningId);
        return rekening ? rekening.saldo : 0;
    }
}

// Overschrijvingen Controller
class OverschrijvingenController {
    constructor() {
        this.overschrijvingen = [];
    }

    // Valideer overschrijving
    validateOverschrijving(van, naar, bedrag) {
        if (!van || !naar) {
            throw new Error('Selecteer een geldig rekeningnummer');
        }
        
        if (isNaN(bedrag) || bedrag <= 0) {
            throw new Error('Voer een geldig bedrag in');
        }

        return true;
    }

    // Maak nieuwe overschrijving
    createOverschrijving(van, naar, bedrag) {
        if (this.validateOverschrijving(van, naar, bedrag)) {
            const overschrijving = {
                id: Date.now(),
                van,
                naar,
                bedrag,
                datum: new Date(),
                status: 'pending'
            };
            
            this.overschrijvingen.push(overschrijving);
            return overschrijving;
        }
    }
}

// App initialisatie
document.addEventListener('DOMContentLoaded', () => {
    // Creëer instances van alle controllers
    const appState = new AppState();
    const ui = new UIController(appState);
    const rekeningen = new RekeningenController();
    const overschrijvingen = new OverschrijvingenController();

    // Initiële setup
    ui.showSection(appState.currentSection);
    rekeningen.loadRekeningen();

    // Maak controllers globaal beschikbaar voor debugging
    window.bankApp = {
        state: appState,
        ui,
        rekeningen,
        overschrijvingen
    };
});