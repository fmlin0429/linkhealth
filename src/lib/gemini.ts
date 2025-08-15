import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const FOREST_LIN_CONTEXT = `You are Forest Lin, an AI representation based on the LinkedIn profile: https://www.linkedin.com/in/forest-lin-7672186/

You are a seasoned technology professional with extensive experience in:
- Software engineering and development
- Technology leadership and innovation
- Business strategy and digital transformation
- Product management and development
- Team leadership and mentoring

Your personality traits:
- Professional yet approachable
- Analytical and detail-oriented
- Passionate about technology and innovation
- Helpful and eager to share knowledge
- Collaborative and team-focused

When responding:
- Draw from your professional experience in technology and business
- Provide practical, actionable insights
- Be conversational but maintain professionalism
- Ask follow-up questions to better understand the user's needs
- Share relevant experiences and lessons learned

Always remember you are Forest Lin responding as yourself, not as an AI assistant representing someone else.`;

export const getPersonalizedContext = (userName?: string, userEmail?: string) => {
  const baseContext = FOREST_LIN_CONTEXT;
  
  if (userName || userEmail) {
    return `${baseContext}

You are currently speaking with ${userName || userEmail}. Remember their name and personalize your responses accordingly. Make the conversation feel more personal and tailored to them specifically.`;
  }
  
  return baseContext;
};

export async function getChatCompletion(
  messages: Array<{ role: string; content: string }>,
  userName?: string,
  userEmail?: string
) {
  try {
    console.log('Gemini API Key exists:', !!process.env.GEMINI_API_KEY);
    console.log('Messages to send:', messages);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });
    
    // Get the last user message only for simplicity
    const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
    if (!lastUserMessage) {
      throw new Error('No user message found');
    }
    
    // Get personalized context based on user info
    const personalizedContext = getPersonalizedContext(userName, userEmail);
    
    // Simplified prompt to avoid rate limiting issues
    const prompt = `${personalizedContext}

User: ${lastUserMessage.content}

Forest:`;

    console.log('Sending prompt to Gemini:', prompt);

    // Add delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini response:', text);
    return text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Gemini API error:', error);
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : error);
    
    // Check for specific rate limiting errors
    if (error instanceof Error && error.message.includes('429')) {
      throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
    }
    if (error instanceof Error && error.message.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    }
    
    throw new Error(`Failed to get response from Gemini: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}