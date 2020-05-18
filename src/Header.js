import React from 'react';
import { Appbar } from 'react-native-paper';

function Header({ navigation }) {
  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title="Lifestyle Companion" />
    </Appbar.Header>
  );
}


export default Header;
