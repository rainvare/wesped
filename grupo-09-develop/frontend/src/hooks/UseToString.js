// Convierte una fecha en formato que JAVA pueda usar
export const toJavaDateString = (date) => date?.toISOString().slice(0, 10);

// Convierte una fecha en formato entendible por usuario de habla hispana
export const toUserReadableDateString = (dateString) => dateString?.toLocaleDateString('es-US')
