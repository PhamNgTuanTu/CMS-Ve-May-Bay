import React, { Component, useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap"
import { titleCase } from "./../../helpers/function/function_helper";
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Welcome from "./Welcome";
import { Link } from "react-router-dom"
import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux";
//import action
import { getChartsData } from "./../../store/actions"
import Chart from "./Chart";
import TopDaiLy from "./Top-Dai-Ly";
import OrderTable from "./Oder-Table";


const initlabel = {
  tab: 'Dashboard'
}
const initSlug = {
  danh_sach: '/'
}
const Dashboard = props => {
  const dispatch = useDispatch()
  const [infoUser, setInfoUser] = useState("Admin")
  const { chartsData } = useSelector(state => ({
    chartsData: state.DashBoard.chartData
  }))

  useEffect(() => {
    if (sessionStorage.getItem("tai_khoan")) {
      const dataUser = JSON.parse(sessionStorage.getItem("tai_khoan"))
      setInfoUser(dataUser)
    }
  }, [])
  const reports = [
    { title: "Số lượng giao dịch", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Số lượng nhân viên", iconClass: "bx bx-user", description: "1,935" },
    {
      title: "Số lượng đại lý",
      iconClass: "bx bx-cuboid",
      description: "1.200.000",
    },
  ]

  const [periodData, setPeriodData] = useState([])
  const [periodType, setPeriodType] = useState("yearly")

  useEffect(() => {
    setPeriodData(chartsData)
  }, [chartsData])

  const onChangeChartPeriod = pType => {
    setPeriodType(pType)
    dispatch(getChartsData(pType))
  }
  useEffect(() => {
    dispatch(getChartsData("yearly"))
  }, [dispatch]);

  return (
    <div className="page-content">
      <MetaTags>
        <title>{process.env.REACT_APP_TITLE}</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs title={initlabel.tab}
          danhsachTitle={titleCase(initlabel.tab)}
          danhsachSlug={initSlug.danh_sach}
          breadcrumbItem={initlabel.tab}
        />
        <Row>
          <Col xl="12" md="12">
            <Row>
              {reports.map((report, key) => (
                <Col md="4" key={"_col_" + key}>
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <Media>
                        <Media body>
                          <p className="text-muted fw-medium">
                            {report.title}
                          </p>
                          <h4 className="mb-0">{report.description}</h4>
                        </Media>
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                          <span className="avatar-title rounded-circle bg-primary">
                            <i
                              className={
                                "bx " + report.iconClass + " font-size-24"
                              }
                            ></i>
                          </span>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
            <Row>
              <Col xl="8">
                <Card className="h-100">
                  <CardBody>
                    <div className="d-sm-flex flex-wrap">
                      <h4 className="card-title mb-4">Giao dịch</h4>
                      <div className="ms-auto">
                        <ul className="nav nav-pills">
                          <li className="nav-item">
                            <Link
                              to="#"
                              className={classNames(
                                { active: periodType === "weekly" },
                                "nav-link"
                              )}
                              onClick={() => {
                                onChangeChartPeriod("weekly")
                              }}
                              id="one_month"
                            >
                              Tuần
                            </Link>{" "}
                          </li>
                          <li className="nav-item">
                            <Link
                              to="#"
                              className={classNames(
                                { active: periodType === "monthly" },
                                "nav-link"
                              )}
                              onClick={() => {
                                onChangeChartPeriod("monthly")
                              }}
                              id="one_month"
                            >
                              Tháng
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="#"
                              className={classNames(
                                { active: periodType === "yearly" },
                                "nav-link"
                              )}
                              onClick={() => {
                                onChangeChartPeriod("yearly")
                              }}
                              id="one_month"
                            >
                              Năm
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <Chart periodData={periodData} />
                  </CardBody>
                </Card>
              </Col>
              <Col xl="4">
                <TopDaiLy />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg="12">
                <OrderTable />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard;
