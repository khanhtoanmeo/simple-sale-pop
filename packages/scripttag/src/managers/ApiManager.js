import makeRequest from '../helpers/api/makeRequest';

const BASE_URL = 'https://localhost:3000';

export default class ApiManager {
  getNotifications = async () => {
    const {notifications, settings} = await this.getApiData({
      path: `/clientApi/notifications?shopifyDomain=${Shopify.shop}`
    });

    return {notifications, settings};
  };

  getApiData = async ({path}) => {
    const {data} = await makeRequest(BASE_URL + path);

    return data;
  };
}
