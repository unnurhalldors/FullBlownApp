import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

class TabBarIcon extends React.Component {
  render() {
    const { name, size, focused } = this.props;
    return (
      <Icon.FontAwesome
        name={name}
        size={size}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

export default TabBarIcon;
