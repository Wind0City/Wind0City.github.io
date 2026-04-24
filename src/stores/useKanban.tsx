import { create } from "zustand";

type Task = {
    id: number | string;
    title: string;
};

interface Board {
    groupId: string;
    groupName: string;
    tasks: Task[];
}

export const useKanban = create<{
    boards: Board[];
    createBoard: (board: Board) => void;
    updateBoard: (board: Board) => void;
    moveTask: (
        taskId: string,
        sourceGroupId: string,
        targetGroupId: string,
    ) => void;
}>((set) => ({
    boards: [],
    createBoard: (board) =>
        set((state) => ({ boards: [...state.boards, board] })),
    updateBoard: (board) =>
        set((state) => ({
            boards: state.boards.map((b) =>
                b.groupId == board.groupId ? board : b,
            ),
        })),
    // 移动任务从一个 group 到另一个 group
    moveTask: (taskId, sourceGroupId, targetGroupId) =>
        set((state) => {
            // 找到源 group 和目标 group
            const sourceBoard = state.boards.find(
                (b) => b.groupId === sourceGroupId,
            );
            const targetBoard = state.boards.find(
                (b) => b.groupId === targetGroupId,
            );

            if (!sourceBoard || !targetBoard) return state;

            // 找到要移动的任务
            const taskToMove = sourceBoard.tasks.find(
                (t) => String(t.id) === taskId,
            );
            if (!taskToMove) return state;

            // 生成新的唯一 ID
            const maxId = Math.max(
                0,
                ...targetBoard.tasks.map((t) =>
                    typeof t.id === "number" ? t.id : 0,
                ),
            );

            return {
                boards: state.boards.map((board) => {
                    // 从源 group 中移除任务
                    if (board.groupId === sourceGroupId) {
                        return {
                            ...board,
                            tasks: board.tasks.filter(
                                (t) => String(t.id) !== taskId,
                            ),
                        };
                    }
                    // 添加任务到目标 group（使用新 ID）
                    if (board.groupId === targetGroupId) {
                        return {
                            ...board,
                            tasks: [
                                ...board.tasks,
                                { id: maxId + 1, title: taskToMove.title },
                            ],
                        };
                    }
                    return board;
                }),
            };
        }),
}));
