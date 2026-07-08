document.addEventListener('DOMContentLoaded', () => {
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
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        if (toggle) toggle.checked = true;
    }
    if (toggle) {
        toggle.addEventListener('change', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
    }

    // --- 3. Status ---
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
                statusText.innerText = "Status unavailable";
            });
    }

    // --- 4. Form ---
    const requestForm = document.getElementById('requestForm');
    if (requestForm) {
        requestForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const webhookUrl = 'https://discord.com/api/webhooks/1523724030908301485/Uq2lIWjh_FaJHqDAIVT6R-TitqEZDSnWDjG6iNamDrAx5GvFh8gekNTRgNHvffN5LpGW'; 
            const payload = {
                embeds: [{
                    title: "New Request!",
                    color: 8415701, 
                    fields: [
                        { name: "Name", value: document.getElementById('name').value },
                        { name: "Email", value: document.getElementById('email').value },
                        { name: "Description", value: document.getElementById('description').value }
                    ]
                }]
            };
            try {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (response.ok) {
                    alert('Request sent successfully!');
                    requestForm.reset();
                } else {
                    alert('Error sending request.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});
