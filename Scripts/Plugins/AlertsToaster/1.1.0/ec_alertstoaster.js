// ALERT TOASTER V1.1.0
// DEVELOPERS: Pedro Olivença
// DATE: 2015/07/07
// TOAST NOTIFICATIONS
(function ($) {
    $.fn.extend({
        //plugin name 
        ec_alertsToaster: function (options) {
            //message: Alerts Toaster message (string)
            //top: Alerts Toaster outer wrapper top position (string)
            //type: Alerts Toaster message type (string:state-warning,state-error,state-success,state-info)
            //wrapperClass: Alerts Toaster wrapper class (string)
            //toastLife: Toast alert lifetime (integer: milliseconds)
            var defaults = {
                message: " ",
                top: "60px",
                type: "state-success",
                wrapperClass: "AlertsToaster",
                toastLife: null
            };
            options = $.extend(defaults, options);
            var message = options.message;
            var wrapperClass = options.wrapperClass;
            var type = options.type;
            var time = options.toastLife;


            return $(this).each(function () {

                if ($("div." + wrapperClass).length <= 0) {
                    $("body").append("<div class='" + wrapperClass + "'></div>");
                }

                var wrapper = $("." + options.wrapperClass);
                wrapper.css("top", options.top);

                var itemTemplateString = "<div class='toast-item " + type + "'><div class='toast-wrpp'>" + message + "</div><div class='close'>&times;</div></div>";
                var itemTemplateObject = $(itemTemplateString);

                wrapper.append(itemTemplateObject).find(".toast-item").fadeIn();

                $(".close", itemTemplateObject).click(function () {
                    $(this).parent(".toast-item").animate({
                        opacity: 0
                    }, 300, function () {
                        $(this).css("height", $(this).outerHeight());
                        $(this).animate({
                            height: "0px",
                            marginTop: "0px"
                        }, 250, "easeInCubic", function () {
                            $(this).remove();
                        });
                    });
                });

                if (time) {
                    window.setTimeout(function () {
                        $(".close", itemTemplateObject).trigger("click");
                    }, time);
                }
            });

        }
    });
})(jQuery);