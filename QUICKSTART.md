# Quick Start Guide

Get your Adhan Reminder app running in 5 steps!

## Prerequisites Check

- [ ] LG Smart TV with webOS (2014 or newer)
- [ ] TV connected to same network as your computer
- [ ] Node.js installed on your computer
- [ ] 10 minutes of time

## Step 1: Install webOS Tools (2 minutes)

```bash
npm install -g @webos-tools/cli
```

## Step 2: Enable Developer Mode on TV (2 minutes)

1. On TV: Open **LG Content Store**
2. Search and install **Developer Mode**
3. Launch Developer Mode app
4. Turn ON Developer Mode
5. Note the IP address shown
6. Restart your TV

## Step 3: Create Icon Files (1 minute)

You need to convert the SVG icons to PNG. Easiest method:

1. Go to https://cloudconvert.com/svg-to-png
2. Upload `icon.svg` → Convert to 80x80 PNG
3. Upload `largeIcon.svg` → Convert to 130x130 PNG
4. Save as `icon.png` and `largeIcon.png` in the project folder

**OR** use this quick command if you have ImageMagick:
```bash
convert -background none -resize 80x80 icon.svg icon.png
convert -background none -resize 130x130 largeIcon.svg largeIcon.png
```

## Step 4: Connect and Install (3 minutes)

```bash
# Setup TV connection
ares-setup-device

# When prompted, enter:
# - Name: mytv
# - IP: [your TV's IP from step 2]
# - Port: 9922
# - Username: prisoner
# - Password: [leave blank]

# Package the app
cd ./adhan
ares-package .

# Install on TV
ares-install com.adhan.reminder_1.0.0_all.ipk -d mytv

# Launch the app
ares-launch com.adhan.reminder -d mytv
```

## Step 5: Configure App on TV (2 minutes)

1. On TV: App launches automatically
2. Press Settings button (⚙️)
3. Enter your location:
   - Latitude: e.g., 24.8607
   - Longitude: e.g., 67.0011
   - Timezone: e.g., 5
4. Select calculation method: e.g., "Muslim World League"
5. Choose notification style: "Toast" or "Fullscreen"
6. Press "Save Settings"

**Done!** Your prayer times will now show with live countdown.

## Finding Your Coordinates (30 seconds)

**Easy way:**
1. Google: "coordinates of [your city]"
2. Or visit: https://www.latlong.net/
3. Enter your city name
4. Copy the decimal coordinates

**Common Cities:**
```
Mecca:     21.4225,  39.8262,  +3
Medina:    24.4672,  39.6111,  +3
Cairo:     30.0444,  31.2357,  +2
Istanbul:  41.0082,  28.9784,  +3
Dubai:     25.2048,  55.2708,  +4
Karachi:   24.8607,  67.0011,  +5
Delhi:     28.6139,  77.2090,  +5.5
Jakarta:   -6.2088, 106.8456,  +7
Kuala Lumpur: 3.1390, 101.6869, +8
```

## Troubleshooting

**Can't connect to TV?**
```bash
# Check if TV is reachable
ping [TV_IP_ADDRESS]

# Verify device setup
ares-device-info -d mytv
```

**App won't install?**
- Ensure Developer Mode is ON
- Restart TV and try again
- Check you've created the PNG icon files

**Prayer times wrong?**
- Verify coordinates are correct (decimal format)
- Check timezone offset
- Try different calculation method

## Need More Help?

- **Detailed installation**: See [INSTALLATION.md](INSTALLATION.md)
- **Using the app**: See [USAGE.md](USAGE.md)
- **Icon creation**: See [ICONS.md](ICONS.md)
- **General info**: See [README.md](README.md)

## Daily Use

Once installed and configured:
1. Open the app on your TV
2. Leave it running
3. You'll get notifications at each prayer time
4. That's it!

## Commands Reference

```bash
# Package app
ares-package .

# Install app
ares-install com.adhan.reminder_1.0.0_all.ipk -d mytv

# Launch app
ares-launch com.adhan.reminder -d mytv

# Close app
ares-close com.adhan.reminder -d mytv

# Uninstall app
ares-install --remove com.adhan.reminder -d mytv

# Check TV info
ares-device-info -d mytv

# List installed apps
ares-install --list -d mytv
```

## Next Steps

After getting it running:
1. ✅ Test notifications by waiting for next prayer time
2. ✅ Adjust notification style if needed
3. ✅ Try different calculation methods to match local mosque
4. ✅ Set TV to auto-launch app on startup (optional)

Enjoy your prayer time reminders! 🕌

