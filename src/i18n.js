import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import id from "./locales/id.json";

function loadLocaleMessages() {
  const locales = [{ en: en }, { id: id }];
  const messages = {};
  locales.forEach((lang) => {
    const key = Object.keys(lang);
    messages[key] = lang[key];
  });
  return messages;
}
const localeSaved = localStorage.getItem("locale");
export default createI18n({
  locale: localeSaved ? localeSaved : "en",
  fallbackLocale: "en",
  messages: loadLocaleMessages(),
});
