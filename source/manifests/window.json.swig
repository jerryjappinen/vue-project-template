{#

	This web app manifest is (semi?) official but mostly supported by Chrome at this point. See the following links for more info.

	- https://developer.mozilla.org/en-US/docs/Web/Manifest
	- https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android

	We output JSON from the main variable created here, at the end of the file.

	You can selectively apply CSS to your app based on the display mode, using the display-mode media feature.


	Add this to related_applications conditionally

	{
		platform: 'play',
		url: 'https://play.google.com/store/apps/details?id=' ~ meta.googlePlay.id,
		id: meta.googlePlay.id
	},

#}{% spaceless %}

	{# Setup #}
	{% set iconsPath = targets.public + 'icons/' %}
	{% set splashPath = targets.public + 'splash/' %}

	{# Declare manifest content #}
	{% set manifest = {
		lang: meta.languageCode + '-' + meta.languageCodeCountry,
		name: meta.title,
		short_name: meta.title,
		start_url: meta.appStartUrl,
		scope: '',
		theme_color: meta.themeColor,
		background_color: meta.themeColor,
		orientation: 'portrait',
		display: 'fullscreen',
		prefer_related_applications: true,
		related_applications: [
			{
				platform: 'itunes',
				url: 'https://itunes.apple.com/app/' + meta.appStore.appName + '/id' + meta.appStore.id,
			}
		],
		icons: [
			'48',
			'57',
			'70',
			'72',
			'76',
			'96',
			'114',
			'120',
			'144',
			'150',
			'152',
			'192',
			'256',
			'310'
		],
		splash_screens: [
			{
				type: 'image/png',
				src: splashPath + '1536x2008' + '.png',
				sizes: '1536x2008',
				density: 2
			},
			{
				type: 'image/png',
				src: splashPath + '1496x2048' + '.png',
				sizes: '1496x2048',
				density: 2
			},
			{
				type: 'image/png',
				src: splashPath + '768x1004' + '.png',
				sizes: '768x1004',
				density: 1
			},
			{
				type: 'image/png',
				src: splashPath + '748x1024' + '.png',
				sizes: '748x1024',
				density: 1
			},
			{
				type: 'image/png',
				src: splashPath + '1242x2148' + '.png',
				sizes: '1242x2148',
				density: 3
			},
			{
				type: 'image/png',
				src: splashPath + '1182x2208' + '.png',
				sizes: '1182x2208',
				density: 3
			},
			{
				type: 'image/png',
				src: splashPath + 'public' + '.png',
				sizes: 'public',
				density: 2
			},
			{
				type: 'image/png',
				src: splashPath + 'public' + '.png',
				sizes: 'public',
				density: 2
			},
			{
				type: 'image/png',
				src: splashPath + 'splash' + '.png',
				sizes: 'splash',
				density: 2
			},
			{
				type: 'image/png',
				src: splashPath + '320x460' + '.png',
				sizes: '320x460',
				density: 1
			}
		]
	} %}

	{# Format icons #}
	{% for i, iconSize in manifest.icons %}
		{% set manifest.icons[i] = {
			type: 'image/png',
			src: splashPath + iconSize + '.png',
			sizes: iconSize + 'x' + iconSize
		} %}
	{% endfor %}

	{# Print manifest #}
	{% autoescape false %}{{ manifest|json }}{% endautoescape %}

{% endspaceless %}