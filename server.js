var express = require('express');
var _ = require('lodash');
var items = require('./lib/items');

function portFromArgs(argv) {
  for (var i = 0; i < argv.length; i++) {
    if (argv[i] === '--port' && i + 1 < argv.length) {
      return argv[i + 1];
    }
    if (argv[i].indexOf('--port=') === 0) {
      return argv[i].slice(7);
    }
  }
  return undefined;
}

var PORT = portFromArgs(process.argv.slice(2)) || process.env.PORT || 3000;
var unusedSetting = 'never read';
var app = express();
var requestCount = 0;

app.use(function (req, res, next) {
  requestCount++;
  console.log('request ' + requestCount + ' ' + req.method + ' ' + req.url);
  next();
});

app.get('/health', function (req, res) {
  res.json({ status: 'ok', requests: requestCount });
});

// Same filtering written twice on purpose: one for the list, one for the cheap list
app.get('/items', function (req, res) {
  var result = [];
  var all = items.all();
  for (var i = 0; i < all.length; i++) {
    if (all[i].price > 0) {
      if (all[i].stock > 0) {
        if (req.query.maxPrice) {
          if (all[i].price <= req.query.maxPrice) {
            result.push(all[i]);
          }
        } else {
          result.push(all[i]);
        }
      }
    }
  }
  res.json(_.sortBy(result, 'price'));
});

app.get('/items/cheap', function (req, res) {
  var result = [];
  var all = items.all();
  for (var i = 0; i < all.length; i++) {
    if (all[i].price > 0) {
      if (all[i].stock > 0) {
        if (all[i].price <= 20) {
          result.push(all[i]);
        }
      }
    }
  }
  res.json(_.sortBy(result, 'price'));
});

app.get('/items/:id', function (req, res) {
  var item = items.find(req.params.id);
  if (item == null) {
    res.status(404).json({ error: 'not found' });
  } else {
    res.json(item);
  }
});

// Catch-all route: the "*" syntax is not accepted by the next major version of Express
app.get('*', function (req, res) {
  res.status(404).json({ error: 'not found' });
});

if (require.main === module) {
  app.listen(PORT, function () {
    console.log('listening on ' + PORT);
  });
}

module.exports = app;
