/*
 * Storage Manager
 * Handles persistent storage of user preferences and settings
 */

class StorageManager {
    constructor() {
        this.storageKey = 'adhanReminder';
        this.defaults = {
            latitude: null,
            longitude: null,
            timezone: null,
            calcMethod: 'MWL',
            notificationStyle: 'toast',
            language: 'en',
            lastNotifiedPrayer: null,
            isConfigured: false
        };
    }

    // Get all settings
    getSettings() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return { ...this.defaults, ...JSON.parse(stored) };
            }
            return { ...this.defaults };
        } catch (error) {
            console.error('Error reading from storage:', error);
            return { ...this.defaults };
        }
    }

    // Save all settings
    saveSettings(settings) {
        try {
            const current = this.getSettings();
            const updated = { ...current, ...settings };
            localStorage.setItem(this.storageKey, JSON.stringify(updated));
            return true;
        } catch (error) {
            console.error('Error saving to storage:', error);
            return false;
        }
    }

    // Get specific setting
    getSetting(key) {
        const settings = this.getSettings();
        return settings[key];
    }

    // Set specific setting
    setSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        return this.saveSettings(settings);
    }

    // Check if app is configured
    isConfigured() {
        const settings = this.getSettings();
        return settings.isConfigured && 
               settings.latitude !== null && 
               settings.longitude !== null && 
               settings.timezone !== null;
    }

    // Mark app as configured
    markConfigured() {
        return this.setSetting('isConfigured', true);
    }

    // Clear all settings
    clearSettings() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    }

    // Update last notified prayer
    updateLastNotifiedPrayer(prayerName, timestamp) {
        return this.saveSettings({
            lastNotifiedPrayer: {
                name: prayerName,
                timestamp: timestamp
            }
        });
    }

    // Get last notified prayer
    getLastNotifiedPrayer() {
        const settings = this.getSettings();
        return settings.lastNotifiedPrayer;
    }

    // Export settings as JSON
    exportSettings() {
        const settings = this.getSettings();
        return JSON.stringify(settings, null, 2);
    }

    // Import settings from JSON
    importSettings(jsonString) {
        try {
            const settings = JSON.parse(jsonString);
            return this.saveSettings(settings);
        } catch (error) {
            console.error('Error importing settings:', error);
            return false;
        }
    }
}

// Create global instance
const storage = new StorageManager();

