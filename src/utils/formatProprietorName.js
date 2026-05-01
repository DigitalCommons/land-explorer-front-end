const isInitialism = (word) => /^([A-Z]\.)+$/.test(word);

const ACRONYMS = new Set(["GB", "HM", "LTD", "MOD", "NHS", "PLC", "RC", "UK"]);

const SMALL_WORDS = new Set([
  "and",
  "of",
  "the",
  "in",
  "for",
  "to",
  "on",
  "at",
  "by",
]);

const capitaliseCompoundWord = (word) => {
  return word
    .replace(/(^[a-z])|([-'(][a-z])/g, (match) => match.toUpperCase())
    .replace(/'S\b/g, "'s");
};

const formatProprietorName = (name = "") => {
  if (!name) return "";
  const trimmed = name.trim();
  const looksAllCaps = trimmed === trimmed.toUpperCase();
  if (!looksAllCaps) {
    return trimmed;
  }
  return trimmed
    .split(/\s+/)
    .map((originalWord, index) => {
      const upperWord = originalWord.toUpperCase();
      const lowerWord = originalWord.toLowerCase();
      if (ACRONYMS.has(upperWord) || isInitialism(upperWord)) {
        return upperWord;
      }
      if (index > 0 && SMALL_WORDS.has(lowerWord)) {
        return lowerWord;
      }
      return capitaliseCompoundWord(lowerWord);
    })
    .join(" ");
};

export default formatProprietorName;
