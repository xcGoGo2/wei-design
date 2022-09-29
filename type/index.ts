export interface menuListType {
  title: string;
  icon: string;
  router: string;
  children?: menuListType[]
}

export type reponseType = {
  code: 200;
  message: 'ok';
  data: any | menuListType[];
}