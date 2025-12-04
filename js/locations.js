/*
 * Locations Database
 * Major cities around the world with their coordinates
 */

const LocationsDB = {
    // Saudi Arabia
    'Saudi Arabia': {
        'Mecca': { lat: 21.4225, lng: 39.8262, tz: 3 },
        'Medina': { lat: 24.5247, lng: 39.5692, tz: 3 },
        'Riyadh': { lat: 24.7136, lng: 46.6753, tz: 3 },
        'Jeddah': { lat: 21.5433, lng: 39.1728, tz: 3 },
        'Dammam': { lat: 26.4207, lng: 50.0888, tz: 3 },
        'Taif': { lat: 21.2703, lng: 40.4158, tz: 3 }
    },
    
    // United Arab Emirates
    'United Arab Emirates': {
        'Dubai': { lat: 25.2048, lng: 55.2708, tz: 4 },
        'Abu Dhabi': { lat: 24.4539, lng: 54.3773, tz: 4 },
        'Sharjah': { lat: 25.3463, lng: 55.4209, tz: 4 },
        'Ajman': { lat: 25.4052, lng: 55.5136, tz: 4 }
    },
    
    // Egypt
    'Egypt': {
        'Cairo': { lat: 30.0444, lng: 31.2357, tz: 2 },
        'Alexandria': { lat: 31.2001, lng: 29.9187, tz: 2 },
        'Giza': { lat: 30.0131, lng: 31.2089, tz: 2 }
    },
    
    // Turkey
    'Turkey': {
        'Istanbul': { lat: 41.0082, lng: 28.9784, tz: 3 },
        'Ankara': { lat: 39.9334, lng: 32.8597, tz: 3 },
        'Izmir': { lat: 38.4237, lng: 27.1428, tz: 3 }
    },
    
    // Pakistan
    'Pakistan': {
        'Karachi': { lat: 24.8607, lng: 67.0011, tz: 5 },
        'Lahore': { lat: 31.5497, lng: 74.3436, tz: 5 },
        'Islamabad': { lat: 33.6844, lng: 73.0479, tz: 5 },
        'Peshawar': { lat: 34.0151, lng: 71.5249, tz: 5 }
    },
    
    // Indonesia
    'Indonesia': {
        'Jakarta': { lat: -6.2088, lng: 106.8456, tz: 7 },
        'Surabaya': { lat: -7.2575, lng: 112.7521, tz: 7 },
        'Bandung': { lat: -6.9175, lng: 107.6191, tz: 7 },
        'Medan': { lat: 3.5952, lng: 98.6722, tz: 7 }
    },
    
    // Malaysia
    'Malaysia': {
        'Kuala Lumpur': { lat: 3.1390, lng: 101.6869, tz: 8 },
        'Penang': { lat: 5.4164, lng: 100.3327, tz: 8 },
        'Johor Bahru': { lat: 1.4927, lng: 103.7414, tz: 8 }
    },
    
    // United Kingdom
    'United Kingdom': {
        'London': { lat: 51.5074, lng: -0.1278, tz: 0 },
        'Birmingham': { lat: 52.4862, lng: -1.8904, tz: 0 },
        'Manchester': { lat: 53.4808, lng: -2.2426, tz: 0 },
        'Glasgow': { lat: 55.8642, lng: -4.2518, tz: 0 }
    },
    
    // United States
    'United States': {
        'New York': { lat: 40.7128, lng: -74.0060, tz: -5 },
        'Los Angeles': { lat: 34.0522, lng: -118.2437, tz: -8 },
        'Chicago': { lat: 41.8781, lng: -87.6298, tz: -6 },
        'Houston': { lat: 29.7604, lng: -95.3698, tz: -6 },
        'Detroit': { lat: 42.3314, lng: -83.0458, tz: -5 },
        'Washington DC': { lat: 38.9072, lng: -77.0369, tz: -5 }
    },
    
    // Canada
    'Canada': {
        'Toronto': { lat: 43.6532, lng: -79.3832, tz: -5 },
        'Montreal': { lat: 45.5017, lng: -73.5673, tz: -5 },
        'Vancouver': { lat: 49.2827, lng: -123.1207, tz: -8 },
        'Calgary': { lat: 51.0447, lng: -114.0719, tz: -7 }
    },
    
    // France
    'France': {
        'Paris': { lat: 48.8566, lng: 2.3522, tz: 1 },
        'Marseille': { lat: 43.2965, lng: 5.3698, tz: 1 },
        'Lyon': { lat: 45.7640, lng: 4.8357, tz: 1 }
    },
    
    // Germany
    'Germany': {
        'Berlin': { lat: 52.5200, lng: 13.4050, tz: 1 },
        'Hamburg': { lat: 53.5511, lng: 9.9937, tz: 1 },
        'Munich': { lat: 48.1351, lng: 11.5820, tz: 1 },
        'Frankfurt': { lat: 50.1109, lng: 8.6821, tz: 1 }
    },
    
    // Morocco
    'Morocco': {
        'Casablanca': { lat: 33.5731, lng: -7.5898, tz: 1 },
        'Rabat': { lat: 34.0209, lng: -6.8416, tz: 1 },
        'Marrakech': { lat: 31.6295, lng: -7.9811, tz: 1 }
    },
    
    // Jordan
    'Jordan': {
        'Amman': { lat: 31.9454, lng: 35.9284, tz: 2 },
        'Zarqa': { lat: 32.0667, lng: 36.1000, tz: 2 }
    },
    
    // Kuwait
    'Kuwait': {
        'Kuwait City': { lat: 29.3759, lng: 47.9774, tz: 3 }
    },
    
    // Qatar
    'Qatar': {
        'Doha': { lat: 25.2854, lng: 51.5310, tz: 3 }
    },
    
    // Bahrain
    'Bahrain': {
        'Manama': { lat: 26.2285, lng: 50.5860, tz: 3 }
    },
    
    // Oman
    'Oman': {
        'Muscat': { lat: 23.5880, lng: 58.3829, tz: 4 }
    },
    
    // Iraq
    'Iraq': {
        'Baghdad': { lat: 33.3152, lng: 44.3661, tz: 3 },
        'Basra': { lat: 30.5085, lng: 47.7804, tz: 3 }
    },
    
    // Syria
    'Syria': {
        'Damascus': { lat: 33.5138, lng: 36.2765, tz: 2 },
        'Aleppo': { lat: 36.2021, lng: 37.1343, tz: 2 }
    },
    
    // Lebanon
    'Lebanon': {
        'Beirut': { lat: 33.8886, lng: 35.4955, tz: 2 }
    },
    
    // Palestine
    'Palestine': {
        'Jerusalem': { lat: 31.7683, lng: 35.2137, tz: 2 },
        'Gaza': { lat: 31.5, lng: 34.4667, tz: 2 }
    },
    
    // Iran
    'Iran': {
        'Tehran': { lat: 35.6892, lng: 51.3890, tz: 3.5 },
        'Mashhad': { lat: 36.2605, lng: 59.6168, tz: 3.5 },
        'Isfahan': { lat: 32.6546, lng: 51.6680, tz: 3.5 }
    },
    
    // Bangladesh
    'Bangladesh': {
        'Dhaka': { lat: 23.8103, lng: 90.4125, tz: 6 },
        'Chittagong': { lat: 22.3569, lng: 91.7832, tz: 6 }
    },
    
    // India
    'India': {
        'Mumbai': { lat: 19.0760, lng: 72.8777, tz: 5.5 },
        'Delhi': { lat: 28.7041, lng: 77.1025, tz: 5.5 },
        'Bangalore': { lat: 12.9716, lng: 77.5946, tz: 5.5 },
        'Hyderabad': { lat: 17.3850, lng: 78.4867, tz: 5.5 },
        'Kolkata': { lat: 22.5726, lng: 88.3639, tz: 5.5 }
    },
    
    // Singapore
    'Singapore': {
        'Singapore': { lat: 1.3521, lng: 103.8198, tz: 8 }
    },
    
    // Australia
    'Australia': {
        'Sydney': { lat: -33.8688, lng: 151.2093, tz: 10 },
        'Melbourne': { lat: -37.8136, lng: 144.9631, tz: 10 },
        'Brisbane': { lat: -27.4698, lng: 153.0251, tz: 10 },
        'Perth': { lat: -31.9505, lng: 115.8605, tz: 8 }
    },
    
    // South Africa
    'South Africa': {
        'Johannesburg': { lat: -26.2041, lng: 28.0473, tz: 2 },
        'Cape Town': { lat: -33.9249, lng: 18.4241, tz: 2 },
        'Durban': { lat: -29.8587, lng: 31.0218, tz: 2 }
    },
    
    // Nigeria
    'Nigeria': {
        'Lagos': { lat: 6.5244, lng: 3.3792, tz: 1 },
        'Abuja': { lat: 9.0765, lng: 7.3986, tz: 1 },
        'Kano': { lat: 12.0022, lng: 8.5920, tz: 1 }
    },
    
    // Algeria
    'Algeria': {
        'Algiers': { lat: 36.7538, lng: 3.0588, tz: 1 },
        'Oran': { lat: 35.6969, lng: -0.6331, tz: 1 }
    },
    
    // Tunisia
    'Tunisia': {
        'Tunis': { lat: 36.8065, lng: 10.1815, tz: 1 }
    },
    
    // Libya
    'Libya': {
        'Tripoli': { lat: 32.8872, lng: 13.1913, tz: 2 }
    },
    
    // Somalia
    'Somalia': {
        'Mogadishu': { lat: 2.0469, lng: 45.3182, tz: 3 }
    }
};

// Get sorted list of countries
function getCountries() {
    return Object.keys(LocationsDB).sort();
}

// Get cities for a country
function getCities(country) {
    if (LocationsDB[country]) {
        return Object.keys(LocationsDB[country]).sort();
    }
    return [];
}

// Get location data for a city
function getLocationData(country, city) {
    if (LocationsDB[country] && LocationsDB[country][city]) {
        return LocationsDB[country][city];
    }
    return null;
}

