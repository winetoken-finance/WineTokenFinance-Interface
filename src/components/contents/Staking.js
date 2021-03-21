import React, { useState, useEffect, useContext } from 'react';
import { Grid, Segment, Input, Header, Button, Modal, Accordion } from 'semantic-ui-react';
import Web3Info from './homeComponents/Web3Info.js';
import { Web3Context } from '../../App';
import Web3 from "web3";
import { Icon } from 'react-icons-kit';
import {u2705} from 'react-icons-kit/noto_emoji_regular/u2705';
import {u2755} from 'react-icons-kit/noto_emoji_regular/u2755' ;  // info
import Shared from '../../classes/shared.js'
// const BN = require('bn.js');

export default function Staking(){
    const shared = new Shared();
    // const web3Context  = useContext(Web3Context);
    // web3
    const { 
        networkId,
        accounts, 
        balance, 
        stakeInstance, 
        stakedTracker, 
        grapeInstance, 
        getBalance, 
        winePoolInstance, 
        grapeBalance, 
        winePoolBalance,
        loadStakeTracker
    }  = useContext(Web3Context);
    
    // stake Input amount
    const [stakeInputAmount, setStakeInputAmount] = useState(0);
    const [boostInputAmount, setBoostInputAmount] = useState(0);

    // unStake Input amount
    const [unStakeInputAmount, unSetStakeInputAmount] = useState(0);
    const [unBoostInputAmount, unSetBoostInputAmount] = useState(0);

    // get potencial Stake rewards
    const [stakedPotencial, setStakedPotencial] = useState('0');
    // const [rewardSum, setRewardSum] = useState('0');
    useEffect(() => {
        const loadStakePotencial = async () => {
            if (typeof stakeInstance !== 'undefined') {
                try {
                    let stakedPotencial = await stakeInstance.methods.myRewardsBalance(accounts[0]).call({from: accounts[0]});
                    // console.log('stakedPotencial', stakedPotencial);
                    if (stakedPotencial) {
                        setStakedPotencial(stakedPotencial);
                    }
                    // let b = 0;
                    // if (stakedTracker && stakedPotencial) {
                    //     let a = new BN(stakedTracker.rewards.toString());
                    //     b = a.add(new BN(stakedPotencial.toString()));
                    //     setRewardSum(b);
                    // }
                } catch (error) {
                    console.log('stakedPotencial error:',error)
                }
            }
        }
        loadStakePotencial()
    },[stakeInstance, balance, stakedTracker, accounts]);

    // CGRAPE approve
    const [grapeApproveLoading, setGrapeApproveLoading] = useState(false);
    const [approveButtonPassed, setApproveButtonPassed] = useState(false);
    const approveGrape = async () => {
        console.log('trying to approve CGRAPE');
        console.log('approve CGRAPE input:', Web3.utils.toWei(stakeInputAmount.toString() ,'ether'));
        console.log('aprove for:', stakeInstance.options.address);
        try {
            const ethAmount = Web3.utils.toWei(stakeInputAmount.toString() ,'ether');
            setGrapeApproveLoading(true);
            let approveRes = await grapeInstance.methods.approve(stakeInstance.options.address, ethAmount.toString()).send({ from: accounts[0]});
            console.log(approveRes);
            if (approveRes) {
                setGrapeApproveLoading(false);
                setApproveButtonPassed(true);
                setModalMessage(approveRes.transactionHash);
                getBalance();
                setOpen(true);
            }
        } catch (error) {
            console.log(error);
            setModalMessage('Transaction Fail, perhaps you may try again later.\n', error);
            setOpen(true);
            setGrapeApproveLoading(false);
        }
    }

    // CWINE pool token 
    // CWINE approve
    const [wineApproveLoading, setWineApproveLoading] = useState(false);
    const [approveWineButtonPassed, setApproveWineButtonPassed] = useState(false);
    const approveWine = async () => {
        console.log('trying to approve CWINE');
        console.log('approve CWINE input:', Web3.utils.toWei(boostInputAmount.toString() ,'ether'));
        console.log('aprove for:', stakeInstance.options.address);
        try {
            const ethAmount = Web3.utils.toWei(boostInputAmount.toString() ,'ether');
            setWineApproveLoading(true);
            let approveRes = await winePoolInstance.methods.approve(stakeInstance.options.address, ethAmount.toString()).send({ from: accounts[0]});
            console.log(approveRes);
            if (approveRes) {
                setWineApproveLoading(false);
                setApproveWineButtonPassed(true);
                setModalMessage(approveRes.transactionHash);
                getBalance();
                setOpen(true);
            }
        } catch (error) {
            console.log(error);
            setModalMessage('Transaction Fail, perhaps you may try again later.\n', error);
            setOpen(true);
            setWineApproveLoading(false);
        }
    }

    // stake
    const [stakeButtonLoading, setStakeButtonLoading] = useState(false);
    const stakeGrape = async () => {
        console.log('trying to stake CGRAPE');
        console.log('stake CGRAPE input:', Web3.utils.toWei(stakeInputAmount.toString() ,'ether'));
        console.log('stake boost token input:', Web3.utils.toWei(boostInputAmount.toString() ,'ether'));
        console.log('stake at:', stakeInstance.options.address);
        try {
            const ethAmountGrapeToken = Web3.utils.toWei(stakeInputAmount.toString() ,'ether'); 
            const ethAmountWinePoolToken = Web3.utils.toWei(boostInputAmount.toString() ,'ether');
            setStakeButtonLoading(true);
            let stkaeRes = await stakeInstance.methods.stake(ethAmountGrapeToken.toString(), ethAmountWinePoolToken.toString()).send({ from: accounts[0]});
            console.log(stkaeRes);
            if (stkaeRes) {
                setStakeButtonLoading(false);
                setApproveButtonPassed(false);
                setApproveWineButtonPassed(false);
                setModalMessage(stkaeRes.transactionHash);
                getBalance();
                setOpen(true);
            }
        } catch (error) {
            console.log(error);
            setModalMessage('Transaction Fail, perhaps you may try again later.\n', error);
            setOpen(true);
            setStakeButtonLoading(false);
        }
    }

    // un-stake
    const [unStakeButtonLoading, setUnStakeButtonLoading] = useState(false);
    const unStakeGrape = async () => {
        console.log('trying to un-stake CGRAPE/CWINE pool token');
        console.log('un-stake CGRAPE/CWINE inputs:', Web3.utils.toWei(unStakeInputAmount.toString() ,'ether'), Web3.utils.toWei(unBoostInputAmount.toString() ,'ether'));
        console.log('un-stake at:', stakeInstance.options.address);
        try {
            const ethAmount = Web3.utils.toWei(unStakeInputAmount.toString() ,'ether');
            const ethAmountWinePoolToken = Web3.utils.toWei(unBoostInputAmount.toString() ,'ether');
            setUnStakeButtonLoading(true);
            let unStakeRes = await stakeInstance.methods.unStake(ethAmount.toString(), ethAmountWinePoolToken.toString()).send({ from: accounts[0]});
            console.log(unStakeRes);
            if (unStakeRes) {
                setUnStakeButtonLoading(false);
                setModalMessage(unStakeRes.transactionHash);
                getBalance();
                setOpen(true);
            }
        } catch (error) {
            console.log(error);
            setModalMessage('Transaction Fail, perhaps you may try again later.\n', error);
            setOpen(true);
            setUnStakeButtonLoading(false);
        }
    }

    // claim reward
    const [claimRewardButtonLoading, setClaimRewardButtonLoading] = useState(false);
    const claimStakeReward = async () => {
        console.log('trying to claim Stake staking reward');
        try {
            setClaimRewardButtonLoading(true);
            let claimRes = await stakeInstance.methods.claimReward().send({ from: accounts[0]});
            console.log(claimRes);
            if (claimRes) {
                setClaimRewardButtonLoading(false);
                setModalMessage(claimRes.transactionHash);
                getBalance();
                setOpen(true);
            }
        } catch (error) {
            console.log(error);
            setModalMessage('Transaction Fail, perhaps you may try again later.\n', error);
            setOpen(true);
            setClaimRewardButtonLoading(false);
        }
    }

    // get CGRAPE pool token allowance
    const [grapeAllowance, setGrapeAllowance] = useState(0);
    useEffect(() => {
        const getGrapeAllowance = async () => {
            if (typeof grapeInstance !== 'undefined' && typeof stakeInstance !== 'undefined') {
                try {
                    const grapeAllowanceRes = await grapeInstance.methods.allowance(accounts[0], stakeInstance.options.address).call({from: accounts[0]});
                    // console.log('allowance:', grapeAllowanceRes)
                    setGrapeAllowance(grapeAllowanceRes);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    getGrapeAllowance();
    },[stakeInstance, grapeInstance, accounts, balance]);

    // get CWINE pool token allowance
    const [wineAllowance, setWineAllowance] = useState(0);
    useEffect(() => {
        const getWineAllowance = async () => {
            if (typeof winePoolInstance !== 'undefined' && typeof stakeInstance !== 'undefined') {
                try {
                    const wineAllowanceRes = await winePoolInstance.methods.allowance(accounts[0], stakeInstance.options.address).call({from: accounts[0]});
                    // console.log('allowance:', wineAllowanceRes)
                    setWineAllowance(wineAllowanceRes);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    getWineAllowance();
    },[stakeInstance, winePoolInstance, accounts, balance]);

    // modal
    const [open, setOpen] = React.useState(false);
    const [modalMessage, setModalMessage] = useState('0x0000');

    // accordion
    const [accordionIndex, setAccordionIndex] = useState(-1);

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
                            How fermenting works?
                            </Accordion.Title>
                            <Accordion.Content active={accordionIndex === 0}>
                            <p>
                            Fermenting (staking). There are two ways of fermenting.
                            </p>
                            <p>
                            First way of fermenting is locking CGRAPE in a smart contract. You can withdraw your CGRAPE and claim your CWINE any time.
                            </p>
                            <p>
                            Second way is by providing liquidity to CWINE if you already have CGRAPE fermenting. When you provide liquidity and deposit your CWINE poole token to the smart contract you will earn 10x higher APY.
                            </p>
                            <p>
                            Important: When CGRAPE is withdrawn from Fermenting contract certain percentage (%4-%5) will be burned according to CGRAPE price.
                            </p>
                            </Accordion.Content>
                        </Accordion>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row stretched>

                    <Grid.Column  centered width={3}>
                            <Web3Info />
                    </Grid.Column>

                    <Grid.Column centered>
                        <Segment>
                            <Header as='h1'>Fermentation</Header>
                            <Grid doubling stackable centered columns='equal'>
                                <Grid.Row stretched>
                                    <Grid.Column >
                                        <Segment>
                                            <Header as='h3'>Prepare CGRAPE</Header>
                                            <Header as='h5'>1- Set the amount of CGRAPE Token for fermenting.</Header>
                                                <Grid verticalAlign='middle' padded doubling stackable centered columns='equal'>
                                                    <Grid.Row centered columns='equal'>
                                                        <Grid.Column centered>
                                                            <Input
                                                                action={
                                                                    <Button
                                                                    color='purple'
                                                                    onClick={() => setStakeInputAmount(Web3.utils.fromWei(grapeBalance.toString() ,'ether'))}
                                                                    >
                                                                    Max
                                                                    </Button>
                                                                }
                                                                fluid
                                                                placeholder='Amount to Stake'
                                                                name='stakeAmount'
                                                                value={stakeInputAmount}
                                                                onChange={
                                                                    (e, {name, value}) => {
                                                                        console.log(stakeInputAmount)
                                                                        setStakeInputAmount(value)
                                                                    }
                                                                }
                                                            />
                                                        </Grid.Column>
                                                        <Grid.Column centered width={6}>
                                                            {/* <Segment> */}
                                                                Allowance: <Header as='h4'>{Web3.utils.fromWei(grapeAllowance ? grapeAllowance.toString(): '0' ,'ether')} </Header> CGRAPE Tokens
                                                            {/* </Segment> */}
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            <Header as='h5'>2- Approve the amount for fermenting.</Header>
                                                <Button 
                                                    loading={grapeApproveLoading} 
                                                    disabled={parseFloat(stakeInputAmount) === 0 || parseFloat(stakeInputAmount) <= parseFloat(Web3.utils.fromWei(grapeAllowance ? grapeAllowance.toString(): '0' ,'ether'))}
                                                    fluid 
                                                    basic 
                                                    color='violet'
                                                    onClick={approveGrape}
                                                    >
                                                    {approveButtonPassed || 
                                                    (
                                                    parseFloat(stakeInputAmount) > 0 && 
                                                    parseFloat(stakeInputAmount) <= parseFloat(Web3.utils.fromWei(grapeAllowance ? grapeAllowance.toString(): '0' ,'ether'))
                                                    )
                                                    ? <Icon icon={u2705} size={32}>Approved</Icon>: 'Approve'}
                                                </Button>
                                        </Segment>
                                        <Segment>   
                                            <Header as='h3'>Prepare Boost</Header>    
                                            <Header as='h5'>1- Set the amount of CWINE Pool Token you want to Boost Fermentation.</Header>
                                                <Grid verticalAlign='middle' padded doubling stackable centered columns='equal'>
                                                    <Grid.Row centered columns='equal'>
                                                        <Grid.Column centered>
                                                            <Input
                                                                action={
                                                                    <Button
                                                                    color='purple'
                                                                    onClick={() => setBoostInputAmount(Web3.utils.fromWei(winePoolBalance.toString() ,'ether'))}
                                                                    >
                                                                    Max
                                                                    </Button>
                                                                }
                                                                fluid
                                                                placeholder='Amount to Stake'
                                                                name='stakeAmount'
                                                                value={boostInputAmount}
                                                                onChange={
                                                                    (e, {name, value}) => {
                                                                        console.log(boostInputAmount)
                                                                        setBoostInputAmount(value)
                                                                    }
                                                                }
                                                            />
                                                        </Grid.Column>
                                                        <Grid.Column centered width={6}>
                                                            {/* <Segment> */}
                                                                Allowance: <Header as='h4'>{Web3.utils.fromWei(wineAllowance ? wineAllowance.toString(): '0' ,'ether')} </Header> CWINE Pool Tokens
                                                            {/* </Segment> */}
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            <Header as='h5'>2- Approve the amount for fermentation.</Header>
                                            <Button 
                                                loading={wineApproveLoading} 
                                                disabled={parseFloat(boostInputAmount) === 0 || parseFloat(boostInputAmount) <= parseFloat(Web3.utils.fromWei(wineAllowance ? wineAllowance.toString(): '0' ,'ether'))}
                                                fluid 
                                                basic 
                                                color='violet'
                                                onClick={approveWine}
                                                >
                                                {approveWineButtonPassed || 
                                                (
                                                parseFloat(boostInputAmount) > 0 && 
                                                parseFloat(boostInputAmount) <= parseFloat(Web3.utils.fromWei(wineAllowance ? wineAllowance.toString(): '0' ,'ether'))
                                                ) ? <Icon icon={u2705} size={32}>Approved</Icon>: 'Approve'}
                                            </Button>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column  centered width={6}>
                                        <Segment>
                                            <Header as='h3'>Fermenting.</Header>
                                            <Header as='h5'>CGRAPE amount: {
                                                parseFloat(stakeInputAmount) <= parseFloat(Web3.utils.fromWei(grapeAllowance ? grapeAllowance.toString(): '0' ,'ether')) 
                                                ? 
                                                stakeInputAmount 
                                                : 
                                                'NO ENOUGH ALLOWANCE'
                                                }</Header>
                                            <Header as='h5'>CWINE Pool Token amount: {
                                            parseFloat(boostInputAmount) <= parseFloat(Web3.utils.fromWei(wineAllowance ? wineAllowance.toString(): '0' ,'ether')) 
                                            ? boostInputAmount
                                            : 
                                            'NO ENOUGH ALLOWANCE'
                                            }</Header>
                                            <Header as='h5'>Send the amount(s) for fermenting.</Header>
                                            <Button 
                                                loading={stakeButtonLoading} 
                                                disabled={false}
                                                fluid 
                                                basic 
                                                color='violet'
                                                onClick={stakeGrape}
                                                >
                                                Ferment
                                            </Button>
                                            <br></br>
                                            <p>
                                                Important notes:
                                            </p>
                                            <p>
                                                Always make sure you have a correct input amount and it correspond to the correct allownce amount.
                                            </p>
                                            <p>
                                                It is also posible to ferment CGRAPE Token alone, or also add CWINE Pool Token as boost, this way it is also 
                                                possible to ferment CWINE Pool Token alone if you already have CGRAPE Token fermenting.
                                            </p>
                                            <p>
                                                Fermenting CWINE pool token alone will not generate CWINE. It is always has to accompanied with CGRAPE.
                                            </p>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                         
                        
                    </Grid.Column>

                    <Grid.Column width={5}>
                    <Segment>
                                <Header as='h1'>UnFermentation</Header>
                                <Header as='h5'>1- Set the amount of CGRAPE Pool Token you want to withdraw.</Header>
                                <Input
                                    action={
                                        <Button
                                        color='purple'
                                        onClick={() => unSetStakeInputAmount(Web3.utils.fromWei(stakedTracker.tokenStaked.toString() ,'ether'))}
                                        >
                                        Max
                                        </Button>
                                    }
                                    fluid
                                    placeholder='Amount to Stake'
                                    name='stakeAmount'
                                    value={unStakeInputAmount}
                                    onChange={
                                        (e, {name, value}) => {
                                            console.log(unStakeInputAmount)
                                            unSetStakeInputAmount(value)
                                        }
                                    }
                                />
                                <Header as='h5'>2- Set the amount of CWINE Pool Token you want to withdraw.</Header>
                                <Input
                                    action={
                                        <Button
                                        color='purple'
                                        onClick={() => unSetBoostInputAmount(Web3.utils.fromWei(stakedTracker.boostTokenStaked.toString() ,'ether'))}
                                        >
                                        Max
                                        </Button>
                                    }
                                    fluid
                                    placeholder='Amount to Stake'
                                    name='stakeAmount'
                                    value={unBoostInputAmount}
                                    onChange={
                                        (e, {name, value}) => {
                                            console.log(unBoostInputAmount)
                                            unSetBoostInputAmount(value)
                                        }
                                    }
                                />
                                <Header as='h5'>3- Withdraw the amount from fermentation.</Header>
                                <Button loading={unStakeButtonLoading} 
                                    fluid 
                                    basic 
                                    color='violet'
                                    onClick={unStakeGrape}
                                    >
                                    Withdraw
                                </Button>                            
                        </Segment>
                        <Segment>
                            <Header as='h1'>Reward</Header>
                            <Header as='h5'>Total Reward (Approximated)</Header>
                            <Grid columns='equal'>
                                <Grid.Row>
                                    <Grid.Column  >
                                        <Header as='h3'>{truncate(Web3.utils.fromWei(stakedPotencial.toString() ,'ether'), 12)} CWINEs</Header>
                                    </Grid.Column>
                                    <Grid.Column  >
                                        <Button 
                                            animated
                                            fluid 
                                            color='violet'
                                            onClick={loadStakeTracker}
                                            >
                                            <Button.Content visible>Referesh</Button.Content>
                                            <Button.Content hidden>Try Refreshing</Button.Content>
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <br></br>
                            <Button loading={claimRewardButtonLoading} 
                                    fluid 
                                    basic 
                                    color='violet'
                                    onClick={claimStakeReward}
                                    >
                                    Claim Reward
                            </Button>
                            <br></br>
                            <Header as='h5'>Reward is calculated on block bases, so it is recommended wait about 6 to 12 seconds for a new block to be mined before refreshing...</Header>
                        </Segment>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </>
    );
}