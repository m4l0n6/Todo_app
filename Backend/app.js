const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./src/routes/todoRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(cors());    
app.use('/api', todoRoutes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
