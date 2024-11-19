import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// @route       GET api/users/profile
// @desc        Get user profile
// @access      Private
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); //Exclude password
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       PUT api/user/profile
// @desc        Update user profile
// @access      Private
router.put('/profile', auth, async (req, res) => {
    const { username } = req.body;

    try {
        let user = await user.findById(req.user.id);

        if (username) user.username = username;

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;