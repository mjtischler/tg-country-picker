var CountrySearchService = function() {
    var CountryData = {};

    var service = {
        getCountry: getCountry,
        getCountryData: getCountryData
    };

    return service;

    function getCountry() {
        return CountryData;
    }

    function getCountryData(searchObject) {
        var resultData;

        if (searchObject.isCountryCode) {
            var url = 'http://services.groupkt.com/country/get/iso2code/' + searchObject.searchTerm;
        } else {
            var url = 'http://services.groupkt.com/country/search?text=' + searchObject.searchTerm;
        }

        // MT: The 'async' key throws a console warning for a deprecated feature. Consider refactoring.
        $.ajax({
            async: false,
            url: url,
            success: function(result) {
                resultData = result.RestResponse;
            }
        });

        setCountry(resultData);

        return getCountry();
    }

    function setCountry(resultData) {
        CountryData = resultData;
    }
}();
