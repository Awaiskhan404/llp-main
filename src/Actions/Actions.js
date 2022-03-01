export const SET_SECTION = (Action, data) => {
  window.localStorage.setItem(Action, JSON.stringify(data));
  return "Done";
};

export const GET_SECTION = (Action) => {
  let data = window.localStorage.getItem(Action);
  return JSON.parse(data);
};
