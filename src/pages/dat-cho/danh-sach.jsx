import Breadcrumbs from "components/Common/Breadcrumb";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { MetaTags } from 'react-meta-tags';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter, useRouteMatch } from 'react-router-dom';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Badge, Button, Card, CardBody, Col, Container, Row } from 'reactstrap';
import { compareDate, getDate, getHours } from "../../helpers/function/function_helper";
// Xử lý event
import { layDSDatCho, getID } from "../../store/actions";
import SpinnerLoading from "components/Custom/SpinnerLoading";


const initlabel = {
    tab: 'đặt chỗ'
};
function TimKiemDatCho(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const { path } = useRouteMatch();
    const TRANG = 1;
    const SO_DONG_1_TRANG = 25;
    const [disableBtn, setDisableBtn] = useState(true)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(0)
    const [selectRef, setSelectRef] = useState({})
    let { dataticket, resApiForm, pageIndex, totalSize, totalPages, loadingPage } = useSelector(state => ({
        dataticket: state.DanhSachDatCho.content,
        resApiForm: state.DanhSachDatCho.resApi,
        pageIndex: state.DanhSachDatCho.page,
        totalSize: state.DanhSachDatCho.total_records,
        totalPages: state.DanhSachDatCho.total_pages,
        loadingPage: state.DanhSachDatCho.loading,
    }))
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({
        trang: TRANG,
        so_luong: SO_DONG_1_TRANG,
        ma_pnr: [],
        ma_hang_khong: [],
        ho: [],
        ten: [],
        hang_bay: [],
        so_ghe: [],
        san_bay_di: [],
        ngay_bay: [],
        sap_xep: "ngay_tao_dat_cho",
        asc: 0
    })
    const [paramsDay, setParamsDay] = useState({
        dat_cho_tu_ngay: [],
        dat_cho_den_ngay: []
    })
    const [pagination, setPagination] = useState({
        activePage: 1,
        totalItemsCount: 0,
        itemsCountPerPage: 0,
        pageRangeDisplayed: 5,
    })

    const [defaultDay, setDefaultDay] = useState(false)

    const defaultSorted = [
        {
            dataField: "ngay_tao_dat_cho ",
            order: "asc",
        },
    ]

    const getHoten = (val) => {
        var hoTen = []
        val.map((value, index) => {
            hoTen.push(`${value.ho} ${value.ten}`)
        })
        return hoTen.join(", ")
    }

    const listColumns = [
        {
            text: "Hãng bay",
            dataField: "logo",
            formatter: (logo, dataticket) => (
                <>
                    <div className="text-truncate mb-0 d-flex align-items-center justify-content-center">
                        <img src={dataticket.logo_hang_bay} alt={dataticket.logo_hang_bay} width="100" />
                    </div>
                </>
            ),
            headerClasses: 'table-light'
        },
        {
            text: "Mã đặt chỗ",
            dataField: "ma_pnr",
            sort: true,
            sortValue: (cell, row) => row['ma_pnr'],
            formatter: (ma_pnr, dataticket) => (
                <>
                    <p className="d-inline-block text-truncate mb-0">
                        {ma_pnr}
                    </p>
                </>
            ),
            headerClasses: 'table-light'
        },
        {
            text: "Tên hành khách",
            dataField: "ten_khach_hang",
            formatter: (ten_khach_hang, dataticket) => (
                <>
                    <p className="d-inline-block text-truncate mb-0">
                        {getHoten(dataticket["thong_tin_dat_cho"])}
                    </p>
                </>
            ),
            headerClasses: 'table-light'
        },
        {
            text: "Mã chuyến bay",
            dataField: "chuyen_bay.ma_chuyen_bay",
            sort: true,
            formatter: (ma_chuyen_bay, dataticket) => (
                <>
                    {
                        dataticket['phan_khuc'].length > 0 ?
                            <p className="d-inline-block text-truncate mb-0">
                                {`${dataticket['phan_khuc'][0].ma_hang_khong} ${dataticket['phan_khuc'][0].so_chuyen_bay}`}
                            </p>
                            : null
                    }
                </>
            ),
            headerClasses: 'table-light'
        },
        {
            text: "Ngày bay",
            dataField: "diem_khoi_hanh",
            sort: true,
            sortValue: (cell, row) => row['phan_khuc'][0].thoi_gian_di,
            formatter: (ngay_khoi_hanh, dataticket) => (
                <>
                    {
                        dataticket['phan_khuc'].length > 0 ?
                            <p className="d-inline-block text-truncate mb-0" style={{ textAlign: "center" }}>
                                {getHours(dataticket['phan_khuc'][0].thoi_gian_di, "DD-MM-YYYY HH:mm")}
                                <br></br>
                                {getDate(dataticket['phan_khuc'][0].thoi_gian_di, "DD-MM-YYYY")}
                            </p>
                            : null
                    }

                </>
            ),
            headerClasses: 'table-light'
        },
        {
            text: "Sân bay",
            dataField: "san_bay",
            sort: true,
            sortValue: (cell, row) => row['phan_khuc'][0].ma_san_bay_di,
            formatter: (san_bay_di, dataticket) => (
                <>
                    {
                        dataticket['diem_khoi_hanh'].length > 0 ?
                            <p className="d-inline-block text-truncate mb-0">
                                {`${dataticket['phan_khuc'][0].ma_san_bay_di} - ${dataticket['phan_khuc'][0].ma_san_bay_den}`}
                            </p>
                            : null
                    }
                </>
            ),
            headerClasses: 'table-light'
        },
        {
            text: "Trạng thái",
            dataField: "trang_thai",
            formatter: (trang_thai, dataticket) => (
                <>
                    <p className="d-inline-block text-truncate mb-0">
                        {checkStatusUser(dataticket.trang_thai)}
                    </p>
                </>
            ),
            headerClasses: 'table-light'
        },
        {
            text: "Số ghế",
            dataField: "so_ghe",
            sort: true,
            sortValue: (cell, row) => row['dataticket'],
            formatter: (so_ghe, dataticket) => (
                <>
                    <p className="d-inline-block text-truncate mb-0">
                        {dataticket.tong_so_ghe}
                    </p>
                </>
            ),
            headerClasses: 'table-light'
        },
        {
            text: "Tên đại lý",
            dataField: "ten_dai_ly",
            formatter: (ten_dai_ly, dataticket) => (
                <>
                    <p className="d-inline-block text-truncate mb-0">
                        {dataticket.ten_dai_ly ? dataticket.ten_dai_ly : "-" }
                    </p>
                </>
            ),
            headerClasses: 'table-light'
        },
        {
            text: "Ngày tạo đặt chỗ",
            dataField: "ngay_tao_dat_cho",
            sort: true,
            sortValue: (cell, row) => row.ngay_tao_dat_cho,
            formatter: (ngay_tao_dat_cho, dataticket) => (
                <>
                    {
                        dataticket['phan_khuc'].length > 0 ?
                            <p className="d-inline-block text-truncate mb-0" style={{ textAlign: "center" }}>
                                {getHours(dataticket.ngay_tao_dat_cho, "DD-MM-YYYY HH:mm")}
                                <br></br>
                                {getDate(dataticket.ngay_tao_dat_cho, "DD-MM-YYYY")}
                            </p>
                            : null
                    }

                </>
            ),
            headerClasses: 'table-light'
        },
    ]

    const checkStatusUser = (status) => {
        var text = "";
        if(status === 0) {
            text = "Giữ chỗ"
        } else if(status === 1) {
            text = "Đã xuất"
        } else if(status === 2) {
            text = "Huỷ đi - xuất về"
        } else if(status === 3) {
            text = "Huỷ về - xuất đi"
        } else {
            text = "Đã huỷ"
        }
        return text;
    }

    const showToTal = () => {
        var from = (pageIndex - 1) * SO_DONG_1_TRANG;
        var to = (pageIndex) * SO_DONG_1_TRANG;
        from === 0 ? setFrom(1) : setFrom((pageIndex - 1) * SO_DONG_1_TRANG)
        to >= totalSize ? setTo(totalSize) : setTo((pageIndex) * SO_DONG_1_TRANG)
    }

    const handlePageChange = (page) => {
        setLoading(true)
        //index bắt đầu = 0
        pageIndex = page.selected;
        setParams(preState => ({ ...preState, ['trang']: pageIndex + 1, ['so_luong']: SO_DONG_1_TRANG }));
    }

    const handleResetFilter = () => {
        setDefaultDay(!defaultDay)
        setParams({
            trang: TRANG,
            so_luong: SO_DONG_1_TRANG,
            ma_pnr: [],
            ma_hang_khong: [],
            ho: [],
            ten: [],
            hang_bay: [],
            so_ghe: [],
            san_bay_di: [],
            ngay_bay: [],
            sap_xep: "ma_dat_cho",
            asc: 1
        })
        setParamsDay({
            dat_cho_tu_ngay: [],
            dat_cho_den_ngay: []
        })
        selectRef.current.select.clearValue()
    }

    useEffect(() => {
        setPagination(preState => ({
            ...preState,
            ['activePage']: pageIndex,
            ['totalItemsCount']: totalSize,
            ['itemsCountPerPage']: totalPages
        }))
        showToTal()
    }, [dispatch, dataticket])

    useEffect(() => {
        resApiForm = []
    }, [])

    useEffect(() => {
        if (JSON.stringify(paramsDay.dat_cho_tu_ngay) !== "[]" && JSON.stringify(paramsDay.dat_cho_den_ngay) !== "[]") {
            var arr = { ...params, ...paramsDay }
            dispatch(layDSDatCho(arr))
        } else {
            dispatch(layDSDatCho(params))
        }
    }, [params, paramsDay])

    useEffect(() => {
        if (resApiForm.action === 'tim-kiem-dat-cho' && resApiForm.code === 200) {
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, [resApiForm.id])

    return (
        <>
            {loading ? <SpinnerLoading></SpinnerLoading> : null}
            <div className="page-content">
                <MetaTags>
                    <title>{process.env.REACT_APP_TITLE}</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title={initlabel.tab} />
                    <Row>
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <Row>
                                        {dataticket.length > 0 ?
                                            (loadingPage ?
                                                <div className="table-responsive">
                                                    <table className="table table-bordered">
                                                        <thead className="table-light" >
                                                            <tr>
                                                                <th>Mã đặt chỗ</th>
                                                                <th>Tên hành khách</th>
                                                                <th>Mã chuyến bay</th>
                                                                <th>Ngày bay</th>
                                                                <th>Sân bay</th>
                                                                <th>Hãng bay</th>
                                                                <th>Số ghế</th>
                                                                <th>Trạng thái</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan="8">
                                                                    <p className="text-center">
                                                                        Đang tải dữ liệu vui lòng chờ ...
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div> :
                                                <ToolkitProvider
                                                    keyField="id"
                                                    data={dataticket}
                                                    columns={listColumns}
                                                    bootstrap4
                                                    search
                                                >
                                                    {toolkitProps => (
                                                        <React.Fragment>
                                                            <div className="table-responsive">
                                                                <BootstrapTable
                                                                    {...toolkitProps.baseProps}
                                                                    defaultSorted={defaultSorted}
                                                                    classes={
                                                                        "table align-middle table-nowrap table-hover bg-select-row"
                                                                    }
                                                                    bordered={false}
                                                                    striped={false}
                                                                    responsive
                                                                    filter={filterFactory()}
                                                                    //selectRow={selectRow}
                                                                />
                                                            </div>
                                                            <div className="pagination pagination-rounded justify-content-end mb-2">
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
                                                            </div>
                                                        </React.Fragment>
                                                    )}
                                                </ToolkitProvider>
                                            ) :
                                            <div className="table-responsive">
                                                <table className="table table-bordered">
                                                    <thead className="table-light" >
                                                        <tr>
                                                            <th>Mã đặt chỗ</th>
                                                            <th>Tên hành khách</th>
                                                            <th>Mã chuyến bay</th>
                                                            <th>Ngày bay</th>
                                                            <th>Sân bay</th>
                                                            <th>Hãng bay</th>
                                                            <th>Số ghế</th>
                                                            <th>Trạng thái</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan="8">
                                                                <p className="text-center">
                                                                    {loadingPage ? "Đang tải dữ liệu vui lòng chờ ..." : "Không tìm thấy dữ liệu"}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>}
                                    </Row>
                                    <Row>
                                        <Col>
                                            {loadingPage || JSON.stringify(dataticket) === "[]" ? null :
                                                <div className="d-flex flex-wrap gap-2 fix-button-footer mt-4">
                                                    <Button type="button" color="primary" disabled={disableBtn} onClick={
                                                        () => history.push(`${path}/xuat-ve`)
                                                    }>
                                                        Tiếp tục
                                                    </Button>
                                                </div>}
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default withRouter(TimKiemDatCho);