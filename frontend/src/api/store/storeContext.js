import React, { createContext } from 'react';
import Store from "./store.js";

const store = new Store();
export const Context = createContext({ store });