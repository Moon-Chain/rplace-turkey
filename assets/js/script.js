var renk = [];
for (let index = 0; index < 16; index++) {
    val = (index + 1)
    renk[val] = 'square_color_' + val;
}

var rplace = {
    baslangic_x: 299,
    baslangic_y: 318,
    bitis_x: 432,
    bitis_y: 399,
}

var canvas = {
    width: 133,
    height: 81
}

var kordinant_alan = document.getElementById("kordinant_alan");
var kordinant = document.getElementById("kordinant");
var link_alan = document.getElementById("link");
var color_alan = document.getElementById("color_alan");
var color_name_alan = document.getElementById("color_name");
var flag_pixelart = null;
flag_pixelart_json = $.getJSON('assets/json/flag_pixelart.json', function (data) {
    flag_pixelart = data;
    place_square();
});

function place_square() {
    var place_canvas = document.getElementById("place_canvas");

    var inner_row = canvas.height;
    row_number = 0;
    col_number = 0;

    for (var [onechar, valuer] of Object.entries(flag_pixelart.map)) {

        col_number++;
        if (Number.isInteger(onechar / canvas.width)) {
            col_number = 0;
            row_number++;
            var canvas_row = document.createElement("div");
            canvas_row.classList.add("canvas_row");
            canvas_row.dataset.cy = row_number;
            place_canvas.append(canvas_row);
        }
        var square = document.createElement("div");
        square.classList.add("square");
        square.classList.add(renk[valuer]);
        square.dataset.color = renk[valuer];
        square.dataset.cx = rplace.baslangic_y + row_number;
        square.dataset.cy = rplace.baslangic_x + (col_number + 1);

        var rplace_renk_no = "renk";
        switch (valuer) {
            case 1:
                rplace_renk_no = "1.renk (Turuncu)";
                break;
            case 2:
                rplace_renk_no = "13.renk (Siyah)";
                break;
            case 3:
                rplace_renk_no = "14.renk (Koyu Gri)";
                break;
            case 4:
                rplace_renk_no = "15.renk (Açık Gri)";
                break;
            case 5:
                rplace_renk_no = "16.renk (Beyaz)";
                break;
            default:
                break;
        }

        square.dataset.color_name = rplace_renk_no;

        square.addEventListener("click", e => get_value(e));
        canvas_row.append(square);
    }

    function get_value(val) {
        cy = val.target.dataset.cx;
        cx = val.target.dataset.cy;
        link = 'https://www.reddit.com/r/place/?cx=' + cx + '&cy=' + cy + '&px=146';
        color = val.target.dataset.color;
        color_name = val.target.dataset.color_name;
        kordinant.innerHTML = '( ' + cx + ' , ' + cy + ' )';
        link_alan.innerHTML = 'r/place link: <a target="_blank" href="' + link + '">' + link + '</a>';
        color_alan.setAttribute("class", "");
        color_alan.classList.add(color);
        color_name_alan.innerHTML = color_name;
    }

}