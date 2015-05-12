(
  function ( )
  {
    jQuery(document).ready
    (
      function ( )
      {
          // Setup page.
        jQuery('.popup').addClass('hidden');
        //jQuery('.share').removeClass('hidden');

          // Define functions.
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

        var lastPopUp;
        var popUp = function (objectToPopUp)
        {
            if (lastPopUp != null)
            {
              lastPopUp.addClass('hidden');
            }
            objectToPopUp.removeClass('hidden');
            lastPopUp = objectToPopUp;
        };

          // Define event handlers.
        jQuery('a.share').on
        (
            'click'
          , function ( ) 
          {
            popUp(jQuery(jQuery(this).attr('href')));
            hightlight(jQuery('#' + jQuery(this).attr('href').split('-')[1]));
            jQuery(this).addClass('hidden');

            lastPopUp.contents( ).replaceWith("<p>Dynamic content of the pop-up here.</p>");

            return false;
          }
        );

        jQuery('div').hover
        (
            function ( )
            {
              if (!jQuery(this).hasClass('highlighted'))
              {
                jQuery(this)
                  .children('a.share')
                  .removeClass('hidden');
              }
            }
          , function ( )
            {
              if (!jQuery(this).hasClass('highlighted'))
              {
                jQuery(this)
                  .children('a.share')
                  .addClass('hidden');
              }
            }
        );
      }
    );
  }
)( );