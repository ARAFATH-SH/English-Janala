const startBtn = document.getElementById('start-button');
startBtn.addEventListener('click', () => {
    const Pass = document.getElementById('pass').value;
    if(Pass == '123456') {
        window.location.href = 'main.html';
    }
    else{
        const Name = document.getElementById('name').value;
        Swal.fire('Hello, '+Name+'! Your password is incorrect. Please try again.');
    }
});