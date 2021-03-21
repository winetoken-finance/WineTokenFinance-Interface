import React, { useContext } from 'react';
import { Web3Context } from '../../App';
import { Grid, Button } from 'semantic-ui-react';


export default function SwapAndLiquidity() {

    const { 
        grapeInstance, 
        wineInstance, 
    }  = useContext(Web3Context);

    return(
        <>
        <Grid padded doubling stackable centered columns='4'>

            <Grid.Row>
                <Grid.Column>
                    <div class="ui segment">
                        <img alt={'metamask'} class="ui centered medium image" src={require('../../assets/swap_forward.png')} wrapped centered/>
                        <Button fluid color='violet' onClick={
                            () => {
                                window.open('https://www.otherswap.com/#/swap', '_blank');
                            }
                        }>Swap at OtherSwap.com</Button>
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <div class="ui segment">
                        <img alt={'metamask'} class="ui centered small image" src={require('../../assets/grape_pool_256x.png')} wrapped centered/>
                        <Button fluid color='violet' onClick={
                            () => {
                                if (grapeInstance && typeof grapeInstance !== 'undefined') {
                                    window.open('https://www.otherswap.com/#/add/ETH/' + grapeInstance.options.address, '_blank');
                                } else {
                                    window.open('https://www.otherswap.com/', '_blank');
                                }
                            }
                        }>Add CGRAPE Liquidity</Button>
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <div class="ui segment">
                        <img alt={'metamask'} class="ui centered small image" src={require('../../assets/wine_pool_256x.png')} wrapped centered/>
                        <Button fluid color='violet' onClick={
                            () => {
                                if (wineInstance && typeof wineInstance !== 'undefined') {
                                    window.open('https://www.otherswap.com/#/add/ETH/' + wineInstance.options.address, '_blank');
                                } else {
                                    window.open('https://www.otherswap.com/', '_blank');
                                }
                            }
                        }>Add CWINE Liquidity</Button>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        
        </>
    );
}