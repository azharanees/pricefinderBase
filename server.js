var http = require('http');
const express = require('express');
const app = express();
var router = express.Router();
var eBay = require('ebay-node-api');
const axios = require('axios')


let ebay = new eBay({
    clientID: "pricefin-pricefin-PRD-bf2cd4cf7-bca5e5ee",
    limit:20,// fetches top 10 results in form of JSON.
    env: "PRODUCTION" // optional default = "PRODUCTION",

});

var searchTerm = "iphone 6";




function calculatePrice(searchTerm, res){


    var finalJson;
    let ebay = new eBay({
        clientID: "pricefin-pricefin-PRD-bf2cd4cf7-bca5e5ee",
     limit:20,// fetches top 10 results in form of JSON.
        env: "PRODUCTION" // optional default = "PRODUCTION"
    })
    
   // const searchTerm = "iphone 5s";
    var jsonRes =[];
     stri = "";
     var predictedJson = {
         hi : "hello"
     };
    var prices = 0;
    var pArr = [];
    var total  = 0;
    
    ebay.findItemsByKeywords(searchTerm).then((data) => {
        jsonRes = data;
        // var item["@count"] = "";
        
       // console.log(JSON.stringify(data));
    var itemCount = 0;
        for(var searchResult in jsonRes[0].searchResult[0].item){
            //console.log(JSON.stringify(jsonRes[0].searchResult[0].item[0]));
    
            prices = (JSON.stringify(jsonRes[0].searchResult[0].item[searchResult].sellingStatus[0].currentPrice[0].__value__));
                
    
            var fPrice = parseFloat(prices.replace(/"/g,''));
           // console.log((fPrice));
            total =fPrice+total;
            pArr.push(fPrice);
            itemCount++;
    
    
        }
    
        
       console.log("Total : " +total);
       console.log("items : " +itemCount);
       console.log("Average : " +total/itemCount);
    
         predictedPrice = total/itemCount;

    
       predictedJson = {
          item:searchTerm,
          total : total,
          itemCount : itemCount,
          predictedPrice : predictedPrice 
      };
    //  console.log(JSON.stringify(predictedJson));

      //console.log(predictedJson);
    //  return "predictedJson";
   
      //console.log(JSON.stringify(predictedJson));
            
    //return predictedJson;
    return predictedJson;
    }, (error) => {
        console.log(error);
        error2 = {
            total : total,
            itemCount : itemCount,
            predictedPrice : predictedPrice 
        };
    }).then((json)=>{
        console.log(json);
        finalJson = json;
        res.end(JSON.stringify(json));
       // return json;
   // console.log(JSON.stringify(predictedJson));
 // return predictedJson;
},function(error){
    console.log(error);
});
}

function getItemFromLink(link,res){
    let ebay = new eBay({
        clientID: "pricefin-pricefin-PRD-bf2cd4cf7-bca5e5ee",
     limit:1,// fetches top 10 results in form of JSON.
        env: "PRODUCTION" // optional default = "PRODUCTION"
    });


    var desc = "";
    ebay.findItemsByKeywords(link).then((data) => {
        jsonRes = data;
        // var item["@count"] = "";
        
       // console.log(JSON.stringify(data));
    var itemCount = 0;
        for(var searchResult in jsonRes[0].searchResult[0].item){
            desc = (jsonRes[0].searchResult[0].item[0].title[0]);
            console.log(JSON.stringify(desc));
    
            // prices = (JSON.stringify(jsonRes[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0].__value__));
            // var fPrice = parseFloat(prices.replace(/"/g,''));
           // console.log((fPrice));
         
        }
        res.end(JSON.stringify({
            description : desc
        }));

    });
  
 



// let ebay = new Ebay({
//     clientID: "pricefin-pricefin-SBX-ba6d0a603-45cc6d17",
//     clientSecret: 'SBX-a6d0a603dc13-b769-4a59-b2b1-82ad',
//         body: {
//             grant_type: "client_credentials"
//         }
// });


//     ebay.getAccessToken()
//     .then((data) => {
//         ebay.getItem('v1|202117468662|0').then((data) => {
//             console.log(data);
//             // Data is in format of JSON
//             // To check the format of Data, Go to this url (https://jsonblob.com/56cbea67-30b8-11e8-953c-5d1886dcf4a0)
//         })
//     });

}



function getRecommendedProducts(searchTerm, res){


    var finalJson;
    let ebay = new eBay({
        clientID: "pricefin-pricefin-PRD-bf2cd4cf7-bca5e5ee",
     limit:20,// fetches top 10 results in form of JSON.
        env: "PRODUCTION" // optional default = "PRODUCTION"
    })
    
   // const searchTerm = "iphone 5s";
    var jsonRes =[];
     stri = "";
    

     var recommededJson = {

     };
    var prices = 0;
    var pArr = [];
    var total  = 0;
    var img = [];
    var urlArr = [];
    
    ebay.findItemsByKeywords(searchTerm).then((data) => {
        jsonRes = data;
        // var item["@count"] = "";
        
       // console.log(JSON.stringify(data));
    var itemCount = 0;
        for(var searchResult in jsonRes[0].searchResult[0].item){
          

            prices = (JSON.stringify(jsonRes[0].searchResult[0].item[searchResult].sellingStatus[0].currentPrice[0].__value__));



            var imgageurl = ((jsonRes[0].searchResult[0].item[searchResult].galleryURL[0]));
            var urlArray = ((jsonRes[0].searchResult[0].item[searchResult].viewItemURL[0]));
                
    
            var fPrice = parseFloat(prices.replace(/"/g,''));
           // console.log((fPrice));
            total =fPrice+total;
            pArr.push(fPrice);
            img.push(imgageurl);
            urlArr.push(urlArray);
            itemCount++;
            
    
    
        }
  
        
    //    console.log("Total : " +total);
    //    console.log("items : " +itemCount);
    //    console.log("Average : " +total/itemCount);
    //    console.log("Image :" + img.toString());
    //    console.log("Viewed URL :" + urlArr.toString());
    //    console.log("Productprice" + pArr)
       //  predictedPrice = total/itemCount;

         recommededJson =  {
            'phone':{
               'img' : img[0],
               'url' : urlArr[0],
               'price' : pArr[0]
            },
             'phoneOne':{
                'img' : img[1],
                'url' : urlArr[1],
                'price' : pArr[1]
             },
             'phoneTwo':{
                'img' : img[2],
                'url' : urlArr[2],
                'price' : pArr[2]
             },
             'phoneThree':{
                'img' : img[3],
                'url' : urlArr[3],
                'price' : pArr[3]
             },
             'phoneFour':{
                'img' : img[4],
                'url' : urlArr[4],
                'price' : pArr[4]
             },
         };


         /*result="recommendedJson:[";
         for(i in img,urlArr,pArr){
             result=result+'{urlArr:'+i+",img,urlArr,parr"+img[]+'}';
         }*/


         
   

     
  /*  return predictedJson;
    }, (error) => {
        console.log(error);*/
   
    }).then((json)=>{
        console.log(JSON.stringify(recommededJson));
        finalJson = json;
        res.send((recommededJson));

        //return recommededJson;
      (error) =>{
            console.log(error)
        }
     
},function(error){
    console.log(error);
});
}

function predictPrice(searchTerm,resp){

    const jsonOnj = {
        "Inputs": {
                "input1":
                [
                    {
                            "model": "Iphone 8",   
                            "Brand": "Apple",   
                            "description": "adsfassf",   
                            "price": 231,   
                            "sentiment": 0.67   
                    }
                ]
        },
    "GlobalParameters":  {
    }
};

const api_key = '1rrQMiCh0mu0flJJ/GadWLBfFMPDOnnUQtL2p9HOx5JzFpxle+bOe/r0P8sVQDpvCi6MNOfTxI+eTn7LQztSCg==';
const headers = {
   'Content-Type' : "application/json",
    'Authorization':'Bearer '+ api_key
};
    axios.post('https://ussouthcentral.services.azureml.net/workspaces/a76d1fe17471414fa3baf79ffc91c629/services/7d52391e8bf74e7bae50841a36a5d6ae/execute?api-version=2.0&format=swagger', 
    jsonOnj,{headers:headers})
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
      var prediction = (res.data.Results.output1[0]);
      predictedPrice = (prediction['Scored Label Mean']);
      jsonfinal = {
          prediction_value : predictedPrice
      }
      console.log(jsonfinal);
      resp.end(JSON.stringify(jsonfinal));
    })
    .catch((error) => {
      console.error(error)
    })

    





}

var searchTerm;
function setSearchTerm(searchTerm){
this.searchTerm = searchTerm;
}




// function (req,res){
//     console.log('requested url: ' + req.url);
//     res.writeHead(200,{'Content-Type': 'application/json'});
//     var jsonObj = {
//         name : 'title',
//         price : 2000
//     };
//     res.end(JSON.stringify(jsonObj));
    
//     }

// http.get('/:search', function(req,res, next){
//     console.log('requested url: ' + req.url);
//     console.log('requested item: ' + req.params.search);
//     searchTerm = req.params.search;
//     calculatePrice(searchTerm,res);
//    });

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.get('/api/getRecommendedProducts', (req,res)=>{

    getRecommendedProducts(searchTerm,res);
})

app.get('/',(req,res)=>{

    res.send('Price Finder API');

});

app.get('/api/getprice/:item',(req,res)=>{

        searchTerm = req.params.item;
        console.log(searchTerm);
         calculatePrice(searchTerm,res);
         setSearchTerm(searchTerm);

         

});

app.post('/api/getprediction',(req,res)=>{
    console.log(req.body);
   // res.write("getpredictionworking");
    predictPrice(searchTerm,res);
    setSearchTerm(searchTerm);


});

app.get('/api/getPredictionForLink/:prodId',(req,res)=>{
    console.log(req.params.prodId);
    if(!req.params.prodId){
        res.writeHead(400,'Bad Request product id is missing');
    }else{

    console.log(req.params.prodId);

    res.writeHead(200,{
        'Content-Type': 'application/json'
    })
    getItemFromLink(req.params.prodId,res);
    //res.end("Predicting Price....")
};
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Listening on port ${port}...`)
});

// http.createServer((req,res)=>{
//     if (req.url==='/') {
//         console.log("inside the locatl" + req.url)
//     res.writeHead(404,{'Content-Type': 'application/json'});
//     var jsonObj = {
//         error : 'not found',
//     };
//     res.end(JSON.stringify(jsonObj));
//     }
//     if(req.url !='/'){
//         console.log("Outside the locatl" + req.url);
//         searchTerm = "iphone 6";
//         calculatePrice(searchTerm,res);
       
        
//     }
// }).listen(3000);





console.log("server is running");