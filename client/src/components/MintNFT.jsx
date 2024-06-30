import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/MintNFT.scss';
import Header from './Header';
const MintNFT = () => {
    const navigate = useNavigate();
    const genre = ["Comedy", "Horror", "Thriller", "Sci-Fi", "Documentary", "Biography", "History", "Drama", "Action", "Adventure", "Anime"];

    return (<>
        <Header />
        <div className="mintnft-container flex justify-around mt-20" style={{marginLeft:'400px'}}>
            <div className="section mr-20">
                <h1 className="max-w-4xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-2xl text-blue-500 dark:text-dark font-mono">
                    Do You Want Free NFTs?
                </h1>
                <p className="max-w-4xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-xl text-blue-500 dark:text-dark mt-1 font-mono">
                    Choose a Genre below & Watch any show you want and earn NFTs!
                </p>
            </div>
            <div className="genre-container flex flex-wrap gap-6">
                {genre.map((item, index) => (
                    <div
                        key={index}
                        className="genre-box flex items-center justify-center w-48 h-48 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 hover:from-blue-400 hover:to-purple-500 cursor-pointer shadow-md"
                        onClick={() => navigate(`/mintnft/${item.toLowerCase()}`)}
                    >
                        <h1 className="text-white text-lg font-bold">{item}</h1>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
};

export default MintNFT;
