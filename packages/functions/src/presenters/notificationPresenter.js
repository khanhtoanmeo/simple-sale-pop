import moment from 'moment';

export function presentNotification(data) {
  // eslint-disable-next-line no-unused-vars
  const {shopId, ...notification} = {
    ...data,
    timestamp: moment(data.timestamp.toDate()).fromNow()
  };
  return notification;
}
