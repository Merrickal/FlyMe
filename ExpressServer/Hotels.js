const mongoose = require("mongoose")

const HotelsSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        location: String,
        phoneNumber: String,
        site: String,
        contactEmail: String,
        reviews: String,

    },
    {
        collection: 'Hotels'
    }
)
mongoose.model('Hotels', HotelsSchema);