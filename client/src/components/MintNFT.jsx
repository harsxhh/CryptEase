import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/MintNFT.scss'; 

const MintNFT = () => {
    const navigate = useNavigate();
    const genre = ["Comedy", "Horror", "Thriller", "Sci-Fi", "Documentary", "Biography", "History","Drama", "Action", "Adventure","Anime"];
    
    return (
        <div className="mintnft-container">
            <div className="section">
                <h1>Do You Want Free NFTs?</h1>
                <p>Watch any show you want and earn NFTs!</p>
            </div>
            <div className="section">
                <h1>What Genre Do You Want to Watch?</h1>
                <p>Choose a genre:</p>
            </div>
            <div className="genre-container">
                {genre.map((item, index) => (
                    <div key={index} className="genre-box" onClick={() => navigate(`/mintnft/${item}`)}>
                        <h1>{item}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MintNFT;
