const Users = require('../models/UserModel');

const authAdmin = async (req, res, next) => {
    try {
        // Find the user in the database by their ID, which is provided by the auth middleware
        const user = await Users.findOne({
            _id: req.user.id
        });

        // If the user's role is 0 (not an admin), deny access to the resource
        if (user.role === 0) {
            return res.status(400).json({ msg: "Admin resources denied" });
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Handle any errors that occur during the process
        return res.status(400).json({ msg: err.message });
    }
}

module.exports = authAdmin;
