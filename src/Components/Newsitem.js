import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
   let {title,desc,imageurl,newsurl}=this.props;
    return (
      <div>
        <div className="card my-1">
          <img src={imageurl?imageurl:"https://www.livemint.com/lm-img/img/2023/08/04/600x338/TOPSHOT-INDIA-HEALTH-MOSQUITO-0_1691137967755_1691137978991.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
            {desc}...
            </p>
            <a href={newsurl}  rel="noreferrer" className="btn btn-sm  btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
