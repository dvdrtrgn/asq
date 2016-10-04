var ItemsText = (function() {

  var words = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate consectetur sem sed efficitur. Nulla ac egestas velit. Cras elementum orci vel sodales dapibus. Etiam tempus ac mi eu elementum. Proin nibh lorem, luctus eget dolor eget, sollicitudin pharetra velit. Quisque scelerisque libero ut elit consectetur, vel placerat diam finibus. Vestibulum vitae velit eget orci mattis bibendum id sed nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum nibh at nisi ullamcorper euismod. Phasellus sed varius metus. Nullam pretium ex id augue ultricies condimentum. Nunc nisl arcu, placerat quis condimentum in, consequat vel lectus. Pellentesque ullamcorper sed enim quis congue. Pellentesque et elit in dui fermentum tempor. Praesent enim quam, viverra sed ipsum non, iaculis aliquet libero. Maecenas quis egestas sem. Sed sit amet malesuada turpis. Nam tempor velit at nisi lacinia, at vestibulum dolor bibendum. Sed venenatis in eros quis blandit. Maecenas nec aliquet ex, at accumsan quam. Vestibulum semper, libero ac rhoncus facilisis, augue diam interdum ex, in eleifend turpis lorem euismod sem.";

  return {
    more: function() {
      var start = Math.trunc(Math.random() * 1E9) %
        (words.length - 200);
      var text = words.substr(start).match(
        /(?:^|(?:\.\s+))((?:[A-Z][^\.]+\.(?:\s+|$)){3})/
      );
      return text ? text[0].replace(/^\.\s+/, "") : next();
    }
  };

})();
