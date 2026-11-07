import { Language, BeltRank } from '../types';

export interface CoachChatResponse {
  reply: string;
  language: Language;
  isFallback?: boolean;
}

export async function askCoachChat(
  message: string,
  language: Language,
  beltLevel: BeltRank,
  history: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<CoachChatResponse> {
  const response = await fetch('/api/coach/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      language,
      beltLevel,
      history,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server responded with ${response.status}`);
  }

  return response.json();
}

export interface StreamCoachChatOptions {
  message: string;
  language: Language;
  beltLevel: BeltRank;
  history?: { role: 'user' | 'assistant'; content: string }[];
  onChunk: (accumulated: string) => void;
  onDone?: (fullText: string) => void;
  onError?: (err: Error) => void;
}

export async function streamCoachChat({
  message,
  language,
  beltLevel,
  history = [],
  onChunk,
  onDone,
  onError,
}: StreamCoachChatOptions): Promise<string> {
  try {
    const response = await fetch('/api/coach/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        language,
        beltLevel,
        history: history.slice(-4),
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Readable stream not supported in this browser environment');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let accumulated = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;
        const dataStr = trimmed.slice(5).trim();
        if (dataStr === '[DONE]') {
          break;
        }
        try {
          const parsed = JSON.parse(dataStr);
          if (parsed.text) {
            accumulated += parsed.text;
            onChunk(accumulated);
          }
        } catch {
          // ignore incomplete lines
        }
      }
    }

    if (onDone) {
      onDone(accumulated);
    }
    return accumulated;
  } catch (err: any) {
    if (onError) {
      onError(err);
    }
    throw err;
  }
}

export async function lookupTerminology(term: string, language: Language) {
  const response = await fetch('/api/coach/terminology', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      term,
      language,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to query terminology');
  }

  return response.json();
}
