interface Post {
  loading: boolean;
  title?: string;
  error: boolean;
}

interface FetchStart {
  type: "fetch_start";
}
interface FetchSuccess {
  type: "fetch_success";
  title: string;
}
interface FetchError {
  type: "fetch_error";
}

type Action = FetchStart | FetchSuccess | FetchError;

export const INITIAL_POST = { loading: false, title: undefined, error: false };

export const postReducer = (state: Post, action: Action) => {
  switch (action.type) {
    case "fetch_start":
      return { loading: true, title: undefined, error: false };
    case "fetch_success":
      return { loading: false, title: action.title, error: false };
    case "fetch_error":
      return { loading: false, title: undefined, error: true };
  }
};