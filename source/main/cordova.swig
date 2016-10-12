{% extends 'frame/html.swig' %}

{% block head %}

	{# Cordova's main lib' #}
	<script type="text/javascript" src="cordova.js"></script>

	{# Security policy #}
	{# https://github.com/apache/cordova-plugin-whitelist/blob/master/README.md#content-security-policy #}
	{# <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'"> #}
	{# <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *"> #}
	{# <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data: gap: https://ssl.gstatic.com; style-src 'self' 'unsafe-inline'; media-src *"> #}

{% endblock %}