import { ToastRef } from 'react-native-toast-notifications';
import { CustomModalHandle } from "@/components/modal";

declare global {
  var toast: ToastRef;
  var modal: CustomModalHandle | null;
}
