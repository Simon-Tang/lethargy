"use strict";
(function () {
    function saveOptions() {
        chrome.storage.sync.set({
            'show420Time': $('#show420Time').is(':checked'),
        }, function () {
            var status = $('#status');
            status.text('Options saved.');
            status.fadeIn();
            setTimeout(function () {
                status.fadeOut();
            }, 1000);
        });
    }

    function restoreOptions() {
        chrome.storage.sync.get({
            'show420Time': true,
        }, function (data) {
            $('#show420Time').prop('checked', data['show420Time']);
        });
    }

    $(document).ready(function () {
        restoreOptions();
        $('#save').click(saveOptions);
    });
})();
