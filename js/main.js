const milestoneData = JSON.parse(data).data;

// load course milestones data
function loadMilestone(){
    const milestones = document.querySelector(".milestones");

    milestones.innerHTML = `${milestoneData.map(function (milestone) {
      return `<div class="milestone border-b" id="${milestone._id}">
              <div class="flex">
                <div class="checkbox"><input type="checkbox" onclick="markCheck(this,${
									milestone._id
								})"/></div>
                <div onclick="openPanel(this,${milestone._id})">
                  <p>
                    ${milestone.name}
                    <span><i class="fas fa-chevron-down"></i></span>
                  </p>
                </div>
              </div>
              <div class="hidden_panel">
                ${milestone.modules
									.map(function (module) {
										return `<div class="module border-b">
                              <p>${module.name}</p>
                            </div>`;
									})
									.join("")}
                
              </div>
            </div>`;
    })
    .join("")}`;
}


loadMilestone();


function openPanel(element,id){
	console.log(id);
	const currentPanel = element.parentNode.nextElementSibling;
	const shownPanel = document.querySelector(".show");
	const active = document.querySelector(".active");

	// first remove previous dropdown  and check show !== null
	if (!currentPanel.classList.contains("show") && shownPanel !== null) {
		shownPanel.classList.remove("show");
	}

	//toggle current clicked one
	currentPanel.classList.toggle("show");

	// first remove previous active class and check active !== null
	if (!element.classList.contains("active") && active !== null) {
		active.classList.remove("active");
	}

	//toggle current clicked one
	element.classList.toggle("active");

	showImage(id);
}

function showImage(id){
    const milestoneImage = document.querySelector(".milestoneImage");
    const title = document.querySelector(".title");
    const details = document.querySelector(".details");

    milestoneImage.style.opacity = '0';

    milestoneImage.src = milestoneData[id].image;
    title.innerText = milestoneData[id].name;
    details.innerText = milestoneData[id].description;
}

// Each section image display with opacity 1 after click
const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function(){
  this.style.opacity = "1";
}


// Mark and unmark milestone
function markCheck(checkbox,id){
  const milestones = document.querySelector(".milestones");
	const doneList = document.querySelector(".doneList");
	const item = document.getElementById(id);

  if(checkbox.checked){
     milestones.removeChild(item);
     doneList.appendChild(item)
  }else{
     milestones.insertBefore(item,milestones.children[id]);
     doneList.removeChild(item);
  }
}
