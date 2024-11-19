import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import User from '../models/User.js'

const router = express.Router();

// @route  POST api/auth/register
// Desc    Register User
// @access Public

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        //Check if User exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password,
        });

        //Now encrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //Return JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: { id: user.id, username: user.username, email: user.email },
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route       POST api/auth/login
// @desc        Authenticate User & get token
// @access      Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for user
        let user = await User.findOne({ email });
        console.log(user);
        

        if(!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        //Cross check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        //Return JWT
        const payload = {
            user: {
                id: user.id,
            },
        };
        console.log(`payload: ${payload.user.id}`);
        

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: { id: user.id, username: user.username, email: user.email },
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route       GET api/auth/user
// @desc        get user data
// @access      Private
router.get('/user', auth, async (req, res) => {
    try {
        const user = await user.findById(req.user.id).select('-password'); //Exculde password
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;