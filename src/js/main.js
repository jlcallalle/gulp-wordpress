// Main

var MyApp = {

    onlyNumbers : function() {
        $('.only-numbers').on('keypress', function(event) {
            var numbers = /[0-9]/g;
            var key = String.fromCharCode(event.which);
            if ($.inArray(event.keyCode) >= 0 || numbers.test(key)) {
                return true;
            }
            return false;
        });
    },
    onlyLetters : function () {
        $('.only-letters').on('keypress', function(event) {
            var englishAlphabetAndWhiteSpace = /[A-Za-z- ]/g;
            var arr_latin_character = [8,37,39,193,225,200,232,205,237,211,243,218,250,209,241];
            var key = String.fromCharCode(event.which);
            if ($.inArray(event.keyCode, arr_latin_character) >= 0 || englishAlphabetAndWhiteSpace.test(key)) {
                return true;
            }
            return false;
        });
    },
}

$(function () {
    console.log('hello wordpress');
    
    if ($('.only-numbers').length) {
        MyApp.onlyNumbers();
    }

    if ($('.only-letters').length) {
        MyApp.onlyLetters();
    }

});