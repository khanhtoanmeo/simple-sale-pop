export function getUrlsArray(urlsString) {
  return urlsString.split('\n').filter(url => url.trim());
}
