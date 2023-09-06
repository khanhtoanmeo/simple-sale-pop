export function getTimeAgo(timestamp) {
  const intl = new Intl.RelativeTimeFormat();
  const secondsAgo = Math.floor((Date.now() - timestamp) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (secondsAgo < 60) return intl.format(-secondsAgo, 'seconds');
  if (minutesAgo < 60) return intl.format(-minutesAgo, 'minutes');
  if (hoursAgo < 24) return intl.format(-hoursAgo, 'hours');

  return intl.format(-Math.floor(hoursAgo / 24), 'days');
}
