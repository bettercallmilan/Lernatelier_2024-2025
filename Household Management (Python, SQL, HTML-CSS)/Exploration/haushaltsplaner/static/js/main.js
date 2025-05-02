document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const taskRows = document.querySelectorAll('tr');
    
    taskRows.forEach(row => {
        const dateCell = row.querySelector('td:nth-child(3)');
        const statusCell = row.querySelector('td:nth-child(4)');
        
        if (dateCell && statusCell) {
            const dateText = dateCell.textContent.trim();
            const statusText = statusCell.textContent.trim();
            
            if (dateText !== 'Kein Datum' && statusText !== 'erledigt') {
                const dueDate = new Date(dateText);
                if (dueDate < today) {
                    row.style.backgroundColor = '#ffebeb';
                }
            }
        }
    });
});