import { useDroppable } from "@dnd-kit/core";
import type React from "react";

interface KanbanGroupProps extends React.PropsWithChildren {
    groupId: string;
    title: string;
}

export const KanbanGroup = (props: KanbanGroupProps) => {
    const { setNodeRef } = useDroppable({
        id: props.groupId,
    });
    return (
        <div ref={setNodeRef}>
            <div className="font-semibold text-lg mb-2">{props.children}</div>
            
        </div>
    );
};
