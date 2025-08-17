document.addEventListener('DOMContentLoaded', function() {
    requestNotificationPermission();
    checkDueTasks();
});

function requestNotificationPermission() {
    if (!('Notification' in window)) {
        console.log('Dieser Browser unterstützt keine Benachrichtigungen');
        return;
    }
    
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                console.log('Benachrichtigungsberechtigung erteilt');
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

function checkDueTasks() {
    fetch('/api/due-tasks')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayOnSiteNotifications(data.tasks);
                
                data.tasks.forEach(task => {
                    if (task.due_today) {
                        showNotification('Aufgabe heute fällig', `"${task.title}" ist heute fällig!`);
                    }
                });
            }
        })
        .catch(error => console.error('Fehler beim Prüfen der fälligen Aufgaben:', error));
}

function displayOnSiteNotifications(tasks) {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (tasks.length === 0) {
        container.innerHTML = '<p>Keine anstehenden Aufgaben in nächster Zeit fällig</p>';
        return;
    }
    
    const list = document.createElement('ul');
    list.className = 'notification-list';
    
    tasks.forEach(task => {
        const item = document.createElement('li');
        item.className = task.due_today ? 'notification-item urgent' : 'notification-item';
        item.innerHTML = `
            <span class="task-title">${task.title}</span>
            <span class="due-date">${task.due_date}</span>
        `;
        list.appendChild(item);
    });
    
    container.appendChild(list);
}

setInterval(checkDueTasks, 60 * 60 * 1000); // check immediately, then every hour
