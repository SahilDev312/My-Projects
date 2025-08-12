import React, { Component } from 'react'

export class NewsItem extends Component {
   
  render() {
    let {title , description , imageurl , newsurl , author , date , source} = this.props
    return (
       
      <div className="card" style={{width: "18rem"}}>
        <div>
       <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" key = {source.id}>
       {source.name}
  </span> 
  
  <img src={!imageurl? "https://readwrite.com/wp-content/uploads/2024/07/pepe-token-price-pulls-back-but-new-pepe-themed-meme-coin-offers-potential-investment-opportunity.jpg":imageurl} className="card-img-top" alt="..."></img>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-body-secondary"> By {!author?"Unkown":author} on {new Date (date).toGMTString()}</small></p>
    <a href={newsurl} className="btn btn-primary">Know More..</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
