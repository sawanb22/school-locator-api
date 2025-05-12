const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use((req,res) =>{
    console.log(req.url);
})
//routes
const schoolRoutes = require('./routes/school');
app.get("/test",(req,res) =>{ res.json("OK")})
app.use('/', schoolRoutes);


const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});