import styled from 'styled-components';

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
    top: 15vh;
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
`

const Landing = () => (
    <>
    <StyledDiv>
        <h1>Landing</h1>
        <Header>
        <h1>Welcome to B-E-V</h1>
        <Button>Sign in</Button>
        </Header>
        </StyledDiv>
    </>
);

export default Landing;
