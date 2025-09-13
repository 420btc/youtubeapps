/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

export const SPEC_FROM_VIDEO_PROMPT = `Eres un pedagogo y diseñador de productos con profunda experiencia en crear experiencias de aprendizaje atractivas a través de aplicaciones web interactivas.

Examina el contenido del video adjunto. Luego, escribe una especificación detallada y cuidadosamente considerada para una aplicación web interactiva diseñada para complementar el video y reforzar su idea o ideas clave. El destinatario de la especificación no tiene acceso al video, por lo que la especificación debe ser completa y autónoma (la especificación no debe mencionar que está basada en un video). Aquí tienes un ejemplo de una especificación escrita en respuesta a un video sobre armonía funcional:

"En música, los acordes crean expectativas de movimiento hacia ciertos otros acordes y resolución hacia un centro tonal. Esto se llama armonía funcional.

Construye una aplicación web interactiva para ayudar a un estudiante a entender el concepto de armonía funcional.

ESPECIFICACIONES:
1. La aplicación debe incluir un teclado interactivo.
2. La aplicación debe mostrar las 7 tríadas diatónicas que se pueden crear en una tonalidad mayor (es decir, tónica, supertónica, mediante, subdominante, dominante, submediante, acorde sensible).
3. La aplicación debe describir de alguna manera la función de cada una de las tríadas diatónicas, y establecer hacia qué otros acordes tiende a dirigirse cada tríada.
4. La aplicación debe proporcionar una forma para que los usuarios toquen diferentes acordes en secuencia y vean los resultados.
[etc.]"

El objetivo de la aplicación que se construirá basada en la especificación es mejorar la comprensión a través de un diseño simple y lúdico. La especificación proporcionada debe ser lo suficientemente robusta para crear aplicaciones complejas y educativas, pero implementable por un desarrollador web en un solo archivo HTML (con todos los estilos y scripts en línea). Es crucial que la especificación describa claramente las mecánicas centrales de la aplicación, y esas mecánicas deben ser altamente efectivas para reforzar las ideas clave del video.

Crea aplicaciones más sofisticadas con múltiples características interactivas, animaciones, elementos de gamificación, sistemas de progreso, y funcionalidades avanzadas que proporcionen una experiencia de aprendizaje rica y completa. La aplicación debe incluir al menos 8-12 características principales bien desarrolladas.

Proporciona el resultado como un objeto JSON que contenga un solo campo llamado "spec", cuyo valor sea la especificación para la aplicación web.`;

export const CODE_REGION_OPENER = '```';
export const CODE_REGION_CLOSER = '```';

export const SPEC_ADDENDUM = `\n\nLa aplicación debe ser completamente responsiva y funcionar correctamente tanto en escritorio como en móvil. Proporciona el código como un documento HTML único y autónomo. Todos los estilos y scripts deben estar en línea. En el resultado, encierra el código entre "${CODE_REGION_OPENER}" y "${CODE_REGION_CLOSER}" para facilitar el análisis. Asegúrate de crear una aplicación robusta, compleja y rica en funcionalidades que maximice el aprendizaje del usuario con múltiples elementos interactivos, animaciones suaves, y una experiencia de usuario excepcional.`;
