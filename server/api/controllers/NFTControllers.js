import NFT from '../modals/NFT.modal.js';

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