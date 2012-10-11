# jQuery.countdown

jQuery.countdown is a simple jQuery plugin to display a countdown on a page.

The plugin is built to make easier perform a countdows based on "seconds", so for example, you could easily countdown from 30 to 0 seconds. Is not meant to be used for splash pages or coming soon pages.

## Methods

### Defaults

    $.fn.countdown.defaults = {
      duration: 1000,
      start: 10,
      end: 0,
      callBack: function() { }
    };

Default options for the `countdown` plugin. Overriding this array globally overrides default options.

### Plugin initialization and start

    $('#countdown').countdow({
      duration: 1000,             // interval between each step
      start: 10,                  // start number of the countdown
      end: 0,                     // end number of the countdown
      callBack: function() { }    // a callback function to be executed when countdown has finished
    });

Initialize the plugin and starts the countdown; optionally you could pass an array of options to override default ones.

### Destroy plugin instance

    $('#countdown').countdown('destroy');

Destroy the instance of the countdown plugin, to free memory.

### Set or get plugin option

    $('#countdown').countdown('option', 'key');
    $('#countdown').countdown('option', 'key', value);

Get or set some option of the plugin instance. Useful to change options on a running countdown.

### Reset plugin counter

    $('#countdown').countdown('reset');

Reset the countdown to the starting number.

### Start a stopped countdown

    $('#countdown').countdown('start');

Start the countdown. You usually won't need this method, but if you have stopped the countdown with `stop()`, with this method is possible to start the countdown again from the point it were left.

### Stop a running countdown

    $('#countdown').countdown('stop');

Stop the countdown.

## Example

Sample usage:

    $('#countdown').countdown({
      start: 10,
      callBack: function(me) {
        $(me).text('All done! This is where you give the reward!');
      }
    });

## Tests

jQuery Countdown public methods are all tested. You can perform the tests opening `specRunner.html` in you browser.

## License

Licensed under the MIT License. See LICENSE for details.

Copyright © 2012 Edoardo Tenani
