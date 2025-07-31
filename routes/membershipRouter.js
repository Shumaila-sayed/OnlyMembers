const { Router } = require("express");
const membershipController = require("../controllers/membershipController");
const membershipRouter = Router();


membershipRouter.get('/', membershipController.membershipForm);
membershipRouter.post('/', membershipController.becomeMember);

module.exports = membershipRouter;