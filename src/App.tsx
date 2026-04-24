import { RouterProvider } from "react-router";
import { router } from "./router/indext";

function App() {
    return (
        <>
            <video
                key="background-video"
                className="fixed inset-0 w-full h-full object-cover pointer-events-none"
                style={{ opacity: 0.98 }}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            >
                <source
                    src="/149E7795-DBDA-4F5D-B39A-14712F841118.mp4"
                    type="video/mp4"
                />
                您的浏览器不支持视频播放
            </video>
            <div className="relative z-10">
                <RouterProvider router={router} />
            </div>
        </>
    );
}

export default App;
