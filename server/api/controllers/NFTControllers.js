import NFT from '../modals/NFT.modal.js';
import User from '../modals/User.modal.js';
export const mintNFT = async (req, res) => {
    try{
        const {cid} = req.body;
        
        const nft = new NFT({
            userId: req.user.id,
            cid,
            transaction:true
        });
        await nft.save();
        res.status(201).json({message:"NFT Minted successfully"});
    }
    catch(error){
        console.error("Error minting NFT:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const getNFTs = async (req, res) => {
    try{
        const nfts = await NFT.find({userId:req.user.id});
        res.status(200).json(nfts);
    }
    catch(error){
        console.error("Error fetching NFTs:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const sellNFT = async (req, res) => {
    try{
        const {nftId,price} = req.body;
        const nft = await NFT.findById(nftId);
        if(!nft){
            return res.status(404).json({message:"NFT not found"});
        }
        if(nft.userId.toString() !== req.user.id){
            return res.status(403).json({message:"You are not authorized to sell this NFT"});
        }
        if(nft.sold){
            return res.status(403).json({message:"NFT already listed for sale"});
        }
        nft.price = price;
        nft.sold=true;
        await nft.save();
        res.status(200).json({message:"NFT listed for sale"});
    }
    catch(error){
        console.error("Error selling NFT:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const buyNFT = async (req, res) => {
    try{
        const {nftId} = req.body;
        const nft = await NFT.findById(nftId);
        if(!nft){
            return res.status(404).json({message:"NFT not found"});
        }
        if(nft.userId.toString() === req.user.id){
            return res.status(403).json({message:"You are not authorized to buy this NFT"});
        }
        const user = await User.findById(req.user.id);
        const seller = await User.findById(nft.userId);
        if(user.wallet<nft.price){
            return res.status(403).json({message:"Insufficient balance"});
        }
        user.wallet-=nft.price;
        seller.wallet+=nft.price;
        nft.sold=false;
        nft.userId = req.user.id;
        nft.transaction = true;
        await nft.save();
        await user.save();
        res.status(200).json({message:"NFT bought successfully"});
    }
    catch(error){
        console.error("Error buying NFT:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const getNFTstoBuy=async(req,res)=>{
    try{
        const nfts = await NFT.find({sold:true});
        return res.status(200).json(nfts);
    }
    catch(error){
        console.error("Error fetching NFTs to buy:",error);
        res.status(500).json({message:"Internal server error"});
    }   
}