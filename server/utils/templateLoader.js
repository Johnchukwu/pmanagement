const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const loadTemplate = (templateName, data) => {
    const filePath = path.join(__dirname, '..', 'templates', `${templateName}.hbs`);
    const templateSource = fs.readFileSync(filePath, 'utf-8');
    const template = handlebars.compile(templateSource);
    return template(data);
};

module.exports = loadTemplate;
