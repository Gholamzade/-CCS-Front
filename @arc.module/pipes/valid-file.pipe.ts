import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";
import { EMPTY, from, of } from "rxjs";
import { catchError, concatMap, finalize, first, take, takeWhile, tap } from "rxjs/operators";
import { IUnit } from '../models/interfaces/unit.interface';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Pipe({
  name: "validFile"
})
export class ValidFile implements PipeTransform {

  constructor(private http: HttpClient) { }

  transform(filesArray: string[], defaultFile: string) {
    let defaultUrl = defaultFile;
    return from(filesArray).pipe(
      concatMap((url) => {
        return fetch(url);
      }),
      takeWhile(res => {
        if (res.status === 200) {
          defaultUrl = res.url;
          return false;
        }
        return true;
      }, true),
    )

  }
}
