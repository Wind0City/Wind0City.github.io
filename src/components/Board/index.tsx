import { useKanban } from "@/stores/useKanban";
import { Task } from "./Task";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { KanbanGroup } from "./KanbanGroup";
import { Button } from "../ui/button";

export const Board = () => {
    const { boards, updateBoard, moveTask } = useKanban();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const id = String(active.id);
        const [gId, tId] = id.split("-");
        const targetGroupId = String(over.id);

        if (gId === targetGroupId) return; // 同一 group 不移动

        moveTask(tId, gId, targetGroupId);
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex flex-row">
                {boards.map((board) => (
                    <div key={board.groupId} className="flex flex-row">
                        <KanbanGroup
                            groupId={board.groupId}
                            title={board.groupName}
                        >
                            <div className="kanban-group p-2 mr-1 w-[260px] rounded-2xl bg-fuchsia-100">
                                <div className="flex flex-col">
                                    <div className="w-fit rounded-full bg-fuchsia-200 px-1 mb-2">
                                        未开始
                                    </div>
                                    <div>
                                        {board.tasks.map((item) => (
                                            <Task
                                                key={`${board.groupId}-${item.id}`}
                                                id={`${board.groupId}-${item.id}`}
                                                title={item.title}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={() => {
                                    updateBoard({
                                        groupId: board.groupId,
                                        groupName: board.groupName,
                                        tasks: [
                                            ...board.tasks,
                                            {
                                                id: board.tasks.length,
                                                title: "新任务",
                                            },
                                        ],
                                    });
                                }}
                            >
                                创建任务
                            </Button>
                        </KanbanGroup>
                    </div>
                ))}
            </div>
        </DndContext>
    );
};
