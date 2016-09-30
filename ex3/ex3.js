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

// **************************************

function getFile(file) {
  return new Promise(function (resolve) {
    fakeAjax(file, resolve);
  });
}

// request all files at once in "parallel"
var pr3 = getFile('file3');
var pr2 = getFile('file2');
var pr1 = getFile('file1');

pr1.then(console.log).then(function () {
  return pr2;
}).then(console.log).then(function () {
  return pr3;
}).then(console.log).then(function () {
  console.log('Complete');
});
