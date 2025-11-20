export type DocItem = DocFolder | DocFile;

export interface DocFolder {
  isFolder: true;
  name: string;
  path?: string;
  expanded: Ref<boolean, boolean>;
  children: Array<DocFolder | DocFile>;
};

export interface DocFile {
  isFolder: false;
  name: string;
  path: string;
}