import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/AuthSlice";
import QuizSlice from "./reducers/QuizSlice";


const rootReducer = combineReducers({
    auth: AuthSlice,
    quiz: QuizSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
