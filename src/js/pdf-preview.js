import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = workerUrl;

function copyBytes(bytes) {
  return bytes.slice(0);
}

function pageWidth(container) {
  const styles = getComputedStyle(container);
  const pad = Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight);
  return Math.max(280, Math.floor(container.clientWidth - pad));
}

export function createPdfPreview(container) {
  let source = null;
  let lastWidth = 0;
  let token = 0;
  let timer = 0;
  let watching = false;

  async function draw() {
    if (!source) return;
    const width = pageWidth(container);
    if (!width) return;
    if (Math.abs(width - lastWidth) < 16 && container.childElementCount) return;

    const id = ++token;
    lastWidth = width;

    const loading = getDocument({
      data: copyBytes(source),
      disableAutoFetch: true,
      isEvalSupported: false,
      useSystemFonts: true,
    });
    const pdf = await loading.promise;
    if (id !== token) return;

    const fragment = document.createDocumentFragment();
    for (let n = 1; n <= pdf.numPages; n += 1) {
      if (id !== token) return;
      const page = await pdf.getPage(n);
      if (id !== token) return;
      const unscaled = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: width / unscaled.width });
      const ratio = Math.min(2.5, window.devicePixelRatio || 1);

      const article = document.createElement("article");
      article.className = "preview-page";
      article.setAttribute("aria-label", `Page ${n} of ${pdf.numPages}`);

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { alpha: false });
      canvas.width = Math.floor(viewport.width * ratio);
      canvas.height = Math.floor(viewport.height * ratio);
      canvas.style.width = "100%";
      canvas.style.height = "auto";

      await page.render({
        canvasContext: context,
        viewport,
        transform: ratio === 1 ? undefined : [ratio, 0, 0, ratio, 0, 0],
        background: "#ffffff",
      }).promise;
      if (id !== token) return;

      article.append(canvas);
      fragment.append(article);
      if (typeof page.cleanup === "function") page.cleanup();
    }

    if (id !== token) return;
    container.replaceChildren(fragment);
  }

  const observer = new ResizeObserver(() => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      draw().catch(() => {});
    }, 180);
  });

  return {
    async show(bytes) {
      source = bytes;
      lastWidth = 0;
      await draw();
      if (!watching) {
        observer.observe(container);
        watching = true;
      }
    },
    clear() {
      token += 1;
      window.clearTimeout(timer);
      try {
        observer.disconnect();
      } catch {
        /* already disconnected */
      }
      watching = false;
      source = null;
      lastWidth = 0;
      container.replaceChildren();
    },
  };
}
