
{# Facebook IDs #}
{# {% if theme.config.services.facebook and theme.config.services.facebook.admins is not empty %}
	<meta property="fb:admins" content="{{ theme.config.services.facebook.admins }}">
{% endif %} #}
{# {% if theme.config.services.facebook and theme.config.services.facebook.appid is not empty %}
	<meta property="fb:app_id" content="{{ theme.config.services.facebook.appid }}">
{% endif %} #}

{# Open Graph (Facebook) #}
<meta property="og:site_name" content="{{ meta.title }}">
<meta property="og:title" content="{{ meta.title }}">
<meta property="og:description" content="{{ meta.description }}">
<meta property="og:url" content="{{ meta.url }}"> {# meta.appStartUrl ? #}
<meta property="og:image" content="{{ targets.public }}external/og-splash.png">
{# <meta property="og:type" content="website"> #}

{# Main and alternative locales #}
<meta property="og:locale" content="{{ meta.languageCode }}_{{ meta.languageCodeCountry }}">
