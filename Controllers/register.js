
const handleRegister = (req, res, db, bcrypt) => {
	const { name, email, password } = req.body;
	if (!email || !name || !password
		// TODO - check for empty
		// check for min length
		// check for correct e-mail form with regex
		// check for password security - 8chars+, small letter + CAPITAL letter + Number
		// check for special characters
		// – and provide pop-ups of additional info on Front-End for this

		) {
		return res.status(400).json('incorrect form submission in register');
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.then(user => {
				res.json(user[0]);
			 })
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
    .catch(err => res.status(400).json('unable to register to db'));
    
}

module.exports = {
	handleRegister
};

