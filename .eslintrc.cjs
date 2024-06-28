module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "react-native", "@ts-gql"],
  root: true,
  rules: {
    "@ts-gql/ts-gql": "error",
    eqeqeq: "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: ["external", "builtin", "internal", ["parent", "sibling"]],
        pathGroups: [
          {
            pattern: "./**",
            group: "sibling",
            position: "after",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "react-native/no-inline-styles": 2,
    "react-native/no-single-element-style-arrays": 2,
    "prefer-const": "error",
    "no-console": [
      "error",
      {
        allow: ["error", "warn"],
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react-native",
            importNames: ["Text", "Button", "SafeAreaView"],
            message:
              "Please use the common component located in `src/components/common/`",
          },
          {
            name: "react-native",
            importNames: ["Modal"],
            message:
              "Please use the Modal Provider located in `src/providers/`",
          },
          {
            name: "@apollo/client",
            importNames: ["gql"],
            message: "Please import gql from `@ts-gql/tag`",
          },
          {
            name: "@apollo/client",
            importNames: ["useQuery", "useMutation"],
            message: "Please import useQuery/useMutation from useApollo.ts",
          },
          {
            name: "@apollo/client/core",
            importNames: ["gql"],
            message: "Please import gql from `@ts-gql/tag`",
          },
          {
            name: "react-native-gesture-handler",
            importNames: [
              "FlatList",
              "TouchableHighlight",
              "TouchableOpacity",
              "TouchableWithoutFeedback",
            ],
            message: "Please import from `react-native`",
          },
        ],
        patterns: [
          {
            group: ["**/components/common/MyModal"],
            importNames: ["MyModal"],
            message:
              "Please use the Modal Provider located in `src/providers/`",
          },
        ],
      },
    ],
    // 'no-magic-numbers': 'error',
    "no-redeclare": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        // for @ts-gql i.e. import('../../__generated__/ts-gql/filename').type
        disallowTypeAnnotations: false,
        fixStyle: "inline-type-imports",
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true,
      },
    ],
  },
  extends: ["prettier"],
};
