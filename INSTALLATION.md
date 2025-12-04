# Installation Guide for Adhan Reminder on LG webOS TV

## Prerequisites

1. **LG webOS TV SDK** - Download and install from LG Developer website
2. **Node.js** - Required for webOS CLI tools
3. **webOS CLI Tools** - Install using npm:
   ```bash
   npm install -g @webos-tools/cli
   ```

## Step 1: Enable Developer Mode on TV

1. On your LG TV, open the **LG Content Store**
2. Search for and install **Developer Mode** app
3. Launch Developer Mode app
4. Turn ON Developer Mode
5. Set a Key Server (if prompted)
6. Note down your TV's IP address
7. Restart your TV

## Step 2: Set Up TV Connection

1. Add your TV as a device:
   ```bash
   ares-setup-device
   ```

2. Follow the prompts:
   - Device name: Enter a name (e.g., "mytv")
   - IP address: Enter your TV's IP address
   - Port: 9922 (default)
   - Username: prisoner
   - Authentication: password
   - Password: (leave blank)
   - Description: Optional

3. Verify connection:
   ```bash
   ares-device-info -d mytv
   ```

## Step 3: Package the App

Navigate to the app directory and create the package:

```bash
cd ./adhan
ares-package .
```

This will create `com.adhan.reminder_1.0.0_all.ipk`

## Step 4: Install on TV

Install the packaged app to your TV:

```bash
ares-install com.adhan.reminder_1.0.0_all.ipk -d mytv
```

Replace `mytv` with your device name from Step 2.

## Step 5: Launch the App

Launch the app on your TV:

```bash
ares-launch com.adhan.reminder -d mytv
```

Or find it in your TV's app launcher.

## Step 6: Configure the App

1. Open the app on your TV
2. Press the Settings (⚙️) button
3. Enter your location:
   - **Latitude**: Your location's latitude (e.g., 21.4225 for Mecca)
   - **Longitude**: Your location's longitude (e.g., 39.8262 for Mecca)
   - **Timezone**: Your timezone offset in hours (e.g., 3 for Saudi Arabia)
4. Select your preferred **Calculation Method**
5. Choose your **Notification Style** (Toast or Fullscreen)
6. Press **Save Settings**

## Finding Your Coordinates

You can find your coordinates in several ways:

1. **Google Maps**: Right-click on your location → Click on coordinates
2. **Online tools**: Search "my coordinates" in Google
3. **GPS apps**: Use any GPS app on your smartphone

## Timezone Offset

The timezone offset is the number of hours your location is ahead (+) or behind (-) UTC:

- New York: -5 (or -4 during DST)
- London: 0 (or +1 during BST)
- Dubai: +4
- Saudi Arabia: +3
- Pakistan: +5
- Malaysia: +8

## Troubleshooting

### App won't install
- Ensure Developer Mode is ON
- Check TV is on same network
- Verify device setup with `ares-device-info`

### Can't connect to TV
- Check firewall settings
- Ensure port 9922 is not blocked
- Try rebooting the TV

### Prayer times are incorrect
- Verify your coordinates are correct
- Check timezone offset (including DST)
- Try a different calculation method

### Notifications not showing
- Ensure the app is running
- Check notification style in settings
- The app must remain open for notifications

## Updating the App

To update the app after making changes:

1. Package: `ares-package .`
2. Install: `ares-install com.adhan.reminder_1.0.0_all.ipk -d mytv`
3. The new version will replace the old one

## Uninstalling

To remove the app from your TV:

```bash
ares-install --remove com.adhan.reminder -d mytv
```

## Support

For issues or questions, please check:
- LG webOS Developer Documentation
- webOS TV Forum
- Project README.md

