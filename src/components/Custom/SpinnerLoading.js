import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import SpinnerPlane from "assets/images/spinner-plane.png"
import Logo from "assets/images/logo-ThanhHoang.png"

const SpinnerLoading = props => {
  return (
    <React.Fragment>
        <div id="overlay-progress" className="overlay">
		    <div className="loading ">
		      <img className="loading__logo" alt="thanhhoang_logo" src={Logo} />
		      <div className="loading__spinner" style={{backgroundImage: `url(${SpinnerPlane})`}}></div>
		      <div className="loading__text" id="loadingAlertText"> Vui lòng đợi trong giây lát</div>
		    </div>
	    </div>
    </React.Fragment>
  )
}

SpinnerLoading.propTypes = {
}

export default SpinnerLoading
