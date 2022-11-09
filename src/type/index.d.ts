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

export interface stateType {
  count: Number;
  loginContent: {
    [propName: string]: any;
  }
  menuList: menuListType[]
}

export interface assemblyType {
  img: string;
  title: string;
  content: string;
  time: string;
}