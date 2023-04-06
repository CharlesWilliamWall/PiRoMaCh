module.exports = (err, req, res, next) => {
    console.log(err);
    res.redirect("/error");
}; // Gestion de toutes les erreurs ici (sauf erreurs de validation retournées par mongoose)
