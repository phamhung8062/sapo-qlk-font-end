import React from 'react';

const SidebarContext = React.createContext({
  sidebar: false,
  content: true,
  setActive: () => {},
});

export default SidebarContext;
