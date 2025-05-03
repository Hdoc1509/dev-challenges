// NOTE: I don't know if I will use these utils

const Stylesheets = new Set();

/** Loads a CSS file. If the file has already been loaded, does nothing.
 * @param {string} url
 * @param {Function} callback */
export function loadCSS(url, callback) {
  if (Stylesheets.has(url)) return callback();

  const $link = document.createElement("link");

  Stylesheets.add(url);
  $link.rel = "stylesheet";
  $link.href = url;
  $link.onload = () => callback();
  document.head.appendChild($link);
}

/** Loads multiple CSS files. If all files have loaded, calls `callback`.
 * If all the files has already been loaded, does nothing.
 * @param {string[]} urls
 * @param {Function} callback */
export function loadCSSFiles(urls, callback) {
  const key = urls.join("-");

  if (Stylesheets.has(key)) return callback();

  let loadedFiles = 0;

  Stylesheets.add(key);
  urls.forEach((file) => {
    const $link = document.createElement("link");
    $link.rel = "stylesheet";
    $link.href = file;

    $link.onload = () => {
      loadedFiles++;
      if (loadedFiles === urls.length) callback();
    };

    $link.onerror = () => {
      console.error(`Failed to load CSS file: ${file}`);
      loadedFiles++;
      if (loadedFiles === urls.length) callback();
    };
    document.head.appendChild($link);
  });
}
