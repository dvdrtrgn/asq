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
['file1', 'file2', 'file3']
.map(getFile)
  .reduce(function combo(res, pro) {
    return res.then(function () {
      return pro;
    }).then(console.log);
  }, Promise.resolve())
  .then(function () {
    console.log('Complete');
  });
