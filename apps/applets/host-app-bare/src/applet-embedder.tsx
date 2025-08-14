import React, { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';



const embedTheApplet = <P extends Record<string, unknown>>(rootSelector: string, appletName: string, passthruProps: P) => {
  try {
    console.info(`[host-bare-app: embedTheApplet] lazy loading ${appletName}`)
    const Applet = React.lazy(() => import((`prism_applets/${appletName}`)));
    console.info(`[host-bare-app: embedTheApplet] creating react root at ${rootSelector}`)
    const root = ReactDOM.createRoot(
      document.querySelector(rootSelector) as HTMLElement
    );
    debugger // eslint-disable-line
    // loadRemote('remote/ColorVisualizer').then((data) => {
    //   debugger // eslint-disable-line
    //   return {
    //     default: null
    //   };
    // }).catch(err => {
    //   debugger // eslint-disable-line
    // }).finally(() => {
    //   alert('it is done!')
    // })

    // import('prism_applets/ColorVisualizer').then((a,b,c) => {
    //   debugger // eslint-disable-line
    //   root.render(
    //     <StrictMode>
    //       <h1>Test, as rendered by mod.tsx</h1>
    //     </StrictMode>
    //   );
    // }).catch(err => {
    //   debugger // eslint-disable-line
    // }).finally(() => {
    //   alert('it is done!')
    // })

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
