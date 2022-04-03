import React, { ReactChild, ReactChildren, ReactElement } from "react";
import { render } from "@testing-library/react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { reducers } from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

//For React Test Library

const renderConnected = (ui: ReactElement) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  const Wrapper = ({ children }: { children: ReactChild | ReactChildren }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper: Wrapper });
};

export default renderConnected;
