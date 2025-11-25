// How many milliseconds minimum to complete an interview before a match starts?
// e.g., 10 minutes = 10 * 60 seconds * 1000 milliseconds = 600000
const prepTime = 600000;
// How many milliseconds is a match?
// e.g., 3 minutes 30 seconds = (3 * 60 seconds + 30) * 1000 milliseconds = 210000
const matchDuration = 210000;




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
  } else {
    alert("Wrong passphrase!");
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
let mjsons = {};
let tjsons = {};
let countdowns = [];

async function getData() {
  await fetch('./data/divisions.json')
  .then(r => r.json())
  .then(divs => {
      divisions = divs;
  });

  for (i = 0; i < divisions.length; ++i) {
    let div = divisions[i];
    const mresponse = await fetch(`./data/m${div}.json?ts=${Date.now()}`);
    const mjson = await mresponse.json();
    const tresponse = await fetch(`./data/t${div}.json?ts=${Date.now()}`);
    const tjson = await tresponse.json();
    mjsons[div] = mjson;
    tjsons[div] = tjson;
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
    input.checked = true;
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
    let teams = tjsons[divi];

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
      countdownCell.dataset.endtime = "-";
      countdownCell.dataset.team = teams[j].Number;
      countdownCell.dataset.div = divi;
      countdownCell.dataset.lastMatch = "none";
      
      rowDiv.appendChild(countdownCell);

      gridContainer.appendChild(rowDiv);
    }
  }

  main.appendChild(gridContainer);
  countdowns = Array.from(document.querySelectorAll(".countdown"));

  setInterval(updateCountdowns, 1000);
  updateCountdowns();
}

function updateCountdowns() {
  const now = new Date();

  countdowns.forEach(cdCell => {
    let endTime = cdCell.dataset.endtime;
    
    // update based on time
    const statusCell = cdCell.previousElementSibling;
    const team = cdCell.dataset.team;
    const div = cdCell.dataset.div;


    let matches = mjsons[div][team];

    
    // Initialise time
    if (endTime === "-") {
      [cdCell.dataset.endtime, cdCell.dataset.lastMatch] = findTime(matches, now);

      endTime = cdCell.dataset.endtime;
    }
    let lastDiff = -1;
    
    // When done, stop.
    if (endTime === "done") {
      cdCell.textContent = "-";
      
      if (cdCell.dataset.lastMatch !== "none") {
        lastDiff = now - new Date(cdCell.dataset.lastMatch);
      }

      if (lastDiff >= 0 && lastDiff < matchDuration) {
        statusCell.innerHTML = "IN MATCH";
      } else {
        statusCell.innerHTML = "AVAILABLE";
      }

      return;
    }
    
    // Else, we find the time.
    const diff = new Date(endTime) - now;

    if (diff <= 0) {
      [cdCell.dataset.endtime, cdCell.dataset.lastMatch] = findTime(matches, now);
      cdCell.textContent = "-";

    } else {
      // Countdown
      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)));

      cdCell.textContent = `${minutes}m ${seconds}s`;
      
      
      if (cdCell.dataset.lastMatch !== "none") {
        lastDiff = now - new Date(cdCell.dataset.lastMatch);
      }

      //statusCell
      if (lastDiff >= 0 && lastDiff < matchDuration) {
        statusCell.innerHTML = "IN MATCH";
      } else if (diff < prepTime) {
        statusCell.innerHTML = "MATCH SOON";
      } else {
        statusCell.innerHTML = "AVAILABLE";
      }

    }
  });
}






function findTime(matches, now) {

  let lastMatch = "none";

  for (i = 0; i < matches.length; ++i) {
    let matchTime = matches[i].replace(" ", "T");
    console.log(matchTime);
    let diff = new Date(matchTime) - now;

    if (diff > 0) {
      return [matchTime, lastMatch];
    }

    lastMatch = matchTime;
  }
  console.log("done");
  return ["done", lastMatch];
}

function handleEventChange(checkbox) {
  if (checkbox.checked) {
    console.log(`Checked: ${checkbox.value}`);
    var all = document.getElementsByClassName(checkbox.value);
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = '';
    }
  } else {
    console.log(`Unchecked: ${checkbox.value}`);
    var all = document.getElementsByClassName(checkbox.value);
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = 'none';
    }
  }
}