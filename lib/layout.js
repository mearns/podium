const SCALED_PROPERTY_NAMES = ["x", "y", "w", "h"];

function renderScaledDescriptor(scale, child) {
    const scaled = {};
    for (const propertyName of SCALED_PROPERTY_NAMES) {
        if (typeof child[propertyName] !== "undefined") {
            scaled[propertyName] = child[propertyName] * scale;
        }
    }
    return { ...child.child.renderToDescriptor(scale), ...scaled };
}

export default class Layout {
    constructor() {
        this._children = [];
    }

    renderToDescriptor(scale) {
        return {
            tag: "div",
            attributes: {
                [`data-podium-layout`]: "Layout"
            },
            children: this._children.map(d => renderScaledDescriptor(scale, d))
        };
    }

    addParagraph({ x, y, w, h }) {
        const p = new Paragraph();
        this._children.push({ x, y, w, h, child: p });
        return p;
    }

    addBulletList({ x, y, w, h }) {
        const list = new BulletList();
        this._children.push({ x, y, w, h, child: list });
        return list;
    }

    addNumberedList({ x, y, w, h }) {
        const list = new NumberedList();
        this._children.push({ x, y, w, h, child: list });
        return list;
    }
}

class List {
    constructor(tag, componentName, fontSize = "medium") {
        this._tag = tag;
        this._componentName = componentName;
        this._fontSize = fontSize;
        this._items = [];
    }

    addItem() {
        const item = new TextRun();
        this._items.push(item);
        return item;
    }

    renderToDescriptor() {
        return {
            tag: this._tag,
            attributes: {
                [`data-podium-layout`]: this._componentName
            },
            children: this._items.map(item => ({
                tag: "li",
                attributes: {
                    [`data-podium-layout`]: `${this._componentName}.item`,
                    className: `text-size-${this._fontSize}`
                },
                children: [item.renderToDescriptor()]
            }))
        };
    }
}

class BulletList extends List {
    constructor(size) {
        super("ul", "BulletList", size);
    }
}

class NumberedList extends List {
    constructor(size) {
        super("ol", "NumberedList", size);
    }
}

class TextRun {
    constructor() {
        this._spans = [];
    }

    renderToDescriptor() {
        return {
            tag: "span",
            attributes: {
                [`data-podium-layout`]: "TextRun"
            },
            children: this._spans.map(({ text, styles }) => ({
                tag: "span",
                attributes: {
                    [`data-podium-layout`]: `TextRun.Span`,
                    className: styles.join(" ")
                },
                children: [text]
            }))
        };
    }

    addText(text) {
        this._spans.push({ text, styles: [] });
    }
}

class Paragraph {
    constructor() {
        this._spans = [];
    }

    renderToDescriptor() {
        return {
            tag: "p",
            attributes: {
                [`data-podium-layout`]: "TextFlow"
            },
            children: this._spans.map(({ run, size, styles }) => ({
                tag: "span",
                attributes: {
                    [`data-podium-layout`]: `TextFlow.Span`,
                    className: [...styles, `text-size-${size}`].join(" ")
                },
                children: [run.renderToDescriptor()]
            }))
        };
    }

    addSmallText() {
        const run = new TextRun();
        this._spans.push({ run, size: "small", styles: [] });
        return run;
    }

    addMediumText() {
        const run = new TextRun();
        this._spans.push({ run, size: "medium", styles: [] });
        return run;
    }

    addLargeText() {
        const run = new TextRun();
        this._spans.push({ run, size: "large", styles: [] });
        return run;
    }
}
