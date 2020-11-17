import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Item } from '../entities/Item';

@Injectable({
  providedIn: 'root',
})
export class DataApiHelperService {
  constructor(private http: HttpClient) {}

  getList() {
    return this.http
      .get<Item[]>('https://api.github.com/orgs/catalyst/repos')
      .pipe(
        mergeMap((q) => {
          return forkJoin(
            ...q.map((val) =>
              this.getContributors(val.name).pipe(
                map((contributor: any[]) => ({
                  ...val,
                  contributor: contributor
                    .sort((a, b) => b.contributions - a.contributions)
                    .slice(0, 5),
                }))
              )
            )
          );
        })
      );
  }

  getContributors(repository_name: string) {
    return this.http.get<Object[]>(
      `https://api.github.com/repos/catalyst/${repository_name}/contributors`
    );
  }
}
