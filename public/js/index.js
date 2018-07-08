/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(function() {
    $.ajax({
        url: '/api/count-dashboard-stats',
        type: 'get',
        cache: true,
        complete: function() {
        },
        success: function(data) {
            $('#orderCount').html(data[0]);
            $('#dishCount').html(data[1]);
        }
    });
});
