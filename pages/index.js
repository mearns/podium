import renderTitledList from "../lib/layouts/default/titled-list";
import SlideDeck from "../components/slide-deck";

export default function Index({ scale = 400, aspect = 3 / 4 }) {
    const slide1 = renderTitledList(aspect, {
        title: "This is my title",
        items: ["One", "two"]
    });
    const slide2 = renderTitledList(aspect, {
        title: "Here is my second slide with a long title",
        items: ["Uno", "Dos", "three", "four is also long"]
    });
    const slides = [slide1, slide2];
    return (
        <SlideDeck scale={scale} aspect={aspect}>
            {slides}
        </SlideDeck>
    );
}
