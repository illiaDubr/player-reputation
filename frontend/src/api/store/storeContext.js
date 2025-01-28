import React from 'react';
import Store from "./store.js";

const store = new Store();
export const Context = React.createContext({ store });