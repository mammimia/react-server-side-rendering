import React from 'react'
import ReactDOM from 'react-dom'
import { handleModifyAnswerVotes } from '../shared/utility';
import { App } from './App'

//ReactDOM.render(<App />, document.getElementById('app'))

let state = undefined;

fetch("http://localhost:7777/data")
    .then(res => res.json())
    .then(data => {
        state = data;
        render();
    })

function handleVote (answerId, vote) {
    state.answers = handleModifyAnswerVotes(state.answers, answerId, vote);
    fetch(`vote/${answerId}?vote=${vote}`);
    render(); 
};

function render (){
    ReactDOM.hydrate(<App {...state} handleModifyAnswerVotes={handleVote}/>, document.getElementById('app'))
}
