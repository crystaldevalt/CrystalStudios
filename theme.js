export function initializeThemeToggle(buttonId) {
    const toggleButton = document.getElementById(buttonId);
    if (!toggleButton) return;
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
}