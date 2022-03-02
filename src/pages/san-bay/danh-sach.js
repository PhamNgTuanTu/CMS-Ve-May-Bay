import Breadcrumbs from "components/Common/Breadcrumb"
import THeadInputFilter from "components/Custom/THeadInputFilter"
import THeadSelectFilterStr from "components/Custom/THeadSelectFilterStr"
import THeadSort from "components/Custom/THeadSort"
import React, { useEffect, useState } from "react"
import SweetAlert from "react-bootstrap-sweetalert"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import MetaTags from "react-meta-tags"
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {
  Button, Card, CardBody, CardTitle, Col,
  Container,
  Row
} from "reactstrap"
import "toastr/build/toastr.min.css"
import { titleCase } from "./../../helpers/function/function_helper"
// Xử lý event
import { chapNhanCapNhatSanBay, layDSKhuVuc, layDSQuocGia, layDSSanBay, layDSTinh, themSanBay, xoaSanBay } from "./../../store/actions"
import FormThemSuaSanBay from "./Form-Them-Sua"


const initlabel = {
  'tab': 'sân bay',
  'loc': 'lọc dữ liệu',
  'danh_sach': 'danh sách sân bay',
  'danh_sach_rong': 'danh sách rỗng, vui lòng thêm mới!',
  'btn_them_moi': 'thêm mới'
};

const SanBay = props => {
  const dispatch = useDispatch()
  const TRANG = 1;
  const SO_DONG_1_TRANG = 25;
  let { airport, totalSize, pageIndex, totalPages, hasNext, hasPrev, resApiActionForm, optionsTinh, optionsKhuVuc, optionsQuocGia } = useSelector(state => ({
    airport: state.SanBay.content,
    totalSize: state.SanBay.total_records,
    pageIndex: state.SanBay.page,
    totalPages: state.SanBay.total_pages,
    hasNext: state.SanBay.has_next,
    hasPrev: state.SanBay.has_prev,
    resApiActionForm: state.SanBay.resApiActionForm,
    optionsTinh: state.ViTri.tinh,
    optionsKhuVuc: state.ViTri.khuVuc,
    optionsQuocGia: state.ViTri.quocGia,
  }));
  const [params, setParams] = useState({
    trang: TRANG,
    so_luong: SO_DONG_1_TRANG,
    ten_san_bay: [],
    ten_tat: [],
    ten_quoc_gia: [],
    ten_khu_vuc: [],
    ten_tinh: [],
    sap_xep: "ten_san_bay",
    asc: 1
  })
  const [pagination, setPagination] = useState({
    activePage: 1,
    totalItemsCount: 0,
    itemsCountPerPage: 0,
    pageRangeDisplayed: 5,
  })
  const [label, setLabel] = useState(initlabel);
  const [modalSanBay, setModalSanBay] = useState(false)
  const [dataList, setDataList] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogDelete, setDialogDelete] = useState(false)
  const [successDialog, setSuccessDialog] = useState(2)
  const [titleDialog, setTitleDialog] = useState("")
  const [descriptionDialog, setDescriptionDialog] = useState("")
  const [sortActive, setSortActive] = useState("ten_san_bay")
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)
  const [selectRef1, setSelectRef1] = useState({})
  const [selectRef2, setSelectRef2] = useState({})
  const [selectRef3, setSelectRef3] = useState({})

  const [idEdit, setIdEdit] = useState();
  const [IsAddMode, setIsAddMode] = useState(false);

  // message table null
  const [statusTable, setStatusTable] = useState(false)

  //lấy data vào form edit
  const dataEdit = !IsAddMode && airport.find(x => x.id === +idEdit)

  const initialValues = IsAddMode ? {
    ten_san_bay: "",
    ten_tat: "",
    tinh_id: "",
    khu_vuc_id: "",
    quoc_gia_id: "",
  } : {
    ...dataEdit,
    ten_san_bay: dataEdit ? dataEdit.ten : '',
  };

  const defaultSorted = [
    {
      dataField: "ten_san_bay", // if dataField is not match to any column you defined, it will be ignored.
      order: "asc", // desc or asc
    },
  ]

  const listColumns = [
    {
      isDummyField: true,
      text: "",
      dataField: "id",
      hidden: true,
      formatter: (cellContent, airport) => <>{airport.id}</>,
    },
    {
      isDummyField: true,
      text: "",
      dataField: "ten_san_bay",
      formatter: (cellContent, airport) => (
        <>
          <div className="text-truncate mb-0">
            {airport.ten}
          </div>
        </>
      ),
      headerFormatter: (column, colIndex, components) => (
        <>
          <THeadSort
            label="Tên sân bay"
            name="ten_san_bay"
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
      isDummyField: true,
      text: "",
      dataField: "ten_tat",
      formatter: (cellContent, airport) => (
        <>
          <div className="text-truncate mb-0">
            {airport.ten_tat}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            onSort={setParams}
            label="Tên viết tắt"
            name="ten_tat"
            active={sortActive}
            onActive={setSortActive}
          >
          </THeadSort>
        </>
      ),
      headerClasses: 'table-light'
    },
    {
      dataField: "ten_tinh",
      isDummyField: true,
      text: "",
      formatter: (cellContent, airport) => (
        <>
          <div className="text-truncate mb-0">
            {airport && airport.tinh && airport.tinh.ten ? airport.tinh.ten : null}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            onSort={setParams}
            label="Tỉnh, thành phố"
            name="ten_tinh"
            active={sortActive}
            onActive={setSortActive}
          >
          </THeadSort>
        </>
      ),
      headerClasses: 'table-light'
    },
    {
      isDummyField: true,
      text: "",
      dataField: "ten_khu_vuc",
      formatter: (cellContent, airport) => (
        <>
          <div className="text-truncate mb-0">
            {airport.khu_vuc.ten}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            onSort={setParams}
            label="Khu vực"
            name="ten_khu_vuc"
            active={sortActive}
            onActive={setSortActive}
          >
          </THeadSort>
        </>
      ),
      headerClasses: 'table-light'
    },
    {
      isDummyField: true,
      text: "",
      dataField: "ten_quoc_gia",
      formatter: (cellContent, airport) => (
        <>
          <div className="text-truncate mb-0">
            {airport.quoc_gia.ten}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            onSort={setParams}
            label="Quốc gia"
            name="ten_quoc_gia"
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
      formatter: (cellContent, airport) => (
        <div className="d-flex gap-2">
          <Link className="text-success" to='#'>
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleUpdate(airport.id)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => handleDeleteAirport(airport)}
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
    dispatch(layDSTinh());
    dispatch(layDSKhuVuc());
    dispatch(layDSQuocGia());
    dispatch(layDSSanBay(params));
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
        modalSanBay ? setModalSanBay(!modalSanBay) : null // nếu đang mở modalSanBay
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
  }, [dispatch, airport])

  const handleDeleteAirport = airprot => {
    // console.log(airprot)
    setDataList({
      id: airprot.id,
      ten_san_bay: airprot.ten,
      ten_tat: airprot.ten_tat,
      tinh_id: airprot.tinh_id,
      quoc_gia_id: airprot.quoc_gia_id,
      khu_vuc_id: airprot.khu_vuc_id,
    })
    setOpenDialog(true)
    setDialogDelete(true)
    setTitleDialog("Thông báo")
    setDescriptionDialog("Bạn muốn xóa " + airprot.ten + " ?")
  }

  const handleDeleteAirportAccept = () => {
    var requestContent = {
      params: {
        id: Number(dataList.id)
      },
      body: {
        xac_nhan: "y"
      }
    }
    dispatch(xoaSanBay(requestContent));
    var message = `Đã xóa ${initlabel.tab} ${dataList.ten_san_bay}`
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
      ten_san_bay: [],
      ten_tat: [],
      ten_quoc_gia: [],
      ten_khu_vuc: [],
      ten_tinh: [],
      sap_xep: "ten_san_bay",
      asc: 1
    })
    clearSelected()
  }

  const clearSelected = () => {
    selectRef1.current.select.clearValue()
    selectRef2.current.select.clearValue()
    selectRef3.current.select.clearValue()
  }

  //chức năng thêm
  const handleThemMoi = () => {
    setModalSanBay(true)
    setIsAddMode(true);
  }

  //chức năng edit
  const handleUpdate = (id) => {
    setIdEdit(id);
    setIsAddMode(false);
    setModalSanBay(true);
  }

  const handleSubmitForm = (values, { setSubmitting }) => {
    if (IsAddMode) {
      dispatch(themSanBay(values))
    } else {
      const capNhatTuyenBay = {
        params: {
          id: Number(idEdit)
        },
        body: values,
      }
      dispatch(chapNhanCapNhatSanBay(capNhatTuyenBay))
    }
    setSubmitting(false)
  }
  return (
    <div className="page-content">
      <MetaTags>
        <title>{process.env.REACT_APP_TITLE}</title>
      </MetaTags>
      <Container fluid>
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
                      <Col sm='6'>
                        <Row>
                          <Col sm="12" className="mt-2">
                            <THeadInputFilter
                              label="Tên sân bay"
                              name="ten_san_bay"
                              placeholder="Nhập tên sân bay..."
                              values={params.ten_san_bay}
                              onChange={setParams}
                            />
                          </Col>
                          <Col sm="12" className="mt-2">
                            <THeadSelectFilterStr
                              label="Quốc gia"
                              name="ten_quoc_gia"
                              placeholder="Chọn quốc gia..."
                              options={optionsQuocGia}
                              onChange={setParams}
                              isMulti={true}
                              onSetRef={setSelectRef1}
                            />
                          </Col>
                          <Col sm="12" className="mt-2">
                            <THeadSelectFilterStr
                              label="Tỉnh"
                              name="ten_tinh"
                              placeholder="Chọn tỉnh..."
                              options={optionsTinh}
                              onChange={setParams}
                              isMulti={true}
                              onSetRef={setSelectRef2}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col sm='6'>
                        <Row>
                          <Col sm="12" className="mt-2">
                            <THeadInputFilter
                              label="Tên viết tắt"
                              name="ten_tat"
                              placeholder="Nhập tên viết tắt..."
                              values={params.ten_tat}
                              onChange={setParams}
                            />
                          </Col>
                          <Col sm="12" className="mt-2">
                            <THeadSelectFilterStr
                              label="Khu vực"
                              name="ten_khu_vuc"
                              placeholder="Chọn khu vực..."
                              options={optionsKhuVuc}
                              onChange={setParams}
                              isMulti={true}
                              onSetRef={setSelectRef3}
                            />
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
                  data={airport}
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
                              {airport.length > 0 ?
                                <BootstrapTable
                                  {...toolkitProps.baseProps}
                                  defaultSorted={defaultSorted}
                                  classes={
                                    "table table-bordered"
                                  }
                                  bordered={false}
                                  striped={false}
                                  responsive
                                  isDummyField
                                /> :
                                <table className="table table-bordered">
                                  <thead className="table-light" >
                                    <tr>
                                      <th>Tên sân bay</th>
                                      <th>tên viết tắt</th>
                                      <th>Quốc gia</th>
                                      <th>Khu vực</th>
                                      <th>Tỉnh</th>
                                      <th>Chức năng</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td colSpan="7">
                                        <p className="text-center">{statusTable ? "Không tìm thấy sân bay cho bộ lộc của bạn." : "Không tìm thấy dữ liệu."}</p>
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
                                    onConfirm={dialogDelete == true ? handleDeleteAirportAccept : null}
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
      <FormThemSuaSanBay
        initialValues={initialValues}
        setModalSanBay={setModalSanBay}
        modalSanBay={modalSanBay}
        optionsTinh={optionsTinh}
        optionsKhuVuc={optionsKhuVuc}
        optionsQuocGia={optionsQuocGia}
        onSubmit={handleSubmitForm}
        IsAddMode={IsAddMode}
      />
    </div>
  )
}

export default SanBay;
