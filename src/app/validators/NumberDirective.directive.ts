import { Directive } from '@angular/core';
import { Validator,  NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[advs-phone]',
  providers: [{provide: NG_VALIDATORS, useExisting: NumberDirective, multi: true}]
})
export class NumberDirective implements Validator {
  regex = new RegExp(/(8|9)\d{1,7}/);


  validate(c: FormControl): {[key: string]: any} {
    console.log(this.regex.test(c.value));

    if (c.value == null) {
      return null;
    }

    if (!this.regex.test(c.value)) {
      console.log("pattern dont match");
      return {"pattern": true};
    } else {
      return null;
    }
  }
}
