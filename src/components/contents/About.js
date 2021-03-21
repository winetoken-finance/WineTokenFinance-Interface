import React, { useState } from 'react';
import { Grid, Accordion, Container } from 'semantic-ui-react';
import { Icon } from 'react-icons-kit';
import {u2755} from 'react-icons-kit/noto_emoji_regular/u2755' // info

export default function About() {

    // accordion
    const [accordionIndex, setAccordionIndex] = useState(-1);

    return(
        <>
        <Grid padded doubling stackable centered columns='equal'>

            <Grid.Row>
                <Grid.Column>
                    <Accordion styled fluid>
                        <Accordion.Title
                        active={accordionIndex === 0}
                        index={0}
                        onClick={() => {accordionIndex === 0 ? setAccordionIndex(-1) : setAccordionIndex(0)}}
                        >
                        <Icon icon={u2755} size={32}/>
                         What is Wine Token Finance?
                        </Accordion.Title>
                        <Accordion.Content active={accordionIndex === 0}>
                        <Container textAlign='justified'>
                        <p>
                        Wine Token Finance is a DeFi project running a decentralized game/app on the Binance Smart Chain.
                        And other chains will be added in the future.
                        </p>
                        <p>
                        DeFi stands for decentralized finance. DeFi is a cryptocurrency movement designed to offer traditional financial products and services without the “centralized” authority of a bank, government, or business. Decentralized finance uses smart contracts and blockchains to provide financial services previously only available from centralized regulated businesses.( https://www.withersworldwide.com/en-gb/insight/decentralized-finance-evolving-to-optimize-investment-and-maximize-returns)
                        </p>
                        <p>
                        DeFi is creating a blockchain environment like never before. New tokens are deployed everyday on the Ethereum, Binance Smart Chain and more, most of which aim for a quick flip or more with gimmicky concepts, get-rich-quick schemes and downright copy/pasting past successful ideas. With that being said, not all of these new tokens are a waste of time. Innovation always finds its way, this time in the form of Wine Token Finance.
                        </p>
                        </Container>
                        </Accordion.Content>

                        <Accordion.Title
                        active={accordionIndex === 1}
                        index={1}
                        onClick={() => {accordionIndex === 1 ? setAccordionIndex(-1) : setAccordionIndex(1)}}
                        >
                        <Icon icon={u2755} size={32}/>
                        How will stage one work? 
                        </Accordion.Title>
                        <Accordion.Content active={accordionIndex === 1}>
                        <Container textAlign='justified'>
                            <p>
                            Stage one will be a game of waiting. Trees need to grow for them to be able to produce the goods. The trees are made as an erc 721. People can only purchase one at a time to make room for as much as investors to join the game. Every tree can produce 100 grapes. A tree will need 3 days to fully mature.
                            </p>
                            <p>
                            There will always be an option where an investor can gather his grape before the 3 day period. But in doing so the tree will die and the supply will drop. The supply of grapes is controlled by the investors. 
                            </p>
                        </Container>
                        </Accordion.Content>

                        <Accordion.Title
                        active={accordionIndex === 2}
                        index={1}
                        onClick={() => {accordionIndex === 2 ? setAccordionIndex(-1) : setAccordionIndex(2)}}
                        >
                        <Icon icon={u2755} size={32}/>
                        What will happen when you buy a tree? 
                        </Accordion.Title>
                        <Accordion.Content active={accordionIndex === 2}>
                        <Container textAlign='justified'>
                            <p>
                            Two things will happen when you buy a tree.
                            </p>
                            <p>
                            1 - The smart contract will create/add liquidity for CGRAPE on Otherswap.com, and the tree will start producing grapes. 
                            </p>
                            <p>
                            2- The created tokens for liquidity will be locked in a smart contract. 
                            </p>
                        </Container>
                        </Accordion.Content>

                        <Accordion.Title
                        active={accordionIndex === 3}
                        index={1}
                        onClick={() => {accordionIndex === 3 ? setAccordionIndex(-1) : setAccordionIndex(3)}}
                        >
                        <Icon icon={u2755} size={32}/>
                        What will happen for the locked liquidity?
                        </Accordion.Title>
                        <Accordion.Content active={accordionIndex === 3}>
                        <Container textAlign='justified'>
                            <p>
                            Every month (30 Days) we (The Wine Token Finance Team) have the option to remove once up to 5 percent of the locked liquidity. After month 6 when the release of V2 is launched the liquidity can be transferred if needed. The grapes will be burned and the eth will be used to pay the devs and pump the price. 
                            </p>
                            <p>
                            Why are we might do this? If the team decided to remove any liquidity percentage within the allowed range by the smart contract, it will be for the purpose of developing version 2, pumping prices, and other expensies of the project.
                            </p>
                        </Container>
                        </Accordion.Content>

                        <Accordion.Title
                        active={accordionIndex === 4}
                        index={1}
                        onClick={() => {accordionIndex === 4 ? setAccordionIndex(-1) : setAccordionIndex(4)}}
                        >
                        <Icon icon={u2755} size={32}/>
                        What is stage two?
                        </Accordion.Title>
                        <Accordion.Content active={accordionIndex === 4}>
                        <Container textAlign='justified'>
                            <p>
                            Stage two is the use of grape. Stage two will be called fermenting (staking). There will be two ways of fermenting.
                            </p>
                            <p>
                            First way of fermenting is locking grape in a smart contract. You can withdraw your grape and claim your wine any time.
                            </p>
                            <p>
                            Second way is by providing liquidity to wine. When you provide liquidity and deposit your pool token to the smart contract you will earn 10x higher apy than the first way. On Top of that you can boost to earn even more wine.
                            </p>
                            <p>
                            Burn happens when CGRAPE is withdrawn from Fermenting contract certain percentage (%4-%5) will be burned according to CGRAPE price.
                            </p>
                        </Container>
                        </Accordion.Content>

                        <Accordion.Title
                        active={accordionIndex === 5}
                        index={1}
                        onClick={() => {accordionIndex === 5 ? setAccordionIndex(-1) : setAccordionIndex(5)}}
                        >
                        <Icon icon={u2755} size={32}/>
                        What is CWINE?
                        </Accordion.Title>
                        <Accordion.Content active={accordionIndex === 5}>
                        <Container textAlign='justified'>
                            <p>
                            CWINE is the super rare token that will be low supply. Wine will also be used in the V2 of the project where you will use wine to create nft or earn eth. Version 2 will be released in around one month to two month of launching the project. Why the wait we wanted the weak hands to exit and the investors to stay.
                            </p>
                            <p>
                            CWINE just like CGRAPE it burns on transfer if the reciever or the sender are not whitelisted. it has a burning rate of (%1-%2) depending to the price of CWINE on Otherswap.com.
                            </p>
                        </Container>
                        </Accordion.Content>

                        <Accordion.Title
                        active={accordionIndex === 6}
                        index={1}
                        onClick={() => {accordionIndex === 6 ? setAccordionIndex(-1) : setAccordionIndex(6)}}
                        >
                        <Icon icon={u2755} size={32}/>
                        What is version 2?
                        </Accordion.Title>
                        <Accordion.Content active={accordionIndex === 6}>
                        <Container textAlign='justified'>
                            <p>
                            Version two is a project that will be connected to version ones tokens to make the user earn nft and eth from the project. More details to come soon.
                            </p>
                        </Container>
                        </Accordion.Content>
                        
                    </Accordion>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        
        </>
    );
}