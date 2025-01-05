require('dotenv').config();
console.log('API Key loaded:', process.env.OPENAI_API_KEY ? 'Yes' : 'No');

const express = require('express');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes');
const assistantRoutes = require('./routes/assistantRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('src/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Routes
app.use('/api/pets', authRoutes.authenticateToken, petRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api/auth', authRoutes.router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
