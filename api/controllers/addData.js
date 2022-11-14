const company = require('../models/sample_models'); 
const ads = require("../models/ads");


exports.compaanyData = async(req, res ) => {
    
   
    
    const Data = {
        _id:req.body.id,
        companies: req.body.companies,
        url: req.body.url,
    }
    console.log(Data);
    try{
        const DataCreate = await company.create(Data);
        console.log(DataCreate)
        res.status(200).json(DataCreate);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}



exports.AdsData = async(req, res) => {
    const Data = 
    {
        _id: req.body.id,
        companyID: req.body.companyId, 
        primaryText: req.body.pText, 
        headline : req.body.headline, 
        description: req.body.desc, 
        imageUrl: req.body.url
    }
    try {
        const DataCreate = await ads.create(Data); 
        console.log(DataCreate); 
        res.status(200).json(DataCreate);
    }catch(err){
        console.log(err); 
        res.send(err);
    }
}


exports.fetchData = async(req, res) => { 
   company.aggregate([ {
        $lookup: {
            from: "ads",
            localField:"companyID",
            foreignField: "id",
            as: "Ads"
        }
    },
   { $unwind: "$Ads"}, 
    {
        $project: {
           companies:1, 
           url: 1,
           primaryText: "$Ads.primaryText",
           headline: "$Ads.headline", 
           description: "$Ads.description", 
           imageUrl: "$Ads.imageUrl" 
        }
    }
], 
    function(err, Data){
        if ( err ){
        throw err;
        }
    console.log(Data);
      res.status(200).json(Data)
    }
    )
}

exports.fetchDataKey = async(req,res) => {
    let search = req.params.key;
  

    company.aggregate([ 
       
        
        {
        $lookup: {
            from: "ads",
            localField:"companyID",
            foreignField: "id",
            as: "Ads"
        }
    },
  

   { $unwind: "$Ads"}, 
    {
        $project: {
           companies:1, 
           url: 1,
           primaryText: "$Ads.primaryText",
           headline: "$Ads.headline", 
           description: "$Ads.description", 
           imageUrl: "$Ads.imageUrl" 
        }
    },
], 
function(err, Data){
    if ( err ){
    throw err;
    }
    const result = Data.filter((data) => {
        if (search === "") return data;
        else if (data.primaryText.toLowerCase().includes(search.toLowerCase()))
          return data;
        else if (data.headline.includes(search)) return data;
        else if (data.description.toLowerCase().includes(search.toLowerCase()))
          return data;
          else if (data.imageUrl.toLowerCase().includes(search.toLowerCase()))
          return data;
          else if (data.companies.toLowerCase().includes(search.toLowerCase()))
          return data;
          else if (data.url.toLowerCase().includes(search.toLowerCase()))
          return data;
    })
    res.send(result);
    
}
    )

}