export interface TextSegment {
  text: string;
  action: boolean;
}

/**
 * Splits a chat message into plain text and "action" segments: whatever sits
 * between a pair of asterisks (`*suspiro*`) is an action/thought and is
 * returned without the asterisks so it can be styled differently.
 * An asterisk that is never closed (e.g. while the answer is still streaming)
 * is left as plain text.
 */
export function parseActions(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const pattern = /\*([^*\n]+)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      segments.push({ text: text.slice(last, match.index), action: false });
    }
    segments.push({ text: match[1], action: true });
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    segments.push({ text: text.slice(last), action: false });
  }
  return segments;
}
