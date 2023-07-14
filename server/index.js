const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./models/User');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { authorizeRole, signUser, signAdmin } = require('./middlewares/jwt');
require('dotenv').config();

cloudinary.config({
    cloud_name: 'duuuqezjw',
    api_key: '365434569457674',
    api_secret: 'k25KTElnH4WOJCHAJ3PdQi3fcJ8'
});

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 10 MB
});

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    signUser(result)
        .then((token) => {
            res.status(200).json({ result, token })
        })
        .catch((err) => {
            res.status(400).json({ error: 'Token generating failed' })
        })
})

/* app.post('/check', (req, res) => {
    let { username, password } = req.body;
    let user = db.USER.findOne({ username: username }).then((res) => {
        if (res) {
            console.log('userfound');
        }
    })
}) */

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ auth: false, error: 'User does not exist' });
        } else {
            const passwordCheck = user.password === password;
            if (!passwordCheck) {
                return res.status(400).json({ auth: false, error: 'Password incorrect' });
            } else {
                signUser(user)
                    .then((token) => {
                        const userSecure = {
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        }
                        res.status(200).json({ userSecure, auth: token })
                    })
                    .catch((err) => {
                        res.status(400).json({ error: 'token generation failed' })
                    })
            }
        }
    } catch (err) {
        console.log(err);
    }
})

app.post('/adminLogin', (req, res) => {
    const adminName = 'admin@gmail.com';
    const password = 'admin';
    if (req.body.adminName === adminName && password === req.body.password) {
        admin = req.body.adminName
        signAdmin(admin)
            .then((token) => {
                res.status(200).json({ adminName: 'admin', auth: token })
            })
            .catch((err) => {
                res.status(400).json({ msg: 'token generation failed' });
            })
    } else {
        res.status(400).json({ error: 'Admin credentials not match' });
    }

})

app.get('/getUsers', authorizeRole('admin'), async (req, res) => {
    const users = await User.find();
    if (users.length > 0) {
        res.send(users);
    } else {
        res.send({ msg: 'No users found' });
    }
})

app.delete('/deleteUser/:id', authorizeRole('admin'), async (req, res) => {
    let result = await User.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get('/getUserDetails/:id', authorizeRole('admin'), async (req, res) => {
    let result = await User.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ error: 'No record found' });
    }
})

app.get('/userDetails/:id', /* authorizeRole('user'), */ async (req, res) => {
    let result = await User.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ error: 'No record found' });
    }
})

app.put('/userUpdate/:id', authorizeRole('admin'), async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    res.send(result);
})

app.get('/search/:key', authorizeRole('admin'), async (req, res) => {
    try {
        let result = await User.find({
            "$or": [
                {
                    name: { $regex: req.params.key }
                },
                {
                    email: { $regex: req.params.key }
                }
            ]
        });
        res.send(result);
    } catch (error) {
        res.send({ err: error, msg: "Not found" })
    }


})

app.post('/upload', upload.single("Image")/* , authorizeRole('user') */, async (req, res) => {
    const userId = req.body.userId
    const name = req.file.originalname

    try {
        const base64String = req.file.buffer.toString("base64");

        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${base64String}`,
            {
                public_id: name,
                resource_type: "image",
                folder: "profileImages",
                tags: name,
            }
        );

        if (result) {
            await User.updateOne(
                { _id: userId },
                { $set: { image: result.secure_url } }
            ).then((response) => {
                res.json({ response });
            }).catch((err) => {
                res.json({ err });
            });
        }
    } catch (error) {
        res.status(400);
        throw new error("Uploding Failed! try Again");
    }
})

app.listen(5000, () => {
    console.log("Server running on port 5000");
});