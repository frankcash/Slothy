function accessUserInfo(){
  // Getting
  chrome.storage.local.get("user", function(data) {
    // Do something with data.key
    if(data.user.steps < data.user.goals){
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
      $('button[type=submit]').click(function(e) {e.preventDefault();});

    }
    console.log("true");

  });
}

accessUserInfo();
