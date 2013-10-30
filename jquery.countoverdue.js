/*!
 * 	Copyright (c) 2013 Toadpipe, http://www.soundinavacuum.com
 *  
 * 	Permission is hereby granted, free of charge, to any person obtaining
 * 	a copy of this software and associated documentation files (the
 * 	"Software"), to deal in the Software without restriction, including
 * 	without limitation the rights to use, copy, modify, merge, publish,
 * 	distribute, sublicense, and/or sell copies of the Software, and to
 * 	permit persons to whom the Software is furnished to do so, subject to
 * 	the following conditions:
 * 	
 * 	The above copyright notice and this permission notice shall be
 * 	included in all copies or substantial portions of the Software.
 * 	
 * 	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * 	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * 	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * 	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * 	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * 	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * 	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function($) {

	$.fn.countoverdue = function(options) {
		/*!
		 * Use with div by #id.
		 * 
         */
		var whats = $(this);

		if (options == 'end') {
			clearInterval(timer);
			$(whats).html('');
		}
		else {
			if (timer) {
				clearInterval(timer);
				$(whats).html('');
			}
            var defaults = {
                    timer_span      : "countoverdue-timer",
                    negtimer_span   : "countoverdue-negtimer",
                    timer_pre       : "",
                    negtimer_pre    : "-",
                    separator       : ":",
                    negseparator    : ":",
                    timer_post      : "",
                    negtimer_post   : "",
                };
            if (((typeof options === 'string') || (typeof options === 'number')) && ($.trim(options) != '')) {
                var supplied_date = {date : options};
                var settings = $.extend({}, defaults, supplied_date);
            }
            else {
                var settings = $.extend({}, defaults, options);
            }
			var timertime = new Date(settings.date);
			var now = new Date();
			var count_neg = 0;
			var elapsed = (timertime.getTime() - now.getTime()) / 1000;
			var minss = Math.floor(Math.abs(elapsed) / 60);
			var secss = Math.abs(elapsed) - minss * 60;
			var spli = String(parseInt(secss, 10)).split("");
			if (spli.length < 2) {
				spli = ["0", spli[0]];
			}
            $(whats).html('<span class="' + settings.timer_span + '"></span>');
            $('.' + settings.timer_span, whats).append('<span class="countoverdue-pretimer">' + settings.timer_pre + '</span>');
			$('.' + settings.timer_span, whats).append('<span class="countoverdue-mins">' + minss + '</span>');
            $('.' + settings.timer_span, whats).append('<span class="countoverdue-separator">' + settings.separator + '</span>');
            $('.' + settings.timer_span, whats).append('<span class="countoverdue-tsecs">' + spli[0] + '</span>');
            $('.' + settings.timer_span, whats).append('<span class="countoverdue-osecs">' + spli[1] + '</span>');
            $('.' + settings.timer_span, whats).append('<span class="countoverdue-posttimer">' + settings.timer_post + '</span>');
			if (elapsed < 0) {
				count_neg = 1;
                $('.' + settings.timer_span, whats).addClass(settings.negtimer_span).removeClass(settings.timer_span);
				$('.countoverdue-pretimer', whats).html(settings.negtimer_pre);
                $('.countoverdue-separator', whats).html(settings.negseparator);
                $('.countoverdue-posttimer', whats).html(settings.negtimer_post);
			}
			else {
                $('.countoverdue-pretimer', whats).html(settings.timer_pre);
                $('.countoverdue-separator', whats).html(settings.separator);
                $('.countoverdue-posttimer', whats).html(settings.timer_post);
			}
			var osec = $('.countoverdue-osecs', whats).text();
			var tsec = $('.countoverdue-tsecs', whats).text();
			var min = $('.countoverdue-mins', whats).text();
			var timer = setInterval(function() {
				if (count_neg == 1) {
					if (osec >= 9) {
						if (tsec >= 5) {
							osec = 0;
							$('.countoverdue-osecs', whats).text(osec);
							tsec = 0;
							$('.countoverdue-tsecs', whats).text(tsec);
							$('.countoverdue-mins', whats).text(++min);
						}
						else {
							$('.countoverdue-tsecs', whats).text(++tsec);
							osec = 0;
							$('.countoverdue-osecs', whats).text(osec);
						}
					}
					else {
						$('.countoverdue-osecs', whats).text(++osec);
					}
				}
				else {
					if (osec <= 0) {
						if (tsec <= 0) {
							if (min <= 0) {
								count_neg = 1;
                                $('.' + settings.timer_span, whats).addClass(settings.negtimer_span).removeClass(settings.timer_span);
                                $('.countoverdue-pretimer', whats).html(settings.negtimer_pre);
                                $('.countoverdue-separator', whats).html(settings.negseparator);
                                $('.countoverdue-posttimer', whats).html(settings.negtimer_post);
							}
							else {
								osec = 9;
								$('.countoverdue-osecs', whats).text(osec);
								tsec = 5;
								$('.countoverdue-tsecs', whats).text(tsec);
								$('.countoverdue-mins', whats).text(--min);
							}
						}
						else {
							$('.countoverdue-tsecs', whats).text(--tsec);
							osec = 9;
							$('.countoverdue-osecs', whats).text(osec);
						}
					}
					else {
						$('.countoverdue-osecs', whats).text(--osec);
					}
				}
			}, 1000);
		}
	};

})(jQuery);
