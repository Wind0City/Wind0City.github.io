import { RouterProvider } from "react-router";
import { router } from "./router/indext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { StatusProvider } from "./contexts/StatusContext";

function App() {
    return (
        <ThemeProvider>
            <StatusProvider>
                {/* 背景图片 */}
                <div
                    className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none transition-opacity duration-300"
                    style={{
                        backgroundImage: "url(/background.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                {/* 暗色模式遮罩 */}
                <div className="fixed inset-0 w-full h-full pointer-events-none bg-black/0 dark:bg-black/50 transition-colors duration-300" />
                <div className="relative z-10">
                    <RouterProvider router={router} />
                </div>
            </StatusProvider>
        </ThemeProvider>
    );
}

export default App;
