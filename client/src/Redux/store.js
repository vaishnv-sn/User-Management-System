import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import userSliceReducer from './user';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userDetails'],
    blacklist: ['register']
}

const persistedReducer = persistReducer(persistConfig, userSliceReducer);


export const store = configureStore({
    reducer: { userData: persistedReducer },
    /* middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: ['register']
        }
    }) */
});

export const persistor = persistStore(store)