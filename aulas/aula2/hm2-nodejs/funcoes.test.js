const f = require('./funcoes'); 
 
test('somar 1 + 2 igual 3', () => { 
  expect(f.somar(1, 2)).toBe(3); 
}); 
 
test('elevar 5 a potência de 2 igual 25', () => { 
    expect(f.potencia(5, 2)).toBe(25); 
});