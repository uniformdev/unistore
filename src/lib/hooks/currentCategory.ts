import { createContext } from 'react';

const CurrentCategoryContext = createContext<{ categoryName: string } | undefined>(undefined);

export default CurrentCategoryContext;
