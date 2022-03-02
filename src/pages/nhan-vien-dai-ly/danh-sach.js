import Breadcrumbs from "components/Common/Breadcrumb"
import THeadInputFilter from "components/Custom/THeadInputFilter"
import THeadSelectFilter from "components/Custom/THeadSelectFilter"
import THeadSelectFilterStr from "components/Custom/THeadSelectFilterStr"
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
  Badge, Button, Card, CardBody, CardTitle, Col,
  Container,
  Row
} from "reactstrap"
import "toastr/build/toastr.min.css"
import { titleCase } from "./../../helpers/function/function_helper"
// Xử lý event
import { layDSLoaiNhanVien, layDSVaiTroDaiLy, chapNhanCapNhatNhanVienDL, layDSNhanVienDL, xoaNhanVienDL } from "./../../store/actions"


const initlabel = {
  'tab': 'nhân viên đại lý',
  'loc': 'lọc dữ liệu',
  'danh_sach': 'danh sách nhân viên đại lý',
  'danh_sach_rong': 'danh sách rỗng, vui lòng thêm mới!',
  'btn_them_moi': 'thêm mới'
};

const initSlug = {
  'them_moi': '/dai-ly/nhan-vien/them-moi',
  'cap_nhap': '/dai-ly/nhan-vien/cap-nhat/'
}

const NhanVienDL = props => {
  const dispatch = useDispatch()
  const TRANG = 1;
  const SO_DONG_1_TRANG = 25;
  const history = useHistory();
  let { users, totalSize, pageIndex, totalPages, hasNext, hasPrev, resApiActionForm, optionsQuyenTruyCap, optionsVaiTroDaiLy } = useSelector(state => ({
    users: state.NhanVienDL.content,
    totalSize: state.NhanVienDL.total_records,
    pageIndex: state.NhanVienDL.page,
    totalPages: state.NhanVienDL.total_pages,
    hasNext: state.NhanVienDL.has_next,
    hasPrev: state.NhanVienDL.has_prev,
    resApiActionForm: state.NhanVienDL.resApiActionForm,
    optionsQuyenTruyCap: state.LoaiNhanVien.content,
    optionsVaiTroDaiLy: state.VaiTroDaiLy.content,
  }));

  optionsVaiTroDaiLy = optionsVaiTroDaiLy && optionsVaiTroDaiLy.map(item => {
    return {
      id: item.id,
      ten: item.ten_vai_tro
    };
  });
  const [params, setParams] = useState({
    trang: TRANG,
    so_luong: SO_DONG_1_TRANG,
    ten_dang_nhap: [],
    ho_ten: [],
    dien_thoai: [],
    email: [],
    dai_ly: [],
    trang_thai: [],
    sap_xep: "ten_dang_nhap",
    asc: 1
  })
  const [pagination, setPagination] = useState({
    activePage: 1,
    totalItemsCount: 0,
    itemsCountPerPage: 0,
    pageRangeDisplayed: 5,
  })
  const optionTrangThai = [
    {
      //label: "Nhóm",
      options: [
        { label: "Kích hoạt", value: 1 },
        { label: "Khóa", value: 0 },
      ]
    }
  ]
  const [label, setLabel] = useState(initlabel);
  const [slug, setSlugl] = useState(initSlug);
  const [dataList, setDataList] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogDelete, setDialogDelete] = useState(false)
  const [successDialog, setSuccessDialog] = useState(2)
  const [titleDialog, setTitleDialog] = useState("")
  const [descriptionDialog, setDescriptionDialog] = useState("")
  const [sortActive, setSortActive] = useState("ten_dang_nhap")
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)
  const [selectRef, setSelectRef] = useState({})
  const [selectRef2, setSelectRef2] = useState({})

  // message table null
  const [statusTable, setStatusTable] = useState(false)


  const { SearchBar } = Search

  const defaultSorted = [
    {
      dataField: "ten_dang_nhap", // if dataField is not match to any column you defined, it will be ignored.
      order: "asc", // desc or asc
    },
  ]

  const listColumns = [
    {
      isDummyField: true,
      text: "id",
      dataField: "id",
      hidden: true,
      formatter: (cellContent, user) => <>{user.id}</>,
    },
    {
      dataField: "ho_ten",
      isDummyField: true,
      text: "",
      formatter: (cellContent, user) => (
        <>
          <div className="text-truncate mb-0">
            {user.ho_ten}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            onSort={setParams}
            label="Họ và tên"
            name="ho_ten"
            active={sortActive}
            onActive={setSortActive}
          >
          </THeadSort>
        </>
      ),
      headerClasses: 'table-light'
    },
    {
      dataField: "ten_dang_nhap",
      isDummyField: true,
      text: "",
      formatter: (cellContent, user) => (
        <>
          <div className="text-truncate mb-0">
            <Link to={'/nhan-vien/cap-nhat/' + user.id} className="text-dark">
              {user.ten_dang_nhap}
            </Link>
          </div>
        </>
      ),
      headerFormatter: (column, colIndex, components) => (
        <>
          <THeadSort
            label="Tên đăng nhập"
            name="ten_dang_nhap"
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
      dataField: "email",
      isDummyField: true,
      text: "",
      headerStyle: (colum, colIndex) => {
        return { minWidth: '210px', width: '210px' };
      },
      formatter: (cellContent, user) => (
        <>
          <div className="text-truncate mb-0">
            {user.email}
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
      isDummyField: true,
      dataField: "dien_thoai",
      text: "Điện thoại",
      formatter: (cellContent, user) => (
        <>
          <div className="text-truncate mb-0" style={{ maxWidth: "12rem" }}>
            {user.dien_thoai}
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
      dataField: "dai_ly",
      isDummyField: true,
      text: "",
      formatter: (cellContent, user) => (
        <>
          <div className="text-truncate mb-0">
            {user.dai_ly["ten"]}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            label="Đại lý"
            name="dai_ly"
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
      dataField: "loai_nhan_vien",
      isDummyField: true,
      text: "",
      formatter: (cellContent, user) => (
        <>
          <div className="text-truncate mb-0">
            {user.loai_nhan_vien && user.loai_nhan_vien["ten"]}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            label="Loại nhân viên"
            name="loai_nhan_vien"
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
      dataField: "vai_tro_dai_ly",
      isDummyField: true,
      text: "",
      formatter: (cellContent, user) => (
        <>
          <div className="text-truncate mb-0">
            {user.vai_tro_dai_ly ? user.vai_tro_dai_ly["ten_vai_tro"] : null}
          </div>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            label="Quyền truy cập"
            name="vai_tro_dai_ly"
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
      dataField: "trang_thai",
      isDummyField: true,
      text: "",
      formatter: (cellContent, user) => (
        <>
          <Badge pill className={user.trang_thai === true ? "badge-soft-success me-1" : "badge-soft-danger me-1"}>
            {user.trang_thai === true ? "Kích hoạt" : "Khóa"}
          </Badge>
        </>
      ),
      headerFormatter: () => (
        <>
          <THeadSort
            label="Trạng thái"
            name="trang_thai"
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
      formatter: (cellContent, user) => (
        <div className="d-flex gap-3">
          {
            user.loai_nhan_vien && user.loai_nhan_vien["ten"] === "Chủ đại lý" ?
              <Link className="text-success" to="#">
                <i
                  className="mdi mdi-pencil font-size-18 disable-delete"
                  id="edittooltip"
                ></i>
              </Link> :
              <Link className="text-success" to={slug.cap_nhap + user.id}>
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                ></i>
              </Link>
          }
          {
            user.loai_nhan_vien && user.loai_nhan_vien["ten"] === "Chủ đại lý" ?
              <Link className="text-muted" to="#">
                <i
                  className="mdi mdi-delete font-size-18 disable-delete"
                  id="deletetooltip"
                ></i>
              </Link> :
              <Link className="text-danger" to="#">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  onClick={() => handleDeleteUser(user)}
                ></i>
              </Link>
          }
          <Link className="text-warning" to="#">
            <i
              className={user.trang_thai ? "mdi mdi-lock font-size-18" : "mdi mdi-lock-off font-size-18"}
              id="deletetooltip"
              onClick={() => handleLockUser(user)}
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

  //Update user If action(call ...api)
  useEffect(() => {
    JSON.stringify(resApiActionForm) !== "{}" ?
      setParams(preState => ({ ...preState, ['trang']: pageIndex, ['so_luong']: SO_DONG_1_TRANG }))
      : null
  }, [resApiActionForm.id])

  //Call api lần đầu, update state nếu !params
  useEffect(() => {
    dispatch(layDSLoaiNhanVien());
    dispatch(layDSVaiTroDaiLy());
    dispatch(layDSNhanVienDL(params));
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
  }, [dispatch, users])

  //Thêm mới chuyển trang
  const handleThemMoi = () => {
    history.push(slug.them_moi);
  }

  const handleDeleteUser = user => {
    //console.log(user)
    setDataList({
      id: user.id,
      ten_dang_nhap: user.ten_dang_nhap,
      mat_khau: "",
      ho_ten: user.ho_ten,
      email: user.email,
      dien_thoai: user.dien_thoai,
      trang_thai: user.trang_thai
    })
    setOpenDialog(true)
    setDialogDelete(true)
    setTitleDialog("Thông báo")
    setDescriptionDialog("Bạn muốn xóa " + user.ten_dang_nhap + " ?")
  }

  const handleDeleteUserAccept = () => {
    var requestContent = {
      params: {
        id: Number(dataList.id)
      },
      body: {
        xac_nhan: "y"
      }
    }
    dispatch(xoaNhanVienDL(requestContent));
    var message = `Đã xóa ${initlabel.tab} ${dataList.ten_dang_nhap}`
    setDescriptionDialog(message) //thông báo thành công
    setOpenDialog(false)
  }

  const handleLockUser = user => {
    //console.log(user)
    setDataList({
      id: user.id,
      ten_dang_nhap: user.ten_dang_nhap,
      mat_khau: "",
      ho_ten: user.ho_ten,
      email: user.email,
      dien_thoai: user.dien_thoai,
      trang_thai: user.trang_thai
    })
    setOpenDialog(true)
    setDialogDelete(false)
    setTitleDialog("Thông báo")
    setDescriptionDialog("Bạn muốn" + (user.trang_thai ? " khóa" : " kích hoạt") + " nhân viên có tên đăng nhập " + user.ten_dang_nhap + " ?")
  }

  const handleLockUserAccept = () => {
    var requestContent = {
      params: {
        id: dataList.id
      },
      body: {
        'trang_thai': Number(!dataList.trang_thai),
        'only_trang_thai': 1
      }
    }
    dispatch(chapNhanCapNhatNhanVienDL(requestContent));
    var message = dataList.trang_thai ? "Đã khóa " + dataList.ten_dang_nhap :
      "Đã mở khóa " + dataList.ten_dang_nhap
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
      ten_dang_nhap: [],
      ho_ten: [],
      dien_thoai: [],
      email: [],
      dai_ly: [],
      trang_thai: [],
      sap_xep: "",
      asc: 1
    })
    clearSelected()
  }

  const clearSelected = () => {
    selectRef.current.select.clearValue()
    selectRef2.current.select.clearValue()
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
                                label="Họ và tên"
                                name="ho_ten"
                                placeholder="Nhập họ tên..."
                                values={params.ho_ten}
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
                                label="Đại lý"
                                name="dai_ly"
                                placeholder="Nhập tên đại lý..."
                                values={params.dai_ly}
                                onChange={setParams}
                              >
                              </THeadInputFilter>
                            </Col>
                            <Col sm="6">
                              <THeadSelectFilter
                                label="Trạng thái"
                                name="trang_thai"
                                placeholder="Chọn trạng thái..."
                                options={optionTrangThai}
                                onChange={setParams}
                                isMulti={true}
                                onSetRef={setSelectRef2}
                              >
                              </THeadSelectFilter>
                            </Col>
                          </Row>
                          <Row className="mt-2">
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
                          </Row>
                          <Row className="mt-2">
                            <Col sm="6">
                              <THeadSelectFilterStr
                                label="loại nhân viên"
                                name="loai_nhan_vien"
                                placeholder="Chọn loại nhân viên..."
                                options={optionsQuyenTruyCap}
                                onChange={setParams}
                                isMulti={true}
                                onSetRef={setSelectRef}
                              >
                              </THeadSelectFilterStr>
                            </Col>
                            <Col sm="6">
                              <THeadSelectFilterStr
                                label="Quyền truy cập"
                                name="vai_tro_dai_ly"
                                placeholder="Chọn quyền truy cập..."
                                options={optionsVaiTroDaiLy}
                                onChange={setParams}
                                isMulti={true}
                                onSetRef={setSelectRef}
                              >
                              </THeadSelectFilterStr>
                            </Col>
                          </Row>
                        </Col>
                        <div className="d-flex flex-wrap gap-2 fix-button-footer mt-2">
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
                    data={users}
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
                                {users.length > 0 ?
                                  <BootstrapTable
                                    {...toolkitProps.baseProps}
                                    keyField="id"
                                    defaultSorted={defaultSorted}
                                    classes={
                                      "table table-bordered"
                                    }
                                    bordered={false}
                                    striped={false}
                                    responsive
                                  /> :
                                  <table className="table table-bordered">
                                    <thead>
                                      <tr className="table-light">
                                        <th>Họ và tên</th>
                                        <th>Tài khoản</th>
                                        <th>Email</th>
                                        <th>Điện thoại</th>
                                        <th>Trạng Thái</th>
                                        <th>Chức năng</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td colSpan="6">
                                          <p className="text-center">{statusTable ? "Không tìm thấy nhân viên cho bộ lộc của bạn." : "Không tìm thấy dữ liệu."}</p>
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
                                      showCloseButton={true}
                                      showConfirm={true}
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
                                      onConfirm={dialogDelete == true ? handleDeleteUserAccept : handleLockUserAccept}
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
      </div>
    </React.Fragment>
  )
}

export default withRouter(NhanVienDL)