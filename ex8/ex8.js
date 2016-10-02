function newState(ini) {
  var val = ini;
  var me = {
    get: () => val,
    set: (tmp) => val = tmp,
    reset: () => me.set(ini),
  };
  return me;
}

function newTimer(ms) {
  var tmr, me = {
    reset: (fn) => {
      clearTimeout(tmr);
      tmr = setTimeout(fn || (() => {}), ms);
    },
  };
  return me;
}

function newTimedState(ini, ms) {
  var val = newState(ini);
  var tmr = newTimer(ms);
  var me = {
    get: val.get,
    set: val.set,
    reset: (tmp) => {
      val.set(tmp);
      tmr.reset(val.reset);
    },
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
  var allow = newTimedState(true, 999);

  $btn.click(clix.push);

  clix.val(function () {
    if (allow.get()) {
      allow.reset(!msgs.push('clicky'));
    }
  });

  msgs.val(output);
  window.x = msgs;
});
