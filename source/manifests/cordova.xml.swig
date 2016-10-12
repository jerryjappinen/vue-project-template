<?xml version='1.0' encoding='utf-8'?>
<widget id="com.{{ meta.com }}.{{ meta.id }}" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
	<name>{{ meta.title }}</name>
	<description>
		{{ meta.description }}
	</description>
	<author email="{{ meta.email }}" href="{{ meta.url }}">
		{{ meta.company }}
	</author>
	<content src="index.html" />
	<plugin name="cordova-plugin-whitelist" spec="1" />
	<access origin="*" />
	<allow-intent href="http://*/*" />
	<allow-intent href="https://*/*" />
	<allow-intent href="tel:*" />
	<allow-intent href="sms:*" />
	<allow-intent href="mailto:*" />
	<allow-intent href="geo:*" />

	{% spaceless %}

		{# Engines #}
		{% if buildOptions.cordova.engines %}
			{% for key, value in buildOptions.cordova.engines %}
				<engine name="{{ key }}" spec="{{ value }}" />
			{% endfor %}
		{% endif %}

		{# Feature tags #}

		{% if buildOptions.cordova.features %}
			{% for featureKey, params in buildOptions.cordova.features %}
				<feature name="{{ featureKey }}">
					{% for paramName, paramValue in params %}
						<param name="{{ paramName }}" value="{{ paramValue }}" />
					{% endfor %}
				</feature>
			{% endfor %}
		{% endif %}

		{# Preference tags #}
		{% if buildOptions.cordova.preferences %}
			{% for key, value in buildOptions.cordova.preferences %}
				<preference name="{{ key }}" value="{{ value }}" />
			{% endfor %}
		{% endif %}
	{% endspaceless %}

	<platform name="android">
		<allow-intent href="market:*" />
	</platform>
	<platform name="ios">
		<allow-intent href="itms:*" />
		<allow-intent href="itms-apps:*" />
	</platform>
</widget>