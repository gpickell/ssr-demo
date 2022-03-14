import React, { useContext, useMemo } from "react";

let root: AppContext | undefined;
const context = React.createContext<AppContext | undefined>(undefined);

declare global {
    const __appContext__: any;
}

export class AppContext {
    count = 0;

    constructor(state?: any) {
        if (state) {
            Object.assign(this, state);
        }
    }

    static use() {
        return useContext(context) ?? root ?? (root = new this());
    }

    static Client(props: { children?: React.ReactNode }) {
        const value = useMemo(() => new AppContext(__appContext__), [__appContext__]);

        const jsx =
        <context.Provider value={value}>
            {props.children}
        </context.Provider>;

        return jsx;
    }

    static readonly Provider = context.Provider;
}

export default AppContext;
