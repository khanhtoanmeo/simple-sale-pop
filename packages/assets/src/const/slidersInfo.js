export const slidersInfo = [
  {
    name: 'displayDuration',
    unit: 'second',
    label: 'Display duration',
    helpText: 'How long each pop will display on your page',
    max: 100
  },
  {
    name: 'firstDelay',
    unit: 'second',
    label: 'Time before the first pop',
    helpText: 'The delay time before the first notification',
    max: 100
  },
  {
    name: 'popsInterval',
    unit: 'second',
    label: 'Gap time between two pops',
    helpText: 'The time interval between two popup notifications',
    max: 100
  },
  {
    name: 'maxPopsDisplay',
    unit: 'pop',
    label: 'Maximum of popups',
    helpText:
      'The maximum number of popups are allowed to show after page loading. Maximum number is 800',
    max: 80
  }
];
