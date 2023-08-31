import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';

type CoinProps = {
  symbol: string;
  name: string;
  categories: string;
  description: { en: string };
  image: { small: string, large: string, thumb: string };
  genesis_date: string;
  market_cap_rank: number;
  current_price: number;
  market_data: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number; 
    price_change_24h: number;
    price_change_percentage_30d: number;
    price_change_percentage_7d: number;
    price_change_percentage_1y: number;
    price_change_percentage_14d: number;
  };
};

function Coins() {
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinProps | null>(null);
  const [loading, setLoading] = useState(false);

  const getCoin = async (coinId: any) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      setCoin(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getCoin(id);
  }, []);

  

  return (
    <div>
      {loading ? (
        <div>
          <h1 className="text-center animate-pulse">Loading</h1>
        </div>
      ) : (
        <div>
          {coin && (
            <div>
            <div className="flex flex-col md:flex-row md:justify-center md:gap-x-9">

              <div className="mx-6 md:mx-0"> 
              <div className="flex items-center gap-x-4">
                <h1 className="text-[blue]">Cryptocurrencies</h1>
                <span><AiOutlineArrowRight color="blue" size={20} /></span>
                <h1 className="text-slate-400 font-bold">{coin?.name} Price</h1>
              </div>

              <h1 className="my-2">Rank #{coin?.market_cap_rank}</h1>

              <div className="flex items-center gap-x-3">
                <img src={coin?.image.small} alt={coin?.name}/>
                <h1 className="text-xl font-bold">{coin?.name}</h1>
                <h1 className="text-lg text-slate-400 font-semibold">{coin?.symbol.toLocaleUpperCase()}</h1>
              </div>

              <div className="my-3 flex items-center gap-x-4">
                <h1 className="text-bold text-2xl">${coin?.market_data.current_price.usd}</h1>

                <h1 className={`${coin.market_data.price_change_percentage_24h < 0
                  ? 'text-[red] text-xl font-bold inline-flex items-center gap-x-1'
                  : 'text-[green] text-xl font-bold inline-flex items-center gap-x-1'}`}>

                  {coin?.market_data.price_change_percentage_24h < 0
                    ? <BiSolidDownArrow color="red" />
                    : <BiSolidUpArrow />}
                  {coin?.market_data.price_change_percentage_24h.toFixed(1)}%

                </h1>

              </div>
              </div> 

              <div className="flex flex-col divide-y border p-2 "> 
              <div className="grid grid-cols-2   gap-x-3 lg:gap-x-8 text-lg"> 
                <h1 className="text-slate-600">Price change 24h</h1> 
                <h1 className="font-bold">{coin?.market_data.price_change_percentage_24h.toFixed(1)}%</h1>
              </div>
              <div className="grid grid-cols-2  gap-x-3 lg:gap-x-8 text-lg"> 
                <h1 className="text-slate-600">Price change 7 days</h1> 
                <h1 className="font-bold">{coin?.market_data.price_change_percentage_7d.toFixed(1)}%</h1>
              </div> 
              <div className="grid grid-cols-2  gap-x-3 lg:gap-x-8 text-lg"> 
                <h1 className="text-slate-600">Price change 14 days</h1> 
                <h1 className="font-bold">{coin?.market_data.price_change_percentage_14d.toFixed(1)}%</h1>
              </div>
              <div className="grid grid-cols-2  gap-x-3 lg:gap-x-8 text-lg"> 
                <h1 className="text-slate-600">Price change 30 days</h1> 
                <h1 className="font-bold">{coin?.market_data.price_change_percentage_30d.toFixed(1)}%</h1>
              </div>
              <div className="grid grid-cols-2  gap-x-3 lg:gap-x-8 text-lg"> 
                <h1 className="text-slate-600">Price change 1 year</h1> 
                <h1 className="font-bold">{coin?.market_data.price_change_percentage_1y.toFixed(1)}%</h1>
              </div>
              </div>

            </div> 
            <div className="my-5 w-[90%] mx-auto"> 
              <h1 className="text-lg font-bold my-2">{coin?.genesis_date && 'created'} {coin?.genesis_date}</h1> 
              <h1 className="text-md text-slate-600"  dangerouslySetInnerHTML={{ __html: coin?.description.en }}></h1>
            </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Coins;
