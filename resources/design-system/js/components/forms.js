;(function (BUNN, $, undefined) {

    $(document).on('click', '.js-toggle-password', function (e) {

        const $trigger = $(this)
        const $input = $trigger.siblings(".js-password-input");
        const $type = $input.attr("type") === "password" ? "text" : "password";
        
        $input.attr("type", $type)

        const $text = $trigger.text() === "show" ? "hide" : "show";

        $trigger.text($text)
    
    });

})(window.BUNN = window.BUNN || {}, jQuery)
