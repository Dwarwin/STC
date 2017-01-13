$.ajax({
    type: 'GET',
    url: './mockdata/lots.json',
    data: {get_param: 'value'},
    dataType: 'json',
    success: function (data) {

        let tmp = new Set(), tmp1 = new Set(), filteredData = new Set(), brandId = new Set(), sizeId = new Set(), a = new Set(), b = new Set();

        tmp.add('All');
        tmp1.add('All');
        filteredData = data;
        brandId = 'All';
        sizeId = 'All';
        a = 0;
        b = 8;

        render(data);

        data.forEach(e => tmp.add(e.brand));
        $('#brandSelect')[0].innerHTML = '<option>' + Array.from(tmp).join('</option><option>') + '</option>';
        data.forEach(e => tmp1.add(e.size));
        $('#sizeSelect')[0].innerHTML = '<option>' + Array.from(tmp1).join('</option><option>') + '</option>';


        $('#brandSelect').on('change', function (e) {
            a = 0;
            b = 8;
            let option = this.selectedOptions[0];
            brandId = option.innerHTML;
            render(filter());
        });

        $('#sizeSelect').on('change', function (e) {
            a = 0;
            b = 8;
            let option = this.selectedOptions[0];
            sizeId = option.innerHTML;
            render(filter(option.innerHTML));
        });

        function filter() {
            if (brandId === 'All' && sizeId === 'All') {
                return filteredData = data
            }
            if (brandId != 'All' && sizeId === 'All') {
                filteredData = data.filter(c => c.brand === brandId);
            }
            if (brandId === 'All' && sizeId != 'All') {
                filteredData = data.filter(c => c.size === sizeId);
            }
            if (brandId != 'All' && sizeId != 'All') {
                filteredData = data.filter(c => c.brand === brandId && c.size === sizeId)
            }
            return filteredData;
        }

        $('.next').on('click', function () {
            if (b <= filteredData.length + 3) {
                a = a + 8;
                b = b + 8;
                render(filteredData)
            }
        });
        $('.previous').on('click', function () {
            if (a > 3) {
                a = a - 8;
                b = b - 8;
                render(filteredData)
            }
        });

        function render(data) {
            if (b <= filteredData.length - 1) {
                $('.next').show();
            } else {
                $('.next').hide();
            }
            if (a > 7) {
                $('.previous').show();
            } else {
                $('.previous').hide();
            }
            let lots = '';
            data.slice(a, b).forEach(s => lots +=
                `<section id="${'lotInfo' + s.id}" class="col-md-3 col-sm-4 col-xs-12 lotInfo">
				    <section class="toLotDescr" data-toggle="modal" data-target="${'#modalLot' + s.id}" id="${'lot' + s.id}">
				        <img class="img-responsive lotImg" alt="lotImage" src= "img/lots/${s.id + ".jpg"}" onerror="this.onerror=null;this.src='img/lots/nophoto.jpg'">
				        <h3>${s.name}</h3>
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
                            <img class="img-responsive lotImgDescr" alt="lotImageDescr" src= "img/lots/${s.id + ".jpg"}" onerror="this.onerror=null;this.src='img/lots/nophoto.jpg'">
                        </div>
                        <div class="col-md-8 col-sm-6 col-xs-12">
                            <p>${s.description}</p>
                        </div>
                     </div>
                    </section>
                    </section>
                    </div>
                </section>
                </section>
                `);

            if (!lots) {
                lots = `<h4>No items matched your query</h4>`
            }

            $('.lotList').html(lots);
            let lotsListAnim = $('section.lotInfo');
            $.each(lotsListAnim, function(index, value){
                $(value).fadeIn(1000)
            });
        }
    }
});