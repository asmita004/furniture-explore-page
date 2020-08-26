$(document).ready(function () {
    var activity = jsonstr;
    $('.open-sidebar').click(function () {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "270px";
        document.getElementById("pagination").style.marginLeft = "270px";
    });

    $('.close-sidebar').click(function () {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        
    });
    var dynamicHtml = "<div class='row'>";
    activity.forEach(function (data) {


        dynamicHtml += "<div class='item' data-category='" + data.category + "' data-price='" + data.price + "'><div class='card'><img src='" + data.img + "'><p class='item-card-title mt-3 mb-3'>" + data.name + "</p><p class='card-text'>" + data.category + "</p><p class='card-righttext'>$" + data.price + "</p><i class='fa fa-shopping-cart'></i></div>";
        for (var i = 0; i < 5; i++) {
            var starClass = i < data.star ? "fa fa-star" : "fa fa-star-o";
            dynamicHtml += "<i class='" + starClass + "'></i>";
        }
        dynamicHtml = dynamicHtml + "</div>"
    });
    document.getElementById("dynamic-datawrap").innerHTML = dynamicHtml;
    pageSize = 9;
    showPagination = function (page) {
        $(".item").hide();
        $(".item").each(function (n) {
            if (n >= pageSize * (page - 1) && n < pageSize * page)
                $(this).show();
        });
    }
    showPagination(1);

    $("#pagination li a").click(function () {
        $("#pagination li a").removeClass("current");
        $(this).addClass("current");
        showPagination(parseInt($(this).text()))
    });
        $boxes = $('.row [data-category]');

    $(".filtercategory").on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var $filterColor = $this.attr('data-filter');
        $boxes.removeClass('is-animated')
            .fadeOut().promise().done(function () {
                $boxes.filter('[data-category = "' + $filterColor + '"]')
                    .addClass('is-animated').fadeIn();
            });
    });
    function showFurniture(minPrice, maxPrice) {
        $(".item").hide().filter(function () {
            var price = parseInt($(this).data("price"), 10);
            return price >= minPrice && price <= maxPrice;
        }).show();
    }

    $(function () {
        var options = {
            range: true,
            min: 0,
            max: 600,
            values: [0, 600],
            slide: function (event, ui) {
                var min = ui.values[0],
                    max = ui.values[1];

                $("#amount").val("$" + min + "   -   $" + max);
                showFurniture(min, max);
            }
        }, min, max;
        $("#price-range").slider(options);

        min = $("#price-range").slider("values", 0);
        max = $("#price-range").slider("values", 1);
        $("#amount").val("$" + min + "   -   $" + max);
        showFurniture(min, max);
        showPagination(1);
    });
});