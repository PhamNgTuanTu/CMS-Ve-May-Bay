import Breadcrumbs from "components/Common/Breadcrumb"
import THeadInputFilter from "components/Custom/THeadInputFilter"
import THeadSelectFilter from "components/Custom/THeadSelectFilter"
import THeadSort from "components/Custom/THeadSort"
import React, { useEffect, useState } from "react"
import SweetAlert from "react-bootstrap-sweetalert"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
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
import { chapNhanCapNhatTuyenBay, layDSSanBay, layDSTuyenBay, themTuyenBay, xoaTuyenBay } from "./../../store/actions"
import FormThemSuaTuyenBay from "./Form-Them-Sua"


const initlabel = {
  'tab': 'tuyến bay',
  'loc': 'lọc dữ liệu',
  'danh_sach': 'danh sách tuyến bay',
  'danh_sach_rong': 'danh sách rỗng, vui lòng thêm mới!',
  'btn_them_moi': 'thêm mới'
};

const TuyenBay = props => {
  const dispatch = useDispatch()
  const TRANG = 1;
  const SO_DONG_1_TRANG = 25;
  const history = useHistory();
  let { airlines, airport, totalSize, pageIndex, totalPages, hasNext, hasPrev, resApiActionForm } = useSelector(state => ({
    airlines: state.TuyenBay.content,
    airport: state.SanBay.content,
    totalSize: state.TuyenBay.total_records,
    pageIndex: state.TuyenBay.page,
    totalPages: state.TuyenBay.total_pages,
    hasNext: state.TuyenBay.has_next,
    hasPrev: state.TuyenBay.has_prev,
    resApiActionForm: state.TuyenBay.resApiActionForm
  }));
  
  const [params, setParams] = useState({
    trang: TRANG,
    so_luong: SO_DONG_1_TRANG,
    ten_tuyen_bay: [],
    ten_san_bay_di: [],
    ten_san_bay_den: [],
    hai_chieu: [],
    sap_xep: "ten_san_bay_di",
    asc: 1
  })
  const optionTrangThai = [
    {
      options: [
        { label: "Hai chiều", value: 1 },
        { label: "Một chiều", value: 0 },
      ]
    }
  ]
  const [pagination, setPagination] = useState({
    activePage: 1,
    totalItemsCount: 0,
    itemsCountPerPage: 0,
    pageRangeDisplayed: 5,
  })
  const [label, setLabel] = useState(initlabel);
  const [dataList, setDataList] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogDelete, setDialogDelete] = useState(false)
  const [successDialog, setSuccessDialog] = useState(2)
  const [titleDialog, setTitleDialog] = useState("")
  const [descriptionDialog, setDescriptionDialog] = useState("")
  const [sortActive, setSortActive] = useState("san_bay_di")
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)
  const [selectRef, setSelectRef] = useState({})

  // message table null
  const [statusTable, setStatusTable] = useState(false)

  //Chức năng với modalTuyenBay
  const [switchTuyenBay, setSwitchTuyenBay] = useState(false)
  const [modalTuyenBay, setModalTuyenBay] = useState(false)
  const [idEdit, setIdEdit] = useState();
  const [IsAddMode, setIsAddMode] = useState(false);

  //lấy data vào form edit
  const dataEdit = !IsAddMode && airlines.find(x => x.id === +idEdit)

  const initialValues = IsAddMode ? {
    san_bay_di_id: "",
    san_bay_den_id: "",
    hai_chieu: "",
  } : dataEdit;


  const defaultSorted = [
    {
      dataField: "ten_san_bay_di", // if dataField is not match to any column you defined, it will be ignored.
      order: "asc", // desc or asc
    },
  ]

  const listColumns = [
    {
      isDummyField: true,
      text: "id",
      dataField: "id",
      hidden: true,
      formatter: (cellContent, airlines) => <>{airlines.id}</>,
    },
    {
      dataField: "ten",
      isDummyField: true,
      text: "",
      formatter: (cellContent, airlines) => (
        <>
          <div className="text-truncate mb-0">
            {airlines.ten}
          </div>
        </>
      ),
      headerFormatter: (column, colIndex, components) => (
        <>
          <THeadSort
            label="Tên tuyến bay"
            name="ten_tuyen_bay"
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
      dataField: "san_bay_di",
      isDummyField: true,
      text: "",
      formatter: (cellContent, airlines) => (
        <>
          <div className="text-truncate mb-0">
            {airlines.ten_tat}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            onSort={setParams}
            label="Sân bay đi"
            name="ten_san_bay_di"
            active={sortActive}
            onActive={setSortActive}
          >
          </THeadSort>
        </>
      ),
      headerClasses: 'table-light'
    },
    {
      dataField: "san_bay_den",
      isDummyField: true,
      text: "",
      formatter: (cellContent, airlines) => (
        <>
          <div className="text-truncate mb-0">
            {airlines.ten_tat_1}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            onSort={setParams}
            label="Sân bay đến"
            name="ten_san_bay_den"
            active={sortActive}
            onActive={setSortActive}
          >
          </THeadSort>
        </>
      ),
      headerClasses: 'table-light'
    },
    {
      dataField: "hai_chieu",
      isDummyField: true,
      text: "",
      formatter: (cellContent, airlines) => (
        <>
          <div className="text-truncate mb-0">
            {airlines.hai_chieu === true ? "Hai chiều" : "Một chiều"}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            label="Tuyến bay"
            name="hai_chieu"
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
      formatter: (cellContent, airlines) => (
        <div className="d-flex gap-2">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleUpdate(airlines.id)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => handleDeleteAirline(airlines)}
            ></i>
          </Link>
        </div>
      ),
      headerFormatter: () => (
        <>
          <label className="control-label cursor-pointer w-100" >
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

  //Update airline If action(call ...api)
  useEffect(() => {
    JSON.stringify(resApiActionForm) !== "{}" ?
      setParams(preState => ({ ...preState, ['trang']: pageIndex, ['so_luong']: SO_DONG_1_TRANG }))
      : null
  }, [resApiActionForm.id])

  //Call api lần đầu, update state nếu !params
  useEffect(() => {
    dispatch(layDSSanBay());
    dispatch(layDSTuyenBay(params));
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
        modalTuyenBay ? setModalTuyenBay(!modalTuyenBay) : null // nếu đang mở modalTuyenBay
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
  }, [dispatch, airlines])

  const handleDeleteAirline = airline => {
    //console.log(airline)
    setDataList({
      id: airline.id,
      ten: airline.ten,
      san_bay_di: airline.ten_1,
      san_bay_den: airline.ten_2
    })
    setOpenDialog(true)
    setDialogDelete(true)
    setTitleDialog("Thông báo")
    setDescriptionDialog("Bạn muốn xóa tuyến bay " + airline.ten + " ?")
  }

  const handleDeleteAirlineAccept = () => {
    var requestContent = {
      params: {
        id: Number(dataList.id)
      },
      body: {
        xac_nhan: "y"
      }
    }
    dispatch(xoaTuyenBay(requestContent));
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
      ten_tuyen_bay: [],
      ten_san_bay_di: [],
      ten_san_bay_den: [],
      hai_chieu: [],
      sap_xep: "ten_san_bay_di",
      asc: 1
    })
    //clearSelected()
  }

  //chức năng thêm
  const handleThemMoi = () => {
    setModalTuyenBay(true)
    setIsAddMode(true);
  }

  //chức năng edit
  const handleUpdate = (id) => {
    setIdEdit(id);
    setIsAddMode(false);
    setModalTuyenBay(true);
  }

  //submit form
  const handleSubmitForm = (values, { setSubmitting }) => {
    if (IsAddMode) {
      dispatch(themTuyenBay(values))
    } else {
      const capNhatTuyenBay = {
        params: {
          id: Number(idEdit)
        },
        body: values,
      }
      dispatch(chapNhanCapNhatTuyenBay(capNhatTuyenBay))
    }
    setSubmitting(false)
  }

  return (
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
                      <Col sm={12} xs={12}>
                        <CardTitle>{titleCase(label.loc)}</CardTitle>
                      </Col>

                      <Col sm="12" className="mt-2">
                        <Row className="mt-2">
                          <Col sm="6">
                            <THeadInputFilter
                              label="Tên tuyến bay"
                              name="ten_tuyen_bay"
                              placeholder="Nhập tên tuyến bay..."
                              values={params.ten_tuyen_bay}
                              onChange={setParams}
                            >
                            </THeadInputFilter>
                          </Col>
                          <Col sm="6">
                          <THeadSelectFilter
                              label="Tuyến bay"
                              name="hai_chieu"
                              placeholder="Chọn tuyến bay..."
                              options={optionTrangThai}
                              onChange={setParams}
                              isMulti={true}
                              onSetRef={setSelectRef}
                            >
                            </THeadSelectFilter>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col sm="6">
                          <THeadInputFilter
                              label="Sân bay đi"
                              name="ten_san_bay_di"
                              placeholder="Nhập tên sân bay đi..."
                              values={params.ten_san_bay_di}
                              onChange={setParams}
                            >
                            </THeadInputFilter>
                            
                          </Col>
                          <Col sm="6">
                          <THeadInputFilter
                              label="Sân bay đến"
                              name="ten_san_bay_den"
                              placeholder="Nhập tên sân bay đến..."
                              values={params.ten_san_bay_den}
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
                  data={airlines}
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
                              {airlines.length > 0 ?
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
                                      <th>Sân bay đi</th>
                                      <th>Sân bay đến</th>
                                      <th>Tuyến bay</th>
                                      <th>Chức năng</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td colSpan="7">
                                        <p className="text-center">{statusTable ? "Không tìm thấy tuyến bay cho bộ lộc của bạn." : "Không tìm thấy dữ liệu."}</p>
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
                                    confirmBtnBsStyle="success"
                                    showCloseButton={false}
                                    showConfirm={false}
                                    onCancel={() => {
                                      setSuccessDialog(false)
                                    }}
                                    onConfirm={() => {
                                      setSuccessDialog(2)
                                    }}
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
                                    onConfirm={dialogDelete == true ? handleDeleteAirlineAccept : null}
                                    onCancel={() => {
                                      setOpenDialog(false)
                                    }}
                                  >
                                    {descriptionDialog}
                                    <br></br>
                                    {dialogDelete ? "Không thể hoàn tác nếu chấp nhận!" : ""}
                                  </SweetAlert>
                                ) : null}
                              </Col>
                            </div>
                          </div>
                        </Col>
                      </Row>



                      {pagination.itemsCountPerPage > 0 &&
                        <Row className="align-items-md-center mt-30">
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

      <FormThemSuaTuyenBay
        initialValues={initialValues}
        setModalTuyenBay={setModalTuyenBay}
        modalTuyenBay={modalTuyenBay}
        optionsSanBay={airport}
        setSwitchTuyenBay={setSwitchTuyenBay}
        switchTuyenBay={switchTuyenBay}
        onSubmit={handleSubmitForm}
        dataEdit={dataEdit}
        IsAddMode={IsAddMode}
      />
    </div>
  )
}

export default withRouter(TuyenBay)
