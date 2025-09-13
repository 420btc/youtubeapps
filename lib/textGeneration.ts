/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

import {
  FinishReason,
  GenerateContentConfig,
  GenerateContentParameters,
  GoogleGenAI,
  HarmBlockThreshold,
  HarmCategory,
  Part,
  SafetySetting,
} from '@google/genai';

const GEMINI_API_KEY =
  globalThis.process.env.GEMINI_API_KEY || globalThis.process.env.GEMINI_API_KEY;

interface GenerateTextOptions {
  modelName: string;
  prompt: string;
  videoUrl?: string;
  temperature?: number;
  safetySettings?: SafetySetting[];
}

/**
 * Generate text content using the Gemini API, optionally including video data.
 *
 * @param options - Configuration options for the generation request.
 * @returns The response from the Gemini API.
 */
export async function generateText(
  options: GenerateTextOptions,
): Promise<string> {
  const {modelName, prompt, videoUrl, temperature = 0.75} = options;

  if (!GEMINI_API_KEY) {
    throw new Error('La clave API de Gemini falta o está vacía');
  }

  const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

  const parts: Part[] = [{text: prompt}];

  if (videoUrl) {
    try {
      parts.push({
        fileData: {
          mimeType: 'video/mp4',
          fileUri: videoUrl,
        },
      });
    } catch (error) {
      console.error('Error processing video input:', error);
      throw new Error(`Error al procesar entrada de video desde URL: ${videoUrl}`);
    }
  }

  const generationConfig: GenerateContentConfig = {
    temperature,
  };

  const request: GenerateContentParameters = {
    model: modelName,
    contents: [{role: 'user', parts}],
    config: generationConfig,
  };

  try {
    const response = await ai.models.generateContent(request);

    // Check for prompt blockage
    if (response.promptFeedback?.blockReason) {
      throw new Error(
        `Falló la generación de contenido: Prompt bloqueado (razón: ${response.promptFeedback.blockReason})`,
      );
    }

    // Check for response blockage
    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('Falló la generación de contenido: No se devolvieron candidatos.');
    }

    const firstCandidate = response.candidates[0];

    // Check for finish reasons other than STOP
    if (
      firstCandidate.finishReason &&
      firstCandidate.finishReason !== FinishReason.STOP
    ) {
      if (firstCandidate.finishReason === FinishReason.SAFETY) {
        throw new Error(
          'Falló la generación de contenido: Respuesta bloqueada por configuraciones de seguridad.',
        );
      } else {
        throw new Error(
          `Falló la generación de contenido: Detenido debido a ${firstCandidate.finishReason}.`,
        );
      }
    }

    return response.text;
  } catch (error) {
    console.error(
      'An error occurred during Gemini API call or response processing:',
      error,
    );
    throw error;
  }
}
