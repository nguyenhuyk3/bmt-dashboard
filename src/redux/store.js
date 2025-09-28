import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import {
    authenticationSlice,
    filmProfessionalSlice,
    filmSlice,
    cinemaSlice,
    auditoriumSlice,
    showtimeSlice,
    showtimeSeatSlice
} from '../features/slices/index';
import rootSaga from '../features/sagas/index';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        authentication: authenticationSlice,
        filmProfessional: filmProfessionalSlice,
        film: filmSlice,
        cinema: cinemaSlice,
        auditorium: auditoriumSlice,
        showtime: showtimeSlice,
        showtimeSeat: showtimeSeatSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;