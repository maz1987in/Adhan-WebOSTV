/*
 * webOSTV.js - Essential webOS TV platform methods
 * Based on LG webOS TV SDK
 */

(function() {
    window.webOS = window.webOS || {};

    /**
     * platformBack() - Trigger the back button behavior
     * - On webOS TV 6.0+: Shows exit confirmation popup
     * - On webOS TV 5.0-: Launches Home screen
     */
    webOS.platformBack = function() {
        if (typeof PalmSystem !== 'undefined' && PalmSystem.platformBack) {
            PalmSystem.platformBack();
        } else {
            // Fallback for testing or older systems
            console.log('webOS.platformBack() called - would exit app or show popup');
            // In actual webOS TV, this triggers the native back behavior
            window.close();
        }
    };

    /**
     * Check if running on actual webOS TV
     */
    webOS.platform = {
        tv: typeof PalmSystem !== 'undefined'
    };

    console.log('webOSTV.js loaded');
})();
