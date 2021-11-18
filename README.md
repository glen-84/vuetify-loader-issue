# vuetify-loader-issue

1. `npm i`
2. `sed -i "s/@forward '.\/variables'/\/\/@forward '.\/variables'/" node_modules/vuetify/lib/components/VList/VListItem.sass`
    - To work around https://github.com/vuetifyjs/vuetify/issues/14407. (might not be needed for dev builds though)
3. `npm start`
4. See the error:

    ```
    modulesTypeError: options.awaitResolve is not a function
    at Object.VuetifyLoader (D:\Programming\Git\vuetify-loader-issue\node_modules\vuetify-loader\dist\styleLoader.js:10:13)
    at LOADER_EXECUTION (D:\Programming\Git\vuetify-loader-issue\node_modules\loader-runner\lib\LoaderRunner.js:132:14)
    at runSyncOrAsync (D:\Programming\Git\vuetify-loader-issue\node_modules\loader-runner\lib\LoaderRunner.js:133:4)
    at iterateNormalLoaders (D:\Programming\Git\vuetify-loader-issue\node_modules\loader-runner\lib\LoaderRunner.js:250:2)
    at D:\Programming\Git\vuetify-loader-issue\node_modules\loader-runner\lib\LoaderRunner.js:223:4
    at D:\Programming\Git\vuetify-loader-issue\node_modules\webpack\lib\NormalModule.js:827:15
    at Array.eval (eval at create (D:\Programming\Git\vuetify-loader-issue\node_modules\tapable\lib\HookCodeFactory.js:33:10), <anonymous>:12:1)
    at runCallbacks (D:\Programming\Git\vuetify-loader-issue\node_modules\enhanced-resolve\lib\CachedInputFileSystem.js:27:15)
    at D:\Programming\Git\vuetify-loader-issue\node_modules\enhanced-resolve\lib\CachedInputFileSystem.js:200:4
    at D:\Programming\Git\vuetify-loader-issue\node_modules\graceful-fs\graceful-fs.js:123:16
    ```

Note: `main.scss` is @use'd by `app.vue`.
