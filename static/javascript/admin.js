let html = ``;
let activity = new Array();
let set = {
  name: "",
  strength: 0,
  time: 0,
  activity: new Array(),
};

function togglingElements(y) {
  if (set.activity.includes(y)) {
    let index = set.activity.indexOf(y);
    set.activity.splice(index, 1);
  } else {
    set.activity.push(y);
  }
  console.log(set.activity);
}
getActivities(false);
async function getActivities(isPresent) {
  const buffer = await fetch("/docter/activities");
  const answer = await buffer.json();
  activity=answer;
  itemTotalDisplay();
  if (isPresent) {
    displayActivity(answer, true);
  } else {
    displayActivity(answer, false);
  }
}
async function deleteActivity(id) {
  // console.log(id);
  // console.log('Check');
  const buffer = await fetch("/docter/deleteAc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const ans = await buffer.json();
  // console.log(ans);
  getActivities(true);
}
function itemTotalDisplay(){
    let div=document.querySelector('.item-status');
    div.innerHTML=`<div class="item-status">
    <span class="status-number">${activity.length}</span>
    <span class="status-type">Total Projects</span>
  </div>`
}
function displayActivity(ac, x) {
  console.log(ac);
  let localhtml = ``;
  let length = ac.length;
  let div = document.getElementById("project-boxes");
  ac.forEach((element) => {
    localhtml += `
        <div class="project-box-wrapper">
        <div class="project-box" style="background-color: #fee4cb;">
          <div class="project-box-header">
            <div class="more-wrapper">
              <div class="form-check form-switch" style="cursor:pointer">
                <input class="form-check-input" type="checkbox" role="switch" onclick="togglingElements('${element._id}')" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault"></label>
              </div>
              <svg onclick="deleteActivity('${element._id}')" xmlns="http://www.w3.org/2000/svg" width="24" style="cursor:pointer" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
 </svg>
        </div>
      </div>
      <div class="project-box-content-header">
        <p class="box-content-header">${element.name}</p>
        <p class="box-content-subheader">${element.description}</p>
      </div>
      <div class="project-box-footer">
        <p>${element.docter.name}</p>
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
async function postActivity() {
  let name = document.getElementById("activity-name").value;
  let description = document.getElementById("activity-description").value;
  await fetch("/docter/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });
  getActivities(true);
}

async function postSet() {
    let div = document.getElementById("project-boxes");
  set.name = document.getElementById("setname").value;
  set.strength = parseInt(document.getElementById("strength").value);
  set.time = parseInt(document.getElementById("time").value);
  console.log(set);
  const buffer = await fetch("/docter/set", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(set),
  });
  const ans = await buffer.json();
  console.log(ans);
}
function getSearchResults(value) {
    let div = document.getElementById("project-boxes");
  if (value != "") {
    let insideHtml = ``;
    activity.forEach((element) => {
        console.log(element);
        // str = str.replace(/\s/g, '');
        let x=element.name.replace(/\s/g, '').toLowerCase();
        let y=value.replace(/\s/g, '').toLowerCase();
        // console.log(x,y);
      if (x.includes(y)) {
        insideHtml += `
            <div class="project-box-wrapper">
        <div class="project-box" style="background-color: #fee4cb;">
          <div class="project-box-header">
            <div class="more-wrapper">
              <div class="form-check form-switch" style="cursor:pointer">
                <input class="form-check-input" type="checkbox" role="switch" onclick="togglingElements('${element._id}')" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault"></label>
              </div>
              <svg onclick="deleteActivity('${element._id}')" xmlns="http://www.w3.org/2000/svg" width="24" style="cursor:pointer" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
 </svg>
        </div>
      </div>
      <div class="project-box-content-header">
        <p class="box-content-header">${element.name}</p>
        <p class="box-content-subheader">${element.description}</p>
      </div>
      <div class="project-box-footer">
          <p>${element.docter.name}</p>
      </div>
    </div>
    </div>
        `;
      }
    });
    
    div.innerHTML = insideHtml;
  }
  else{
      div.innerHTML=html;
  }
}
document.getElementById("search-input").addEventListener("keyup", () => {
  getSearchResults(document.getElementById("search-input").value);
});
