$('body').on('click', '.delete-new-khachhang', () => {
    let index = $('.delete-new-khachhang').index(this)
    console.log($('.item-add-new-khachhang').eq(index))
    $('.item-add-new-khachhang').eq(index).remove()
    
    let numberNextKhachHang = $('.item-add-new-khachhang').length 
    // chỉnh sửa chi phí tổng
    $('#input-ChiPhi').val((numberNextKhachHang)*1240000)
    $('#input-ChiPhi-real').val((numberNextKhachHang)*1240000)

})

$('#input-date-NgayKhoiHanh').on('change',function(){
    let dateNgayKhoiHanh = formatDateNgayKhoiHanh($('#input-date-NgayKhoiHanh').val())
    $('#input-real-date-NgayKhoiHanh').val(dateNgayKhoiHanh)
    console.log($('#input-real-date-NgayKhoiHanh').val())
})

$('.button-add-new-khachhang').on('click', function (e) {
    e.preventDefault()
    let numberNextKhachHang = $('.item-add-new-khachhang').length + 1
    
    // thêm phần nhập 1 thành viên mới
    $('#container-add-new-khachhang').append(`
            <div class="item-add-new-khachhang">
                <div>
                    <span>Khách hàng ${numberNextKhachHang}</span>
                    <div class="delete-new-khachhang" style="cursor: pointer;">
                        <i class="fas fa-trash-alt"></i>
                    </div>
                </div>
                <div>
                    <label for="">Tên khách hàng:</label>
                    <input type="text" name="${numberNextKhachHang}-HoTen" id="">
                    <label for="">CMND:</label>
                    <input type="text" name="${numberNextKhachHang}-CMND" id="">
                    <label for="">GioiTinh:</label>
                    <select name="${numberNextKhachHang}-GioiTinh" id="">
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                    <label for="">SDT</label>
                    <input type="text" name="${numberNextKhachHang}-SDT" id="">
                </div>
            </div>
    `)
    // chỉnh sửa chi phí tổng
    $('#input-ChiPhi').val((numberNextKhachHang)*1240000)
    $('#input-ChiPhi-real').val((numberNextKhachHang)*1240000)
})

//convert yyyy-mm-dd --> mm-dd-yyyy
function formatDateNgayKhoiHanh(date){
    let arr = date.split('-')
    let formatDate = arr[1]+"/"+arr[2]+"/"+arr[0]
    return formatDate
}