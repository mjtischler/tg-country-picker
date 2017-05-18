# Country Picker App
## Welcome! I'm Matt.
Hey y'all! This basic webapp displays country data returned from an api endpoint based on the user input of either a country name or a 2-letter ISO2 country code. It also has a few other tricks up its sleeves:

* Validates form inputs, accounting for special characters, numbers, and emptiness
* Builds an HTML table if a country name is searched and an array is returned
* Incorporates responsive CSS and Material Design

Unfortunately, there are a few areas where it *falls short*:

* Not a sports almanac
* Cannot determine the answer to life, the universe, and everything
* Odorless

Feel free to comment, criticize, or fork 'til your heart's content!

## Run it!
First, clone the repo:

`git clone https://github.com/mjtischler/tg-country-picker.git`

You'll need a basic HTTP server to run the app; I recommend [http-server](https://www.npmjs.com/package/http-server). You can install it from npm with:

`npm install http-server -g`

Once you've cloned the repo and installed the local server, navigate to the repo directory (where `index.html` is located) and run:

`http-server`

The server defaults to port 8080, and you can navigate to the app in your browser by heading to `http://localhost:8080/`. *Voila!* Enjoy!
