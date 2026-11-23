var express = require('express');
var minimist = require('minimist');
var items = require('./lib/items');

var args = minimist(process.argv.slice(2));
var PORT = args.port || process.env.PORT || 3000;
var unusedSetting = 'never read';
var app = express();

// Stable sort by ascending price (replaces lodash sortBy)
function sortByPrice(list) {
  return list.slice().sort(function (a, b) { return a.price - b.price; });
}
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
  res.json(sortByPrice(result));
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
  res.json(sortByPrice(result));
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
