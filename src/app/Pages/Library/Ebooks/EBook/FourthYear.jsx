import React from 'react'
const data=[{
    img:"",
    book:"Book Path",
    description:"Description",
    author:"Author",
  }];
function FourthYear() {
    return (
        <div>
        
        <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
       <tbody>
        {data?.map((d,key)=>{
                        return(
                          <tr>
                            <img src={d.img}></img>
                            <a>{d.book}</a>
                            <tr className="card-title">{d.description}</tr>
                            <tr  className="card-text">{d.author}</tr>
                          </tr>
                        );
                      })}
                      </tbody>
        </div>
      </div>
    </div>
    
    
    
        </div>
      )
}

export default FourthYear