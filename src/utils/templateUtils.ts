import Mustache from "mustache";

// Apply pipe transformations to template
function applyPipes(html: string): string {
    return html.replace(/\{\{\s*([^}|]+)\s*\|\s*(\w+)\s*\}\}/g, (_m, path, fn) =>
        `{{#${fn}}}{{${path.trim()}}}{{/${fn}}}`
    );
}

// Mustache helpers for formatting
export const templateHelpers = {
    idr: function () {
        return function (text: string, render: (t: string) => string) {
            const raw = render(text);
            let n: any;
            try {
                n = JSON.parse(raw);
            } catch {
                n = Number(raw.replace(/[^\d\-\.]/g, ""));
            }
            const neg = Number(n) < 0;
            const abs = Math.abs(Number(n));
            const s = abs.toLocaleString("id-ID");
            return neg ? `(${s})` : s;
        };
    },
    percentage: function () {
        return function (text: string, render: (t: string) => string) {
            const raw = render(text);
            const n = Number(raw) || 0;
            return `${(n * 100).toFixed(2)}%`;
        };
    },
    date: function () {
        return function (text: string, render: (t: string) => string) {
            const raw = render(text);
            try {
                const date = new Date(raw);
                return date.toLocaleDateString("id-ID");
            } catch {
                return raw;
            }
        };
    },
    raw: function () {
        return function (text: string, render: (t: string) => string) {
            return render(text);
        };
    }
};

// Main template renderer function
export function renderTemplate(html: string, css: string, data: any): string {
    console.log("renderTemplate called with:", {
        htmlLength: html.length,
        cssLength: css.length,
        data: Object.keys(data)
    });

    const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template Preview</title>
    <style>
        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
        ${css}
    </style>
</head>
<body>
    ${html}
</body>
</html>`;

    console.log("Template before Mustache:", template.substring(0, 500) + "...");

    const processedTemplate = applyPipes(template);
    console.log("Template after applyPipes:", processedTemplate.substring(0, 500) + "...");

    const rendered = Mustache.render(processedTemplate, data, {}, templateHelpers as any);
    console.log("Final rendered result:", rendered.substring(0, 500) + "...");

    return rendered;
}

// Template storage functions
export interface Template {
    id: string;
    name: string;
    html: string;
    css: string;
    timestamp: string;
    createdBy?: string;
}

export function saveTemplate(template: Omit<Template, 'id'>): Template {
    const id = Date.now().toString();
    const fullTemplate: Template = { ...template, id };

    const templates = getTemplates();
    templates.push(fullTemplate);
    localStorage.setItem('report-templates', JSON.stringify(templates));

    return fullTemplate;
}

export function getTemplates(): Template[] {
    try {
        return JSON.parse(localStorage.getItem('report-templates') || '[]');
    } catch {
        return [];
    }
}

export function deleteTemplate(id: string): boolean {
    const templates = getTemplates();
    const filtered = templates.filter(t => t.id !== id);

    if (filtered.length !== templates.length) {
        localStorage.setItem('report-templates', JSON.stringify(filtered));
        return true;
    }

    return false;
}

export function getTemplate(id: string): Template | null {
    const templates = getTemplates();
    return templates.find(t => t.id === id) || null;
}