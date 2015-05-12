(
  function ( )
  {
    jQuery(document).ready
    (
      function ( )
      {
          // Setup page.
        jQuery('body').append("<div id='popup' class='hidden'><p>Placeholder.</p></div>");
        popUp = jQuery('#popup');
        jQuery('body').append("<a id='share' href='#'>Share.</a>");
        shareAnchor = jQuery('#share');

          // Define functions.
        var hide = function (objectToHide)
        {
          objectToHide.addClass('hidden');
        }

        var show = function (objectToShow)
        {
          objectToShow.removeClass('hidden');
        }

        var lastHightlightedObject;
        var hightlight = function (objectToHightlight)
        {
            if (lastHightlightedObject != null)
            {
              lastHightlightedObject.removeClass('highlighted');
            }
            objectToHightlight.addClass('highlighted');
            lastHightlightedObject = objectToHightlight;
        };

          // Define event handlers.
        shareAnchor.on
        (
            'click'
          , function ( ) 
          {
            hide(jQuery(this));

            var paragraphId = jQuery(this).attr('href');
            var paragraph = jQuery(paragraphId);

            hightlight(paragraph);

            show(popUp);

            popUp.contents( ).replaceWith("<p>Content of the pop-up for the paragraph with id of " + paragraphId + ".</p>");
            paragraph.after(popUp);

            return false;
          }
        );

        jQuery('div.record').hover
        (
            function ( )
            {
              if (!jQuery(this).hasClass('highlighted'))
              {
                jQuery(this).after(shareAnchor);
                shareAnchor.attr('href', '#' + jQuery(this).attr('id'));
                show(shareAnchor);
              }
            }
          , function ( ) {}
        );
      }
    );
  }
)( );