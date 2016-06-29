app.get("/auth/facebook", passport.authenticate("facebook",{ scope : "email"}));

app.get("/auth/facebook/callback",
    passport.authenticate("facebook",{ failureRedirect: '/login'}),
    function(req,res){
        res.render("loggedin", {user : req.user});
    }
); 