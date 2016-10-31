var fs = require('fs');
var scrapy = require('node-scrapy');

var readableStream = fs.createReadStream('urls.txt');
var data = '';
readableStream.setEncoding('utf8');

var url;
var model = {
  'name': '.firstHeading',
  'location':{ selector: '.geo', unique: true}
};
var locations = [];

readableStream.on('data', function(chunk){
  data+=chunk;
});

readableStream.on('end', function(){
  //console.log(data);
  var list = data.split(',');
  fs.writeFile('data.json')

  //console.log(list[0]);

  for (var i = 0; i < list.length; i++) {
    url = list[i];
    console.log(url);

    scrapy.scrape(url, model, function(err, data) {
        if (err) return console.error(err);

        else{
          var json = JSON.stringify(data, null, 2);
            //fs.writeFile('data.json', json, 'utf8', finished);
            fs.appendFile('data.json', '\n\n' + json, finished);
            function finished(err) {
            console.log('Finished writing additional.json')
            console.log(data);
            }
        }

        //console.log(data);
        locations.push(data)
    })

  }

})

console.log(locations)
