var App = App || {};

// track how many images left on the screen
App.remainImageCount = 0;
App.clickCount = 0;

$(document).ready(function() {
    $('body').height(window.innerHeight);
    // image click handler
    $('.image').click(function(e) {
        imageOut($(this).attr('id'));
    });
    // track click count
    $('body').click(function(e) {
        App.clickCount++;
        changeInstruction();

    });
    $('#instruction-1').addClass('animated rubberBand');
});

/**
 * Change instruction based on the click number
 */
function changeInstruction() {
    if (App.clickCount === 10) {
        $('#instruction-1').addClass('animated hinge')
        $('#instruction-2').show();
        $('#instruction-2').addClass('animated bounceInDown');
        loadImages(5);
    } 

    if (App.clickCount === 15) {
        $('#instruction-2').addClass('animated rollOut');
    }
}

/**
 * Load the image based on the src
 * @param  {Number} number image count
 */
function loadImages(number) {
    // get the src path array
    var images = getRandomImages(number);
    $('#image_1').attr('src', images[0]);
    $('#image_2').attr('src', images[1]);
    $('#image_3').attr('src', images[2]);
    $('#image_4').attr('src', images[3]);
    $('#image_5').attr('src', images[4]);
    showImages(number);
}

/**
 * Show images with animations
 * @param  {Number} number image count
 */
function showImages(number) {
    App.remainImageCount = number;
    var viewportHeight = window.innerHeight;
    for (var i = 1; i <= number; i++) {
        (function(i) {
            // get random animation speed and bounce parameters
            var speed = Math.floor((Math.random() * 500)  + 200);
            var bounce = Math.floor((Math.random() * 6)  + 6);
            $('#image_' + i).velocity(
                {translateY: viewportHeight - 300},
                {
                    duration: 2000,
                    easing: [speed, bounce]
                });    
        })(i);
    }
}

/**
 * remove image after click
 * @param  {String} id image id
 */
function imageOut(id) {
    App.remainImageCount--;
    $('#' + id).velocity(
        {translateY: -200});  
    // if there is no image on the screen, load another 5
    if (App.remainImageCount === 0) {
        loadImages(5);
    }
}

/**
 * Get image src path
 * @param  {Number} count The number of image
 * @return {Array}       image path array
 */
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