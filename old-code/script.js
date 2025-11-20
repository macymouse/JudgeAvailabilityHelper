function somefunction() {
  var select = document.getElementById('class');
  var value = select.options[select.selectedIndex].value;
  if(value == 0){
    unhighlight();
  }
  if(value == 1){
    unhighlight();
    highlight('app-dev');
  }
  if(value == 2){
    unhighlight();
    highlight('data');
  }
  if(value == 3){
    unhighlight();
    highlight('manage');
  }
  if(value == 4){
    unhighlight();
    highlight('website');
  }
  if(value == 5){
    unhighlight();
    highlight('windows');
  }
  if(value == 6){
    unhighlight();
    highlight('wordpress');
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
