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
            label="Work screen"
            onPress={() => navigation.navigate('WorkScreen')}
          />
          <DrawerItem
            label="Statistics"
            onPress={() => navigation.navigate('StatisticsScreen')}
          />
          <DrawerItem
            label="Options"
            onPress={() => navigation.navigate('OptionsScreen')}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

export default DrawerContent;
