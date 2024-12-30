import { setupSmartSuggestInput } from "./smart-suggest-input";
import "./style.css";
import { suggestions } from "./suggestions";

const smartSuggestInput = setupSmartSuggestInput(suggestions);

document.body.append(smartSuggestInput);
