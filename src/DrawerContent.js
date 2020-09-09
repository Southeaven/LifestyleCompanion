import React from 'react';
import { View } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';

function DrawerContent({ navigation, ...props }) {
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Drawer.Section>
          <DrawerItem
            label="Welcome"
            onPress={() => navigation.navigate('WelcomeScreen')}
          />
          <DrawerItem
            label="Activity form"
            onPress={() => navigation.navigate('ActivityForm')}
          />
          <DrawerItem
            label="Location screen"
            onPress={() => navigation.navigate('LocationScreen')}
          />
          <DrawerItem
            label="Statistics screen"
            onPress={() => navigation.navigate('StatisticsScreen')}
          />
          <DrawerItem
            label="DEBUG SCREEN"
            onPress={() => navigation.navigate('DebugScreen')}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

export default DrawerContent;
