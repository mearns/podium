import Layout from "../../layout";

export default function renderTitledList(aspect, { title, items }) {
    const layout = new Layout();
    const headerY = 0.05 * aspect;
    const headerHeight = 0.2;
    layout
        .addParagraph({ x: 0.05, y: headerY, w: 0.9, h: headerHeight })
        .addSmallText()
        .addText(title);
    const list = layout.addBulletList({
        x: 0.05,
        y: headerY + headerHeight,
        w: 0.9,
        h: aspect - headerY - (headerY + headerHeight)
    });
    items.forEach(item => list.addItem().addText(item));
    return layout;
}
