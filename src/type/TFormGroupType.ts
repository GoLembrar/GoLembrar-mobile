import { FormControl} from "@angular/forms";

export type TFormGroupType<T> = {
  [K in keyof T]: FormControl<T[K]>
}
