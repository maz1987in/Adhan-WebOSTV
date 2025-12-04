# Adhan Reminder for LG webOS TV

A beautiful, full-featured prayer time reminder application for LG Smart TVs running webOS.

## 🕌 Features

- **Automatic Prayer Time Calculation**: Uses astronomical calculations based on your location
- **Multiple Calculation Methods**: MWL, ISNA, Egyptian, Makkah, Karachi, Tehran, Jafari
- **Real-time Countdown**: Live countdown timer to the next prayer
- **Dual Notification Styles**: 
  - Toast notifications (subtle bottom banner)
  - Fullscreen notifications (prominent overlay)
- **Complete Daily Schedule**: Shows all 5 daily prayers plus sunrise
- **Persistent Settings**: Your configuration is saved locally
- **Beautiful UI**: Modern, TV-optimized interface with gradient backgrounds
- **Privacy-First**: All calculations done locally, no internet required after install
- **Remote Control Friendly**: Full navigation support with TV remote

## 📋 Quick Start

**New to this?** Check out [QUICKSTART.md](QUICKSTART.md) for a 5-step guide!

**TL;DR:**
```bash
# Install tools
npm install -g @webos-tools/cli

# Enable Developer Mode on your TV (via LG Content Store)

# icons size
  - icon.svg → 80x80 pixels
  - largeIcon.svg → 130x130 pixels

# Setup and install
ares-setup-device
ares-package .
ares-install com.adhan.reminder_1.0.0_all.ipk -d mytv
ares-launch com.adhan.reminder -d mytv
```

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 steps
- **[INSTALLATION.md](INSTALLATION.md)** - Detailed installation guide
- **[USAGE.md](USAGE.md)** - Complete user manual
- **[ICONS.md](ICONS.md)** - How to create app icons
- **[TESTING.md](TESTING.md)** - Testing and debugging guide

## 🎯 Requirements

### For TV
- LG Smart TV with webOS (2014 or newer)
- Developer Mode enabled
- Connected to your network

### For Development
- Node.js (v12 or higher)
- webOS TV CLI tools
- Basic command line knowledge

## 📱 Installation

### Step 1: Install webOS CLI Tools
```bash
npm install -g @webos-tools/cli
```

### Step 2: Enable Developer Mode on TV
1. Open LG Content Store on your TV
2. Install "Developer Mode" app
3. Launch and enable Developer Mode
4. Note the IP address
5. Restart TV

### Step 3: Create Icon Files
Convert the included SVG icons to PNG:
- `icon.svg` → `icon.png` (80x80)
- `largeIcon.svg` → `largeIcon.png` (130x130)

Use online tools or the included script:
```bash
./create-placeholder-icons.sh
```

See [ICONS.md](ICONS.md) for detailed instructions.

### Step 4: Connect and Install
```bash
# Setup TV connection
ares-setup-device
# Follow prompts: name=mytv, ip=[TV_IP], port=9922, user=prisoner

# Package and install
cd /path/to/adhan
ares-package .
ares-install com.adhan.reminder_1.0.0_all.ipk -d mytv
ares-launch com.adhan.reminder -d mytv
```

### Step 5: Configure
1. On TV: Open app
2. Press Settings (⚙️)
3. Enter location (lat, long, timezone)
4. Select calculation method
5. Choose notification style
6. Save settings

## ⚙️ Configuration

### Finding Your Coordinates
- **Google Maps**: Right-click location → Copy coordinates
- **Online**: Search "coordinates of [city name]"
- **GPS App**: Use any GPS app on your phone

### Example Locations
```
City              Latitude   Longitude  Timezone
─────────────────────────────────────────────────
Mecca             21.4225    39.8262    +3
Medina            24.4672    39.6111    +3
Cairo             30.0444    31.2357    +2
Istanbul          41.0082    28.9784    +3
Dubai             25.2048    55.2708    +4
Karachi           24.8607    67.0011    +5
Jakarta           -6.2088   106.8456    +7
```

### Calculation Methods
- **MWL**: Muslim World League (most common)
- **ISNA**: Islamic Society of North America
- **Egypt**: Egyptian General Authority
- **Makkah**: Umm Al-Qura, Makkah
- **Karachi**: University of Islamic Sciences
- **Tehran**: Institute of Geophysics, Tehran
- **Jafari**: Shia Ithna-Ashari

## 🏗️ Project Structure

```
adhan/
├── appinfo.json          # App metadata and permissions
├── index.html            # Main UI
├── css/
│   └── style.css         # Styling
├── js/
│   ├── app.js            # Main application logic
│   ├── prayer-times.js   # Prayer calculation engine
│   ├── storage.js        # Local storage management
│   └── notifications.js  # Notification system
├── icon.png              # App icon (80x80)
├── largeIcon.png         # Large icon (130x130)
├── icon.svg              # Icon source
├── largeIcon.svg         # Large icon source
├── package.json          # NPM package info
├── README.md             # This file
├── QUICKSTART.md         # Quick start guide
├── INSTALLATION.md       # Detailed installation
├── USAGE.md              # User manual
├── ICONS.md              # Icon creation guide
└── create-placeholder-icons.sh  # Icon helper script
```

## 🛠️ Development

### Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Prayer Calculations**: Custom astronomical algorithms
- **Storage**: localStorage API
- **Platform**: webOS TV SDK

### Local Development
```bash
# Clone/navigate to project
cd adhan

# Make changes to files
vim js/app.js

# Package
ares-package .

# Install/update on TV
ares-install com.adhan.reminder_1.0.0_all.ipk -d mytv

# Launch
ares-launch com.adhan.reminder -d mytv

# View logs
ares-inspect com.adhan.reminder -d mytv
```

### Key Components

**Prayer Time Calculator** (`js/prayer-times.js`)
- Astronomical calculations
- Multiple calculation methods
- Timezone handling

**Storage Manager** (`js/storage.js`)
- Settings persistence
- Notification tracking
- Configuration management

**Notification Manager** (`js/notifications.js`)
- Toast notifications
- Fullscreen overlays
- Auto-dismiss logic

**Main App** (`js/app.js`)
- UI management
- Navigation
- Background monitoring
- Countdown timer

## 🧪 Testing

See [TESTING.md](TESTING.md) for comprehensive testing guide.

Quick test checklist:
- [ ] App launches successfully
- [ ] Settings can be saved
- [ ] Prayer times display correctly
- [ ] Countdown updates every second
- [ ] Notifications appear at prayer time
- [ ] Both notification styles work
- [ ] Back button navigation works

## 🔧 Troubleshooting

### App won't install
- Ensure Developer Mode is enabled on TV
- Check TV and computer are on same network
- Verify device setup: `ares-device-info -d mytv`
- Try restarting TV

### Prayer times incorrect
- Verify coordinates are in decimal format
- Check timezone offset (including DST)
- Try different calculation method
- Compare with local mosque times

### Notifications not showing
- Ensure app is running (in foreground)
- Check notification style in settings
- Wait until actual prayer time
- Each prayer notifies only once per day

### Can't connect to TV
- Check IP address is correct
- Verify port 9922 is accessible
- Check firewall settings
- Ensure Developer Mode is still active

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Additional calculation methods
- Audio adhan playback
- Multiple location profiles
- Hijri calendar integration
- Qibla direction compass
- UI themes and customization

## 📄 License

MIT License - Feel free to use and modify for personal or commercial use.

## 🙏 Acknowledgments

- Prayer time calculation algorithms based on astronomical formulas
- Designed for the global Muslim community
- Built with ❤️ for LG webOS TV platform

## 📞 Support

- **Issues**: Check existing documentation first
- **Questions**: Review USAGE.md and INSTALLATION.md
- **Bugs**: Verify on actual TV hardware before reporting
- **Feature Requests**: Consider contributing!

## 🌟 Features Roadmap

- [ ] Audio adhan playback
- [ ] Multiple location profiles
- [ ] Hijri calendar display
- [ ] Qibla direction
- [ ] Prayer time adjustments (±15 minutes)
- [ ] Background service (even when TV is off)
- [ ] Customizable notification sounds
- [ ] Weekly/monthly prayer time view
- [ ] Export/import settings

## 📊 Version History

**v1.0.0** - Initial Release
- Prayer time calculation
- Toast and fullscreen notifications
- Settings management
- Real-time countdown
- Multiple calculation methods

---

Made with 🤲 for the Muslim community

