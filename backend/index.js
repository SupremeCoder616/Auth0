require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const guard = require('express-jwt-permissions')();

const port = process.env.PORT || 8080;

const jwtCheck = auth({
    audience: 'https://www.challenges-api.com',
    issuerBaseURL: 'https://dev-41w5lygvk4uj4hzj.us.auth0.com/',
    tokenSigningAlg: 'RS256'
})

app.use(cors());
app.use(express.json());
app.use(jwtCheck);

app.get('/', (req, res) => {
    res.send("Hi")
})
app.get('/challenges', guard.check(['read:challenges']), (req, res) => {
    res.json({challenge1: "challenge1", challenge2: "challenge2"});
});

app.listen(port, () => console.log(`Server running at PORT: ${port}`));