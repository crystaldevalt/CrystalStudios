document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter
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

    // 2. Theme Toggle (Updated for CSS file swapping)
    const toggle = document.getElementById('theme-toggle');
    const themeLink = document.getElementById('theme-stylesheet');
    
    if (toggle && themeLink) {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            themeLink.href = 'light.css';
            toggle.checked = true;
        }

        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                themeLink.href = 'light.css';
                localStorage.setItem('theme', 'light');
            } else {
                themeLink.href = 'dark.css';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // 3. Status Fetch
    const statusText = document.getElementById('status-text');
    const statusIndicator = document.getElementById('status-indicator');
    if (statusText && statusIndicator) {
        fetch('status.json')
            .then(res => res.json())
            .then(data => {
                statusText.innerText = data.message;
                // Sets the class to 'online' or 'offline'
                statusIndicator.className = data.status;
            })
            .catch(() => {
                statusText.innerText = "Status unavailable";
                statusIndicator.className = "offline";
            });
    }

    // 4. Fade Transition
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Ignore external links
            if (this.getAttribute('href').startsWith('http')) return;
            e.preventDefault();
            document.body.style.opacity = '0';
            setTimeout(() => window.location.href = this.getAttribute('href'), 500);
        });
    });
});
