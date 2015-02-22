var User = require("../models/user");


module.exports= function(app, config, Fitbit, logger){


  app.get('/register', function (req, res) {
    // Create an API client and start authentication via OAuth
    var client = new Fitbit(config.CONSUMER_KEY, config.CONSUMER_SECRET);

    client.getRequestToken(function (err, token, tokenSecret) {
      if (err) {
        // Take action
        return;
      }

      req.session.oauth = {
        requestToken: token,
        requestTokenSecret: tokenSecret
      };
      res.redirect(client.authorizeUrl(token));
    });
  })

  app.post('/create_account', function(req, res){
    console.log("body", req.body );
    var user = new User({
      username:req.body.name,
      token:req.body.token,
      secret:req.body.secret

    });

    user.save(function(err){
      if(err){
        console.log("broken");
        res.send("500");
      }
      console.log("worked");
      res.send("200");
    });
  })

  // On return from the authorization
  app.get('/oauth_callback', function (req, res) {
    var verifier = req.query.oauth_verifier,
    oauthSettings = req.session.oauth,
    client = new Fitbit(config.CONSUMER_KEY, config.CONSUMER_SECRET);

    console.log("req: ", req);

    // Request an access token
    client.getAccessToken(
      oauthSettings.requestToken,
      oauthSettings.requestTokenSecret,
      verifier,
      function (err, token, secret) {
        if (err) {
          // Take action
          return;
        }

        oauthSettings.accessToken = token;
        oauthSettings.accessTokenSecret = secret;
        console.log("token: ", token);
        console.log("secret: ", secret);
        res.redirect('/#/configure/' + token + '/' + secret);
      }
    );
  })

  app.get('/steps/:username', function(req, res){

    User.findOne(req.params.username, function(err,user){
      if(err){
        res.send(err);
      }
      console.log("user", user);
      logger.debug(user);

      client = new Fitbit(
        config.CONSUMER_KEY,
        config.CONSUMER_SECRET, { // Now set with access tokens
          accessToken: user.token,
          accessTokenSecret: user.secret,
          unitMeasure: 'en_GB'
        }
      );
      logger.debug(client);

      // Fetch todays activities
      client.getActivities(function (err, activities) {
        if (err) {

          res.send(err);
        }
        console.log("activities", activities);
        res.json({steps : activities.steps(), goals: activities._attributes.goals.steps});
      });

    });

  })



}
