var express = require('express')
var app = express()
 
app.set('port', (process.env.PORT || 5000))

var distDir = __dirname + "/dist/";
app.use(express.static(distDir))

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})
