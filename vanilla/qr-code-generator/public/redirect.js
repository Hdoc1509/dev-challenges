const urlParam = new URL(location.href).searchParams.get("url");

if (urlParam == null || urlParam === "") {
  console.error("URL parameter is missing. Redirecting to index page.");
  window.location.replace("../");
}
