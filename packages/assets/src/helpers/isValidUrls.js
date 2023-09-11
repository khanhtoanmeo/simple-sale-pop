import validator from 'validator';

export function isValidUrls(urls) {
  if (urls.trim() === '') return true;
  const urlsArr = urls.split('\n');
  return urlsArr.filter(url => url.trim()).every(url => validator.isURL(url.trim()));
}
