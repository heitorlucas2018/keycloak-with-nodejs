const router = require('express')();

router.get('/info', (req,res) => (res.send('User Admin')) )


module.exports = router