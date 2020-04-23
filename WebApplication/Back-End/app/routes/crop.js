const express = require('express');
const router = express();
const mysqlConnection = require("../connection");

//get all crop details
router.get("/crops", (req, res) => {
    mysqlConnection.query("SELECT * from crop", (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//get a selected crop details
router.get("/crops/:id", (req, res) => {
    mysqlConnection.query("SELECT * from crop WHERE crop_id=?", [req.params.id], 
    (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//delete a crop
router.delete("/crops", async (req, res) => {
    mysqlConnection.query("DELETE FROM crop WHERE crop_id=?", 
    [req.body.cropId], 
    (err, rows, fields) => {
        if(!err){
            res.send("Crop deleted successfully");
        }
        else{
            console.log(err);
        }
    })
});

//inserting a crop
// router.post("/crops", (req, res) => {
//     var crop_id = req.body.crop_id;
//     var crop_name = req.body.crop_name;
//     var crop_image = req.body.crop_image;
//     var crop_description = req.body.crop_description;

//     mysqlConnection.query('INSERT INTO crop VALUES("+crop_id+","+crop_name+","+crop_image+","+crop_description+")' , (err, result) => {
//         if(!err){
//             res.send({"Crop":"inserted successfully"});
//         }
//         else{
//             console.log(err);
//         }
//     });
// });

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
      cultivated_area_percentage: req.body.percentage
    };
    mysqlConnection.query("INSERT INTO crop SET ?", 
    data, 
    (err, rows) => {
      if (!err) {
        res.send(true);
      } else {
        console.error(err);
        res.send(err);
      }
    });
});

//update crop details
router.put("/crops/:id", async (req, res) => {
    let data = {
        crop_id: req.body.cropId,
        crop_name: req.body.cropName,
        crop_image: req.body.cropImage,
        crop_description: req.body.cropDescription,
        scientific_name: req.body.scientificName,
        nutrition: req.body.nutrition,
        cultivated_area: req.body.cultivatedArea,
        duration: req.body.duration,
        temperature: req.body.temperature,
        cultivated_area_percentage: req.body.percentage
    };
    mysqlConnection.query(
        "UPDATE crop SET crop_id?, crop_name= ?, crop_image=?, crop_description=?, scientific_name=?, nutrition=?, cultivated_area=?, duration=?, temperature=?, cultivated_area_percentage=? where crop_Id= ?",
        [data, req.params.id],
        (err, rows) => {
          if (!err) {
            res.send(true);
          } else {
            res.send(err);
          }
        }
    );
});
  

module.exports = router;
