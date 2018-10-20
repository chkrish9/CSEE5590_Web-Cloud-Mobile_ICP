var app = angular.module('translateApp', []);
app.controller('translateCtrl', function ($scope, $http) {
    //Declaring the variables.
    $scope.translatedText = "";
    $scope.options = [
        {"f": "Azerbaijan", "a": "az"},
        {"f": "Malayalam", "a": "ml"},
        {"f": "Albanian", "a": "sq"},
        {"f": "Maltese", "a": "mt"},
        {"f": "Amharic", "a": "am"},
        {"f": "Macedonian", "a": "mk"},
        {"f": "Maori", "a": "mi"},
        {"f": "Arabic", "a": "ar"},
        {"f": "Marathi", "a": "mr"},
        {"f": "Armenian", "a": "hy"},
        {"f": "Mari", "a": "mhr"},
        {"f": "Afrikaans", "a": "af"},
        {"f": "Mongolian", "a": "mn"},
        {"f": "Basque", "a": "eu"},
        {"f": "German", "a": "de"},
        {"f": "Bashkir", "a": "ba"},
        {"f": "Nepali", "a": "ne"},
        {"f": "Belarusian", "a": "be"},
        {"f": "Bengali", "a": "bn"},
        {"f": "English", "a": "en"},
        {"f": "Norwegian", "a": "no"},
        {"f": "Punjabi", "a": "pa"},
        {"f": "Burmese", "a": "my"},
        {"f": "Papiamento", "a": "pap"},
        {"f": "Bulgarian", "a": "bg"},
        {"f": "Persian", "a": "fa"},
        {"f": "Bosnian", "a": "bs"},
        {"f": "Polish", "a": "pl"},
        {"f": "Welsh", "a": "cy"},
        {"f": "Portuguese", "a": "pt"},
        {"f": "Hungarian", "a": "hu"},
        {"f": "Romanian", "a": "ro"},
        {"f": "Vietnamese", "a": "vi"},
        {"f": "Russian", "a": "ru"},
        {"f": "Haitian", "a": "ht"},
        {"f": "Cebuano", "a": "ceb"},
        {"f": "Galician", "a": "gl"},
        {"f": "Serbian", "a": "sr"},
        {"f": "Dutch", "a": "nl"},
        {"f": "Sinhala", "a": "si"},
        {"f": "Hill Mari", "a": "mrj"},
        {"f": "Slovakian", "a": "sk"},
        {"f": "Greek", "a": "el"},
        {"f": "Slovenian", "a": "sl"},
        {"f": "Georgian", "a": "ka"},
        {"f": "Swahili", "a": "sw"},
        {"f": "Gujarati", "a": "gu"},
        {"f": "Sundanese", "a": "su"},
        {"f": "Danish", "a": "da"},
        {"f": "Tajik", "a": "tg"},
        {"f": "Hebrew", "a": "he"},
        {"f": "Thai", "a": "th"},
        {"f": "Yiddish", "a": "yi"},
        {"f": "Tagalog", "a": "tl"},
        {"f": "Indonesian", "a": "id"},
        {"f": "Tamil", "a": "ta"},
        {"f": "Irish", "a": "ga"},
        {"f": "Tatar", "a": "tt"},
        {"f": "Italian", "a": "it"},
        {"f": "Telugu", "a": "te"},
        {"f": "Icelandic", "a": "is"},
        {"f": "Turkish", "a": "tr"},
        {"f": "Udmurt", "a": "udm"},
        {"f": "Spanish", "a": "es"},
        {"f": "Kazakh", "a": "kk"},
        {"f": "Uzbek", "a": "uz"},
        {"f": "Kannada", "a": "kn"},
        {"f": "Ukrainian", "a": "uk"},
        {"f": "Catalan", "a": "ca"},
        {"f": "Urdu", "a": "ur"},
        {"f": "Kyrgyz", "a": "ky"},
        {"f": "Finnish", "a": "fi"},
        {"f": "Chinese", "a": "zh"},
        {"f": "French", "a": "fr"},
        {"f": "Korean", "a": "ko"},
        {"f": "Hindi", "a": "hi"},
        {"f": "Xhosa", "a": "xh"},
        {"f": "Croatian", "a": "hr"},
        {"f": "Khmer", "a": "km"},
        {"f": "Czech", "a": "cs"},
        {"f": "Laotian", "a": "lo"},
        {"f": "Swedish", "a": "sv"},
        {"f": "Latin", "a": "la"},
        {"f": "Scottish", "a": "gd"},
        {"f": "Latvian", "a": "lv"},
        {"f": "Estonian", "a": "et"},
        {"f": "Lithuanian", "a": "lt"},
        {"f": "Esperanto", "a": "eo"},
        {"f": "Luxembourgish", "a": "lb"},
        {"f": "Javanese", "a": "jv"},
        {"f": "Malagasy", "a": "mg"},
        {"f": "Japanese", "a": "ja"},
        {"f": "Malay", "a": "ms"}
    ];

    /*
   * This method will call when the user clicks on Translate button.
   * In this method we will make a call to Yandex API to get the translated text.
   */
    $scope.translate = function () {
        $http({
            method: 'GET',
            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20151023T145251Z.bf1ca7097253ff7e.c0b0a88bea31ba51f72504cc0cc42cf891ed90d2'+
            '&text='+$scope.txtSource+'&lang='+$scope.ddlSource+'-'+$scope.ddlTarget
        }).then(function successCallback(response) {
            console.log(response);
            $scope.translatedText = response.data.text[0];
        }, function errorCallback(response) {
            console.log(response);
        });
    }

});