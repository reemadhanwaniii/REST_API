const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const PORT = process.env.PORT

//mimic db using array
let blogsList = [];

app.get('/blogs',(req,res)=>{
    return res.status(200).json({
        data : blogsList,
        success : true
    });
});

app.post('/blogs',(req,res) => {
    //console.log(req.body);
   //console.log(req.query);
   blogsList.push({
    title : req.body.title,
    content: req.body.content,
    id : Math.floor(Math.random()*1000)
});
   return res.status(201).json({
      success: true
   });
});

app.get('/blogs/:id',(req,res)=>{
    //console.log(req.params);
    const result = blogsList.filter((blog) => blog.id == req.params.id);
    return res.status(200).json({
        data: result,
        success : true
    });
});

app.delete('/blogs/:id',(req,res)=>{
    for(let i=0;i<blogsList.length;i++){
        if(blogsList[i].id == req.params.id){
            blogsList.splice(i,1);
            break;
        }
    }
    return res.status(202).json({
        success : true
    });
})



app.listen(PORT,function () {
    console.log(`Server Started on PORT ${PORT}`);
});