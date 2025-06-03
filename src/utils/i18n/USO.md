### ✅ Exemplo de uso
```
import { I18nHelper } from './i18n/helper';

const i18n = new I18nHelper('en');

console.log(i18n.messages.required);         // "This field is required."
console.log(i18n.titles.register);           // "Sign Up"
console.log(i18n.buttons.submit);            // "Submit"
console.log(i18n.messages.valueTooHigh("Age", 60)); // "Age must be less than or equal to 60"
```

### ✅ Exemplo de uso com Axios
```
import { I18nHelper } from './i18n/helper';

const i18n = new I18nHelper('pt');

axios.interceptors.response.use(
  res => res,
  err => {
    const status = err?.response?.status;
    const message = i18n.getHttpErrorMessage(status);
    alert(message);
    return Promise.reject(err);
  }
);
```

### ⚙️ Extra (utilidade opcional)
```
export function getErrorMessageFromStatus(
  status: number | undefined,
  locale: SupportedLocales
): string {
  const i18n = new I18nHelper(locale);
  if (!status) return i18n.errors.networkError;
  return i18n.getHttpErrorMessage(status);
}

```

### 🔄 Dica: Integração com Axios ou Fetch
- Você pode usar isso para padronizar tratamento de erros em interceptors:

```
axios.interceptors.response.use(
  response => response,
  error => {
    const i18n = new I18nHelper('pt');
    if (error.response?.status === 403) {
      alert(i18n.errors.forbidden);
    } else if (error.message === 'Network Error') {
      alert(i18n.errors.networkError);
    } else {
      alert(i18n.errors.unknown);
    }
    return Promise.reject(error);
  }
);

```