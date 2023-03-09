import og from '../assets/og.jpg';
import of from '../assets/of.jpg';
import ro from '../assets/ro.jpg';
import dataOG from '../assets/data/og.json';
import dataOF from '../assets/data/of.json';
import dataRO from '../assets/data/ro.json';

export const config = {
  // server: import.meta.env.VITE_SERVER,
  // server: process.env.VITE_SERVER,
  server: 'http://localhost:5000',
  // server: "https://link-product-be.onrender.com",
  profilePic: {
    outfitgram: og,
    outfitfakboy: of,
    ruangoutfit: ro,
  },

  data: {
    outfitgram: dataOG,
    outfitfakboy: dataOF,
    ruangoutfit: dataRO,
  },
};
