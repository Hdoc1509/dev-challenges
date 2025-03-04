import { currentWord } from "@/state/current-word";
import { $menuOpen } from "@/ui/menu";

export function handleShowDefinition() {
  // TODO: definitions state
  // - retrieve definition from localStorage
  // - save them in 'definitions' state
  // - add words and definitions to list

  // TODO: implement
  // - open menu
  // - set 'definition' tab as active (add 'definition' tab content in index.html)
  // - retrieve word definition from 'definitions' state
  // - if found, show definition
  // - else:
  //   - retrieve definition from /api/definition/<word>
  //   - show definition
  //   - add 'word' to 'definitions' state
  //   - save it to localStorage
  // - add current word as item list
  console.log(`definition for '${currentWord}'`);
  $menuOpen.click();
}
