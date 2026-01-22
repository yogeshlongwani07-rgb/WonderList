const mongoose = require("mongoose");
const demoData = require("./data");
const MONGO_URL = "mongodb://127.0.0.1:27017/wonderList";
const Listing = require("../models/listing");

main()
.then((res)=>{
  console.log("connected")
}).catch((err)=>{
  console.log(err)
});

async function main(){
  await mongoose.connect(MONGO_URL);
};

async function insert() {
    await Listing.deleteMany({});
    demoData.data = demoData.data.map((obj)=>({...obj, owner:"677ecf0aa02e06e4adc1899b"}));
    await Listing.insertMany(demoData.data);
};

insert();