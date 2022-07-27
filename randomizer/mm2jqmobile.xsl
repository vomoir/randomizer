<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" version="1.0" encoding="utf-8" indent="yes"/>
<xsl:template match="/">
<html>
	<head>
		<meta name="viewport" content="width=1200" />
		<title>Fathom.js - Portable Test</title>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<title>RNDMZR</title>
		<style>
			@media print{
				.group{height:100%;}
			}
			.group{
				margin:1em;
				padding:1em;
			}
			#group_list{
				display:none;
			}
		</style>
		<link rel="stylesheet"  href="css/themes/default/jquery.mobile-1.3.0.css"/>
		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700"/>
		<script src="js/jquery.js"></script>
		<script src="js/jquery.mobile-1.3.0.js"></script>
	</head>
	<body>
		<xsl:apply-templates select="//node"/>
	</body>
</html>
</xsl:template>

<xsl:template match="node">
	<xsl:if test="position() = 1">
		<div id="{@ID}" data-role="page" class="ui-responsive-panel">

			<div data-role="header" data-theme="f">
				<xsl:value-of select="@TEXT"/>
				<a href="#nav-panel" data-icon="bars" data-iconpos="notext">Menu</a>
				<a href="#add-form" data-icon="plus" data-iconpos="notext">Add</a>
			</div><!-- /header -->
			<div data-role="panel" data-position="left" data-position-fixed="true" data-display="reveal" id="nav-panel" data-theme="a">

					<ul data-role="listview" data-theme="a" data-divider-theme="a" style="margin-top:-16px;" class="nav-search">
						<li data-icon="delete" style="background-color:#111;">
							<a href="#" data-rel="close">Close menu</a>
						</li>
						<xsl:for-each select="node">
							<li><a href="#{@ID}"><xsl:value-of select="@TEXT"/></a></li>
						</xsl:for-each>
					</ul>
			</div>
	    </div>
	</xsl:if>
	
	<xsl:if test="position() != 1">
		<div id="{@ID}" data-role="page">
			<div data-role="content">
				<xsl:choose>
					<xsl:when test="@TEXT">
						<xsl:value-of select="@TEXT"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:copy-of select="richcontent/html/body"/>
						<a href="#{../@ID}" data-role="button" data-rel="back" datatheme="b">Go Back</a>
					</xsl:otherwise>
				</xsl:choose>
			</div>
			
			<div data-role="footer">
				<h4>Footer of #main page</h4>
			</div>
		</div>
	</xsl:if>
</xsl:template>

<xsl:template match="text()"/>
</xsl:stylesheet>