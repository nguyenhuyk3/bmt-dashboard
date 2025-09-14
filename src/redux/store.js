import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { authenticationSlice, filmProfessionalSlice, filmSlice } from '../features/slices/index';
import rootSaga from '../features/sagas/index';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        authentication: authenticationSlice,
        filmProfessional: filmProfessionalSlice,
        film: filmSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;