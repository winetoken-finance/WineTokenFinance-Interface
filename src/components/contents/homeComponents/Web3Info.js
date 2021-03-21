import React, { useContext } from 'react';
import { Card, List, Header, Image } from 'semantic-ui-react';
import { Icon } from 'react-icons-kit';
import {u1F332} from 'react-icons-kit/noto_emoji_regular/u1F332' // tree
import {u1F347} from 'react-icons-kit/noto_emoji_regular/u1F347' // grape
import {u1F377} from 'react-icons-kit/noto_emoji_regular/u1F377' // wine
import {u1F3ED} from 'react-icons-kit/noto_emoji_regular/u1F3ED' // factory
import { Web3Context } from '../../../App';
// import ThemeContext from '../../Theme.js'
import Web3 from "web3";
import Shared from '../../../classes/shared.js'
import money_bag_image from '../../../assets/money-bag.png' ;
import { NETWORK_COIN_SYMBOL, SUPPORTED_NETWORK_NAME } from '../../../constants';

export default function Web3Info() {
  const shared = new Shared();
  // const theme = useContext(ThemeContext);

  // web3
  const {
    accounts, 
    networkId, 
    balance, 
    grapeBalance,
    treeBalance, 
    stakedTracker, 
    wineBalance,
    grapePoolBalance,
    winePoolBalance,
    treeBoostBalance,
    treeBoostSymbol,
    ethPrice,
    grapePrice,
    winePrice,
  }  = useContext(Web3Context);

  return (
    <div>
        <Card centered>
          <Card.Content header='Wallet Status' />
          <Card.Content >
            {accounts && accounts.length ? (
                <div>Wallet Connected</div>
            ) : (
                <div>Please Connect Wallet</div>
            )}
            {/* <div>Provider: {providerName}</div> */}
            <div>Network: {networkId ? SUPPORTED_NETWORK_NAME[networkId] ? SUPPORTED_NETWORK_NAME[networkId] : 'UnKown Network' : 'No connection'}</div>
            {/* <div>Address: {accounts && accounts.length ? accounts[0] : 'Unknown'}</div> */}
          </Card.Content>
          <Card.Content extra>
          <List divided relaxed>
            <List.Item>
              <Image
                floated='left'
                size='mini'
                src={money_bag_image}
                />
              <List.Content>
                <Header as='h4' color='violet'>Prices</Header>
                <List.Description as='a'>
                  <div>
                    {NETWORK_COIN_SYMBOL[networkId]} {shared.truncate(ethPrice, 4)} $
                    <br></br>
                    CGRAPE {shared.truncate(grapePrice, 4)} $
                    <br></br>
                    CWINE {shared.truncate(winePrice, 4)} $
                  </div>
                  </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              {/* <List.Icon name='ethereum' size='large' verticalAlign='middle' /> */}
              <List.Item>
                <Image spaced size='mini' floated='left' src={require('../../../assets/binance-logo.png')} />
              </List.Item>
              <List.Content>
                <Header as='h4' color='violet'>{NETWORK_COIN_SYMBOL[networkId]} Balance</Header>
                <List.Description as='a'>{shared.truncate(balance, 8)}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon><Icon icon={u1F347} size={32}/></List.Icon>
              <List.Content>
                <Header as='h4' color='violet'>CGRAPE Balance</Header>
                <List.Item>
                  <List.Description as='a'>{shared.truncate(Web3.utils.fromWei(grapeBalance.toString() ,'ether'), 8)} CGRAPEs</List.Description>
                </List.Item>
                <List.Item>
                  <List.Description as='a'>{shared.truncate(Web3.utils.fromWei(grapePoolBalance.toString() ,'ether'), 8)} CGRAPE Pool Tokens</List.Description>
                </List.Item>
                
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon><Icon icon={u1F377} size={32}/></List.Icon>
              <List.Content>
                <Header as='h4' color='violet'>CWINE Balance</Header>
                <List.Item>
                  <List.Description as='a'>
                    {shared.truncate(Web3.utils.fromWei(wineBalance.toString() ,'ether'), 8)} CWINEs
                  </List.Description>
                </List.Item>
                <List.Item>
                  <List.Description as='a'>
                    {shared.truncate(Web3.utils.fromWei(winePoolBalance.toString() ,'ether'), 8)} CWINE Pool Tokens
                  </List.Description>
                </List.Item>
                
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Icon><Icon icon={u1F3ED} size={32}/></List.Icon>
              <List.Content>
                <Header as='h4' color='violet'>Fermenting</Header>
                <List.Item>
                  <List.Description as='a'>{shared.truncate(Web3.utils.fromWei(stakedTracker.tokenStaked.toString() ,'ether'), 8)} CGRAPEs</List.Description>
                </List.Item>
                <List.Item>
                  <List.Description as='a'>{shared.truncate(Web3.utils.fromWei(stakedTracker.boostTokenStaked.toString() ,'ether'), 8)} CWINE Pool Tokens</List.Description>
                </List.Item>
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Icon><Icon icon={u1F332} size={32}/></List.Icon>
              <List.Content>
                <Header as='h4' color='violet'>CTREE Balance</Header>
                <List.Item>
                  <List.Description as='a'>{treeBalance} {treeBalance > 1 ? 'CTREEs' : 'TREE'}</List.Description>
                </List.Item>
                {(typeof treeBoostBalance !== 'undefined' && typeof treeBoostSymbol !== 'undefined') ? 
                <List.Item>
                  <List.Description as='a'>{shared.truncate(Web3.utils.fromWei(treeBoostBalance.toString() ,'ether'), 8)} {treeBoostSymbol} (Boost CTREE)</List.Description>
                </List.Item>
                : null}
                
              </List.Content>
            </List.Item>
          </List>
          </Card.Content>
        </Card>
    </div>
  );
}