document.getElementById('requestForm').addEventListener('submit', async (e) => {
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
            document.getElementById('requestForm').reset();
        } else {
            alert('Something went wrong. Please check your Webhook URL.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send request. Check your internet connection.');
    }
});