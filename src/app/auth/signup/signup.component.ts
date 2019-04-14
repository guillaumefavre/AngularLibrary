import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
  			  private authService: AuthService,
  			  private router: Router) { }

  ngOnInit() {
  	this.initForm();
  }

  initForm() {
  	this.signUpForm = this.formBuilder.group({
  		emailForm: ['', [Validators.required, Validators.email]],
  		passwordForm: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
  	});
  }

  onSubmit() {
  	const email = this.signUpForm.get('emailForm').value;
  	const password = this.signUpForm.get('passwordForm').value;
  	this.authService.createNewUser(email, password).then(
  		() => {
  			this.router.navigate(['/books']);
  		},
  		(error) => {
  			this.errorMessage = error;
  		}
	);
  }

}
