const mongoose = require("mongoose");
const listingSchema1 = require("../Schema");
const Reviews = require("./reviews");

const listSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/b2/2e/64/atlantis-the-palm.jpg?w=1200&h=-1&s=1",
            set: (v) => v === "" 
                ? "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/b2/2e/64/atlantis-the-palm.jpg?w=1200&h=-1&s=1" 
                : v
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Reviews",
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
});

listSchema.post("findOneAndDelete",async(data)=>{
    if(data){
        await Reviews.deleteMany({_id:{$in: data.reviews}});
        console.log("Deleted");
    }
});

const Listing = mongoose.model("Listing", listSchema);

module.exports = Listing;
