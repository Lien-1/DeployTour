// Thêm ảnh từ lap vào thư viện
// Lưu ý : đường dẫn sẽ thay đổi vào cái MaTour 
var myWidget = cloudinary.createUploadWidget({
    cloudName: 'di2u0wa8l',
    uploadPreset: 'ml_default',
    folder: 'TourDuLich/mt2', // chỉnh lại forder
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
    $('#container-add-new-event-overlay-add-new-item').append(`
    
    <div style="display:grid;grid-template-columns:30% 70% ; margin:5px 10px 5px 10px;">
        <div class="container-fieldset-overlay-add-new-item">
            <fieldset class="fieldset-overlay-add-new-item">
                <legend class="legend-overlay-add-new-item">Mã Tour</legend>
                <input type="text" name="" id="" class="input-inside-fieldset-overlay-add-new-item">
            </fieldset>
        </div>
        <div class="container-fieldset-overlay-add-new-item">
            <fieldset class="fieldset-overlay-add-new-item">
                <legend class="legend-overlay-add-new-item">Tên Tour</legend>
                <input type="text" name="" id="" class="input-inside-fieldset-overlay-add-new-item">
            </fieldset>
        </div>
    </div>
    <div style="margin:5px 20px 5px 20px;">
        <fieldset class="fieldset-overlay-add-new-item">
            <legend class="legend-overlay-add-new-item">Mô tả</legend>
            <textarea name="" id="" rows="3" class="input-inside-fieldset-overlay-add-new-item"></textarea>
        </fieldset>
    </div>
    <hr class="hr-overlay-add-new-item">

    `)

})

$('.button-open-add-new-item-overlay').on('click',function(){
    $('.overlay-add-new-item').css('transform','translateY(0)')
})