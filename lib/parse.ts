/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

export const parseJSON = (str: string) => {
  try {
    // Buscar el primer { y el último } que coincidan
    const start = str.indexOf('{');
    if (start === -1) {
      throw new Error('No se encontró JSON válido en la respuesta');
    }
    
    // Encontrar el } que cierra correctamente
    let braceCount = 0;
    let end = -1;
    for (let i = start; i < str.length; i++) {
      if (str[i] === '{') braceCount++;
      if (str[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          end = i + 1;
          break;
        }
      }
    }
    
    if (end === -1) {
      throw new Error('JSON malformado: no se encontró cierre válido');
    }
    
    const jsonStr = str.substring(start, end);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    console.error('String original:', str);
    // Intentar extraer spec de manera alternativa
    const specMatch = str.match(/"spec"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/s);
    if (specMatch) {
      return { spec: specMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"') };
    }
    throw new Error('No se pudo extraer especificación válida de la respuesta');
  }
};

export const parseHTML = (str: string, opener: string, closer: string) => {
  try {
    // Buscar el inicio del HTML
    let start = str.indexOf('<!DOCTYPE html>');
    if (start === -1) {
      // Si no encuentra DOCTYPE, buscar <html>
      start = str.indexOf('<html');
      if (start === -1) {
        // Como último recurso, buscar el opener
        start = str.indexOf(opener);
        if (start !== -1) {
          start += opener.length;
        }
      }
    }
    
    if (start === -1) {
      throw new Error('No se encontró HTML válido en la respuesta');
    }
    
    // Buscar el final
    const end = str.lastIndexOf(closer);
    if (end === -1 || end <= start) {
      throw new Error('No se encontró cierre válido del HTML');
    }
    
    return str.substring(start, end);
  } catch (error) {
    console.error('Error parsing HTML:', error);
    console.error('String original:', str.substring(0, 500) + '...');
    throw new Error('No se pudo extraer código HTML válido de la respuesta');
  }
};
