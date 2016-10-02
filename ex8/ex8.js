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
      allow.digress(!msgs.push('clicky'));
    }
  });

  msgs.val(output);
  window.x = msgs;
});

function newState(ini) {
  var val = ini;
  var me = {
    get: () => val,
    set: (tmp) => val = tmp,
    reset: () => me.set(ini),
  };
  return me;
}

function newTimer(ms, _fn) {
  var tmr, me = {
    reset: (fn) => {
      fn = fn || _fn;
      clearTimeout(tmr);
      tmr = setTimeout(fn, ms);
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
    digress: (tmp) => {
      val.set(tmp);
      tmr.reset(val.reset);
    },
  };
  return me;
}

function* getState(ini) {
  var state = ini, tmp, timo;
  var reset = () => state = ini;

  while (true) {
    if (tmp !== undefined) {
      state = tmp;
      clearTimeout(timo);
      timo = setTimeout(reset, 999);
    }
    tmp = (yield state);
  }
}
var foo = getState(9);
