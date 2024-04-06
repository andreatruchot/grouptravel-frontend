// middlewares/ignoreWarnings.js

const ignoredActions = ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'];

export const ignoreWarnings = (getDefault) => getDefault({
  serializableCheck: {
    ignoredActions: ignoredActions,
  },
});
