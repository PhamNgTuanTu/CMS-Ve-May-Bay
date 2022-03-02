import Breadcrumbs from "components/Common/Breadcrumb"
import THeadInputFilter from "components/Custom/THeadInputFilter"
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
import { chapNhanCapNhatHangBay, layDSHangBay, themHangBay, xoaHangBay, themLogo } from "./../../store/actions"
import FormThemSuaHangBay from "./Form-Them-Sua"
import { postThemMoiLogo } from "../../helpers/backend_helper"


const initlabel = {
  'tab': 'hãng bay',
  'loc': 'lọc dữ liệu',
  'danh_sach': 'danh sách hãng bay',
  'danh_sach_rong': 'danh sách rỗng, vui lòng thêm mới!',
  'btn_them_moi': 'thêm mới'
};

const HangBay = props => {
  const dispatch = useDispatch()
  const TRANG = 1;
  const SO_DONG_1_TRANG = 25;
  const history = useHistory();
  let { airlines, totalSize, pageIndex, totalPages, hasNext, hasPrev, resApiActionForm } = useSelector(state => ({
    airlines: state.HangBay.content,
    totalSize: state.HangBay.total_records,
    pageIndex: state.HangBay.page,
    totalPages: state.HangBay.total_pages,
    hasNext: state.HangBay.has_next,
    hasPrev: state.HangBay.has_prev,
    resApiActionForm: state.HangBay.resApiActionForm,
  }));
  const [params, setParams] = useState({
    trang: TRANG,
    so_luong: SO_DONG_1_TRANG,
    ten_hang_bay: [],
    ma_hang_bay: [],
    sap_xep: "ten_hang_bay",
    asc: 1
  })
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
  const [sortActive, setSortActive] = useState("ten_hang_bay")
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)

  //Chức năng với modal
  const [modal, setModal] = useState(false)
  const [idEdit, setIdEdit] = useState();
  const [IsAddMode, setIsAddMode] = useState(false);
  const [imgString, setImgString] = useState("");


  // message table null
  const [statusTable, setStatusTable] = useState(false)

  //lấy data vào form edit
  const dataEdit = !IsAddMode && airlines.find(x => x.id === +idEdit)

  // giá trị mặc định form
  const initialValues = IsAddMode ? {
    ten_hang_bay: "",
    ma_hang_bay: "",
    logo: "",
  } : {
    ten_hang_bay: dataEdit && dataEdit.ten,
    ma_hang_bay: dataEdit && dataEdit.ten_tat,
    logo: dataEdit && dataEdit.logo,
  };

  const defaultSorted = [
    {
      dataField: "ten_hang_bay", // if dataField is not match to any column you defined, it will be ignored.
      order: "asc", // desc or asc
    },
  ]

  const listColumns = [
    {
      isDummyField: true,
      text: "id",
      dataField: "id",
      hidden: true,
      formatter: (cellContent, airline) => <>{airline.id}</>,
    },
    {
      dataField: "ten_hang_bay",
      isDummyField: true,
      text: "",
      formatter: (cellContent, airline) => (
        <>
          <div className="text-truncate mb-0">
            {airline.ten}
          </div>
        </>
      ),
      headerFormatter: (column, colIndex, components) => (
        <>
          <THeadSort
            label="Tên hãng bay"
            name="ten_hang_bay"
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
      dataField: "ten_tat",
      isDummyField: true,
      text: "",
      formatter: (cellContent, airline) => (
        <>
          <div className="text-truncate mb-0">
            {airline.ten_tat}
          </div>
        </>
      ),
      headerFormatter: (column, colIndex, components) => (
        <>
          <THeadSort
            label="Tên viết tắt"
            name="ten_tat"
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
      dataField: "logo",
      isDummyField: true,
      text: "",
      formatter: (cellContent, airline) => (
        <>
          <div className="text-truncate mb-0 d-flex align-items-center justify-content-center">
            <img src={airline.logo} alt={airline.logo} width="100" />
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <label className="control-label cursor-pointer w-100" >
            Logo
          </label>
        </>
      ),
      headerClasses: 'table-light'
    },
    {
      dataField: "menu",
      isDummyField: true,
      text: "Chức năng",
      editable: false,
      formatter: (cellContent, airline) => (
        <div className="d-flex gap-2">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleUpdate(airline.id)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => handleDeleteAirline(airline)}
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
    dispatch(layDSHangBay(params));
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
        modal ? setModal(!modal) : null
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


  // chức năng xóa
  const handleDeleteAirline = airline => {
    setDataList({
      id: airline.id,
      ten_hang_bay: airline.ten,
      ma_hang_bay: airline.ma_hang_bay
    })
    setOpenDialog(true)
    setDialogDelete(true)
    setTitleDialog("Thông báo")
    setDescriptionDialog("Bạn muốn xóa " + airline.ten + " ?")
  }

  // chức năng chấp nhận xóa
  const handleDeleteAirlineAccept = () => {
    var requestContent = {
      params: {
        id: Number(dataList.id)
      },
      body: {
        xac_nhan: "y"
      }
    }
    dispatch(xoaHangBay(requestContent));
    var message = `Đã xóa ${initlabel.tab} ${dataList.ten_hang_bay}`
    setDescriptionDialog(message) //thông báo thành công
    setOpenDialog(false)
  }

  // chuyển trang
  const handlePageChange = (page) => {
    //index bắt đầu = 0
    pageIndex = page.selected;
    setParams(preState => ({ ...preState, ['trang']: pageIndex + 1, ['so_luong']: SO_DONG_1_TRANG }));
  }

  //show tổng số dòng
  const showToTal = () => {
    var from = (pageIndex - 1) * SO_DONG_1_TRANG;
    var to = (pageIndex) * SO_DONG_1_TRANG;
    from === 0 ? setFrom(1) : setFrom((pageIndex - 1) * SO_DONG_1_TRANG)
    to >= totalSize ? setTo(totalSize) : setTo((pageIndex) * SO_DONG_1_TRANG)
  }

  //reset filter
  const handleResetFilter = () => {
    setParams({
      trang: TRANG,
      so_luong: SO_DONG_1_TRANG,
      ten_hang_bay: [],
      ma_hang_bay: [],
      sap_xep: "ten_hang_bay",
      asc: 1
    })
    //clearSelected()
  }

  //chức năng thêm mới
  const handleThemMoi = () => {
    setIsAddMode(true);
    setModal(true);
  }

  //chức năng edit
  const handleUpdate = (id) => {
    setIdEdit(id);
    setIsAddMode(false);
    setModal(true);
  }

  //submit form
  const onSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    var res;
    if(typeof values.logo == 'object') {
      formData.append("file", values.logo);
      res = await postThemMoiLogo(formData);
    }
    
    var dataForm = {};
    if (IsAddMode) {
      dataForm = {
        ma_hang_bay: values.ma_hang_bay,
        ten_hang_bay: values.ten_hang_bay,
        logo: res ? res.data[0]["filename"] : ""
      }
      dispatch(themHangBay(dataForm))
    } else {
      dataForm = {
        ma_hang_bay: values.ma_hang_bay,
        ten_hang_bay: values.ten_hang_bay,
        logo: res ? res.data[0]["filename"] : values.logo
      }
      const capNhatAirline = {
        params: {
          id: Number(idEdit)
        },
        body: dataForm,
      }
      dispatch(chapNhanCapNhatHangBay(capNhatAirline))
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
                      <Col sm={6} className="mt-2">
                        <THeadInputFilter
                          label="Tên hãng bay"
                          name="ten_hang_bay"
                          placeholder="Nhập tên hãng bay..."
                          values={params.ten_hang_bay}
                          onChange={setParams}
                        >
                        </THeadInputFilter>
                      </Col>
                      <Col sm={6} className="mt-2">
                        <THeadInputFilter
                          label="Tên viết tắt"
                          name="ma_hang_bay"
                          placeholder="Nhập tên viết tắt..."
                          values={params.ma_hang_bay}
                          onChange={setParams}
                        >
                        </THeadInputFilter>
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
                                      <th>Tên hãng bay</th>
                                      <th>Mã hãng bay</th>
                                      <th>Logo</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td colSpan="3">
                                        <p className="text-center">{statusTable ? "Không tìm thấy hãng bay cho bộ lộc của bạn." : "Không tìm thấy dữ liệu."}</p>
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
      < FormThemSuaHangBay
        initialValues={initialValues}
        modal={modal}
        setModal={setModal}
        onSubmit={onSubmit}
        IsAddMode={IsAddMode}
      />
    </div>
  )
}

export default withRouter(HangBay)