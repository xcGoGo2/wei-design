export interface menuListType {
  title: string;
  icon: string;
  router: string;
  children?: menuListType[];
}

export type tagType = {
  title: any;
  path: string;
  type: string;
};

export type reponseType = {
  code: 200;
  message: 'ok';
  data: any | menuListType[];
};

export interface userInfoType {
  username: string;
  avator: string;
}
