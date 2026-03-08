
document.getElementById('loginbtn').addEventListener('click', (event)=>{
    event.preventDefault();
    // get the user name
    const userName = document.getElementById('username');
    const catchUserName = userName.value;

    // get the password
    const password = document.getElementById('pinNumber')
    const catchPassword = password.value;
   
    if(catchUserName === 'admin' && catchPassword === 'admin123'){
        alert("Login Successfully");
        window.location.assign('home.html')
    }else{
        alert("Invalid username and password")
        return
    }
    
})



