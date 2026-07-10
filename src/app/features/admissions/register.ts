import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { ContentService } from '../../core/services/content.service';
import { RegistrationService } from '../../core/services/registration.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { IconComponent } from '../../shared/components/icon/icon';
import { RegistrationEnquiry } from '../../core/models/content.model';

@Component({
  selector: 'app-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, PageHeroComponent, IconComponent],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterPage {
  protected readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly content = inject(ContentService);
  private readonly registration = inject(RegistrationService);

  protected readonly grades = computed(() => this.content.content().grades);

  protected readonly submitting = signal(false);
  protected readonly done = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    studentName: ['', [Validators.required, Validators.minLength(2)]],
    dob: [''],
    gradeApplying: ['', Validators.required],
    gender: [''],
    parentName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.minLength(7)]],
    email: ['', [Validators.required, Validators.email]],
    nationality: [''],
    previousSchool: [''],
    message: [''],
  });

  protected invalid(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.dirty || c.touched);
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    const enquiry: RegistrationEnquiry = {
      ...this.form.getRawValue(),
      submittedAt: new Date().toISOString(),
    };
    await this.registration.submit(enquiry);
    this.submitting.set(false);
    this.done.set(true);
    this.form.reset();
  }

  protected again(): void {
    this.done.set(false);
  }
}
