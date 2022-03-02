import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"

import { Button, Card, CardBody, Col, Row, Badge } from "reactstrap"
import { getOrders as onGetOrders } from "store/actions"

// import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"

//redux
import { useSelector, useDispatch } from "react-redux"

const OrderTable = props => {
  const dispatch = useDispatch()

  const { orders } = useSelector(state => ({
    orders: state.DashBoard.orders,
  }))

  useEffect(() => {
    dispatch(onGetOrders())
  }, [dispatch]);

  const selectRow = {
    mode: "checkbox",
  }

  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [orderList, setOrderList] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: orders.length, // replace later with size(orders),
    custom: true,
  }
  const { SearchBar } = Search

  const toggleViewModal = () => setModal1(!modal1)

  const EcommerceOrderColumns = toggleModal => [
    {
      dataField: "orderId",
      text: "PNR",
      sort: true,
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {row.orderId}
        </Link>
      ),
    },
    {
      dataField: "billingName",
      text: "Tên khách hàng",
      sort: true,
    },
    {
      dataField: "so_ghe",
      text: "Số ghế",
      sort: true,
    },
    {
      dataField: "nhan_vien",
      text: "Nhân viên",
      sort: true,
    },
    {
      dataField: "dai_ly",
      text: "Đại lý",
      sort: true,
    },
    {
      dataField: "total",
      text: "Tổng tiền",
      sort: true,
    },
    {
      dataField: "paymentStatus",
      text: "Trạng thái thanh toán",
      sort: true,
      formatter: (cellContent, row) => (
        <Badge
          className={"font-size-12 badge-soft-" + row.badgeclass}
          color={row.badgeClass}
          pill
        >
          {row.paymentStatus}
        </Badge>
      ),
    },
    {
      dataField: "orderdate",
      text: "Ngày đặt vé",
      sort: true,
    },
    {
      dataField: "view",
      isDummyField: true,
      text: "Chức năng",
      sort: true,
      formatter: () => (
        <Button
          type="button"
          color="primary"
          className="btn-sm btn-rounded"
          onClick={toggleViewModal}
        >
         Xem chi tiết
        </Button>
      ),
    },
  ]

  useEffect(() => {
    if (orders && !orders.length) {
      onGetOrders()
    }
  }, [onGetOrders, orders])

  useEffect(() => {
    setOrderList(orders)
  }, [orders])

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders)
      setIsEdit(false)
    }
  }, [orders])

  const toggle = () => {
    setModal(!modal)
  }

  const toLowerCase1 = str => {
    return str.toLowerCase()
  }

  const defaultSorted = [
    {
      dataField: "orderId",
      order: "desc",
    },
  ]

  return (
    <React.Fragment>
      {/* <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} /> */}
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title">Giao dịch gần nhất</div>
          <PaginationProvider
            pagination={paginationFactory(pageOptions)}
            keyField="id"
            columns={EcommerceOrderColumns(toggle)}
            data={orders}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider
                keyField="id"
                data={orders}
                columns={EcommerceOrderColumns(toggle)}
                bootstrap4
                search
              >
                {toolkitProps => (
                  <React.Fragment>
                    <Row>
                      <Col xl="12">
                        <div className="table-responsive">
                          <BootstrapTable
                            keyField="id"
                            responsive
                            bordered={false}
                            striped={false}
                            defaultSorted={defaultSorted}
                            selectRow={selectRow}
                            classes={
                              "table align-middle table-nowrap table-check"
                            }
                            headerWrapperClasses={"table-light"}
                            {...toolkitProps.baseProps}
                            {...paginationTableProps}
                          />
                        </div>
                      </Col>
                    </Row>
                  </React.Fragment>
                )}
              </ToolkitProvider>
            )}
          </PaginationProvider>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

OrderTable.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(OrderTable)
