# vuetify-loader-issue

1. `npm i`
2. Add the following to `node_modules/vuetify-loader/dist/scriptLoader.js`:

    ```ts
    console.log("----");
    console.log(content);
    console.log("----");
    ```
3. `npm run build`
4. You should see in the output:
    ```
    ----
    import script from "./app.vue?vue&type=script&lang=ts&setup=true"
    export * from "./app.vue?vue&type=script&lang=ts&setup=true"

    const __exports__ = script;

    export default __exports__
    ----
    ```
