const storageKey = "hpf-site-language";
const supported = ["zh", "en", "ru"];

const normalize = (lang: string | null) => lang && supported.includes(lang) ? lang : "zh";

const readLanguage = () => {
  try {
    return normalize(window.localStorage.getItem(storageKey) || window.localStorage.getItem("language") || "zh");
  } catch {
    return "zh";
  }
};

const writeLanguage = (lang: string) => {
  try {
    window.localStorage.setItem(storageKey, lang);
    window.localStorage.setItem("language", lang);
  } catch {
    // Storage is optional; the active page can still switch language.
  }
};

export const setSiteLanguage = (lang: string) => {
  const active = normalize(lang);
  document.documentElement.lang = active === "zh" ? "zh-CN" : active;
  document.querySelectorAll<HTMLElement>("[data-lang-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.langPanel === active);
  });
  document.querySelectorAll<HTMLElement>("[data-lang-button]").forEach((button) => {
    button.classList.toggle("active", button.dataset.langButton === active);
  });
  document.querySelectorAll<HTMLElement>("[data-label-zh]").forEach((node) => {
    const value = node.getAttribute(`data-label-${active}`);
    if (value) node.textContent = value;
  });
  writeLanguage(active);
};

setSiteLanguage(readLanguage());

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const button = target.closest<HTMLElement>("[data-lang-button]");
  if (button) setSiteLanguage(button.dataset.langButton || "zh");
});
