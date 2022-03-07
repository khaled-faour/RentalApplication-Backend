const express = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();
const pool= require("../../configs/database");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

  

  exports.deleteFiles = async({files = [], path=''})=>{


    try{
        if(files.length > 0){
            files.forEach(file=>{
                fs.unlink(`${path}/${file.name}`, (err) => {
                    if (err) {
                      console.error(err)
                      return;
                    }
                  
                    //file removed
                })
            })
        }else{
            return false
        }

    } catch (e){
        console.log("An Error Occured: ", e);
        return res.status(500).send("Error: ", e);
    }finally{
        
    }
    
}

exports.upload = async (req, res )=>{
    const {path} = req.params;
    console.log({name: req.files.file.name,data: req.files.file.data})
    try {
        if (!req.files) {
            console.log("no files");
          res.send({
            status: false,
            message: "No file uploaded",
            payload: {},
          });
        } else {
          var dir = `./uploads/${path}`;
          if(!fs.existsSync(dir)){
            fs.mkdirSync(dir, {recursive: true})
          }
          const data = await pool.query(
            `INSERT INTO files (filename, filecontent) VALUES ($1, $2)`,
            [req.files.file.name, req.files.file.data], (err, result)=>{
                if(err) throw err
          });

          //Use the name of the input field (i.e. "file") to retrieve the uploaded file
          let file = req.files.file;
          
          //Use the mv() method to place the file in upload directory (i.e. "uploads")
          //send response
          res.send({
            status: true,
            message: "File was uploaded successfully",
            payload: {
              name: file.name,
              mimetype: file.mimetype,
              size: file.size,
              path: "./files/uploads/",
              url: "/api/files",
            },
          });
        }
      } catch (err) {
        res.status(500).send({
          status: false,
          message: "Unspected problem",
          payload: {},
        });
      }
    
}


exports.getFile = async(req, res)=>{

  const {id} = req.query;

  try {
      const data = await pool.query(
          `SELECT *
           FROM files WHERE id = ${id}`);

      const rows = data.rows;
      console.log(rows);

      fs.writeFile('./downloads/'+rows[0].filename, Buffer.from(rows[0].filecontent), 'binary',  (err)=> {
        if (err) {
            console.log("There was an error writing the image")
            console.log(err)
        }
        else {
            console.log("Written File :")
        }
      });
      
      

      if(rows.length === 0){
          res.json({
              message: 'no data'
          })
      }else{
        res.sendFile('./downloads/'+rows[0].filename);
        res.status(200).json(rows)
      }
      
      
  } catch (error) {
      console.log('Error:', error);
      res.status(500).json({
          error: "Database error occurred while fetching files!", //Database connection error
      });
  }
}