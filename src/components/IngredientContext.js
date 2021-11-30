import React, {createContext} from 'react';

const IngredientContext = createContext({
    items: [],
    setItems: () => {},
});

export default IngredientContext;
