// Thêm ảnh từ lap vào thư viện
// Lưu ý : đường dẫn sẽ thay đổi vào cái MaTour 
var myWidget = cloudinary.createUploadWidget({
    cloudName: 'di2u0wa8l',
    uploadPreset: 'ml_default',
    folder: `TourDuLich/${$('#MaTour-addTour').attr('data-MaTour')}`, // chỉnh lại forder
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
    }
}
)
document.getElementById("upload_widget").addEventListener("click", function () {
    myWidget.open();
}, false);

// click (thêm sự kiện) hiện ra 1 ô nữa ở dưới 
$('.button-add-new-action-overlay-add-new-item').on('click', function (e) {
    e.preventDefault()
    let numberClass = $('.container-layout-add-new-tour').length
    $('#container-add-new-event-overlay-add-new-item').append(`
    <div class="container-layout-add-new-tour">
    <div style=" margin:5px 10px 5px 10px;">
        <span>Số thứ tự địa điểm ${numberClass + 1}</span>
        <span class="cancel-SoThuTuDiaDiem">
            <i class="fas fa-trash-alt " style="width: 20px;cursor:pointer"></i>
        </span>
        <div class="container-fieldset-overlay-add-new-item">
            <fieldset class="fieldset-overlay-add-new-item">
                <legend class="legend-overlay-add-new-item">Ngày giờ</legend>
                <input type="text" name="${numberClass + 1}-NgayGio" id="" class="input-inside-fieldset-overlay-add-new-item">
            </fieldset>
        </div>
    </div>
    <div style="margin:5px 20px 5px 20px;">
        <fieldset class="fieldset-overlay-add-new-item">
            <legend class="legend-overlay-add-new-item">Nội dung</legend>
            <textarea name="${numberClass + 1}-NoiDung" id="" rows="3"
                class="input-inside-fieldset-overlay-add-new-item"></textarea>
        </fieldset>
    </div>
    <hr class="hr-overlay-add-new-item">
</div>
    `)
})
// click xóa 1 sự kiện
$('body').on('click', '.cancel-SoThuTuDiaDiem', () => {
    let index = $('.cancel-SoThuTuDiaDiem').index(this)
    console.log($('.container-layout-add-new-tour').eq(index))
    $('.container-layout-add-new-tour').eq(index).remove()
})



$('.button-open-add-new-item-overlay').on('click', function () {
    $('.overlay-add-new-item').css('transform', 'translateY(0)')
})

// button edit  , show tour
$('.btn-edit-tour').on('click', function (e) {
    let MaTour = $('.btn-edit-tour').attr('data-totalReview')
    window.location.href = `/tours/edit/${MaTour}`
    return false

})
$('.btn-show-tour').on('click', function (e) {
    let index = $('.btn-show-tour').index(this)

    if ($('.icon-show-tour').eq(index).css('display') == 'none') {
        $('.icon-show-tour').eq(index).css('display', 'block')
        $('.icon-not-show-tour').eq(index).css('display', 'none')
    }
    else {
        $('.icon-show-tour').eq(index).css('display', 'none')
        $('.icon-not-show-tour').eq(index).css('display', 'block')
    }



})
// button cancel, save
$('.btn-add-new-item.cancel').on('click', function (e) {
    e.preventDefault()
    $('.overlay-add-new-item').css('transform', 'translateY(-100%)')

})
$('.btn-add-new-item.save').on('click', function (e) {
    e.preventDefault()
    // settimeout để có thời gian cho cái ảnh nó tải lên xong
    setTimeout(function () {
        let form = document.forms['form-add-new-tour']
        form.submit()
    }, 5000)
})
