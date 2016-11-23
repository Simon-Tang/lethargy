"use strict";

vex.defaultOptions.className = 'vex-theme-uw';

(function () {
    var defaultGreetings = [
        "Focus! Learn! Fight!",
    ];

    var show420Time = true;

    var customGreetings;
    var greetings;

    chrome.storage.sync.get([
        'show420Time',
        'customGreetings',
    ], function (data) {
        show420Time = _.get(data, 'show420Time', true);
        $('#show420Time').prop('checked', show420Time);

        customGreetings = _.get(data, 'customGreetings', []);
        greetings = _.concat(defaultGreetings, customGreetings);
        $('#greeting').text(getGreeting());
    });

    $(document).ready(function () {
        setIntervalAndExecute(function() {
            $('#clock').text(getTime());
        }, 1000);

        $('#aboutButton').click(function () {
            // FIXME: The window closes when I don't use setTimeout with vex.
            setTimeout(function () {
                vex.dialog.alert({
                    'unsafeMessage': 'Lethargy disrupts the new tab page with an innovative goose. <hr />  <a href="https://www.reddit.com/r/uwaterloo/">Creator website</a> <br /> <a href="about.html" target="_blank">Copyright Attributions</a>',
                });
            }, 0);
        });

        var optButton = $('#optionsButton');
        optButton.click(function () {
            var optPane = $('#optionsPane');
            optPane.fadeToggle({
                "progress": function () {
                    if (!optButton.is(':hover')) {
                        optButton.css('opacity', 0.5 + optPane.css('opacity') / 2);
                    }
                },
                "complete": function () {
                    if (optPane.is(':visible'))
                        optButton.css('opacity', '1');
                    else
                        optButton.css('opacity', '');
                }
            });
        });

        $('#show420Time').change(function () {
            chrome.storage.sync.set({'show420Time': this.checked});
            show420Time = this.checked;
            $('#clock').text(getTime());
        });
    });

    function setIntervalAndExecute(func, delay) {
        setInterval(func, delay);
        func();
    }

    var getTime = (function() {
        var startTime = new Date();
        return function() {
            var hours, minutes;
            if (show420Time) {
                var elapsed = (new Date()) - startTime;
                hours = 4 + Math.floor(elapsed / 3600000);
                minutes = (Math.floor(elapsed / 60000) + 20) % 60;
            } else {
                var now = new Date();
                hours = now.getHours();
                minutes = now.getMinutes();
            }
            while (hours > 12) hours -= 12;
            if (hours === 0) hours = 12;
            minutes = ('00' + minutes);
            minutes = minutes.substr(minutes.length - 2, 2);
            return hours + ':' + minutes;
        };
    })()

    function getGreeting() {
        var i = _.random(0, greetings.length - 1);
        return greetings[i];
    }
})();
