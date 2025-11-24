function checkCookie() {
  let login = false;
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();

    if (cookie.startsWith("pass" + '=') && "afo83brws8egh4up28q" === cookie.substring(5)) {
      login = true;
      break;
    }
  }

  if (login) {
    loginTrue();
    alert("Welcome back!");
  }
}

function login(passphrase) {
  if (passphrase.trim() === "VEXhelperYIPPEE") {
    document.cookie = "pass=afo83brws8egh4up28q; path=/; max-age=86400";
    loginTrue();
    // alert("Hello!");
  } else {
    // alert("Wrong passphrase!");
  }
}

async function loginTrue() {
  // load the page
  document.getElementById('loginForm').style.display = "none";

  // generate main
  await getData();
  generateMain();
  document.getElementById('main').style.display = "block";
}

let divisions = [];
let mjsons = [];
let tjsons = [];

async function getData() {
  await fetch('./data/divisions.json')
  .then(r => r.json())
  .then(divs => {
      divisions = divs;
      console.log("divs");
      console.log(divisions);
  });

  for (i = 0; i < divisions.length; ++i) {
    let div = divisions[i];
    const mresponse = await fetch("./data/m" + div + ".json");
    const mjson = await mresponse.json();
    const tresponse = await fetch("./data/t" + div + ".json");
    const tjson = await tresponse.json();
    mjsons.push(mjson);
    tjsons.push(tjson);
  }
  console.log(mjsons);
  console.log(tjsons);
}

function generateMain() {
  let main = document.querySelector("main");

  // Generate Drop-down
  let brT = document.createElement("br");

  
  // Collapsible box from w3schools
  let divCollapseBox = document.createElement("div");
  divCollapseBox.id = "collapse-box";

  let button = document.createElement("button");
  button.type = "button";
  button.className = "collapsible";
  button.innerHTML = "+ Pick Event Division";
  button.addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
      content.style.display = "none";
      } else {
      content.style.display = "block";
      }
  });

  let divCheckboxes = document.createElement("div");
  divCheckboxes.className = "content";
  for (i = 0; i < divisions.length; ++i) {
    let divi = divisions[i];

    let input = document.createElement("input");
    input.type = "checkbox";
    input.id = divi;
    input.name = divi;
    input.value = divi;
    input.onchange= () => handleEventChange(input);

    let label = document.createElement("label");
    label.htmlFor = divi;
    label.innerHTML = divi.replace(/-/g, " ");

    let br = brT.cloneNode(true);

    divCheckboxes.appendChild(input);
    divCheckboxes.appendChild(label);
    divCheckboxes.appendChild(br);
  }

  divCollapseBox.appendChild(button);
  divCollapseBox.appendChild(divCheckboxes);

  main.appendChild(divCollapseBox);

  // Generate grid
  let gridContainer = document.createElement("div");
  gridContainer.className = "grid-container";

  // Header row
  let gridRow = document.createElement("div");
  gridRow.className = "grid-row";

  let gridHeader = document.createElement("div");
  gridHeader.className = "grid-item grid-header";
  gridHeader.innerHTML = "Division";
  gridRow.appendChild(gridHeader);

  gridHeader = document.createElement("div");
  gridHeader.className = "grid-item grid-header";
  gridHeader.innerHTML = "Team";
  gridRow.appendChild(gridHeader);

  gridHeader = document.createElement("div");
  gridHeader.className = "grid-item grid-header";
  gridHeader.innerHTML = "Status";
  gridRow.appendChild(gridHeader);

  gridHeader = document.createElement("div");
  gridHeader.className = "grid-item grid-header";
  gridHeader.innerHTML = "Next Match";
  gridRow.appendChild(gridHeader);

  gridContainer.appendChild(gridRow);

  // Team rows
  for (i = 0; i < divisions.length; ++i) {
    let divi = divisions[i];
    let teams = tjsons[i];

    let rowDivTemplate = document.createElement("div");
    rowDivTemplate.className = "grid-row " + divi;

    let cellTemplate = document.createElement("div");
    cellTemplate.className = "grid-item";

    for (j = 0; j < teams.length; ++j) {
      // for each team, generate row
      let rowDiv = rowDivTemplate.cloneNode(true);

      let divCell = cellTemplate.cloneNode(true);
      divCell.innerHTML = divi.replace(/-/g, " ");
      rowDiv.appendChild(divCell);

      let teamCell = cellTemplate.cloneNode(true);
      teamCell.innerHTML = teams[j].Number;                 // NOTE: change this to team name if you prefer
      rowDiv.appendChild(teamCell);

      let statusCell = cellTemplate.cloneNode(true);
      statusCell.className = "grid-item status";
      rowDiv.appendChild(statusCell);

      let countdownCell = cellTemplate.cloneNode(true);
      countdownCell.className = "grid-item countdown";
      countdownCell.dataset.endtime = "done";
      
      // TODO: function to find next time
      
      rowDiv.appendChild(countdownCell);

      gridContainer.appendChild(rowDiv);
    }
  }

  main.appendChild(gridContainer);
}










// This works but has a TODO
function updateCountdowns() {
  const now = new Date();

  document.querySelectorAll(".countdown").forEach(cdCell => {
    const endTime = cdCell.dataset.endtime;

    // update based on time
    const statusCell = cdCell.previousElementSibling;

    if (endTime === "done") {
      cdCell.textContent = "-";
      return;
    }

    const diff = new Date(endTime) - now;

    if (diff <= 0) {
      // TODO: function to find next time

      cdCell.dataset.endtime = "done";
      cdCell.textContent = "-";

    } else {
      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)));

      cdCell.textContent = `${minutes}m ${seconds}s`;
    }
  });
}

setInterval(updateCountdowns, 1000);
updateCountdowns();










// will be modifying this to suit needs

function handleEventChange(checkbox) {
  if (checkbox.checked) {
    console.log(`Checked: ${checkbox.value}`);
    // if(value == 1){
    //     highlight('app-dev');
    // }
  } else {
    console.log(`Unchecked: ${checkbox.value}`);
    // if(value == 1){
    //     unhighlight();
    // }
  }
}

function highlight($class) {
  var all = document.getElementsByClassName($class);
  for (var i = 0; i < all.length; i++) {
    all[i].style.color = 'red';
  }
}

function unhighlight() {
  var all = document.getElementsByClassName('app-dev');
  for (var i = 0; i < all.length; i++) {
    all[i].style.color = 'black';
  }
  all = document.getElementsByClassName('data');
  for (var i = 0; i < all.length; i++) {
    all[i].style.color = 'black';
  }
  all = document.getElementsByClassName('manage');
  for (var i = 0; i < all.length; i++) {
    all[i].style.color = 'black';
  }
  all = document.getElementsByClassName('website');
  for (var i = 0; i < all.length; i++) {
    all[i].style.color = 'black';
  }
  all = document.getElementsByClassName('windows');
  for (var i = 0; i < all.length; i++) {
    all[i].style.color = 'black';
  }
  all = document.getElementsByClassName('wordpress');
  for (var i = 0; i < all.length; i++) {
    all[i].style.color = 'black';
  }
}
