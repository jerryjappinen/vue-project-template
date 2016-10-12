{% extends 'frame/html.swig' %}

{% block head %}

	{# This is required since Electron kinda sucks with actual frontend module loading #}
	<script type="text/javascript">
		window.nodeRequire = require;
		delete window.require;
		delete window.exports;
		delete window.module;
	</script>

{% endblock %}