import { registerRootComponent } from 'expo';
import React  from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import Main from './Main';
import todoApp from './store';

const store = createStore(todoApp)

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default registerRootComponent(App)
