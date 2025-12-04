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

        // Set up History API for back button (webOS TV guideline)
        this.setupHistoryAPI();

        // Set up system UI visibility handlers (webOS TV guideline)
        this.setupSystemUIHandlers();

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

    // Setup System UI visibility handlers (webOS TV guideline)
    setupSystemUIHandlers() {
        // Keyboard visibility detection
        document.addEventListener('keyboardStateChange', (event) => {
            const visibility = event.detail.visibility;
            console.log('Virtual keyboard:', visibility ? 'appeared' : 'disappeared');
            
            // Adjust UI when keyboard appears
            if (visibility) {
                // Keyboard is showing - could scroll focused input into view
                const activeElement = document.activeElement;
                if (activeElement && activeElement.tagName === 'INPUT') {
                    activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        // Cursor visibility detection (for Magic Remote)
        document.addEventListener('cursorStateChange', (event) => {
            const visibility = event.detail.visibility;
            console.log('Cursor:', visibility ? 'visible' : 'hidden');
        });

        // Window focus/blur detection
        window.addEventListener('focus', () => {
            console.log('App gained focus');
            this.resume();
        });

        window.addEventListener('blur', () => {
            console.log('App lost focus (overlay UI may be showing)');
            this.pause();
        });
    }

    // Setup History API for proper back button handling
    setupHistoryAPI() {
        // Initialize history with home state
        if (!history.state) {
            history.replaceState({ screen: 'home' }, '', '');
        }

        // Listen for popstate event (back button pressed)
        window.addEventListener('popstate', (event) => {
            console.log('popstate event:', event.state);
            
            if (event.state && event.state.screen) {
                // Navigate to the screen in history
                this.currentScreen = event.state.screen;
                this.switchScreenDirect(event.state.screen);
            } else {
                // At entry page - exit app
                this.exitApp();
            }
        });
    }

    // Handle back button press (follows webOS TV guidelines)
    handleBackButton() {
        console.log('Back button pressed, current screen:', this.currentScreen);
        
        // Priority 1: Dismiss notifications if showing
        if (notificationManager.isShowing()) {
            notificationManager.dismissAll();
            return;
        }
        
        // Priority 2: Navigate back in history
        if (this.currentScreen !== 'home') {
            // Not on home screen - go back using History API
            history.back();
        } else {
            // On home screen (entry page) - exit app
            this.exitApp();
        }
    }

    // Exit app (follows webOS TV guidelines)
    exitApp() {
        console.log('Attempting to exit app');
        // Use webOS.platformBack() as per LG guidelines
        // On webOS TV 6.0+: Shows exit confirmation popup
        // On webOS TV 5.0-: Launches Home screen
        if (window.webOS && webOS.platformBack) {
            webOS.platformBack();
        } else {
            // Fallback
            window.close();
        }
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
        const locationModeSelect = document.getElementById('location-mode');
        const locationSearch = document.getElementById('location-search');

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

        if (locationModeSelect) {
            locationModeSelect.addEventListener('change', (e) => this.toggleLocationMode(e.target.value));
        }

        if (locationSearch) {
            // Search as user types
            locationSearch.addEventListener('input', (e) => this.searchLocations(e.target.value));
            
            // Prevent automatic keyboard on focus
            locationSearch.setAttribute('readonly', 'readonly');
            
            // Remove readonly and activate on click/enter
            locationSearch.addEventListener('click', (e) => {
                e.target.removeAttribute('readonly');
            });
        }
        
        // Handle all input fields - make them activate only on OK press
        const allInputs = document.querySelectorAll('input[type="text"], input[type="number"]');
        allInputs.forEach(input => {
            // Make readonly by default
            input.setAttribute('readonly', 'readonly');
            
            // Activate on click
            input.addEventListener('click', () => {
                input.removeAttribute('readonly');
            });
            
            // Deactivate when leaving
            input.addEventListener('blur', () => {
                input.setAttribute('readonly', 'readonly');
            });
        });

        // Setup spatial navigation for remote control
        this.setupSpatialNavigation();

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    // Setup spatial navigation for TV remote control
    setupSpatialNavigation() {
        // Make all interactive elements focusable
        this.focusableElements = [];
        
        // Get all focusable elements
        this.updateFocusableElements();
        
        // Focus first element on home screen
        setTimeout(() => {
            this.focusElement(0);
        }, 100);
    }

    // Update list of focusable elements based on current screen
    updateFocusableElements() {
        const activeScreen = document.querySelector('.screen.active');
        if (!activeScreen) return;

        // Get all interactive elements in active screen
        this.focusableElements = Array.from(activeScreen.querySelectorAll(
            'button, input, select, [tabindex="0"]'
        )).filter(el => !el.disabled && el.offsetParent !== null);
        
        // Add tabindex to make them focusable
        this.focusableElements.forEach((el, index) => {
            el.setAttribute('tabindex', '0');
            el.setAttribute('data-focus-index', index);
        });
    }

    // Focus an element by index
    focusElement(index) {
        if (!this.focusableElements || this.focusableElements.length === 0) {
            this.updateFocusableElements();
        }
        
        if (index >= 0 && index < this.focusableElements.length) {
            this.currentFocusIndex = index;
            this.focusableElements[index].focus();
        }
    }

    // Get current focused index
    getCurrentFocusIndex() {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.hasAttribute('data-focus-index')) {
            return parseInt(activeElement.getAttribute('data-focus-index'));
        }
        return 0;
    }

    // Change language
    changeLanguage(language) {
        i18n.setLocale(language);
        this.updateUI();
    }

    // Handle keyboard input (Remote Control)
    handleKeyPress(e) {
        const currentIndex = this.getCurrentFocusIndex();
        const activeElement = document.activeElement;
        
        // Check if we're in a dropdown (select element)
        const isDropdown = activeElement && activeElement.tagName === 'SELECT';
        
        // Handle keycode 461 (Back button on Magic Remote)
        const keyCode = e.keyCode || e.which;
        if (keyCode === 461) {
            e.preventDefault();
            this.handleBackButton();
            return;
        }
        
        switch(e.key) {
            case 'ArrowDown':
            case 'Down':
                e.preventDefault();
                // ALWAYS move to next element with Down arrow
                if (currentIndex < this.focusableElements.length - 1) {
                    this.focusElement(currentIndex + 1);
                }
                break;
                
            case 'ArrowUp':
            case 'Up':
                e.preventDefault();
                // ALWAYS move to previous element with Up arrow
                if (currentIndex > 0) {
                    this.focusElement(currentIndex - 1);
                }
                break;
                
            case 'ArrowLeft':
            case 'Left':
                // Left arrow changes dropdown value
                if (isDropdown) {
                    e.preventDefault();
                    const select = activeElement;
                    if (select.selectedIndex > 0) {
                        select.selectedIndex--;
                        select.dispatchEvent(new Event('change'));
                    }
                }
                break;
                
            case 'ArrowRight':
            case 'Right':
                // Right arrow changes dropdown value
                if (isDropdown) {
                    e.preventDefault();
                    const select = activeElement;
                    if (select.selectedIndex < select.options.length - 1) {
                        select.selectedIndex++;
                        select.dispatchEvent(new Event('change'));
                    }
                }
                break;
                
            case 'Enter':
            case 'Return':
            case 'OK':
                e.preventDefault();
                if (activeElement) {
                    if (activeElement.tagName === 'BUTTON') {
                        // For buttons, click them
                        activeElement.click();
                    } else if (activeElement.tagName === 'SELECT') {
                        // For dropdowns, do nothing (use Left/Right to change)
                        return;
                    } else if (activeElement.tagName === 'INPUT') {
                        // For input fields, activate them (remove readonly and show keyboard)
                        if (activeElement.hasAttribute('readonly')) {
                            activeElement.removeAttribute('readonly');
                            activeElement.focus(); // Re-focus to show keyboard
                            console.log('Input field activated - keyboard should appear');
                        } else {
                            // Already active - move to next field
                            activeElement.setAttribute('readonly', 'readonly');
                            if (currentIndex < this.focusableElements.length - 1) {
                                this.focusElement(currentIndex + 1);
                            }
                        }
                    }
                }
                break;
                
            case 'Escape':
            case 'Back':
                e.preventDefault();
                this.handleBackButton();
                break;
                
            case 'Backspace':
                // Only use backspace as back button if NOT in an input field
                if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    this.handleBackButton();
                }
                // Otherwise, let backspace work normally for text deletion
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
        try {
            const now = new Date();
            const times = prayerTimes.getFormattedTimes(now);

            if (times) {
                this.prayerTimesList = times;
                this.findNextPrayer();
                console.log('Prayer times calculated:', times);
            } else {
                console.error('Failed to calculate prayer times - location may not be configured');
            }
        } catch (error) {
            console.error('Error calculating prayer times:', error);
            this.prayerTimesList = null;
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
                if (settings.country && settings.city) {
                    locationDisplay.textContent = `📍 ${settings.city}, ${settings.country}`;
                } else {
                    locationDisplay.textContent = `📍 ${settings.latitude.toFixed(4)}, ${settings.longitude.toFixed(4)}`;
                }
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

        const locationModeSelect = document.getElementById('location-mode');
        const latInput = document.getElementById('latitude');
        const lngInput = document.getElementById('longitude');
        const tzInput = document.getElementById('timezone');
        const methodSelect = document.getElementById('calc-method');
        const styleSelect = document.getElementById('notification-style');
        const languageSelect = document.getElementById('language-select');

        // Set location mode
        const locationMode = settings.locationMode || 'city';
        if (locationModeSelect) {
            locationModeSelect.value = locationMode;
            this.toggleLocationMode(locationMode);
        }

        // Load saved location
        if (locationMode === 'city' && settings.country && settings.city) {
            // Restore location in search input
            const searchInput = document.getElementById('location-search');
            if (searchInput) {
                searchInput.value = `${settings.city}, ${settings.country}`;
            }
            
            // Display selected location
            const locationData = getLocationData(settings.country, settings.city);
            if (locationData) {
                this.currentCountry = settings.country;
                this.currentCity = settings.city;
                this.currentLocationData = locationData;
                
                document.getElementById('location-coordinates').textContent = 
                    `📍 ${settings.city}, ${settings.country} (${locationData.lat.toFixed(4)}, ${locationData.lng.toFixed(4)}, UTC${locationData.tz >= 0 ? '+' : ''}${locationData.tz})`;
            }
        } else {
            // Manual mode - restore coordinates
            if (latInput) latInput.value = settings.latitude || '';
            if (lngInput) lngInput.value = settings.longitude || '';
            if (tzInput) tzInput.value = settings.timezone !== null ? settings.timezone : '';
        }

        if (methodSelect) methodSelect.value = settings.calcMethod || 'MWL';
        if (styleSelect) styleSelect.value = settings.notificationStyle || 'toast';
        if (languageSelect) languageSelect.value = settings.language || 'en';
        
        const testModeSelect = document.getElementById('test-mode');
        if (testModeSelect) testModeSelect.value = settings.testMode || 'off';
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
        const settings = storage.getSettings();
        
        // Clear any existing intervals
        if (this.monitorInterval) clearInterval(this.monitorInterval);
        if (this.testInterval) clearInterval(this.testInterval);
        
        // Check if test mode is enabled
        if (settings.testMode === 'on') {
            console.log('🧪 TEST MODE: Notifications every 3 minutes');
            this.testCounter = 0;
            
            // Send test notification immediately
            this.sendTestNotification();
            
            // Then every 3 minutes
            this.testInterval = setInterval(() => {
                this.sendTestNotification();
            }, 180000); // 3 minutes
        } else {
            // Normal monitoring - check every 30 seconds
            this.monitorInterval = setInterval(() => {
                this.checkPrayerTime();
            }, 30000);

            // Also check immediately
            this.checkPrayerTime();

            // Reset notified prayers at midnight
            this.scheduleResetAtMidnight();
        }
    }
    
    // Send test notification (for testing mode)
    sendTestNotification() {
        this.testCounter = this.testCounter || 0;
        this.testCounter++;
        
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const testPrayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        const testPrayer = testPrayers[(this.testCounter - 1) % testPrayers.length];
        
        console.log(`🧪 Test notification #${this.testCounter}: ${testPrayer}`);
        notificationManager.showNotification(`${testPrayer} (TEST #${this.testCounter})`, currentTime);
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

    // Switch between screens (with history push)
    switchScreen(screenName) {
        if (this.currentScreen === screenName) return;

        // Push to history stack (for back button)
        history.pushState({ screen: screenName }, '', '');
        
        // Actually switch the screen
        this.switchScreenDirect(screenName);
    }

    // Switch screen without pushing to history (used by popstate)
    switchScreenDirect(screenName) {
        // Hide all screens
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));

        // Show selected screen
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
            
            // Update focusable elements for new screen
            setTimeout(() => {
                this.updateFocusableElements();
                this.focusElement(0);
            }, 50);
        }
    }

    // Toggle between city selection and manual mode
    toggleLocationMode(mode) {
        const cityMode = document.getElementById('city-selection-mode');
        const manualMode = document.getElementById('manual-coordinates-mode');

        if (mode === 'city') {
            cityMode.style.display = 'block';
            manualMode.style.display = 'none';
            
            // Clear any previous search
            const searchInput = document.getElementById('location-search');
            if (searchInput) {
                searchInput.value = '';
                this.searchLocations('');
            }
        } else {
            cityMode.style.display = 'none';
            manualMode.style.display = 'block';
        }

        // Update focusable elements
        setTimeout(() => {
            this.updateFocusableElements();
        }, 100);
    }

    // Search locations (autocomplete)
    searchLocations(query) {
        const resultsContainer = document.getElementById('location-results');
        const resultsList = document.getElementById('location-results-list');
        const noResults = document.getElementById('no-results');
        
        if (!query || query.trim().length < 2) {
            // Hide results if query too short
            resultsContainer.style.display = 'none';
            noResults.style.display = 'none';
            return;
        }

        const searchTerm = query.toLowerCase().trim();
        const results = [];

        // Search through all countries and cities
        const countries = getCountries();
        countries.forEach(country => {
            const cities = getCities(country);
            cities.forEach(city => {
                // Match city or country name
                if (city.toLowerCase().includes(searchTerm) || 
                    country.toLowerCase().includes(searchTerm)) {
                    const locationData = getLocationData(country, city);
                    results.push({
                        country: country,
                        city: city,
                        ...locationData
                    });
                }
            });
        });

        // Display results
        if (results.length > 0) {
            resultsContainer.style.display = 'block';
            noResults.style.display = 'none';
            
            // Limit to 10 results for performance
            const limitedResults = results.slice(0, 10);
            
            resultsList.innerHTML = limitedResults.map((location, index) => `
                <div class="location-result-item" 
                     data-country="${location.country}" 
                     data-city="${location.city}"
                     data-lat="${location.lat}"
                     data-lng="${location.lng}"
                     data-tz="${location.tz}"
                     tabindex="0">
                    <div class="city-name">${location.city}</div>
                    <div class="country-name">${location.country}</div>
                    <div class="coordinates">
                        ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)} · UTC${location.tz >= 0 ? '+' : ''}${location.tz}
                    </div>
                </div>
            `).join('');

            // Add click handlers to results
            const resultItems = resultsList.querySelectorAll('.location-result-item');
            resultItems.forEach(item => {
                item.addEventListener('click', () => this.selectLocation(item));
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        this.selectLocation(item);
                    }
                });
            });

            // Update focusable elements
            setTimeout(() => {
                this.updateFocusableElements();
            }, 50);
        } else {
            resultsContainer.style.display = 'none';
            noResults.style.display = 'block';
        }
    }

    // Select a location from search results
    selectLocation(item) {
        const country = item.getAttribute('data-country');
        const city = item.getAttribute('data-city');
        const lat = parseFloat(item.getAttribute('data-lat'));
        const lng = parseFloat(item.getAttribute('data-lng'));
        const tz = parseFloat(item.getAttribute('data-tz'));

        // Store selected location
        this.currentCountry = country;
        this.currentCity = city;
        this.currentLocationData = { lat, lng, tz };

        // Update search input to show selection
        const searchInput = document.getElementById('location-search');
        if (searchInput) {
            searchInput.value = `${city}, ${country}`;
        }

        // Hide results
        document.getElementById('location-results').style.display = 'none';
        document.getElementById('no-results').style.display = 'none';

        // Display selected location
        document.getElementById('location-coordinates').textContent = 
            `📍 ${city}, ${country} (${lat.toFixed(4)}, ${lng.toFixed(4)}, UTC${tz >= 0 ? '+' : ''}${tz})`;

        console.log('Selected location:', { country, city, lat, lng, tz });
    }

    // Save settings from form
    saveSettings() {
        const locationMode = document.getElementById('location-mode').value;
        const calcMethod = document.getElementById('calc-method').value;
        const notificationStyle = document.getElementById('notification-style').value;
        const language = document.getElementById('language-select').value;
        const testMode = document.getElementById('test-mode').value;

        let latitude, longitude, timezone, country, city;

        // Get location data based on mode
        if (locationMode === 'city') {
            // City selection mode (autocomplete)
            if (!this.currentCountry || !this.currentCity || !this.currentLocationData) {
                alert(i18n.t('error.no.location.selected'));
                return;
            }

            country = this.currentCountry;
            city = this.currentCity;
            latitude = this.currentLocationData.lat;
            longitude = this.currentLocationData.lng;
            timezone = this.currentLocationData.tz;

        } else {
            // Manual mode
            latitude = parseFloat(document.getElementById('latitude').value);
            longitude = parseFloat(document.getElementById('longitude').value);
            timezone = parseFloat(document.getElementById('timezone').value);

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

            country = null;
            city = null;
        }

        // Save to storage
        const saved = storage.saveSettings({
            locationMode: locationMode,
            country: country,
            city: city,
            latitude: latitude,
            longitude: longitude,
            timezone: timezone,
            calcMethod: calcMethod,
            notificationStyle: notificationStyle,
            language: language,
            testMode: testMode,
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

    // Pause app (when going to background)
    pause() {
        console.log('Pausing app timers');
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
            this.monitorInterval = null;
        }
        if (this.testInterval) {
            clearInterval(this.testInterval);
            this.testInterval = null;
        }
    }

    // Resume app (when coming to foreground)
    resume() {
        console.log('Resuming app timers');
        // Recalculate prayer times in case date changed
        this.calculatePrayerTimes();
        this.updateUI();
        
        // Restart timers
        this.startCountdown();
        this.startMonitoring();
    }

    // Stop all intervals (for cleanup)
    stop() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
        }
        if (this.testInterval) {
            clearInterval(this.testInterval);
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
document.addEventListener('webOSLaunch', (e) => {
    console.log('webOS Launch event:', e.detail);
    // App is launching for the first time
    // Parameters are in e.detail if any were passed
    if (e.detail && Object.keys(e.detail).length > 0) {
        console.log('Launch parameters:', JSON.stringify(e.detail));
    }
});

document.addEventListener('webOSRelaunch', (e) => {
    console.log('webOS Relaunch event:', e.detail);
    // App is being relaunched (already running)
    // Parameters are in e.detail if any were passed
    if (e.detail && Object.keys(e.detail).length > 0) {
        console.log('Relaunch parameters:', JSON.stringify(e.detail));
    }
    
    // Refresh prayer times when app is relaunched
    if (window.adhanApp) {
        window.adhanApp.calculatePrayerTimes();
        window.adhanApp.updateUI();
    }
});

// Handle visibility changes (Standard Web API - lowercase 'c')
document.addEventListener('visibilitychange', () => {
    console.log('visibilitychange event - document.hidden:', document.hidden);
    if (document.hidden) {
        console.log('App went to background - pausing updates');
        if (window.adhanApp) {
            window.adhanApp.pause();
        }
    } else {
        console.log('App came to foreground - resuming updates');
        if (window.adhanApp) {
            window.adhanApp.resume();
        }
    }
});

// Handle visibility changes (webOS-specific - capital 'C')
// Added for webOS OSE compatibility
document.addEventListener('visibilityChange', () => {
    console.log('visibilityChange event (webOS) - document.hidden:', document.hidden);
    if (document.hidden) {
        console.log('App hidden - pausing updates');
        if (window.adhanApp) {
            window.adhanApp.pause();
        }
    } else {
        console.log('App visible - resuming updates');
        if (window.adhanApp) {
            window.adhanApp.resume();
        }
    }
});

