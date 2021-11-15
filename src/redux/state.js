import { renderEntireTree } from "../render";

export const state = {
  profilePage: {
    posts: [
      {
        id: 0,
        message:
          "Numquam officia sint. Ut molestias eligendi. Rerum vero vero dolor optio dolorum qui vero mollitia quae. Molestias ducimus repellat quo eos. In voluptatibus nobis expedita adipisci reiciendis quibusdam aliquid quod. Vero quia vel quas quam quos reprehenderit.",
      },
      {
        id: 1,
        message: "Lorem ipsum dolor sit adipisicing elit. Molestiae, quos!",
      },
      {
        id: 2,
        message: "Lorem ipsum dolor sit amet, consectetur, quos!",
      },
      {
        id: 3,
        message: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        id: 4,
        message:
          "Lorem  dolor sit amet, consectetur adipisicing elit. Molestiae, quos!",
      },
    ],
    newPostMessage: "Artyom is Juniour developer",
  },
  dialogsPage: {
    messages: [
      {
        id: 1,
        message: "Lorem ipsum dolor sit adipisicing elit. Molestiae, quos!",
      },
      {
        id: 2,
        message: "Lorem ipsum dolor sit amet, consectetur, quos!",
      },
      {
        id: 3,
        message: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        id: 4,
        message:
          "Lorem  dolor sit amet, consectetur adipisicing elit. Molestiae, quos!",
      },
      {
        id: 5,
        message: "Ipsam et asperiores et occaecati vero.",
      },
      {
        id: 6,
        message: "eum amet et",
      },
    ],
    dialogs: [
      {
        id: 1,
        name: "Ora",
      },
      {
        id: 2,
        name: "Tyshawn",
      },
      {
        id: 3,
        name: "Janick",
      },
      {
        id: 4,
        name: "General",
      },
      {
        id: 5,
        name: "Raleigh",
      },
      {
        id: 6,
        name: "Arno",
      },
      {
        id: 7,
        name: "Roy",
      },
      {
        id: 8,
        name: "Emilie",
      },
    ],
  },
  sidebar: {
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
  },
};

window.profilePage = state.profilePage;

export const addPost = () => {
  state.profilePage.posts.push({
    id: Date.now(),
    message: state.profilePage.newPostMessage,
  });
  renderEntireTree(state);
  state.profilePage.newPostMessage = "";
};

export const onPostChange = (newMessage) => {
  state.profilePage.newPostMessage = newMessage;
  renderEntireTree(state);
};
