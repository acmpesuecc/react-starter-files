let routesTemplate;
export default routesTemplate = (pages) => {
    return `export default {${pages.map((page) => {
      return `\n\t${page.name}: '${page.route}'`;
    })}\n};`;
};