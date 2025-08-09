import { ValidationErrors } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { Injectable } from '@angular/core';
import { SpiderlyFormControl, SpiderlyValidatorFn, validatePrecisionScale } from 'spiderly';

@Injectable({
    providedIn: 'root',
})
export class ValidatorServiceGenerated {

    constructor(
        protected translocoService: TranslocoService
    ) {
    }

    setValidator = (formControl: SpiderlyFormControl, className: string): SpiderlyValidatorFn => {
        switch(formControl.label + className){
            case 'nameCategory':
                return this.nameCategoryValidator(formControl);
            case 'versionCategory':
                return this.versionCategoryValidator(formControl);
            case 'createdAtCategory':
                return this.createdAtCategoryValidator(formControl);
            case 'modifiedAtCategory':
                return this.modifiedAtCategoryValidator(formControl);

            case 'emailLogin':
                return this.emailLoginValidator(formControl);

            case 'titleNotification':
                return this.titleNotificationValidator(formControl);
            case 'descriptionNotification':
                return this.descriptionNotificationValidator(formControl);
            case 'emailBodyNotification':
                return this.emailBodyNotificationValidator(formControl);
            case 'versionNotification':
                return this.versionNotificationValidator(formControl);
            case 'createdAtNotification':
                return this.createdAtNotificationValidator(formControl);
            case 'modifiedAtNotification':
                return this.modifiedAtNotificationValidator(formControl);

            case 'namePermission':
                return this.namePermissionValidator(formControl);
            case 'nameLatinPermission':
                return this.nameLatinPermissionValidator(formControl);
            case 'descriptionPermission':
                return this.descriptionPermissionValidator(formControl);
            case 'descriptionLatinPermission':
                return this.descriptionLatinPermissionValidator(formControl);
            case 'codePermission':
                return this.codePermissionValidator(formControl);

            case 'projectNameProject':
                return this.projectNameProjectValidator(formControl);
            case 'linkProject':
                return this.linkProjectValidator(formControl);
            case 'descriptionProject':
                return this.descriptionProjectValidator(formControl);
            case 'upvoteCountProject':
                return this.upvoteCountProjectValidator(formControl);
            case 'userIdProject':
                return this.userIdProjectValidator(formControl);
            case 'versionProject':
                return this.versionProjectValidator(formControl);
            case 'createdAtProject':
                return this.createdAtProjectValidator(formControl);
            case 'modifiedAtProject':
                return this.modifiedAtProjectValidator(formControl);

            case 'emailRegistration':
                return this.emailRegistrationValidator(formControl);

            case 'nameRole':
                return this.nameRoleValidator(formControl);
            case 'descriptionRole':
                return this.descriptionRoleValidator(formControl);
            case 'versionRole':
                return this.versionRoleValidator(formControl);
            case 'createdAtRole':
                return this.createdAtRoleValidator(formControl);
            case 'modifiedAtRole':
                return this.modifiedAtRoleValidator(formControl);

            case 'emailUser':
                return this.emailUserValidator(formControl);
            case 'nameUser':
                return this.nameUserValidator(formControl);
            case 'ageUser':
                return this.ageUserValidator(formControl);
            case 'descriptionUser':
                return this.descriptionUserValidator(formControl);
            case 'versionUser':
                return this.versionUserValidator(formControl);
            case 'createdAtUser':
                return this.createdAtUserValidator(formControl);
            case 'modifiedAtUser':
                return this.modifiedAtUserValidator(formControl);

            case 'verificationCodeVerificationTokenRequest':
                return this.verificationCodeVerificationTokenRequestValidator(formControl);
            case 'emailVerificationTokenRequest':
                return this.emailVerificationTokenRequestValidator(formControl);

            default:
                return null;
        }
    }

    nameCategoryValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 75;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    versionCategoryValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtCategoryValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtCategoryValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // It's necessary only for Date Angular type
        return validator;
    }


    emailLoginValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 5;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
            const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const valid = notEmptyRule && stringLengthRule && emailAddressRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }


    titleNotificationValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    descriptionNotificationValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 400;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    emailBodyNotificationValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 1000;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    versionNotificationValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtNotificationValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtNotificationValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // It's necessary only for Date Angular type
        return validator;
    }


    namePermissionValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    nameLatinPermissionValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    descriptionPermissionValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 400;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    descriptionLatinPermissionValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 400;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    codePermissionValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }


    projectNameProjectValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 75;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    linkProjectValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    descriptionProjectValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 500;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    upvoteCountProjectValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    userIdProjectValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionProjectValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtProjectValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtProjectValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // It's necessary only for Date Angular type
        return validator;
    }


    emailRegistrationValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 5;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
            const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const valid = notEmptyRule && stringLengthRule && emailAddressRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }


    nameRoleValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 255;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    descriptionRoleValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 400;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    versionRoleValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtRoleValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtRoleValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // It's necessary only for Date Angular type
        return validator;
    }


    emailUserValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 5;
            const max = 70;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
            const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const valid = notEmptyRule && stringLengthRule && emailAddressRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    nameUserValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 75;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    ageUserValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 0;
            const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const valid = numberMinRangeRule;

            return valid ? null : { _ : this.translocoService.translate('NumberRangeMin', {min}) };
        };

        control.validator = validator;

        return validator;
    }

    descriptionUserValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 500;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    versionUserValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtUserValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtUserValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // It's necessary only for Date Angular type
        return validator;
    }


    verificationCodeVerificationTokenRequestValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const length = 6;
            const stringSingleLengthRule = (value?.length == length) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringSingleLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptySingleLength', {length}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    emailVerificationTokenRequestValidator = (control: SpiderlyFormControl): SpiderlyValidatorFn => {
        const validator: SpiderlyValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 5;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
            const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const valid = notEmptyRule && stringLengthRule && emailAddressRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }



}
