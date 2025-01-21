let eyeIcon = document.getElementById("eye");
let password = document.getElementById("password");

eyeIcon.onclick = function() {
    if (password.type === 'password') {
        password.type = 'text';
        eyeIcon.src = 'img/eye-open.png';
    } else {
        password.type = 'password';
        eyeIcon.src = 'img/eye-close.png';
    }
}