function output(x) {
  $("#list").append(x + '<br>');
}
var clix = ASQ.react.of();
var msgs = ASQ.react.of();

$(function () {
  var $btn = $("#btn");
  var allow = true;

  $btn.click(clix.push);

  setInterval(function () {
    allow = true;
  }, 999);

  clix.val(function () {
    if (allow) {
      allow = !msgs.push('clicky');
    }
  });

  msgs.val(output);
  window.x = msgs;
});
