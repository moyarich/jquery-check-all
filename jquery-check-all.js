;(function ($, window, document) {
  var pluginName = 'checkAll';

  var defaults = {
    container: document,
    childCheckboxes: 'input[type=checkbox]',
    showIndeterminate: false
  };

  function checkAll(element, options) {
    this.$el = $(element);
    this.options = $.extend({}, defaults, this.$el.data(), options) ;
    this.init();
  }

  checkAll.prototype.init = function() {
    this._checkChildren();

    var plugin     = this,
        $container = plugin.$el.closest(plugin.options.container),
        $children  = $(plugin.options.childCheckboxes, $container).not(plugin.$el);

    this.$el.on('change', function(e) {
      $children.prop('checked', $(this).prop('checked'));
    });
  
    $(document).on('change', $children, function(e) {
      plugin._checkChildren();
    });
  };

  // prevent multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
          new checkAll(this, options));
      }
    });
  }

  checkAll.prototype._checkChildren = function() {
    var plugin        = this,
        $container    = plugin.$el.closest(plugin.options.container),
        $children     = $(plugin.options.childCheckboxes, $container).not(plugin.$el),
        totalCount    = $children.length,
        checkedCount  = $children.filter(':checked').length,
        indeterminate = plugin.options.showIndeterminate && checkedCount > 0 && checkedCount < totalCount;

        plugin.$el.prop('indeterminate', indeterminate);
        plugin.$el.prop('checked', checkedCount === totalCount && totalCount !== 0);
  }

})(jQuery, window, document);
