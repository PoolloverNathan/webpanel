type WP_KEY = "__NAMESPACED__POOLLOVERNATHAN__WEBPANEL__"
interface Window {
  [wpKey: WP_KEY]?: any
}

(url: URL) => (async () => {
  const wpKey: WP_KEY = "__NAMESPACED__POOLLOVERNATHAN__WEBPANEL__"
  if (wpKey in window) {
    window[wpKey].activate()
    return
  }

  const res = await fetch(new URL("loader.js", url))
  if (res.ok) {
    throw new Error(`${res.status} while loading module loader`)
  }
  const code = res.text()
})().catch(e => {
  const wpKey: WP_KEY = "__NAMESPACED__POOLLOVERNATHAN__WEBPANEL__"
  try {
    window[wpKey].recover(e)
  } catch(e2) {
    delete window[wpKey]
    alert("An unhandled exception has occured inside WebPanel:\n" + ("stack" in e ? e.stack : e))
    alert("While attempting to recover, the following exception occured:\n" + ("stack" in e2 ? e2.stack : e))
    alert("WebPanel has been unloaded. To continue using it, reopen WebPanel.")
  }
})