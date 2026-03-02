export type DocItem = DocFolder | DocFile;

export interface DocFolder {
  isFolder: true;
  id: string;
  name: string;
  path?: string;
  expanded: Ref<boolean, boolean>;
  children: Array<DocFolder | DocFile>;
};

export interface DocFile {
  isFolder: false;
  id: string;
  name: string;
  path: string;
}