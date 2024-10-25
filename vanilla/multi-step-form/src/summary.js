const $unsafeSummaryName = document.querySelector(
  ".summary-register__name",
);
if (!($unsafeSummaryName instanceof HTMLSpanElement))
  throw new Error(`missing '.summary-register__name' element`);
export const $summaryName = $unsafeSummaryName;

const $unsafeSummaryEmail = document.querySelector(
  ".summary-register__email",
);
if (!($unsafeSummaryEmail instanceof HTMLSpanElement))
  throw new Error(`missing '.summary-register__email' element`);
export const $summaryEmail = $unsafeSummaryEmail;

const $unsafeSummaryTopicsList = document.querySelector(
  ".summary-topics__list",
);
if (!($unsafeSummaryTopicsList instanceof HTMLUListElement))
  throw new Error(`missing '.summary-topics__list' element`);
export const $summaryTopicsList = $unsafeSummaryTopicsList;
