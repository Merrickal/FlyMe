const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
app.use(express.json());
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const mongoUrl = "mongodb+srv://Merrickal:JesusTheChrist@cluster0.chx8xzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const JWT_SECRET = "431cabdc5ce4b64cca57ea5abe0af020182fd5282ec88f0e46e0d6c547c464c174421ef9687213063ceafeee763d39caa156905f414972226c4c10878fdb72aac99dc4a69fe8b8d1b8edd7c51658fc4941b3aaa38483eebd0f512bc5bc6e4ef1c1c4d2149b1c074ab5f96800c04143a16f8be77b2162d15ce8920b0fdc5bb5b491ebf06c31f039aa1ab91959414e537d00741266ecfc2af3b9c3065e714ef0e227356c1fea57d5b8217308a4c488a1a10453ebca3709de06581a7b0a788b01ab19f7c7ceb16529ec4e0f3f687cb9102039328f43241f7c4d0da3ebc3d7292f4ba9c2a3466f4a575f1b5e3eb134f3fa8624197ed9c685620c4b0c149feee38ac9"
mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log("Database Connected");
    }).catch((e) => {
        console.log(e);
    })

require("./UserDetails")
require("./Hotels")
require("./Image")
const User = mongoose.model("UserInfo")
const Hotel = mongoose.model("Hotels")
const Image = mongoose.model("Image")

app.get("/", (req, res) => {
    res.send({ status: "Started" })
})

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email: email })

    if (oldUser) {
        return res.send({ data: "Email Already Exists!" })
    }
    const encryptedPassword = await bcrypt.hash(password, 10)

    try {
        await User.create({
            name: name,
            email: email,
            password: encryptedPassword
        })
        const token = jwt.sign({ email: email }, JWT_SECRET);
        if (res.status(201)) {
            return res.send({ status: "ok", data: token })
        } else {
            return res.send({ error: "error" })
        }
    } catch (error) {
        res.send({ status: "error", data: error })
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email: email })
    if (!oldUser) {
        return res.send({ data: "User doesn't exist!" })
    }
    if (await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
        if (res.status(201)) {
            return res.send({ status: "ok", data: token })
        } else {
            return res.send({ error: "error" })
        }
    }
})

app.post("/editProfile", async (req, res) => {
    const { id, name, email, password } = req.body;

    const oldUser = await User.findOne({ _id: new ObjectId(id) })
    if (!oldUser) {
        return res.send({ status: "error", data: "User doesn't exist!" })
    }
    else if (await User.findOne({ email: email })) {
        return res.send({ status: "error", data: "Email Already exists!" })
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    try {

        const result = await User.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name,
                    email,
                    encryptedPassword,
                },
            }
        );
        const token = jwt.sign({ email: email }, JWT_SECRET);
        if (res.status(201)) {
            // res.send({ status: "ok", data: "Profile Updated" })
            return res.send({ status: "ok", data: token })
        } else {
            return res.send({ error: "error" })
        }
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message });
    }
})

app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET)
        const userEmail = user.email;

        User.findOne({ email: userEmail })
            .then((data) => {
                return res.send({ status: "ok", data: data })
            })
    } catch (error) {
        return res.send({ error: error })
    }
})

// app.post("/searchUser", async (req, res) => {
//     const search = db.collection('inventory').find({ status: 'D' });
// })

app.post("/addHotel", async (req, res) => {
    const { name, description, location, phoneNumber, site, contactEmail, reviews } = req.body;

    try {
        await Hotel.create({
            name: name,
            description: description,
            location: location,
            phoneNumber: phoneNumber,
            site: site,
            contactEmail: contactEmail,
            reviews: reviews,
        })
        res.send({ status: "ok", data: "Hotel Created" })
    } catch (error) {
        res.send({ status: "error", data: error })
    }
})
app.post("/editHotel", async (req, res) => {
    const { id, name, description, location, phoneNumber, site, contactEmail, reviews } = req.body;
    try {

        const result = await Hotel.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name,
                    description,
                    location,
                    phoneNumber,
                    site,
                    contactEmail,
                    reviews
                },
            }
        );
        res.send({ status: "ok", data: "Hotel Updated" })
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message });
    }
});
app.post("/deleteHotel", async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
        const result = await Hotel.deleteOne(
            { _id: new ObjectId(id) },
        );
        res.send({ status: "ok", data: "Hotel Deleted" })
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message }); // Send only error message
    }
});

app.post("/listAllHotels", async (req, res) => {
    try {
        Hotel.find()
            .then((data) => {
                return res.send({ status: "ok", data: data })
            })
    } catch (error) {
        return res.send({ error: error })
    }
})
app.post("/queryHotelsByName", async (req, res) => {
    const { query } = req.body;
    try {
        Hotel.find({ "name": { $regex: query, $options: 'i' } })
            .then((data) => {

                return res.send({ status: "ok", data: data })
            })
    } catch (error) {
        return res.send({ error: error })
    }
})

const upload = multer();

app.post('/images', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: "error", message: 'No file provided.' });
    }
    const image = new Image({
        name: `${uuidv4()}.${req.file.mimetype.split('/')[1]}`,
        data: req.file.buffer,
        contentType: req.file.mimetype,
    });

    try {
        await image.save();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: "error", message: error.message });
    }
    return res.status(201).json({
        success: true,
        message: 'Image created successfully.',
        imageName: image.name,
    });
},
);
app.get('/images/:name', async (req, res) => {
    const { imagename } = req.params['name'];
    const image = await Image.findOne({ imagename });
    if (!image) {
        return res.status(404).json({ status: "error", message: 'Image not found.' });
    }
    res.set('Content-Type', image.contentType);
    res.send(image.data);
});



app.listen(5001, () => {
    console.log("Node js server has started");
})