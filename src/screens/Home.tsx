import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CoinProps {
  id: string;
  symbol: string;
  name: string;
  image: string;
  market_cap_rank: number;
  current_price: number;
  total_volume: number;
  market_cap: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

function Home() {
  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  const getCoins = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setCoins(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full overflow-x-auto">
        <div className="flex justify-center">
          <input
            className="bg-slate-100 border outline-none w-[70%] md:w-[50%] lg:w-[40%] p-1 rounded-md"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {loading ? (
          <div className="text-center py-4">
            <h1 className="animate-pulse">Loading...</h1>
          </div>
        ) : (
          <div className="shadow overflow-x-auto my-4 border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <caption className="caption-top">
                <h1 className="text-start mx-2 py-2 text-xl font-bold">
                  Cryptocurrency prices by market cap
                </h1>
              </caption>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    24h
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    24h Volume
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mkt cap
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {coins
                  .filter((coin) =>
                    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((coin) => (
                    <tr
                      key={coin.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/coin/${coin.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {coin.market_cap_rank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {coin.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={coin.image}
                          alt={`${coin.name} Logo`}
                          width={30}
                          height={30} 
                        />
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        ${coin.current_price.toFixed(2)}
                      </td>
                      <td
                        className={`px-6 py-4 text-right whitespace-nowrap ${
                          coin.price_change_percentage_24h < 0
                            ? 'text-red-600'
                            : 'text-green-600'
                        }`}
                      >
                        {coin?.price_change_percentage_24h.toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        ${coin.total_volume.toFixed()}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        ${coin.market_cap.toFixed()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;



