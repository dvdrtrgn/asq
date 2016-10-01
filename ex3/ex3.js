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

function think(act, ...arg) {
  return function thunk() {
    return arg.length ? act.apply(null, arg) : act;
  };
}

// **************************************

function getFile(file) {
  return new Promise(function exec(resolve) {
    fakeAjax(file, resolve);
  });
}

// request all files at once in "parallel"
['file1', 'file2', 'file3'].map(getFile)
  .reduce(function (done, prom) {
    return done.then(think(prom)).then(console.log);
  }, Promise.resolve()).then(think(console.log, 'Completed'));
