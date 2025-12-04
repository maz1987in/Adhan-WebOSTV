/*
 * Notification Manager
 * Handles toast and fullscreen notifications for prayer times
 */

class NotificationManager {
    constructor() {
        this.toastElement = null;
        this.fullscreenElement = null;
        this.currentNotification = null;
        this.notificationTimeout = null;
        this.autoDismissTime = 30000; // 30 seconds
    }

    // Initialize notification elements
    init() {
        this.toastElement = document.getElementById('toast-notification');
        this.fullscreenElement = document.getElementById('fullscreen-notification');

        // Set up dismiss buttons
        const toastDismiss = document.getElementById('toast-dismiss');
        const fullscreenDismiss = document.getElementById('fullscreen-dismiss');

        if (toastDismiss) {
            toastDismiss.addEventListener('click', () => this.dismissToast());
        }

        if (fullscreenDismiss) {
            fullscreenDismiss.addEventListener('click', () => this.dismissFullscreen());
        }

        console.log('Notification manager initialized');
    }

    // Show notification based on user preference
    showNotification(prayerName, prayerTime) {
        const settings = storage.getSettings();
        const style = settings.notificationStyle || 'toast';

        console.log(`Showing ${style} notification for ${prayerName} at ${prayerTime}`);

        if (style === 'toast') {
            this.showToast(prayerName, prayerTime);
        } else if (style === 'fullscreen') {
            this.showFullscreen(prayerName, prayerTime);
        }

        // Update last notified prayer
        storage.updateLastNotifiedPrayer(prayerName, Date.now());

        // Auto-dismiss after timeout
        this.setAutoDismiss(style);

        // Play notification sound if available
        this.playNotificationSound();
    }

    // Show toast notification
    showToast(prayerName, prayerTime) {
        if (!this.toastElement) return;

        // Update content
        const prayerNameEl = document.getElementById('toast-prayer-name');
        const prayerTimeEl = document.getElementById('toast-prayer-time');

        if (prayerNameEl) {
            const translatedPrayer = i18n.t(`prayer.${prayerName.toLowerCase()}`, prayerName);
            prayerNameEl.textContent = `${translatedPrayer} - ${i18n.t('prayer.time')}`;
        }
        if (prayerTimeEl) {
            prayerTimeEl.textContent = prayerTime;
        }

        // Show toast
        this.toastElement.classList.remove('hidden');
        this.currentNotification = 'toast';
        
        // Focus dismiss button for remote control
        setTimeout(() => {
            const dismissBtn = document.getElementById('toast-dismiss');
            if (dismissBtn) {
                dismissBtn.focus();
            }
        }, 100);
    }

    // Show fullscreen notification
    showFullscreen(prayerName, prayerTime) {
        if (!this.fullscreenElement) return;

        // Update content
        const prayerNameEl = document.getElementById('fullscreen-prayer-name');
        const prayerTimeEl = document.getElementById('fullscreen-prayer-time');

        if (prayerNameEl) {
            const translatedPrayer = i18n.t(`prayer.${prayerName.toLowerCase()}`, prayerName);
            prayerNameEl.textContent = translatedPrayer;
        }
        if (prayerTimeEl) {
            prayerTimeEl.textContent = prayerTime;
        }

        // Show fullscreen
        this.fullscreenElement.classList.remove('hidden');
        this.currentNotification = 'fullscreen';
        
        // Focus dismiss button for remote control
        setTimeout(() => {
            const dismissBtn = document.getElementById('fullscreen-dismiss');
            if (dismissBtn) {
                dismissBtn.focus();
            }
        }, 100);
    }

    // Dismiss toast notification
    dismissToast() {
        if (this.toastElement) {
            this.toastElement.classList.add('hidden');
        }
        this.clearAutoDismiss();
        this.currentNotification = null;
    }

    // Dismiss fullscreen notification
    dismissFullscreen() {
        if (this.fullscreenElement) {
            this.fullscreenElement.classList.add('hidden');
        }
        this.clearAutoDismiss();
        this.currentNotification = null;
    }

    // Dismiss any active notification
    dismissAll() {
        this.dismissToast();
        this.dismissFullscreen();
    }

    // Set auto-dismiss timer
    setAutoDismiss(style) {
        this.clearAutoDismiss();
        this.notificationTimeout = setTimeout(() => {
            if (style === 'toast') {
                this.dismissToast();
            } else if (style === 'fullscreen') {
                this.dismissFullscreen();
            }
        }, this.autoDismissTime);
    }

    // Clear auto-dismiss timer
    clearAutoDismiss() {
        if (this.notificationTimeout) {
            clearTimeout(this.notificationTimeout);
            this.notificationTimeout = null;
        }
    }

    // Play notification sound
    playNotificationSound() {
        // Try to use webOS notification API if available
        if (window.webOS && window.webOS.notification) {
            try {
                window.webOS.notification.createToast({
                    message: 'Prayer Time',
                    noaction: true
                });
            } catch (error) {
                console.log('webOS notification not available:', error);
            }
        }

        // Try to play a beep sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('Could not play notification sound:', error);
        }
    }

    // Check if notification is currently showing
    isShowing() {
        return this.currentNotification !== null;
    }

    // Get current notification type
    getCurrentType() {
        return this.currentNotification;
    }
}

// Create global instance
const notificationManager = new NotificationManager();

