import React, { useState, useContext, createRef, useEffect } from 'react';
import { Menu, Label, Image, Button, Sticky, Dropdown } from 'semantic-ui-react'
import { Web3Context } from '../App.js';
import AppContent from './AppContent.js';
import ThemeContext, { themes } from './Theme.js'

export const SelectedContentContext = React.createContext();

function AppLayout() {
  // theme
  // const themeContext  = useContext(ThemeContext);
  // const [theme, setTheme] = useState(themeContext);

  // const toggleTheme = useCallback(() => {
  //   theme === themes.light ? setTheme(themes.dark) : setTheme(themes.light);
  // }, [theme]);

  // selected Nav
  const [selectedNav, setSelectedNav] = useState(0);

  function changeSelectedNav(index) {
    setSelectedNav(index);
  }

  const contextRef = createRef()

  // web3
  const {accounts, metamaskButtonText, balance, setOpenConnectWallet}  = useContext(Web3Context);

  function truncate(str, maxDecimalDigits) {
    if (typeof str !== 'string') {
      str = String(str)
    }
    if (str.includes('.')) {
        const parts = str.split('.');
        return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
    }
    return str;
  }
  const size = useWindowSize();
  // Hook
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);
      
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
  }

  return (
    
    <>

        <div  className="main" ref={contextRef}>
        <Sticky context={contextRef}>
          {
          size.width > 800 ? 
          (
          <Menu pointing stackable>
            <Menu.Item
              name='Home'
              active={selectedNav === 0}
              onClick={() => changeSelectedNav(0)}
            />
            <Menu.Item
              name='Stats'
              active={selectedNav === 1}
              onClick={() => changeSelectedNav(1)}
            />
            <Menu.Item
              name='The Garden'
              active={selectedNav === 2}
              onClick={() => changeSelectedNav(2)}
            />
            <Menu.Item
              name='Fermentation'
              active={selectedNav === 3}
              onClick={() => changeSelectedNav(3)}
            />
            <Menu.Item
              name="Swap and Liquidity"
              active={selectedNav === 4}
              onClick={() => changeSelectedNav(4)}
            />
            <Menu.Item
              name='Audit'
              active={selectedNav === 5}
              onClick={() => changeSelectedNav(5)}
            />
            <Menu.Item
              name='About'
              active={selectedNav === 6}
              onClick={() => changeSelectedNav(6)}
            />
            <Menu.Menu position='right'>
              <Menu.Item>
                <Button  
                  as='div' 
                  labelPosition='right'
                  onClick={
                    () => {setOpenConnectWallet(true)} 
                  }
                  >
                  <Button color='violet'>
                    {metamaskButtonText !== 'Connected' ? 'Connect Wallet' : accounts[0]}
                  </Button>
                  <Label as='a' basic color='violet' pointing='left'>
                    <Image spaced size='mini' src={require('../assets/binance-logo.png')} />
                    {metamaskButtonText === 'Connect' ? null : truncate(balance, 8)}
                  </Label>
                </Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
           )
          : 
          (
            <Menu attached='top'>
            <Dropdown item icon='bars' simple>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeSelectedNav(0)}>Home</Dropdown.Item>
                <Dropdown.Item onClick={() => changeSelectedNav(1)}>Stats</Dropdown.Item>
                <Dropdown.Item onClick={() => changeSelectedNav(2)}>The Garden</Dropdown.Item>
                <Dropdown.Item onClick={() => changeSelectedNav(3)}>Fermentation</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => changeSelectedNav(4)}>Swap and Liquidity</Dropdown.Item>
                <Dropdown.Item onClick={() => changeSelectedNav(5)}>Audit</Dropdown.Item>
                <Dropdown.Item onClick={() => changeSelectedNav(6)}>About</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
      
            <Menu.Menu position='right'>
            <Menu.Item>
                <Button  
                  as='div' 
                  labelPosition='right'
                  onClick={
                    () => {setOpenConnectWallet(true)} 
                  }
                  >
                  <Button color='violet'>
                    {metamaskButtonText !== 'Connected' ? 'Connect Wallet' : accounts[0]}
                  </Button>
                  <Label as='a' basic color='violet' pointing='left'>
                    <Image spaced size='mini' src={require('../assets/binance-logo.png')} />
                    {metamaskButtonText === 'Connect' ? null : truncate(balance, 8)}
                  </Label>
                </Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          ) 
          }
        
          
        </Sticky>

        <SelectedContentContext.Provider value={
          {'selectedNav': selectedNav, 'changeSelectedNav':changeSelectedNav}
        } >
            <ThemeContext.Provider value={themes}>
                <AppContent />
            </ThemeContext.Provider>
        </SelectedContentContext.Provider>
        </div>
        <div  className="footer" >&copy; Copyright 2021 | All rights reserved | Wine Finance </div>
    </>
  );
}

export default AppLayout;