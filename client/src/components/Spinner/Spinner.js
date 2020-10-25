import React from 'react';
import './spinner.css';

// import {
//     Spinner as StrapSpinner
// }  from 'reactstrap';

const Spinner = ({gorizont, color = 'dark'})=>{
    let textColor = 'black';

    if(color==='light'){
        textColor = 'white';
    }

    return(
        <div style={{width:'100%', height:'100%'}}>
            <div className={`d-flex justify-content-${gorizont} align-items-center`}>
                {/* <StrapSpinner size="sm" type="grow" color={color} /> */}
                <strong style={{marginLeft:'10px', color:textColor}}>Loading...</strong>
            </div>
        </div>
    );
}

export default Spinner;