// This callback function is called when the content script has been
// injected and returned its results

// Global reference to the status display SPAN
var statusDisplay = null;


function saveUserInfo(){
  event.preventDefault();

  var username = encodeURIComponent(document.getElementById('username').value);

  var getUrl = 'http://localhost:3000/steps/' + username;

  // Set up an asynchronous AJAX POST request


  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    // If the request completed
    if (xhr.readyState == 4) {
      statusDisplay.innerHTML = '';
      if (xhr.status == 200) {
        // If it was a success, close the popup after a short delay
        statusDisplay.innerHTML = 'success';
        console.log(xhr.responseText);
        console.log("xhr", xhr);
        // window.setTimeout(window.close, 1000);
        var data = jQuery.parseJSON(xhr.response)
        console.log("data", data);
        chrome.storage.local.set({user: data}, function() {
          if(chrome.runtime.lastError) {
            console.error(
              "Error setting " + user + " to " + JSON.stringify(data) +
              ": " + chrome.runtime.lastError.message
            );
          }
        });
      } else {
        // Show what went wrong
        statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
      }
    }
  };

  xhr.open("GET", getUrl, true);


  xhr.send();


  // Prepare the data to be POSTed by URLEncoding each field's contents

}

function accessUserInfo(){
  // Getting
  chrome.storage.local.get("user", function(data) {
    // Do something with data.key
    console.log("data", data);
    if(data.user.steps < data.user.goals){
      $('form').submit(function(e) {
        e.preventDefault();
      });

      $('button').prop('disabled', true);
      $('form').submit(function(e) {
        return false;
      });
      $('button').click(function(e){
        e.preventDefault()
        return false;
      })

    }
  });
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    console.log("user info: " , accessUserInfo());
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('addbookmark').addEventListener('submit', saveUserInfo);
    // Get the event page

    var button = document.getElementById('findSteps');
s

});
