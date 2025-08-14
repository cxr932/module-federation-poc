import React, { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';


const embedTheApplet = <P extends Record<string, unknown>>(rootSelector: string, appletName: string, passthruProps: P) => {
  try {
    console.info(`[host-bare-app: embedTheApplet] lazy loading ${appletName}`)


    /**
     * HERE IS THE PROBLEM
     * We can't specify this import path dynamically (ex: `prism_applets/${appletName}`) because
     * Vite's federation plugin does not support dynamic imports for remotes.
     *
     * If we specify a plugin manually then it's fine, but that defeats the purpose (unless we manually update a big
     * switch-case for each applet name and import, which is tedious and error-prone).
     *
     * Supposedly there is a way to do this with the "virtual:__federation__" API? Link here:
     * @url https://github.com/originjs/vite-plugin-federation?tab=readme-ov-file#runtime-add-remotes-with-virtual__federation__
     * I'm guessing that fetches the remote (meaning http://localhost:5001/assets/all-prism-applets.js)
     * and extracts available modules from it? Haven't tried it, but it seems to be the way, even if it's icky.
     */

    // doesn't work; commented out
    // const Applet = React.lazy(() => import((`prism_applets/${appletName}`)));
    // works, but it's hardcoded so it defeats the purpose of the applet dynamic embed
    const Applet = React.lazy(() => import((`prism_applets/ColorVisualizer`)));

    console.info(`[host-bare-app: embedTheApplet] creating react root at ${rootSelector}`)
    const root = ReactDOM.createRoot(
      document.querySelector(rootSelector) as HTMLElement
    );

    console.info(`[host-bare-app: embedTheApplet] rendering with:`, passthruProps)
    root.render(
      <StrictMode>
        <div>
          <h1>Below is the remote component</h1>
          <Suspense fallback={<>Loading....</>}>
            <Applet {...passthruProps} />
          </Suspense>
        </div>
      </StrictMode>
    )
  } catch (err) {
    console.error('[host-bare-app: embedTheApplet]', err)
  } finally {
    console.info('[host-bare-app: embedTheApplet] done')
  }

}


export default embedTheApplet
