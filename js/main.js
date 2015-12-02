var App = App || {};

// track how many images left on the screen
App.remainImageCount = 0;
App.clickCount = 0;
App.currentNote = 0;
App.audioContext = null;
App.oscNode = null;

App.score = [
    {
        freq: 130.81,
        duration: 300
    },
    {
        freq: 146.83,
        duration: 300
    },
    {
        freq: 130.81,
        duration: 300
    },
    {
        freq: 174.61,
        duration: 300
    },
    {
        freq: 164.81,
        duration: 600
    },

    {
        freq: 130.81,
        duration: 300
    },
    {
        freq: 146.83,
        duration: 300
    },
    {
        freq: 130.81,
        duration: 300
    },
    {
        freq: 196.00,
        duration: 300
    },
    {
        freq: 174.61,
        duration: 600
    },

    {
        freq: 130.81,
        duration: 300
    },
    {
        freq: 261.63,
        duration: 300
    },
    {
        freq: 220.00,
        duration: 300
    },
    {
        freq: 174.61,
        duration: 300
    },
    {
        freq: 146.83,
        duration: 600
    },

    {
        freq: 233.08,
        duration: 300
    },
    {
        freq: 220.00,
        duration: 300
    },
    {
        freq: 174.61,
        duration: 300
    },
    {
        freq: 196.00,
        duration: 300
    },
    {
        freq: 174.61,
        duration: 600
    },

];

$(document).ready(function() {
    initWebAudio();
    $('body').height(window.innerHeight);
    // image click handler
    $('.image').click(function(e) {
        playNote();
        imageOut($(this).attr('id'));
    });
    // track click count
    $('body').click(function(e) {
        App.clickCount++;
        changeInstruction();

    });

    $('body')[0].addEventListener('touchend', function(e) {
        // e.preventDefault();
        if (e.target.tagName === 'BODY') {
            App.clickCount++;
            changeInstruction();
        }
    }, false);

    $('#instruction-text').addClass('animated rubberBand');
});

function initWebAudio() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        App.audioContext = new AudioContext();
    } catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
}

function playNote() {
    App.oscNode = App.audioContext.createOscillator();
    App.gainNode = App.audioContext.createGain();
    App.gainNode.gain.value = 0.8;
    App.oscNode.type = 'sine'; // sine, square, sawtooth, triangle

    // Note that the belows are in the type of AudioParam
    App.oscNode.frequency.value = App.score[App.currentNote].freq;
    App.oscNode.connect(App.gainNode);
    App.gainNode.connect(App.audioContext.destination);
    // App.oscNode.detune.value = note.detune;
    var currentTime = App.audioContext.currentTime;
    App.oscNode.start(currentTime);
    setTimeout(function() {
        App.gainNode.gain.value = 0;
        App.currentNote = (App.currentNote + 1) % 20;
    }, App.score[App.currentNote].duration);
}

/**
 * Change instruction based on the click number
 */
function changeInstruction() {
    if (App.clickCount === 10) {
        $('#instruction-text').addClass('animated hinge')
        setTimeout(function() {
            $('#instruction-text').text('Then try clicking the gift below');
            $('#instruction-text').removeClass();
            $('#instruction-text').addClass('animated bounceInDown')
        }, 200);

        loadImages(5);
    } 

    if (App.clickCount === 15) {
        $('#instruction-text').addClass('animated rollOut');
        setTimeout(function() {
            $('#instruction-text').text('Happy Birthday!');
            $('#instruction-text').removeClass();
            $('#instruction-text').addClass('animated bounceInDown')
        }, 200);

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