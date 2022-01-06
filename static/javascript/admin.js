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
  document.getElementById("replacingloader").innerHTML=`<div class="loader"></div>`
  let name = document.getElementById("activity-name").value;
  let description = document.getElementById("activity-description").value;
  let respone=await fetch("/docter/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });
  let answer=await respone.json();
  console.log(answer);
  document.getElementById('video-form').action=`/docter/uploadVideo/${answer.id}`;
  getActivities(true);
  document.getElementById("replacingloader").innerHTML=`<svg onclick="postActivity()" class="app-sidebar-link" style="border:none;cursor:pointer;margin:10px auto 10px  auto"xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg>`
}

async function postSet() {

  var newSet = Object();
  newSet.activity=set.activity;
  newSet.strength = parseInt(document.getElementById("strength").value);
  newSet.time = parseInt(document.getElementById("time").value);
  let multipleOptionSelect = document.querySelector('select[multiple]');
    let selectedAddiction=new Array;
    Array.from(multipleOptionSelect).forEach(item=>{
        if(item.selected==true)
        {
            set.addiction=item.value;
            selectedAddiction.push(item.value);
        }
    })
    newSet.addiction=selectedAddiction;
  console.log(newSet);
  const buffer = await fetch("/docter/set", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSet),
  });
  const ans = await buffer.json();

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


// Multiple select
let multipleOptionSelect = document.querySelectorAll('select[multiple]');
if (multipleOptionSelect.length > 0) {
    let multidatai = 1;
    multipleOptionSelect.forEach(select => {
        let multipleOptionSelectWrapper = document.createElement('div');
        multipleOptionSelectWrapper.classList.add('multi-data-selector');
        select.style.width = "100%";
        select.parentNode.insertBefore(multipleOptionSelectWrapper, select);
        multipleOptionSelectWrapper.appendChild(select);

        let multipleSelector = document.createElement('div');
        multipleSelector.classList.add('multiple-selector');
        multipleOptionSelectWrapper.appendChild(multipleSelector);

        let multipleSelectorData = document.createElement('div');
        multipleSelectorData.classList.add('multiple-selector-data');
        multipleSelector.appendChild(multipleSelectorData);

        let multipleSelectorAutoSuggestInsert = document.createElement('div');
        multipleSelectorAutoSuggestInsert.classList.add('multi-auto-suggested-data');
        multipleSelectorData.appendChild(multipleSelectorAutoSuggestInsert);

        let multipleSelectorAutoSuggest = document.createElement('input');
        multipleSelectorAutoSuggest.setAttribute('type', 'text');
        multipleSelectorAutoSuggest.setAttribute('placeholder', 'Start typing...');
        multipleSelectorAutoSuggest.setAttribute('list', 'multiSelectorAutoSuggest' + multidatai);
        multipleSelectorData.appendChild(multipleSelectorAutoSuggest);

        let multipleSelectorOptionsDataList = document.createElement('datalist');
        multipleSelectorOptionsDataList.setAttribute('id', 'multiSelectorAutoSuggest' + multidatai);
        multipleSelector.appendChild(multipleSelectorOptionsDataList);

        let multipleSelectorOptionValue = "";
        for (let i = 0; i < select.children.length; i++) {
            multipleSelectorOptionValue = select.children[i].value + ',';

            let multipleSelectorOptionElementDataList = document.createElement('option');
            multipleSelectorOptionElementDataList.innerHTML = multipleSelectorOptionValue;
            multipleSelectorOptionsDataList.appendChild(multipleSelectorOptionElementDataList);
        }
        multidatai++;
    });
}

let multiSelectorAutoSuggestInput = document.querySelectorAll('.multiple-selector input[list]');
if (multiSelectorAutoSuggestInput.length > 0) {
    multiSelectorAutoSuggestInput.forEach(autoSuggestInput => {
        autoSuggestInput.addEventListener('keyup', function (e) {
            // console.log(this.value.match(/[,\/]/g))
            if (this.value.match(/[,]/g)) {
                let thisCommaCleanedValue = this.value.replace(/[,]/g, '');
                let multipleSelectorOptionElementAutoSuggestSpan = document.createElement('span');
                multipleSelectorOptionElementAutoSuggestSpan.classList.add('multiple-selector-option');
                multipleSelectorOptionElementAutoSuggestSpan.innerHTML = thisCommaCleanedValue;

                let alreadyMultiDataListed = this.previousSibling,
                    alreadyMultiDataListedArray = [];

                if (alreadyMultiDataListed.children.length > 0) {
                    for (let k = 0; k < alreadyMultiDataListed.children.length; k++) {
                        alreadyMultiDataListedArray.push(alreadyMultiDataListed.children[k].textContent);
                    }
                } else {
                    this.parentElement.children[0].appendChild(multipleSelectorOptionElementAutoSuggestSpan);
                }

                if (!alreadyMultiDataListedArray.includes(thisCommaCleanedValue)) {
                    this.parentElement.children[0].appendChild(multipleSelectorOptionElementAutoSuggestSpan);
                }

                let multiDataOptionAddRemover = document.createElement('span');
                multiDataOptionAddRemover.classList.add('option-data-selected-remover');
                multipleSelectorOptionElementAutoSuggestSpan.appendChild(multiDataOptionAddRemover);

                this.value = "";


                // console.log(this.parentNode.parentNode.previousSibling);
                let multipleOptionSelectCollection = this.parentNode.parentNode.previousSibling;
                for (let j = 0; j < multipleOptionSelectCollection.children.length; j++) {
                    if (multipleOptionSelectCollection.children[j].textContent == thisCommaCleanedValue) {
                        multipleOptionSelectCollection.children[j].setAttribute('selected', 'selected');
                    }
                }

                optionDataSelectedRemoverActFunc();

                /* Checking selected data are applied or not ! */
                function getSelectValues(select) {
                    var result = [];
                    var options = select && select.options;
                    var opt;

                    for (var i = 0, iLen = options.length; i < iLen; i++) {
                        opt = options[i];

                        if (opt.selected) {
                            result.push(opt.value || opt.text);
                        }
                    }
                    return result;
                }


                let checkAllMultiData = document.querySelectorAll('select[multiple]');
                if (checkAllMultiData.length > 0) {
                    checkAllMultiData.forEach(checkMultiData => {
                        // console.log(getSelectValues(checkMultiData));
                    });
                }
                /* ends Data Cheking */
            }
        });
    });
}

let multiDataSelectorWrapper = document.querySelectorAll('.multi-data-selector');
if (multiDataSelectorWrapper.length > 0) {
    multiDataSelectorWrapper.forEach(mdsWrapper => {
        mdsWrapper.addEventListener('click', function (e) {
            this.children[1].children[0].children[1].focus();
        });
    });
}

let optionDataSelectedRemoverActFunc = (e) => {
    let optionDataSelectedRemoverAct = document.querySelectorAll('.option-data-selected-remover');
    if (optionDataSelectedRemoverAct.length > 0) {
        optionDataSelectedRemoverAct.forEach(optionRemoverAct => {
            optionRemoverAct.addEventListener('click', function (e) {

                let multipleOptionSelectCollection = this.parentNode.parentNode.parentNode.parentNode.previousSibling;
                for (let j = 0; j < multipleOptionSelectCollection.children.length; j++) {
                    if (multipleOptionSelectCollection.children[j].textContent == this.parentNode.textContent) {
                        multipleOptionSelectCollection.children[j].removeAttribute('selected');
                    }
                }

                setTimeout(function (e) {
                    optionRemoverAct.parentElement.remove();
                }, 100)
            });
        });
    }
}

optionDataSelectedRemoverActFunc();