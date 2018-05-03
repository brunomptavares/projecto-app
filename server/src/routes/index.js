const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('index.html');
});

//This is what is exported when file is required
module.exports = router;