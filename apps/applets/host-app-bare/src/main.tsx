(async () => {
  console.info('[host-bare-app: main] begin')
  try {
    debugger // eslint-disable-line
    console.info('[host-bare-app: main] loading applet embedder (includes react, react dom)')
    // making this async so we don't initially have to download the react dependencies
    const { default: embedTheApplet } = await import('./applet-embedder')

    console.info('[host-bare-app: main] embedder loaded')
    debugger // eslint-disable-line
    console.info('[host-bare-app: main] attempting embedTheApplet')
    embedTheApplet('#root', 'ColorVisualizer', { subtitle: 'loaded from host bare app' })
    // embedTheApplet('#root2', 'ColorWall', { subtitle: 'loaded from host bare app' })
  } catch (err) {
    console.error('[host-bare-app: main]', err)
  } finally {
    console.info('[host-bare-app: main] done' )
  }
})()
