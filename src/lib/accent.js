export function initAccent() {
    // Temporary accent initialization for local development
    if (typeof document === 'undefined') return

    const root = document.documentElement
    if (!root.style.getPropertyValue('--accent')) {
        root.style.setProperty('--accent', '#2563eb')
    }
}