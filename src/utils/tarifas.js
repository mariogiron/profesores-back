// Tarifa por hora de un profesor: base de 20 euros,
// un euro mas por cada anio de experiencia y tope en 50.
const TARIFA_BASE = 20;
const TARIFA_MAXIMA = 50;

export const calcularTarifa = (aniosExperiencia) => {
    if (!Number.isInteger(aniosExperiencia) || aniosExperiencia < 0) {
        throw new Error('La experiencia debe ser un número entero no negativo');
    }
    return Math.min(TARIFA_BASE + aniosExperiencia, TARIFA_MAXIMA);
};
