import React from "react";
export class ErrorMessages {

    public static getInstance(): ErrorMessages {
        return ErrorMessages.instance;
    }
    private static readonly instance: ErrorMessages = new ErrorMessages();
    private errors: string[] = [];
    protected constructor() { }

    public addErrorMessage(error: string) {
        this.errors = [...this.errors, error].filter((currentError, idx, arr) => arr.indexOf(currentError) === idx);
    }
    public getErrors() {
        return this.errors;
    }
}

export const ErrorMessageRenderer = () => {
    const errors = ErrorMessages.getInstance().getErrors();
    const cssClass = errors.length > 0 ? "error-container" : "";
    return <div id="errors-container" className={cssClass}>
        {errors.map((error) => <div>{error}</div>)}
    </div>;
};
