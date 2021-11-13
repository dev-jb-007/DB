

let activity=new Array;
getActivities();
async function getActivities(){
    const buffer=await fetch('/docter/activities');
    const answer=await buffer.json();
    activity=buffer;
    displayActivity();
}
function displayActivity(){
    // `
    //     <div><
    // `
}
async function postActivity(){
    let name=document.getElementById('activity-name').value;
    let description=document.getElementById('activity-description').value;
    await fetch('/docter/activities',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name,description})
    })
}