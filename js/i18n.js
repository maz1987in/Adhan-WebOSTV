/*
 * Internationalization (i18n) Manager
 * Handles multi-language support for the Adhan Reminder app
 */

class I18nManager {
    constructor() {
        this.currentLocale = 'en';
        this.translations = {};
        this.rtlLanguages = ['ar'];
        this.loadTranslations();
    }

    // Load all translations
    loadTranslations() {
        this.translations = {
            en: {
                // Home Screen
                'app.title': 'Prayer Times',
                'next.prayer': 'Next Prayer',
                'today.schedule': "Today's Schedule",
                'location.not.set': 'Location not set - Go to Settings',
                'location': 'Location',
                
                // Prayer Names
                'prayer.fajr': 'Fajr',
                'prayer.sunrise': 'Sunrise',
                'prayer.dhuhr': 'Dhuhr',
                'prayer.asr': 'Asr',
                'prayer.maghrib': 'Maghrib',
                'prayer.isha': 'Isha',
                'prayer.tomorrow': 'Tomorrow',
                
                // Settings Screen
                'settings': 'Settings',
                'back': 'Back',
                'location.title': 'Location',
                'location.mode': 'Location Mode',
                'location.mode.city': 'Select Country & City',
                'location.mode.manual': 'Manual Coordinates',
                'location.search': 'Search Location',
                'location.search.placeholder': 'Type city or country name...',
                'location.no.results': 'No locations found. Try a different search.',
                'latitude': 'Latitude',
                'longitude': 'Longitude',
                'timezone': 'Timezone Offset (hours)',
                'calculation.method': 'Calculation Method',
                'method': 'Method',
                'notification.style': 'Notification Style',
                'style': 'Style',
                'language': 'Language',
                'save.settings': 'Save Settings',
                
                // Calculation Methods
                'method.mwl': 'Muslim World League',
                'method.isna': 'Islamic Society of North America',
                'method.egypt': 'Egyptian General Authority',
                'method.makkah': 'Umm Al-Qura, Makkah',
                'method.karachi': 'University of Islamic Sciences, Karachi',
                'method.tehran': 'Institute of Geophysics, Tehran',
                'method.jafari': 'Shia Ithna-Ashari (Jafari)',
                
                // Notification Styles
                'notification.toast': 'Toast (Bottom Banner)',
                'notification.fullscreen': 'Fullscreen Overlay',
                
                // Languages
                'lang.en': 'English',
                'lang.ar': 'العربية (Arabic)',
                'lang.fr': 'Français (French)',
                'lang.de': 'Deutsch (German)',
                'lang.es': 'Español (Spanish)',
                
                // Notifications
                'prayer.time': 'Prayer Time',
                'dismiss': 'Dismiss',
                
                // Messages
                'settings.saved': 'Settings saved successfully!',
                'error.saving': 'Error saving settings',
                'error.invalid.coordinates': 'Please enter valid location coordinates and timezone',
                'error.no.location.selected': 'Please search and select a location',
                'error.latitude.range': 'Latitude must be between -90 and 90',
                'error.longitude.range': 'Longitude must be between -180 and 180',
                
                // Placeholders
                'placeholder.latitude': 'e.g., 21.4225',
                'placeholder.longitude': 'e.g., 39.8262',
                'placeholder.timezone': 'e.g., 3',
                
                // Help
                'help.instructions': '⬆️⬇️ Navigate | ⬅️➡️ Change Dropdown | OK Activate/Select | 🔙 Back',
                
                // Background Notice
                'background.notice': 'Keep app visible for notifications - Best for dedicated displays',
                
                // Test Mode
                'test.mode': 'Test Mode',
                'test.mode.label': 'Enable Test Notifications (Every 3 min)',
                'test.mode.off': 'Off',
                'test.mode.on': 'On (Testing)',
                'test.mode.warning': '⚠️ Test mode sends notifications every 3 minutes. Disable after testing!'
            },
            
            ar: {
                // Home Screen
                'app.title': 'أوقات الصلاة',
                'next.prayer': 'الصلاة القادمة',
                'today.schedule': 'جدول اليوم',
                'location.not.set': 'لم يتم تعيين الموقع - اذهب إلى الإعدادات',
                'location': 'الموقع',
                
                // Prayer Names
                'prayer.fajr': 'الفجر',
                'prayer.sunrise': 'الشروق',
                'prayer.dhuhr': 'الظهر',
                'prayer.asr': 'العصر',
                'prayer.maghrib': 'المغرب',
                'prayer.isha': 'العشاء',
                'prayer.tomorrow': 'غداً',
                
                // Settings Screen
                'settings': 'الإعدادات',
                'back': 'رجوع',
                'location.title': 'الموقع',
                'location.mode': 'طريقة الموقع',
                'location.mode.city': 'اختر الدولة والمدينة',
                'location.mode.manual': 'إحداثيات يدوية',
                'location.search': 'بحث عن الموقع',
                'location.search.placeholder': 'اكتب اسم المدينة أو الدولة...',
                'location.no.results': 'لم يتم العثور على مواقع. جرب بحثًا مختلفًا.',
                'latitude': 'خط العرض',
                'longitude': 'خط الطول',
                'timezone': 'المنطقة الزمنية (ساعات)',
                'calculation.method': 'طريقة الحساب',
                'method': 'الطريقة',
                'notification.style': 'نمط الإشعار',
                'style': 'النمط',
                'language': 'اللغة',
                'save.settings': 'حفظ الإعدادات',
                
                // Calculation Methods
                'method.mwl': 'رابطة العالم الإسلامي',
                'method.isna': 'الجمعية الإسلامية لأمريكا الشمالية',
                'method.egypt': 'الهيئة المصرية العامة للمساحة',
                'method.makkah': 'أم القرى، مكة',
                'method.karachi': 'جامعة العلوم الإسلامية، كراتشي',
                'method.tehran': 'معهد الجيوفيزياء، طهران',
                'method.jafari': 'الشيعة الإثنا عشرية (جعفري)',
                
                // Notification Styles
                'notification.toast': 'إشعار منبثق (شريط سفلي)',
                'notification.fullscreen': 'ملء الشاشة',
                
                // Languages
                'lang.en': 'English (إنجليزي)',
                'lang.ar': 'العربية',
                'lang.fr': 'Français (فرنسي)',
                'lang.de': 'Deutsch (ألماني)',
                'lang.es': 'Español (إسباني)',
                
                // Notifications
                'prayer.time': 'وقت الصلاة',
                'dismiss': 'إغلاق',
                
                // Messages
                'settings.saved': 'تم حفظ الإعدادات بنجاح!',
                'error.saving': 'خطأ في حفظ الإعدادات',
                'error.invalid.coordinates': 'يرجى إدخال إحداثيات الموقع والمنطقة الزمنية الصحيحة',
                'error.no.location.selected': 'يرجى البحث واختيار موقع',
                'error.latitude.range': 'يجب أن يكون خط العرض بين -90 و 90',
                'error.longitude.range': 'يجب أن يكون خط الطول بين -180 و 180',
                
                // Placeholders
                'placeholder.latitude': 'مثال: 21.4225',
                'placeholder.longitude': 'مثال: 39.8262',
                'placeholder.timezone': 'مثال: 3',
                
                // Help
                'help.instructions': '⬆️⬇️ تنقل | ⬅️➡️ تغيير القائمة | OK تفعيل/اختيار | 🔙 رجوع',
                
                // Background Notice
                'background.notice': 'أبقِ التطبيق مرئيًا للإشعارات - الأفضل للشاشات المخصصة',
                
                // Test Mode
                'test.mode': 'وضع الاختبار',
                'test.mode.label': 'تفعيل إشعارات الاختبار (كل 3 دقائق)',
                'test.mode.off': 'متوقف',
                'test.mode.on': 'مفعّل (اختبار)',
                'test.mode.warning': '⚠️ وضع الاختبار يرسل إشعارات كل 3 دقائق. أوقفه بعد الاختبار!'
            },
            
            fr: {
                // Home Screen
                'app.title': 'Horaires de Prière',
                'next.prayer': 'Prochaine Prière',
                'today.schedule': "Programme d'Aujourd'hui",
                'location.not.set': 'Emplacement non défini - Aller aux Paramètres',
                'location': 'Emplacement',
                
                // Prayer Names
                'prayer.fajr': 'Fajr',
                'prayer.sunrise': 'Lever du Soleil',
                'prayer.dhuhr': 'Dhuhr',
                'prayer.asr': 'Asr',
                'prayer.maghrib': 'Maghrib',
                'prayer.isha': 'Isha',
                'prayer.tomorrow': 'Demain',
                
                // Settings Screen
                'settings': 'Paramètres',
                'back': 'Retour',
                'location.title': 'Emplacement',
                'location.mode': 'Mode de Localisation',
                'location.mode.city': 'Sélectionner Pays et Ville',
                'location.mode.manual': 'Coordonnées Manuelles',
                'location.search': 'Rechercher un Lieu',
                'location.search.placeholder': 'Tapez le nom de la ville ou du pays...',
                'location.no.results': 'Aucun lieu trouvé. Essayez une autre recherche.',
                'latitude': 'Latitude',
                'longitude': 'Longitude',
                'timezone': 'Décalage Horaire (heures)',
                'calculation.method': 'Méthode de Calcul',
                'method': 'Méthode',
                'notification.style': 'Style de Notification',
                'style': 'Style',
                'language': 'Langue',
                'save.settings': 'Sauvegarder',
                
                // Calculation Methods
                'method.mwl': 'Ligue Islamique Mondiale',
                'method.isna': "Société Islamique d'Amérique du Nord",
                'method.egypt': 'Autorité Générale Égyptienne',
                'method.makkah': 'Umm Al-Qura, La Mecque',
                'method.karachi': 'Université des Sciences Islamiques, Karachi',
                'method.tehran': 'Institut de Géophysique, Téhéran',
                'method.jafari': 'Chiite Ithna-Ashari (Jafari)',
                
                // Notification Styles
                'notification.toast': 'Toast (Bannière Inférieure)',
                'notification.fullscreen': 'Plein Écran',
                
                // Languages
                'lang.en': 'English (Anglais)',
                'lang.ar': 'العربية (Arabe)',
                'lang.fr': 'Français',
                'lang.de': 'Deutsch (Allemand)',
                'lang.es': 'Español (Espagnol)',
                
                // Notifications
                'prayer.time': 'Heure de Prière',
                'dismiss': 'Fermer',
                
                // Messages
                'settings.saved': 'Paramètres enregistrés avec succès!',
                'error.saving': "Erreur lors de l'enregistrement",
                'error.invalid.coordinates': "Veuillez entrer des coordonnées et un fuseau horaire valides",
                'error.no.location.selected': 'Veuillez rechercher et sélectionner un lieu',
                'error.latitude.range': 'La latitude doit être entre -90 et 90',
                'error.longitude.range': 'La longitude doit être entre -180 et 180',
                
                // Placeholders
                'placeholder.latitude': 'ex: 21.4225',
                'placeholder.longitude': 'ex: 39.8262',
                'placeholder.timezone': 'ex: 3',
                
                // Help
                'help.instructions': '⬆️⬇️ Naviguer | ⬅️➡️ Menu | OK Activer/Sélectionner | 🔙 Retour',
                
                // Background Notice
                'background.notice': 'Gardez l\'app visible pour les notifications - Idéal pour écrans dédiés',
                
                // Test Mode
                'test.mode': 'Mode Test',
                'test.mode.label': 'Activer Notifications Test (Toutes les 3 min)',
                'test.mode.off': 'Désactivé',
                'test.mode.on': 'Activé (Test)',
                'test.mode.warning': '⚠️ Le mode test envoie des notifications toutes les 3 minutes. Désactivez après le test!'
            },
            
            de: {
                // Home Screen
                'app.title': 'Gebetszeiten',
                'next.prayer': 'Nächstes Gebet',
                'today.schedule': 'Heutiger Zeitplan',
                'location.not.set': 'Standort nicht festgelegt - Zu den Einstellungen gehen',
                'location': 'Standort',
                
                // Prayer Names
                'prayer.fajr': 'Fajr',
                'prayer.sunrise': 'Sonnenaufgang',
                'prayer.dhuhr': 'Dhuhr',
                'prayer.asr': 'Asr',
                'prayer.maghrib': 'Maghrib',
                'prayer.isha': 'Isha',
                'prayer.tomorrow': 'Morgen',
                
                // Settings Screen
                'settings': 'Einstellungen',
                'back': 'Zurück',
                'location.title': 'Standort',
                'location.mode': 'Standortmodus',
                'location.mode.city': 'Land und Stadt Wählen',
                'location.mode.manual': 'Manuelle Koordinaten',
                'location.search': 'Standort Suchen',
                'location.search.placeholder': 'Geben Sie Stadt oder Land ein...',
                'location.no.results': 'Keine Standorte gefunden. Versuchen Sie eine andere Suche.',
                'latitude': 'Breitengrad',
                'longitude': 'Längengrad',
                'timezone': 'Zeitzonenversatz (Stunden)',
                'calculation.method': 'Berechnungsmethode',
                'method': 'Methode',
                'notification.style': 'Benachrichtigungsstil',
                'style': 'Stil',
                'language': 'Sprache',
                'save.settings': 'Speichern',
                
                // Calculation Methods
                'method.mwl': 'Muslimische Weltliga',
                'method.isna': 'Islamische Gesellschaft Nordamerikas',
                'method.egypt': 'Ägyptische Allgemeine Behörde',
                'method.makkah': 'Umm Al-Qura, Mekka',
                'method.karachi': 'Universität für Islamische Wissenschaften, Karachi',
                'method.tehran': 'Institut für Geophysik, Teheran',
                'method.jafari': 'Schiitisch Ithna-Ashari (Jafari)',
                
                // Notification Styles
                'notification.toast': 'Toast (Unteres Banner)',
                'notification.fullscreen': 'Vollbild-Overlay',
                
                // Languages
                'lang.en': 'English (Englisch)',
                'lang.ar': 'العربية (Arabisch)',
                'lang.fr': 'Français (Französisch)',
                'lang.de': 'Deutsch',
                'lang.es': 'Español (Spanisch)',
                
                // Notifications
                'prayer.time': 'Gebetszeit',
                'dismiss': 'Schließen',
                
                // Messages
                'settings.saved': 'Einstellungen erfolgreich gespeichert!',
                'error.saving': 'Fehler beim Speichern',
                'error.invalid.coordinates': 'Bitte geben Sie gültige Koordinaten und Zeitzone ein',
                'error.no.location.selected': 'Bitte suchen und wählen Sie einen Standort',
                'error.latitude.range': 'Breitengrad muss zwischen -90 und 90 liegen',
                'error.longitude.range': 'Längengrad muss zwischen -180 und 180 liegen',
                
                // Placeholders
                'placeholder.latitude': 'z.B. 21.4225',
                'placeholder.longitude': 'z.B. 39.8262',
                'placeholder.timezone': 'z.B. 3',
                
                // Help
                'help.instructions': '⬆️⬇️ Navigieren | ⬅️➡️ Menü | OK Aktivieren/Wählen | 🔙 Zurück',
                
                // Background Notice
                'background.notice': 'App sichtbar halten für Benachrichtigungen - Beste für dedizierte Displays',
                
                // Test Mode
                'test.mode': 'Testmodus',
                'test.mode.label': 'Test-Benachrichtigungen Aktivieren (Alle 3 Min)',
                'test.mode.off': 'Aus',
                'test.mode.on': 'Ein (Test)',
                'test.mode.warning': '⚠️ Testmodus sendet alle 3 Minuten Benachrichtigungen. Nach Test deaktivieren!'
            },
            
            es: {
                // Home Screen
                'app.title': 'Horarios de Oración',
                'next.prayer': 'Próxima Oración',
                'today.schedule': 'Horario de Hoy',
                'location.not.set': 'Ubicación no establecida - Ir a Ajustes',
                'location': 'Ubicación',
                
                // Prayer Names
                'prayer.fajr': 'Fajr',
                'prayer.sunrise': 'Amanecer',
                'prayer.dhuhr': 'Dhuhr',
                'prayer.asr': 'Asr',
                'prayer.maghrib': 'Maghrib',
                'prayer.isha': 'Isha',
                'prayer.tomorrow': 'Mañana',
                
                // Settings Screen
                'settings': 'Ajustes',
                'back': 'Volver',
                'location.title': 'Ubicación',
                'location.mode': 'Modo de Ubicación',
                'location.mode.city': 'Seleccionar País y Ciudad',
                'location.mode.manual': 'Coordenadas Manuales',
                'location.search': 'Buscar Ubicación',
                'location.search.placeholder': 'Escribe nombre de ciudad o país...',
                'location.no.results': 'No se encontraron ubicaciones. Intenta otra búsqueda.',
                'latitude': 'Latitud',
                'longitude': 'Longitud',
                'timezone': 'Zona Horaria (horas)',
                'calculation.method': 'Método de Cálculo',
                'method': 'Método',
                'notification.style': 'Estilo de Notificación',
                'style': 'Estilo',
                'language': 'Idioma',
                'save.settings': 'Guardar Ajustes',
                
                // Calculation Methods
                'method.mwl': 'Liga Mundial Musulmana',
                'method.isna': 'Sociedad Islámica de América del Norte',
                'method.egypt': 'Autoridad General Egipcia',
                'method.makkah': 'Umm Al-Qura, La Meca',
                'method.karachi': 'Universidad de Ciencias Islámicas, Karachi',
                'method.tehran': 'Instituto de Geofísica, Teherán',
                'method.jafari': 'Chiita Ithna-Ashari (Jafari)',
                
                // Notification Styles
                'notification.toast': 'Toast (Banner Inferior)',
                'notification.fullscreen': 'Pantalla Completa',
                
                // Languages
                'lang.en': 'English (Inglés)',
                'lang.ar': 'العربية (Árabe)',
                'lang.fr': 'Français (Francés)',
                'lang.de': 'Deutsch (Alemán)',
                'lang.es': 'Español',
                
                // Notifications
                'prayer.time': 'Hora de Oración',
                'dismiss': 'Cerrar',
                
                // Messages
                'settings.saved': '¡Ajustes guardados correctamente!',
                'error.saving': 'Error al guardar ajustes',
                'error.invalid.coordinates': 'Por favor ingrese coordenadas y zona horaria válidas',
                'error.no.location.selected': 'Por favor busque y seleccione una ubicación',
                'error.latitude.range': 'La latitud debe estar entre -90 y 90',
                'error.longitude.range': 'La longitud debe estar entre -180 y 180',
                
                // Placeholders
                'placeholder.latitude': 'ej: 21.4225',
                'placeholder.longitude': 'ej: 39.8262',
                'placeholder.timezone': 'ej: 3',
                
                // Help
                'help.instructions': '⬆️⬇️ Navegar | ⬅️➡️ Menú | OK Activar/Seleccionar | 🔙 Volver',
                
                // Background Notice
                'background.notice': 'Mantén app visible para notificaciones - Mejor para pantallas dedicadas',
                
                // Test Mode
                'test.mode': 'Modo Prueba',
                'test.mode.label': 'Activar Notificaciones de Prueba (Cada 3 min)',
                'test.mode.off': 'Desactivado',
                'test.mode.on': 'Activado (Prueba)',
                'test.mode.warning': '⚠️ El modo prueba envía notificaciones cada 3 minutos. ¡Desactívelo después de probar!'
            }
        };
    }

    // Get translation for a key
    t(key, fallback = null) {
        const translation = this.translations[this.currentLocale]?.[key];
        if (translation) {
            return translation;
        }
        
        // Fallback to English
        const englishTranslation = this.translations['en']?.[key];
        if (englishTranslation) {
            return englishTranslation;
        }
        
        // Return fallback or key itself
        return fallback || key;
    }

    // Set current locale
    setLocale(locale) {
        if (this.translations[locale]) {
            this.currentLocale = locale;
            this.applyLocale();
            return true;
        }
        return false;
    }

    // Get current locale
    getLocale() {
        return this.currentLocale;
    }

    // Check if language is RTL
    isRTL() {
        return this.rtlLanguages.includes(this.currentLocale);
    }

    // Apply locale to the page
    applyLocale() {
        const html = document.documentElement;
        const body = document.body;
        
        // Set language attribute
        html.setAttribute('lang', this.currentLocale);
        
        // Set text direction
        if (this.isRTL()) {
            html.setAttribute('dir', 'rtl');
            body.classList.add('rtl');
        } else {
            html.setAttribute('dir', 'ltr');
            body.classList.remove('rtl');
        }
        
        // Update all translatable elements
        this.updateTranslatableElements();
    }

    // Update all elements with data-i18n attribute
    updateTranslatableElements() {
        // Text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });
        
        // Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
        
        // Values (for option elements)
        document.querySelectorAll('[data-i18n-value]').forEach(element => {
            const key = element.getAttribute('data-i18n-value');
            element.textContent = this.t(key);
        });
    }

    // Get available locales
    getAvailableLocales() {
        return Object.keys(this.translations);
    }
}

// Create global instance
const i18n = new I18nManager();

