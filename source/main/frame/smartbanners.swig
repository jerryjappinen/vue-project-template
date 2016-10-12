{# Link to native version on App Store #}
{% if meta.appStore and meta.appStore.id.length %}
	<meta name="apple-itunes-app" content="app-id={{ meta.appStore.id }}{% if meta.appStore and meta.appStore.affiliate.length %}, affiliate-data={{ meta.appStore.affiliate }}{% endif %}{% if meta.appStore and meta.appStore.affiliate.length %}, app-argument={{ meta.appStore.appargument }}{% endif %}">
{% endif %}

{# Link to native version on Google Play #}
{# NOTE: a JS library is required to show this custom banner #}
{% if meta.googlePlay and meta.googlePlay.id.length %}
    <meta name="google-play-app" content="app-id={{ meta.googlePlay.id }}">
{% endif %}

{# Link to native version on Windows Store #}
{# NOTE: a JS library is required to show this custom banner #}
{% if meta.windowsStore and meta.windowsStore.id.length %}
    <meta name="msApplication-ID" content="app-id={{ meta.windowsStore.id }}">
{% endif %}