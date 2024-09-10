function updateConnectionStatus() {
    if (navigator.onLine) {
        document.querySelector('.internet-status').innerHTML = `<i class="bi bi-wifi bg-success-subtle rounded-3 p-1"></i> Conectado a internet`;
        document.querySelector('.internet-status-header').innerHTML = '';
    } else {
        document.querySelector('.internet-status').innerHTML = `<i class="bi bi-wifi-off bg-danger-subtle rounded-3 p-1"></i> Sin conexión a internet`;
        document.querySelector('.internet-status-header').innerHTML = `<i class="bi bi-wifi-off bg-danger rounded-3 p-1 text-white"></i> Estas sin conexión a internet`;
    }
}

window.addEventListener('load', updateConnectionStatus);
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);