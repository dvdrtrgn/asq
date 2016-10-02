var Box = (function ($) {
  function swap(B, p, q) {
    [B[p], B[q]] = [B[q], B[p]];
    return true;
  }

  function normalize(B) {
    B.ud = B.t > B.b && swap(B, 't', 'b');
    B.bw = B.l > B.r && swap(B, 'l', 'r');
    B.w = B.r - B.l;
    B.h = B.b - B.t;
    return B;
  }

  function make(t, r, b, l) {
    return normalize({
      t, r, b, l
    });
  }

  function colorize(B) {
    var color;
    if (B.bw) color = B.ud ? 'yellow' : 'orange';
    else color = B.ud ? 'blue' : 'green';
    return color;
  }

  function draw(lt, rb) {
    var B = make(lt[1], rb[0], rb[1], lt[0]);
    var div = $('<div>');

    div.css({
      left: B.l - 1,
      top: B.t - 1,
      width: B.w,
      height: B.h,
      position: 'absolute',
      backgroundColor: colorize(B),
      border: '1px solid red',
    }).appendTo('body');

    return B;
  }

  return {
    draw,
    make
  };
}(jQuery));
