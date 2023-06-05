import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  signupForm: FormGroup;
  personalInfoForm: FormGroup;
  loginCredentialForm: FormGroup;
  
  showPassword = false;
  showConfirmPassword = false;
  passwordMatch = true;


  selectedDate: Date = new Date();
  personalInfoValid = false;

  // Interest
  separatorKeysCodes: number[] = [13, 188]; // Enter and comma keycodes
  interestCtrl = new FormControl('');
  filteredInterests: Observable<string[]>;
  interests: string[] = [];
  allInterests: string[] = ['Desktop PC', 'Notebooks', 'Computer Components', 'Computer Peripherals', 'Accessories'];
  @ViewChild('interestInput') interestInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private userService: UserService
  ) {

    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      birthdate: [null, [Validators.required]],
    });

    this.loginCredentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      personalInfoForm: this.personalInfoForm,
      loginCredentialForm: this.loginCredentialForm
    });

    this.signupForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
    this.signupForm.get('confirmPass')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
    this.filteredInterests = this.interestCtrl.valueChanges.pipe(
      startWith(null),
      map((interest: string | null) =>
        interest ? this._filter(interest) : this.allInterests.slice()
      )
    );
    this.signupForm.valueChanges.subscribe(() => {
      this.personalInfoValid = this.isPersonalInfoValid();
    });
  }
  
  isPersonalInfoValid(): boolean {
    const firstNameValid = this.signupForm.get('firstName')?.valid ?? false;
    const lastNameValid = this.signupForm.get('lastName')?.valid ?? false;
    const birthdateValid = this.signupForm.get('birthdate')?.valid ?? false;
    const interestsValid = this.interests.length >= 3;
  
    return firstNameValid && lastNameValid && birthdateValid && interestsValid;
  }
  

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.interests.includes(value)) {
      this.interests.push(value);
    }
    event.chipInput!.clear();
  
    this.interestCtrl.setValue(null);
  }

  remove(interest: string): void {
    const index = this.interests.indexOf(interest);
    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (value && !this.interests.includes(value)) {
      this.interests.push(value);
    }
    this.interestInput.nativeElement.value = '';
    this.interestCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allInterests.filter((interest) =>
      interest.toLowerCase().includes(filterValue)
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
    this.checkPasswordMatch();
  }

  // validator
  getErrorMessage(): string {
    const emailControl = this.signupForm.get('email');
    if (emailControl && emailControl.hasError('required')) {
      return 'Email is Required';
    }
    return emailControl && emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  checkPasswordMatch(): void {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPass')?.value;
    this.passwordMatch = password === confirmPassword;
    if (!this.passwordMatch) {
      this.signupForm.get('confirmPass')?.setErrors({ passwordMismatch: true });
    } else {
      this.signupForm.get('confirmPass')?.setErrors(null);
    }
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
  }

  onSubmit(): void {
    const user: User = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      middleName: this.signupForm.value.middleName,
      email: this.signupForm.value.email,
      birthdate: this.signupForm.value.birthdate,
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      listOfInterest: this.interests,
    };

    if (this.signupForm.invalid || this.interests.length < 3) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const dateOnly = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    this.signupForm.patchValue({ birthdate: dateOnly });

    console.log(this.interests);
    console.log('User:', user);

  //   this.userService.register(user).subscribe(
  //     (response) => {
  //       console.log('User created:', response);
  //     },
  //     (error) => {
  //       console.error('Failed to create user:', error);
  //     }
  //   );
   }
}
