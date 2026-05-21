import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic();

export async function POST(request: NextRequest) {
  let location: string;

  try {
    const body = await request.json();
    location = (body.location ?? '').trim();
  } catch {
    return NextResponse.json(
      { error: 'Ungültiges JSON im Request-Body.' },
      { status: 400 }
    );
  }

  // Validate before calling Claude — prevents "text content blocks must be non-empty"
  if (!location) {
    return NextResponse.json(
      { error: 'Bitte gib einen Ort an.' },
      { status: 400 }
    );
  }

  const stream = client.messages.stream({
    model: 'claude-haiku-4-5',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `Erzähl mir eine kurze, witzige Geschichte (2–3 Sätze) über den Ort: ${location}. Schreib auf Deutsch, locker und persönlich im Du-Stil.`,
      },
    ],
  });

  const message = await stream.finalMessage();
  const textBlock = message.content.find((b) => b.type === 'text');
  const story = textBlock?.type === 'text' ? textBlock.text : '';

  return NextResponse.json({ story });
}
