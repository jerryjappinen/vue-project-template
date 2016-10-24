
# To-do

Use the issue tracking on Bitbucket instead of this file. But if you know something should be done, this is better than nothing.

## Config.xml overrides

See [cordova.apache.org/docs](https://cordova.apache.org/docs/en/latest/config_ref/index.html).

- Limited `<access></access>`?
- Maybe override default `<allow-intent></allow-intent>`?
- Does `<engine></engine>` need to be specified?
- Is `<feature></feature>` needed?
- Build error page for `errorUrl`?
- `<splash src="res/screen/ios/Default~iphone.png" width="320" height="480"/>`? (see https://github.com/apache/cordova-plugin-splashscreen)

Some tags should be wrapped in `<platform name="android"></platform>` etc.

Since the config.xml is now built by the cordova init script, we should have a way of pulling custom things or building it from template and overwrite the default. For example `<preference name="DisallowOverscroll" value="true" />` is very important.



## Frontend

- [ ] Localization via custom bindings? https://github.com/kazupon/vue-i18n
- [ ] Investigate plugins
- [ ] <click>: Separate manipulation logic from visualization in inputs
- [ ] rename inputs with `input-` prefix
= [ ] rename `data` service to `localConfig` or something
- [ ] move some initiation handling to <frame> so first render is as fast as possible and easily customizable

## Pipeline

- [ ] Automated scaling for iOS app icons
- [ ] Automated `.icns` generation
- [ ] Support loading env-specific vendor scripts



# More

## Pipeline

- [ ] #FF00FF -> currentColor replacement in SVG
	- [ ] Gulp
	- [ ] update is-mono in <icon>
- Add file names of target files to `project.json`
	- app.js
	- app.css
	- app.appcache
	- icons
- New features
	- Sourcemaps?
	- Live reload (with toggle in project config)?
	- Notifier for non-debug builds (with toggle in project config)?
	- Build app icons & splash screens for Cordova
		- Resize from source files
		- Compile into core
		- Copy from core into specific folders with specific names for platforms
	- Build missing manifest files out of config
		- `config.xml` for Cordova
		- JSON for Android web app
			- https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android
- Cordova
	- Find a way to specify which platforms to build when builing mobile projects
	- Platform merges: make sure they work, use Gulp to copy
	- after-build platform-merges (should we copy from source?)
	- Should deploy or run script send to device?
- Bugs
	- When globbing for tasks, files with similar basenames get overridden
