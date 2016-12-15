$.ajax({
    type: 'GET',
    url: '../mockdata/lots.json',
    data: {get_param: 'value'},
    dataType: 'json',
    success: function (data) {
        select = document.querySelector('#brandSelect');

        let tmp = new Set();

        tmp.add('All brands');
        render(data);

        data.forEach(e => tmp.add(e.brand));
        select.innerHTML = '<option>' + Array.from(tmp).join('</option><option>') + '</option>';


        $(select).on('change', function (e) {
            let option = this.selectedOptions[0];
            render(filter(option.innerHTML));
        });

        function filter(brandId) {
            let brandID = brandId;
            if (brandID == 'All brands') {
                return data;
            }
            return data.filter(b => b.brand === brandId);
        }

        function render(data) {
            let s = '',
                lots='';
            data.forEach(s => lots += `<section class="col-sm-3 lotInfo">
				<a class="toLotDescr" id="${'lot' + s.id}"><img class="img-responsive lotImg" alt="lotImage" src= "img/lots/${s.id + ".jpg"}">
				<h3>${s.name}</h3>
				</a>
				</section>`);

            $('.lotList').html(lots);

        }
    }
});

