# Icon Files

The app requires PNG icon files, but this repository includes SVG versions that need to be converted.

## Required Icons

1. **icon.png** - 80x80 pixels
2. **largeIcon.png** - 130x130 pixels

## Converting SVG to PNG

### Option 1: Using Online Tools

1. Go to https://cloudconvert.com/svg-to-png
2. Upload `icon.svg` and `largeIcon.svg`
3. Set output dimensions:
   - icon.svg → 80x80 pixels
   - largeIcon.svg → 130x130 pixels
4. Download the converted PNG files
5. Rename them to `icon.png` and `largeIcon.png`
6. Place them in the root directory

### Option 2: Using ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
# Convert icon
convert -background none -resize 80x80 icon.svg icon.png

# Convert large icon
convert -background none -resize 130x130 largeIcon.svg largeIcon.png
```

### Option 3: Using Inkscape (Command Line)

If you have Inkscape installed:

```bash
# Convert icon
inkscape icon.svg --export-type=png --export-width=80 --export-height=80 --export-filename=icon.png

# Convert large icon
inkscape largeIcon.svg --export-type=png --export-width=130 --export-height=130 --export-filename=largeIcon.png
```

### Option 4: Using Design Software

1. Open the SVG files in:
   - Adobe Illustrator
   - Sketch
   - Figma
   - GIMP
   - Any vector graphics editor
2. Export as PNG with the correct dimensions
3. Save in the root directory

## Creating Custom Icons

If you want to create custom icons:

1. Design your icon at the required size
2. Use Islamic/mosque themed imagery
3. Keep it simple and recognizable at small sizes
4. Use the app's color scheme:
   - Primary: #2c5f2d (green)
   - Accent: #ffd700 (gold)
   - Background: White or transparent
5. Save as PNG with transparency
6. Test on your TV to ensure visibility

## Icon Guidelines

- **Format**: PNG with transparency
- **Sizes**: Exactly 80x80 and 130x130 pixels
- **Color depth**: 24-bit or 32-bit (with alpha channel)
- **Content**: Should represent prayer/Islamic theme
- **Visibility**: Should be clear on both light and dark backgrounds

## Placeholder Icons

Until you convert the SVG files, you can create simple placeholder PNGs:

1. Create solid color squares (80x80 and 130x130)
2. Use any color (green recommended)
3. Name them icon.png and largeIcon.png
4. The app will work, just with basic icons

## Troubleshooting

**App won't install without icons:**
- webOS requires icon files to be present
- Even basic placeholder PNGs will work
- The icons must be named exactly as specified

**Icons look blurry on TV:**
- Ensure exact pixel dimensions (80x80, 130x130)
- Use PNG, not JPEG
- Don't upscale smaller images

**Icons don't show in launcher:**
- Clear TV cache
- Reinstall the app
- Check file names are correct (case-sensitive)

