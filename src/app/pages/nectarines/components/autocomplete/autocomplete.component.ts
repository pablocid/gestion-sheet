import { Component, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements AfterContentInit {
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  public opts: string[];

  constructor() { }

  @Input() list: { id: string, value: string }[];
  @Output() id = new EventEmitter<string>();

  ngAfterContentInit() {
    this.opts = this.list.map(x => x.value);

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.opts.filter(x => x).filter(option => option.toLowerCase().includes(filterValue));
  }

  find() {
    const index = this.list.map(x => x.value).indexOf(this.myControl.value);
    if (index !== -1) {
      // console.log(this.opts[index].id);
      // this.nectarS.setVariety(this.opts[index].id);
      this.id.emit(this.list[index].id);
      this.myControl.setValue('');
    } else {
      this.id.emit(undefined);
    }
    this.myControl.setValue('');
  }

}
