// The standard PDF.js build assumes brand-new JavaScript APIs such as
// Map#getOrInsertComputed. The legacy build includes the required polyfills for
// Firefox ESR, older mobile browsers, and embedded WebViews.
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import workerUrl from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = workerUrl;

function copyBytes(bytes) {
  return bytes.slice(0);
}

function pageWidth(container) {
  const styles = window.getComputedStyle?.(container);
  const left = Number.parseFloat(styles?.paddingLeft) || 0;
  const right = Number.parseFloat(styles?.paddingRight) || 0;
  return Math.max(280, Math.floor(container.clientWidth - left - right));
}

function replaceContent(container, content) {
  if (typeof container.replaceChildren === "function") {
    container.replaceChildren(...(content ? [content] : []));
    return;
  }
  while (container.firstChild) container.removeChild(container.firstChild);
  if (content) container.appendChild(content);
}

export function createPdfPreview(container) {
  let source = null;
  let fallbackUrl = "";
  let lastWidth = 0;
  let token = 0;
  let timer = 0;
  let watching = false;

  const revokeFallback = () => {
    if (!fallbackUrl) return;
    URL.revokeObjectURL(fallbackUrl);
    fallbackUrl = "";
  };

  const showNativeFallback = (bytes, id) => {
    if (id !== token) return;
    revokeFallback();
    fallbackUrl = URL.createObjectURL(new Blob([copyBytes(bytes)], { type: "application/pdf" }));
    const frame = document.createElement("iframe");
    frame.className = "preview-native";
    frame.title = "PDF document preview";
    frame.src = fallbackUrl;
    replaceContent(container, frame);
  };

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
      if (!context) throw new Error("Canvas rendering is unavailable.");
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
    revokeFallback();
    replaceContent(container, fragment);
  }

  const onResize = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      draw().catch(() => {});
    }, 180);
  };
  const observer = typeof ResizeObserver === "function"
    ? new ResizeObserver(onResize)
    : null;

  return {
    async show(bytes) {
      source = copyBytes(bytes);
      lastWidth = 0;
      try {
        await draw();
      } catch {
        // A browser-native PDF frame is a reliable last resort when canvas,
        // workers, or a PDF.js feature are unavailable on the device.
        showNativeFallback(source, token);
      }
      if (!watching) {
        if (observer) observer.observe(container);
        else window.addEventListener("resize", onResize, { passive: true });
        watching = true;
      }
    },
    clear() {
      token += 1;
      window.clearTimeout(timer);
      try {
        observer?.disconnect();
      } catch {
        /* already disconnected */
      }
      window.removeEventListener("resize", onResize);
      watching = false;
      source = null;
      lastWidth = 0;
      revokeFallback();
      replaceContent(container);
    },
  };
}
