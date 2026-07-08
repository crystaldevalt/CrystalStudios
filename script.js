document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Toggle Logic (Integrated) ---
    const toggle = document.getElementById('theme-toggle');
    
    // Apply saved theme on load
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        if (toggle) toggle.checked = true;
    }

    // Toggle event
    if (toggle) {
        toggle.addEventListener('change', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
    }

    // --- 2. Status fetch logic ---
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
                console.error("Error loading status:", err);
            });
    }

    // --- 3. Form submission logic ---
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
                    alert('Something went wrong. Please check your Webhook URL.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send request. Check your internet connection.');
            }
        });
    }
});
