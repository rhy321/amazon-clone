import {formatCurrency} from '../scripts/utils/money.js';

//creates a test suite
describe('test suite: formatCurrency', () =>{
  it('convert cents to dollars', () =>{
    expect(formatCurrency(2095)).toEqual('20.95'); //test!
  });

  it('works with zero', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to nearest cent', () =>{
    expect()
  });
});