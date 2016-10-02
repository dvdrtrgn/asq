$(document).ready(function () {
  var $btn = $("#btn"),
    $list = $("#list");
  var throttle;
  var clix = ASQ.react.of();
  var msgs = ASQ.react.of();
  function output(x) {
    $list.append(x + '<br>');
  }

  $btn.click(clix.push);

  setInterval(function () {
    throttle = true;
  }, 999);

  clix.val(function () {
    if (throttle) {
      throttle = false;
      msgs.push('clicky');
    }
  });

  msgs.val(output);
  window.x = msgs;
});
