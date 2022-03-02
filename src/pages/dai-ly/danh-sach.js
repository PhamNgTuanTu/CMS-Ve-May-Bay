import Breadcrumbs from "components/Common/Breadcrumb"
import THeadInputFilter from "components/Custom/THeadInputFilter"
import THeadSort from "components/Custom/THeadSort"
import React, { useEffect, useState } from "react"
import SweetAlert from "react-bootstrap-sweetalert"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import MetaTags from "react-meta-tags"
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, withRouter } from "react-router-dom"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {
  Button, Card, CardBody, CardTitle, Col,
  Container,
  Row
} from "reactstrap"
import "toastr/build/toastr.min.css"
import { titleCase } from "./../../helpers/function/function_helper"
// Xử lý event
import { layDSDaiLy, xoaDaiLy } from "./../../store/actions"


const initlabel = {
  'tab': 'đại lý',
  'loc': 'lọc dữ liệu',
  'danh_sach': 'danh sách đại lý',
  'danh_sach_rong': 'danh sách rỗng, vui lòng thêm mới!',
  'btn_them_moi': 'thêm mới'
};

const initSlug = {
  'them_moi': '/dai-ly/them-moi',
  'cap_nhap': '/dai-ly/cap-nhat/'
}

const DaiLy = props => {
  const dispatch = useDispatch()
  const TRANG = 1;
  const SO_DONG_1_TRANG = 25;
  const history = useHistory();
  let { agencies, totalSize, pageIndex, totalPages, hasNext, hasPrev, resApiActionForm } = useSelector(state => ({
    agencies: state.DaiLy.content,
    totalSize: state.DaiLy.total_records,
    pageIndex: state.DaiLy.page,
    totalPages: state.DaiLy.total_pages,
    hasNext: state.DaiLy.has_next,
    hasPrev: state.DaiLy.has_prev,
    resApiActionForm: state.DaiLy.resApiActionForm
  }));
  const [params, setParams] = useState({
    trang: TRANG,
    so_luong: SO_DONG_1_TRANG,
    ten: [],
    ma_dai_ly: [],
    ten_nguoi_dai_dien: [],
    ten_dang_nhap: [],
    dien_thoai: [],
    email: [],
    sap_xep: "ten",
    asc: 1
  })
  const [pagination, setPagination] = useState({
    activePage: 1,
    totalItemsCount: 0,
    itemsCountPerPage: 0,
    pageRangeDisplayed: 5,
  })
  const [label, setLabel] = useState(initlabel);
  const [slug, setSlugl] = useState(initSlug);
  const [dataList, setDataList] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogDelete, setDialogDelete] = useState(false)
  const [successDialog, setSuccessDialog] = useState(2)
  const [titleDialog, setTitleDialog] = useState("")
  const [descriptionDialog, setDescriptionDialog] = useState("")
  const [sortActive, setSortActive] = useState("ten")
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)

  // message table null
  const [statusTable, setStatusTable] = useState(false)

  const defaultSorted = [
    {
      dataField: "ten ", // if dataField is not match to any column you defined, it will be ignored.
      order: "asc", // desc or asc
    },
  ]

  const listColumns = [
    {
      isDummyField: true,
      text: "id",
      dataField: "id",
      hidden: true,
      formatter: (cellContent, agency) => <>{agency.id}</>,
    },
    {
      dataField: "ten",
      isDummyField: true,
      text: "",
      formatter: (cellContent, agency) => (
        <>
          <div className="text-truncate mb-0">
            <Link to={'/dai-ly/cap-nhat/' + agency.id} className="text-dark">
              {agency.ten}
            </Link>
          </div>
        </>
      ),
      headerFormatter: (column, colIndex, components) => (
        <>
          <THeadSort
            label="Tên đại lý"
            name="ten"
            onSort={setParams}
            sortDefault={true}
            asc={true}
            active={sortActive}
            onActive={setSortActive}
          >
          </THeadSort>
        </>
      ),
      headerClasses: 'table-light'
    },
    {
      dataField: "ma_dai_ly",
      isDummyField: true,
      text: "",
      formatter: (cellContent, agency) => (
        <>
          <div className="text-truncate mb-0">
            {agency.ma_dai_ly}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            onSort={setParams}
            label="Mã đại lý"
            name="ma_dai_ly"
            active={sortActive}
            onActive={setSortActive}
          >
          </THeadSort>
        </>
      ),
      headerClasses: 'table-light'
    },
    {
      dataField: "ten_nguoi_dai_dien",
      text: "Tên người đại diện",
      isDummyField: true,
      formatter: (cellContent, agency) => (
        <>
          <div className="text-truncate mb-0" style={{ maxWidth: "12rem" }}>
            {agency.nhan_vien_dai_ly["ho_ten"]}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            label="Tên người đại diên"
            name="ten_nguoi_dai_dien"
            onSort={setParams}
            active={sortActive}
            onActive={setSortActive}
          >
          </THeadSort>
        </>
      ),
      headerClasses: 'table-light'
    },
    {
      dataField: "Tài khoản",
      isDummyField: true,
      text: "",
      formatter: (cellContent, agency) => (
        <>
          <div className="text-truncate mb-0">
            {agency.nhan_vien_dai_ly["ten_dang_nhap"]}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            label="Tên đăng nhập"
            name="ten_dang_nhap"
            onSort={setParams}
            active={sortActive}
            onActive={setSortActive}
          >
          </THeadSort>
        </>
      ),
      headerClasses: 'table-light'
    },
    {
      dataField: "Email",
      isDummyField: true,
      text: "",
      formatter: (cellContent, agency) => (
        <>
          <div className="text-truncate mb-0" style={{ minWidth: "12rem" }}>
            {agency.nhan_vien_dai_ly["email"]}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            label="Email"
            name="email"
            onSort={setParams}
            active={sortActive}
            onActive={setSortActive}
          >
          </THeadSort>
        </>
      ),
      headerClasses: 'table-light'
    },
    {
      dataField: "Điện thoại",
      isDummyField: true,
      text: "",
      formatter: (cellContent, agency) => (
        <>
          <div className="text-truncate mb-0">
            {agency.nhan_vien_dai_ly["dien_thoai"]}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            label="Điện thoại"
            name="dien_thoai"
            onSort={setParams}
            active={sortActive}
            onActive={setSortActive}
          >
          </THeadSort>
        </>
      ),
      headerClasses: 'table-light'
    },
    {
      dataField: "menu",
      isDummyField: true,
      text: "Chức năng",
      editable: false,
      formatter: (cellContent, agency) => (
        <div className="d-flex justify-content-center align-items-center">
          <Link className="text-success" to={slug.cap_nhap + agency.id}>
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => handleDeleteAgency(agency)}
            ></i>
          </Link>
        </div>
      ),
      headerFormatter: () => (
        <>
          <label className="control-label cursor-pointer" >
            Chức năng
          </label>
        </>
      ),
      headerClasses: 'table-light'
    },
  ]

  //Mặc định không có respone api 
  useEffect(() => {
    resApiActionForm = {}
  }, [])

  //Update agency If action(call ...api)
  useEffect(() => {
    JSON.stringify(resApiActionForm) !== "{}" ?
      setParams(preState => ({ ...preState, ['trang']: pageIndex, ['so_luong']: SO_DONG_1_TRANG }))
      : null
  }, [resApiActionForm.id])

  //Call api lần đầu, update state nếu !params
  useEffect(() => {
    dispatch(layDSDaiLy(params));
    // thông báo rỗng khi không có data
    for (const key in params) {
      if (params[key].constructor === Array) {
        if (params[key].length > 0) {
          setStatusTable(true)
          break;
        } else {
          setStatusTable(false)
        }
      }
    }
  }, [params])

  //Show dialog 
  useEffect(() => {
    if (JSON.stringify(resApiActionForm) !== "{}") {
      if (resApiActionForm.status === 200) {
        setSuccessDialog(1)
        setTitleDialog('Thông báo')
        setDescriptionDialog(resApiActionForm.message)
      } else if (resApiActionForm.status === 400) {
        setSuccessDialog(0)
        setDescriptionDialog(resApiActionForm.message)
      }
    }
  }, [resApiActionForm.id])

  useEffect(() => {
    setPagination(preState => ({
      ...preState,
      ['activePage']: pageIndex,
      ['totalItemsCount']: totalSize,
      ['itemsCountPerPage']: totalPages
    }))
    showToTal()
  }, [dispatch, agencies])

  //Thêm mới chuyển trang
  const handleThemMoi = () => {
    history.push(slug.them_moi);
  }

  const handleDeleteAgency = agency => {
    setDataList({
      id: agency.id,
      ten: agency.ten,
      ma_dai_ly: agency.ma_dai_ly,
      ten_nguoi_dai_dien: agency.ten_nguoi_dai_dien,
      ten_dang_nhap: agency.ten_dang_nhap,
      dien_thoai: agency.dien_thoai,
      email: agency.email
    })
    setOpenDialog(true)
    setDialogDelete(true)
    setTitleDialog("Thông báo")
    setDescriptionDialog("Bạn muốn xóa đại lý và tất cả nhân viên thuộc đại lý có mã là " + agency.ma_dai_ly + " không?")
  }

  const handleDeleteAgencyAccept = () => {
    var requestContent = {
      params: {
        id: Number(dataList.id)
      },
      body: {
        xac_nhan: "y"
      }
    }
    dispatch(xoaDaiLy(requestContent));
    var message = `Đã xóa ${initlabel.tab} ${dataList.ten}`
    setDescriptionDialog(message) //thông báo thành công
    setOpenDialog(false)
  }

  const handlePageChange = (page) => {
    //index bắt đầu = 0
    pageIndex = page.selected;
    setParams(preState => ({ ...preState, ['trang']: pageIndex + 1, ['so_luong']: SO_DONG_1_TRANG }));
  }

  const showToTal = () => {
    var from = (pageIndex - 1) * SO_DONG_1_TRANG;
    var to = (pageIndex) * SO_DONG_1_TRANG;
    from === 0 ? setFrom(1) : setFrom((pageIndex - 1) * SO_DONG_1_TRANG)
    to >= totalSize ? setTo(totalSize) : setTo((pageIndex) * SO_DONG_1_TRANG)
  }

  const handleResetFilter = () => {
    setParams({
      trang: TRANG,
      so_luong: SO_DONG_1_TRANG,
      ten: [],
      ma_dai_ly: [],
      ten_nguoi_dai_dien: [],
      ten_dang_nhap: [],
      dien_thoai: [],
      email: [],
      sap_xep: "ten_nguoi_dai_dien",
      asc: 1
    })
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>{process.env.REACT_APP_TITLE}</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title={label.tab} />
          <Row>
            <Col>
              <div className="custom-card-bgr">
                <div className="custom-card">
                  <Card>
                    <CardBody>
                      <Row className="mb-2">
                        <Col sm="12" xs="12">
                          <CardTitle>{titleCase(label.loc)}</CardTitle>
                        </Col>
                        <Col sm="12" className="mt-2">
                          <Row className="mt-2">
                            <Col sm="6">
                              <THeadInputFilter
                                label="Tên đại lý"
                                name="ten"
                                placeholder="Nhập tên đại lý..."
                                values={params.ten}
                                onChange={setParams}
                              >
                              </THeadInputFilter>
                            </Col>
                            <Col sm="6">
                              <THeadInputFilter
                                label="Mã đại lý"
                                name="ma_dai_ly"
                                placeholder="Nhập mã đại lý..."
                                values={params.ma_dai_ly}
                                onChange={setParams}
                              >
                              </THeadInputFilter>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col sm="6">
                              <THeadInputFilter
                                label="Tên người đại diện"
                                name="ten_nguoi_dai_dien"
                                placeholder="Nhập tên người đại diện..."
                                values={params.ten_nguoi_dai_dien}
                                onChange={setParams}
                              >
                              </THeadInputFilter>
                            </Col>
                            <Col sm="6">
                              <THeadInputFilter
                                label="Tên đăng nhập"
                                name="ten_dang_nhap"
                                placeholder="Nhập tên đăng nhập..."
                                values={params.ten_dang_nhap}
                                onChange={setParams}
                              >
                              </THeadInputFilter>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col sm="6">
                              <THeadInputFilter
                                label="Điện thoại"
                                name="dien_thoai"
                                placeholder="Nhập số điện thoại..."
                                values={params.dien_thoai}
                                onChange={setParams}
                              >
                              </THeadInputFilter>
                            </Col>
                            <Col sm="6">
                              <THeadInputFilter
                                label="Email"
                                name="email"
                                placeholder="Nhập email..."
                                values={params.email}
                                onChange={setParams}
                              >
                              </THeadInputFilter>
                            </Col>
                          </Row>
                        </Col>
                        <div className="d-flex flex-wrap gap-2 fix-button-footer mt-4">
                          <Button type="reset" color="primary" outline onClick={handleResetFilter}>
                            <i className="bx bx-reset me-1" />
                            Tìm kiếm khác
                          </Button>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Col>
            <Col lg="12">
              <Card>
                <CardBody>
                  <ToolkitProvider
                    keyField="id"
                    data={agencies}
                    columns={listColumns}
                    bootstrap4
                    search
                  >
                    {toolkitProps => (
                      <React.Fragment>
                        <Row className="mb-4">
                          <Col sm="8" xs="7">
                            <CardTitle>{titleCase(label.danh_sach)}</CardTitle>
                          </Col>
                          <Col sm="4" xs="5">
                            <div className="text-sm-end">
                              <Button
                                color="primary"
                                className="font-16 btn-block btn btn-primary"
                                onClick={handleThemMoi}
                              >
                                <i className="mdi mdi-plus-circle-outline me-1" />
                                {titleCase(label.btn_them_moi)}
                              </Button>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col xl="12">
                            <div className="table-rep-plugin">
                              <div className="table-responsive" data-pattern="priority-columns">
                                {agencies.length > 0 ?
                                  <BootstrapTable
                                    {...toolkitProps.baseProps}
                                    defaultSorted={defaultSorted}
                                    classes={
                                      "table table-bordered"
                                    }
                                    bordered={false}
                                    striped={false}
                                    responsive
                                  /> :
                                  <table className="table table-bordered">
                                    <thead className="table-light" >
                                      <tr>
                                        <th>Tên đại lý</th>
                                        <th>Mã đại lý</th>
                                        <th>Tên người đại diện</th>
                                        <th>Tài khoản</th>
                                        <th>Email</th>
                                        <th>Điện thoại</th>
                                        <th>Chức năng</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td colSpan="7">
                                          <p className="text-center">{statusTable ? "Không tìm thấy đại lý cho bộ lộc của bạn." : "Không tìm thấy dữ liệu."}</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                }
                                <Col xl="3" lg="4" sm="6" className="mb-2">
                                  {
                                    successDialog === 1 &&
                                    <SweetAlert
                                      success
                                      title={titleDialog}
                                      timeout={1100}
                                      showCloseButton={false}
                                      showConfirm={false}
                                      onConfirm={() => {
                                        setSuccessDialog(2)
                                      }}
                                    >
                                      {descriptionDialog}
                                    </SweetAlert>
                                  }
                                  {
                                    successDialog === 0 &&
                                    <SweetAlert
                                      error
                                      title="Thông báo"
                                      timeout={2000}
                                      showConfirm={false}
                                      showCancel={false}
                                      onConfirm={() => {
                                        setSuccessDialog(2)
                                      }}
                                      onCancel={this.hideAlert}
                                    >
                                      {descriptionDialog}
                                    </SweetAlert>
                                  }
                                  {openDialog ? (
                                    <SweetAlert
                                      title={titleDialog}
                                      warning
                                      showCancel
                                      confirmBtnBsStyle="success"
                                      cancelBtnBsStyle="danger"
                                      confirmBtnText="Chấp nhận"
                                      cancelBtnText="Từ chối"
                                      onConfirm={dialogDelete == true ? handleDeleteAgencyAccept : null}
                                      onCancel={() => {
                                        setOpenDialog(false)
                                      }}
                                    >
                                      {descriptionDialog}
                                    </SweetAlert>
                                  ) : null}
                                </Col>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        {pagination.itemsCountPerPage > 0 &&
                          <Row className="align-items-md-center mt-4">
                            <Col sm={6} xs={12} className="mb-2">
                              <label className="control-label opc-7">
                                {from === to ? ("Hiển thị " + to + " trên tổng " + pagination.totalItemsCount + " dòng") :
                                  ("Hiển thị " + from + " đến " + to + " trên tổng " + pagination.totalItemsCount + " dòng")}
                              </label>
                            </Col>
                            <Col sm={6} xs={12} className="pagination pagination-rounded justify-content-end fix-rs-pag">
                              <ReactPaginate
                                pageCount={pagination.itemsCountPerPage}
                                forcePage={pagination.activePage - 1}
                                onPageChange={handlePageChange}
                                disabledClassName="disabled"
                                previousLabel="<"
                                nextLabel=">"
                                breakLabel="..."
                                breakClassName="break-me"
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                subContainerClassName="pages pagination"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                activeClassName="active"
                              />
                            </Col>
                          </Row>
                        }
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(DaiLy)
