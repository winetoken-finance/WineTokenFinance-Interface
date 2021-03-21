import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Grid } from 'semantic-ui-react'
import './App.css';
import MetaMaskOnboarding from '@metamask/onboarding';
import Web3 from "web3";
import AppLayout from './components/AppLayout.js';
import TreeTokenAbi from "./abis/TreeToken.json";
import grapeTokenAbi from "./abis/GrapeToken.json";
import stakeAbi from "./abis/Stake.json";
import wineTokenAbi from "./abis/WineToken.json";
import UniswapV2PairAbi from "./abis/IUniswapV2Pair.json";
import UniswapV2FactoryAbi from "./abis/IUniswapV2Factory.json";
import erc20Abi from "./abis/ERC20.json";
import { UNISWAP_FACTORY_ADDRESS, WBNB_ADDRESSES } from './constants';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

const CoinGecko = require('coingecko-api');

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

export const Web3Context = React.createContext();

function App() {
  const CoinGeckoClient = new CoinGecko();
  
  const [ethPrice, setEthPrice] = useState(undefined);
  useEffect(() => {
    const getEthPrice = async () => {
      try {
        let data = await CoinGeckoClient.coins.fetch('binancecoin', {});
        // console.log('getEthPrice data:', data);
        if (data.data) {
          const usdPriceObject = data.data.tickers.find(e => e.target === 'USDT');
          // console.log('getEthPrice', usdPriceObject)
          const usdPrice = usdPriceObject.last;
        // console.log('last eth price:', usdPrice);
          setEthPrice(usdPrice);
        }
      } catch (error) {
        console.log('getEthPrice', error)
      }
    }
    getEthPrice();
  }, [CoinGeckoClient]);

  const [WETH, setWETH] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [connectedWallet, setConnectedWallet] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [networkId, setNeworkId] = useState(undefined);
  const [balance, setBalance] = useState(0.0);
  const [metamaskButtonText, setMetamaskButtonText] = useState(ONBOARD_TEXT);
  useEffect( () => {
    console.log('metamaskButtonText', metamaskButtonText)
  }, [metamaskButtonText])
  const onboarding = useRef();
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  // useEffect(() => {
  //   function handleNewAccounts(newAccounts) {
  //     setAccounts(newAccounts);
  //   }
  //   if (MetaMaskOnboarding.isMetaMaskInstalled()) {
  //     const ethereum = window.ethereum;
  //     ethereum.autoRefreshOnNetworkChange = false;
  //     ethereum
  //       .request({ method: 'eth_requestAccounts' })
  //       .then(async (account) => {
  //         handleNewAccounts(account);
  //       });
  //     window.ethereum.on('accountsChanged', handleNewAccounts);
  //     return () => {
  //       window.ethereum.off('accountsChanged', handleNewAccounts);
  //     };
  //   }
  // }, []);

  const connectMetamaskWallet = () => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      const ethereum = window.ethereum;
      ethereum.autoRefreshOnNetworkChange = false;
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async (account) => {
          handleNewAccounts(account);
          setConnectedWallet('METAMASK');
        });
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.off('accountsChanged', handleNewAccounts);
      };
    }
  }

  const connectWalletConnectWallet = () => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    const _enable = async () => {
      try {
        console.log('try enable')
        // Create a connector
        const connector = new WalletConnect({
          rpc: {
            56: 'https://bsc-dataseed.binance.org',
            97: 'https://data-seed-prebsc-1-s1.binance.org:8545'
          },
          bridge: "https://bridge.walletconnect.org", // Required
          qrcodeModal: QRCodeModal,
        });

        // Check if connection is already established
        if (!connector.connected) {
          // create new session
          console.log('create session')
          connector.createSession();
        } else {
          console.log('already connected')
          connector.killSession();
        }

        // Subscribe to connection events
        connector.on("connect", (error, payload) => {
          if (error) {
            console.log(error);
            setMetamaskButtonText(CONNECT_TEXT);
          }

          // Get provided accounts and chainId
          const { accounts, chainId } = payload.params[0];
          console.log('payload', accounts, chainId)
          handleNewAccounts(accounts);
          setConnectedWallet('WALLETCONNECT');
          setNeworkId(chainId);
          setMetamaskButtonText(CONNECTED_TEXT);
        });

        connector.on("session_update", (error, payload) => {
          if (error) {
            console.log(error);
            setMetamaskButtonText(CONNECT_TEXT);
          }

          // Get updated accounts and chainId
          const { accounts, chainId } = payload.params[0];
          console.log('payload', accounts, chainId)
          handleNewAccounts(accounts);
          setConnectedWallet('WALLETCONNECT');
          setNeworkId(chainId);
          setMetamaskButtonText(CONNECTED_TEXT);
        });

        connector.on("disconnect", (error, payload) => {
          if (error) {
            console.log(error);
            setMetamaskButtonText(CONNECT_TEXT);
          }

          // Delete connector
        });
      } catch (error) {
        console.log('connectWalletConnectWallet', error)
        setMetamaskButtonText(CONNECT_TEXT);
      }
    }
    _enable();

  }

  

  useEffect(() => {
    const loadWeb3 = async () => {
      // console.log('window.ethereum', window.ethereum)
      const ethereum = window.ethereum;
      ethereum.autoRefreshOnNetworkChange = false;
      const web3 = new Web3(ethereum);
      // console.log('set web3', web3)
      setWeb3(web3);
      const networkId = await web3.eth.net.getId();
      // console.log('set networkId', networkId)
      setNeworkId(networkId);
      const balance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether');
      // console.log('set balance', balance)
      setBalance(balance);
    }
    if (connectedWallet === 'METAMASK') {
      if (MetaMaskOnboarding.isMetaMaskInstalled() && accounts.length > 0) {
        setMetamaskButtonText(CONNECTED_TEXT);
        loadWeb3();
        onboarding.current.stopOnboarding();
      } else {
        setMetamaskButtonText(CONNECT_TEXT);
      }
    } else if (connectedWallet === 'WALLETCONNECT') {
      console.log('it is wallet connect')
      if (networkId === 56) {
        // mainnet 
        const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
        setWeb3(web3);
      } else {
        // testnet
        const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
        setWeb3(web3);
      }
    }
  }, [accounts, connectedWallet, networkId]);

  const getBalance = async () => {
    let balance =
    accounts && accounts.length > 0 ? web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether') : '0.0';
    console.log('getBalance called')
    setBalance(balance);
  }

  useEffect(() => {
    if (typeof web3 !== 'undefined') {
      const _getBalance = async () => {
        let balance =
        accounts && accounts.length > 0 ? web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether') : '0.0';
        setBalance(balance);
      }
      _getBalance();
    }
    
  }, [accounts, networkId, web3]);

  useEffect(() => {
    if (typeof web3 !== 'undefined' && typeof networkId !== 'undefined') {
      const _getWETH = async () => {
        if (networkId === 97 ) {
          setWETH(WBNB_ADDRESSES[97])
        } else {
          setWETH(WBNB_ADDRESSES[56])
        } 
      }
      _getWETH();
    }
    
  }, [networkId, web3]);

  // tree
  const [treeInstance, setTreeInstance] = useState();
  useEffect(() => {
    if (typeof web3 !== 'undefined'&& typeof web3.eth !== 'undefined' && typeof networkId !== 'undefined') {
      try {
          const treeInstance = new web3.eth.Contract(TreeTokenAbi.abi, TreeTokenAbi.networks[networkId].address);
          // console.log(treeInstance)
          setTreeInstance(treeInstance);
      } catch (error) {
         // console.log(error);
      }
    }
  },[web3, networkId]);

  
  const [treeBalance, setTreeBalance] = useState(0);
  const [treeTotalSupply, setTreeTotalSupply] = useState(0);
  const [treeBoostAddress, setTreeBootAddress] = useState('0x0000000000000000000000000000000000000000');
  
  useEffect(() => {
    const loadTreeBalance = async () => {
      if (typeof treeInstance !== 'undefined') {
        try {
          let _treeBalance = await treeInstance.methods.balanceOf(accounts[0]).call({from: accounts[0]});
          let treeTotalSupply = await treeInstance.methods.totalSupply().call({from: accounts[0]});
          let treeBoostAddressRes = await treeInstance.methods.boostAddress().call({from: accounts[0]});
          if (_treeBalance) {
            setTreeBalance(_treeBalance);
          }
          if (treeTotalSupply) {
            setTreeTotalSupply(treeTotalSupply);
          }
          if (treeBoostAddressRes) {
            setTreeBootAddress(treeBoostAddressRes);
          }
        } catch (error) {
         // console.log('tree balance error:',error)
        }
      }
    }
    loadTreeBalance()
  },[treeInstance, balance, accounts]);

  // boost
  const [treeBoostInstance, setTreeBoostInstance] = useState(undefined);  
  useEffect(() => {
    if (
          typeof web3 !== 'undefined' && 
          typeof web3.eth !== 'undefined' && 
          typeof networkId !== 'undefined' && 
          treeBoostAddress !== '0x0000000000000000000000000000000000000000' && 
          typeof treeBoostAddress !== 'undefined'
        ) {
      try {
          const treeBoostInstanceRes = new web3.eth.Contract(erc20Abi.abi, treeBoostAddress);
          // console.log(grapePoolInstance)
          setTreeBoostInstance(treeBoostInstanceRes);
      } catch (error) {
         // console.log(error);
      }
    }
  },[web3, networkId, treeBoostAddress]);

  const [treeBoostName, setTreeBoostName] = useState(undefined);
  const [treeBoostSymbol, setTreeBoostSymbol] = useState(undefined);
  const [treeBoostBalance, setTreeBosstBalance] = useState(undefined);
  useEffect( () => {
    const loadBoostInfo = async () => {
      if (typeof treeBoostInstance !== 'undefined' && typeof accounts !== 'undefined') {
        const boostName = await treeBoostInstance.methods.name().call({from: accounts[0]});
        const boostSymbol = await treeBoostInstance.methods.symbol().call({from: accounts[0]})
        const boostBalance = await treeBoostInstance.methods.balanceOf(accounts[0]).call({from: accounts[0]})
        if (boostName) {
          setTreeBoostName(boostName);
        }
        if (boostSymbol) {
          setTreeBoostSymbol(boostSymbol);
        }
        if (boostBalance) {
          setTreeBosstBalance(boostBalance);
        }
      }
    }
    loadBoostInfo();
  }, [treeBoostInstance, accounts]);

  const [totalTreesBurned, setTotalTreesBurned] = useState(0);
  
  useEffect(() => {
    const loadTotalTreeBurned = async () => {
      if (typeof treeInstance !== 'undefined' && typeof web3 !== 'undefined') {
        try {
          const contractDeployedTxHash = TreeTokenAbi.networks[networkId]["transactionHash"];
          const contractTx = await web3.eth.getTransaction(contractDeployedTxHash);
         // console.log('totalTreesBurnedRes deploy block', contractTx.blockNumber);
          let totalTreesBurnedRes = await treeInstance.getPastEvents('TreeBurned', {fromBlock: contractTx.blockNumber});
        //  console.log('totalTreesBurnedRes', totalTreesBurnedRes)
          if (totalTreesBurnedRes) {
            setTotalTreesBurned(totalTreesBurnedRes);
          }
        } catch (error) {
         console.log('totalTreesBurned error:',error)
        }
      }
    }
    loadTotalTreeBurned()
  },[treeInstance, balance, web3, networkId]);

  // get tree Price
  const [treePrice, setTreePrice] = useState('0');
  useEffect(() => {
      const getTreePrice = async () => {
          if (typeof treeInstance !== 'undefined') {
              try {
                  const treePrice = await treeInstance.methods.treePrice().call({from: accounts[0]});
                  console.log('treePrice', treePrice)
                  setTreePrice(treePrice);
              } catch (error) {
                  console.log(error);
              }
          }
      }
      getTreePrice();
  },[treeInstance, accounts]);

  // grape
  const [grapeInstance, setGrapeInstance] = useState();
  
  useEffect(() => {
    if (typeof web3 !== 'undefined' && typeof web3.eth !== 'undefined' && typeof networkId !== 'undefined') {
      try {
          const grapeInstance = new web3.eth.Contract(grapeTokenAbi.abi, grapeTokenAbi.networks[networkId].address);
          setGrapeInstance(grapeInstance);
      } catch (error) {
         // console.log(error);
      }
    }
  },[web3, networkId]);

  const [grapeBalance, setGrapeBalance] = useState(0);
  const [grapeTotalSupply, setGrapeTotalSupply] = useState(0);
  
  useEffect(() => {
    const loadGrapeBalance = async () => {
      if (typeof grapeInstance !== 'undefined') {
        try {
          let _grapeBalance = await grapeInstance.methods.balanceOf(accounts[0]).call({from: accounts[0]});
          let grapeTotalSupply = await grapeInstance.methods.totalSupply().call({from: accounts[0]});
          if (_grapeBalance) {
            setGrapeBalance(_grapeBalance);
          }
          if (grapeTotalSupply) {
            setGrapeTotalSupply(grapeTotalSupply);
          }
        } catch (error) {
         // console.log('grape balance error:',error)
        }
      }
    }
    loadGrapeBalance()
  },[grapeInstance, balance, accounts]);

  // console.log('grape instance', grapeInstance)
  // console.log('grape balance', grapeBalance)

  // wine
  const [wineInstance, setWineInstance] = useState();
  
  useEffect(() => {
    if (typeof web3 !== 'undefined' && typeof web3.eth !== 'undefined' && typeof networkId !== 'undefined') {
      try {
          const wineInstance = new web3.eth.Contract(wineTokenAbi.abi, wineTokenAbi.networks[networkId].address);
          setWineInstance(wineInstance);
      } catch (error) {
         // console.log(error);
      }
    }
  },[web3, networkId]);

  const [wineBalance, setWineBalance] = useState(0);
  const [wineTotalSupply, setWineTotalSupply] = useState(0);
  
  useEffect(() => {
    const loadWineBalance = async () => {
      if (typeof wineInstance !== 'undefined') {
        try {
          let _wineBalance = await wineInstance.methods.balanceOf(accounts[0]).call({from: accounts[0]});
          let wineTotalSupply = await wineInstance.methods.totalSupply().call({from: accounts[0]});
          if (_wineBalance) {
            setWineBalance(_wineBalance);
          }
          if (wineTotalSupply) {
            setWineTotalSupply(wineTotalSupply);
          }
        } catch (error) {
         // console.log('wine balance error:',error)
        }
      }
    }
    loadWineBalance()
  },[wineInstance, balance, accounts]);

  // simple staker
  const [stakeInstance, setStakeInstance] = useState();
  
  useEffect(() => {
    if (typeof web3 !== 'undefined' && typeof web3.eth !== 'undefined' && typeof networkId !== 'undefined') {
      try {
          const stakeInstance = new web3.eth.Contract(stakeAbi.abi, stakeAbi.networks[networkId].address);
          setStakeInstance(stakeInstance);
      } catch (error) {
         // console.log('stakeInstance:', error);
      }
    }
  },[web3, networkId]);

  const [stakedTracker, setStakedTracker] = useState(
    {
      'lastBlockChecked': '0',
      'rewards': '0',
      'tokenStaked': '0',
      'boostTokenStaked': '0'
    }
  );
  useEffect(() => {
    const _loadStakeTracker = async () => {
      if (typeof stakeInstance !== 'undefined') {
        try {
          let stakedTracker = await stakeInstance.methods.stakedBalances(accounts[0]).call({from: accounts[0]});
          // console.log('stakedTracker', stakedTracker);
          if (stakedTracker) {
            setStakedTracker({
              'lastBlockChecked': stakedTracker[0],
              'rewards': stakedTracker[1],
              'tokenStaked': stakedTracker[2],
              'boostTokenStaked': stakedTracker[3]
            });
          }
        } catch (error) {
         // console.log('stakedTracker error:',error)
        }
      }
    }
    _loadStakeTracker()
  },[stakeInstance, balance, accounts]);

  const loadStakeTracker = async () => {
    if (typeof stakeInstance !== 'undefined') {
      try {
        let stakedTracker = await stakeInstance.methods.stakedBalances(accounts[0]).call({from: accounts[0]});
        // console.log('stakedTracker', stakedTracker);
        if (stakedTracker) {
          setStakedTracker({
            'lastBlockChecked': stakedTracker[0],
            'rewards': stakedTracker[1],
            'tokenStaked': stakedTracker[2],
            'boostTokenStaked': stakedTracker[3]
          });
        }
      } catch (error) {
       // console.log('stakedTracker error:',error)
      }
    }
  }

  const [totalGrapePoolTokenStaked, setTotalGrapePoolTokenStaked] = useState('0');
  const [totalWinePoolTokenStaked, setTotalWinePoolTokenStaked] = useState('0');
  useEffect(() => {
    const loadStakedStatus = async () => {
      if (typeof stakeInstance !== 'undefined' && typeof accounts !== 'undefined') {
        try {
          let _totalGrapePoolTokenStaked = await stakeInstance.methods.totalTokenStaked().call({from: accounts[0]});
          let _totalWinePoolTokenStaked = await stakeInstance.methods.totalBoostTokenStaked().call({from: accounts[0]});
          // console.log('totalGrapePoolTokenStaked', totalGrapePoolTokenStaked);
          if (_totalGrapePoolTokenStaked) {
            setTotalGrapePoolTokenStaked(_totalGrapePoolTokenStaked);
          }
          if (_totalWinePoolTokenStaked) {
            setTotalWinePoolTokenStaked(_totalWinePoolTokenStaked);
          }
        } catch (error) {
         // console.log('error:',error)
        }
      }
    }
    loadStakedStatus()
  },[stakeInstance, balance, accounts]);

  // pooltoken grape
  const [grapePoolInstance, setGrapePoolInstance] = useState();
  useEffect(() => {
    const _load = async () => {
      if (typeof web3 !== 'undefined' && 
        typeof web3.eth !== 'undefined' && 
        typeof networkId !== 'undefined' && 
        typeof WETH !== 'undefined' && 
        typeof grapeInstance !== 'undefined') {
        try {
          console.log('uniswap factory address: ', UNISWAP_FACTORY_ADDRESS[networkId], 'networkId', networkId)
            const uniswapFactoryInstance = new web3.eth.Contract(UniswapV2FactoryAbi.abi, UNISWAP_FACTORY_ADDRESS[networkId]);
            const grapePairAddress = await uniswapFactoryInstance.methods.getPair(grapeInstance.options.address, WETH).call();
            const grapePoolInstance = new web3.eth.Contract(UniswapV2PairAbi.abi, grapePairAddress);
            console.log('grape pool', grapePairAddress)
            setGrapePoolInstance(grapePoolInstance);
        } catch (error) {
           // console.log(error);
        }
      }
    }
    _load();
  },[web3, networkId, WETH, grapeInstance]);

  const [grapePrice, setGrapePrice] = useState(undefined);
  const [grapePoolTokenTotalValue, setGrapePoolTokenTotalValue] = useState(undefined);
  useEffect(() => {
    const getGrapePrice = async () => {
      if (typeof grapePoolInstance !== 'undefined' && typeof ethPrice !== 'undefined' && typeof grapeInstance !== 'undefined') {
        const reserves = await grapePoolInstance.methods.getReserves().call();
        const token0 = await grapePoolInstance.methods.token0().call()
       // console.log('grapePrice InEth reserves', reserves);
        const reserve0 = Web3.utils.fromWei(reserves[0] ,'ether');
        const reserve1 = Web3.utils.fromWei(reserves[1] ,'ether');
      //  console.log('grapePrice InEth reserves', reserve0, reserve1);
        const grapeFor1Eth = token0 === grapeInstance.options.address ? Number(reserve1) / Number(reserve0) : Number(reserve0) / Number(reserve1);
      //  console.log('grapePrice InEth', grapeFor1Eth); // 1 = x.xx amont of grape
        const grapePriceInUsd = Number(grapeFor1Eth) * Number(ethPrice);
      //  console.log('grapePrice InUsd', grapePriceInUsd);
        const reserv0Value = token0 === grapeInstance.options.address ? grapePriceInUsd * reserve0 : grapePriceInUsd * reserve1;
        const reserv1Value = token0 === grapeInstance.options.address ? ethPrice * reserve1 : ethPrice * reserve0;
        setGrapePrice(grapePriceInUsd);
        setGrapePoolTokenTotalValue(reserv0Value+reserv1Value);
      }
    }
    getGrapePrice();
  }, [grapePoolInstance, ethPrice, grapeInstance]);
  
  const [grapePoolBalance, setGrapePoolBalance] = useState(0);
  const [grapePoolTotalSupply, setGrapePoolTotalSupply] = useState(0);
  
  useEffect(() => {
    const loadGrapePoolBalance = async () => {
      if (typeof grapePoolInstance !== 'undefined') {
        try {
          let grapePoolBalance = await grapePoolInstance.methods.balanceOf(accounts[0]).call({from: accounts[0]});
          let grapePoolTotalSupply = await grapePoolInstance.methods.totalSupply().call({from: accounts[0]});
          if (grapePoolBalance) {
            setGrapePoolBalance(grapePoolBalance);
          }
          if (grapePoolTotalSupply) {
            setGrapePoolTotalSupply(grapePoolTotalSupply);
          }
        } catch (error) {
         // console.log('loadGrapePoolBalance error:',error)
        }
      }
    }
    loadGrapePoolBalance()
  },[grapePoolInstance, balance, accounts]);

  // pooltoken wine
  const [winePoolInstance, setWinePoolInstance] = useState();
  useEffect(() => {
    const _load = async () => {
      if (typeof web3 !== 'undefined' && 
      typeof web3.eth !== 'undefined' && 
      typeof networkId !== 'undefined' &&
      typeof WETH !== 'undefined' && 
      typeof wineInstance !== 'undefined') {
        try {
            const uniswapFactoryInstance = new web3.eth.Contract(UniswapV2FactoryAbi.abi, UNISWAP_FACTORY_ADDRESS[networkId]);
            const winePairAddress = await uniswapFactoryInstance.methods.getPair(wineInstance.options.address, WETH).call();
            const winePoolInstance = new web3.eth.Contract(UniswapV2PairAbi.abi, winePairAddress);
            // console.log(winePoolInstance)
            setWinePoolInstance(winePoolInstance);
        } catch (error) {
           // console.log(error);
        }
      }
    }
    _load();
  },[web3, networkId, wineInstance, WETH]);

  const [ winePrice, setWinePrice] = useState(undefined);
  const [winePoolTokenTotalValue, setWinePoolTokenTotalValue] = useState(undefined);
  useEffect(() => {
    const getGrapePrice = async () => {
      if (typeof  winePoolInstance !== 'undefined' && typeof ethPrice !== 'undefined' && typeof wineInstance !== 'undefined') {
        const reserves = await  winePoolInstance.methods.getReserves().call();
        const token0 = await winePoolInstance.methods.token0().call()
        
       // console.log(' winePrice InEth reserves', reserves);
        const reserve0 = Web3.utils.fromWei(reserves[0] ,'ether');
        const reserve1 = Web3.utils.fromWei(reserves[1] ,'ether');
       console.log(' winePrice InEth reserves', reserve0, reserve1, token0);
        const  winePriceInEth = token0 === wineInstance.options.address ? Number(reserve1) / Number(reserve0) : Number(reserve0) / Number(reserve1);
       console.log(' winePrice InEth',  winePriceInEth)
        const  winePriceInUsd = Number(winePriceInEth) * Number(ethPrice);
       console.log(' winePrice InUsd',  winePriceInUsd);
        const reserv0Value = token0 === wineInstance.options.address ?  winePriceInUsd * reserve0 : winePriceInUsd * reserve1;
        const reserv1Value = token0 === wineInstance.options.address ?  ethPrice * reserve1 : ethPrice * reserve0;
        setWinePrice(winePriceInUsd);
        setWinePoolTokenTotalValue(reserv0Value+reserv1Value);
      }
    }
    getGrapePrice();
  }, [winePoolInstance, ethPrice, wineInstance]);

  const [winePoolBalance, setWinePoolBalance] = useState(0);
  const [winePoolTotalSupply, setWinePoolTotalSupply] = useState(0);
  
  useEffect(() => {
    const loadWinePoolBalance = async () => {
      if (typeof winePoolInstance !== 'undefined') {
        try {
          let winePoolBalance = await winePoolInstance.methods.balanceOf(accounts[0]).call({from: accounts[0]});
          let winePoolTotalSupply = await winePoolInstance.methods.totalSupply().call({from: accounts[0]});
          if (winePoolBalance) {
            setWinePoolBalance(winePoolBalance);
          }
          if (winePoolTotalSupply) {
            setWinePoolTotalSupply(winePoolTotalSupply);
          }
        } catch (error) {
         // console.log('loadWinePoolBalance error:',error)
        }
      }
    }
    loadWinePoolBalance()
  },[winePoolInstance, balance, accounts]);

  // connect wallets modal
  const [openConnectWallet, setOpenConnectWallet] = useState(false)

  return (
    <>
      <Modal
        onClose={() => setOpenConnectWallet(false)}
        onOpen={() => setOpenConnectWallet(true)}
        open={openConnectWallet}
      >
        <Modal.Header>Connect A Wallet</Modal.Header>
        <Modal.Content>
          <Grid stackable centered columns={4}>
            {/* <Grid.Row centered columns={2}> */}
              <Grid.Column>
                <div class="ui segment">
                  <img alt={'metamask'} class="ui centered small image" src={require('./assets/metamask-fox.svg')} wrapped centered/>
                  <Button fluid color='violet' onClick={
                    () => {
                      connectMetamaskWallet();
                      setOpenConnectWallet(false);
                    }
                  }>Metamask</Button>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div class="ui segment">
                  <img alt={'wallet connect'} class="ui centered small image" src={require('./assets/walletconnect-circle-blue.svg')} wrapped centered/>
                  <Button fluid color='violet' onClick={
                    () => {
                      connectWalletConnectWallet();
                      setOpenConnectWallet(false);
                    }
                  } >WalletConnect</Button>
                </div>
              </Grid.Column>
            {/* </Grid.Row> */}
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button color='purple' onClick={() => setOpenConnectWallet(false)}>
            Nope
          </Button>
        </Modal.Actions>
      </Modal>
      <Web3Context.Provider value={
          {
            'web3':web3, 
            'accounts': accounts, 
            'networkId': networkId, 
            'balance': balance,
            'getBalance': getBalance,
            'treeInstance': treeInstance,
            'treeBalance': treeBalance,
            'grapeInstance': grapeInstance,
            'grapeBalance': grapeBalance,
            'stakeInstance': stakeInstance,
            'stakedTracker': stakedTracker,
            'wineInstance': wineInstance,
            'wineBalance': wineBalance,
            'totalGrapePoolTokenStaked': totalGrapePoolTokenStaked,
            'grapePoolInstance': grapePoolInstance,
            'winePoolInstance': winePoolInstance,
            'grapePoolBalance': grapePoolBalance,
            'winePoolBalance': winePoolBalance,
            'grapePoolTotalSupply': grapePoolTotalSupply,
            'winePoolTotalSupply': winePoolTotalSupply,
            'grapeTotalSupply':grapeTotalSupply,
            'wineTotalSupply':wineTotalSupply,
            'treeTotalSupply': treeTotalSupply,
            'totalTreesBurned': totalTreesBurned,
            'treeBoostAddress': treeBoostAddress,
            'treeBoostInstance': treeBoostInstance,
            'metamaskButtonText': metamaskButtonText,
            'totalWinePoolTokenStaked': totalWinePoolTokenStaked,
            'connectMetamaskWallet': connectMetamaskWallet,
            'connectWalletConnectWallet': connectWalletConnectWallet,
            'treeBoostName': treeBoostName,
            'treeBoostSymbol': treeBoostSymbol,
            'treeBoostBalance': treeBoostBalance,
            'winePrice': winePrice,
            'grapePrice': grapePrice,
            'ethPrice': ethPrice,
            'grapePoolTokenTotalValue': grapePoolTokenTotalValue,
            'winePoolTokenTotalValue': winePoolTokenTotalValue,
            'loadStakeTracker': loadStakeTracker,
            'setOpenConnectWallet': setOpenConnectWallet,
            'treePrice': treePrice
          }
        }>
        <AppLayout />
      </Web3Context.Provider>
    </>
  );
}

export default App;