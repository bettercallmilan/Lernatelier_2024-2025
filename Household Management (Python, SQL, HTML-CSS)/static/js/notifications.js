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


function checkDueTasks() {
    fetch('/api/due-tasks')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayOnSiteNotifications(data.tasks);
                
                data.tasks.forEach(task => {
                    if (task.due_today) {
                        showNotification('Task Due Today', `"${task.title}" is due today!`);
                    }
                });
            }
        })
        .catch(error => console.error('Error checking due tasks:', error));
}

function displayOnSiteNotifications(tasks) {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (tasks.length === 0) {
        container.innerHTML = '<p>No upcoming tasks due soon.</p>';
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
