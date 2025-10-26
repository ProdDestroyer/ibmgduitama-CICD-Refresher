const {Router} = require('express');
const {frontRefresh, backRefresh} = require('../controllers/monitor');
const router = Router();

router.post('/ibmg_duitama_front_refreshed', frontRefresh);
router.post('/ibmg_duitama_back_refreshed', backRefresh);

module.exports = router;