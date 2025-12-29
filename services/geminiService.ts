
import { GoogleGenAI } from "@google/genai";
import { BlogInputs } from "../types";

export const generateBlog = async (inputs: BlogInputs): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    You are a professional SEO market research blog generator.
    Your task is to generate a comprehensive, SEO-friendly market research blog post of approximately 1500 words.

    CORE RULES:
    1. Output VALID HTML ONLY. Do not include markdown code blocks, backticks, or "html" labels. Just raw HTML starting with <h2>.
    2. Start directly with an <h2> section titled exactly: Market Overview.
    3. No preamble, no title, no introduction before that <h2>.
    4. Opening Paragraph: Use the Google Search tool to visit the Source Link: ${inputs.sourceLink}. 
       Copy the FIRST paragraph from that page exactly.
       Hyperlink ONLY the Keyword "${inputs.keyword}" within this paragraph using the Link: ${inputs.sourceLink}.
    5. Image: Immediately after the opening paragraph, insert: <img src="${inputs.imageLink}" width="800" height="600" alt="${inputs.keyword} market analysis" />.
    6. Content Organization: Use <h2> and <h3> tags.
       Must include: Market Dynamics, Key Growth Drivers, Market Challenges, Segmentation Analysis, Regional Insights, and Future Outlook.
    7. Professional, authoritative tone. No competitor names.
    8. NO external or internal links other than the provided Source Link.
    9. Mandatory Line: After the end of the THIRD <h2> section, insert this line exactly: 
       Read more: <a href="${inputs.sourceLink}">${inputs.sourceLink}</a>
    10. Hyperlink the Keyword "${inputs.keyword}" exactly ONCE in the entire blog (in the first paragraph).
    11. Aim for a high word count (~1500 words) with deep analysis.
  `;

  const prompt = `
    Generate a market research blog post based on these inputs:
    Keyword: ${inputs.keyword}
    Source Link: ${inputs.sourceLink}
    Image Link: ${inputs.imageLink}

    Remember: Use the Search tool to fetch the first paragraph from ${inputs.sourceLink} and follow all structural rules.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate blog content. Please check your API key and network.");
  }
};
