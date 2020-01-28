import renderTitledList from "../lib/layouts/default/titled-list";
import Slide from "../components/slide";

export default function Index({ scale = 400, aspect = 3 / 4 }) {
    const layout = renderTitledList(aspect, {
        title: "This is my title",
        items: ["One", "two"]
    });
    return (
        <Slide scale={scale} aspect={aspect}>
            {layout}
        </Slide>
    );
}
