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