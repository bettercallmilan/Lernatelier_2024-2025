document.addEventListener('DOMContentLoaded', function() {
    requestNotificationPermission();
    checkDueTasks();
});

function requestNotificationPermission() {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications');
        return;
    }
    
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                console.log('Notification permission granted');
            }
        });
    }
}

function showNotification(title, message) {
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: message,
        });
        
        notification.onclick = function() {
            window.focus();
            this.close();
        };
    }
}