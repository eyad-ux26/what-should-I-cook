// Decodes the path that 404.html encoded into the query string (see that file
// for why), and restores the real, clean URL via history.replaceState before
// the app mounts and reads window.location. Kept as its own file (rather than
// inline in index.html) so it runs under our strict `script-src 'self'` CSP.
(function (l) {
  if (l.search[1] === "/") {
    var decoded = l.search
      .slice(1)
      .split("&")
      .map(function (s) {
        return s.replace(/~and~/g, "&");
      })
      .join("?");
    window.history.replaceState(null, "", l.pathname.slice(0, -1) + decoded + l.hash);
  }
})(window.location);
