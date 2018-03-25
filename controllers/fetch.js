var Note = require('../models/Note');
var Headline = require('../models/Headline');

var cheerio = require('cheerio');
var request = require('request');

exports.scrape_get =  function (req, res) {
    request('https://techcrunch.com', function (error, response, body) {
        var $ = cheerio.load(body);

        var results = [];
        // Now, we grab every post block
        $(".post-block").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text, summary, and href of every link, and save them as properties of the result object
            result.title = $(this).find(".post-block__title__link").text().trim();
            result.url = $(this).find(".post-block__title__link").attr("href").trim();
            result.summary = $(this).find(".post-block__content").text().trim();

            results.push(result);
            
        });

        console.log(`Scraped ${results.length} articles.`);

        // results.forEach(element => {
        //     Headline.create(element)
        //     .then(dbHeadline => {
        //         totalAdded++;
        //     })
        //     .catch(err => {
        //         notAdded++;
        //     });
        // });

        Promise.all( results.map( (element) => Headline.create(element)).map(p => p.catch(e => e)) )
        .then ( promises => {
            var totalAdded = 0;
            var notAdded = 0;
            var headlines = [];
            
            promises.forEach( element => {
                if (element.id) {
                    totalAdded++
                    headlines.push(element);
                }
                else if (element.code)
                {
                    notAdded++;
                }
            });
            
            res.json( { totalAdded, notAdded , headlines} );
        })


        // Promise.all( results.map( (element) => Headline.create(element)).map(p => p.catch(e => e)) )
        // .then( results => {
        //     console.log(results);
        // })
        // .catch( err => {
        //     console.log('err');
        // });
        // console.log(totalAdded, notAdded)
        
        // res.json( { totalAdded, notAdded } );



        // Headline.insertMany(results, {ordered: false})
        // .then( dbHeadline => {
        //     console.log(`Added ${dbHeadline.length} articles to DB.`);
        //     res.status(201);
        //     res.json(dbHeadline);
        // })
        // .catch ( err => {
        //     console.log(`Added ${err.result.nInserted} articles to DB.`);
        //     console.log(`Did not add ${err.result.getWriteErrorCount()} articles already exist in DB.`);
        //     res.status(500).end();
        // });

        
    });
};