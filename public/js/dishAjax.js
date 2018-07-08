$(function () {
    if (window.location.pathname === '/dish/list') {
        listingDish();
    } else {
        $('#dishForm').validate({
            // Specify the validation rules
            rules: {
                dishName: {
                    required: true
                },
                shortName: {
                    required: true
                },
                price: {
                    required: true
                }
            },
            errorElement: 'span',
            // default input error message class
            errorClass: 'help-block',
            // hightlight error inputs
            highlight: function (element) {
                // set error class to the control group
                $(element).closest('.form-group').addClass('has-error');
            },
            // revert the change done by hightlight
            unhighlight: function (element) {
                // remove error class from the control group
                $(element).closest('.control-group').removeClass('error');
                $(element).closest('.form-group').removeClass('has-error');
            },
            submitHandler: function () {
                saveNew();
            }
        });
    }
});
function saveNew() {
    var obj = {};
    if($('#dishName').val()){
        obj.dishName = $('#dishName').val();
    }
    if($('#shortName').val()){
        obj.shortName = $('#shortName').val();
    }
    if($('#price').val()){
        obj.price = $('#price').val();
    }
    $.ajax({
        url: '/dish/insert',
        type: 'POST',
        data: obj,
        success: function(response){
            $('.base-modal').find('button[data-dismiss="modal"].btn').html('Ok');
            if (response.status === '409') {
                $('.base-modal .modal-header').html('<h1>' + response.message + '</h1>');
                $('.base-modal').modal('show');
            } else {
                $('.base-modal .modal-header').html('<h4>Dish</h4>');
                $('.base-modal .modal-body').html('<pre>' + response.message + '</pre>');
                $('.base-modal').modal('show');
                $('.base-modal button[data-dismiss="modal"]').click(function () {
                    window.location.href = '/dish/list';
                });
                $('.base-modal').on('hidden.bs.modal', function () {
                    window.location.href = '/dish/list';
                });
                // listingDish();
            }
        }
    });
}
function listingDish() {
    $('#pageLoadDiv').css('display', 'block');
    $.ajax({
        url: '/dish/listing',
        type: 'GET',
        data: {},
        success: function (response) {
            $('#pageLoadDiv').css('display', 'none');
            if (response.data.length > 0 && response.data !== undefined) {
                insertRow(response.data);
            } else {
                var searchResultTableBody = $('#dataTableDish');
                $(searchResultTableBody).html('');
                $(searchResultTableBody).append("<tr><th colspan=9 class='text-center no-results-found'>No Dish found</th></tr>");
                $('#pagination').hide();
            }
        }
    });
}
function insertRow(arrDish) {
    var currPage = parseInt($("input[action='gotoPage']").val(), 10);
    var i;
    if (currPage > 1) {
        i = (10 * (currPage - 1)) + 1;
    } else {
        i = 1;
    }
    var $strVar = '';
    if (arrDish) {
        $.each(arrDish, function (ind, val) {
            $strVar += '<tr>';
            $strVar += '<td>' + i + '</td>';
            if (val.dishName) {
                $strVar += '<td>' + val.dishName + '</td>';
            } else {
                $strVar += '<td></td>';
            }
            if (val.shortName) {
                $strVar += '<td>' + val.shortName + '</td>';
            } else {
                $strVar += '<td></td>';
            }
            if (val.price) {
                $strVar += '<td>' + val.price + '</td>';
            } else {
                $strVar += '<td></td>';
            }
            $strVar += '</tr>';
            i++;
        });
    }
    $('#dataTableDish').html($strVar);
    $('.load-bar').hide();
}