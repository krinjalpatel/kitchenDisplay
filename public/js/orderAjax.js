// let paginator = null;

$(function () {
    if (window.location.pathname === '/order/list') {
        listingOrder();
    } else {
        getDishName();
        $('#orderForm').validate({
            // Specify the validation rules
            rules: {
                dishName: {
                    required: true
                },
                quantity: {
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
    if($('#quantity').val()){
        obj.quantity = $('#quantity').val();
    }
    $.ajax({
        url: '/order/insert',
        type: 'POST',
        data: obj,
        success: function(response){
            $('.base-modal').find('button[data-dismiss="modal"].btn').html('Ok');
            if (response.status === '409') {
                $('.base-modal .modal-header').html('<h1>' + response.message + '</h1>');
                $('.base-modal').modal('show');
            } else {
                $('.base-modal .modal-header').html('<h4>Order</h4>');
                $('.base-modal .modal-body').html('<pre>' + response.message + '</pre>');
                $('.base-modal').modal('show');
                $('.base-modal button[data-dismiss="modal"]').click(function () {
                    window.location.href = '/order/list';
                });
                $('.base-modal').on('hidden.bs.modal', function () {
                    window.location.href = '/order/list';
                });
            }
        }
    });
    // $('#orderForm').ajaxSubmit({
    //     url: '/order/insert',
    //     type: 'POST',
    //     success: function (response) {
    //         $('.base-modal').find('button[data-dismiss="modal"].btn').html('Ok');
    //         if (response.status === '409') {
    //             $('.base-modal .modal-header').html('<h1>' + response.message + '</h1>');
    //             $('.base-modal').modal('show');
    //         } else {
    //             $('.base-modal .modal-header').html('<h4>Order</h4>');
    //             $('.base-modal .modal-body').html('<pre>' + response.message + '</pre>');
    //             $('.base-modal').modal('show');
    //             $('.base-modal button[data-dismiss="modal"]').click(function () {
    //                 window.location.href = '/order/list';
    //             });
    //             $('.base-modal').on('hidden.bs.modal', function () {
    //                 window.location.href = '/order/list';
    //             });
    //         }
    //     }
    // });
}
function listingOrder() {
    $('#pageLoadDiv').css('display', 'block');
    $.ajax({
        url: '/order/listing',
        type: 'GET',
        data: {},
        success: function (response) {
            $('#pageLoadDiv').css('display', 'none');
            if (response.data.length > 0 && response.data !== undefined) {
                insertRow(response.data);
            } else {
                var searchResultTableBody = $('#dataTableOrder');
                $(searchResultTableBody).html('');
                $(searchResultTableBody).append("<tr><th colspan=9 class='text-center no-results-found'>No Order found</th></tr>");
                $('#pagination').hide();
            }
        }
    });
}
function insertRow(arrOrder) {
    var currPage = parseInt($("input[action='gotoPage']").val(), 10);
    var i;
    if (currPage > 1) {
        i = (10 * (currPage - 1)) + 1;
    } else {
        i = 1;
    }
    var $strVar = '';
    if (arrOrder) {
        $.each(arrOrder, function (ind, val) {
            $strVar += '<tr>';
            $strVar += '<td>' + i + '</td>';
            if (val.dishId && val.dishId.dishName) {
                $strVar += '<td>' + val.dishId.dishName + '</td>';
            } else {
                $strVar += '<td></td>';
            }
            if (val.quantity) {
                $strVar += '<td>' + val.quantity + '</td>';
            } else {
                $strVar += '<td></td>';
            }
            if (val.dishId && val.dishId.price) {
                $strVar += '<td>'+val.dishId.price+'</td>';
            } else {
                $strVar += '<td></td>';
            }
            $strVar += '</tr>';
            i++;
        });
    }
    $('#dataTableOrder').html($strVar);
    $('.load-bar').hide();
}
function getDishName(){
    $.ajax({
        url :'/api/getAllDishName',
        type:'GET',
        data:{},
        success: function(response){
            var $html = '';
            if (response.data.length > 0) {
                $html += '<option value=""> -- Dish -- </option>';
                $.each(response.data, function (index, objDish) {
                    $html += '<option value = ' + objDish._id + '>' + objDish.dishName + '</options>';
                });
                $('#dishName').html($html).select2({
                    theme: 'bootstrap'
                });
            }
        }
    });
}