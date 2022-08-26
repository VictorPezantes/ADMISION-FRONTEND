import {HttpParams} from '@angular/common/http';

export class FormUtils {
    static parseToFormData(rawValue): FormData {
        const formData = new FormData();
        for (const k in rawValue) {
            if (k) {
                if (typeof rawValue[k] === 'boolean') {
                    formData.append(k, `${(+rawValue[k])}`);
                } else if (rawValue[k] === 0) {
                    formData.append(k, `${(rawValue[k])}`);
                }
                if (rawValue[k] !== '' && !!rawValue[k]) {
                    formData.append(k, rawValue[k]);
                }
            }
        }
        return formData;
    }


    static deleteKeysNullInObject(rawValue): any {
        Object.keys(rawValue).forEach((key) => {
            if (!rawValue[key]) {
                delete rawValue[key];
            }
        });
        return rawValue;
    }

    static buildQueryParams<T = any>(params: T): HttpParams {
        if (!params) {
            return;
        }
        let queryParams = new HttpParams();
        for (const key in params) {
            if (params[key] instanceof Array) {
                if ((params[key] as any).length) {
                    (params[key] as any).forEach((item) => {
                        queryParams = queryParams.append(key, item);
                    });
                }
            } else if (params[key]) {
                queryParams = queryParams.append(key, (params as any)[key]);
            }
        }
        return queryParams;
    }


}
