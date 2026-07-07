// effects.js

async function typeWriter(text, elementId, speed = 100) {
    const element = document.getElementById(elementId);
    let i = 0;
    
    element.textContent = "";

    while (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

// Start the effect
document.addEventListener("DOMContentLoaded", () => {
    typeWriter("Brought to you by CrystalDev!", "typewriter-text", 80);
});
