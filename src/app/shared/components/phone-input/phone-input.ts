import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
} from 'libphonenumber-js/max';
import type { CountryCode } from 'libphonenumber-js';

interface Country {
  iso: CountryCode;
  name: string;
  dial: string;
}

/** Gulf / common nationalities surfaced at the top of the list for this school. */
const PRIORITY: CountryCode[] = ['SA', 'AE', 'KW', 'BH', 'QA', 'OM', 'YE', 'EG', 'JO', 'SD', 'IN', 'PK'];

/**
 * International phone/WhatsApp input. A country dropdown (flag + dial code) sets
 * the calling code and drives per-country formatting, length restriction and
 * validation via libphonenumber-js. Stores the value as an E.164 string
 * (e.g. `+966501234567`) through ControlValueAccessor.
 */
@Component({
  selector: 'app-phone-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './phone-input.html',
  styleUrl: './phone-input.css',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhoneInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PhoneInputComponent), multi: true },
  ],
})
export class PhoneInputComponent implements ControlValueAccessor, Validator {
  private readonly hostEl = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly inputId = input('phone');
  readonly invalid = input(false);
  readonly required = input(true);
  readonly placeholder = input('');
  readonly searchLabel = input('Search country');
  readonly emptyLabel = input('No matches');

  protected readonly countries = signal<Country[]>(buildCountries());
  protected readonly country = signal<Country>(
    buildCountries().find((c) => c.iso === 'SA') ?? buildCountries()[0],
  );
  protected readonly national = signal('');
  protected readonly open = signal(false);
  protected readonly search = signal('');

  protected readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.countries();
    const digits = q.replace(/\D/g, '');
    return this.countries().filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        (digits.length > 0 && c.dial.includes(digits)),
    );
  });

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  protected disabled = signal(false);

  // --- ControlValueAccessor -------------------------------------------------

  writeValue(value: string | null): void {
    if (!value) {
      this.national.set('');
      return;
    }
    const parsed = parsePhoneNumberFromString(value);
    if (parsed) {
      const match = this.countries().find((c) => c.iso === parsed.country);
      if (match) this.country.set(match);
      this.national.set(parsed.formatNational());
    } else {
      this.national.set(value);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
    if (isDisabled) this.open.set(false);
  }

  // --- Validator ------------------------------------------------------------

  validate(control: AbstractControl): ValidationErrors | null {
    const value = (control.value as string) ?? '';
    if (!value) return this.required() ? { required: true } : null;
    return isValidPhoneNumber(value) ? null : { phone: true };
  }

  // --- Interaction ----------------------------------------------------------

  protected onInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    const iso = this.country().iso;

    // Reject the keystroke if it pushes the national number past this
    // country's maximum length, keeping the previously accepted value.
    const probe = new AsYouType(iso);
    probe.input(el.value);
    const e164 = probe.getNumber()?.number;
    if (e164 && validatePhoneNumberLength(e164, iso) === 'TOO_LONG') {
      el.value = this.national();
      return;
    }

    const formatted = new AsYouType(iso).input(el.value);
    el.value = formatted;
    this.national.set(formatted);
    this.emit();
  }

  protected onBlur(): void {
    this.onTouched();
  }

  protected toggle(): void {
    if (this.disabled()) return;
    this.open.update((v) => !v);
    if (this.open()) this.search.set('');
  }

  protected onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  protected selectCountry(c: Country): void {
    this.country.set(c);
    this.open.set(false);
    this.search.set('');
    const reformatted = new AsYouType(c.iso).input(this.national());
    this.national.set(reformatted);
    this.emit();
    this.onTouched();
  }

  private emit(): void {
    const ayt = new AsYouType(this.country().iso);
    ayt.input(this.national());
    this.onChange(ayt.getNumber()?.number ?? '');
  }

  @HostListener('document:pointerdown', ['$event'])
  protected onDocPointer(event: Event): void {
    if (this.open() && !this.hostEl.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('keydown.escape')
  protected onEscape(): void {
    if (this.open()) this.open.set(false);
  }
}

/** Build the sorted country list once: priority countries first, then A→Z. */
function buildCountries(): Country[] {
  const region =
    typeof Intl !== 'undefined' && 'DisplayNames' in Intl
      ? new Intl.DisplayNames(['en'], { type: 'region' })
      : null;

  const all: Country[] = getCountries().map((iso) => ({
    iso,
    name: region?.of(iso) ?? iso,
    dial: getCountryCallingCode(iso),
  }));

  const priority = PRIORITY.map((iso) => all.find((c) => c.iso === iso)).filter(
    (c): c is Country => !!c,
  );
  const rest = all
    .filter((c) => !PRIORITY.includes(c.iso))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...priority, ...rest];
}
