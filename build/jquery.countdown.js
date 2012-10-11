/*
 * Class:      countdown
 * Author:     Edoardo Tenani
 * Website:    http://about.me/edoardo.tenani
 * Version:    1.0.2
 * Date:       11-10-2012
 * Tested On:  jQuery 1.8.0
 * Require:    Bel Alman jQuery doTimeout plugin
 *             http://benalman.com/projects/jquery-dotimeout-plugin/
 * License:    MIT License
 *
 * Develop using the jQuery plugin boilerplate by Jonathan Nicol (@f6design)
 *   http://f6design.com/journal/2012/05/06/a-jquery-plugin-boilerplate/
 *
 * THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
;(function($) {
  var pluginName = 'countdown';
 
  /**
   * Plugin object constructor.
   * Implements the Revealing Module Pattern.
   */
  function Plugin(element, options) {
    // References to DOM and jQuery versions of element.
    var el = element;
    var $el = $(element);

    // Extend default options with those supplied by user.
    options = $.extend({}, $.fn[pluginName].defaults, options);
 
    /**
     * Initialize the plugin instance.
     *
     * @access private
     */
    function init() {
      $el.addClass('countdown');

      $el.data('reset', false);
      $el.data('stop', false);
      $el.data('to', null);

      run();

      return this;
    }
 
    /**
     * Reset countdown current instance
     *
     * usage: $('#el').countdown('reset');
     *
     * @access public
     */
    function reset() {
      $el.data('to', options.start);
    }

    /**
     * Run the countdown.
     *
     * @access private
     */
    function run() {
      var data, reset, settings, to;
      settings = options;

      $el.addClass('running');

      return $el.each(function() {
        _this = this;

        //loop
        $.doTimeout('jQueryCountDown', settings.duration, function() {

          if ($(_this).data('stop') == true)
            return false;

          to = $(_this).data('to');
          reset = $(_this).data('reset');

          if (reset || !to && to != settings.end) {
            to = settings.start;
            $(_this).data('to', to);
            $(_this).data('reset', false);
          }

          if (to > settings.end) {
            $(_this).text(to);
            $(_this).data('to', to - 1);
          }
          else {
            $(_this).text('0');
            settings.callBack(_this);
            stop();
          }

          // enable looping
          return true;
        });

        return _this;
      });
    }

    /**
     * Start the countdown after it has been stopped using stop().
     *
     * usage: $('#el').countdown('start');
     *
     * @access public
     */
    function start() {
      $el.data('stop', false);
      $el.removeClass('stopped');
      run();
    }

    /**
     * Stop the countdown.
     *
     * usage: $('#el').countdown('stop');
     *
     * @access public
     */
    function stop() {
      $el.data('stop', true);
      $el.removeClass('running').addClass('stopped');
    }
 
    /**
     * Get/set a plugin option.
     *
     * Get usage: $('#el').countdown('option', 'key');
     * Set usage: $('#el').countdown('option', 'key', value);
     *
     * @access public
     */
    function option(key, val) {
      if (val) {
        options[key] = val;
      } else {
        return options[key];
      }
    }
 
    /**
     * Destroy plugin.
     *
     * Usage: $('#el').countdown('destroy');
     *
     * @access public
     */
    function destroy() {
      // Iterate over each matching element.
      $el.each(function() {
        var el = this;
        var $el = $(this);
 
        $el.removeClass('countdown');

        $el.removeData('reset');
        $el.removeData('stop');
        $el.removeData('to'); 

        // Remove Plugin instance from the element.
        $el.removeData('plugin_' + pluginName);
      });
    }
 
    /**
     * Callback hooks.
     * Usage: In the defaults object specify a callback function:
     * hookName: function() {}
     * Then somewhere in the plugin trigger the callback:
     * hook('hookName');
     *
     * @access private
     */
    function hook(hookName) {
      if (options[hookName] !== undefined) {
        // Call the user defined function.
        // Scope is set to the jQuery element we are operating on.
        options[hookName].call(el);
      }
    }
 
    // Initialize the plugin instance.
    init();
 
    // Expose methods of Plugin we wish to be public.
    return {
      option: option,
      destroy: destroy,
      reset: reset,
      start: start,
      stop: stop
    };
  }
 
  /**
   * Plugin definition.
   */
  $.fn[pluginName] = function(options) {
    if (typeof arguments[0] === 'string') {
      var methodName = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);
      var returnVal;
      this.each(function() {
        if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
          returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
        } else {
          throw new Error('Method ' +  methodName + ' does not exist on jQuery.' + pluginName);
        }
      });
      if (returnVal !== undefined){
        return returnVal;
      } else {
        return this;
      }
    } else if (typeof options === "object" || !options) {
      return this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    }
  };
 
  // Default plugin options.
  // Options can be overwritten when initializing plugin, by
  // passing an object literal, or after initialization:
  // $('#el').countdown('option', 'key', value);
  $.fn[pluginName].defaults = {
    duration: 1000,
    start: 10,
    end: 0,
    callBack: function() { }
  };
 
})(jQuery);
