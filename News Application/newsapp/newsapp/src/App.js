


import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News  from './components/News';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,

  Route,
  Routes

} from "react-router-dom"; 

export default class App extends Component {
  pagesize =15;
  render() {
     return (
      <div>
        <Router>
        <NavBar/>
        <Routes>
           
        <Route Exact path="/business" element={<News key="business" pagesize  = {this.pagesize } country='in' category='business'/>}> </Route>
        <Route Exact path="/entertainment"element={<News key="entertainment" pagesize  = {this.pagesize } country='in' category='entertainment'/>}> </Route>
        <Route Exact path="/general"element={<News key="general" pagesize  = {this.pagesize } country='in' category='general'/>}> </Route>
        <Route Exact path="/health"element={<News  key="health" pagesize  = {this.pagesize } country='in' category='health'/>}> </Route>
        <Route Exact path="/science"element={<News key="science" pagesize  = {this.pagesize } country='in' category='science'/>}> </Route>
        <Route Exact path="/sports"element={<News key="sports" pagesize  = {this.pagesize } country='in' category='sports'/>}> </Route>
        <Route Exact path="/technology"element={<News key="technology" pagesize  = {this.pagesize } country='in' category='technology'/>}> </Route>
        </Routes>
        </Router>
      </div>
    )
  }
}
