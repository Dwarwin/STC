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
                lots = '';
            data.forEach(s => lots +=
                `<section class="col-md-3 col-sm-4 col-xs-6 lotInfo">
				    <a class="toLotDescr" data-toggle="modal" data-target="${'#modalLot' + s.id}" id="${'lot' + s.id}">
				        <img class="img-responsive lotImg" alt="lotImage" src= "img/lots/${s.id + ".jpg"}">
				        <h3>${s.name}</h3>
				    </a>
				</section>
				
				<section class="modal fade" id="${'modalLot' + s.id}" role="dialog">
                    <div class="modal-dialog modal-lg">

                    <section class="modal-content">
                        <header class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h2 class="modal-title">${s.name}</h2>
                        </header>
                    <section class="modal-body">
                    <div class="row lotInfoDescr">
                        <div class="col-md-4 col-sm-6 col-xs-12">
                            <img class="img-responsive lotImgDescr" alt="lotImageDescr" src= "img/lots/${s.id + ".jpg"}">
                        </div>
                        <div class="col-md-8 col-sm-6 col-xs-12">
                            <p>${s.description}</p>
                        </div>
                     </div>
                    </section>
                    </section>
                    </div>
                </section>
`);

            $('.lotList').html(lots);

        }
    }
});

