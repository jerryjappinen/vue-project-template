
{% macro appleTouchIcon(width) %}
	<link rel="apple-touch-icon-precomposed" href="{{ targets.public }}icons/{{ width }}.png"  sizes="{{ width }}x{{ width }}">
{% endmacro %}
