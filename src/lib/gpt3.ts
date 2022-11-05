import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-rxMbvlmCJABLuH65j4GwtVJv",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function askGPT3(prompt: string): Promise<number> {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt:
      "Evaluate the statement arithmetically, return only a number:\n\n" +
      prompt,
  });

  return Number(completion.data?.choices[0]?.text);
}
