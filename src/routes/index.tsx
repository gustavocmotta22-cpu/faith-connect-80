import { createFileRoute } from "@tanstack/react-router";
import { FiladelfiaApp } from "@/components/filadelfia-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Filadélfia Conecta | Igreja Presbiteriana" },
      { name: "description", content: "Cultos, avisos, oração, sociedades e biblioteca da Igreja Presbiteriana Filadélfia em São Gonçalo." },
      { property: "og:title", content: "Filadélfia Conecta" },
      { property: "og:description", content: "A comunidade digital da Igreja Presbiteriana Filadélfia." },
    ],
  }),
  component: Index,
});

function Index() {
  return <FiladelfiaApp />;
}
