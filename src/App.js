import React from 'react';
import JobFeed from './JobFeed';
import './App.css';
require('dotenv').config()

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={value:null}
}

  render(){
    return(
      <JobFeed/>
    )
  }
}

export default App;
