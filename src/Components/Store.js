import React from 'react'
import io from "socket.io-client";

export const ctx = React.createContext();



const initState = {
    general: [
        {
            from: 'Dami',
            msg: 'Hello World'
        },
        {
            from: 'Dami',
            msg: 'Hello World'
        },
        {
            from: 'Dami',
            msg: 'Hello World'
        },
    ],
    general2: [
        {
            from: 'Dami',
            msg: 'Hello World1'
        },
        {
            from: 'Dami',
            msg: 'Hello World2'
        },
        {
            from: 'Dami',
            msg: 'Hello World3'
        },
    ]
}

function reducer(state, action) {

    const {from, msg, topic} = action.payload;
    switch(action.type) {
        case 'RECEIVE_MESSAGE': 
            return {
                ...state, 
                [topic]: [
                    ...state[topic], 
                    {from, msg}
                ]
            }
        default: 
            return state
    }
}

let socket;

function sendChatAction(value) {
    socket.emit('chat message', value);
}

const Store = (props) => {

    const [allChats, dispatch] = React.useReducer(reducer, initState);

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', function(msg){
            dispatch({type: "RECEIVE_MESSAGE", payload: msg});
        });
    }

    const user = 'Damian' + Math.random(100).toFixed(2);

    return (
        <ctx.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </ctx.Provider>
    )
}

export default Store
