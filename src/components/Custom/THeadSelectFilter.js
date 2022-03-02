import PropTypes from "prop-types"
import React, { useEffect, useState, useRef } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import SimpleReactValidator from 'simple-react-validator'
import { Col } from "reactstrap"
import Select from "react-select"
import makeAnimated from "react-select/animated"
const animatedComponents = makeAnimated()

const THeadSelectFilter = props => {
  const label        = props.label
  const selectName   = props.name
  const options      = props.options
  const setParams    = props.onChange
  const placeholder  = props.placeholder
  const isMulti		   = props.isMulti
  const setSelectRef = props.onSetRef
  const innerRef     = useRef()

  useEffect(() => {
    setSelectRef(innerRef)
  }, [])

  return (
    <React.Fragment>  
        <div>
	        <label className="control-label cursor-pointer">
	          {label}
	        </label>
	        <Select
            ref={innerRef}
            isMulti={true}
            placeholder={placeholder}
            onChange={(items) => {
              let array = []
              if(items && items.length > 0) {
                items.map((item, index) => {
                  array.push(item.value.toString());
                  return array 
                })
              }
              setParams(preState => ({ ...preState, [selectName]: array, ['trang']: 1 }))
            }}
            options={options}
            classNamePrefix="select2-selection"
            components={animatedComponents}
            />
      </div>
    </React.Fragment>
  )
}

THeadSelectFilter.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isMulti: PropTypes.bool,
  onSetRef: PropTypes.func
}

export default THeadSelectFilter
