const { St, GLib, GObject } = imports.gi;
const Main = imports.ui.main;

// Configurable variables
const CONFETTI_COUNT = 280;
const GRAVITY = 0.25;
const INITIAL_SPEED_Y = 15;
const SPEED_X_RANGE = 4;
const FRAME_INTERVAL = 12;

let confettiElements = [];
let animationLoop = null;

function createConfetti() {
    const screenHeight = Main.layoutManager.primaryMonitor.height;
    const screenWidth = Main.layoutManager.primaryMonitor.width;

    for (let i = 0; i < CONFETTI_COUNT; i++) {
        const startFromLeft = i % 2 === 0;
        const xPos = startFromLeft ? 0 : screenWidth;
        const yPos = screenHeight - 10;

        const colorOptions = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];
        const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        const size = Math.floor(Math.random() * 8) + 4;

        const confetti = new St.Bin({
            style_class: '',
            reactive: false,
        });
        confetti.set_style(`background-color: ${randomColor}; width: ${size}px; height: ${size}px; border-radius: 50%;`);
        confetti.set_position(xPos, yPos);
        Main.layoutManager.addChrome(confetti);

        const speedX = startFromLeft ? Math.random() * SPEED_X_RANGE + 4 : -(Math.random() * SPEED_X_RANGE + 4);
        const speedY = -(Math.random() * 8 + INITIAL_SPEED_Y);

        confettiElements.push({
            actor: confetti,
            x: xPos,
            y: yPos,
            speedX: speedX,
            speedY: speedY,
            gravity: GRAVITY,
        });
    }
}

function animateConfetti() {
    const screenHeight = Main.layoutManager.primaryMonitor.height;

    confettiElements.forEach(confetti => {
        confetti.x += confetti.speedX;
        confetti.y += confetti.speedY;

        confetti.speedY += confetti.gravity;

        if (confetti.y > screenHeight) {
            confetti.actor.destroy();
        } else {
            confetti.actor.set_position(confetti.x, confetti.y);
        }
    });

    confettiElements = confettiElements.filter(confetti => confetti.y <= screenHeight);

    if (confettiElements.length > 0) {
        return GLib.SOURCE_CONTINUE;
    } else {
        return GLib.SOURCE_REMOVE;
    }
}

function startConfetti() {
    createConfetti();

    animationLoop = GLib.timeout_add(GLib.PRIORITY_DEFAULT, FRAME_INTERVAL, animateConfetti);
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
