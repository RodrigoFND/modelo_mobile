import ControllerManager from "@/backend/appwrite/controllers"

const {  authController, testeController } = ControllerManager;

// 🔥 Exportamos apenas os controllers, sem expor o ServiceManager
export { authController, testeController };
