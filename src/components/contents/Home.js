import React, { useContext } from 'react';
import Particles from "react-tsparticles";
import { Header, Button, Grid, Icon } from 'semantic-ui-react';
import { SelectedContentContext } from '../AppLayout';
import { Web3Context } from '../../App';


export default function Home() {

    const {changeSelectedNav} = useContext(SelectedContentContext);
    const { setOpenConnectWallet, metamaskButtonText }  = useContext(Web3Context);

    return(
        <div>
        <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "#F9F6FC",
            },
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#7D25F4",
            },
            links: {
              color: "#9F65ED",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: false,
        }}
      />
      <div className='landing'>
            <Header as='h1'>Welcome to Wine Finance</Header>
            <Header as='h2'>Main Net Will Be Here Soon</Header>
            <Grid centered columns='equal'>
                <Grid.Row >
                    <Grid.Column textAlign={'center'}>
                        <Button size='big' circular animated color={'purple'} onClick={() => {
                            changeSelectedNav(1);
                            if(metamaskButtonText !== 'Connected') {
                              setOpenConnectWallet(true);
                            }
                        }}>
                            <Button.Content visible>Start Use The App Now</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>

                        {/* <Button size='big' circular animated color={'purple'} onClick={() => {
                            connectWalletConnectWallet();
                        }}>
                            <Button.Content visible>Wallet Connect</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button> */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
      </div>
      </div>
    );
}
