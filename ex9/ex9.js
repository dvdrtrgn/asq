$(document).ready(function () {
  var $btn = $("#btn"),
    $list = $("#list");

  $btn.click( /* TODO */ );

  // Hint: ASQ().runner( .. )

  // TODO: setup sampling go-routine and
  // channel, populate $list
});

var x1, x2;

function fromEvent(el, evtyp) {
  var ch = ASQ.csp.chan(2);

  $(el).on(evtyp, function (evt) {
    ASQ.csp.putAsync(ch, evt);
    x1 = [evt.clientX, evt.clientY];
  });
  return ch;
}

ASQ().runner(
  ASQ.csp.go(function* () {
    var ch = fromEvent('html', 'mousemove');
    while (true) {
      var evt = yield ASQ.csp.take(ch);
      x2 = [evt.clientX, evt.clientY];
      if (x1.join() !== x2.join()) {
        console.log(Box.draw(x1, x2))
      };
    }
  })
);
