import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const {
      data: {notifications, settings}
    } = await makeRequest(
      //todo: viết hàm truyền url vô sao cho tổng quát nhé , hoặc chỉ cần truyền path thôi , chứ lúc nào cũng truyền dài thế này trông không oke lắm 
      `https://localhost:3000/clientApi/notifications?shopifyDomain=${Shopify.shop}`
    );

    return {notifications, settings};
  };
}
