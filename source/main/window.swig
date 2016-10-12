{% extends 'frame/html.swig' %}

{% block head %}

	{% include 'frame/twitter.swig' %}      {# Meta tags for external services #}
	{% include 'frame/opengraph.swig' %}    {# Meta tags for external services #}
	{% include 'frame/mobile.swig' %}       {# Browser normalizations #}
	{% include 'frame/smartbanners.swig' %} {# Ads for the app version #}

	{# Prefetch assets and references #}
	<link rel="prefetch" href="{{ targets.public }}">

{% endblock %}

{# Analytics and stuff could go here #}
{# {% block footer %}{% endblock %} #}