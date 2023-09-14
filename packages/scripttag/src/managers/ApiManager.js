import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const {
      data: {notifications, setting}
    } = await makeRequest(
      `https://localhost:3000/clientApi/shopData?shopifyDomain=${Shopify.shop}`
    );
    console.log(notifications);
    console.log(setting);

    return {notifications, settings: setting};
  };
}
