let componentTemplate;
export default componentTemplate = (component) => {
    return `import React from 'react';\n\nconst ${component} = () => {\n\treturn (\n\t\t<div>${component}</div>\n\t)\n};\n\nexport default ${component};`;
};