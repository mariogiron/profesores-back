import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { calcularTarifa } from '../src/utils/tarifas.js';

describe('calcularTarifa', () => {
    it('suma un euro por cada año de experiencia a la tarifa base', () => {
        assert.equal(calcularTarifa(5), 25);
    });

    it('no supera nunca la tarifa máxima de 50 euros', () => {
        assert.equal(calcularTarifa(40), 50);
    });

    it('lanza un error si la experiencia no es un número válido', () => {
        assert.throws(() => calcularTarifa(-3));
    });
});
