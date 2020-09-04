var express = require('express');
var router = express.Router();
var app = express();
const server = require('http').createServer(app);
const Csv = require('../models/Csv');

// list data
router.get('/', function(req, res) {
    Csv.find(function (err, csvData) {
        if (err) return next(err);
        res.json(csvData);
    });
});

// CSV report
router.get('/itemscsv',  function(req, res, next) {
    Csv.aggregate([
        {
            $group: { 
                _id: { itemId: '$itemId', itemName: '$itemName' }, 
                totalPrice: {
                    $sum: '$totalPrice'
                }
            }
        },
        { $sort: {totalPrice: 1} }
    ], function (err, csv) {
        if (err) return next(err);
        res.json(csv);
    });
});

// get data by id
router.get('/:id', function(req, res, next) {
    Csv.findById(req.params.id, function (err, csv) {
        if (err) return next(err);
        res.json(csv);
    });
});
  
// post data
router.post('/', function(req, res, next) {
     let d=JSON.stringify(req.body)
  
// console.log("sdfdsfsb ",req.body[0])
let ar=[];
req.body.map(function(r,i){
arobj={};
console.log("iii ",i)
if(i==0 || r==""){
}else{
arobj.firstname=r[0];
arobj.lastname=r[1];
arobj.email=r[2];
ar.push(arobj)
}
})

var a=JSON.stringify(ar);
var b=JSON.parse(a);

    Csv.insertMany(b, function (err, csv) {
   // Csv.create(req.body, function (err, csv) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(csv);
    });
});
  
// put data
router.put('/:id', function(req, res, next) {
    Csv.findByIdAndUpdate(req.params.id, req.body, function (err, csv) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(csv);
    });
});
  
// delete data by id
router.delete('/:id', function(req, res, next) {
    Sales.findByIdAndRemove(req.params.id, req.body, function (err, csv) {
        if (err) return next(err);
        res.json(csv);
    });
});

module.exports = router;