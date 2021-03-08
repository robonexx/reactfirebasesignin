import React, { Component } from 'react';
import { withAuthorization, AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import styled from 'styled-components'


const StyledHome = styled.div`
    background: radial-gradient(ellipse at bottom, #1B1B1E, #373F51);
    width: 100vw;
    height: 100vh;
    color: palevioletred;
    display: flex;
    flex-flow: column;
    align-items: center;
    box-sizing: border-box;
`
const Styledh1 = styled.h1`
font-size: 3rem;
color: #fafafa;
` 

const StyledMessages = styled.div`
position: absolute;
right: 0;
width: 30vw;
z-index: 10;
`
const StyledLi = styled.li`
list-style: none;
margin-left: 0;
`

const StyledForm = styled.form`
margin-left: 0;

input {
    background: black;
    margin-left: 2rem;
    border: none;
    outline: none;
    padding: 0.25em 1em;
    margin-right: 0.5rem;
    color: white;
}
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

const HomePage = () => (
    <StyledHome>
        <Styledh1>B-E-V</Styledh1>
        <p>The Home Page is accessible by every signed in user.</p>
        <StyledMessages>
            <Messages />
        </StyledMessages>
    </StyledHome>
);

class MessagesBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            loading: false,
            messages: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.messages().on('value', snapshot => {
            const messageObject = snapshot.val();
            if (messageObject) {
                const messageList = Object.keys(messageObject).map(key => ({
                    ...messageObject[key],
                    uid: key,
                }));
                this.setState({ messages: messageList, loading: false });
            } else {
                this.setState({ messages: null, loading: false });
            }
            this.setState({ loading: false });
        });
    }
    componentWillUnmount() {
        this.props.firebase.messages().off();
    }

    onRemoveMessage = (uid) => {
        this.props.firebase.message(uid).remove();
        };
        

    onChangeText = event => {
        this.setState({ text: event.target.value });
    };

    onCreateMessage = (event, authUser) => {
        this.props.firebase.messages().push({
            text: this.state.text,
            userId: authUser.uid,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
        });
        this.setState({ text: '' });

        event.preventDefault();
    };

    onEditMessage = (message, text) => {
        const { uid, ...messageSnapshot } = message;
        this.props.firebase.message(message.uid).set({
        ...messageSnapshot,
        text,
        editedAt: this.props.firebase.serverValue.TIMESTAMP,

        });
        };
        

    render() {
        const { text, messages, loading } = this.state;
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        {loading && <div>Loading ...</div>}
                        {messages ? (
                            <MessageList 
                            authUser={authUser}
                            messages={messages} 
                            onEditMessage={this.onEditMessage}
                            onRemoveMessage={this.onRemoveMessage}
                            />
                        ) : (
                                <div>There are no messages ...</div>
                            )}
                        <StyledForm onSubmit={event => this.onCreateMessage(event, authUser)}>
                            <input
                                type="text"
                                value={text}
                                onChange={this.onChangeText}
                                placeholder="write here..."
                            />
                            <Button type="submit" >SEND</Button>
                        </StyledForm>
                    </div>
                )}
            </AuthUserContext.Consumer>
        );
    }
}

const MessageList = ({ authUser, messages, onRemoveMessage, onEditMessage, }) => (

    <ul>
        {messages.map(message => (
            <MessageItem 
            authUser={authUser}
            key={message.uid} 
            message={message} 
            onEditMessage={onEditMessage}
            onRemoveMessage={onRemoveMessage}
            />
        ))} </ul>
);
/* const MessageItem = ({ message, onRemoveMessage }) => ( */
    class MessageItem extends Component {
        constructor(props) {
        super(props);
        this.state = {
        editMode: false,
        editText: this.props.message.text,
        };
    }

    onToggleEditMode = () => {
        this.setState(state => ({
        editMode: !state.editMode,
        editText: this.props.message.text,
        }));
        };

        onChangeEditText = event => {
            this.setState({ editText: event.target.value });
            };
            
        onSaveEditText = () => {
            this.props.onEditMessage(this.props.message, this.state.editText);
            this.setState({ editMode: false });
            };
            
render() {
            const { authUser, message, onRemoveMessage } = this.props;
            const { editMode, editText } = this.state;

return (
    <StyledLi>{editMode ? (
        <input
        type="text"
        value={editText}
        onChange={this.onChangeEditText}
        />
        ) : (
        <span>
        <strong>{message.userId}</strong> {message.text}
        {message.editedAt && <span>(Edited)</span>}
        </span>
        )}
    {authUser.uid === message.userId && (
        <span>
    {editMode ? (
    <span>
        <button onClick={this.onSaveEditText}>Save</button>
        <button onClick={this.onToggleEditMode}>Reset</button>
    </span>
    ) : (
        <button onClick={this.onToggleEditMode}>Edit</button>
    )}
    {!editMode && (
        <button
        type="button"
        onClick={() => onRemoveMessage(message.uid)}
        >Delete</button>
        )}
    </span>
    )}
    </StyledLi>
    );
}
}

    
   /*  ); */
    

const Messages = withFirebase(MessagesBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
