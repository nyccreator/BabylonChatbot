import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const model = import.meta.env.VITE_OPENAI_MODEL || "gpt-5-nano";
const instructions = import.meta.env.VITE_INSTRUCTIONS || "";

export const createOpenAI = () => {
  if (!apiKey) return null;
  return new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
};

export const validateApiKey = async (openai) => {
  await openai.models.list();
};

export const getModel = () => model;
export const getInstructions = () => instructions;
