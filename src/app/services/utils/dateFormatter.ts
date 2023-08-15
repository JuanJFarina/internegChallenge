export function fechaActual(): string {
    const date = new Date();
    const anio = date.getFullYear();
    const mes = (date.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 });
    const dia = (date.getDate()).toLocaleString('en-US', { minimumIntegerDigits: 2 });
    const hora = date.getHours();
    const minutos = date.getMinutes();
    const segundos = date.getSeconds();
    return `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
}