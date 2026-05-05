import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            {/* 遮罩层 */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* 模态框内容 */}
            <div
                ref={modalRef}
                className="relative bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl max-w-lg w-full mx-4 p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 标题和关闭按钮 */}
                {title && (
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>
                )}

                {/* 内容 */}
                {children}
            </div>
        </div>
    );
};