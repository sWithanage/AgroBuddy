const express = require("express");
const router = express();
const mysqlConnection = require("../connection");

//get all crop details
router.get("/crops", (req, res) => {
    mysqlConnection.query("SELECT * from crop", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

//get a selected crop details
router.get("/crops/:id", (req, res) => {
    mysqlConnection.query(
        "SELECT * from crop WHERE crop_id=?",
        [req.params.id],
        (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        }
    );
});

//delete a crop
router.post("/deleteCrops/:id", async (req, res) => {
    console.log(req.params.id);
    mysqlConnection.query(
        "DELETE FROM crop WHERE crop_id='"+req.params.id+"'",
        (err, rows, fields) => {
            if (!err) {
                res.send(true);
            } else {
                console.log(err);
            }
        }
    );
});

//inserting a crop
router.post("/crops", async (req, res) => {
    let data = {
        crop_id: req.body.cropId,
        crop_name: req.body.cropName,
        crop_image: req.body.cropImage,
        crop_description: req.body.cropDescription,
        scientific_name: req.body.scientificName,
        nutrition: req.body.nutrition,
        cultivated_area: req.body.cultivatedArea,
        temperature: req.body.temperature,
        duration: req.body.duration,
        cultivated_area_percentage: req.body.percentage,
        schedule: req.body.schedule,
    };
    mysqlConnection.query("INSERT INTO crop SET ?", data, (err, rows) => {
        if (!err) {
            res.send(true);
        } else {
            console.error(err);
            res.send(err);
        }
    });
});

//update crop details
router.put("/crops", async (req, res) => {
    mysqlConnection.query(
        "UPDATE crop SET crop_name= '"+req.body.cropName+
        "', crop_image='"+ req.body.cropImage+"', " +
        "crop_description='"+req.body.cropDescription+"'," +
        " scientific_name='"+req.body.scientificName+"'," +
        " nutrition='"+req.body.nutrition+"'," +
        " cultivated_area='"+req.body.cultivatedArea+"'," +
        " duration='"+req.body.duration+"', " +
        "temperature='"+req.body.temperature+"'," +
        " cultivated_area_percentage='"+req.body.percentage+"'," +
        " fertilizers='"+req.body.fertilizer+"'," +
        " schedule='"+req.body.schedule+"'" +
        " where crop_Id= '"+req.body.cropId+"'",
        (err, rows,results) => {
            if (!err) {
                console.log(req);
                res.send(true);
            } else {
                res.send(err);
            }
        }
    );
});

// get cultivated areas
router.get("/cultivatedarea", (req, res) => {
    mysqlConnection.query(
        "SELECT DISTINCT plant_name,SUM(cultivated_area) AS cultivatedArea FROM cultivated_area  GROUP BY plant_name",
        (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        }
    );
});

// get cultivated areas
router.get("/cultivatedarea/:plantname", (req, res) => {
    mysqlConnection.query(
        "SELECT plant_name, SUM(cultivated_area) AS cultivatedArea FROM cultivated_area where plant_name = ?",
        [req.params.plantname],
        (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        }
    );
});

// get cultivated areas each farmer
router.get("/cultivated/:id", (req, res) => {
    mysqlConnection.query(
        "SELECT plant_name, SUM(cultivated_area) AS cultivatedArea FROM cultivated_area where userId = ? GROUP BY plant_name",
        [req.params.id],
        (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        }
    );
});

module.exports = router;