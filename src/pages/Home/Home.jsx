import React, { useContext, useState, useEffect } from 'react'
import "./Home.css"
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
import { FaCaretUp, FaSortDown } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import { Tooltip } from 'antd';

const Home = () => {

  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);


  return (
    <div className="home">
      <div className="hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency Marketplace.
          Sign up to explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            placeholder='Search crypto...'
            onChange={inputHandler}
            list='coinlist'
            value={input}
            required
          />
          <datalist id='coinlist'>
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>


          <button type='submit'>Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout table-header">
          <p>#</p>
          <p>Name</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H %</p>
          <p className="market-cap">Market Cap
            <Tooltip
              placement='bottom'
              color='#222531'
              title={
                <>
                  <div style={{marginBottom: "15px"}}>
                    The total market value of a cryptocurrency's
                    circulating supply. It is analogous to the free-float
                    capitalization in the stock market.
                  </div>
                  <div>
                    Market Cap = Current Price x Circulating Supply.
                  </div>
                </>
              }
            >
              <BsInfoCircleFill size={14} color='gray' />
            </Tooltip>
          </p>
        </div>
        {displayCoin.map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol.toUpperCase()}</p>
            </div>
            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
              {item.price_change_percentage_24h > 0 ? <FaCaretUp /> : <FaSortDown />}
              {item.price_change_percentage_24h.toFixed(2)} %
            </p>
            <p className="market-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
