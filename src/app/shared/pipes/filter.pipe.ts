import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], search: string = "", fields: string[]): any {
    if (!search || !value.length) {
      return value;
    }

    // optimize search fot not invoke toLowerCase() multiple times.
    search = search.toLowerCase();

    return value.filter(employee => {
      let fullName = "";
      fields.forEach(field => {
        fullName += employee[field];
      });
      // console.log(`fullName === ${fullName}`);
      return fullName.toLowerCase().includes(search);
    });
  }
}
