import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface FormModel {
  label: string;
  name: string;
  value: any;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'datetime' | 'date' | 'time';
  placeholder?: string;
  validators?: any[];
  options?: any[];
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  formGroup : FormGroup = new FormGroup<any>({});
  formFields: FormModel[] = [
    {
      label: "Name",
      name: 'name',
      value: null,
      type: 'text',
      placeholder: 'Please enter name',
      validators: [Validators.required]
    },
    {
      label: "Age",
      name: 'age',
      value: null,
      type: 'number',
      placeholder: 'Please enter age',
      validators: [Validators.required]
    },
    {
      label: "Email",
      name: 'email',
      value: 'example@gmail.com',
      type: 'text',
      placeholder: 'Please enter email',
      validators: [Validators.email]
    },
    {
      label: "Gender",
      name: 'gender',
      value: null,
      type: 'select',
      placeholder: 'Please enter gender',
      validators: [Validators.required],
      options: ['Male', 'Female', 'Other']
    },
    {
      label: "Status",
      name: 'status',
      value: true,
      type: 'checkbox',
    },
    {
      label: "Date",
      name: 'date',
      value: new Date(2023, 4,2),
      type: 'date',
      placeholder: 'MM/DD/YYYY'
    },
    {
      label: "Time",
      name: 'time',
      // value: new Date(2023, 4,2, 23,12),
      value: "12:23",
      type: 'time'
    },
    {
      label: "DateTime",
      name: 'datetime',
      value: new Date(2023, 4,2, 11,5),
      type: 'datetime'
    },
  ];

  constructor() {
  }

  onCancel(): void {
    console.log('cancel')
  }

  onSave(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    const data = this.formGroup.getRawValue();
    console.log(data);
  }
  ngOnInit() {
    for ( const formField of this.formFields) {
      const formControl =  new FormControl(
        formField.value,
        formField.validators
      );
      this.formGroup.registerControl(formField.name, formControl)
    }
    console.log(this.formGroup)
  }

  onTimeChanged(time: string, col: string): void { // 02:4
    const input = this.formGroup.get(col);
    const times = time.split(':');
    const hour = +times[0];
    const minute = +times[1];
    const oldValue : Date = input?.value;
    const newView = new Date(oldValue.getFullYear(), oldValue.getMonth(), oldValue.getDate(), hour, minute);
    input?.setValue(newView);
  }
}
