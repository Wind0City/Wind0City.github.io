import { RouterProvider } from "react-router";
import { router } from "./router/indext";

function App() {
    return (
        <>
            {/* 背景图片 */}
            <div
                className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none"
                style={{
                    backgroundImage: "url(/background.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="relative z-10">
                <RouterProvider router={router} />
            </div>
        </>
    );
}

export default App;
