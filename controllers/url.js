// get shortId to generate shortID
const shortid = require("shortid");
const URLS = require("../models/url");

const PORT = 8002;

async function handleNewUrls(req, res){
    const URL = req.body.url;

    const newId = shortid();
    if(!URL) return res.status(400).json({err: "url not found"});
    const record = await URLS.findOneAndUpdate({redirectUrl: URL},{$setOnInsert: {
        shortId: newId,
        redirectUrl: URL,
        numberOfClicks:[],
        createdBy: req.user._id,
    }},{upsert: true, returnOriginal: true});
    
    return res.render("home", {
        id: `http://localhost:${PORT}/url/${record ? record.shortId : newId}`,
    });
};

async function handleGetShortId(req, res){
    const ID = req.params.id;
    if(!ID) return res.status(400).json({err:"no id"});
    const record = await URLS.findOneAndUpdate({shortId: ID},{$push:{
        numberOfClicks:{timeStamps:Date.now()}
    }});
    if(!record) return res.status(404).json({err: "short url not found"});
    return res.redirect(record.redirectUrl);
}

async function handleAnalyticUrl(req, res){
    const ID = req.params.id;
    const record = await URLS.findOne({shortId: ID});
    if(!record) return res.status(404).json({err: "short url not found"});
    return res.json({numberOfClicks: record.numberOfClicks.length, analytics: record.numberOfClicks});
}

async function handleTest(req, res){
    const allUrl = await URLS.find({});
    return res.end(`
        <h1>Hey from server</h1>
        <ol>
            ${allUrl.map((url)=> `<li>${url.shortId} - ${url.redirectUrl} - ${url.numberOfClicks.length}</li>`).join("")}
        </ol>
    `);
};

module.exports = {
    handleNewUrls,handleGetShortId, handleAnalyticUrl, handleTest,
};