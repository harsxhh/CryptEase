import mongoose from 'mongoose';

const NFTSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cid:{
        type: String,
        required: true
    },
    transaction:{
        type: Boolean,
        default: false,
        required: true
    },
    price:{
        type: Number,
        default: 1,
    },
    sold:{
        type: Boolean,
        default: false
    }   
})
const NFT = mongoose.model('NFT', NFTSchema);
export default NFT;