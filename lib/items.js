var data = [
  { id: 1, name: 'anchor', price: 40, stock: 3 },
  { id: 2, name: 'rope', price: 12, stock: 20 },
  { id: 3, name: 'lantern', price: 25, stock: 0 },
  { id: 4, name: 'compass', price: 60, stock: 5 },
  { id: 5, name: 'free sample', price: 0, stock: 100 }
];

exports.all = function () {
  return data;
};

exports.find = function (id) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      return data[i];
    }
  }
  return null;
};
