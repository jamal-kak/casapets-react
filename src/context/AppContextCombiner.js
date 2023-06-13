export const AppContextCombiner = (...contexts) => {
  return contexts.reduce(
    (AccumulatedContexts, CurrentContext) => {
      return ({ children }) => {
        return (
          <AccumulatedContexts>
            <CurrentContext>{children}</CurrentContext>
          </AccumulatedContexts>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};
