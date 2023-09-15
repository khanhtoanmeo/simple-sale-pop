import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
import delay from '../helpers/delay';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.insertContainer();
    this.displayNotifications();
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SP__Pop');
    container.classList.remove('Avada-SP__Pop--Display');
    container.classList.add('Avada-SP__Pop--Hide');
  }

  display({notification}) {
    const {truncateProductName, hideTimeAgo, position} = this.settings;
    const container = document.querySelector('#Avada-SP__Pop');

    container.classList.add('Avada-SP__Pop--Display');
    container.classList.remove('Avada-SP__Pop--Hide');

    render(
      <NotificationPopup
        {...notification}
        truncateProductName={truncateProductName}
        hideTimeAgo={hideTimeAgo}
        position={position}
      />,
      container
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
  async displayNotifications() {
    const {firstDelay, popsInterval, displayDuration, maxPopsDisplay} = this.settings;
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
