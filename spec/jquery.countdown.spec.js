describe('jQuery Countdown', function () {
  var countdown;
  var timerCallback;

  beforeEach(function () {
    $('<div id="countdown"></div>').appendTo('body');
    countdown = $("#countdown");
    countdown.countdown();
  });

  afterEach(function () {
    $("#countdown").remove();
  });

  xit('should stop when the last number is reached', function() {});

  describe('init()', function() {
    it('should apply class countdown on the selected element', function () {
      expect(countdown.hasClass('countdown')).toBe(true);
    });

    it('should set the "reset" data attribute to FALSE', function() {
      expect(countdown.data('reset')).toBe(false);
    });

    it('should set the "stop" data attribute to FALSE', function() {
      expect(countdown.data('stop')).toBe(false);
    });

    it('should set the "to" data attribute to NULL', function() {
      expect(countdown.data('to')).toBe(null);
    });

    it('should run automatically after initialization', function() {
      expect(countdown.hasClass('running')).toBe(true);
    });
  });

  describe('destroy()', function() {
    beforeEach(function() {
      countdown.countdown('destroy');
    });

    it('should remove the "countdown" class', function() {
      expect(countdown.hasClass('countdown')).toBe(false);
    });

    it('should remove the "reset" data', function() {
      expect(countdown.data('reset')).toBe(undefined);
    });

    it('should remove the "stop" data', function() {
      expect(countdown.data('stop')).toBe(undefined);
    });

    it('should remove the "to" data', function() {
      expect(countdown.data('to')).toBe(undefined);
    });

    it('should remove the "plugin_countdown" data', function() {
      expect(countdown.data('plugin_countdown')).toBe(undefined);
    });

  });

  describe('option()', function() {
    it('should get the correct value for the specified key', function() {
      expect(countdown.countdown('option', 'start')).toEqual(10);
    });

    it('should set the correct value for the specified key', function() {
      countdown.countdown('option', 'start', 3);
      expect(countdown.countdown('option', 'start')).toEqual(3);
    });
  });

  describe('reset()', function() {
    it('should set the "to" attribute to the correct value', function() {
      countdown.data('to', 9);
      countdown.countdown('reset');
      expect(countdown.data('to')).toBe($.fn['countdown'].defaults.start);
    });
  });

  describe('start()', function() {
    beforeEach(function() {
      countdown.countdown('start');
    });

    it('should set the "stop" attribute to FALSE', function() {
      expect(countdown.data('stop')).toBe(false);
    });

    it('should remove the "stopped" class', function() {
      expect(countdown.hasClass('stopped')).toBe(false);
    });

    it('should run the countdown', function() {
      expect(countdown.hasClass('running')).toBe(true);
    });
  });
  
  describe('stop()', function() {
    beforeEach(function() {
      countdown.countdown('stop');
    });
    
    it('should set the "stop" attribute to TRUE', function() {
      expect(countdown.data('stop')).toBe(true);
    });

    it('should remove the "running" class', function() {
      expect(countdown.hasClass('running')).toBe(false);
    });
    
    it('should add the "stopped" class', function() {
      expect(countdown.hasClass('stopped')).toBe(true);
    });
  });
  
});
