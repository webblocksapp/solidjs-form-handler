export type SetFieldValueOptions = {
  validate?: boolean;
  silentValidation?: boolean;
  touch?: boolean;
  dirty?: boolean;
  htmlElement?: HTMLElement;
  validateOn?: string[];
  mapValue?: (value: any) => any;
};
