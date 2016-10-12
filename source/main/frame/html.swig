<!DOCTYPE html>
<html lang="{{ meta.languageCode }}">
	<head>

		{% spaceless %}
			{% include 'meta.swig' %}            {# Generic meta data #}
			{% include 'viewport.swig' %}        {# Viewport normalizations #}
			{% include 'init.swig' %}            {# Passing project config to init scripts #}
			{% include 'stylesheetlinks.swig' %} {# External assets #}
			{% block head %}{% endblock %}       {# Allow injecting more stuff to header in main templates #}
		{% endspaceless %}

	</head>

	<body>
		{% include 'body.swig' %}        {# Body content #}
		{% include 'scriptlinks.swig' %} {# External assets #}
		{% block footer %}{% endblock %} {# Allow injecting more scripts #}
	</body>

</html>