
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Components/Utilis/store';
import App from './App';
import { persistor } from './Components/Utilis/store';
import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
        <App />
        </PersistGate>
       
    </Provider>
);
