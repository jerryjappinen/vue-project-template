{# Iomport macros #}
{% import '../macros/macros.swig' as macros %}



{# Web app on generic browsers #}
<link rel="icon" href="{{ targets.public }}icons/256.png" type="image/png">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

{# Link to manifest file #}
<link rel="manifest" href="manifest.json">



{# Web app on Android #}
{# FIXME: Chrome supports many features via a separate manifest file #}
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="{{ meta.themeColor }}">



{# Web app on Windows #}
<meta name="msapplication-tap-highlight" content="no">

{# https://msdn.microsoft.com/en-us/library/dn255024(v=vs.85).aspx #}
<meta name="msapplication-tooltip" content="{{ meta.description }}">
<meta name="msapplication-TileColor" content="{{ meta.themeColor }}" />
<meta name="msapplication-navbutton-color" content="{{ meta.themeColor }}">
<meta name="msapplication-square70x70logo" content="{{ targets.public }}icons/70.png" />
<meta name="msapplication-square150x150logo" content="{{ targets.public }}icons/150.png" />
<meta name="msapplication-wide310x150logo" content="{{ targets.public }}icons/310x150.png" />
<meta name="msapplication-square310x310logo" content="{{ targets.public }}icons/310.png" />



{# Web app on iOS: config #}
<meta name="format-detection" content="telephone=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="{% if meta.darkStatusBarContent %}default{% else %}black-translucent{% endif %}">


{# Web app on iOS: icons #}
{{ macros.appleTouchIcon('114') }} {# Retina phone                   #}
{{ macros.appleTouchIcon('120') }} {# iPhone 6 Plus                  #}
{{ macros.appleTouchIcon('57') }}  {# Non-retina phone               #}
{{ macros.appleTouchIcon('72') }}  {# iPad non-retina icon (iOS < 7) #}
{{ macros.appleTouchIcon('76') }}  {# iPad non-retina icon           #}
{{ macros.appleTouchIcon('144') }} {# iPad retina icon (iOS < 7)     #}
{{ macros.appleTouchIcon('152') }} {# iPad retina icon               #}



{# Web app on iOS: launch images #}

{# iPad retina portrait startup image #}
<link rel="apple-touch-startup-image"
	href="{{ targets.public }}splash/1536x2008.png"
	media="(device-width: 768px) and (device-height: 1024px)
		and (-webkit-device-pixel-ratio: 2)
		and (orientation: portrait)">

{# iPad retina landscape startup image #}
<link rel="apple-touch-startup-image"
	href="{{ targets.public }}splash/1496x2048.png"
	media="(device-width: 768px) and (device-height: 1024px)
		and (-webkit-device-pixel-ratio: 2)
		and (orientation: landscape)">

{# iPad non-retina portrait startup image #}
<link rel="apple-touch-startup-image"
	href="{{ targets.public }}splash/768x1004.png"
	media="(device-width: 768px) and (device-height: 1024px)
		and (-webkit-device-pixel-ratio: 1)
		and (orientation: portrait)">

{# iPad non-retina landscape startup image #}
<link rel="apple-touch-startup-image"
	href="{{ targets.public }}splash/748x1024.png"
	media="(device-width: 768px) and (device-height: 1024px)
		and (-webkit-device-pixel-ratio: 1)
		and (orientation: landscape)">

{# iPhone 6 Plus portrait startup image #}
<link rel="apple-touch-startup-image"
	href="{{ targets.public }}splash/1242x2148.png"
	media="(device-width: 414px) and (device-height: 736px)
		and (-webkit-device-pixel-ratio: 3)
		and (orientation: portrait)">

{# iPhone 6 Plus landscape startup image #}
<link rel="apple-touch-startup-image"
	href="{{ targets.public }}splash/1182x2208.png"
	media="(device-width: 414px) and (device-height: 736px)
		and (-webkit-device-pixel-ratio: 3)
		and (orientation: landscape)">

{# iPhone 6 startup image #}
<link rel="apple-touch-startup-image"
	href="{{ targets.public }}splash/750x1294.png"
	media="(device-width: 375px) and (device-height: 667px)
		and (-webkit-device-pixel-ratio: 2)">

{# iPhone 5 startup image #}
<link rel="apple-touch-startup-image"
	href="{{ targets.public }}splash/640x1096.png"
	media="(device-width: 320px) and (device-height: 568px)
		and (-webkit-device-pixel-ratio: 2)">

{# iPhone < 5 retina startup image #}
<link rel="apple-touch-startup-image"
	href="{{ targets.public }}splash/640x920.png"
	media="(device-width: 320px) and (device-height: 480px)
		and (-webkit-device-pixel-ratio: 2)">

{# iPhone < 5 non-retina startup image #}
<link rel="apple-touch-startup-image"
	href="{{ targets.public }}splash/320x460.png"
	media="(device-width: 320px) and (device-height: 480px)
		and (-webkit-device-pixel-ratio: 1)">