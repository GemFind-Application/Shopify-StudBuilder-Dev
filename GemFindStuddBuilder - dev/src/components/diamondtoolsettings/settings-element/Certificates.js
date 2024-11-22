import React from 'react';
import Checkbox from '@mui/material/Checkbox';

const Certificates = (props) => {
  return (
    <div className='range-slider_diamond'>
      <div className='slider'>
        <h4 className="f_heading diamond_heading">  CERTIFICATES</h4>
        <div className="diamond-ui-slider diamond-small-slider">
        <select name="dropdown-orderby" id="cerfificate" className="cer-sort">
          {/* {props.certificateData.map(item =>
            <option value={`${item.certificateName}`}>{item.certificateName}</option>
          )} */}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Certificates;