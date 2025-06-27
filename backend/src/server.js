const express = require("express");
const router = require("./routes/notesRoutes")
const {connectDB} = require("./configs/db.js")
const dotenv = require('dotenv');
const { rateLimiter } = require("./middleware/rateLimiter.js");

const cors = require('cors');

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();



// middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);


// app.use((req,res,next)=>{
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// })

app.use("/api/notes", router);

connectDB().then(()=>{
  
app.listen(PORT, ()=>{
  console.log("App listening on the PORT : 5001");
})

})