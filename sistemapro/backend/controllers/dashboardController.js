// controllers/dashboardController.js
exports.dashboard = (req, res) => {
    res.render('dashboard', { user: req.user });
  };
  