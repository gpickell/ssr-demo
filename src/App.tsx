import { useState } from "react";
import AppContext from "./AppContext";

function App() {
    const ctx = AppContext.use();
    const [count, set] = useState(ctx.count);

    const log = () => {
        set(count + 1);
        console.log("click");
    };

    const jsx =
    <>
        <button onClick={log}>
            test {count}
        </button>
    </>;

    return jsx;
}

export default App;