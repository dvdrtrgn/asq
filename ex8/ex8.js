function newState(ini) {
  var val = ini;
  var tmr = newTimer(999);
  var me = {
    get: () => val,
    set: (tmp) => {
      val = tmp;
      me.reset();
    },
    reset: () => tmr.reset(() => me.set(ini)),
  };
  return me;
}

function newTimer(ms) {
  var tmr, me = {
    clear: () => clearTimeout(tmr),
    reset: (fn) => tmr = me.clear() || setTimeout(fn, ms),
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

  clix.val(function () {
    if (allow.get()) {
      allow.set(!msgs.push('clicky'));
    }
  });

  msgs.val(output);
  window.x = msgs;
});
