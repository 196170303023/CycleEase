document.getElementById('settings-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;

    const requestBody = {
        username,
        email,
        currentPassword,
        ...(newPassword && { newPassword })
    };

    const response = await fetch('/api/update-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (data.success) {
        alert('Settings updated successfully!');
    } else {
        alert(data.message || 'Failed to update settings.');
    }
});
