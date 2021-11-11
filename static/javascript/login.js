async function login(){
    const user=new Object();
    user.email=document.getElementById('email').value;
    user.password=document.getElementById('password').value;
    let answer=await fetch('/user/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })
    const result=await answer.json();
    console.log(result);
    if(result.status==='done')
    {
        console.log('Done');
        window.location.href='/user/dashboard';
    }
    else{
        console.log('Error');
    }
}