import React from 'react';

const Alert = (props) => {
    const capitalize=(word)=>{
        if(word==='danger'){
            word='ERROR';
        }
        let lower= word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1).toLowerCase();
    }
  return (
    <div style={{height:'50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
  <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
  {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
   </div>}
   </div> 
  )
}

export default Alert;