function addEventIfExists(id, event, callback) {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener(event, callback);
    }
}

// TASKS
// reset
function resetTaskForm() {
    const taskIdField = document.getElementById('task_id');
    const titleField = document.getElementById('title');
    const descriptionField = document.getElementById('description');
    const dueDateField = document.getElementById('due_date');
    const priorityField = document.getElementById('priority');
    
    if (taskIdField) taskIdField.value = '';
    if (titleField) titleField.value = '';
    if (descriptionField) descriptionField.value = '';
    if (dueDateField) dueDateField.value = '';
    if (priorityField) priorityField.selectedIndex = 1;
}

addEventIfExists('showTaskFormBtn', 'click', function() {
    resetTaskForm();
    const formTitle = document.getElementById('taskFormTitle');
    const taskForm = document.getElementById('taskForm');
    const taskItemForm = document.getElementById('taskItemForm');
    
    if (formTitle) formTitle.textContent = 'Neue Aufgabe hinzufügen';
    if (taskItemForm) taskItemForm.action = '/tasks/create';
    if (taskForm) taskForm.style.display = 'block';
});

addEventIfExists('cancelTaskBtn', 'click', function() {
    const taskForm = document.getElementById('taskForm');
    if (taskForm) taskForm.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    // edit
    const taskEditBtns = document.querySelectorAll('.task-edit-btn');
    taskEditBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            const dueDate = this.getAttribute('data-due-date');
            const priority = this.getAttribute('data-priority');
            
            const taskIdField = document.getElementById('task_id');
            const titleField = document.getElementById('title');
            const descriptionField = document.getElementById('description');
            const dueDateField = document.getElementById('due_date');
            const priorityField = document.getElementById('priority');
            const formTitle = document.getElementById('taskFormTitle');
            const taskItemForm = document.getElementById('taskItemForm');
            const taskForm = document.getElementById('taskForm');
            
            if (taskIdField) taskIdField.value = id;
            if (titleField) titleField.value = title;
            if (descriptionField) descriptionField.value = description || '';
            if (dueDateField) dueDateField.value = dueDate || '';
            
            if (priorityField) {
                for (let i = 0; i < priorityField.options.length; i++) {
                    if (priorityField.options[i].value === priority) {
                        priorityField.selectedIndex = i;
                        break;
                    }
                }
            }
            
            if (formTitle) formTitle.textContent = 'Aufgabe bearbeiten';
            if (taskItemForm) taskItemForm.action = '/tasks/' + id + '/update';
            if (taskForm) taskForm.style.display = 'block';
        });
    });
});

// SHOPPING
// reset
function resetShoppingForm() {
    const itemIdField = document.getElementById('item_id');
    const nameField = document.getElementById('name');
    const quantityField = document.getElementById('quantity');
    const categoryField = document.getElementById('category');
    
    if (itemIdField) itemIdField.value = '';
    if (nameField) nameField.value = '';
    if (quantityField) quantityField.value = '';
    if (categoryField) categoryField.value = 'Allgemein';
}

addEventIfExists('showShoppingFormBtn', 'click', function() {
    resetShoppingForm();
    const formTitle = document.getElementById('shoppingFormTitle');
    const shoppingForm = document.getElementById('shoppingForm');
    const shoppingItemForm = document.getElementById('shoppingItemForm');
    
    if (formTitle) formTitle.textContent = 'Neuen Artikel hinzufügen';
    if (shoppingItemForm) shoppingItemForm.action = '/shopping/create';
    if (shoppingForm) shoppingForm.style.display = 'block';
});

addEventIfExists('cancelShoppingBtn', 'click', function() {
    const shoppingForm = document.getElementById('shoppingForm');
    if (shoppingForm) shoppingForm.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    // edit
    const shoppingEditBtns = document.querySelectorAll('.shopping-edit-btn');
    shoppingEditBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const quantity = this.getAttribute('data-quantity');
            const category = this.getAttribute('data-category');
            
            const itemIdField = document.getElementById('item_id');
            const nameField = document.getElementById('name');
            const quantityField = document.getElementById('quantity');
            const categoryField = document.getElementById('category');
            const formTitle = document.getElementById('shoppingFormTitle');
            const shoppingItemForm = document.getElementById('shoppingItemForm');
            const shoppingForm = document.getElementById('shoppingForm');
            
            if (itemIdField) itemIdField.value = id;
            if (nameField) nameField.value = name;
            if (quantityField) quantityField.value = quantity || '';
            if (categoryField) categoryField.value = category;
            
            if (formTitle) formTitle.textContent = 'Artikel bearbeiten';
            if (shoppingItemForm) shoppingItemForm.action = '/shopping/' + id + '/update';
            if (shoppingForm) shoppingForm.style.display = 'block';
        });
    });
});