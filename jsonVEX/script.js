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

function loginTrue() {
  // load the page
  document.getElementById('loginForm').style.display = "none";

  // generate main

  document.getElementById('main').style.display = "block";
}



function getData() {
  // array of json lists?

}


// modify this too - chatgpt
function createTableInMain(data) {
  let main = document.querySelector("main");
  if (!main) {
    main = document.createElement("main");
    document.body.appendChild(main);
  }

  // Create table elements
  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";

  // Helper to create cells with consistent styling
  const createCell = (text, isHeader = false) => {
    const cell = document.createElement(isHeader ? "th" : "td");
    cell.textContent = text;
    cell.style.border = "1px solid #ccc";
    cell.style.padding = "8px";
    return cell;
  };

  // If data is array of objects → extract headers
  if (Array.isArray(data) && data.length && typeof data[0] === "object" && !Array.isArray(data[0])) {
    const headerRow = document.createElement("tr");
    Object.keys(data[0]).forEach(key => {
      headerRow.appendChild(createCell(key, true));
    });
    table.appendChild(headerRow);

    data.forEach(rowObj => {
      const row = document.createElement("tr");
      Object.values(rowObj).forEach(value => {
        row.appendChild(createCell(value));
      });
      table.appendChild(row);
    });

  } else {
    // Array of arrays
    data.forEach((rowArr, rowIndex) => {
      const row = document.createElement("tr");
      rowArr.forEach(cell => {
        row.appendChild(createCell(cell, rowIndex === 0));
      });
      table.appendChild(row);
    });
  }

  // Append table to <main>
  main.appendChild(table);
}














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
