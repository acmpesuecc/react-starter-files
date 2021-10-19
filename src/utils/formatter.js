import prettier from "prettier";

export const prettify = str => prettier.format(str, { parser: 'babel' });
