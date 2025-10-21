/**
 * OpenAI API service for AI assistance
 */

import OpenAI from 'openai';
import { AISuggestion } from '@/types/FormData';

// Re-export AISuggestion for convenience
export type { AISuggestion };

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for development - should be moved to backend in production
});

export interface AIServiceConfig {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  timeout?: number;
}

export class AIService {
  private config: Required<AIServiceConfig>;

  constructor(config: AIServiceConfig = {}) {
    this.config = {
      model: config.model || import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo',
      maxTokens: config.maxTokens || 500,
      temperature: config.temperature || 0.7,
      timeout: config.timeout || 30000,
    };
  }

  /**
   * Generate suggestions for improving form text
   */
  async generateSuggestion(
    originalText: string,
    fieldType: string,
    language: string = 'en'
  ): Promise<AISuggestion> {
    try {
      const prompt = this.buildPrompt(originalText, fieldType, language);
      
      const response = await openai.chat.completions.create({
        model: this.config.model,
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(language),
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
      });

      const suggestedText = response.choices[0]?.message?.content || originalText;
      
      return {
        id: this.generateId(),
        originalText,
        suggestedText: suggestedText.trim(),
        confidence: this.calculateConfidence(originalText, suggestedText),
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI suggestion');
    }
  }

  /**
   * Generate multiple suggestions for different aspects
   */
  async generateMultipleSuggestions(
    originalText: string,
    fieldType: string,
    language: string = 'en'
  ): Promise<AISuggestion[]> {
    const suggestions: AISuggestion[] = [];
    
    try {
      // Generate suggestions for different aspects
      const aspects = this.getAspectsForField(fieldType);
      
      for (const aspect of aspects) {
        const suggestion = await this.generateSuggestion(
          originalText,
          `${fieldType}_${aspect}`,
          language
        );
        suggestions.push(suggestion);
      }
      
      return suggestions;
    } catch (error) {
      console.error('AI Service Error:', error);
      return [];
    }
  }

  private buildPrompt(originalText: string, fieldType: string, language: string): string {
    const fieldInstructions = this.getFieldInstructions(fieldType, language);
    
    return `${fieldInstructions}

Original text: "${originalText}"

Please provide an improved version that is more detailed, professional, and compelling while maintaining the original meaning and tone.`;
  }

  private getSystemPrompt(language: string): string {
    const basePrompt = `You are an AI assistant helping citizens write compelling applications for social support. 
    Your role is to help improve the clarity, detail, and persuasiveness of their descriptions while maintaining authenticity.`;
    
    if (language === 'ar') {
      return `${basePrompt} Respond in Arabic and maintain cultural sensitivity.`;
    }
    
    return `${basePrompt} Respond in English.`;
  }

  private getFieldInstructions(fieldType: string, language: string): string {
    const instructions: Record<string, Record<string, string>> = {
      en: {
        currentSituation: 'Describe the applicant\'s current living situation, including housing, family circumstances, and daily challenges.',
        financialHardship: 'Explain the specific financial difficulties, including income loss, unexpected expenses, or economic hardships.',
        requestedAssistance: 'Detail what type of assistance is needed and how it would help improve the applicant\'s situation.',
      },
      ar: {
        currentSituation: 'صف الوضع المعيشي الحالي للمتقدم، بما في ذلك السكن والظروف العائلية والتحديات اليومية.',
        financialHardship: 'اشرح الصعوبات المالية المحددة، بما في ذلك فقدان الدخل أو النفقات غير المتوقعة أو المصاعب الاقتصادية.',
        requestedAssistance: 'وضح نوع المساعدة المطلوبة وكيف ستساعد في تحسين وضع المتقدم.',
      },
    };

    return instructions[language]?.[fieldType] || instructions.en[fieldType] || '';
  }

  private getAspectsForField(fieldType: string): string[] {
    const aspects: Record<string, string[]> = {
      currentSituation: ['detail', 'clarity', 'impact'],
      financialHardship: ['specificity', 'urgency', 'evidence'],
      requestedAssistance: ['feasibility', 'benefit', 'justification'],
    };

    return aspects[fieldType] || ['improvement'];
  }

  private generateId(): string {
    return `ai_suggestion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private calculateConfidence(original: string, suggested: string): number {
    // Simple confidence calculation based on text length improvement
    const originalLength = original.length;
    const suggestedLength = suggested.length;
    
    if (originalLength === 0) return 0.5;
    
    const lengthRatio = suggestedLength / originalLength;
    
    // Confidence based on length improvement (more detailed = higher confidence)
    if (lengthRatio > 1.5) return 0.9;
    if (lengthRatio > 1.2) return 0.8;
    if (lengthRatio > 1.0) return 0.7;
    return 0.6;
  }
}

// Export singleton instance
export const aiService = new AIService();
