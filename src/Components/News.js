import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import propTypes from 'prop-types'


export default class News extends Component {

  static defaultProps={
   country:'in',
   pageSize:6,
  category:'general'
}

  static propTypes={
    country:propTypes.string,
    pageSize:propTypes.number,
    category:propTypes.string
  }
  capatalize(string){
    return string.charAt(0).toUpperCase()+ string.slice(1)
      }
  constructor(props){
    super(props);
    this.state={
        articles:[],
        loading:false,
        page:1
    }
    document.title=`${this.capatalize(this.props.category)} - NewsMonkey`;
  }
   
 

  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca3ff15842934b96b528cd5cb762ac62&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data= await fetch(url)
    
    let parsedata= await data.json();
    console.log(parsedata);
    this.setState({articles:parsedata.articles,
    loading:false})

  }

  handlenext= async()=>{
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/20)))
    {
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca3ff15842934b96b528cd5cb762ac62&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    this.setState({
      loading:true
    })
    let data= await fetch(url)
    let parsedata= await data.json();
    console.log(parsedata);
   
    this.setState({
      page:this.state.page+1,
      articles:parsedata.articles,
      totalResults:parsedata.totalResults,
      loading:false
    })
  }
}

  handleprev=async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca3ff15842934b96b528cd5cb762ac62&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data= await fetch(url)
    let parsedata= await data.json();
  
    console.log(parsedata);
 
    this.setState({
      page:this.state.page-1,
      articles:parsedata.articles,
      loading:false
    })
  }
  
  render() {
   
    return (
      <div>
        <h2 className='text-center my-3'>NewsMonkey-Top Headlines from {this.capatalize(this.props.category)}</h2>
        {this.state.loading && <Spinner/>}
       <div className="container my-3">
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
             <Newsitem title={element.title?element.title.slice(0,45):""} desc={element.content?element.content.slice(0,88):""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}/>
            </div>
            })

          
    }
        <div className="container d-flex justify-content-between my-2">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={()=>this.handleprev()}>&larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={()=>this.handlenext()}>Next &rarr;</button>
        </div>
        </div>
        </div>
      </div>
    )
  }
}
