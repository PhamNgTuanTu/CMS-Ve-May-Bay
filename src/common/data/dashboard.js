const yearData = [
    {
        name: "Loại A",
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
    },
    {
        name: "Loại B",
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
    },
    {
        name: "Loại C",
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
    },
];

const monthData = [
    {
        name: "Loại A",
        data: [34, 55, 21, 77, 32, 63, 86, 42, 34, 18, 16, 41],
    },
    {
        name: "Loại B",
        data: [10, 63, 40, 80, 52, 41, 11, 32, 30, 86, 44, 33],
    },
    {
        name: "Loại C",
        data: [11, 17, 15, 85, 21, 14, 80, 58, 17, 12, 20, 18],
    },
];

const weekData = [
    {
        name: "Loại A",
        data: [14, 52, 11, 57, 22, 33, 31, 22, 64, 14, 32, 68],
    },
    {
        name: "Loại B",
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
    },
    {
        name: "Loại C",
        data: [11, 17, 15, 15, 34, 55, 21, 18, 17, 12, 20, 18],
    },
];
const orders = [
    {
        id: 2,
        orderId: "#SK2540",
        billingName: "Khách hàng 1",
        orderdate: "17/08/2021",
        total: "4.000.000 đ",
        badgeclass: "success",
        paymentStatus: "Đã thanh toán",
        methodIcon: "fa-cc-mastercard",
        paymentMethod: "Mastercard",
        so_ghe: 3,
        nhan_vien: "Nguyễn Văn A",
        dai_ly : "Đai lý 1"
    },
    {
        id: 3,
        orderId: "#SK2541",
        billingName: "Khách hàng 2",
        orderdate: "18/08/2021",
        total: "4.100.000 đ",
        badgeclass: "danger",
        paymentStatus: "Chưa thanh toán",
        methodIcon: "fa-cc-visa",
        paymentMethod: "Visa",
        so_ghe: 3,
        nhan_vien: "Nguyễn Văn B",
        dai_ly : "Đai lý 2"
    },
    {
        id: 4,
        orderId: "#SK2542",
        billingName: "Khách hàng 3",
        orderdate: "19/08/2021",
        total: "3.000.000 đ",
        badgeclass: "success",
        paymentStatus: "Đã thanh toán",
        methodIcon: "fa-cc-paypal",
        paymentMethod: "Paypal",
        so_ghe: 2,
        nhan_vien: "Nguyễn Văn C",
        dai_ly : "Đai lý 3"
    },
    {
        id: 5,
        orderId: "#SK2543",
        billingName: "Khách hàng 4",
        orderdate: "20/08/2021",
        total: "1.000.000 đ",
        badgeclass: "success",
        paymentStatus: "Đã thanh toán",
        methodIcon: "fa-cc-mastercard",
        paymentMethod: "Mastercard",
        so_ghe: 1,
        nhan_vien: "Nguyễn Văn D",
        dai_ly : "Đai lý 5"
    },
    {
        id: 6,
        orderId: "#SK2544",
        billingName: "Khách hàng 5",
        orderdate: "21/08/2021",
        total: "45.000.000 đ",
        badgeclass: "warning",
        paymentStatus: "Đang chờ thanh toán",
        methodIcon: "fa-cc-visa",
        paymentMethod: "Visa",
        so_ghe: 30,
        nhan_vien: "Nguyễn Văn G",
        dai_ly : "Đai lý 6"
    },
    {
        id: 7,
        orderId: "#SK2545",
        billingName: "Khách hàng 6",
        orderdate: "22/08/2021",
        total: "7.000.000 đ",
        badgeclass: "success",
        paymentStatus: "Đã thanh toán",
        methodIcon: "fa-cc-paypal",
        paymentMethod: "Paypal",
        so_ghe: 5,
        nhan_vien: "Nguyễn Văn 56",
        dai_ly : "Đai lý 89"
    },
    {
        id: 8,
        orderId: "#SK2546",
        billingName: "Khách hàng 7",
        orderdate: "23/08/2021",
        total: "4.000.000 đ",
        badgeclass: "success",
        paymentStatus: "Đã thanh toán",
        methodIcon: "fas fa-money-bill-alt",
        paymentMethod: "COD",
        so_ghe: 3,
        nhan_vien: "Nguyễn Văn AB",
        dai_ly : "Đai lý 113"
    },
    {
        id: 9,
        orderId: "#SK2547",
        billingName: "Khách hàng 8",
        orderdate: "24/08/2021",
        total: "4.050.000 đ",
        badgeclass: "success",
        paymentStatus: "Đã thanh toán",
        methodIcon: "fa-cc-paypal",
        paymentMethod: "Mastercard",
        so_ghe: 4,
        nhan_vien: "Nguyễn Văn ABX",
        dai_ly : "Đai lý 18"
    },
    {
        id: 10,
        orderId: "#SK2548",
        billingName: "Khách hàng 9",
        orderdate: "25/08/2021",
        total: "4.000.001 đ",
        badgeclass: "warning",
        paymentStatus: "Đang chờ thanh toán",
        methodIcon: "fa-cc-paypal",
        paymentMethod: "Visa",
        so_ghe: 30,
        nhan_vien: "Nguyễn Văn AVC",
        dai_ly : "Đai lý 1"
    },
]

export { yearData, monthData, weekData, orders }