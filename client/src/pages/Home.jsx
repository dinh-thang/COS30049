import React from "react";
import Image from "../assets/bitcoin.jpg"; //https://unsplash.com/photos/NHRM1u4GD_A
import Image2 from "../assets/ethereum.svg"; //unDraw.co
import Image3 from "../assets/bitcoin.svg"; //unDraw.co
import Hero from "../components/Hero";
import Uploader from "../components/Uploader"

const Home = () => {
  return (
    <>
      <div className="mt-16">
        <h1 className="text-center text-3xl font-extrabold sm:text-4xl lg:text-5xl mb-10">
          Welcome to Cyber Tech
        </h1>
        <div className="grid gap-4 mb-10 grid-cols-1 md:grid-cols-3">
          <img
            src={Image2}
            alt="Ethereum"
          />
          <div className="col-span-2">
            <h2 className="text-center text-2xl text-cyan-500 font-extrabold sm:text-3xl lg:text-4xl">
              Ethereum
            </h2>
            <p className="mt-3 text-center">
            Ethereum is a sophisticated and decentralized blockchain platform that goes beyond the capabilities of Bitcoin by allowing developers to build and deploy smart contracts and decentralized applications (DApps) on its network. Smart contracts are self-executing agreements with predefined rules, enabling automated and tamper-proof transactions without intermediaries. These contracts are powered by Ethereum's native cryptocurrency, Ether (ETH), which is used to pay for transaction fees and incentivize participants in the network. Ethereum's flexibility and programmability have spurred innovation in various sectors, including finance, gaming, supply chain management, and more, fostering a vibrant ecosystem of projects and tokens.
            </p>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <div className="col-span-2">
            <h2 className="text-center text-2xl text-cyan-500 font-extrabold sm:text-3xl lg:text-4xl">
              Bitcoin
            </h2>
            <p className="mt-3 text-center">
            Bitcoin is a decentralized digital currency that enables peer-to-peer transactions without the involvement of banks or central authorities. It operates on a technology called blockchain, a transparent and secure public ledger. Transactions are verified by a process called mining, where powerful computers solve complex mathematical problems. Bitcoin's limited supply and potential to reshape finance have led to its recognition both as a digital alternative to traditional money and as a speculative investment.
            </p>
          </div>
          <div>
            <img
              src={Image3}
              className="h-full w-full"
              alt="Bitcoin"
            />
          </div>
        </div>
      </div>
      <Hero image={Image} heading="Smart Contract" button="Try now" />
      <Uploader />
    </>
  );
};

export default Home;
