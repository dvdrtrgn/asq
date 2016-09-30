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
  var text, next;

  fakeAjax(file, function (response) {
    // we want to store response and trigger next step
    next ? next(response) : (text = response);
    }
  });
  return function thunk(cb) {
    // next step cannot be started until ajax is done
    text ? cb(text) : (next = cb);
  };
}

// request all files at once in "parallel"
var th1 = getFile('file1');
var th2 = getFile('file2');
var th3 = getFile('file3');

th1(function (text1) {
  output(text1);
  th2(function (text2) {
    output(text2);
    th3(function (text3) {
      output(text3);
      output('Complete')
    });
  });
});
