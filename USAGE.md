# Adhan Reminder - User Guide

## Overview

Adhan Reminder is a prayer time notification app for LG Smart TVs. It calculates prayer times based on your location and displays notifications at the appropriate times.

## First Time Setup

### 1. Launch the App

Find and launch "Azan Reminder" from your LG TV's app list.

### 2. Configure Location

On first launch, you'll see the home screen with "Location not set" message.

1. Press the **Settings** button (⚙️ icon in top right)
2. Enter your location details:
   - **Latitude**: Your geographical latitude
   - **Longitude**: Your geographical longitude  
   - **Timezone Offset**: Hours difference from UTC

**Example Locations:**
- **Mecca, Saudi Arabia**: 21.4225, 39.8262, +3
- **Cairo, Egypt**: 30.0444, 31.2357, +2
- **Istanbul, Turkey**: 41.0082, 28.9784, +3
- **Karachi, Pakistan**: 24.8607, 67.0011, +5
- **Jakarta, Indonesia**: -6.2088, 106.8456, +7

### 3. Select Calculation Method

Different Islamic authorities use different calculation methods:

- **Muslim World League (MWL)**: Most widely used globally
- **ISNA**: Used in North America
- **Egyptian**: Used in Egypt and surrounding areas
- **Umm Al-Qura (Makkah)**: Used in Saudi Arabia
- **University of Karachi**: Used in Pakistan
- **Tehran**: Used in Iran
- **Jafari**: Used by Shia Muslims

Choose the method most appropriate for your region or preference.

### 4. Choose Notification Style

- **Toast**: Small banner at the bottom of the screen (less intrusive)
- **Fullscreen**: Full-screen overlay (more prominent)

### 5. Save Settings

Press **Save Settings** button to apply your configuration.

## Home Screen

The home screen displays:

### Next Prayer Section
- Name of the next prayer
- Live countdown timer showing hours:minutes:seconds until next prayer

### Today's Schedule
Complete list of today's prayer times:
- **Fajr**: Dawn prayer
- **Sunrise**: Sun rises (not a prayer, but marks end of Fajr time)
- **Dhuhr**: Noon prayer
- **Asr**: Afternoon prayer
- **Maghrib**: Sunset prayer
- **Isha**: Night prayer

### Footer Information
- Your current location coordinates
- Current date

## Using the App

### Normal Operation

1. **Keep the app running**: The app needs to be open to display notifications
2. **Automatic notifications**: At each prayer time, you'll receive a notification based on your preferred style
3. **Live countdown**: Watch the countdown to the next prayer on the home screen
4. **Daily updates**: Prayer times automatically recalculate at midnight

### Notifications

#### Toast Notification
- Appears at the bottom of the screen
- Shows prayer name and time
- Includes a dismiss button (✕)
- Automatically disappears after 30 seconds

#### Fullscreen Notification  
- Takes over the entire screen
- Shows large prayer name and time with mosque icon
- Includes a dismiss button
- Automatically disappears after 30 seconds

### Navigation

**Remote Control:**
- **Arrow Keys**: Navigate between elements
- **Enter/OK**: Select buttons
- **Back**: Return to previous screen or dismiss notifications
- **Settings button**: Access settings from home screen

**Keyboard (if available):**
- **Escape**: Go back or dismiss notifications

## Changing Settings

1. From the home screen, press the **Settings** button (⚙️)
2. Modify any settings you want to change
3. Press **Save Settings**
4. Prayer times will recalculate automatically
5. You'll return to the home screen

## Tips and Best Practices

### Accurate Prayer Times

1. **Use precise coordinates**: More decimal places = more accuracy
2. **Verify timezone**: Account for daylight saving time if applicable
3. **Test your method**: Different calculation methods can vary by several minutes
4. **Check against local mosque**: Verify times match your local mosque

### Getting Your Coordinates

**Method 1: Google Maps**
1. Open Google Maps on computer or phone
2. Right-click (or long-press) your location
3. Click on the coordinates shown
4. Copy latitude and longitude

**Method 2: GPS App**
1. Use any GPS or location app on your phone
2. Note the decimal degree coordinates
3. Enter in the app settings

**Method 3: Online Search**
1. Search "coordinates of [your city]"
2. Use a coordinates finder website
3. Make note of decimal format (not degrees/minutes/seconds)

### Timezone Calculation

Find your timezone offset from UTC:
- **East of Greenwich**: Positive (+1, +2, +3, etc.)
- **West of Greenwich**: Negative (-5, -6, -7, etc.)
- **Daylight Saving Time**: Add 1 hour when in effect

**Common Timezones:**
- EST (New York): -5 (-4 during DST)
- GMT (London): 0 (+1 during BST)
- CET (Paris): +1 (+2 during CEST)
- GST (Dubai): +4
- PKT (Pakistan): +5
- WIB (Jakarta): +7

## Troubleshooting

### Prayer times seem wrong
- Double-check your coordinates
- Verify timezone offset (including DST)
- Try a different calculation method
- Compare with a reliable local source

### Countdown not showing
- Ensure location is configured
- Check if settings were saved properly
- Try refreshing by going to settings and back

### Notifications not appearing
- Keep the app open and in foreground
- Check notification style setting
- Verify TV sound/notification settings
- Each prayer is notified only once per day

### App is slow or unresponsive
- Close and relaunch the app
- Check if TV has available memory
- Restart your TV

## Privacy

This app:
- ✅ Stores all data locally on your TV
- ✅ Does not send any data to external servers
- ✅ Does not require internet connection (after installation)
- ✅ Does not track or collect personal information

## Updates

To update to a newer version:
1. Download the new version IPK file
2. Install using webOS CLI tools
3. Your settings will be preserved

## Support

For technical support:
- Check INSTALLATION.md for setup issues
- Review README.md for development information
- Check the project repository for updates

## Keyboard Shortcuts

- **Escape**: Back/Dismiss
- **Arrow Keys**: Navigate
- **Enter**: Select/Confirm
- **Tab**: Move between fields

## Best Practices for TV Apps

1. **Keep app visible**: Notifications only work when app is open
2. **Auto-launch**: Consider setting app to auto-launch on TV startup
3. **Screen saver**: Adjust TV screen saver settings to prevent app closing
4. **Updates**: Check for app updates periodically

## FAQ

**Q: Do I need internet for the app to work?**  
A: No, once installed and configured, the app works offline.

**Q: Can I run other apps while waiting for prayer time?**  
A: No, the app needs to stay in the foreground to show notifications.

**Q: How accurate are the prayer times?**  
A: Very accurate if coordinates and settings are correct, within 1-2 minutes.

**Q: Can I use this for multiple locations?**  
A: You'll need to update settings when traveling to a new location.

**Q: Will this work on all LG TVs?**  
A: Works on LG Smart TVs running webOS (2014 and newer models).

**Q: Does it account for daylight saving time?**  
A: No, you'll need to manually adjust timezone offset during DST changes.

