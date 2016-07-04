var express = require('express');
var router = express.Router();
var pg = require('../pg');
var passportGithub = require('../auth/github');


// router.get('/login', function(req, res, next) {
//     res.send('Go back and register!');
// });

// router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

// router.get('/auth/github/callback',
//     passportGithub.authenticate('github', { failureRedirect: '/login' }),
//     function(req, res) {
//         // Successful authentication
//         res.json(req.user);
//     });


router.get('/markers_json', function(req, res, next) {

    // All columns in table with the exception of the geometry column
    var nonGeomColumns = "markers";

    var sql = pg.featureCollectionSQL("marker_json", nonGeomColumns);
    var preparedStatement = {
        name: "marker_json",
        text: sql,
        values:[]};

    pg.queryDeferred(preparedStatement)
        .then(function(result){
            res.send(JSON.stringify(result[0].response.features[0].properties.markers));
        })
        .catch(function(err){
            next(err);
        });

});


router.get('/save_marker', function(req, res, next) {
    console.log('save marker');

    var lat = 37.7760023304;
    var lng = -122.4144127965

    // All columns in table with the exception of the geometry column
    var markerValues = [ 10, "'testing 3 haras'", -122.4144127965, 37.7760023304, "'commentzzz'","'Jun 14 2016 20:58:11 '" ,4 ].join(',');


    var sql = pg.insertSQL("save_marker", markerValues);
    var preparedStatement = {
        name: "save_marker",
        text: sql,
        values:[]};

    pg.queryDeferred(preparedStatement)
        .then(function(result){
            res.send('marker saved');
        })
        .catch(function(err){
            next(err);
        });



});


module.exports = router;


