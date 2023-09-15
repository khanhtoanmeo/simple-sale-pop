import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const {
      data: {notifications, settings}
    } = await makeRequest(
      `https://localhost:3000/clientApi/notifications?shopifyDomain=${Shopify.shop}`
    );

    return {notifications, settings};
  };
}
