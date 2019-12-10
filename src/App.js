import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
Auth.configure(awsconfig);
API.configure(awsconfig);

function App() {

  const allTodos = API.graphql(graphqlOperation(queries.listTodos));
  console.log(allTodos);

  const oneTodo = API.graphql(graphqlOperation(queries.getTodo, {id:"0342be07-1ce8-4a43-b744-422b4daa210a"}));
  console.log(oneTodo);

Auth.currentAuthenticatedUser({
  bypassCache: false
}).then(function(user){
  console.log("User:" + JSON.stringify(user));
  const todo = {name: user['username'], description: "new todo"};
  const newTodo = API.graphql(graphqlOperation(mutations.createTodo, {input: todo}));
}).catch(err => console.log(err));
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. OK ! Challange 1 
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default  withAuthenticator(App, {includeGreetings: true});
//export default App;
