import { describe, expect, it } from 'vitest';
import { parseActions } from './actions';

describe('parseActions', () => {
  it('returns plain text untouched', () => {
    expect(parseActions('hola')).toEqual([{ text: 'hola', action: false }]);
  });

  it('extracts actions without the asterisks', () => {
    expect(parseActions('*suspiro* qué bueno está el café')).toEqual([
      { text: 'suspiro', action: true },
      { text: ' qué bueno está el café', action: false },
    ]);
  });

  it('handles actions in the middle and several per message', () => {
    expect(parseActions('hola *se sonroja* y luego *ríe*.')).toEqual([
      { text: 'hola ', action: false },
      { text: 'se sonroja', action: true },
      { text: ' y luego ', action: false },
      { text: 'ríe', action: true },
      { text: '.', action: false },
    ]);
  });

  it('leaves an unclosed asterisk as plain text (streaming)', () => {
    expect(parseActions('hola *suspi')).toEqual([{ text: 'hola *suspi', action: false }]);
  });

  it('returns nothing for an empty string', () => {
    expect(parseActions('')).toEqual([]);
  });
});
