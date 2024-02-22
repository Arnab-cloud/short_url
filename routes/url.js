const express = require("express");
const router = express.Router();
const {handleNewUrls, handleGetShortId, handleAnalyticUrl, handleTest} = require("../controllers/url");

router.post("/", handleNewUrls);
router.get("/:id", handleGetShortId);
router.get("/analytics/:id", handleAnalyticUrl);
// router.get("/url/test", handleTest);

module.exports = router;