import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import Search from './Components/Search'

//use "npm start" to launch the app 

export default class App extends React.Component {
  render = function(){
    return (
        <Search/>
    )
  }
}

