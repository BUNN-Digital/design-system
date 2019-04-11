;(function(BUNN, $, undefined) {

    $(document).on('click', '[data-collapsible-trigger]', function(e) {
        var $trigger = $(this);
        var $parent = $trigger.closest('[data-collapsible]');
        var target = $trigger.data('collapsible-target');
        var content = document.getElementById(target);

        if ($parent.hasClass('collapsed')) {
            $parent.removeClass('collapsed').addClass('expanded');
            $(content).slideDown('fast');
        }
        else {
            $parent.removeClass('expanded').addClass('collapsed');
            $(content).slideUp('fast');
        }
    });

})(window.BUNN = window.BUNN || {}, jQuery);
