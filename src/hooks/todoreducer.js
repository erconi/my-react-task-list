
import produce from "immer";

export const todoReducer = (initialState, action) =>
  produce(initialState, (draft) => {
    switch (action.type) {
      case "Add Todo":
        draft.push(action.payload);
        break;

      case "Delete Todo":
        return draft.filter((todo) => todo.id !== action.payload);

      case "Complete Todo":
        const todoToComplete = draft.find((todo) => todo.id === action.payload);
        if (todoToComplete) {
          todoToComplete.done = !todoToComplete.done;
        }
        break;

      case "Update Todo":
        const todoToUpdate = draft.find((todo) => todo.id === action.payload.id);
        if (todoToUpdate) {
          todoToUpdate.description = action.payload.description;
        }
        break;

      default:
        break;
    }
  });
