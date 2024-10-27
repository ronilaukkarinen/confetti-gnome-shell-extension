const { St, GLib, GObject } = imports.gi;
const Main = imports.ui.main;

let confettiElements = [];
let animationLoop = null;

function createConfetti() {
    const screenHeight = Main.layoutManager.primaryMonitor.height;
    const screenWidth = Main.layoutManager.primaryMonitor.width;

    // Randomize confetti start position at left or right bottom corner
    const startFromLeft = Math.random() > 0.5;
    const xPos = startFromLeft ? 0 : screenWidth;
    const yPos = screenHeight - 10;

    // Create a confetti element with a random color and size
    const colorOptions = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    const size = Math.floor(Math.random() * 8) + 4;

    const confetti = new St.Bin({
        style_class: '',  // Disable CSS styling
        reactive: false,
    });
    confetti.set_style(`background-color: ${randomColor}; width: ${size}px; height: ${size}px; border-radius: 50%;`);
    confetti.set_position(xPos, yPos);
    Main.layoutManager.addChrome(confetti);

    // Set initial velocities to arc towards the center
    const speedX = startFromLeft ? Math.random() * 3 + 2 : -(Math.random() * 3 + 2);  // Horizontal speed towards center
    const speedY = -(Math.random() * 6 + 8);  // Initial upward velocity

    // Track each confetti particle
    confettiElements.push({
        actor: confetti,
        x: xPos,
        y: yPos,
        speedX: speedX,
        speedY: speedY,
        gravity: 0.3,  // Slow gravitational effect for natural float down
    });
}

function animateConfetti() {
    const screenHeight = Main.layoutManager.primaryMonitor.height;

    confettiElements.forEach(confetti => {
        // Update position based on speed
        confetti.x += confetti.speedX;
        confetti.y += confetti.speedY;

        // Apply gravity effect to slow the upward movement and create float
        confetti.speedY += confetti.gravity;

        // Remove confetti if it floats off the bottom of the screen
        if (confetti.y > screenHeight) {
            confetti.actor.destroy();
        } else {
            confetti.actor.set_position(confetti.x, confetti.y);
        }
    });

    // Filter out any confetti that has floated off the screen
    confettiElements = confettiElements.filter(confetti => confetti.y <= screenHeight);

    // Continue the animation if confetti elements are still on the screen
    if (confettiElements.length > 0) {
        return GLib.SOURCE_CONTINUE;
    } else {
        return GLib.SOURCE_REMOVE;
    }
}

function startConfetti() {
    for (let i = 0; i < 60; i++) {
        createConfetti();
    }

    // Start animation loop with smoother frame rate
    animationLoop = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 16, animateConfetti);
}

function clearConfetti() {
    confettiElements.forEach(confetti => confetti.actor.destroy());
    confettiElements = [];
    if (animationLoop) {
        GLib.Source.remove(animationLoop);
        animationLoop = null;
    }
}

const ConfettiExtension = GObject.registerClass(
class ConfettiExtension extends GObject.Object {
    enable() {
        startConfetti();
    }

    disable() {
        clearConfetti();
    }
});

function init() {
    return new ConfettiExtension();
}
