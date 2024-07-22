require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const connectDb = require('./utils/db');
const authroute = require('./router/auth-router');
const contactroute = require('./router/contact-router');
const depsecroute = require('./router/depsec-router');
const empleavroute = require('./router/empleav-router');
const errorMiddleware = require('./middlewares/error-middleware');

//handling cors policy issue
const corsOptions = {
    origin:["http://localhost:3000","http://localhost:3001"],
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true
}

app.use(cors(corsOptions));

app.use(express.json())
app.get('/',(req,res)=>{

    res.status(200).send("Welcome to my website");
})

// app.get('/register',(req,res)=>{

//     res.status(200).send("Welcome to registration page");
// })

app.use("/api/auth",authroute);
app.use("/api/form",contactroute);
app.use("/api/depsec",depsecroute);
app.use("/api/empleav",empleavroute);

app.use(errorMiddleware);
const PORT = 5000
connectDb().then(() =>{
    app.listen(PORT,()=>{
        console.log(`server is running at port : ${PORT}`);
    });
})
