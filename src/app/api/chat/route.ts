import { NextRequest, NextResponse } from 'next/server';
import { getChatCompletion } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    console.log('API route called');
    
    const { messages, userInfo } = await request.json();
    console.log('Received messages:', messages);
    console.log('User info:', userInfo);

    if (!messages || !Array.isArray(messages)) {
      console.log('Invalid messages format');
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    console.log('Calling Gemini...');
    const response = await getChatCompletion(
      messages,
      userInfo?.displayName,
      userInfo?.email
    );
    console.log('Gemini response:', response);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Chat API error:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'Failed to process chat request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}