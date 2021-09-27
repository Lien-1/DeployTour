
class homeControllers {
    //GET /
    showHome(req, res) {
        res.render('home')
    }

    showViews(req, res) {
        res.render('views')
    }

  
}

module.exports = new homeControllers()