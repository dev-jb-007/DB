let user=new Object();
getUserInfo();
async function getUserInfo(){
    let buffer=await fetch('/user/info');
    let ans=await buffer.json();
    user=ans.user;
    console.log(user);
    displayActivity();
}
let html=``;
// async function deleteActivity(id) {
//     // console.log(id);
//     // console.log('Check');
//     const buffer = await fetch("/docter/deleteAc", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id }),
//     });
//     const ans = await buffer.json();
//     // console.log(ans);
//     getActivities(true);
//   }
//   function itemTotalDisplay(){
//       let div=document.querySelector('.item-status');
//       div.innerHTML=`<div class="item-status">
//       <span class="status-number">${activity.length}</span>
//       <span class="status-type">Total Projects</span>
//     </div>`
//   }
 
  function displayActivity(ac, x) {
    // console.log(ac);
    let localhtml = ``;
    let length = user.activities;
    let div = document.getElementById("project-boxes");
    // console(user.activities);

   user.activities.forEach((element) => {
        // console.log(element.activity);
      localhtml += `

<div class="project-box-wrapper">
    <div class="project-box" style="background-color: #fee4cb;">
        <div class="project-box-header">
        <span>December 10, 2020</span>
        <div class="more-wrapper" onclick="changeState(this)">
        <svg xmlns="http://www.w3.org/2000/svg" id="uncheck" width="30" height="30" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" id="check" width="30" height="30" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
    </div>
    </div>
    <div class="project-box-content-header">
    <p class="box-content-header">${element.activity.name}</p>
    <p class="box-content-subheader">${element.activity.description}</p>
    </div>
    <div class="box-progress-wrapper">
    <p class="box-progress-header">Progress</p>
    <div class="box-progress-bar">
    <span class="box-progress" style="width: 60%; background-color: #ff942e"></span>
    </div>
    <p class="box-progress-percentage">${element.progress}%</p>
    </div>
    <div class="project-box-footer">
    <div class="participants">
    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" alt="participant">
    <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="participant">
    <button class="add-participant" style="color: #ff942e;">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
        <path d="M12 5v14M5 12h14" />
        </svg>
    </button>
    </div>
    <div class="days-left" style="color: #ff942e;">
    <p>${element.activity.docter.name}<p>
    </div>
    </div>
    </div>
    </div>
          `;
    });
    if (x) {
      div.innerHTML = localhtml;
    } else {
      html += localhtml;
      div.innerHTML = html;
    }
  }
  
  function changeState(element)
  {
      let uncheck=element.children[0];
      let check=element.children[1];
      console.log(uncheck,check);
      if(uncheck.style.opacity=='0')
      {
          uncheck.style.opacity=1;
          check.style.opacity=0;
      }
      else{
        uncheck.style.opacity=0;
        check.style.opacity=1;
      }
  }