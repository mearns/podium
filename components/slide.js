import React from "react";

export default function Slide({ children: layout, scale, aspect }) {
    const descriptor = layout.renderToDescriptor(scale);
    const el = renderDescriptor(descriptor);
    React.useEffect(() => fitDescriptor(descriptor), [descriptor]);
    return (
        <>
            <div
                style={{
                    display: "inline-block",
                    width: `${scale}px`,
                    height: `${scale * aspect}px`
                }}
            >
                {el}
            </div>
        </>
    );
}

const TEXT_SIZE_FACTOR = 2.0;

function fitDescriptor(descriptor) {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    const sheet = style.sheet;
    const setSizes = s => {
        while (sheet.cssRules.length) {
            sheet.deleteRule(0);
        }
        sheet.insertRule(`.text-size-small { font-size: ${s}px; }`);
        sheet.insertRule(
            `.text-size-medium { font-size: ${s * TEXT_SIZE_FACTOR}px; }`
        );
        sheet.insertRule(
            `.text-size-large { font-size: ${s *
                TEXT_SIZE_FACTOR *
                TEXT_SIZE_FACTOR}px; }`
        );
    };
    let upper = 120;
    let lower = 10;
    let current = 30;
    while (true) {
        setSizes(current);
        if (allBoxesFit(descriptor)) {
            const next = Math.floor((current + upper) / 2);
            if (current === next) {
                break;
            }
            lower = current;
            current = next;
        } else {
            const next = Math.floor((lower + current) / 2);
            if (current === next) {
                break;
            }
            upper = current;
            current = next;
        }
    }
    setSizes(current);
}

function allBoxesFit(descriptor) {
    if (typeof descriptor === "string") {
        return true;
    }
    const el = descriptor.ref.current;
    if (el) {
        if (descriptor.w != null && el.clientWidth > descriptor.w) {
            return false;
        }
        if (descriptor.h != null && el.clientHeight > descriptor.h) {
            return false;
        }
    }
    if (descriptor.children) {
        return descriptor.children.every(allBoxesFit);
    }
    return true;
}

function renderDescriptor(descriptor) {
    if (typeof descriptor === "string") {
        return descriptor;
    }
    const childElements = (descriptor.children || []).map(renderDescriptor);

    const ref = React.useRef();
    const el = React.createElement(
        descriptor.tag,
        {
            ...descriptor.attributes,
            style: getStyleForDescriptor(descriptor),
            "data-podium-descriptor": JSON.stringify(
                without(descriptor, "children", "tag", "attributes")
            ),
            ref
        },
        ...childElements
    );
    descriptor.el = el;
    descriptor.ref = ref;
    return el;
}

function getStyleForDescriptor(descriptor) {
    const { tag } = descriptor;
    if (
        tag === "div" ||
        tag === "ul" ||
        tag === "ol" ||
        tag === "img" ||
        tag === "p"
    ) {
        const styles = {
            display: "inline-block",
            padding: 0,
            margin: 0
        };
        if (descriptor.x || descriptor.y) {
            styles.position = "absolute";
            styles.left = descriptor.x && `${descriptor.x}px`;
            styles.top = descriptor.y && `${descriptor.y}px`;
        }
        return styles;
    }
    return {};
}

function without(obj, ...withoutProps) {
    const clone = { ...obj };
    for (const propName of withoutProps) {
        delete clone[propName];
    }
    return clone;
}
