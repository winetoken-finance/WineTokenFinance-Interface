import React, { useContext } from 'react';
import { Carousel } from 'react-bootstrap';
import { SelectedContentContext } from './AppLayout.js';
import Home from './contents/Home.js'
import Stats from './contents/Stats.js';
import TheWild from './contents/TheWild.js';
import Staking from './contents/Staking.js';
import SwapAndLiquidity from './contents/SwapAndLiquidity.js'
import Audit from './contents/Audit.js'
import About from './contents/About.js'

export default function AppContent(props) {
    const {selectedNav} = useContext(SelectedContentContext);
    // const web3Context  = useContext(Web3Context);
    return(
        <>
            <Carousel activeIndex={selectedNav} controls={false} indicators={false}>
                <Carousel.Item>
                    <Home />
                </Carousel.Item>
                <Carousel.Item>
                    <Stats />
                </Carousel.Item>
                <Carousel.Item>
                    <TheWild />
                </Carousel.Item>
                <Carousel.Item>
                    <Staking />
                </Carousel.Item>
                <Carousel.Item>
                    <SwapAndLiquidity />
                </Carousel.Item>
                <Carousel.Item>
                    <Audit />
                </Carousel.Item>
                <Carousel.Item>
                    <About />
                </Carousel.Item>
            </Carousel>
        </>
    );
}