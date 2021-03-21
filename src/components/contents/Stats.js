import React, { useContext } from 'react';
import { Grid, Segment, Card, Header, Image, Icon, Button } from 'semantic-ui-react'
import Web3Info from './homeComponents/Web3Info.js';
import { Web3Context } from '../../App';
// import { Icon } from 'react-icons-kit';
// import {u1F332} from 'react-icons-kit/noto_emoji_regular/u1F332' // tree
// import {u1F347} from 'react-icons-kit/noto_emoji_regular/u1F347' // CGRAPE
// import {u1F377} from 'react-icons-kit/noto_emoji_regular/u1F377' // CWINE
import Web3 from "web3";
import Shared from '../../classes/shared.js'
import tree from '../../assets/tree_256x.png' ;
import grape_token from '../../assets/grape_256x.png' ;
import grape_pool from '../../assets/grape_pool_256x.png' ;
import wine_token from '../../assets/wine_256x.png' ;
import wine_pool from '../../assets/wine_pool_256x.png' ;
import fermentation_image from '../../assets/ferment_02_256x.png' ;
import fermentation_image_boost from '../../assets/ferment_01_256x.png' ;

export default function Home(){
    const shared = new Shared();
    // const theme = useContext(ThemeContext);

    // const web3Context  = useContext(Web3Context);
    // web3
    const {stakeInstance, 
        grapeInstance, 
        treeInstance,
        totalGrapePoolTokenStaked,
        wineInstance, 
        grapePoolInstance,
        winePoolInstance,
        grapePoolTotalSupply,
        winePoolTotalSupply,
        grapeTotalSupply,
        wineTotalSupply,
        treeTotalSupply,
        totalTreesBurned,
        treeBoostAddress,
        totalWinePoolTokenStaked,
        treeBoostName,
        treeBoostSymbol,
        networkId,
        ethPrice,
        grapePrice,
        winePrice,
        grapePoolTokenTotalValue,
        winePoolTokenTotalValue,
        treePrice
    }  = useContext(Web3Context);

    const addWine = async () => {
        const ethereum = window.ethereum;
        const tokenAddress = wineInstance ? wineInstance.options.address : '';
        const tokenSymbol = 'CWINE';
        const tokenDecimals = 18;
        const tokenImage = 'https://firebasestorage.googleapis.com/v0/b/winetoken-d471f.appspot.com/o/wine_256x.png?alt=media&token=25810f0e-306c-4168-ab51-8a374c4b7e13';

        try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
                image: tokenImage, // A string url of the token logo
            },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
        } catch (error) {
        console.log(error);
        }
    }

    const addGrape = async () => {
        const ethereum = window.ethereum;
        const tokenAddress = grapeInstance ? grapeInstance.options.address : '';
        const tokenSymbol = 'CGRAPE';
        const tokenDecimals = 18;
        const tokenImage = 'https://firebasestorage.googleapis.com/v0/b/winetoken-d471f.appspot.com/o/grape_256x.png?alt=media&token=13d507af-8b28-43f3-bfee-f6e438570026';

        try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
                image: tokenImage, // A string url of the token logo
            },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
        } catch (error) {
        console.log(error);
        }
    }

    const addGrapePT = async () => {
        const ethereum = window.ethereum;
        const tokenAddress = grapePoolInstance ? grapePoolInstance.options.address : '';
        const tokenSymbol = 'GRAPPT';
        const tokenDecimals = 18;
        const tokenImage = 'https://firebasestorage.googleapis.com/v0/b/winetoken-d471f.appspot.com/o/grape_pool_256x.png?alt=media&token=26d8d602-2c4f-4a98-b6b3-2e19b80d2dd5';

        try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
                image: tokenImage, // A string url of the token logo
            },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
        } catch (error) {
        console.log(error);
        }
    }

    const addWinePT = async () => {
        const ethereum = window.ethereum;
        const tokenAddress = grapePoolInstance ? grapePoolInstance.options.address : '';
        const tokenSymbol = 'WINEPT';
        const tokenDecimals = 18;
        const tokenImage = 'https://firebasestorage.googleapis.com/v0/b/winetoken-d471f.appspot.com/o/wine_pool_256x.png?alt=media&token=f124b796-d37d-4057-a188-9496bd0ba7f0';

        try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
                image: tokenImage, // A string url of the token logo
            },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
        } catch (error) {
        console.log(error);
        }
    }

    return(
        <>
            <Grid padded doubling stackable centered columns='equal'>
                <Grid.Row stretched centered>
                    <Grid.Column centered>
                        <Segment textAlign='center'> <h3>Wine Token Finance Status</h3>

                            <Card.Group centered>
                                <Card raised >
                                    <Card.Content>
                                        <Image
                                            floated='left'
                                            size='tiny'
                                            src={tree}
                                            />
                                        <Card.Header>CTREE</Card.Header>
                                        <Card.Meta>Total Supply</Card.Meta>
                                        <Card.Description>
                                            <Grid columns={2}>
                                                <Grid.Row>
                                                <Grid.Column>
                                                    <h2>{treeTotalSupply ? treeTotalSupply: '0'}</h2> CTREEs
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <h2>{totalTreesBurned.length}</h2> CTREEs burned
                                                </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        value: {shared.truncate((treeTotalSupply ? treeTotalSupply: 0) * Web3.utils.fromWei(treePrice , 'ether') * ethPrice, 4)} $
                                    </Card.Content>
                                </Card>

                                <Card raised >
                                    <Card.Content>
                                        <Image
                                            floated='left'
                                            size='tiny'
                                            src={grape_token}
                                            />
                                        <Card.Header>CGRAPE</Card.Header>
                                        <Card.Meta>Total Supply</Card.Meta>
                                        <Card.Description>
                                            <Grid columns={1}>
                                                <Grid.Row>
                                                <Grid.Column>
                                                    <h2>{grapeTotalSupply ? shared.truncate(Web3.utils.fromWei(grapeTotalSupply.toString() , 'ether'), 4): '0.00'}</h2> CGRAPEs
                                                </Grid.Column>
                                                {/* <Grid.Column>
                                                    <h2>{totalTreesBurned.length}</h2> CTREEs burned
                                                </Grid.Column> */}
                                                </Grid.Row>
                                            </Grid>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        value: {shared.truncate(parseFloat(grapeTotalSupply ? Web3.utils.fromWei(grapeTotalSupply.toString() , 'ether'): 0) * grapePrice, 4)} $
                                    </Card.Content>
                                </Card>

                                <Card raised >
                                    <Card.Content>
                                        <Image
                                            floated='left'
                                            size='tiny'
                                            src={wine_token}
                                            />
                                        <Card.Header>CWINE</Card.Header>
                                        <Card.Meta>Total Supply</Card.Meta>
                                        <Card.Description>
                                            <Grid columns={1}>
                                                <Grid.Row>
                                                <Grid.Column>
                                                    <h2>{wineTotalSupply ? shared.truncate(Web3.utils.fromWei(wineTotalSupply.toString() , 'ether'), 4): '0.00'}</h2> CWINEs
                                                </Grid.Column>
                                                {/* <Grid.Column>
                                                    <h2>{totalTreesBurned.length}</h2> CTREEs burned
                                                </Grid.Column> */}
                                                </Grid.Row>
                                            </Grid>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        value: {shared.truncate(parseFloat(wineTotalSupply ? Web3.utils.fromWei(wineTotalSupply.toString() , 'ether'): 0) * winePrice, 4)} $
                                    </Card.Content>
                                </Card>

                                <Card raised >
                                    <Card.Content>
                                        <Image
                                            floated='left'
                                            size='tiny'
                                            src={fermentation_image}
                                            />
                                        <Card.Header>CGRAPE Token Fermenting</Card.Header>
                                        <Card.Meta>Total CGRAPE in Fermentation</Card.Meta>
                                        <Card.Description>
                                            <Grid columns={1}>
                                                <Grid.Row>
                                                <Grid.Column>
                                                    <h2>{totalGrapePoolTokenStaked ? shared.truncate(Web3.utils.fromWei(totalGrapePoolTokenStaked.toString() , 'ether'), 4): '0.00'}</h2> CGRAPEs
                                                </Grid.Column>
                                                {/* <Grid.Column>
                                                    <h2>{totalTreesBurned.length}</h2> CTREEs burned
                                                </Grid.Column> */}
                                                </Grid.Row>
                                            </Grid>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        value: {shared.truncate(parseFloat(totalGrapePoolTokenStaked ? Web3.utils.fromWei(totalGrapePoolTokenStaked.toString() , 'ether'): 0) * grapePrice, 4)} $
                                    </Card.Content>
                                </Card>

                                <Card raised >
                                    <Card.Content>
                                        <Image
                                            floated='left'
                                            size='tiny'
                                            src={fermentation_image_boost}
                                            />
                                        <Card.Header>Fermentation Boosting</Card.Header>
                                        <Card.Meta>Total CWINE Pool Token Boosting Fermentation</Card.Meta>
                                        <Card.Description>
                                            <Grid columns={1}>
                                                <Grid.Row>
                                                <Grid.Column>
                                                    <h2>{totalWinePoolTokenStaked ? shared.truncate(Web3.utils.fromWei(totalWinePoolTokenStaked.toString() , 'ether'), 4): '0.00'}</h2> CWINE Pool Tokens
                                                </Grid.Column>
                                                {/* <Grid.Column>
                                                    <h2>{totalTreesBurned.length}</h2> CTREEs burned
                                                </Grid.Column> */}
                                                </Grid.Row>
                                            </Grid>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        value: {shared.truncate(parseFloat(totalWinePoolTokenStaked ? Web3.utils.fromWei(totalWinePoolTokenStaked.toString() , 'ether'): 0) * (winePrice * 2), 4)} $
                                    </Card.Content>
                                </Card>

                                <Card raised >
                                    <Card.Content>
                                        <Image
                                            floated='left'
                                            size='tiny'
                                            src={grape_pool}
                                            />
                                        <Card.Header>CGRAPE Pool Token</Card.Header>
                                        <Card.Meta>Total CGRAPE Pool Token Supply</Card.Meta>
                                        <Card.Description>
                                            <Grid columns={1}>
                                                <Grid.Row>
                                                <Grid.Column>
                                                    <h2>{grapePoolTotalSupply ? shared.truncate(Web3.utils.fromWei(grapePoolTotalSupply.toString() , 'ether'), 4): '0.00'}</h2> CGRAPE Pool Tokens
                                                </Grid.Column>
                                                {/* <Grid.Column>
                                                    <h2>{totalTreesBurned.length}</h2> CTREEs burned
                                                </Grid.Column> */}
                                                </Grid.Row>
                                            </Grid>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        value: {grapePoolTokenTotalValue ? shared.truncate(parseFloat(grapePoolTokenTotalValue), 4) : '0.000'} $
                                    </Card.Content>
                                </Card>

                                <Card raised >
                                    <Card.Content>
                                        <Image
                                            floated='left'
                                            size='tiny'
                                            src={wine_pool}
                                            />
                                        <Card.Header>CWINE Pool Token</Card.Header>
                                        <Card.Meta>Total CWINE Pool Token Supply</Card.Meta>
                                        <Card.Description>
                                            <Grid columns={1}>
                                                <Grid.Row>
                                                <Grid.Column>
                                                    <h2>{winePoolTotalSupply ? shared.truncate(Web3.utils.fromWei(winePoolTotalSupply.toString() , 'ether'), 4): '0.00'}</h2> CWINE Pool Tokens
                                                </Grid.Column>
                                                {/* <Grid.Column>
                                                    <h2>{totalTreesBurned.length}</h2> CTREEs burned
                                                </Grid.Column> */}
                                                </Grid.Row>
                                            </Grid>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        value: {shared.truncate(parseFloat(winePoolTokenTotalValue ? winePoolTokenTotalValue : 0.000), 4)} $
                                    </Card.Content>
                                </Card>

                            </Card.Group>

                            {/* <Statistic.Group widths='three'>

                                <Statistic>
                                    <Statistic.Value>
                                        <Icon icon={u1F332} size={64}/>{treeTotalSupply ? treeTotalSupply: '0'}
                                    </Statistic.Value>
                                    <Statistic.Label>Total Tree Supply, Total Burned: {totalTreesBurned.length}</Statistic.Label>
                                </Statistic>
                                                                
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon icon={u1F347} size={64}/>{grapeTotalSupply ? shared.truncate(Web3.utils.fromWei(grapeTotalSupply.toString() , 'ether'), 4): '0.00'}
                                    </Statistic.Value>
                                    <Statistic.Label>Total CGRAPE Supply</Statistic.Label>
                                </Statistic>

                                <Statistic>
                                    <Statistic.Value>
                                        <Icon icon={u1F377} size={64}/>{wineTotalSupply ? shared.truncate(Web3.utils.fromWei(wineTotalSupply.toString() , 'ether'), 4): '0.00'}
                                    </Statistic.Value>
                                    <Statistic.Label>Total CWINE Supply</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            
                            <Divider/>

                            <Statistic.Group widths='two'>
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon icon={u1F347} size={64}/>{totalGrapePoolTokenStaked ? shared.truncate(Web3.utils.fromWei(totalGrapePoolTokenStaked.toString() , 'ether'), 4): '0.00'}
                                    </Statistic.Value>
                                    <Statistic.Label>Total CGRAPE Token Fermenting</Statistic.Label>
                                </Statistic>

                                <Statistic>
                                    <Statistic.Value>
                                        <Icon icon={u1F347} size={64}/>{totalWinePoolTokenStaked ? shared.truncate(Web3.utils.fromWei(totalWinePoolTokenStaked.toString() , 'ether'), 4): '0.00'}
                                    </Statistic.Value>
                                    <Statistic.Label>Total CWINE Pool Token Boosting</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>

                            <Divider/>

                            <Statistic.Group widths='two'>

                                <Statistic>
                                    <Statistic.Value>
                                        <Icon icon={u1F347} size={64}/>{grapePoolTotalSupply ? shared.truncate(Web3.utils.fromWei(grapePoolTotalSupply.toString() , 'ether'), 4): '0.00'}
                                    </Statistic.Value>
                                    <Statistic.Label>Total CGRAPE-Eth Pair Supply</Statistic.Label>
                                </Statistic>

                                <Statistic>
                                    <Statistic.Value>
                                        <Icon icon={u1F377} size={64}/>{winePoolTotalSupply ? shared.truncate(Web3.utils.fromWei(winePoolTotalSupply.toString() , 'ether'), 4): '0.00'}
                                    </Statistic.Value>
                                    <Statistic.Label>Total CWINE-Eth Pair Supply</Statistic.Label>
                                </Statistic>
                            </Statistic.Group> */}
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <Web3Info />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Segment.Group>
                            <Segment textAlign='center'>CTREE Contract: {treeInstance ? <Header size='small' as='a' color='purple' target="_blank" rel="noopener noreferrer" href={shared.getScanLink(treeInstance.options.address, networkId)}>{treeInstance.options.address}</Header> : 'Loading...'}</Segment>
                            <Segment textAlign='center'>CGRAPE Contract: {grapeInstance ? <Header size='small' as='a' color='purple' target="_blank" rel="noopener noreferrer" href={shared.getScanLink(grapeInstance.options.address, networkId)}>{grapeInstance.options.address + '   '}</Header> : 'Loading...'}
                            <Button 

                                size='mini' 
                                icon
                                onClick={addGrape}
                            >
                                <Icon name='add' />
                            </Button>
                            </Segment>
                            <Segment textAlign='center'>CWINE Contract: {wineInstance ? <Header size='small' as='a' color='purple' target="_blank" rel="noopener noreferrer" href={shared.getScanLink(wineInstance.options.address, networkId)}>{wineInstance.options.address + '   '}</Header> : 'Loading...'}
                            <Button 

                                size='mini' 
                                icon
                                onClick={addWine}
                            >
                                <Icon name='add' />
                            </Button>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment.Group>
                            <Segment textAlign='center'>CGRAPE-BNB Pair: {grapePoolInstance ? <Header size='small' as='a' color='purple' target="_blank" rel="noopener noreferrer" href={shared.getScanLink(grapePoolInstance.options.address, networkId)}>{grapePoolInstance.options.address + '   '}</Header> : 'Loading...'}
                            <Button 

                                size='mini' 
                                icon
                                onClick={addGrapePT}
                            >
                                <Icon name='add' />
                            </Button>
                            </Segment>
                            <Segment textAlign='center'>CWINE-BNB Pair: {winePoolInstance ? <Header size='small' as='a' color='purple' target="_blank" rel="noopener noreferrer" href={shared.getScanLink(winePoolInstance.options.address, networkId)}>{winePoolInstance.options.address + '   '}</Header> : 'Loading...'}
                            <Button 

                                size='mini' 
                                icon
                                onClick={addWinePT}
                            >
                                <Icon name='add' />
                            </Button>
                            </Segment>
                            <Segment textAlign='center'>Staking Contract: {stakeInstance ? <Header size='small' as='a' color='purple' target="_blank" rel="noopener noreferrer" href={shared.getScanLink(stakeInstance.options.address, networkId)}>{stakeInstance.options.address}</Header> : 'Loading...'}</Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>
                
                {treeBoostAddress !== '0x0000000000000000000000000000000000000000' ? 
                <Grid.Row>
                    <Grid.Column>
                        <Segment.Group>
                            <Segment textAlign='center'>CTREE Boost Token's Contract Address: {treeBoostAddress !== '0x0000000000000000000000000000000000000000' ? 
                            <div>
                                <Header size='small' as='a' color='purple' target="_blank" rel="noopener noreferrer" href={shared.getScanLink(treeBoostAddress, networkId)}>{treeBoostAddress}{'    '}</Header>
                                Name: <Header size='small' as='a' color='purple'>{treeBoostName}{'    '}</Header> 
                                Symbol: <Header size='small' as='a' color='purple'>{treeBoostSymbol}</Header>
                            </div>
                            : 
                            'No CTREE Boost Yet...'} 
                            
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>
                : <div></div>}

                {/* <Grid.Row>
                    <Grid.Column>
                        <Segment.Group>
                            <Segment textAlign='center'>
                                Links
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row> */}
            </Grid>
        </>
    );
}