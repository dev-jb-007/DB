async function logout(){
    let buffer=await fetch('/user/signout',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    })
    let answer=await buffer.json();
    if(answer.status==='done')
    {
        console.log('done');
    }
    else{
        console.log('fail');
    }
}