import { configureStore } from '@reduxjs/toolkit'
import companerosReducer from './companerosSlice.js'
import { cargarCompaneros, guardarCompaneros } from './almacenamiento.js'

export const store = configureStore({
  reducer: {
    companeros: companerosReducer,
  },
  preloadedState: {
    companeros: { value: cargarCompaneros() },
  },
})

store.subscribe(() => guardarCompaneros(store.getState().companeros.value))
