var fs = require('fs');
var scrapy = require('node-scrapy');

var readableStream = fs.createReadStream('urls.txt');
var data = '';
readableStream.setEncoding('utf8');

//var selector = '.geo';
var url;
var model = {
  'name': '.firstHeading',
  'location':{ selector: '.geo', unique: true}
};

readableStream.on('data', function(chunk){
  data+=chunk;
});

readableStream.on('end', function(){
  //console.log(data);
  var list = data.split(',');
  console.log(list[0]);

  for (var i = 0; i < list.length; i++) {
    url = list[i];

    scrapy.scrape(url, model, function(err, data) {
        if (err) return console.error(err)
        console.log(data)
    })

  }

})
