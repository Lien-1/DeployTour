$('#button-add-new-doandulich').on('click', function (e) {
    window.location.href = `/add/doandulich`
    return false
})

// css cái dấu 3 chấm nằm dọc phía cuói mỗi table, mà chả hiểu nó cần k :((
$('.container-icon-extend-option').on('click', function (e) {
    let index = $('.container-icon-extend-option').index(this)
    console.log(index)
    if ($('.menu-icon-extend-option').eq(index).css('display') == 'block')
        $('.menu-icon-extend-option').eq(index).css('display', 'none')
    else {
        $('.menu-icon-extend-option').eq(index).css('display', 'block')
    }
})

//click select option khach hang
$('#information-khachhang').change(function () {
    console.log($(this).val())
    let optionKhachHang = $(this).val()
    showTableKhachHangForOption(optionKhachHang)
    // console.log($(`.row-khachhang td:nth-child(${1})`).eq(1).html())
})

// click select option doan du lich
$('#information-doandulich').change(function () {
    console.log($(this).val())
    let optionDoanDuLich = $(this).val()
    showTableDoanDuLichForOption(optionDoanDuLich)
})

// show table tương ứng với các option của nó
function showTableKhachHangForOption(MaDoan) {
    let totalRow = $('.row-khachhang').length
    if (MaDoan != 'All') {
        for (let i = 0; i < totalRow; ++i) {
            let MaDoanOfRow = $(`.row-khachhang td:nth-child(${6})`).eq(i).html()
            if (MaDoanOfRow != MaDoan)
                $(`.row-khachhang`).eq(i).hide()
            else {
                $(`.row-khachhang`).eq(i).show()
            }
        }
    }
    else {
        for (let i = 0; i < totalRow; ++i) {
            $(`.row-khachhang`).eq(i).show()
        }
    }
}

function showTableDoanDuLichForOption(option) {
    let totalRow = $('.row-doandulich').length
    for (let i = 0; i < totalRow; ++i) {
        let CheckFinishedOfRow = $('.row-doandulich td:nth-child(1)').eq(i).html()
        if (option == 'all') {
            $(`.row-doandulich`).eq(i).show()
        }
        else if (option == 'active') {
            if (CheckFinishedOfRow)
                $(`.row-doandulich`).eq(i).show()
            else {
                $(`.row-doandulich`).eq(i).hide()
            }
        }
        else {
            if (CheckFinishedOfRow)
                $(`.row-doandulich`).eq(i).hide()
            else {
                $(`.row-doandulich`).eq(i).show()
            }
        }
    }
}

// button sửa đoàn du lịch 
$('.btn-edit-doandulich').on('click', function () {
    let index = $('.btn-edit-doandulich').index(this)
    let date = new Date()
    let currentDay = parseInt(date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
    let ngaykhoihanh = $('.row-doandulich td:nth-child(5)').eq(index).html()
    let MaDoan = $('.row-doandulich td:nth-child(3)').eq(index).html()
    let TenDoan = $('.row-doandulich td:nth-child(4)').eq(index).html()
    let jsDateCurrentDay = new Date(currentDay)
    let jsDateNgayKhoiHanh = new Date(ngaykhoihanh)
    // chưa khởi hành  thì có thể sửa ngày khởi hành
    if (jsDateNgayKhoiHanh < jsDateCurrentDay) {
        let newNgayKhoihanh = prompt(`Nhập ngày khởi hành mới cho: ${TenDoan}\nĐịnh dạng : mm/dd/yyyy\nChúc bạn có một chuyến đi zui ze :)))`)
        console.log(newNgayKhoihanh)
        //submit form change NgayKhoiHanh
        submitFormChangeNgayKhoiHanh(MaDoan,newNgayKhoihanh)
    } else {
        alert('Đoàn đã bắt đầu lịch trình, không thể thay đổi.')
    }
})
function submitFormChangeNgayKhoiHanh(MaDoan, ngaykhoihanh){
    $('#input-form-change-NgayKhoiHanh-MaDoan').attr('value',MaDoan)
    $('#input-form-change-NgayKhoiHanh-NgayKhoiHanh').attr('value',ngaykhoihanh)
    $('#form-change-NgayKhoiHanh').attr('method','POST')
    $('#form-change-NgayKhoiHanh').attr('action','/handle/editNgayKhoiHanh')
    $('#form-change-NgayKhoiHanh').submit()

}