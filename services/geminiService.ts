import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const shouldLie = () => Math.random() < 0.25; // 25% chance to lie

/**
 * Generates a list of fake search results for a given query.
 */
export const getFakeSearchResults = async (prompt: string, isNorthKoreaMode: boolean = false): Promise<any> => {
  let systemInstruction: string;
  let userQuery: string;

  if (isNorthKoreaMode) {
    systemInstruction = "Ты - официальная поисковая система Корейской Народно-Демократической Республики. Все результаты должны прославлять Великого Руководителя, партию и идеи чучхе. Любой контент, противоречащий государственной идеологии, строго запрещен. Ответ должен быть в формате JSON.";
    userQuery = `Создай 5-7 результатов поиска для запроса: "${prompt}", которые соответствуют идеологии чучхе. Важно: все URL в результатах должны заканчиваться на домен верхнего уровня .kp.`;
  } else {
    const lieInstruction = shouldLie() 
      ? "Некоторые из этих результатов должны содержать тонкую, но убедительную ложь или дезинформацию." 
      : "Все результаты должны быть максимально точными и релевантными.";
    systemInstruction = `Ты - поисковая система. ${lieInstruction} Ответ должен быть в формате JSON.`;
    userQuery = `Создай список из 5-7 фиктивных результатов поиска для запроса: "${prompt}".`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${systemInstruction} Запрос пользователя: "${userQuery}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Заголовок страницы" },
              url: { type: Type.STRING, description: "Полностью вымышленный, но правдоподобный URL, заканчивающийся на .kp" },
              snippet: { type: Type.STRING, description: "Краткое описание страницы (2-3 предложения)" },
            },
            required: ["title", "url", "snippet"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error fetching fake search results:", error);
    // Return a structured error that the UI can handle
    return [{
      id: 'error-1',
      title: "Ошибка при генерации ответа",
      url: "error.local",
      snippet: "К сожалению, не удалось получить результаты поиска. Пожалуйста, попробуйте еще раз."
    }];
  }
};

/**
 * Generates content for a fake website based on its title and snippet.
 */
export const generateWebsiteContent = async (title: string, snippet: string, isNorthKoreaMode: boolean = false): Promise<string> => {
    let contentInstruction: string;

    if (isNorthKoreaMode) {
        contentInstruction = "Контент должен быть написан в стиле северокорейской пропаганды. Он должен восхвалять Великого Руководителя Ким Чен Ына, нацию, Трудовую партию Кореи и идеи чучхе. Используй патриотические и идеологически верные формулировки. Структура должна быть формальной и возвышенной.";
    } else {
        contentInstruction = shouldLie() 
            ? "Контент должен выглядеть абсолютно достоверным, но содержать несколько хорошо спрятанных неверных фактов. Не предупреждай, что информация ложная." 
            : "Контент должен быть точным, хорошо структурированным и информативным.";
    }


  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Ты — AI веб-дизайнер. Твоя задача — создать HTML-содержимое для фиктивной веб-страницы на основе заголовка и описания.
Заголовок страницы: "${title}"
Описание: "${snippet}"

Инструкции:
1.  Сгенерируй ТОЛЬКО HTML-код, который мог бы находиться внутри тега <body>. Не включай \`<html>\`, \`<head>\`, или \`<body>\` теги.
2.  Используй семантические HTML-теги: \`<h1>\` для основного заголовка, \`<h2>\` для подзаголовков, \`<p>\` для параграфов, \`<ul>\` и \`<li>\` для списков, \`<strong>\` и \`<em>\` для выделения.
3.  Примени классы Tailwind CSS для стилизации, чтобы страница выглядела как настоящий, чистый и современный сайт. Пример классов: text-2xl, font-bold, mt-8, mb-4, p-6, bg-slate-100, rounded-lg, text-slate-700, list-disc, ml-6.
4.  Структурируй контент логично: начни с заголовка \`<h1>\`, за которым может следовать краткое введение, а затем несколько секций с подзаголовками \`<h2>\`.
5.  ${contentInstruction}
6.  Ответ должен быть только HTML-кодом. Никаких объяснений или markdown.
`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating website content:", error);
    return "<h2>Ошибка</h2><p>Не удалось загрузить содержимое этой страницы. Пожалуйста, закройте это окно и попробуйте еще раз.</p>";
  }
};