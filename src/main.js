(async () => {
  const wpKey = "__NAMESPACED__POOLLOVERNATHAN__WEBPANEL__"
  if (wpKey in window) {
    window[wpKey].activate()
    return
  }
  const module = {
    
  }
  window[wpKey] = module
  module.activate()
})().catch(e => {
  const wpKey = "__NAMESPACED__POOLLOVERNATHAN__WEBPANEL__"
  try {
    window[wpKey].recover(e)
  } catch(e2) {
    alert("An unhandled exception has occured inside WebPanel:\n" + (e.stack || e))
    alert("While attempting to recover, the following exception occured:\n" + (e2.stack || e2))
    alert("WebPanel has been unloaded. To continue using it, reopen WebPanel.")
  }
})