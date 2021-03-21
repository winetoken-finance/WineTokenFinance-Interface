import React, { useState, useEffect, useContext } from 'react';
import { Grid, List, Card, Image, Button, Header, Modal, Tab, Label, Input, Accordion, Dropdown } from 'semantic-ui-react';
import { Icon } from 'react-icons-kit';
import {u1F332} from 'react-icons-kit/noto_emoji_regular/u1F332' // tree
import {u2755} from 'react-icons-kit/noto_emoji_regular/u2755'  // info
import { Web3Context } from '../../App';
import Web3 from "web3";
import Web3Info from './homeComponents/Web3Info.js';
import Shared from '../../classes/shared.js'
import { NETWORK_COIN_SYMBOL } from '../../constants';

export default function TheWild() {
    const shared = new Shared();

    // modal
    const [open, setOpen] = React.useState(false);
    const [modalMessage, setModalMessage] = useState('0x0000');

    // const web3Context  = useContext(Web3Context);
    // web3
    const { networkId, accounts, treeInstance, treeBalance, getBalance, treeBoostAddress, treeBoostInstance, treeBoostSymbol, treePrice}  = useContext(Web3Context);

    const [buyTreeOptions, setBuyTreeOption] = useState([{ key: '1_buyTreeOption', text: 'Buy 1 Tree', value: 1}])
    useEffect(() => {
        const generateBuyTreeOptions = () => {
            let options = [];
            for (let i = 1; i <= 45; i++) {
                options.push({
                    key: i.toString() + '_buyTreeOption',
                    text: 'Buy ' + i.toString() + ' Trees',
                    value: i
                });
            }
            return options;
        }
        const nextOptions = generateBuyTreeOptions();
        setBuyTreeOption(nextOptions);
    }, []);

    const [selectedBuyOption, setSelectedBuyOption] = useState(0);
    const handleBuyTreeOptionChange = (e, { value }) => setSelectedBuyOption(value);
    

    // handle tree boost
    const [treeBoostAmount, setTreeBoostAmount] = useState('0');
    const handleTreeBoostAmountChange = ({ target }) => {
        let inputFeedValue = target.value;
        if (inputFeedValue === '') {
            inputFeedValue = '0';
        }
        let boostAmount = Web3.utils.toWei(inputFeedValue, 'ether');
        setTreeBoostAmount(boostAmount);
    };

    const [treeBoostEthAmount, setTreeBoostEthAmount] = useState('0');
    const handleTreeBoostEthAmountChange = ({ target }) => {
        let inputFeedValue = target.value;
        if (inputFeedValue === '') {
            inputFeedValue = '0';
        }
        let boostAmount = Web3.utils.toWei(inputFeedValue, 'ether');
        setTreeBoostEthAmount(boostAmount);
    };

    // boost approve
    const [treeBoostApproveLoading, setTreeBoostApproveLoading] = useState(false);
    const approveBoost = async () => {
        console.log('trying to approve grass');
        console.log('approve grass input:', treeBoostAmount);
        try {
            setTreeBoostApproveLoading(true);
            let approveRes = await treeBoostInstance.methods.approve(treeInstance.options.address, treeBoostAmount).send({ from: accounts[0]});
            console.log(approveRes);
            if (approveRes) {
                setTreeBoostApproveLoading(false);
                setModalMessage(approveRes.transactionHash);
                getBalance();
                setOpen(true);
            }
        } catch (error) {
            console.log(error);
            setModalMessage('Transaction Fail, perhaps you may try again later.\n', error);
            setOpen(true);
            setTreeBoostApproveLoading(false);
        }
    }

    // boost allowance
    const [boostAllowance, setBoostAllowance] = useState(0);
    useEffect(() => {
        const getBoostAllowance = async () => {
            if (typeof treeBoostInstance !== 'undefined' && typeof treeInstance !== 'undefined') {
                console.log('get boost allowance', treeBoostInstance, treeInstance)
                try {
                    const allowanceRes = await treeBoostInstance.methods.allowance(accounts[0], treeInstance.options.address).call({from: accounts[0]});
                    console.log('allowance:', allowanceRes)
                    setBoostAllowance(allowanceRes);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getBoostAllowance();
    },[treeBoostInstance, getBalance, accounts, treeInstance]);

    // boost tree
    const [treeBoostLoading, setTreeBoostLoading] = useState(false);
    const boostTree = async (treeId) => {
        console.log('trying to boostTree:', treeId);
        console.log('boostTree input:', treeBoostAmount);
        try {
            setTreeBoostLoading(true);
            let feedRes = await treeInstance.methods.boostTree(treeId, treeBoostAmount).send({ from: accounts[0]});
            console.log(feedRes);
            if (feedRes) {
                setTreeBoostLoading(false);
                setModalMessage(feedRes.transactionHash);
                getBalance();
                setOpen(true);
            }
        } catch (error) {
            console.log(error);
            setModalMessage('Transaction Fail, perhaps you may try again later.\n', error);
            setOpen(true);
            setTreeBoostLoading(false);
        }
    }

    const boostTreeWithEth = async (treeId) => {
        console.log('trying to boostTree:', treeId);
        console.log('boostTree input:', treeBoostEthAmount);
        try {
            setTreeBoostLoading(true);
            let feedRes = await treeInstance.methods.boostTreeWithEth(treeId).send({ from: accounts[0], value: treeBoostEthAmount});
            console.log(feedRes);
            if (feedRes) {
                setTreeBoostLoading(false);
                setModalMessage(feedRes.transactionHash);
                getBalance();
                setOpen(true);
            }
        } catch (error) {
            console.log(error);
            setModalMessage('Transaction Fail, perhaps you may try again later.\n', error);
            setOpen(true);
            setTreeBoostLoading(false);
        }
    }

    // buy tree
    const [treeBuyLoding, setTreeBuyLoading] = useState(false);
    const buyTrees = async () => {
        // console.log('trying to buy ' + selectedBuyOption + ' tree')
        try {
            setTreeBuyLoading(true);
            const valueToSend = Web3.utils.toBN(treePrice).mul(Web3.utils.toBN(selectedBuyOption));
            console.log('trying to buy ' + selectedBuyOption + ' tree', 'selectedBuyOption', selectedBuyOption, 'valueToSend', valueToSend.toString())
            let buyRes = await treeInstance.methods.buyTrees(selectedBuyOption).send({ from: accounts[0], value: valueToSend});
            console.log(buyRes);
            if (buyRes) {
                setTreeBuyLoading(false);
                setModalMessage(buyRes.transactionHash);
                getBalance();
                setOpen(true);
            }
        } catch (error) {
            console.log(error);
            setModalMessage('Transaction Fail, perhaps you may try again later.\n', error);
            setOpen(true);
            setTreeBuyLoading(false);
        }
        
    }

    // kill tree for grape
    const [treeKillLoding, setTreeKillLoading] = useState(false);
    const kill1Tree = async (treeId) => {
        console.log('trying to kill 1 tree, with Id:', treeId)
        try {
            setTreeKillLoading(true);
            let killRes = await treeInstance.methods.burnTreeForGrape(treeId).send({ from: accounts[0]});
            console.log('tree res:',killRes);
            if (killRes) {
                setTreeKillLoading(false);
                setModalMessage(killRes.transactionHash);
                getBalance()
                setOpen(true);
            }
        } catch (error) {
            console.log(error);
            setModalMessage('Transaction Fail, perhaps you may try again later.\n', error);
            setOpen(true);
            setTreeKillLoading(false);
        }
    }

    // tree info
    const [treeList, setTreeList] = useState([]);
   
    useEffect(() => {
        const getTreeList = async () => {
            if (typeof treeInstance !== 'undefined' && typeof treeBalance !== 'undefined' && typeof accounts !== 'undefined') {
                try {
                    let listOfTreeToken = [];
                    for (let index = 0; index < treeBalance; index++) {
                        const tokenId = await treeInstance.methods.tokenOfOwnerByIndex(accounts[0], index).call({from: accounts[0]});
                        const response = await treeInstance.methods.getTreePotencial(tokenId).call({ from: accounts[0]});
                        // console.log('tree res:', response);
                        listOfTreeToken.push({
                            'treeId': tokenId,
                            'isAlive': response[0],
                            'potencialGrape': response[1],
                            'age': response[2],
                        });
                    }
                    setTreeList(listOfTreeToken);
                } catch (error) {
                    console.log('Tree list load:',error);
                }
            }
            
        }
        getTreeList();
    },[treeInstance, treeBalance, accounts, getBalance]);

    const [oneHourBoostAmountNeeded, setOneHourBoostAmountNeeded] = useState(undefined);
    useEffect(() => {
        const _load = async () => {
            if (typeof treeInstance !== 'undefined' && typeof accounts !== 'undefined') {
                try {
                    
                    const oneHourAmount = await treeInstance.methods.boostTokenForHour().call({from: accounts[0]});
                    if (oneHourAmount) {
                        setOneHourBoostAmountNeeded(oneHourAmount);
                    }
                        
                } catch (error) {
                    console.log('boostTokenForHour:',error);
                }
            }
            
        }
        _load();
    }, [treeInstance, accounts]);

    const [accordionIndex, setAccordionIndex] = useState(-1);   
    
    const panes = [
        { menuItem: 'Alive Trees', render: () => <Tab.Pane>
            <Grid centered columns={2}>
                <Grid.Column>
            <List divided relaxed>
                {treeList.length > 0 ? treeList.map(tree => {
                    if (tree.isAlive) {
                        return (
                            <List.Item key={tree.treeId}>
                                <List.Icon verticalAlign='middle'><Icon icon={u1F332} size={96}/></List.Icon>
                                <List.Content>
                                    <List.Header>
                                        
                                    </List.Header>
                                    <List.Description as='a'>
                                        <Grid stackable verticalAlign='middle'>
                                            <Grid.Row centered>
                                            <Grid.Column>
                                                <Label as='a' color={tree.isAlive ? 'violet': 'red'}>
                                                    Tree Id: {tree.treeId}
                                                    <Label.Detail color={tree.isAlive ? 'teal': 'pink'}>{tree.isAlive ? 'Alive' : 'Dead'}</Label.Detail>
                                                </Label>
                                                <br/>Tree Age: {shared.secondsToDhms(tree.age)}
                                                <br/>Tree Potencial CGRAPEs: {Web3.utils.fromWei(tree.potencialGrape.toString() ,'ether')} CGRAPEs
                                                <br/>{treeKillLoding ? 
                                                        <Button loading fluid basic color='violet'>
                                                            Loading
                                                        </Button> :
                                                            <button className="ui fluid pink button" disabled={!tree.isAlive} onClick={() =>{kill1Tree(tree.treeId)}}>Burn Tree for CGRAPE</button>
                                                    }
                                                <br/>
                                                    {treeBoostAddress !== '0x0000000000000000000000000000000000000000' ?
                                                    <>
                                                        <Input
                                                        disabled={!tree.isAlive}
                                                        fluid
                                                        label={{ basic: true, content: <div>{typeof treeBoostSymbol !== 'undefined' ? treeBoostSymbol.toString() : ''}</div> }}
                                                        labelPosition='right'
                                                        placeholder='Enter Boost Amount...'
                                                        onChange={handleTreeBoostAmountChange}
                                                        />
                                                        <br/>
                                                        <Header as='h4'>Allowance: {Web3.utils.fromWei(boostAllowance ? boostAllowance.toString(): '0' ,'ether')}</Header>
                                                        <br/>
                                                        
                                                            {treeBoostApproveLoading ? 
                                                                <Button loading fluid basic color='violet'>
                                                                    Loading
                                                                </Button> :
                                                                    <button className="ui fluid violet button" disabled={!tree.isAlive || boostAllowance !== '0' || parseFloat(treeBoostAmount) === 0} onClick={approveBoost}>Approve Boost to Tree</button>
                                                            }
                                                        
                                                        <br/>
                                                    
                                                        {treeBoostLoading ? 
                                                            <Button loading fluid basic color='violet'>
                                                                Loading
                                                            </Button> :
                                                                <button className="ui fluid violet button" disabled={!tree.isAlive || boostAllowance === '0' || parseFloat(treeBoostAmount) === 0} onClick={() => {boostTree(tree.treeId)}}>Boost Tree</button>
                                                        }
                                                    </>
                                                    : 
                                                    <>
                                                        <Input
                                                        disabled={!tree.isAlive}
                                                        fluid
                                                        label={{ basic: true, content: <div>BNB</div> }}
                                                        labelPosition='right'
                                                        placeholder='Enter Boost Amount...'
                                                        onChange={handleTreeBoostEthAmountChange}
                                                        />
                                                        <br/>
                                                        {/* <Header as='h4'>Allowance: {Web3.utils.fromWei(boostAllowance ? boostAllowance.toString(): '0' ,'ether')}</Header> */}
                                                        <br/>
                                                        
                                                    
                                                        {treeBoostLoading ? 
                                                            <Button loading fluid basic color='violet'>
                                                                Loading
                                                            </Button> :
                                                                <button className="ui fluid violet button" disabled={!tree.isAlive || treeBoostEthAmount === '0' || parseFloat(treeBoostEthAmount) === 0} onClick={() => {boostTreeWithEth(tree.treeId)}}>Boost Tree</button>
                                                        }
                                                    </>
                                                    }
                                            </Grid.Column>
                                            
                                            </Grid.Row>
                                        </Grid>
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        );
                    } else {
                        return('');
                    }
                })
            : 'You own no Tree yet ... buy some ...'
            }
            </List>
            </Grid.Column>
        </Grid>
        </Tab.Pane> },
        { menuItem: 'Dead Trees', render: () => <Tab.Pane>
            <List divided celled>
                {treeList.length > 0 ? treeList.map(tree => {
                    if (!tree.isAlive) {
                        return (
                            <List.Item key={tree.treeId}>
                                <List.Icon verticalAlign='middle'><Icon icon={u1F332} size={96}/></List.Icon>
                                <List.Content>
                                    <List.Header>
                                        
                                    </List.Header>
                                    <List.Description as='a'>
                                        <Grid stackable verticalAlign='middle'>
                                            <Grid.Row centered>
                                            <Grid.Column width={16}>
                                                <Label as='a' color={tree.isAlive ? 'violet': 'red'}>
                                                    Tree Id: {tree.treeId}
                                                    <Label.Detail color={tree.isAlive ? 'teal': 'pink'}>{tree.isAlive ? 'Alive' : 'Dead'}</Label.Detail>
                                                </Label>
                                                <br/>Tree Age: {shared.secondsToDhms(tree.age)}
                                                <br/>Tree Potencial CGRAPEs: {Web3.utils.fromWei(tree.potencialGrape.toString() ,'ether')} CGRAPEs
                                                
                                            </Grid.Column>
                                            
                                            </Grid.Row>
                                        </Grid>
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        );
                    } else {
                        return('')
                    }
                })
            : 'You own no Tree yet ... buy some ...'
            }
            </List>
        </Tab.Pane> },
      ]
    
    return(
        <>
            <Modal
                basic
                onClose={() => {
                    setOpen(false);
                }}
                onOpen={() => setOpen(true)}
                open={open}
                size='small'
                // trigger={<Button>Basic Modal</Button>}
                >
                <Header icon>
                    {/* <Icon name='money' /> */}
                    Your Transaction Hash
                </Header>
                <Modal.Content>
                    <p>
                    <Header size='small' as='a' color='purple' target="_blank" rel="noopener noreferrer" href={shared.getScanTxLink(modalMessage, networkId)}>{modalMessage}</Header>
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='violet' inverted onClick={() => setOpen(false)}>
                    {/* <Icon name='checkmark' />  */}
                    Yes
                    </Button>
                </Modal.Actions>
            </Modal>

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
                            How TREE works ?
                            </Accordion.Title>
                            <Accordion.Content active={accordionIndex === 0}>
                            <p>
                            A tree can generate CGRAPEs for a certain amount of time, nowadays a tree can get mature within 3 days and can generate up to 100 CGRAPEs. 
                            They say a tree can be boosted to mature faster if you feed it the correct booster token :)
                            </p>
                            <p>
                            Two things will happen when you buy a tree.
                            </p>
                            <p>
                            1 - The smart contract will create and add liquidity for CGRAPE on Otherswap.com, and the tree will start producing CGRAPEs. 
                            </p>
                            <p>
                            2- The created tokens for liquidity will be locked in the smart contract. 
                            </p>
                            <p>
                            The Moderator team is only allowed to remove %5 of this liquidity (the liquidity generated by CTREEs only) once each 30 days.
                            when removal of liquidity happens the (removed CGRAPE from liquidity) will be burned automaticlly, and the removed BNB will be sent to the team to be used in developing the porject, pumping...etc.
                            </p>
                            <p>
                            Each tree is a NFT (Non Fungible Token) of ERC721. Even if the tree got totally matured and could not generate more CGRAPE. It is still yours feel free to do what ever you wish with it. It can be imported to any NFT market that support importing ERC721, and Sold there either as tree or assigning any art to it. Feel free to get creative.
                            </p>
                            </Accordion.Content>

                        </Accordion>
                    </Grid.Column>
                </Grid.Row>
                
                <Grid.Row centered>
                    <Grid.Column width={3}>
                        <Web3Info />
                    </Grid.Column>

                    <Grid.Column>
                        <Card centered>
                            <Image src={require('../../assets/tree_512x.png')} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>CTREE </Card.Header>
                                <Card.Meta>
                                    <Label as='a' color={'violet'} flex>
                                        Price: {Web3.utils.fromWei(treePrice ? treePrice.toString(): '0' ,'ether')} {NETWORK_COIN_SYMBOL[networkId]}
                                    </Label>
                                </Card.Meta>
                                <Card.Description>
                                    Usefull for harvesting CGRAPE.
                                    <br/>A tree can grow approximatly within "3 Days".
                                    <br/>
                                    <div>
                                    
                                    Being patient and watching your tree can give you a good deal of CGRAPEs.
                                    Also you always can boost your tree and get 1 Hour extra for each {Web3.utils.fromWei(oneHourBoostAmountNeeded ? oneHourBoostAmountNeeded.toString(): '0' ,'ether')}
                                    {treeBoostAddress !== '0x0000000000000000000000000000000000000000' ? '  ' + treeBoostSymbol : '  BNB, '}
                                    you feed your tree as boost.
                                    
                                    </div>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div>
                                    <Dropdown 
                                        placeholder='Trees to buy' 
                                        fluid 
                                        selection 
                                        closeOnBlur
                                        upward
                                        floating
                                        options={buyTreeOptions}
                                        selectable={false}
                                        onChange={handleBuyTreeOptionChange}
                                        />
                                </div>
                                    
                                        <br></br>
                                    {treeBuyLoding ? 
                                        <Button loading fluid basic color='violet'>
                                            Loading
                                        </Button> :
                                            // <button className="ui fluid violet button" disabled={selectedBuyOption === 0} onClick={buyTrees}>Buy {selectedBuyOption === 1 ? 'Tree' : 'Trees'}</button>
                                        <Button  
                                            as='div' 
                                            labelPosition='right'
                                            onClick={buyTrees}
                                            disabled={selectedBuyOption === 0}
                                            fluid
                                            >
                                            <Button fluid color='violet'>
                                                Buy {(selectedBuyOption === 1) ? 'Tree' : 'Trees'}
                                            </Button>
                                            <Label as='a' fluid basic color='violet' pointing='left'>
                                                {/* <Icon name='ethereum' /> */}
                                                {(treePrice && selectedBuyOption && selectedBuyOption !== 0) ? shared.truncate(Web3.utils.fromWei(Web3.utils.toBN(treePrice).mul(Web3.utils.toBN(selectedBuyOption)), 'ether'), 8) : '0.00'} {NETWORK_COIN_SYMBOL[networkId]}
                                            </Label>
                                        </Button> 
                                    }
                                
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    {/* <Divider vertical>STATS</Divider> */}
                    <Grid.Column width={8}>
                        
                        <Tab panes={panes} />
                            
                    </Grid.Column>
                </Grid.Row>                
            </Grid>
        </>
    );
}