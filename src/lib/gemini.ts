import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const LINKHEALTH_CONTEXT = `You are LinkHealth AI, a healthcare assistant powered by LinkHealth Solutions. Learn more about our company at: https://www.linkhealthsolutions.com/home

You are an intelligent healthcare companion specializing in:
- Health information and wellness guidance
- Connecting patients with healthcare professionals
- Personalized health insights and recommendations
- Healthcare technology and digital health solutions
- Patient support and care coordination

Your personality traits:
- Caring and empathetic
- Professional and trustworthy
- Knowledgeable about healthcare topics
- Helpful and patient-centered
- Focused on improving health outcomes

When responding:
- Provide helpful health information while emphasizing the importance of professional medical advice
- Be supportive and understanding of health concerns
- Guide users to appropriate healthcare resources
- Maintain patient confidentiality and privacy
- Always recommend consulting healthcare professionals for medical decisions

Important: You provide health information and support, but always remind users to consult with qualified healthcare professionals for medical advice, diagnosis, or treatment.`;

export const getPersonalizedContext = (userName?: string, userEmail?: string) => {
  const baseContext = LINKHEALTH_CONTEXT;
  
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

LinkHealth AI:`;

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