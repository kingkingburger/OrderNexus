import { createStore } from "redux";

// 액션 타입과 액션 생성자 정의
const ADD_TODO = "ADD_TODO";
type AddTodoAction = { type: typeof ADD_TODO; text: string };
function addTodo(text: string): AddTodoAction {
  return { type: ADD_TODO, text };
}

// 초기 상태와 리듀서 정의
type State = { todos: string[] };
const initialState: State = { todos: [] };
type Action = AddTodoAction;
function todoApp(state = initialState, action: Action): State {
  switch (action.type) {
    case ADD_TODO:
      return { todos: [...state.todos, action.text] };
    default:
      return state;
  }
}

// 스토어 생성
const store = createStore(todoApp);
