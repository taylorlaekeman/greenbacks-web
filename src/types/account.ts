export interface Account {
  createdDate: string;
  id: string;
  institution: { name: string };
  isReauthenticationRequired: boolean;
  modifiedDate: string;
}
