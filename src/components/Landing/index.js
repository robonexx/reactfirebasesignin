import React from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

const StyledDiv = styled.div`
    width: 100vw;
    height: 100vh;
  background: #373F51;
  color: palevioletred;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`

const Header = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 8vh;
  background: #1B1B1E;
  border-bottom: 2px solid palevioletred;
  color: palevioletred;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 1rem 0;
  margin-right: 2rem;
  padding: 0.25em 1em;
  cursor: pointer;
  outline: none;

  &:hover {
    background: lightgray;
    color: black;
  }

`

const Landing = () => {

  let history = useHistory();

  const routeChange = () =>{ 
     
    history.push('/signin');
  }
  return (
    <>
    <StyledDiv>
        
        <Header>
        <h1>Welcome to B-E-V</h1>
        <Button onClick={routeChange}>Sign in</Button>
        </Header>
        <main>
          <h1>Landing page</h1>
          </main>
        </StyledDiv>
    </>
    )
  };

export default Landing;
