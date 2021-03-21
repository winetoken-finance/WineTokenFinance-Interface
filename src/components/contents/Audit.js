import React, { useState } from 'react';
import { Grid, Accordion, Container } from 'semantic-ui-react';
import { Icon } from 'react-icons-kit';
import {u2755} from 'react-icons-kit/noto_emoji_regular/u2755' // info

export default function About() {

    // accordion
    const [accordionIndex, setAccordionIndex] = useState(0);

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
                         CGRAPE liquidity via CTREEs.
                        </Accordion.Title>
                        <Accordion.Content active={accordionIndex === 0}>
                        <Container textAlign='justified'>
                        <p>
                        When a tree is bought by a user/investor most of the fund will got to adding liquidity fot CGRAPE automatically, and then the user will get its CTREE, none of the developers or moderator of Wine Token Finance can remove this liquidty when ever they wish for the first 6 month. They are only allowed to remove up to 5% once (One time only) every 30 days counting from the first time they do so.
                        please check this portion of the code as a reference: <a target="_blank" rel="noopener noreferrer" href='https://github.com/winetoken-finance/WineContracts/blob/main/contracts/TreeToken.sol#L266'>click here</a>
                        </p>
                        <p>
                        If the moderator team decide to remove any percentage, any CGRAPE returned from the removal will be burned immediatly, and the corresponding BNB will be sent to the team, to be spend on the project, pumping or increasing liquidity for CWINE...etc
                        please check this portion of the code as a reference: <a target="_blank" rel="noopener noreferrer" href='https://github.com/winetoken-finance/WineContracts/blob/main/contracts/TreeToken.sol#L288'>click here</a>
                        </p>
                        </Container>
                        </Accordion.Content>

                        <Accordion.Title
                        active={accordionIndex === 1}
                        index={1}
                        onClick={() => {accordionIndex === 1 ? setAccordionIndex(-1) : setAccordionIndex(1)}}
                        >
                        <Icon icon={u2755} size={32}/>
                        Fermentation (Staking) Audit.
                        </Accordion.Title>
                        <Accordion.Content active={accordionIndex === 1}>
                        <Container textAlign='justified'>
                            <p>
                            When a user/investor stake/ferment CGRAPEs and/or add CWINE Pool Token as boosting fermentation, the smart contract of fermantation works on block bases as folllowing:
                            </p>
                            <p>
                            Reward = CGRAPE locked + CWINE Pool Token locked * (boostScaleFactor = 10) * number of block passed / CGRAPE supply                
                            </p>
                            <p>
                            So the more CGRAPE produced from trees the more dificlt it is to ferment CWINE.
                            Please refer to this portion of the code for verification: <a target="_blank" rel="noopener noreferrer" href='https://github.com/winetoken-finance/WineContracts/blob/main/contracts/Stake.sol#L100'>click here</a>
                            </p>
                        </Container>
                        </Accordion.Content>

                        {/* <Accordion.Title
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
                        </Accordion.Content> */}

                        
                        
                    </Accordion>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        
        </>
    );
}