import { AnyAction } from "redux";

interface SidebarState {
  friends: {name: string, avatar: string, id: number}[]
}

const initialState: SidebarState = {
  friends: [
    {
      name: "Kelsi",
      avatar:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
      id: 0,
    },
    {
      name: "Gilbert",
      avatar:
        "https://media.istockphoto.com/photos/laughter-man-picture-id649754038?k=20&m=649754038&s=170667a&w=0&h=jcI4V4TUmW9OLy-tCB33o79PyMJ9mvFcPIeD0S7E_OQ=",
      id: 1,
    },
    {
      name: "Joaquin",
      avatar:
        "https://image.shutterstock.com/image-photo/portrait-casually-dressed-young-businessman-260nw-505890028.jpg",
      id: 2,
    },
  ],
};

export const sidebarReducer = (state = initialState, action: AnyAction): SidebarState => {
  return state;
};
