var app = angular.module("myApp")
    .service("dataService", ['$http', '$q', function ($http, $q, ENV) {

        var service = {};

        //service.getData = function () {
        //    var deferred = $q.defer();
        //
        //
        //    $http.get('api/endpoint', {cache: true}).
        //        then(function (response) {
        //
        //            deferred.resolve(response);
        //
        //        }, function (response) {
        //            deferred.reject(response);
        //        });
        //
        //    return deferred.promise;
        //
        //};

        var foodData =
        {
            "Alaska Weathervane Seafood": { featureName: "Food Vendors", view: "food" },
            "Anchorhead Coffee": { featureName: "Food Vendors", view: "food" },
            "Bad Albert's": { featureName: "Food Vendors", view: "food" },
            "Ballard Brothers Seafood": { featureName: "Food Vendors", view: "food" },
            "Baskin-Robbins": { featureName: "Food Vendors", view: "food" },
            "Bastille": { featureName: "Food Vendors", view: "food" },
            "BeerFest": { featureName: "Beer Garden", view: '#detail-beerfest' },
            "Berryhills": { featureName: "Food Vendors", view: "food" },
            "Biringer Farms": { featureName: "Food Vendors", view: "food" },
            "Blue Med": { featureName: "Food Vendors", view: "food" },
            "Carlos Catering": { featureName: "Food Vendors", view: "food" },
            "Cousins Gourmet": { featureName: "Food Vendors", view: "food" },
            "Craving Cajun Grill": { featureName: "Food Vendors", view: "food" },
            "Don Luchos": { featureName: "Food Vendors", view: "food", truck: true },
            "Eloi Taste the Caribbean": { featureName: "Food Vendors", view: "food" },
            "Fish Basket": { featureName: "Food Vendors", view: "food", truck: true },
            "Fresh Squeezed Lemonade": { featureName: "Food Vendors", view: "food" },
            "Hapa Food Company": { featureName: "Food Vendors", view: "food" },
            "Hattie’s Hat": { featureName: "Food Vendors", view: "food" },
            "Hawaiian Shaved Ice": { featureName: "Food Vendors", view: "food" },
            "Honey Walnut Prawns": { featureName: "Food Vendors", view: "food" },
            "JJ & Sons Pigglys BBQ": { featureName: "Food Vendors", view: "food" },
            "JJ Froyoyo": { featureName: "Food Vendors", view: "food" },
            "Kaleenka Piroshky": { featureName: "Food Vendors", view: "food" },
            "Kornman of Washington": { featureName: "Food Vendors", view: "food" },
            "Lopez Island Creamery": { featureName: "Food Vendors", view: "food" },
            "Miri's Poppers": { featureName: "Food Vendors", view: "food" },
            "Miss Hannah’s Gourmet Popcorn": { featureName: "Food Vendors", view: "food" },
            "New Orleans Cookery": { featureName: "Food Vendors", view: "food" },
            "NOSH": { featureName: "Food Vendors", view: "food", truck: true },
            "Original Shrimp & Crab Company": { featureName: "Food Vendors", view: "food" },
            "Panda Catering": { featureName: "Food Vendors", view: "food" },
            "PB Goodness": { featureName: "Food Vendors", view: "food" },
            "Peaks Frozen Custard": { featureName: "Food Vendors", view: "food" },
            "Salmon BBQ": { featureName: "Salmon BBQ", view: 'detail-salmon-bbq' },
            "Smokin’ Pete’s BBQ": { featureName: "Food Vendors", view: "food" },
            "Stoneburner": { featureName: "Food Vendors", view: "food" },
            "The Corn Roasters": { featureName: "Food Vendors", view: "food" },
            "Thomas Concessions": { featureName: "Food Vendors", view: "food" },
            "Tornado Potato": { featureName: "Food Vendors", view: "food" },
            "Trident Seafoods": { featureName: "Food Vendors", view: "food" },
            "Tumble Swede": { featureName: "Food Vendors", view: "food" },
            "Ziegler's Bratwurst Haus": { featureName: "Food Vendors", view: "food" }
        };

        var artsCraftsData =
        {
            "A&S Jerky": { featureName: "Arts & Crafts", view: "arts" },
            "Amazing Sheets": { featureName: "Arts & Crafts", view: "arts" },
            "Apple Cox Design": { featureName: "Arts & Crafts", view: "arts" },
            "Art of Letters Photography": { featureName: "Arts & Crafts", view: "arts" },
            "Baraka Gemstones & Jewelry": { featureName: "Arts & Crafts", view: "arts" },
            "Beth Richman Designs": { featureName: "Arts & Crafts", view: "arts" },
            "Bling! Bling!": { featureName: "Arts & Crafts", view: "arts" },
            "Blowing Sands": { featureName: "Arts & Crafts", view: "arts" },
            "Bob’s Freakin Nuts": { featureName: "Arts & Crafts", view: "arts" },
            "Brookfield Farm Bees and Honey": { featureName: "Arts & Crafts", view: "arts" },
            "Capable Father": { featureName: "Arts & Crafts", view: "arts" },
            "Carol Made": { featureName: "Arts & Crafts", view: "arts" },
            "Cascadia Stoneware": { featureName: "Arts & Crafts", view: "arts" },
            "Celia’s Gourmet Foods": { featureName: "Arts & Crafts", view: "arts" },
            "Cellar Door Mercantile": { featureName: "Arts & Crafts", view: "arts" },
            "Classic Collection Hats": { featureName: "Arts & Crafts", view: "arts" },
            "Courtney2k design": { featureName: "Arts & Crafts", view: "arts" },
            "Darwin’s Natural Pet Products": { featureName: "Arts & Crafts", view: "arts" },
            "Diane Culhane Art": { featureName: "Arts & Crafts", view: "arts" },
            "Earth to Gems": { featureName: "Arts & Crafts", view: "arts" },
            "Eastonjane": { featureName: "Arts & Crafts", view: "arts" },
            "Faery Myst Creations": { featureName: "Arts & Crafts", view: "arts" },
            "Fish People Seafood": { featureName: "Arts & Crafts", view: "arts" },
            "Forest Life Creations": { featureName: "Arts & Crafts", view: "arts" },
            "Fun-n-Around": { featureName: "Arts & Crafts", view: "arts" },
            "Fuzzy Ink": { featureName: "Arts & Crafts", view: "arts" },
            "Hans Christensen Designs": { featureName: "Arts & Crafts", view: "arts" },
            "House of Agate": { featureName: "Arts & Crafts", view: "arts" },
            "Jack and AJ Ferrell": { featureName: "Arts & Crafts", view: "arts" },
            "JMcCormick Designs": { featureName: "Arts & Crafts", view: "arts" },
            "Judy Sauer Fiber Artist": { featureName: "Arts & Crafts", view: "arts" },
            "KlapnKlip Soy Candles": { featureName: "Arts & Crafts", view: "arts" },
            "Lucky Penny Jewelry": { featureName: "Arts & Crafts", view: "arts" },
            "Mad Mozaics": { featureName: "Arts & Crafts", view: "arts" },
            "March Hat": { featureName: "Arts & Crafts", view: "arts" },
            "Marmalade Originals": { featureName: "Arts & Crafts", view: "arts" },
            "Mehndi Madness": { featureName: "Arts & Crafts", view: "arts" },
            "Melting Pot Candy": { featureName: "Arts & Crafts", view: "arts" },
            "Michael’s Designs": { featureName: "Arts & Crafts", view: "arts" },
            "Michelle Aitken": { featureName: "Arts & Crafts", view: "arts" },
            "Native Creation": { featureName: "Arts & Crafts", view: "arts" },
            "Native Creation #2": { featureName: "Arts & Crafts", view: "arts" },
            "Northwest Sales / Bubble Wands": { featureName: "Arts & Crafts", view: "arts" },
            "Oluf Nielsen Studio": { featureName: "Arts & Crafts", view: "arts" },
            "Original Baby Bundle": { featureName: "Arts & Crafts", view: "arts" },
            "Over the Line Art": { featureName: "Arts & Crafts", view: "arts" },
            "Rarefy": { featureName: "Arts & Crafts", view: "arts" },
            "RavenGlass Productions": { featureName: "Arts & Crafts", view: "arts" },
            "Sacred Lotus Astrology and Tarot": { featureName: "Arts & Crafts", view: "arts" },
            "Samboroso": { featureName: "Arts & Crafts", view: "arts" },
            "Seciwa’s SW Native Jewelry": { featureName: "Arts & Crafts", view: "arts" },
            "Sibbett Studio": { featureName: "Arts & Crafts", view: "arts" },
            "Strauss Bavarian Nuts": { featureName: "Arts & Crafts", view: "arts" },
            "Tamara Kelly Designs": { featureName: "Arts & Crafts", view: "arts" },
            "The Psychic Temple": { featureName: "Arts & Crafts", view: "arts" },
            "Tim Wistrom – Fine Art Paintings": { featureName: "Arts & Crafts", view: "arts" },
            "Totally Blown Glassworks": { featureName: "Arts & Crafts", view: "arts" },
            "Tribal Root Soda": { featureName: "Arts & Crafts", view: "arts" },
            "Tropical Treasures Jewelry Design": { featureName: "Arts & Crafts", view: "arts" },
            "Two Obsessed Jewelry": { featureName: "Arts & Crafts", view: "arts" },
            "West Coast Sea Glass": { featureName: "Arts & Crafts", view: "arts" }
        };

        var entertainmentData =
        {
            "Big Purple Slide": { featureName: "Big Purple Slide", view: "detail-big-purple-slide" },
            "Festi-Bowl": { featureName: "Festi-Bowl", view: 'detail-festi-bowl' },
            "HomeStreet Bank Stage": { featureName: "Stage", view: "tab-entertainment" },
            "Kid's Deck": { featureName: "Kid's Deck", view: 'detail-kids-deck' },
            "Veris Law Group and Vulcan Inc Main Stage": { featureName: "Main Stage", view: 'detail-mainstage' }
        };

        var otherData =
        {
            "Info Booth": { featureName: "Info Booth", view: 'detail-info-booth' },
            "Ballard Commons Park Restrooms": { featureName: "Ballard Commons Restroom", view: '#detail-restroom-ballard-commons-park' },
            "Market Street Restrooms": { featureName: "Market Street Restroom", view: 'detail-restroom-market-street' },
            "Ballard Avenue Restrooms": { featureName: "Ballard Ave Restroom", view: 'detail-restroom-ballard-avenue' }
        };

        service.seafoodFestData = {
            food: foodData,
            artsCrafts: artsCraftsData,
            entertainment: entertainmentData,
            other: otherData
        };


        return service;
    }]);

