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

// **************************************

function getFile(file) {
  return new Promise(function (done) {
    fakeAjax(file, done);
  });
}

var prom = ['file1', 'file2', 'file3'].map(getFile);

ASQ().runner(function* () {
  while (prom.length)
    yield prom.shift().then(output);
  output('Complete');
});
