document.addEventListener('DOMContentLoaded', () => {
    console.log("Script initialized...");

    // --- 1. Typewriter ---
    async function typeWriter(text, elementId, speed = 80) {
        const element = document.querySelector("#" + elementId + " .typed-text");
        if (!element) return;
        
        element.textContent = "";
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            await new Promise(r => setTimeout(r, speed));
        }
    }
    typeWriter("Brought to you by CrystalDev!", "typewriter-text", 80);

    // --- 2. Theme Toggle ---
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        // Apply saved theme on load
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            toggle.checked = true;
        }

        toggle.addEventListener('change', () => {
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // --- 3. Status Fetch ---
    const statusText = document.getElementById('status-text');
    const statusIndicator = document.getElementById('status-indicator');

    if (statusText && statusIndicator) {
        fetch('status.json')
            .then(response => {
                if (!response.ok) throw new Error("File not found");
                return response.json();
            })
            .then(data => {
                statusText.innerText = data.message;
                // Ensures only 'online' or 'offline' class is added
                statusIndicator.className = data.status; 
            })
            .catch(err => {
                console.warn("Status fetch issue:", err);
                statusText.innerText = "Status unavailable";
                statusIndicator.className = "offline"; // Default to red
            });
    }
});
