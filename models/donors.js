/**
 * Created by anjana-2492 on 7/14/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GeoJSON = require('mongoose-geojson-schema');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var mongooseValidator = require('mongoose-validator');
var schema = new Schema({
    firstName : {
        type:String,
        required: [true, 'Enter First Name']
    },
    lastName : {
        type:String,
        required:[true, 'Enter Last Name']
    },
    contactNumber : {
        type:String,
        required:[true, 'Enter Contact Number'],
        unique:[true, 'This Contact Number is already registered']
    },
    emailAddress : {
        type:String,
        required:[true, 'Enter your Email Address'],
        unique:[true, 'This Email Address is already registered'],
        validate: {
            validator: function(v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: 'Enter valid Email Address'
        }
    },
    bloodGroup : {
        type:String,
        required:[true, 'Enter your Blood Group']
    },
    address : {
        type:String,
        required:[true, 'Enter your Address']
    },
    ip : {
        type:String,
        required:[true, 'Enter your IP Address'],
        validate: {
            validator: function(v) {
                return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(v);
            },
            message: 'Enter valid IP Address'
        }
    },
    coordinates : {
        type: mongoose.Schema.Types.Point,
        required:[true, 'Enter your Coordinates']
    }
});

schema.plugin(mongooseUniqueValidator)
module.exports = mongoose.model('Donor', schema);