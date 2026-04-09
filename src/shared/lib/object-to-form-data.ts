export const objectToFormData = (
  obj: Record<string, unknown>,
  form?: FormData,
  namespace?: string,
): FormData => {
  const fd = form || new FormData();
  let formKey: string;

  for (const property in obj) {
    if (Object.hasOwn(obj, property)) {
      if (namespace) {
        formKey = `${namespace}[${property}]`;
      } else {
        formKey = property;
      }

      const value = obj[property];

      // 1. Tarixdirsə
      if (value instanceof Date) {
        fd.append(formKey, value.toISOString());
      }

      // 2. Fayldırsa (Dəqiq yoxlama!)
      else if (value instanceof File || value instanceof Blob) {
        fd.append(formKey, value);
      }

      // 3. Array və ya Obyektdirsə (və null deyilsə) -> REKURSİYA (Özünü çağırır)
      else if (typeof value === 'object' && value !== null) {
        // Fayl massivdirsə (File[]) bunu ayrıca dövr etmək lazımdır
        if (Array.isArray(value) && value.some((v) => v instanceof File)) {
          value.forEach((file) => {
            fd.append(formKey, file);
          });
        } else {
          // Dərinə get!
          objectToFormData(value as Record<string, unknown>, fd, formKey);
        }
      }

      // 4. Adi dəyər (string, number, boolean)
      else {
        fd.append(formKey, String(value));
      }
    }
  }

  return fd;
};
