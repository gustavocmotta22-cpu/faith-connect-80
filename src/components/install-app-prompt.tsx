import { useEffect, useState } from "react";
import { Download, Share2, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator && Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone));
}

export function InstallAppPrompt() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) return;

    const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIos) {
      const timer = window.setTimeout(() => {
        setShowIosHelp(true);
        setVisible(true);
      }, 1200);
      return () => window.clearTimeout(timer);
    }

    const handlePrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () => window.removeEventListener("beforeinstallprompt", handlePrompt);
  }, []);

  async function install() {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === "accepted") setVisible(false);
    setInstallEvent(null);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end bg-foreground/35 p-4 sm:items-center sm:justify-center" role="dialog" aria-modal="true" aria-labelledby="install-title">
      <section className="relative w-full max-w-md rounded-3xl border bg-card p-5 shadow-pastoral">
        <Button variant="ghost" size="icon" className="absolute right-3 top-3 rounded-full" onClick={() => setVisible(false)} aria-label="Fechar convite de instalação">
          <X />
        </Button>
        <div className="flex items-center gap-4 pr-9">
          <img src="/icons/app-icon-192.png" alt="Ícone da Igreja Presbiteriana Filadélfia" className="size-20 rounded-2xl border object-cover shadow-sm" />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-primary">Filadélfia Conecta</p>
            <h2 id="install-title" className="mt-1 font-display text-2xl font-bold">Salve o aplicativo no celular</h2>
          </div>
        </div>
        {showIosHelp ? (
          <div className="mt-5 rounded-2xl bg-secondary p-4 text-base leading-7 text-secondary-foreground">
            <p className="flex items-center gap-2 font-bold"><Share2 className="size-5" /> No iPhone ou iPad</p>
            <p className="mt-2">Toque em <strong>Compartilhar</strong> no navegador e depois em <strong>Adicionar à Tela de Início</strong>.</p>
          </div>
        ) : (
          <Button size="touch" className="mt-5 w-full text-base" onClick={install}>
            <Download className="size-5" /> Instalar aplicativo
          </Button>
        )}
        <p className="mt-4 text-center text-sm leading-5 text-muted-foreground">O ícone da igreja ficará na tela inicial, como os outros aplicativos.</p>
      </section>
    </div>
  );
}