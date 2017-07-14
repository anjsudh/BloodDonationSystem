var express = require('express');
var router = express.Router();
var Donor = require('../models/donors');

/* Add Donor. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    var donor = new Donor({
        firstName:req.body.donor.firstName,
        lastName:req.body.donor.lastName,
        contactNumber:req.body.donor.contactNumber,
        emailAddress:req.body.donor.emailAddress,
        bloodGroup:req.body.donor.bloodGroup,
        address:req.body.donor.address,
        ip:req.body.donor.ip,
        coordinates:{type: "Point",  coordinates: req.body.donor.coordinates}
    });
    donor.save(function(err, result){
        if(err==null) {
            res.send("Success !! Yaay!!");
        } else{
            res.status(400);
            res.send({errorCode: 400, errorCause: err.errors});
            //res.send({errorCode: 400, errorCause: Object.keys(err.errors)});
        }
    });
});


router.get('/', function(req, res, next) {
    Donor.find({}, function(err, result){
        if(err==null) {
            res.send({donors:result});
        } else{
            res.status(400);
            res.send({errorCode: 400, errorCause: err.errors});
            //res.send({errorCode: 400, errorCause: Object.keys(err.errors)});
        }
    });
});


module.exports = router;
