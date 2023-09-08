import validator from 'validator';

export function isValidUrls(urls) {
  if (urls.trim() === '') return true;
  const urlsArr = urls.split('\n');
  return urlsArr.every(url => validator.isURL(url.trim()));
}
