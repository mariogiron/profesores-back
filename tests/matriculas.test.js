import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { calcularPrecio } from '../src/utils/matriculas.js';

describe('calcularPrecio', () => {
    it('calcula el precio base de un máster de 10 créditos', () => {
        assert.equal(calcularPrecio('master', 10, false, false), 780);
    });

    it('aplica el descuento de antiguo alumno', () => {
        assert.equal(calcularPrecio('master', 10, true, false), 663);
    });

    it('acumula el descuento por pago anticipado', () => {
        assert.equal(calcularPrecio('master', 10, true, true), 629.85);
    });
});
