module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "enforce the properties of formState being destructored",
      category: "Possible Errors",
      url: "https://react-hook-form.com/api/useform/formstate",
    },
  },
  create: function (context) {
    return {
      MemberExpression(node) {
        if (node.object.name === "formState") {
          return context.report({
            node: node.property,
            message: "Use desturctoring assignment for formState's properties.",
          });
        }
      },
    };
  },
};
