import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { birthdateValidator, hasLowercaseValidator, hasNumberValidator, hasSymbolValidator, hasUppercaseValidator, maxLengthValidator } from 'src/app/modules/validators/custom.validator';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  // Form Groups
  signupForm: FormGroup;
  personalInfoForm: FormGroup;
  loginCredentialForm: FormGroup;
  addressInfoForm:  FormGroup;

  // Password Field
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
  @ViewChild('stepper') stepper!: MatStepper;


  constructor(
    private fb: FormBuilder,
    // private datePipe: DatePipe,
    private userService: UserService
  ) {

    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      birthdate: ['', [
        Validators.required,
        birthdateValidator()]],
    });

    this.addressInfoForm = this.fb.group({
      houseNo: ['', Validators.required],
      buildingName: [''],
      streetName: ['', Validators.required],
      brgy:['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [
        Validators.required,
        maxLengthValidator()
      ]],
      Province: ['', Validators.required],
    })

    this.loginCredentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', 
        [Validators.required,
        Validators.minLength(8),
        hasNumberValidator(),
        hasLowercaseValidator(),
        hasUppercaseValidator(),
        hasSymbolValidator(),
      ]],
      confirmPass: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      personalInfoForm: this.personalInfoForm,
      addressInfoForm: this.addressInfoForm,
      loginCredentialForm: this.loginCredentialForm
    });

    this.loginCredentialForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
    this.loginCredentialForm.get('confirmPass')?.valueChanges.subscribe(() => {
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
  
  resetStepper() {
    this.stepper.reset();
    this.interests = []; 
    this.interestInput.nativeElement.value = '';
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
    const emailControl = this.loginCredentialForm.get('email');
    if (emailControl && emailControl.hasError('required')) {
      return 'Email is Required';
    }
    return emailControl && emailControl.hasError('email') ? 'Not a valid email' : '';
  }
 
  checkPasswordMatch(): void {
    const confirmPasswordControl = this.loginCredentialForm.get('confirmPass');
    const password = this.loginCredentialForm.get('password')?.value;
    const confirmPassword = confirmPasswordControl?.value;
    this.passwordMatch = password === confirmPassword;
    if (confirmPasswordControl?.dirty || confirmPasswordControl?.touched) {
      if (!this.passwordMatch) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
  

  // formatDate(date: Date | null): string {
  //   if (!date) return '';
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const day = date.getDate().toString().padStart(2, '0');
  //   return `${month}/${day}/${year}`;
  // }

  onSubmit(): void {
    const user: User = {
      firstName: this.personalInfoForm.value.firstName,
      lastName: this.personalInfoForm.value.lastName,
      middleName: this.personalInfoForm.value.middleName,
      birthdate: this.personalInfoForm.value.birthdate,
      email: this.loginCredentialForm.value.email,
      username: this.loginCredentialForm.value.username,
      password: this.loginCredentialForm.value.password,
      listOfInterest: this.interests,
    };

    if (this.signupForm.invalid || this.interests.length < 3) {
      this.signupForm.markAllAsTouched();
      return;
    }

    //  const dateOnly = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    //  this.signupForm.patchValue({ birthdate: dateOnly });

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
