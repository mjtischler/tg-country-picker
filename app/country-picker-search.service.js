var CountrySearchService = function() {
    'use strict';
    // MT: Here's our empty singleton, to be populated later and shared across the app for all to enjoy.
    var CountryData = {};

    // MT: Let's define our functions!
    var service = {
        getCountry: getCountry,
        getCountryData: getCountryData
    };

    return service;

    function getCountry() {
        return CountryData;
    }

    function getCountryData(searchObject) {
        var url;
        var resultData;

        if (searchObject.isCountryCode) {
            url = 'http://services.groupkt.com/country/get/iso2code/' + searchObject.searchTerm;
        } else {
            url = 'http://services.groupkt.com/country/search?text=' + searchObject.searchTerm;
        }

        // MT: Here, we make the api service request. If it succeeds, we populate our `CountryData` singleton with the return. If it errors out, then we populate `CountryData` with our custom error message. The 'async' key throws a console warning for a deprecated feature, but for the purposes of this exercise, I think it's ok to leave it as-is.
        $.ajax({
            async: false,
            url: url,
            success: function(result) {
                resultData = result.RestResponse;
            },
            error: function() {
                resultData = {
                    messages: [
                        'Error',
                        'An error has occured. Please accept our apologies.'
                    ],
                    result: {}
                }
            }
        });

        // MT: Set the data with the api return.
        setCountry(resultData);

        // MT: Return the data to the requester. YOU'RE WELCOME. Geesh.
        return getCountry();
    }

    function setCountry(resultData) {
        CountryData = resultData;
    }
}();
