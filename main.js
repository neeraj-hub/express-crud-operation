const app=require('express');
const server=app();
const http=require('http');
const bodyParser=require('body-parser');
const fs=require('fs');
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


var array=[];
server.post('/student/add',(req,res)=>{
console.log(req.body);
//let firstName=req.body.first,college=req.body.college,location=req.body.location;
let student={
    first:req.body.first,
    college:req.body.college,
    location:req.body.location
};
array.push(student);
fs.appendFile('./write.json',JSON.stringify(student)+'\n', {
    encoding: "utf8",
    flag: "a",
    mode: 0o666
  },(err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
    }
}
    );
res.send(student);

res.end();
});

server.get('/student/getdetails',(req,res)=>{
    const store=fs.readFile('./write.json','utf-8',(err,data) => {
        if (err)
          console.log(err);
        else {
          console.log("File read successfully\n");
          console.log(data);
          res.send(data);
          res.end();
        }
    });
    
    
})
server.listen(5000,()=>console.log('listening'));