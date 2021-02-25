import React from 'react'

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

const Store = (props) => {

    const reducerHook = React.useReducer(reducer, initState);

    return (
        <ctx.Provider value={reducerHook}>
            {props.children}
        </ctx.Provider>
    )
}

export default Store
