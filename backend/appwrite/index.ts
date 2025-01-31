import ControllerManager from "@/backend/appwrite/controllers"

const {  authController } = ControllerManager;

// 🔥 Exportamos apenas os controllers, sem expor o ServiceManager
export { authController };
