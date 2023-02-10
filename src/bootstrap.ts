type WP_KEY = "__NAMESPACED__POOLLOVERNATHAN__WEBPANEL__"
interface Window {
  __NAMESPACED__POOLLOVERNATHAN__WEBPANEL__: any
}

(url: URL) => (async () => {
  const wpKey: WP_KEY = "__NAMESPACED__POOLLOVERNATHAN__WEBPANEL__"
  if (wpKey in window && window[wpKey]) {
    window[wpKey].activate()
    return
  }

  const res = await fetch(new URL("loader.js", url))
  if (res.ok) {
    throw new Error(`${res.status} while loading module loader`)
  }
  const code = await res.text()
  const func = eval(code)
  return func(new URL("main.js", url))
})().catch((e: any) => {
  const wpKey: WP_KEY = "__NAMESPACED__POOLLOVERNATHAN__WEBPANEL__"
  try {
    window[wpKey].recover(e)
  } catch(e2: any) {
    delete window[wpKey]
    alert("An unhandled exception has occured inside WebPanel:\n" + ("stack" in e ? e.stack : e))
    alert("While attempting to recover, the following exception occured:\n" + ("stack" in e2 ? e2.stack : e2))
    alert("WebPanel has been unloaded. To continue using it, reopen WebPanel.")
  }
})