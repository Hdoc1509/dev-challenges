import { getElementById, getElementBySelector } from "@lib/dom";
import { DEFAULT_WORDS } from "@/consts";

const $wordList = getElementBySelector(".word-list", HTMLUListElement);

const $wordItemTemplate = getElementById(
  "word-item-template",
  HTMLTemplateElement,
);

const $fragment = document.createDocumentFragment();

const lastWord = DEFAULT_WORDS[DEFAULT_WORDS.length - 1];

export function generateWordList() {
  for (const word of DEFAULT_WORDS) {
    const $wordItemClone = /** @type {DocumentFragment} */ (
      $wordItemTemplate.content.cloneNode(true)
    );
    const $item = getElementBySelector(
      ".word-list__item[data-word]",
      HTMLLIElement,
      $wordItemClone,
    );
    const $word = getElementBySelector(
      ".word-list__word",
      HTMLSpanElement,
      $item,
    );
    const $editWord = getElementBySelector(
      ".word-list__action[data-edit]",
      HTMLButtonElement,
      $item,
    );
    const $deleteWord = getElementBySelector(
      ".word-list__action[data-delete]",
      HTMLButtonElement,
      $item,
    );

    $item.dataset.word = word;
    $word.textContent = word;
    $editWord.dataset.edit = word;
    $editWord.ariaLabel = `Edit '${word}' word`;
    $deleteWord.dataset.delete = word;
    $deleteWord.ariaLabel = `Delete '${word}' word`;

    $fragment.appendChild($wordItemClone);

    if (word !== lastWord) {
      const $hr = document.createElement("hr");

      $hr.classList.add("word-list__separator");

      $fragment.appendChild($hr);
    }
  }

  $wordList.appendChild($fragment);
}
