import React from 'react';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Content } from './components/Content';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store} >
        <DefaultLayout>
          <Content />
        </DefaultLayout>
      </Provider>
    </div>
  );
}

export default App;
