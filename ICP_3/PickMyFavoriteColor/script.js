// an array of colors and assign it to a variable colors
var colors = ["22ac5e", "d68236", "71b5c2", "af2655", "b34de7", "e6bd01", "104393", "ca4d94", "4a772d", "c180a7", "958112", "8d2f8d"]

// sets the preview color to the one entered in the input and display its color code using setPreviewColor function
function setPreviewColor(color) {
    $('.preview').css('background-color', color);
    $('.color-code').text($('.preview').css('background-color'));
}

/*
 * addBox method will validate the color and then add color to favorite list
 * First I'm checking weather the user enter hexa decimal or not. At the same time I'm checking whether the input is empty or not.
 * if match then I'm adding to favorite list.
 * else I'm check weather the user selected form displayed colors. if yes then I'm adding to favorite.
*/
function addBox(color) {
    let isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
    if (color != "" && isOk) {
        $('#colors').prepend("<div class='item' style='background-color: " + color + ";'><div>");
    } else {
        if (/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.test($('.preview').css('background-color')))
            $('#colors').prepend("<div class='item' style='background-color: " + $('.preview').css('background-color') + "'><div>");
    }
    $('#color').val("");
    $(".item").bind("click");
}

/*
* This method will call when document is ready.
*/
$(document).ready(function () {
    // count is used to iterate the colors array.
    var count = 0;
    //Adding predefined colors to table
    for (var i = 0; i < 3; i++) {
        var tr = "<tr>";
        for (var j = 0; j < 4; j++) {
            tr = tr + "<td style='background-color:" + colors[count] + ";width:100px;height:100px'></td>";
            count++;
        }
        tr = tr + "</tr>"
        $("#tblcolors").append(tr);
    }

    //set the preview color to one of the colors in the colors array randomly
    setPreviewColor(colors[Math.floor(Math.random() * colors.length)]);
    // an event handler for the key up event i.e. when the user types the color in the input and releases the key on the keyboard
    //The event should set the preview color to the color typed in the input
    $(document).on('keydown keyup keypress', '#color', function () {
        color = $(this).val();
        setPreviewColor(color);
    })

    /*
    * This method will call when user click on particular td in table of predefined colors.
    * This will take the value of the hovered td and then fetching the background color and set the color to preview.
    */
    $("td").on("click", function () {
        var color = $(this).css("background-color");
        setPreviewColor(color);
    });

    /*
    * This method will call when user click on add to favorite color.
    * Taking the input and sending to addBox
    */
    $("#add-to-favorite").on("click", function () {
        addBox($('#color').val())
    })

    /*
    * This method will call when user hover the mouse on favorite color.
    * This will take the value of the hovered div and then fetching the background color and set the color to preview.
    */
    $(document).on("mouseover", "#colors .item", function () {
        let color = $(this).css("background-color");
        setPreviewColor(color);
    });
});
