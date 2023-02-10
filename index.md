# WebPanel

WebPanel is a pure JavaScript element inspector that can run from your bookmarks bar. You can install it by dragging the following link to your bookmarks bar:

<center><a id="wp_link">WebPanel</a></center>

<script>
  const host = new URL("src/main.js", location)
  wp_link.href = `javascript:fetch(${JSON.stringify(host)}).then(code => eval(code)())`
  wp_link.onclick = e => {
    alert("You need to drag the bookmarklet to your bookmarks bar, not click it!")
    e.preventDefault()
  }
</script>