document.addEventListener('DOMContentLoaded', function() {
    const passwordForm = document.querySelector('.password-form');
    const newPasswordInput = document.getElementById('new_password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    
    function validatePasswords() {
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                confirmPasswordInput.setCustomValidity('Passwörter stimmen nicht überein');
            } else {
                confirmPasswordInput.setCustomValidity('');
            }
        }
    }
    
    if (newPasswordInput && confirmPasswordInput) {
        newPasswordInput.addEventListener('input', validatePasswords);
        confirmPasswordInput.addEventListener('input', validatePasswords);
    }
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            const newPassword = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (newPassword !== confirmPassword) {
                e.preventDefault();
                alert('Die neuen Passwörter stimmen nicht überein');
                return false;
            }
            
            if (newPassword.length < 5) {
                e.preventDefault();
                alert('Das neue Passwort muss mindestens 5 Zeichen lang sein');
                return false;
            }
        });
    }
});