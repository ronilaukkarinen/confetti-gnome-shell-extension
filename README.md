
# 🎉 Confetti GNOME Shell Extension

A fun GNOME Shell extension that adds a confetti animation overlay, shooting particles from the bottom corners toward the center of the screen and floating down gradually. Perfect for celebrations right on your GNOME desktop!

## Features

- Confetti particles launch from the left and right bottom corners.
- Particles arc towards the center and gently float down for a natural effect.
- Simple enable/disable toggle to activate and deactivate the confetti animation.

## Installation

### Clone or download the extension

Clone this repository to your GNOME Shell extensions directory:

```bash
mkdir -p ~/.local/share/gnome-shell/extensions/confetti@ronilaukkarinen
cd ~/.local/share/gnome-shell/extensions/confetti@ronilaukkarinen
git clone https://github.com/ronilaukkarinen/confetti-gnome-shell-extension .
```

### Enable the extension

1. **Reload GNOME Shell**:
   - On X11: Press `Alt + F2`, type `r`, and press Enter.
   - On Wayland: Log out and log back in to reload the extensions.

2. **Activate the Extension**:

   ```bash
   gnome-extensions enable confetti@ronilaukkarinen
   ```

3. **Disable the Extension**:

   ```bash
   gnome-extensions disable confetti@ronilaukkarinen
   ```

You can also toggle the extension using GNOME Tweaks or the Extensions app.

## Usage

Once activated, the confetti animation will start immediately. To stop the animation, simply disable the extension.

To re-apply animation, use this:

```bash
gnome-extensions disable confetti@ronilaukkarinen && gnome-extensions enable confetti@ronilaukkarinen
```

With that command you can program things like [confetti-receiver](https://github.com/ronilaukkarinen/raycast-confetti-receiver).

## Logging

```bash
journalctl /usr/bin/gnome-shell -f
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
