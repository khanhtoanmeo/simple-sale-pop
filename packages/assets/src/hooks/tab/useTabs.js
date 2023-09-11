import {useState} from 'react';

export default function useTabs(tabs, initialTab = 0) {
  const [selected, setSelected] = useState(initialTab);

  return {activeTab: tabs[selected].bodyContent, setSelected, selected};
}
