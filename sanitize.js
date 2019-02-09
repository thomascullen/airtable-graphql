// Converts table and column names into camelCase and PascalCase strings for
// use inside GraphQL.
const pluralize = require("pluralize");
const camelCase = require("camelcase");

const clean = string => {
  return string.replace(/\W/g, "");
};

const pascalCase = string => {
  return camelCase(string, { pascalCase: true });
};

const singular = string => {
  return pluralize.singular(string);
}

const plural = string => {
  return pluralize(string)
}

const toType = string => {
  return singular(pascalCase(clean(string)));
};

const toField = string => {
  return camelCase(clean(string))
}

module.exports = { toType, toField, plural, singular };
