import React from 'react'
const data=[{
  
    book:"Book Path",
    description:"Description",
    author:"Author",
  }];
function ThirdYear() {
    return (
        <div>
        
        <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
       <tbody>
        {data?.map((d,key)=>{
                        return(
                          <tr>
                      
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

export default ThirdYear