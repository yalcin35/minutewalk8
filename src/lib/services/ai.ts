import type { AIInsight } from '$lib/types/ai';
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      reject(new Error('Invalid file object'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function getAIInsights(
  question: string,
  rating: number,
  notes: string,
  photos: File[],
  auditType: string = '5s'
): Promise<AIInsight> {
  try {
    // Validate inputs
    if (!Array.isArray(photos)) {
      throw new Error('Photos must be an array');
    }

    // Filter out invalid files and convert valid ones to base64
    const validPhotos = photos.filter(file => file instanceof File && file.type.startsWith('image/'));
    const photoBase64Promises = validPhotos.map(fileToBase64);
    const photoBase64Data = await Promise.all(photoBase64Promises);

    // Determine which endpoint to use based on audit type
    let endpoint = '/audit/api/insights';
    
    // Get the current locale
    const currentLocale = get(locale);
    
    if (auditType === 'hse') {
      endpoint = '/audit/api/hse-insights';
    } else if (auditType === 'mhe') {
      endpoint = '/audit/api/mhe-insights';
    } else if (auditType === 'gemba') {
      endpoint = '/audit/api/gemba-insights';
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Accept-Language': currentLocale || 'en',
        'Cookie': `language=${currentLocale || 'en'}`
      },
      body: JSON.stringify({
        question,
        rating,
        notes,
        photos: photoBase64Data
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to get AI insights (${response.status})`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw error instanceof Error ? error : new Error('Failed to get AI insights');
  }
}