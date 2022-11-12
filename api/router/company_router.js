
const express = require("express");
const CompanyControllers = require("../controllers/addData");


const router = express();


router.post('/api/v1', CompanyControllers.compaanyData);
router.post('/api/v1/ads', CompanyControllers.AdsData);
router.get('/api/v1', CompanyControllers.fetchData);


module.exports = router;
