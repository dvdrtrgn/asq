function fakeAjax(url, cb) {
  var fake_responses = {
    "file1": "The first text",
    "file2": "The middle text",
    "file3": "The last text"
  };
  var randomDelay = (Math.round(Math.random() * 1E4) % 800) + 100;

  console.log("Requesting: " + url);

  setTimeout(function () {
    cb(fake_responses[url]);
  }, randomDelay);
}

function output(text) {
  console.log(text);
}

var cache = {};

// **************************************

function getFile(file) {
  if (cache[file]) {
    return Promise.resolve(cache[file]);
  }
  return new Promise(function (resolve) {
    fakeAjax(file, function (str) {
      cache[file] = str;
      resolve(str);
    });
  });
}

// request all files at once in "parallel"
var pr3 = getFile('file3');
var pr2 = getFile('file2');
var pr1 = getFile('file1');

pr1
  .then(console.log).then(function () {
    return getFile('file2');
  }).then(console.log).then(function () {
    return getFile('file3');
  }).then(console.log).then(function () {
    console.log('Complete');
  });
