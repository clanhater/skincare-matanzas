export const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD") // Descompone acentos (á -> a + ´)
    .replace(/[\u0300-\u036f]/g, ""); // Elimina los acentos
};

export const smartSearch = (text: string, query: string) => {
  const normalizedText = normalizeText(text);
  const normalizedQuery = normalizeText(query);

  // Dividimos la búsqueda en palabras individuales (ej: "gel", "frutal")
  const queryTerms = normalizedQuery.split(" ").filter(term => term.length > 0);

  // Verificamos que TODAS las palabras de la búsqueda estén en el texto
  return queryTerms.every(term => normalizedText.includes(term));
};