//AJAX call to populate the dropdown of account managers in brand and franchise
function getAccountManagers() {
    $.ajax({
        url: '/api/accountManagersDetails',
        dataType: 'json',
        success: function (result) {
            var $html = '';
            if (result.data !== undefined && result.data.length > 0) {
                $html += '<option value="" selected> Select Account Manager Name </option>';
                $.each(result.data, function (index, details) {
                    $html += '<option value=' + details._id + '>' + details.managerName + '</option>';
                });
                $('#account_manager').html($html).select2({
                    theme: 'bootstrap'
                });
            }
        }
    });
}
function getGroupNameAttributes(domain, type) {
    var getAttrData = { 'attrDomain': domain, 'attrType': type };
    $.ajax({
        url: '/api/getGroupNameAttributes',
        type: 'GET',
        dataType: 'json',
        data: getAttrData,
        success: function (result) {
            var $html = '';
            var arrGroupName = [];
            if (result.data !== undefined && result.data.length > 0) {
                $.each(result.data, function (index, details) {
                    $html += '<option value=' + details._id + '>' + details.name + '</option>';
                    arrGroupName.push(details.name);
                });
            }
            $('#group_name').select2({
                theme: 'bootstrap',
                placeholder: 'Select',
                tags: arrGroupName,
                maximumSelectionSize: 1
            });
            $('#group_name').on('change', function () {
                $(this).valid();
                //Solution for the above issue
                $.ajax({
                    url: '',
                    success: function () {
                        $('#group_name').select2({
                            theme: 'bootstrap',
                            placeholder: 'Select Group Name',
                            tags: arrGroupName,
                            maximumSelectionSize: 1
                        });
                    }
                });
            });
        }
    });
}

function getCuisineAttributes(domain, type) {
    var getAttrData = { 'attrDomain': domain, 'attrType': type };
    $.ajax({
        url: '/api/getCuisineAttributes',
        type: 'GET',
        dataType: 'json',
        data: getAttrData,
        success: function (result) {
            var $html = '';
            var arrCuisines = [];
            if (result.data !== undefined && result.data.length > 0) {
                $.each(result.data, function (index, details) {
                    $html += '<option value=' + details._id + '>' + details.name + '</option>';
                    arrCuisines.push(details.name);
                });
            }
            $('#cuisine').select2({
                theme: 'bootstrap',
                placeholder: 'Select',
                tags: arrCuisines
            });
            $('#cuisine').on('change', function () {
                $(this).valid();
                $.ajax({
                    url: '',
                    data: $('#cuisine'),
                    success: function () {
                        $('#cuisine').select2({
                            theme: 'bootstrap',
                            placeholder: 'Select',
                            tags: arrCuisines
                        });
                    }
                });
            });
        }
    });
}

function getOutletCode(outletId) {
    $.ajax({
        url: '/api/getOutletCode',
        data: { _id: outletId },
        success: function (response) {
            if (response.data) {
                document.getElementById('outletCode').value = response.data.outletCode;
            } else {
                $('.base-modal .modal-header').html('<h4>Message</h4>');
                $('.base-modal .modal-body').html('<p>' + response.message + '</p>');
                $('.base-modal').modal('show');
            }
        }
    });
}

function getAllBrands() {
    $.ajax({
        url: '/api/getAllBrands',
        type: 'POST',
        dataType: 'json',
        success: function (resBrands) {
            var $html = '';
            if (resBrands.length > 0) {
                $html += '<option value=""> -- Brand Name -- </option>';
                $.each(resBrands, function (index, brandNames) {
                    $html += '<option value = ' + brandNames._id + '>' + brandNames.brand_name + '</options>';
                });
                $('#search_brand_name').html($html).select2({
                    theme: 'bootstrap',
                });
            }
        }
    });
}

function getAllCities() {
    $.ajax({
        url: '/api/getAllCities',
        type: 'POST',
        dataType: 'json',
        success: function (resCities) {
            var $html = '';
            if (resCities.length > 0) {
                $html += '<option value=""> -- City -- </option>';
                $.each(resCities, function (index, cityNames) {
                    $html += '<option value = ' + cityNames._id + '>' + cityNames.cities + '</options>';
                });
                $('#search_city_name').html($html).select2({
                    theme: 'bootstrap'
                });
                $('#city').html($html).select2({
                    theme: 'bootstrap'
                });
            }
        }
    });
}
function getAllStates() {
    $.ajax({
        url: '/api/getAllStates',
        type: 'POST',
        dataType: 'json',
        success: function (resStates) {
            var $html = '';
            if (resStates.length > 0) {
                $html += '<option value=""> -- State -- </option>';
                $.each(resStates, function (index, stateNames) {
                    $html += '<option value = ' + stateNames._id + '>' + stateNames.state + '</options>';
                });
                $('#state').html($html).select2({
                    theme: 'bootstrap'
                });
            }
        }
    });
}
function getAllCinemaChain() {
    $.ajax({
        url: '/api/getAllCinemaChain',
        type: 'POST',
        dataType: 'json',
        success: function (resCinemaChain) {
            var $html = '';
            if (resCinemaChain.length > 0) {
                $html += '<option value=""> -- Cinema Chain -- </option>';
                $.each(resCinemaChain, function (index, cinemaChainNames) {
                    $html += '<option value = ' + cinemaChainNames._id + '>' + cinemaChainNames.cinemachain + '</options>';
                });
                $('#cinemaChain').html($html).select2({
                    theme: 'bootstrap'
                });
            }
        }
    });
}
function getAllCinemaHall() {
    $.ajax({
        url: '/api/getAllCinemaHall',
        type: 'POST',
        dataType: 'json',
        success: function (resCinemaHall) {
            var $html = '';
            if (resCinemaHall.length > 0) {
                $html += '<option value=""> -- Cinema Hall -- </option>';
                $.each(resCinemaHall, function (index, cinemaHallNames) {
                    $html += '<option value = ' + cinemaHallNames._id + '>' + cinemaHallNames.cinemahall + '</options>';
                });
                $('#cinemahall').html($html).select2({
                    theme: 'bootstrap'
                });
            }
        }
    });
}
function getAllLocality() {
    $.ajax({
        url: '/api/getAllLocality',
        type: 'GET',
        dataType: 'json',
        success: function (resLocality) {
            var $html = '';
            if (resLocality.length > 0) {
                $html += '<option value=""> -- Locality -- </option>';
                $.each(resLocality, function (index, localityNames) {
                    $html += '<option value = ' + localityNames._id + '>' + localityNames.locality + '</options>';
                });
                $('#search_locality').html($html).select2({
                    theme: 'bootstrap',
                });
            }
        }
    });
}
function getAttrTypeByDomain(domain) {
    var reqParam = { domain: domain };
    $.ajax({
        url: '/attribute/getAttrByDomain',
        type: 'POST',
        data: reqParam,
        success: function (resAttr) {
            var $html = '';
            $html += '<option value=""> -- Select Type -- </option>';
            if (resAttr.status !== 409 && resAttr.data.length > 0) {
                $.each(resAttr.data, function (index, objAttr) {
                    $html += '<option value ="' + objAttr + '">' + objAttr + '</options>';
                });
                $('#attribute-type').removeAttr('disabled');
                $('#attribute-type').html($html).select2({
                    theme: 'bootstrap'
                });
            } else {
                alert('Something went wrong!');
            }
        }
    });
}
function getAttributeTypeBrand(brandId, callback) {
    $.ajax({
        url: '/attribute/getBrandAttribute',
        type: 'GET',
        data: { brandID: brandId },
        success: function (resData) {
            callback(resData.data);
        }
    });
}
/**
 * Getting attributes of type Brand Category and domain brand
 * @param {*} domain
 */
function getAttributesByCategory(domain) {
    $.ajax({
        url: '/api/getAttributesByCategory',
        type: 'GET',
        data: { domain: domain },
        success: function (resCategory) {
            var $html = '';
            $html += '<option value=""> -- Select Brand Category -- </option>';
            if (resCategory.status !== 409 && resCategory.data.length > 0) {
                $.each(resCategory.data, function (index, objCategory) {
                    $html += '<option value ="' + objCategory.name + '">' + objCategory.name + '</options>';
                });
                $('#brandCat').removeAttr('disabled');
                $('#brandCat').html($html);
            } else {
                alert('Something went wrong!');
            }
        }
    });
}

function getBrandNameByBrandId(brandId) {
    $.ajax({
        url: '/api/getBrandNameByBrandId',
        type: 'GET',
        data: { brandId: brandId },
        success: function (resBrandName) {
            var $html = '';
            if (resBrandName.status !== 409 && resBrandName.data.length > 0) {
                $html += '<option value ="' + resBrandName.data[0]._id + '">' + resBrandName.data[0].brand_name + '</options>';
                $('#Brand').html($html).select2({
                    theme: 'bootstrap'
                });
            } else {
                alert('Brand Name not found!')
            }
        }
    });
}