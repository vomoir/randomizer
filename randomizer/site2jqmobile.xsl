<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" version="1.0" encoding="utf-8" indent="yes"/>
<xsl:template match="/">
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	<title>Swipe page demo - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="css/jquery.mobile-1.3.0-beta.1.css"/>
	<link rel="stylesheet" href="css/jqm-demos.css"/>
	<script src="js/jquery-1.7.1.min.js"></script>
	<script src="js/jquery.mobile.demos.js"></script>
	<script>
		// Bind to "mobileinit" before you load jquery.mobile.js
		// Set the default transition to slide
		$(document).on( "mobileinit", function() {
			$.mobile.defaultPageTransition = "slide";
		});
	</script>
	<script src="js/jquery.mobile-1.3.0-beta.1.js"></script>
	<script>
		$( document ).on( "pageinit", "[data-role='page'].demo-page", function() {
			var page = "#" + $( this ).attr( "id" ),
				// Get the filename of the next page that we stored in the data-next attribute
				next = $( this ).jqmData( "next" ),
				// Get the filename of the previous page that we stored in the data-prev attribute
				prev = $( this ).jqmData( "prev" );

			// Check if we did set the data-next attribute
			if ( next ) {
				// Prefetch the next page
				$.mobile.loadPage( next + ".html" );
				// Navigate to next page on swipe left
				$( document ).on( "swipeleft", page, function() {
					$.mobile.changePage( next + ".html" );
				});
				// Navigate to next page when the "next" button is clicked
				$( ".control .next", page ).on( "click", function() {
					$.mobile.changePage( next + ".html" );
				});
			}
			// Disable the "next" button if there is no next page
			else {
				$( ".control .next", page ).addClass( "ui-disabled" );
			}
			// The same for the previous page (we set data-dom-cache="true" so there is no need to prefetch)
			if ( prev ) {
				$( document ).on( "swiperight", page, function() {
					$.mobile.changePage( prev + ".html", { reverse: true } );
				});
				$( ".control .prev", page ).on( "click", function() {
					$.mobile.changePage( prev + ".html", { reverse: true } );
				});
			}
			else {
				$( ".control .prev", page ).addClass( "ui-disabled" );
			}
		});
    </script>
	<style>
		/* Set the background image sources */
		#newyork { background-image: url(../_assets/img/newyork.jpg); }
		#buenosaires { background-image: url(../_assets/img/buenosaires.jpg); }
		#paris { background-image: url(../_assets/img/paris.jpg); }
		#capetown { background-image: url(../_assets/img/capetown.jpg); }
		#seoul { background-image: url(../_assets/img/seoul.jpg); }
		#sydney { background-image: url(../_assets/img/sydney.jpg); }
		/* Background settings */
		.demo-page {
			background-size: cover;
			background-position: center center;
			background-repeat: no-repeat;
		}
		/* Transparent footer */
		.ui-footer {
			background: none;
			border: none;
		}
		/* The footer won't have a height because there are only two absolute positioned elements in it.
		So we position the buttons from the bottom. */
		.control.ui-btn-left, .trivia-btn.ui-btn-right {
			top: auto;
			bottom: 7px;
			margin: 0;
		}
		/* Custom styling for the trivia source */
		small {
			font-size: .75em;
			color: #666;
		}
		/* Prevent text selection while swiping with mouse */
		.ui-header, .ui-title, .control .ui-btn, .trivia-btn {
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			-o-user-select: none;
			user-select: none;
		}
	</style>
</head>
<body>
		<xsl:apply-templates/>

<div data-role="page" data-theme="c">

    <div data-role="header" data-theme="f">
        <h1><xsl:value-of select="@name"/></h1>
        <h2><xsl:value-of select="@tagline"/></h2>
        <a href="../" data-icon="home" data-iconpos="notext" data-ajax="false">Home</a>
    </div><!-- /header -->

	<div data-role="content">

		<div class="content-primary">

        	<h2>Swipe to navigate</h2>

            <div data-demo-html="#city" data-demo-js="true" data-demo-css="true">
            	<p>This demo shows how you can use the swipe event to navigate between pages. We are using single HTML files for each page. Here you can see the JavaScript and CSS source. On each of the demo pages you can see the page markup as well.</p>

                <p><a href="newyork.html" data-transition="fade" data-role="button" data-inline="true" data-theme="c">Open swipe page demo</a></p>
            </div>

		</div><!--/content-primary -->

	</div><!-- /content -->

</div><!-- /page -->

<div data-role="page" id="city" class="demo-page" data-dom-cache="true" data-theme="a" data-prev="prevCity" data-next="nextCity">

	<!-- "city", "prevCity" and "nextCity" are used as placeholders and contain the name of the applicable city in our demo files. -->

	<div data-role="header" data-position="fixed" data-fullscreen="true" data-id="hdr" data-tap-toggle="false">
		<h1>City</h1>
        <a href="swipe-page.html" data-direction="reverse" data-icon="delete" data-iconpos="notext" data-shadow="false" data-icon-shadow="false">Back</a>
    </div><!-- /header -->

	<div data-role="content">

		<div id="trivia-city" class="trivia ui-content" data-role="popup" data-position-to="window" data-tolerance="50,30,30,30" data-theme="d">
        	<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
			<p>Here some text.</p>
        </div><!-- /popup -->

	</div><!-- /content -->

    <div data-role="footer" data-position="fixed" data-fullscreen="true" data-id="ftr" data-tap-toggle="false">
		<div data-role="controlgroup" class="control ui-btn-left" data-type="horizontal" data-mini="true">
        	<a href="#" class="prev" data-role="button" data-icon="arrow-l" data-iconpos="notext" data-theme="d">Previous</a>
        	<a href="#" class="next" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-theme="d">Next</a>
        </div>

		<a href="#trivia-city" data-rel="popup" class="trivia-btn ui-btn-right" data-role="button" data-icon="info" data-iconpos="left" data-theme="d" data-mini="true">Trivia</a>
    </div><!-- /footer -->

</div><!-- /page -->

</body>
</html>
</xsl:template>

<xsl:template match="text()"/>
</xsl:stylesheet>