import propTypes from 'prop-types';
import Menu from './Menu';
import styled from 'styled-components';



const AppLayout = ({children})=>{
    const Container = styled.div`        
        margin:auto ;
        display:flex;
        justify-content:space-around;
        align-items: center;
        width:98vw;
        height:98vh;
        background-color :  rgb(255, 116, 116);
        border-radius: 2em;
    `

    const Side = styled.div`
        width:10%;        
    
    `
    const Children = styled.div`          
        width:85%;              
        height:95%;
        padding: 10px;
        background-color:white;
        border-radius: 2em;
    `

    const Title = styled.div`
        color:white;
        text-align:center;
    `
    
    return(
        <Container>
            <Side>
                <Title>
                    MY TASTE
                </Title>
                
                <Menu />
            </Side>

            <Children>
                {children}
            </Children>
            
        </Container>
            
        
    )
};

AppLayout.propTypes = {
    children : propTypes.node.isRequired
};

export default AppLayout;