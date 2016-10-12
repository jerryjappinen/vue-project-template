{#
	This will output the `package.json` file required by Electron.
#}{% spaceless %}

	{# Declare manifest content #}
	{% set manifest = {
		name: meta.title,
		version: meta.version
	} %}

	{# Print manifest #}
	{% autoescape false %}{{ manifest|json }}{% endautoescape %}

{% endspaceless %}
