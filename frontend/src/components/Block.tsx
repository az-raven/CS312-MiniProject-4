import type { ReactNode } from "react";

export function Block(children: ReactNode) {
	return <div className="block">
		{children}
	</div>;
}