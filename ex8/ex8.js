function newState(ini) {
  var val = ini;
  var me = {
    get: () => val,
    set: (tmp) => val = tmp,
    reset: () => me.set(ini),
  };
  return me;
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
    allow.reset();
  }, 999);

  clix.val(function () {
    if (allow.get()) {
      allow.set(!msgs.push('clicky'));
    }
  });

  msgs.val(output);
  window.x = msgs;
});
