const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.json('this is working');
})

app.post('/signin', (req, res) => {
	res.json('signing in');
})

app.listen(3030, () => {
	console.log('app is running on port 3030');
})