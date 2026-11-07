import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize server-side Gemini client
  const rawApiKey = (process.env.GEMINI_API_KEY || '').trim();
  const isValidApiKey = Boolean(rawApiKey && rawApiKey !== 'MY_GEMINI_API_KEY' && rawApiKey.length > 15);
  let ai: GoogleGenAI | null = null;
  if (isValidApiKey) {
    ai = new GoogleGenAI({
      apiKey: rawApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Promise timeout utility to guarantee ultra-fast response times
  function withTimeout<T>(promise: Promise<T>, ms: number = 6000): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
      ),
    ]);
  }

  // In-memory cache to prevent duplicate API calls and speed up responses
  const responseCache = new Map<string, { reply: string; language: string }>();

  // System instruction for the Master Coach - strictly concise, fast, and multilingual
  const MASTER_COACH_SYSTEM_INSTRUCTION = `
You are Grandmaster Sabomnim AI, the Master Coach for "PTF & World Strikers AI Taekwondo Master Coach".

MISSION & DOMAIN:
- Instruct students from 10th Gup to 1st Gup, and 1st Dan to 9th Dan educational preparation.
- Masterfully explain Kukkiwon Poomsae (Taegeuk 1–8, Koryo to Ilyeo), Olympic Kyorugi sparring tactics (PSS electronic scoring, counter-attacks), WT Referee rules (2024–2026), and Korean martial terminology.
- When conducting mock examinations: Ask ONE question at a time. After the student answers, correct any mistakes, explain the standard Kukkiwon/WT rule, and ask the next question.

SPEED & CONCISENESS (CRITICAL):
1. Keep ordinary answers approximately 100–150 words.
2. DO NOT include repetitive greetings or bow commands (avoid "Charyeot! Kyeong-rye" or introductory filler on every message). Answer the question immediately with technical precision.
3. Focus on actionable cues: stance angle (Seogi), hip rotation (Golban), chamber position, striking tool, and breathing (Kihap).

LANGUAGE RULES:
- English: Clear, focused technical English with Korean Hangul/Romanization.
- Urdu (اردو): Must write strictly in proper Urdu script (اردو رسم الخط), NEVER Roman Urdu. Explain Korean terminology clearly in Urdu.
- Arabic (العربية): Must write in natural Arabic, explaining Korean martial terms with Arabic definitions.

DISCLAIMER: Educational assistant only; not an official Kukkiwon or PTF certification authority.
`.trim();

  let geminiTemporarilyDisabled = false;
  let lastFailureTime = 0;

  // Helper for curated fallback responses when API key is unavailable or throttled
  function getCuratedCoachAdvice(message: string, language: string, beltLevel: string): string {
    const lower = message.toLowerCase();

    // ----------------- URDU (اردو رسم الخط) -----------------
    if (language === 'Urdu') {
      if (lower.includes('exam') || lower.includes('امتحان') || lower.includes('ٹیسٹ') || lower.includes('سوال')) {
        return `آئیے آپ کا موک امتحان شروع کرتے ہیں۔ پہلا سوال:\nتائیکوانڈو کے 5 بنیادی اخلاقی اصول (Tenets) میں سے وہ کون سا اصول ہے جس کا مطلب 'احترام و آداب' ہے؟\n(A) یوم-چی (Yom-Chi)\n(B) یے-اوئی (Ye-Ui)\n(C) ان-نائے (In-Nae)\nاپنا جواب نیچے لکھیں تاکہ میں اس کی تصدیق کر سکوں۔`;
      }
      if (lower.includes('stance') || lower.includes('seogi') || lower.includes('اسٹانس') || lower.includes('پوزیشن') || lower.includes('کوبی')) {
        return `تائیکوانڈو میں بنیادی اسٹانسز (Seogi) کا موازنہ:\n1. آپ سوگی (Ap Seogi - واکنگ اسٹانس): قدرتی چلنے کا فاصلہ، دونوں پیر سیدھے آگے، وزن 50/50 برابر۔\n2. آپ کوبی (Ap Koobi - لمبا آگے کا اسٹانس): ڈیڑھ گنا چوڑا، اگلا گھٹنہ 90 ڈگری پر مڑا ہوا، وزن 70% آگے اور 30% پیچھے۔\n3. دویت کوبی (Dwit Koobi - ایل اسٹانس): وزن 70% پچھلے پیر پر تاکہ فوری کک یا دفاع کیا جا سکے۔`;
      }
      if (lower.includes('poomsae') || lower.includes('form') || lower.includes('پومسے') || lower.includes('فارم') || lower.includes('ٹیگوک')) {
        return `پومسے (Poomsae) تائیکوانڈو کی روح ہے۔ ہر ٹیگوک فارم کی شروعات اور اختتام بالکل ایک ہی جگہ پر ہونی چاہیے۔ نگاہیں ہمیشہ حملے کی سمت میں رکھیں، سانس کو کک یا بلاک کے اختتام پر کنٹرول کے ساتھ باہر نکالیں، اور موومنٹ لائن (Poomsae Line) پر مستحکم توازن برقرار رکھیں۔`;
      }
      if (lower.includes('referee') || lower.includes('rule') || lower.includes('قواعد') || lower.includes('پوائنٹ') || lower.includes('فائٹ')) {
        return `ورلڈ تائیکوانڈو (WT) مقابلے کے قواعد (2024–2026):\n• چیسٹ پروٹیکٹر (Trunk) پر پنچ: 1 پوائنٹ۔\n• باڈی پر عام کک: 2 پوائنٹس۔\n• ہیڈ پر عام کک: 3 پوائنٹس۔\n• باڈی پر ٹرننگ کک: 4 پوائنٹس۔\n• ہیڈ پر ٹرننگ کک: 5 پوائنٹس۔\n• گم-جیوم (Gam-jeom) منفی پنالٹی ہے؛ ایک راؤنڈ میں 5 گم-جیوم پر راؤنڈ ہار ہو جاتی ہے۔`;
      }
      // General kick or advice
      return `تائیکوانڈو کک (Chagi) میں بنیادی اہمیت گھٹنے کے چیمبر (Chamber) اور کھڑے پیر کے پیوٹ (Pivot) کی ہے۔ کک مارنے سے پہلے گھٹنہ سینے کی طرف اٹھائیں، سپورٹنگ پیر کو 90 سے 180 ڈگری گھمائیں، اور ہڑتال کے وقت کیہاپ (Kihap) کے ساتھ سانس باہر نکالیں۔ مارنے کے بعد پیر فوراً واپس چیمبر کریں تاکہ جوابی حملے سے بچا جا سکے۔`;
    }

    // ----------------- ARABIC (العربية) -----------------
    if (language === 'Arabic') {
      if (lower.includes('exam') || lower.includes('اختبار') || lower.includes('امتحان') || lower.includes('سؤال')) {
        return `دعنا نبدأ اختبارك التجريبي لمستوى ${beltLevel}. السؤال الأول:\nأي من مبادئ التايكوندو الأخلاقية الخمسة تعني 'الاحترام والأدب'؟\n(أ) يوم-تشي (Yom-Chi)\n(ب) يي-أوي (Ye-Ui)\n(ج) إن-ناي (In-Nae)\nاكتب خيارك وسأقوم بتقييمه وشرحه لك فوراً.`;
      }
      if (lower.includes('stance') || lower.includes('seogi') || lower.includes('وقفة') || lower.includes('وقفات') || lower.includes('كوبي')) {
        return `الوقفات الأساسية في التايكوندو (Seogi):\n1. أب سوغي (Ap Seogi): وقفة المشي العادية، توزيع الوزن 50% لكلتا القدمين.\n2. أب كوبي (Ap Koobi): وقفة أمامية طويلة، ثني الركبة الأمامية، 70% من الوزن على القدم الأمامية و30% على الخلفية.\n3. دويت كوبي (Dwit Koobi): وقفة خلفية على شكل حرف L، 70% من الوزن على القدم الخلفية لمرونة الركل.`;
      }
      if (lower.includes('poomsae') || lower.includes('بومسي') || lower.includes('تايغوك') || lower.includes('نمط')) {
        return `في أداء البومسي (Poomsae): يجب أن تبدأ وتنتهي في نفس النقطة تماماً. حافظ على مسار الحركة، وحافظ على دوران الورك لتوليد القوة العظمى، وازفر الهواء مع كل ضربة أو صدة بتركيز وانضباط تام.`;
      }
      if (lower.includes('referee') || lower.includes('rule') || lower.includes('تحكيم') || lower.includes('نقاط') || lower.includes('قتال')) {
        return `قواعد التحكيم للاتحاد العالمي للتايكوندو (WT 2024–2026):\n• لكمة مستقيمة للجذع: نقطة واحدة.\n• ركلة عادية للجذع: نقطتان.\n• ركلة للرأس: 3 نقاط.\n• ركلة دائرية للجذع: 4 نقاط.\n• ركلة دائرية للرأس: 5 نقاط.\n• إنذار Gam-jeom يمنح الخصم نقطة، و5 إنذارات في جولة واحدة تعني خسارة الجولة.`;
      }
      // General kick or advice
      return `في ركلات التايكوندو (Chagi)، الركيزة الأساسية هي رفع الركبة أولاً (Chambering) وتدوير قدم الارتكاز (Pivot). ارفع الركبة نحو الصدر أولاً، دور قدم الدعم بزاوية ملائمة، وأطلق الركلة مع زفير قوي وصرخة Kihap، ثم أعد القدم لمكانها فوراً لحماية التوازن.`;
    }

    // ----------------- ENGLISH -----------------
    if (lower.includes('exam') || lower.includes('test') || lower.includes('quiz') || lower.includes('question')) {
      return `Let us begin your 1-question mock exam for ${beltLevel}. Question 1:\nWhich of the 5 Tenets of Taekwondo translates to 'Courtesy and Respect'?\n(A) Yom-Chi\n(B) Ye-Ui\n(C) Baekjeol-Bulgul\nType your answer below, and I will evaluate your knowledge immediately!`;
    }
    if (lower.includes('stance') || lower.includes('seogi') || lower.includes('koobi')) {
      return `Key Taekwondo Stances (Seogi) Breakdown:\n1. Ap Seogi (Walking Stance): Natural 1-step length, weight distributed 50/50.\n2. Ap Koobi (Forward Long Stance): 1.5 steps long, front knee bent directly over ankle; 70% weight on front leg, 30% on rear leg.\n3. Dwit Koobi (Back Stance / L-Stance): Feet at 90° angle, 70% weight on rear bent leg for instant counter-kicking.`;
    }
    if (lower.includes('poomsae') || lower.includes('form') || lower.includes('taegeuk')) {
      return `Kukkiwon Poomsae Master Guidelines:\n• Accurate Line of Movement: Always return to your exact starting spot on the final movement.\n• Speed & Power Harmony: Deliver fast transitions with sudden, decisive deceleration at the end of each block or strike.\n• Eye Contact: Direct your gaze precisely in the direction of the imaginary opponent before stepping.`;
    }
    if (lower.includes('referee') || lower.includes('rule') || lower.includes('score') || lower.includes('penalty') || lower.includes('gam-jeom')) {
      return `WT Olympic Competition Scoring & Penalty Rules (2024–2026):\n• Valid Punch to trunk: 1 point.\n• Basic Kick to trunk: 2 points.\n• Direct Head Kick: 3 points.\n• Turning Kick to trunk: 4 points.\n• Turning Kick to head: 5 points.\n• Gam-jeom (penalty): Grants 1 point to opponent. Accumulating 5 Gam-jeom penalties results in round forfeiture by referee stop contest (RSC).`;
    }

    // Default kicking mechanics
    return `For effective kicking (Chagi), master the 3 phases:\n1. High chamber—drive your knee straight up toward the chest.\n2. Standing foot pivot—rotate base heel 90°–180° to fully engage hips.\n3. Rapid snap & re-chamber—snap through the target, exhale sharply with Kihap, and immediately re-chamber before touching down.`;
  }

  // Route: Streaming AI Voice / Chat Coach (SSE)
  app.post('/api/coach/stream', async (req, res) => {
    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    if (typeof res.flushHeaders === 'function') {
      res.flushHeaders();
    }

    try {
      const { message, language = 'English', beltLevel = '10th Gup (White Belt)', history = [] } = req.body;

      if (!message || typeof message !== 'string') {
        res.write(`data: ${JSON.stringify({ text: 'Please provide a question.' })}\n\n`);
        res.write('data: [DONE]\n\n');
        return res.end();
      }

      // Check cache for identical query
      const cacheKey = `${language}:${beltLevel}:${message.trim().toLowerCase()}`;
      if (responseCache.has(cacheKey)) {
        const cached = responseCache.get(cacheKey)!;
        res.write(`data: ${JSON.stringify({ text: cached.reply })}\n\n`);
        res.write('data: [DONE]\n\n');
        return res.end();
      }

      const isGeminiEligible = Boolean(ai && (!geminiTemporarilyDisabled || Date.now() - lastFailureTime > 60000));

      if (isGeminiEligible && ai) {
        try {
          const contents = [
            ...history.slice(-4).map((h: { role: string; content: string }) => ({
              role: h.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: h.content }],
            })),
            {
              role: 'user',
              parts: [
                {
                  text: `[Student Belt: ${beltLevel} | Language: ${language}]\nAthlete Inquiry: ${message}\nRespond directly in ${language}. If Urdu, write exclusively in Urdu script. If Arabic, write in Arabic script. Keep answer approximately 100-150 words with actionable martial cues. If the athlete asks for mock exam or testing, ask exactly ONE question.`,
                },
              ],
            },
          ];

          const responseStream = await withTimeout(
            ai.models.generateContentStream({
              model: 'gemini-3.8-flash',
              contents,
              config: {
                systemInstruction: MASTER_COACH_SYSTEM_INSTRUCTION,
                thinkingConfig: {
                  thinkingLevel: ThinkingLevel.LOW,
                },
              },
            }),
            3000
          );

          let fullReply = '';
          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
              fullReply += text;
              res.write(`data: ${JSON.stringify({ text })}\n\n`);
            }
          }

          if (fullReply) {
            geminiTemporarilyDisabled = false;
            responseCache.set(cacheKey, { reply: fullReply.trim(), language });
            if (responseCache.size > 200) {
              const firstKey = responseCache.keys().next().value;
              if (firstKey) responseCache.delete(firstKey);
            }
          }

          res.write('data: [DONE]\n\n');
          return res.end();
        } catch (apiError: any) {
          console.error('Gemini stream error (falling back to curated coach):', apiError?.message);
          geminiTemporarilyDisabled = true;
          lastFailureTime = Date.now();
        }
      }

      // Fallback streaming
      const fallback = getCuratedCoachAdvice(message, language, beltLevel);
      const words = fallback.split(' ');
      for (const word of words) {
        res.write(`data: ${JSON.stringify({ text: word + ' ' })}\n\n`);
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (err: any) {
      console.error('Stream handler failure:', err);
      res.write(`data: ${JSON.stringify({ text: 'Technical timeout. Maintain your stance and breathe through the kick!' })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
    }
  });

  // Route: Standard AI Voice / Chat Coach (JSON)
  app.post('/api/coach/chat', async (req, res) => {
    try {
      const { message, language = 'English', beltLevel = '10th Gup (White Belt)', history = [] } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Check cache for identical query
      const cacheKey = `${language}:${beltLevel}:${message.trim().toLowerCase()}`;
      if (responseCache.has(cacheKey)) {
        const cached = responseCache.get(cacheKey)!;
        return res.json({ ...cached, fromCache: true });
      }

      const isGeminiEligible = Boolean(ai && (!geminiTemporarilyDisabled || Date.now() - lastFailureTime > 60000));

      if (isGeminiEligible && ai) {
        try {
          const contents = [
            ...history.slice(-3).map((h: { role: string; content: string }) => ({
              role: h.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: h.content }],
            })),
            {
              role: 'user',
              parts: [
                {
                  text: `Belt: ${beltLevel} | Lang: ${language} | Question: ${message}\nProvide a concise 100-150 word answer directly in ${language}.`,
                },
              ],
            },
          ];

          const response = await withTimeout(
            ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents,
              config: {
                systemInstruction: MASTER_COACH_SYSTEM_INSTRUCTION,
                thinkingConfig: {
                  thinkingLevel: ThinkingLevel.LOW,
                },
              },
            }),
            3000
          );

          const replyText = (response.text || 'Focus on your stance, hip chamber, and clean execution.').trim();
          geminiTemporarilyDisabled = false;
          responseCache.set(cacheKey, { reply: replyText, language });
          if (responseCache.size > 200) {
            const firstKey = responseCache.keys().next().value;
            if (firstKey) responseCache.delete(firstKey);
          }
          return res.json({ reply: replyText, language });
        } catch (apiError: any) {
          console.error('Gemini API call failed, falling back to curated curriculum logic:', apiError?.message);
          geminiTemporarilyDisabled = true;
          lastFailureTime = Date.now();
        }
      }

      const reply = getCuratedCoachAdvice(message, language, beltLevel);
      return res.json({ reply, language, isFallback: true });
    } catch (err: any) {
      console.error('Coach chat handler error:', err);
      return res.status(500).json({ error: 'Failed to process coach advice', details: err?.message });
    }
  });

  // Route: Terminology lookup & pronunciation guide
  app.post('/api/coach/terminology', async (req, res) => {
    try {
      const { term, language = 'English' } = req.body;
      if (!term) {
        return res.status(400).json({ error: 'Term is required' });
      }

      if (ai) {
        try {
          const prompt = `Explain the Taekwondo term "${term}". Provide response in JSON format with fields:
- koreanHangul (string)
- romanized (string)
- englishMeaning (string)
- technicalExecution (string, concise coaching tip)
- urduExplanation (string, in Urdu script)
- arabicExplanation (string, in Arabic script)
- category (one of: Stance, Block, Strike, Kick, Command, Poomsae, Referee)`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              systemInstruction: 'You are a certified Kukkiwon Taekwondo terminologist. Return precise JSON.',
            },
          });

          if (response.text) {
            const parsed = JSON.parse(response.text);
            return res.json(parsed);
          }
        } catch (e) {
          console.warn('Terminology API call error:', e);
        }
      }

      // Fallback terminology
      return res.json({
        koreanHangul: '태권도',
        romanized: 'Taekwondo',
        englishMeaning: 'The Way of the Foot and the Fist',
        technicalExecution: 'Synchronize breathing, core tension, and proper striking tool alignment.',
        urduExplanation: 'پاؤں اور مٹھی کے ذریعے مارشل آرٹ کا طریقہ اور روحانی نظم و ضبط۔',
        arabicExplanation: 'طريقة القدم والقبضة، الفن القتالي الكوري التقليدي للدفاع عن النفس.',
        category: 'General'
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'PTF & World Strikers AI Taekwondo Master Coach',
      geminiConfigured: isValidApiKey,
      timestamp: new Date().toISOString()
    });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Master Coach Applet active on port ${PORT}`);
  });
}

startServer();
