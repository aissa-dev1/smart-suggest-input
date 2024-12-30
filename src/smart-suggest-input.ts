type InputOptions = Partial<{
  type: string;
  placeholder: string;
}>;

function createInput(options?: InputOptions): HTMLInputElement {
  const input = document.createElement("input");

  if (typeof options !== "undefined") {
    if ("type" in options && typeof options.type === "string") {
      input.type = options.type;
    }
    if ("placeholder" in options && typeof options.placeholder === "string") {
      input.placeholder = options.placeholder;
    }
  }

  return input;
}

function createSuggestionsList(): HTMLDivElement {
  const list = document.createElement("div");

  list.classList.add("suggestions_list", "hidden");

  return list;
}

function createSuggestionItem(text: string): HTMLDivElement {
  const item = document.createElement("div");

  item.classList.add("suggestion_item");
  item.textContent = text;

  return item;
}

export function setupSmartSuggestInput(suggestions: string[]): HTMLDivElement {
  const container = document.createElement("div");
  const input = createInput({
    placeholder: "Type something...",
  });
  const suggestionsList = createSuggestionsList();

  container.classList.add("smart_suggest_input_container");

  input.addEventListener("input", () => {
    if (input.value === "") {
      suggestionsList.textContent = "";
      suggestionsList.classList.add("hidden");
      return;
    }

    const filteredSuggestions = suggestions.filter((s) =>
      s.toLowerCase().startsWith(input.value.toLowerCase())
    );

    if (filteredSuggestions.length <= 0) {
      suggestionsList.textContent = "";
      suggestionsList.classList.add("hidden");
      return;
    }

    suggestionsList.textContent = "";
    suggestionsList.classList.remove("hidden");
    for (const suggestion of filteredSuggestions) {
      const suggestionItem = createSuggestionItem(suggestion);

      suggestionItem.addEventListener("click", () => {
        input.value = suggestion;
        suggestionsList.classList.add("hidden");
        input.focus();
      });

      suggestionsList.appendChild(suggestionItem);
    }
  });

  container.append(input, suggestionsList);

  return container;
}
