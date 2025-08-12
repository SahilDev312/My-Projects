import React, { Component } from 'react'
import NewsItem from './NewsItem'

import Spinner from './Spinner';
import PropTypes from 'prop-types';
export class News extends Component {
   static defaultProps = {
    country: 'in',
    
    category: 'general'
   }
   static propTypes = { 
   country: PropTypes.string,
   pagesize: PropTypes.number,
   category: PropTypes.string
   } 
   
   capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(){
      super();
      this.state = {
          articles:[],
          loading:false,
          page:1
      }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3823ec4fe0564e6aa1f6736745c82261&pagesize=${this.props.pagesize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedata = await data.json()
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles , 
      totalArticles: parsedata.totalResults , 
      loading : false})
  }

  handlePreviousClick=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3823ec4fe0564e6aa1f6736745c82261&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedata = await data.json()
    console.log(parsedata);
    

    this.setState({
      page: this.state.page -1,
      articles: parsedata.articles,
      loading: false
     })
  }

  handleNextClick=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3823ec4fe0564e6aa1f6736745c82261&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedata = await data.json()
    console.log(parsedata);
    

    this.setState({
      page: this.state.page+1,
      articles: parsedata.articles,
      loading: false
    })
  }

  

    
  render() {
    return (
      <div className="container my-4 ">
     <h1 className="text text-center " >NewsNet - Top Headlines from {this.capitalizeFirstLetter (this.props.category)}</h1>
        
     <div className="  text-center">{this.state.loading && <Spinner/>}</div>
        <div className="row my-4 mx-2">
        {this.state.articles.map((element)=>{
            return  <div className="col-md-4" key = {element.url}>
                <NewsItem  title = {element.title?element.title.slice(0 , 60): " "} description = {element.description?element.description.slice(0 , 100):""} imageurl = {element.urlToImage} newsurl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source}/> 
         </div>
        })}
         </div>
         <div className="container">
         <div className="d-flex justify-content-between">
         <button disabled={this.state.page<=1} type="button" className="btn btn-dark"  onClick={this.handlePreviousClick}><p> &laquo; Previous</p></button>
         <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>

         </div>
        
         </div>
      </div>
    )
  }
}

export default News
