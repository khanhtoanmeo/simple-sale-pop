(function() {
  const BASE_URL = 'http://localhost:5000';

  const scriptElement = document.createElement('script');
  scriptElement.type = 'text/javascript';
  scriptElement.async = true;
  scriptElement.src = `${BASE_URL}/scripttag/avada-sale-pop.min.js?v=${new Date().getTime()}`;
  const firstScript = document.getElementsByTagName('script')[0];
  console.log(firstScript);
  firstScript.parentNode.insertBefore(scriptElement, firstScript);
})();
