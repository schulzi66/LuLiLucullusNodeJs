app.get('/logout', function (req, res) {
    req.session.destroy(function () {
        req.logout();
        res.redirect("/login");
    });
});