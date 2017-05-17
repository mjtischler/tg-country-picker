$(function () {
    var CountryController = function () {
        // MT: Here's the meat and potatoes of the search function: our getCountryData function! Feed it an object and it will make a service call to the api and return the results.
        function getCountryData(searchObject) {
            return CountrySearchService.getCountryData(searchObject);
        }

        $('#countryNameInput, #countryCodeInput').submit(function(event) {
            $('.country-info, country-code').empty();

            if (this.id === 'countryCodeInput') {
                var isCode = true;
            } else {
                var isCode = false;
            }

            var searchTerm = this[0].value;

            var data = CountrySearchService.getCountryData({
                isCountryCode: isCode,
                searchTerm: searchTerm
            });

            $('#countryMessage').text(data.messages[1]);

            if (data.result) {
                if (data.result.length) {
                    $.each(data.result, function(index, result) {
                        $('.country-info').append(index + ": " + result.name + '<br>');
                    });
                } else {
                    $('.country-code').text(data.result.alpha2_code);
                }
            }

            event.preventDefault();
        });

        // $('#countryCodeForm').submit(function(event) {
        //     event.preventDefault();
        //
        //     $('.country-info').empty()
        //
        //     var searchTerm = $('#countryCodeInput').val();
        //
        //     var data = CountrySearchService.getCountryData({
        //         isCountryCode: true,
        //         searchTerm: searchTerm
        //     });
        //
        //     $('#countryCodeMessage').text(data.messages[1]);
        //
        //     if (data.result) {
        //         $('.country-info').text(data.result.name)
        //     };
        // });
    }();
});
