function accessUserInfo(){
  // Getting
  chrome.storage.local.get("user", function(data) {
    // Do something with data.key
    console.log("true");
  });
}

$('form').submit(function(e) {
  e.preventDefault();
});






$('button').prop('disabled', true);
$('form').submit(function(e) {
  return false;
});
$('button').click(function(e){
  return false;
})
