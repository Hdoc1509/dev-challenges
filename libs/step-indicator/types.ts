export type EventListener = {
  onStep?: (step: number) => void;
  onQuantity?: (quantity: number) => void;
};

export type SharedExtraParams = {
  name?: string;
  onStep?: EventListener["onStep"];
};

export type ExpectedElements = {
  $steps: NodeListOf<HTMLSpanElement>;
  $container: HTMLDivElement;
};
