import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter'
})
export class NumberFormatterPipe implements PipeTransform {

  transform(value: number, decimalPrecision: number) {
    return value.toFixed(decimalPrecision);
  }

}
