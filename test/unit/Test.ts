import {describe, expect, test} from '@jest/globals';
import { Routing } from 'src/web/routing/Routing';

describe('Test', () => {
  test('1+1=2', () => {
    expect(1+1).toEqual(2);
  });

  test('Import', () => {
    const r = new Routing();
    expect(r).toBeInstanceOf(Routing);
  })
})
