const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });


const app = express();

const corsOptions = {
    origin : '*',
  }

app.use(cors(corsOptions));
app.use(express.json())


app.use('/api/v1/otp',require('./routes/api/properties'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started at port ${PORT}`))