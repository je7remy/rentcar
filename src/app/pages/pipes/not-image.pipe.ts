import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notImage'
})
export class NotImagePipe implements PipeTransform {

  transform(contactImage: string): string {
    if (contactImage === '' || contactImage === null || contactImage === undefined) {
      return "../../assets/No_image.svg"
    }
    else {
      return contactImage;
    }
  }

}

