function newState(x) {
  return {
    get: () => x,
    set: (y) => x = y,
  };
}
function output(x) {
  $("#list").append(x + '<br>');
}
var clix = ASQ.react.of();
var msgs = ASQ.react.of();

$(function () {
  var $btn = $("#btn");
  var allow = newState(true);

  $btn.click(clix.push);

  setInterval(function () {
    allow.set(true);
  }, 999);

  clix.val(function () {
    if (allow.get()) {
      allow.set(!msgs.push('clicky'));
    }
  });

  msgs.val(output);
  window.x = msgs;
});
