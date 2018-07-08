// let paginator = null;

var quantity;
var objDone = {};
$(function () {
    listingKitchen();
    $(document).on('click', '.sure-done', function () {
        var $this = $(this);
        var id = $this.data('ref');
        quantity = $this.data('quantity');
        $('.base-modal .modal-header').html('<h4>Mark as Done</h4>');
        $('.base-modal .modal-body').html('<p>Do you want to mark this order as Done?</p>');
        $('.base-modal .modal-footer').html('<button type="button" data-dismiss="modal" class="btn btn-default">Close</button><button id="doneId" class="sure-order-done btn btn-info" value="' + id + '">Done</button>');
        $('.base-modal').modal('show');
    });
    $(document).on('click', '.sure-order-done', function () {
        var id = document.getElementById('doneId').value;
        markOrderAsDone(quantity, id);
    });
});
function listingKitchen(objCreatedTillNow) {
    $('#pageLoadDiv').css('display', 'block');
    $.ajax({
        url: '/kitchen/listing',
        type: 'GET',
        data: {},
        success: function (response) {
            $('#pageLoadDiv').css('display', 'none');
            if (response.data.length > 0 && response.data !== undefined) {
                insertRow(response.data, objCreatedTillNow);
            } else {
                var searchResultTableBody = $('#dataTableKitchen');
                $(searchResultTableBody).html('');
                $(searchResultTableBody).append("<tr><th colspan=9 class='text-center no-results-found'>No Display found</th></tr>");
                $('#pagination').hide();
            }
        }
    });
}
function insertRow(arrKitchen, objCreatedTillNow) {
    var currPage = parseInt($("input[action='gotoPage']").val(), 10);
    var i;
    if (currPage > 1) {
        i = (10 * (currPage - 1)) + 1;
    } else {
        i = 1;
    }
    var $strVar = '';
    if (arrKitchen) {
        $.each(arrKitchen, function (ind, val) {
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
            if (val.createdTillNow) {
                $strVar += '<td>' + val.createdTillNow + '</td>';
            } else {
                $strVar += '<td></td>';
            }
            if (val.dishId && val.dishId.price) {
                $strVar += '<td>' + val.dishId.price + '</td>';
            } else {
                $strVar += '<td></td>';
            }
            $strVar += "<td><a class='btn btn-info sure-done' data-ref="
                + val.dishId._id + " data-quantity=" + val.quantity + ">Done</a></td>";
            $strVar += '</tr>';
            i++;
        });
    }
    $('#dataTableKitchen').html($strVar);
    $('.load-bar').hide();
}
function markOrderAsDone(quantity, _id) {
    $.ajax({
        url: '/kitchen/createdTillDish',
        type: 'POST',
        data: { dishId: _id },
        success: function (response) {
            var lastDone, createdTillNow;
            var product = 1;
            var objDone = {};
            if (response.data.length === 0) {
                createdTillNow = product * parseInt(quantity, 10);
                lastDone = createdTillNow;
                objDone = {
                    _id: _id,
                    quantity: quantity,
                    lastDone: lastDone,
                    createdTillNow: createdTillNow
                };
                $('.base-modal').modal('hide');
                addCreatedTillDish(objDone);
            } else {
                lastDone = createdTillNow;
                createdTillNow = (response.data[0].createdTill) + (product * parseInt(quantity, 10));
                objDone = {
                    _id: _id,
                    quantity: quantity,
                    lastDone: lastDone,
                    createdTillNow: createdTillNow
                };
                $('.base-modal').modal('hide');
                addCreatedTillDish(objDone);
            }
        }
    });
}

function addCreatedTillDish(objCreatedTillNow) {
    $.ajax({
        url: '/kitchen/addCreatedTillDish',
        type: 'POST',
        data: objCreatedTillNow,
        success: function (response) {
            if (response.data.length === 0) {
                listingKitchen();
            } else {
                listingKitchen();
            }
        }
    });
}