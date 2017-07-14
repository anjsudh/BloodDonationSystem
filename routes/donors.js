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
        coordinates:req.body.donor.coordinates
    });
    donor.save(function(err, result){
        if(err==null) {
            res.send({donors:result});
        } else{
            res.status(400);
            res.send({errorCode: 400, errorCause: err.errors});
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
        }
    });
});

router.get('/:id', function(req, res, next) {
    console.log(req.params.id);
    Donor.findOne({_id:req.params.id}, function(err, result){
        if(err==null) {
            res.send({donors:result});
        } else{
            res.status(400);
            res.send({errorCode: 400, errorCause: err.errors});
        }
    });
});

router.put('/:id', function(req, res, next) {
    console.log(req.body);
    Donor.findOne({_id:req.params.id}, function(err, result){
        if(err==null) {
            console.log("Result:"+result)
            if(req.body.donor.firstName){
                result.firstName=req.body.donor.firstName
            }
            if(req.body.donor.lastName){
                result.lastName=req.body.donor.lastName
            }
            if(req.body.donor.contactNumber){
                result.contactNumber=req.body.donor.contactNumber
            }
            if(req.body.donor.emailAddress){
                result.emailAddress=req.body.donor.emailAddress
            }
            if(req.body.donor.bloodGroup){
                result.bloodGroup=req.body.donor.bloodGroup
            }
            if(req.body.donor.address){
                result.address=req.body.donor.address
            }
            if(req.body.donor.ip){
                result.ip=req.body.donor.ip
            }
            if(req.body.donor.coordinates){
                result.coordinates=req.body.donor.coordinates
            }
            result.save(function(err, result){
                if(err==null) {
                    res.send({donors:result});
                } else{
                    res.status(400);
                    res.send({errorCode: 400, errorCause: err.errors});
                }
            });
        } else{
            res.status(404);
            res.send({errorCode: 404, errorCause: err.errors});
        }
    });
});

router.delete('/:id', function(req, res, next) {
    console.log(req.params.id);
    Donor.deleteOne({_id:req.params.id}, function(err, result){
        if(err==null) {
            res.status(201);
            res.send("");
        } else{
            res.status(400);
            res.send({errorCode: 400, errorCause: err.errors});
        }
    });
});

module.exports = router;
