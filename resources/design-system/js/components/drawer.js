;(function(BUNN, $, undefined) {

    // -- Global Methods -- //

    BUNN.openDrawer = function(target) {
        var $drawer = $('#' + target);
        var $closeBtn = $drawer.find('.js-drawer-close-btn');
        $('body').addClass('drawer-open');
        $drawer.addClass('drawer--open');
        $closeBtn.on('click', BUNN.closeDrawer);
    };

    BUNN.closeDrawer = function() {
        var $openDrawer = $('.drawer--open');

        if ($openDrawer) {
            $('body').removeClass('drawer-open');
            $openDrawer.removeClass('drawer--open');
        }
    };

    // -- Event Handlers -- //

    $('.js-drawer-trigger').on('click', function() {
        var targetDrawerId = $(this).data('drawer');
        BUNN.openDrawer(targetDrawerId);
    });

    $(document).on('click', function(e) {
        var $drawer = $('.drawer--open');

        if ($(e.target).hasClass('js-drawers')) {
            BUNN.closeDrawer();
        }
    });

    // Re-position elements for screen size
    enquire.register("screen and (min-width: 1200px)", {
        match: function() {
            BUNN.closeDrawer();
        }
    });

})(window.BUNN = window.BUNN || {}, jQuery);
