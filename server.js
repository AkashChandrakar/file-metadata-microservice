var express = require("express");
var multer = require("multer");
var app = express();
var maxSize=178257920;
var upload = multer({limits: { fileSize: maxSize }});

app.get('/',function(req,res){
  res.sendFile('client/index.html', {root: __dirname });
});

app.post('/',upload.single('avatar'), function (req, res){
    res.setHeader('Content-Type', 'application/json');
    //console.log(req);
    var file=req.file;
    if (file!=null){
      console.log('success');
    res.send({'file-size':file.size});
    }else{
      console.log('failure');
      res.send({'error':'Error uploading file'});
    }
    });
    
app.use(function(err, req, res, next) {
  console.error(err.stack);
  
  res.status(200).send({'error':'file-size limit '+maxSize+' exceeded'});
});

app.listen(process.env.PORT || 8080, function(){
  console.log("server listening at port 8080");
});
