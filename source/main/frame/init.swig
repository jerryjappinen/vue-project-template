{# Pass config from project file to client app #}
<script type="text/javascript">
	window.clientConfig = {{ clientConfig|json|raw }};
</script>