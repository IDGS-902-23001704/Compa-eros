import { createSlice, nanoid } from '@reduxjs/toolkit'

export const companerosSlice = createSlice({
  name: 'companeros',
  initialState: { value: [] },
  reducers: {
    agregar: {
      reducer: (state, action) => {
        const { nombre, grupo } = action.payload
        if (nombre && grupo) state.value.push(action.payload)
      },
      prepare: ({ nombre, grupo }) => ({
        payload: { id: nanoid(), nombre: nombre.trim(), grupo: grupo.trim(), eliminado: false },
      }),
    },
    editar: (state, action) => {
      const { id, nombre, grupo } = action.payload
      const registro = state.value.find((item) => item.id === id && !item.eliminado)
      if (!registro || !nombre.trim() || !grupo.trim()) return
      registro.nombre = nombre.trim()
      registro.grupo = grupo.trim()
    },
    eliminar: (state, action) => {
      const registro = state.value.find((item) => item.id === action.payload)
      if (registro) registro.eliminado = true
    },
  },
})

export const { agregar, editar, eliminar } = companerosSlice.actions
export default companerosSlice.reducer
