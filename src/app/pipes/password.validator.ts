import {FormControl, FormGroup} from '@angular/forms';

export class PasswordValidator {
  static areNotEqual(formGroup: FormGroup) {
    let firstControlValue: any;
    let valid = true;
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = formGroup.controls[key] as FormControl;
        if (firstControlValue === undefined) {
          firstControlValue = control.value;
        } else {
          // check if the value of the first control is equal to the value of the second control
          if (firstControlValue !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areNotEqual: true
    };
  }
}
