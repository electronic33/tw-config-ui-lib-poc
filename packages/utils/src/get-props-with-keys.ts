export const getPropsWithKeys = <MustBeOneOf extends string>(
  props: Record<string, any>,
  keys: MustBeOneOf[],
) => {
  const propsWithInputKeys = {} as Record<MustBeOneOf, any>;

  keys.forEach((key) => {
    propsWithInputKeys[key] = props[key];
  });

  return propsWithInputKeys;
};
