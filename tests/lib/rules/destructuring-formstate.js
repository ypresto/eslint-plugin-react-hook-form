/**
 * @fileoverview Use desturcturing assignment to access the properties of formState. This ensure the hook has subscribed to the changes of the states.
 * @author Andrew Kao
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/destructuring-formstate"),
  RuleTester = require("eslint").RuleTester;

const normalizeIndent = require("../utils/normalizeIndent");
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });
ruleTester.run("destructuring-formstate", rule, {
  valid: [
    {
      code: normalizeIndent`
        function Component() {
          const {formState: {isDirty}} = useForm();
          console.log(isDirty);
          return null;
        }
    `,
    },
    {
      code: normalizeIndent`
        function Component() {
          const formState = {isDirty: true};
          console.log(formState.isDirty);
          return null;
        }
    `,
    },
  ],

  invalid: [
    {
      code: normalizeIndent`
        function Component() {
          const {formState, register} = useForm();
          console.log(formState.isDirty);
          console.log(formState.errors);
          return null;
        }
      `,
      errors: [
        {
          messageId: "useDestuctor",
          line: 4,
          column: 25,
          endLine: 4,
          endColumn: 32,
        },
        {
          messageId: "useDestuctor",
          line: 5,
          column: 25,
          endLine: 5,
          endColumn: 31,
        },
      ],
    },
    {
      code: normalizeIndent`
        function Component() {
          const {formState: fs, register} = useForm();
          console.log(fs.isDirty);
          return null;
        }
      `,
      errors: [
        {
          messageId: "useDestuctor",
          line: 4,
          column: 18,
          endLine: 4,
          endColumn: 25,
        },
      ],
    },
  ],
});
