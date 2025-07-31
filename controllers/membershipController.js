const db = require('../db/queries');

const membershipForm = (req, res) => {
    res.render('membership');
}

const becomeMember = async(req, res) => {
    try {
        const { secret } = req.body;
        if (secret.toLowerCase() === 'class') {
            await db.updateMembership(currentUser);
        } else {
            res.redirect('/membership')
        }
    } catch (error) {
        console.log('Error becoming a member: ', error);
		res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    membershipForm,
    becomeMember
}