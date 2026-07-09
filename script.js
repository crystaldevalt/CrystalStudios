document.addEventListener('DOMContentLoaded', () => {
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
    const toggle = document.getElementById('theme-toggle');
    const themeLink = document.getElementById('theme-stylesheet');
    if (toggle && themeLink) {
        toggle.checked = themeLink.href.includes('light.css');
        toggle.addEventListener('change', () => {
            const theme = toggle.checked ? 'light.css' : 'dark.css';
            themeLink.href = theme;
            localStorage.setItem('theme', toggle.checked ? 'light' : 'dark');
        });
    }
    const statusText = document.getElementById('status-text');
    const statusIndicator = document.getElementById('status-indicator');
    if (statusText && statusIndicator) {
        fetch('status.json')
            .then(res => res.json())
            .then(data => {
                statusText.innerText = data.message;
                statusIndicator.className = data.status;
            })
            .catch(() => {
                statusText.innerText = "Status unavailable";
                statusIndicator.className = "offline";
            });
    }
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('#')) return;
            e.preventDefault();
            document.body.style.opacity = '0';
            setTimeout(() => window.location.href = href, 500);
        });
    });
});
