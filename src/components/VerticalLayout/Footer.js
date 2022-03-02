import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © Thành Hoàng.</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
                Phát triển bởi <a href="https://trieudo.net" target="_blank">TRIEUDO Co,. Ltd</a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
