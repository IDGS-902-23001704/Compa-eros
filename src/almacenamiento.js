const clave = 'companeros.classmates.v1'

export function cargarCompaneros() {
  try {
    const datos = JSON.parse(localStorage.getItem(clave))
    if (!Array.isArray(datos)) return []

    return datos
      .map((dato, index) => ({
        id: dato?.id ?? `anterior-${index}`,
        nombre: dato?.nombre ?? dato?.name,
        grupo: dato?.grupo ?? dato?.group,
        eliminado: dato?.eliminado === true,
      }))
      .filter(({ nombre, grupo }) => typeof nombre === 'string' && typeof grupo === 'string')
  } catch {
    return []
  }
}

export function guardarCompaneros(companeros) {
  try {
    localStorage.setItem(clave, JSON.stringify(companeros))
  } catch (error) {
    console.warn('No se pudieron guardar los compañeros en el navegador', error)
  }
}
