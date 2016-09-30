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
var getFile;

function gf1(file) {
  return function thunk(cb) {
    fakeAjax(file, cb);
  }
}

function gf2(file) {
  var text, next;

  fakeAjax(file, function (rz) {
    if (next) {
      next(rz)
    } else {
      console.log('Saving', file);
      text = rz;
    }
  });
  return function thunk(cb) {
    if (text) cb(text)
    else next = cb;
  };
}

if (Math.random() > 0.5) {
  console.log("concurrent");
  getFile = gf1;
} else {
  console.log("parallel");
  getFile = gf2;
}

// request all files "concurrently" or "in parallel"
var th1 = getFile('file1');
var th2 = getFile('file2');
var th3 = getFile('file3');

th1(function (text1) {
  console.log(text1);
  th2(function (text2) {
    console.log(text2);
    th3(function (text3) {
      console.log(text3);
      console.log('Complete')
    });
  });
});
