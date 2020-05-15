const router = require('express').Router();
require('dotenv').config();

router.route('/').post((req, res) => {
    let login_success = false;
    if (process.env.ADMIN_USERNAME === req.body.username )
    {
        if (process.env.ADMIN_PASSWORD === req.body.password)
        {
            login_success = true;
        }
    }
    if (login_success === true)
    {
        console.log("Valid Password");
        res.json(true);
    }
    else
    {
        console.log("Invalid Username or Password")
        res.json(false);
    }
});


module.exports = router;