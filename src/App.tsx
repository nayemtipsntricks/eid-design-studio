import React, { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Check, Share2, Heart, Moon, Star, Layout, Palette, Type as TypeIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Type } from "@google/genai";

// --- Types ---

interface DesignVariation {
  id: string;
  styleName: string;
  wishingMessage: string;
  designPrompt: string;
  styleDescription: string;
}

interface VariationCardProps {
  variation: DesignVariation;
  index: number;
  key?: string | number;
}

// --- Constants ---

const GEMINI_MODEL = "gemini-3-flash-preview";

// --- Components ---

const Header = () => (
  <header className="py-24 text-center relative overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10"
    >
      <div className="flex justify-center mb-10">
        <div className="relative group">
          <Moon className="text-[#c5a059] w-20 h-20 fill-[#c5a059]/5 transition-transform duration-1000 group-hover:rotate-12" />
          <Star className="absolute -top-2 -right-2 text-[#c5a059] w-8 h-8 animate-pulse" />
        </div>
      </div>
      <h1 className="text-6xl md:text-8xl font-serif font-light text-[#1a1a1a] mb-8 tracking-tighter">
        Eid <span className="italic font-normal gold-text">Design</span> Studio
      </h1>
      <div className="h-px w-32 bg-[#c5a059]/20 mx-auto mb-10" />
      <div className="max-w-3xl mx-auto px-6 space-y-4">
        <p className="text-2xl md:text-3xl text-[#1a1a1a]/80 font-serif italic font-light leading-tight">
          A lavish, brand design-inspired AI prompt for your Eid wishes.
        </p>
        <p className="text-xs uppercase tracking-[0.4em] text-[#c5a059] font-bold opacity-60">
          Luxury branded AI prompt for your Eid greetings
        </p>
      </div>
    </motion.div>
    
    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[800px] h-[800px] border border-[#1a1a1a] rounded-full" />
      <div className="absolute -bottom-60 -right-60 w-[1000px] h-[1000px] border border-[#c5a059] rounded-full" />
    </div>
  </header>
);

const VariationCard = ({ variation, index }: VariationCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(variation.designPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
      className="glass-card rounded-none p-10 flex flex-col h-full hover:shadow-2xl transition-all duration-700 luxury-border group relative overflow-hidden"
    >
      <div className="shimmer-effect absolute inset-0 pointer-events-none" />
      
      <div className="flex justify-between items-start mb-12">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.4em] mb-2">
            Collection
          </span>
          <h3 className="text-2xl font-serif font-light text-[#1a1a1a] tracking-tight">
            {variation.styleName}
          </h3>
        </div>
        <div className="flex gap-4">
          <button className="p-2 hover:bg-[#f5f2ed] rounded-full transition-colors text-[#1a1a1a]/20 hover:text-[#c5a059]">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-[#f5f2ed] rounded-full transition-colors text-[#1a1a1a]/20 hover:text-[#c5a059]">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-[#c5a059]/40" />
          <h4 className="text-[9px] font-bold text-[#1a1a1a]/30 uppercase tracking-[0.3em]">The Message</h4>
        </div>
        <p className="text-2xl text-[#1a1a1a] leading-tight font-serif italic font-light">
          {variation.wishingMessage}
        </p>
      </div>

      <div className="mb-12 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#c5a059]/40" />
            <h4 className="text-[9px] font-bold text-[#1a1a1a]/30 uppercase tracking-[0.3em]">Design Blueprint</h4>
          </div>
          <button 
            onClick={copyToClipboard}
            className={`flex items-center gap-2 px-4 py-2 rounded-none text-[10px] font-black tracking-widest transition-all duration-500
              ${copied ? 'bg-[#c5a059] text-white' : 'bg-[#1a1a1a] text-white hover:bg-[#c5a059]'}`}
          >
            {copied ? (
              <><Check className="w-3.5 h-3.5" /> COPIED</>
            ) : (
              <><Copy className="w-3.5 h-3.5" /> COPY PROMPT</>
            )}
          </button>
        </div>
        <div className="bg-[#fcfaf7] p-8 text-xs text-[#1a1a1a]/70 font-serif italic leading-relaxed border border-[#1a1a1a]/5 relative group-hover:border-[#c5a059]/20 transition-colors">
          {variation.designPrompt}
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Sparkles className="w-8 h-8 text-[#c5a059]" />
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-[#1a1a1a]/5">
        <h4 className="text-[9px] font-bold text-[#1a1a1a]/30 uppercase tracking-[0.3em] mb-3">Brand Aesthetic</h4>
        <p className="text-xs text-[#c5a059] font-medium tracking-wide uppercase">
          {variation.styleDescription}
        </p>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState<DesignVariation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'English' | 'Bengali'>('English');
  const [imageRatio, setImageRatio] = useState<'1:1' | '9:16' | '16:9' | '4:3'>('1:1');
  const [outfitCategory, setOutfitCategory] = useState<string>('Traditional');
  const [outfitSubOption, setOutfitSubOption] = useState<string>('Panjabi (Classic)');

  const outfitOptions: Record<string, string[]> = {
    'Traditional': [
      'Panjabi (Classic)', 'Panjabi (Embroidered)', 'Panjabi + Waistcoat', 
      'Fatua', 'Kurta', 'Sherwani', 'Jubba / Islamic Robe', 'Thobe (Arabic)'
    ],
    'Casual': ['T-shirt', 'Polo Shirt', 'Casual Shirt', 'Denim Style', 'Smart Casual'],
    'Formal': ['Blazer', 'Suit (Full)', 'Shirt + Tie', 'Corporate Look'],
    'Female': ['Saree', 'Salwar Kameez', 'Lehenga', 'Abaya', 'Hijab Style', 'Modern Fusion']
  };

  const generatePrompts = async () => {
    setLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const prompt = `
        You are an AI-powered Eid Greeting Card & Design Prompt Generator, specializing in high-end, luxury brand aesthetics.
        Generate 3 unique, highly detailed, and professional AI image generation prompts that feel like premium brand advertisements.
        
        USER PREFERENCES:
        - Language: ${language} (The wishing message and the text content within the design prompt MUST be in ${language}).
        - Image Aspect Ratio: ${imageRatio} (Incorporate this ratio requirement into the technical part of the prompt).
        - Selected Outfit: ${outfitCategory} - ${outfitSubOption}

        OUTFIT APPLICATION RULES:
        - The outfit must strictly follow the selection: ${outfitCategory} (${outfitSubOption}).
        - Apply this outfit to the person in the image while preserving their full identity.
        - CRITICAL: Do not change the person's identity, face, skin tone, facial structure, hairline, or beard.
        - The outfit should be realistic, proportional, and have natural fabric behavior/lighting.
        - Match the outfit with the festive Eid theme (e.g., using colors like green, gold, white, or black-gold).

        BRAND AESTHETICS TO EXPLORE:
        - "Royal Heritage": Inspired by Mughal architecture, deep velvets, heavy gold embroidery, and palatial settings.
        - "Minimalist Luxury": Clean lines, high-fashion photography style, soft neutral palettes (cream, beige, champagne), and subtle gold accents.
        - "Midnight Elegance": Deep navy and silver, celestial themes, glowing crescent moons, and ethereal lighting.
        - "Artisanal Premium": Hand-crafted textures, premium silk, intricate patterns, and warm, intimate lighting.

        PROMPT REQUIREMENTS:
        - Each prompt must be extremely detailed (200-300 words).
        - Describe a "Branded" layout: Professional composition, high-fashion lighting, and premium textures.
        - RAMADAN & EID INTEGRATION: Incorporate spiritual elements like the crescent moon, ornate lanterns, and the serene atmosphere of Eid.
        - CONTENT INTEGRATION: The prompt MUST include instructions to render specific, beautiful wishing content in the design.
        - TEXT CONTENT: Create varied, poetic, and heartfelt wishing messages in ${language}.
        - The prompt should specify that the text is elegantly integrated into the design (e.g., "The calligraphy '...' is embossed in gold foil on a silk background").
        - Technical Specs: Mention the aspect ratio ${imageRatio} clearly at the end of the prompt.

        For each variation, provide:
        1. styleName: A creative name for the luxury brand style (in English).
        2. wishingMessage: The creative wishing message in ${language}.
        3. designPrompt: The detailed AI image generation prompt in English, but the text content to be rendered within the image MUST be in ${language}.
        4. styleDescription: A short description of the brand mood and intended audience (in English).

        Return the output as a JSON array of objects.
      `;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                styleName: { type: Type.STRING },
                wishingMessage: { type: Type.STRING },
                designPrompt: { type: Type.STRING },
                styleDescription: { type: Type.STRING }
              },
              required: ["styleName", "wishingMessage", "designPrompt", "styleDescription"]
            }
          }
        }
      });

      const data = JSON.parse(response.text || "[]");
      setVariations(data.map((v: any, i: number) => ({ ...v, id: `${Date.now()}-${i}` })));
    } catch (err) {
      console.error(err);
      setError("Failed to generate prompts. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen festive-gradient pb-32">
      <Header />

      <main className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mb-12">
            {/* Language Selection */}
            <div className="flex flex-col space-y-3">
              <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.4em] ml-1">
                Language
              </label>
              <div className="relative group">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="w-full bg-white/50 backdrop-blur-sm border border-[#c5a059]/20 p-4 rounded-none appearance-none font-serif italic text-[#1a1a1a] focus:outline-none focus:border-[#c5a059] transition-all cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Bengali">Bengali</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#c5a059]">
                  <TypeIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Ratio Selection */}
            <div className="flex flex-col space-y-3">
              <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.4em] ml-1">
                Aspect Ratio
              </label>
              <div className="relative group">
                <select 
                  value={imageRatio}
                  onChange={(e) => setImageRatio(e.target.value as any)}
                  className="w-full bg-white/50 backdrop-blur-sm border border-[#c5a059]/20 p-4 rounded-none appearance-none font-serif italic text-[#1a1a1a] focus:outline-none focus:border-[#c5a059] transition-all cursor-pointer"
                >
                  <option value="1:1">Square (1:1)</option>
                  <option value="9:16">Portrait (9:16)</option>
                  <option value="16:9">Landscape (16:9)</option>
                  <option value="4:3">Classic (4:3)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#c5a059]">
                  <Layout className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Outfit Category Selection */}
            <div className="flex flex-col space-y-3">
              <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.4em] ml-1">
                Outfit Category
              </label>
              <div className="relative group">
                <select 
                  value={outfitCategory}
                  onChange={(e) => {
                    const cat = e.target.value;
                    setOutfitCategory(cat);
                    setOutfitSubOption(outfitOptions[cat][0]);
                  }}
                  className="w-full bg-white/50 backdrop-blur-sm border border-[#c5a059]/20 p-4 rounded-none appearance-none font-serif italic text-[#1a1a1a] focus:outline-none focus:border-[#c5a059] transition-all cursor-pointer"
                >
                  {Object.keys(outfitOptions).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#c5a059]">
                  <Palette className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Outfit Sub-option Selection */}
            <div className="flex flex-col space-y-3">
              <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.4em] ml-1">
                Specific Outfit
              </label>
              <div className="relative group">
                <select 
                  value={outfitSubOption}
                  onChange={(e) => setOutfitSubOption(e.target.value)}
                  className="w-full bg-white/50 backdrop-blur-sm border border-[#c5a059]/20 p-4 rounded-none appearance-none font-serif italic text-[#1a1a1a] focus:outline-none focus:border-[#c5a059] transition-all cursor-pointer"
                >
                  {outfitOptions[outfitCategory].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#c5a059]">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#c5a059' }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            onClick={generatePrompts}
            className={`px-10 py-5 rounded-none font-bold text-sm flex items-center gap-4 transition-all shadow-xl uppercase tracking-[0.3em]
              ${loading 
                ? 'bg-[#f5f2ed] text-[#c5a059]/30 cursor-not-allowed border border-[#c5a059]/10' 
                : 'bg-[#1a1a1a] text-white shadow-xl'}`}
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Design Prompts
              </>
            )}
          </motion.button>
          
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 mt-6 font-bold bg-red-50 px-6 py-2 rounded-full border border-red-100"
            >
              {error}
            </motion.p>
          )}
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-8"
            >
              <div className="relative">
                <div className="w-32 h-32 border-8 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                <Moon className="absolute inset-0 m-auto w-10 h-10 text-emerald-600 animate-pulse" />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-serif font-light text-[#1a1a1a] mb-2 tracking-tight italic">Curating Luxury...</h3>
                <p className="text-sm text-[#1a1a1a]/40 uppercase tracking-widest">Designing your bespoke prompts</p>
              </div>
            </motion.div>
          ) : variations.length > 0 ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {variations.map((v, i) => (
                <VariationCard key={v.id} variation={v} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-none p-20 text-center flex flex-col items-center justify-center max-w-4xl mx-auto luxury-border"
            >
              <div className="w-16 h-16 bg-[#f5f2ed] rounded-full flex items-center justify-center mb-8">
                <Sparkles className="w-8 h-8 text-[#c5a059]/30" />
              </div>
              <h3 className="text-4xl font-serif font-light text-[#1a1a1a] mb-4 tracking-tight">The Art of Eid</h3>
              <p className="text-lg text-[#1a1a1a]/40 max-w-xl mx-auto leading-relaxed font-light italic">
                Bespoke AI prompts that transform your greetings into high-end brand masterpieces.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-48 border-t border-[#1a1a1a]/5 pt-20 pb-16 text-center">
        <div className="flex justify-center gap-10 mb-10 opacity-10">
          <Moon className="w-5 h-5 text-[#1a1a1a]" />
          <div className="h-5 w-px bg-[#1a1a1a]" />
          <Star className="w-5 h-5 text-[#1a1a1a]" />
          <div className="h-5 w-px bg-[#1a1a1a]" />
          <Moon className="w-5 h-5 text-[#1a1a1a]" />
        </div>
        <p className="text-[#1a1a1a] text-[9px] font-black tracking-[0.4em] uppercase">
          Eid Design Studio — Created by Nayem Hossain (Contentpreneur).
        </p>
      </footer>
    </div>
  );
}
