import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  verifyValidTouched(form: FormGroup,field: string) {
    return (!form.get(field)?.valid &&
      (form.get(field)?.touched ||
        form.get(field)?.dirty)) as boolean;
  }

  applyCssError(form: FormGroup, field: string) {
    return {
      'is-invalid': this.verifyValidTouched(form, field)
    };
  }
}
