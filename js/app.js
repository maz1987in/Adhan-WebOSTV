/*
 * Adhan Reminder App - Main Application Logic
 * Handles UI, navigation, prayer time monitoring, and notifications
 */

class AzanApp {
    constructor() {
        this.currentScreen = 'home';
        this.prayerTimesList = null;
        this.nextPrayer = null;
        this.countdownInterval = null;
        this.monitorInterval = null;
        this.notifiedToday = new Set();
    }

    // Initialize the app
    init() {
        console.log('Initializing Adhan Reminder App...');

        // Load and apply language
        this.loadLanguage();

        // Initialize components
        notificationManager.init();

        // Set up navigation
        this.setupNavigation();

        // Load settings and configure prayer times
        this.loadSettings();

        // Update UI
        this.updateUI();

        // Start monitoring for prayer times
        this.startMonitoring();

        // Start countdown timer
        this.startCountdown();

        console.log('App initialized successfully');
    }

    // Load and apply saved language
    loadLanguage() {
        const settings = storage.getSettings();
        const language = settings.language || 'en';
        i18n.setLocale(language);
    }

    // Set up navigation event listeners
    setupNavigation() {
        const settingsBtn = document.getElementById('settings-btn');
        const backBtn = document.getElementById('back-btn');
        const saveSettingsBtn = document.getElementById('save-settings-btn');
        const languageSelect = document.getElementById('language-select');

        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.showSettings());
        }

        if (backBtn) {
            backBtn.addEventListener('click', () => this.showHome());
        }

        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        }

        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => this.changeLanguage(e.target.value));
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    // Change language
    changeLanguage(language) {
        i18n.setLocale(language);
        this.updateUI();
    }

    // Handle keyboard input
    handleKeyPress(e) {
        switch(e.key) {
            case 'Escape':
            case 'Back':
                if (this.currentScreen === 'settings') {
                    this.showHome();
                } else if (notificationManager.isShowing()) {
                    notificationManager.dismissAll();
                }
                break;
        }
    }

    // Load settings from storage
    loadSettings() {
        const settings = storage.getSettings();

        if (settings.latitude && settings.longitude && settings.timezone !== null) {
            // Configure prayer times calculator
            prayerTimes.setLocation(settings.latitude, settings.longitude, settings.timezone);
            prayerTimes.setMethod(settings.calcMethod || 'MWL');

            // Calculate today's prayer times
            this.calculatePrayerTimes();
        } else {
            console.log('Location not configured, showing default view');
        }
    }

    // Calculate prayer times for today
    calculatePrayerTimes() {
        const now = new Date();
        const times = prayerTimes.getFormattedTimes(now);

        if (times) {
            this.prayerTimesList = times;
            this.findNextPrayer();
            console.log('Prayer times calculated:', times);
        } else {
            console.error('Failed to calculate prayer times');
        }
    }

    // Find the next prayer
    findNextPrayer() {
        if (!this.prayerTimesList) return;

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const prayers = [
            { name: 'Fajr', time: this.prayerTimesList.fajr },
            { name: 'Dhuhr', time: this.prayerTimesList.dhuhr },
            { name: 'Asr', time: this.prayerTimesList.asr },
            { name: 'Maghrib', time: this.prayerTimesList.maghrib },
            { name: 'Isha', time: this.prayerTimesList.isha }
        ];

        for (let prayer of prayers) {
            const prayerMinutes = this.timeToMinutes(prayer.time);
            if (prayerMinutes > currentMinutes) {
                this.nextPrayer = prayer;
                return;
            }
        }

        // If no prayer found today, next prayer is tomorrow's Fajr
        this.nextPrayer = { name: 'Fajr', time: this.prayerTimesList.fajr, tomorrow: true };
    }

    // Convert time string (HH:MM) to minutes
    timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    // Update UI with current data
    updateUI() {
        this.updateHomeScreen();
        this.updateSettingsScreen();
    }

    // Update home screen
    updateHomeScreen() {
        // Update date
        const dateDisplay = document.getElementById('date-display');
        if (dateDisplay) {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateDisplay.textContent = now.toLocaleDateString('en-US', options);
        }

        // Update location display
        const locationDisplay = document.getElementById('location-display');
        const settings = storage.getSettings();
        if (locationDisplay) {
            if (settings.isConfigured) {
                locationDisplay.textContent = `Location: ${settings.latitude.toFixed(4)}, ${settings.longitude.toFixed(4)}`;
            } else {
                locationDisplay.textContent = 'Location not set - Go to Settings';
            }
        }

        // Update prayer times
        if (this.prayerTimesList) {
            document.getElementById('fajr-time').textContent = this.prayerTimesList.fajr;
            document.getElementById('sunrise-time').textContent = this.prayerTimesList.sunrise;
            document.getElementById('dhuhr-time').textContent = this.prayerTimesList.dhuhr;
            document.getElementById('asr-time').textContent = this.prayerTimesList.asr;
            document.getElementById('maghrib-time').textContent = this.prayerTimesList.maghrib;
            document.getElementById('isha-time').textContent = this.prayerTimesList.isha;
        }

        // Update next prayer
        if (this.nextPrayer) {
            const nextPrayerName = document.getElementById('next-prayer-name');
            if (nextPrayerName) {
                const prayerKey = `prayer.${this.nextPrayer.name.toLowerCase()}`;
                nextPrayerName.textContent = i18n.t(prayerKey, this.nextPrayer.name);
                if (this.nextPrayer.tomorrow) {
                    nextPrayerName.textContent += ` (${i18n.t('prayer.tomorrow')})`;
                }
            }
        }
    }

    // Update settings screen with current values
    updateSettingsScreen() {
        const settings = storage.getSettings();

        const latInput = document.getElementById('latitude');
        const lngInput = document.getElementById('longitude');
        const tzInput = document.getElementById('timezone');
        const methodSelect = document.getElementById('calc-method');
        const styleSelect = document.getElementById('notification-style');
        const languageSelect = document.getElementById('language-select');

        if (latInput) latInput.value = settings.latitude || '';
        if (lngInput) lngInput.value = settings.longitude || '';
        if (tzInput) tzInput.value = settings.timezone !== null ? settings.timezone : '';
        if (methodSelect) methodSelect.value = settings.calcMethod || 'MWL';
        if (styleSelect) styleSelect.value = settings.notificationStyle || 'toast';
        if (languageSelect) languageSelect.value = settings.language || 'en';
    }

    // Start countdown timer
    startCountdown() {
        // Update every second
        this.countdownInterval = setInterval(() => {
            this.updateCountdown();
        }, 1000);

        // Initial update
        this.updateCountdown();
    }

    // Update countdown display
    updateCountdown() {
        if (!this.nextPrayer) {
            const countdownEl = document.getElementById('countdown');
            if (countdownEl) {
                countdownEl.textContent = '--:--:--';
            }
            return;
        }

        const now = new Date();
        let targetTime = new Date();

        // Parse prayer time
        const [prayerHours, prayerMinutes] = this.nextPrayer.time.split(':').map(Number);
        targetTime.setHours(prayerHours, prayerMinutes, 0, 0);

        // If tomorrow's prayer
        if (this.nextPrayer.tomorrow) {
            targetTime.setDate(targetTime.getDate() + 1);
        }

        const diff = targetTime - now;

        if (diff <= 0) {
            // Prayer time has passed, find next prayer
            this.calculatePrayerTimes();
            return;
        }

        // Calculate hours, minutes, seconds
        const totalSeconds = Math.floor(diff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            countdownEl.textContent = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }

    // Start monitoring for prayer times
    startMonitoring() {
        // Check every 30 seconds
        this.monitorInterval = setInterval(() => {
            this.checkPrayerTime();
        }, 30000);

        // Also check immediately
        this.checkPrayerTime();

        // Reset notified prayers at midnight
        this.scheduleResetAtMidnight();
    }

    // Check if it's time for prayer notification
    checkPrayerTime() {
        if (!this.prayerTimesList) return;

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const prayers = [
            { name: 'Fajr', time: this.prayerTimesList.fajr },
            { name: 'Dhuhr', time: this.prayerTimesList.dhuhr },
            { name: 'Asr', time: this.prayerTimesList.asr },
            { name: 'Maghrib', time: this.prayerTimesList.maghrib },
            { name: 'Isha', time: this.prayerTimesList.isha }
        ];

        for (let prayer of prayers) {
            if (prayer.time === currentTime && !this.notifiedToday.has(prayer.name)) {
                console.log(`Prayer time notification: ${prayer.name}`);
                notificationManager.showNotification(prayer.name, prayer.time);
                this.notifiedToday.add(prayer.name);
            }
        }

        // Recalculate next prayer after checking
        this.findNextPrayer();
        this.updateHomeScreen();
    }

    // Schedule reset of notified prayers at midnight
    scheduleResetAtMidnight() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const timeUntilMidnight = tomorrow - now;

        setTimeout(() => {
            this.notifiedToday.clear();
            this.calculatePrayerTimes();
            this.updateUI();
            
            // Schedule next reset
            this.scheduleResetAtMidnight();
        }, timeUntilMidnight);

        console.log(`Scheduled reset at midnight in ${timeUntilMidnight / 1000 / 60} minutes`);
    }

    // Show home screen
    showHome() {
        this.switchScreen('home');
    }

    // Show settings screen
    showSettings() {
        this.updateSettingsScreen();
        this.switchScreen('settings');
    }

    // Switch between screens
    switchScreen(screenName) {
        // Hide all screens
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));

        // Show selected screen
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
        }
    }

    // Save settings from form
    saveSettings() {
        const latitude = parseFloat(document.getElementById('latitude').value);
        const longitude = parseFloat(document.getElementById('longitude').value);
        const timezone = parseFloat(document.getElementById('timezone').value);
        const calcMethod = document.getElementById('calc-method').value;
        const notificationStyle = document.getElementById('notification-style').value;
        const language = document.getElementById('language-select').value;

        // Validate inputs
        if (isNaN(latitude) || isNaN(longitude) || isNaN(timezone)) {
            alert(i18n.t('error.invalid.coordinates'));
            return;
        }

        if (latitude < -90 || latitude > 90) {
            alert(i18n.t('error.latitude.range'));
            return;
        }

        if (longitude < -180 || longitude > 180) {
            alert(i18n.t('error.longitude.range'));
            return;
        }

        // Save to storage
        const saved = storage.saveSettings({
            latitude: latitude,
            longitude: longitude,
            timezone: timezone,
            calcMethod: calcMethod,
            notificationStyle: notificationStyle,
            language: language,
            isConfigured: true
        });

        if (saved) {
            console.log('Settings saved successfully');
            
            // Reconfigure prayer times
            this.loadSettings();
            this.updateUI();
            
            // Show confirmation and go back to home
            alert(i18n.t('settings.saved'));
            this.showHome();
        } else {
            alert(i18n.t('error.saving'));
        }
    }

    // Stop all intervals (for cleanup)
    stop() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new AzanApp();
    app.init();

    // Make app globally accessible for debugging
    window.adhanApp = app;
});

// Handle webOS lifecycle events
if (window.webOS) {
    document.addEventListener('webOSLaunch', (e) => {
        console.log('webOS Launch event:', e.detail);
    });

    document.addEventListener('webOSRelaunch', (e) => {
        console.log('webOS Relaunch event:', e.detail);
        // Refresh prayer times when app is relaunched
        if (window.adhanApp) {
            window.adhanApp.calculatePrayerTimes();
            window.adhanApp.updateUI();
        }
    });
}

