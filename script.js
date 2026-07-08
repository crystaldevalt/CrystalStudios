document.addEventListener('DOMContentLoaded', () => {
    console.log("Script initialized...");

    // --- 1. Typewriter ---
    async function typeWriter(text, elementId, speed = 80) {
        const element = document.querySelector("#" + elementId + " .typed-text");
        if (!element) {
            console.log("Typewriter element not found!");
            return;
        }
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
        console.log("Toggle button found!");
        // Check saved theme
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            toggle.checked = true;
        }
        // Toggle event
        toggle.addEventListener('change', () => {
            console.log("Toggle clicked!");
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
    } else {
        console.log("Toggle button NOT found!");
    }

    // --- 3. Status Fetch ---
    const statusText = document.getElementById('status-text');
    const statusIndicator = document.getElementById('status-indicator');
    if (statusText && statusIndicator) {
        fetch('status.json')
            .then(response => response.json())
            .then(data => {
                statusText.innerText = data.message;
                statusIndicator.className = data.status; 
            })
            .catch(err => {
                console.log("Status fetch failed (check if status.json exists):", err);
                statusText.innerText = "Status unavailable";
            });
    }
});
