import React from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"

const Breadcrumb = props => {
  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-0 font-size-18">{props.title}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              {
                props.danhsachSlug &&
                <BreadcrumbItem>
                <Link to={props.danhsachSlug}>{props.danhsachTitle}</Link>
                </BreadcrumbItem>
              }
              { 
                props.breadcrumbItem &&
                <BreadcrumbItem active>
                {props.breadcrumbItem}
                </BreadcrumbItem>
              }
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
  danhsachTitle: PropTypes.string,
  danhsachSlug : PropTypes.string
}

export default Breadcrumb
