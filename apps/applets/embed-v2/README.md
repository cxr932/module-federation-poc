## IMPORTANT: Going forward, "Applet" === "Facet"

I get it. It should have been obvious, but I glossed right over it.

The remote app thing is correct; that's the heart of facets v2.
Templates can be anything, it doesn't really matter. It's just webpages. It needs to be able to load our embed file.

# Embed V2 #
Speaking of the embed file, that's going to be an implementation of dynamic remotes AND a host app.
Embed itself could be a vite app with shared dependencies with the remote (facets-v2/applets/whatever). That's helpful because it will be needing react and react-dom, which the applets will already be using. Set up the federation/remote stuff in the vite config just like you would for a normal host site (and, yes, it means you need to expose all the same things... that should be a shared file to avoid duplication, maybe an `applet-config.json` that lives in applets/ root )

As for the app itself within embed-v2, it would look kinda like this:

```tsx
// embed-v2.js
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { init, loadRemote } from '@module-federation/enhanced/runtime'

await init({
  name: 'applets-remote',
  remotes: [
    { name: 'prism-applets', entry: 'http://localhost:5001/assets/remoteEntry.js' }
    // ...
  ]
})

// this bit will be embedded in a global object
function doEmbed(props) {
  const { appletToEmbed, embedSelector, passThruProps = {} } = props
  const ChosenAppletLoadedFromRemote = React.lazy(() => loadRemote(`prism-applets/${appletToEmbed}`, { from: 'runtime' }))

  const root = ReactDOM.createRoot(
    document.querySelector(embedSelector) as HTMLElement
  );

  root.render(
    <StrictMode>
      <ChosenAppletLoadedFromRemote {...passThruProps} />
    </StrictMode>
  );
}

window.PRISM = window.PRISM || {
  embed: doEmbed
};
```

Then, somewhere on the internet...
```html
<html>
  <body>
    <div id="my-embed-point">
      <p>This content will be replaced by a Prism Applet</p>
    </div>
    
    <script src="https://prism.sherwin-williams.com/latest/embed-v2.js"></script>
    <script>
      const embedProps = {
        appletToEmbed: 'cvw',
        embedSelector: '#my-embed-point',
        passThruProps: { someAppletProp: 'value' }
      };
    
      // Assuming doEmbed is globally available
      if (window.PRISM?.embed) {
        window.PRISM.embed(embedProps);
      } else {
        console.error('PRISM.embed function is not available');
      }
    </script>
  </body>
</html>
```


