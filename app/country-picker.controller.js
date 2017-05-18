$(function () {
    'use strict';

    var CountryController = function () {
        // MT: Here's the meat and potatoes of the search function: our getCountryData function! Feed it an object and it will make a service call to the api and return the results.
        function getCountryData(searchObject) {
            return CountrySearchService.getCountryData(searchObject);
        }

        // MT: Let's check the form inputs before we submit them, and notify the user of any issues.
        $('#countryNameInput, #countryCodeInput').submit(function(event) {
            // MT: Let's prevent the default behavior of the HTML submit function so we can see all of our errors in the console.
            event.preventDefault();

            // MT: We want to clear any results before rendering an error or making a service request.
            $('#countryTable').empty();
            $('.country-code').text('');

            var validForm = false;
            var formId = this.id;
            var searchInput = this[0].value;
            // MT: We'll regex the input and check that it only has letters and spaces (otherwise, how would we search for the United States!).
            var isOnlyLetters = searchInput.match(/^[a-zA-Z\s]*$/);

            // MT: Alright, time to validate! We're going to check for the following: empty inputs; numbers and/or special characters (see `var isOnlyLetters`, above); and country-codes that are NOT 2 letters. If we pass all these tests, we'll mark the `validForm` as true and we can submit our data to the api! Woohoo!
            if ((searchInput.length === 0) && (formId === 'countryNameInput')) {
                $('#countryMessage').text('Please enter something... anything... into the `Country Name` field.');
            } else if (isOnlyLetters === null) {
                $('#countryMessage').text('Please enter letters, not numbers or special characters.');
            } else if ((searchInput.length !== 2) && (formId === 'countryCodeInput')) {
                $('#countryMessage').text('Please enter a two-letter country code.');
            } else {
                validForm = true;
            }

            // MT: If we have a valid form... voila! A request will be made! If not, we'll reset the form, variables, and any previously rendered data and let the user try again.
            if (validForm) {
                submitSearch(this);
            } else {
                $(this[0]).val('');
                formId = '';
                searchInput = '';
            }
        });

        function submitSearch(selectedElement) {
            // MT: In order to populate our data variable below, we first need to parse through the information passed into this submit function. Since this is a shared submit function, two different types of inputs are expected and we have to identify whether we searching by country name or by country code.
            var isCode = checkForCountryCode(selectedElement.id);

            // MT: Normally, we wouldn't want to define a variable based on an exact position in an array (i.e. `selectedElement[0]`). But since we know that this array length won't change, let's keep this definition lightweight and avoid having to for-loop through a collection.
            var searchTerm = getSearchTerm(selectedElement[0]);

            // MT: The service is expecting an object as opposed to a simple search string, because it needs to know which endpoint to hit. It makes that judgment based on the bool `isCountryCode`.
            var data = getCountryData({
                isCountryCode: isCode,
                searchTerm: searchTerm
            });

            // MT: Hooray! We've made a service call, and an object has been returned. Again, we know that the message we want will always be at position `messages[1]` in the array, so let's keep things on the light side and just render the text.
            $('#countryMessage').text(data.messages[1]);

            // MT: If we have a result, let's parse it! If that result is an array, we can render that array in a series of `.country-info` containers in the view. But in the case of a country-code search, no array is returned. Plus, we only need the `alpha2_code` from the object, so let's find it and render that puppy. :dog:
            if (data.result) {
                if (data.result.length) {
                    $('#countryTable').append(
                        '<tr id="countryTableHeader"><th>' + 'Name' + '</th><th>' + 'ISO2 Code' + '</th></tr>'
                    );

                    $.each(data.result, function(index, result) {
                        $('#countryTableHeader').after(
                            '<tr><td>' + result.name + '</td><td>' + result.alpha2_code + '</td></tr>'
                        );
                    });
                } else if (data.result.name) {
                    $('.country-code').text('Country Name: ' + data.result.name);
                }
            }

            // MT: Once we're finished, let's clear the inputs.
            $(selectedElement[0]).val('');
        }

        // MT: I separated these two functions out to make the submit function above easier to read.
        function checkForCountryCode(id) {
            if (id === 'countryCodeInput') {
                return true;
            } else {
                return false;
            }
        }

        function getSearchTerm(value) {
            return value.value;
        }
    }();
});
