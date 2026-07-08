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

    // 2. Theme Toggle
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            toggle.checked = true;
        }
        toggle.addEventListener('change', () => {
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
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
            if (this.getAttribute('href').startsWith('http')) return;
            e.preventDefault();
            document.body.style.opacity = '0';
            setTimeout(() => window.location.href = this.getAttribute('href'), 500);
        });
    });
});
