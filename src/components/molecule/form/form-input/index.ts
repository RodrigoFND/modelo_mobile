import FormInputTextTeste from "./contents/FormTextInput";
import FormInputIconTeste from "./FormInputIcon";
import FormInputRootTeste from "./root/FormInputRoot";
import FormInputNumber from "./contents/FormNumberInput";
import FormInputEmailTeste from "./contents/FormEmailInput";
const FormInput = {
    Root: FormInputRootTeste,
    Icon: FormInputIconTeste,
    Content: {
        Text: FormInputTextTeste,
        Number: FormInputNumber,
        Email: FormInputEmailTeste
    }

}


export default FormInput;
