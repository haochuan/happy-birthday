// $('#test').velocity({ translateY: 500 }, {
//   duration: 3000,
//   easing: [ 100, 8 ]
// });
var App = App || {};

App.remainImageCount = 0;

$(document).ready(function() {
    $('.image').click(function(e) {
        imageOut($(this).attr('id'));
    });
    loadImages(5);
});

function loadImages(number) {
    var images = getRandomImages(number);
    $('#image_1').attr('src', images[0]);
    $('#image_2').attr('src', images[1]);
    $('#image_3').attr('src', images[2]);
    $('#image_4').attr('src', images[3]);
    $('#image_5').attr('src', images[4]);
    showImages(number);
}

function showImages(number) {
    App.remainImageCount = number;
    for (var i = 1; i <= number; i++) {
        (function(i) {
            var speed = Math.floor((Math.random() * 500)  + 200);
            var bounce = Math.floor((Math.random() * 6)  + 6);
            $('#image_' + i).velocity(
                {translateY: 500},
                {
                    duration: 2000,
                    easing: [speed, bounce]
                });    
        })(i);
    }
}

function imageOut(id) {
    App.remainImageCount--;
    $('#' + id).velocity(
        {translateY: -100},
        {
            duration: 2000,
            easing: [100, 8]
    });  
    if (App.remainImageCount === 0) {
        showImages(5);
    }
}

function getRandomImages(count) {
    var numbers = {};
    var images = [];
    var index;
    while (images.length < count) {
        index = Math.floor((Math.random() * 11) + 1);
        if (!numbers[index]) {
            numbers[index] = true;
            images.push('images/' + index + '.png');
        }
    }
    return images;
}