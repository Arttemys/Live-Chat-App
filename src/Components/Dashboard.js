import React, { useState } from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import {ctx} from './Store';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginRight: '20px',
    marginLeft: '20px',
    textTransform: 'capitalize',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  text:{
    marginBottom: '15px',
    marginLeft: '20px',
    '& > *': {
      margin: theme.spacing(1),
      width: 'auto',
    },
  },
}));


const Dashboard = () => {

  const classes = useStyles();

  //Context Store
  const {allChats, sendChatAction, user} = React.useContext(ctx);

  const topics = Object.keys(allChats);

  // console.log(topics);

  // Local State
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [textValue, setTextValue] = useState('');
    
    return (
        <div className="dash-cotainer">
            <h1>Chat App</h1>
            <div>
              <h3>{activeTopic}</h3>
            </div>
            <div className="flexcontainer">
              <div className="topic-window">
                <List>
                    {
                      topics.map(topic => (
                          <ListItem onClick={ e => setActiveTopic(e.target.innerText)} key={topic} button>
                             <ListItemText primary={topic} />
                          </ListItem>
                      ))
                    }
                </List>
              </div>
              <div className="chat-window">
                    {
                      allChats[activeTopic].map((chat, i) => (
                          <div className="flexcontainer" key={i}>
                             <Chip label={chat.from} className={classes.root}/>
                              <Typography variant='body2'>{chat.msg}</Typography>
                          </div>
                          
                      ))
                    }
              </div>
            </div>
            <div className="flexcontainer">
            <form className={classes.text} noValidate autoComplete="off">
            <TextField id="standard-basic" 
                       label="Message Here" 
                       value={textValue}
                       onChange={ e => setTextValue(e.target.value)}/>
             </form>
            <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  // endIcon={<Icon></Icon>}
                  onClick={() => {
                    sendChatAction({from: user, msg: textValue, topic: activeTopic});
                    setTextValue('');
                  }}
                  >
                  Send
            </Button>
            </div>
        </div>
    )
}

export default Dashboard
