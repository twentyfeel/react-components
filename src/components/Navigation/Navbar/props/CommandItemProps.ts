export type CommandItemProps = {
  id: string;
  label: string;
  onSelect?: (id: string | undefined, label: string | undefined) => void;
};
