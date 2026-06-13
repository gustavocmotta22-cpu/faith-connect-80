import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
function createLovableAiGatewayProvider(lovableApiKey) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": lovableApiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk"
    }
  });
}
export {
  createLovableAiGatewayProvider
};
