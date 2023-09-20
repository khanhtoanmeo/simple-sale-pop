import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
import delay from '../helpers/delay';
import {getUrlsArray, isUrlIncludedInArray} from '../helpers/processUrl';
import {SPECIFIC} from '../const/triggersSetting';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
    this.popupEl = null;
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.popupEl = this.insertContainer();
    await this.displayNotifications();
    this.delete();
  }

  fadeOut() {
    this.popupEl.classList.add('Avada-SP__Pop--Hide');
  }

  delete() {
    this.popupEl.remove();
  }

  display({notification}) {
    const {truncateProductName, hideTimeAgo, position} = this.settings;
    this.popupEl.classList.remove('Avada-SP__Pop--Hide');

    render(
      <NotificationPopup
        {...notification}
        truncateProductName={truncateProductName}
        hideTimeAgo={hideTimeAgo}
        position={position}
      />,
      this.popupEl
    );
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SP__Pop`;
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }

  shouldDisplay() {
    const {includedUrls, excludedUrls, allowShow} = this.settings;
    const includedUrlsArr = getUrlsArray(includedUrls);
    const excludedUrlsArr = getUrlsArray(excludedUrls);
    const {href: url} = window.location;

    if (allowShow === SPECIFIC && !isUrlIncludedInArray({url, urlsArr: includedUrlsArr}))
      return false;
    if (isUrlIncludedInArray({url, urlsArr: excludedUrlsArr})) return false;

    return true;
  }

  async displayNotifications() {
    const {firstDelay, popsInterval, displayDuration, maxPopsDisplay} = this.settings;
    if (!this.shouldDisplay()) return;

    await delay(firstDelay);

    for (let index = 0; index < maxPopsDisplay; index++) {
      if (index >= this.notifications.length) break;
      this.display({notification: this.notifications[index]});
      await delay(displayDuration);
      this.fadeOut();
      await delay(popsInterval);
    }
  }
}
