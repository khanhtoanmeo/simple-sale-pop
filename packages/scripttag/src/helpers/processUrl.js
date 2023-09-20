export function getUrlsArray(urlsString) {
  return urlsString.split('\n').filter(url => url.trim());
}

export function isUrlIncludedInArray({url, urlsArr}) {
  const regEx = new RegExp(`^\\s*${url}\\S*\\s*$`);

  return urlsArr.some(url => regEx.test(url.toLowerCase().trim()));
}
